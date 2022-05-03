import 'dart:convert';

import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/body.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/search/components/button.dart';
import 'package:cekmece_mobile/views/search/search.dart';
import 'package:cekmece_mobile/views/search/views/categoryPicker.dart';
import 'package:cekmece_mobile/views/search/views/distributorSelect.dart';
import 'package:cekmece_mobile/views/search/views/manualSearch.dart';
import 'package:cekmece_mobile/views/search/views/pricePicker.dart';
import 'package:cekmece_mobile/views/search/views/searchResults.dart';
import 'package:cekmece_mobile/views/search/views/searchSummary.dart';
import 'package:cekmece_mobile/views/search/views/yearPicker.dart';
import 'package:cekmece_mobile/widgets/showSnackBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:step_progress_indicator/step_progress_indicator.dart';
import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';

class SearchBot extends StatefulWidget {
  SearchBot({Key? key, required this.onCallback}) : super(key: key);
  final Function onCallback;
  @override
  State<SearchBot> createState() => _SearchBotState();
}

class _SearchBotState extends State<SearchBot> {
  String clientURL = dotenv.env['CLIENT_URL']!;
  List<Product> results = [];

  Map<int, String> categories = {};
  Map<int, String> distributors = {};

  bool error = false;
  int curPage = 0;
  PageController ctrl = PageController();

  int chosenCategory = 0;
  String chosenCategoryName = "";

  int chosenDistributor = 0;
  String chosenDistributorName = "";

  int minPrice = 0;
  int maxPrice = 0;

  int minModel = 0;
  int maxModel = 0;

  @override
  void initState() {
    super.initState();
    getData();
  }

  /*
Product(
                    id: carData["id"],
                    name: carData["name"],
                    price: carData["price"],
                    number: carData["number"],
                    model: carData["model"],
                    quantity: carData["quantity"],
                    warranty: carData["warranty"],
                    distributor: carData["distributor"],
                    categories: carData["categories"]);
  */

  void searchCar() async {
    results = [];
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "Car fetch"));
    try {
      final response = await http.get(Uri.parse('$clientURL/api/cars/'));

      if (response.statusCode == 200) {
        for (Map<String, dynamic> carData in jsonDecode(response.body)) {
          if (carData["distributor"]["name"] == chosenDistributorName) {
            if ((minPrice != 0 && minPrice < carData["price"]) ||
                minPrice == 0) {
              if ((maxPrice != 0 && maxPrice > carData["price"]) ||
                  maxPrice == 0) {
                if ((minModel != 0 && minModel < carData["model"]) ||
                    minModel == 0) {
                  if ((maxModel != 0 && maxModel > carData["model"]) ||
                      maxModel == 0) {
                    Product car = Product.fromJson(carData);
                    results.add(car);
                  }
                }
              }
            }
          }
        }
      } else {
        throw Exception('Failed to load product');
      }

      setState(() {});
      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    } catch (err) {
      print(err);
      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    }
  }

  void getData() async {
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "Distributor fetch"));
    try {
      final distributorsresponse = await http
          .get(Uri.parse('$clientURL/api/distributors'))
          .timeout(Duration(seconds: 10));

      if (distributorsresponse.statusCode == 200) {
        for (var elem in jsonDecode(distributorsresponse.body)) {
          distributors[elem["id"]] = elem["name"];
        }
      } else {
        throw Exception('Failed to load categories');
      }

      final response = await http
          .get(Uri.parse('$clientURL/api/categories'))
          .timeout(Duration(seconds: 10));

      if (response.statusCode == 200) {
        for (var elem in jsonDecode(response.body)) {
          categories[elem["id"]] = elem["name"];
        }
      } else {
        throw Exception('Failed to load categories');
      }

      setState(() {
        error = false;
      });

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    } catch (err) {
      print(err);
      setState(() {
        error = true;
      });
      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    }
  }

  void distributorSelect(int id, String name) {
    setState(() {
      chosenDistributor = id;
      chosenDistributorName = name;
      ctrl.nextPage(
          duration: Duration(milliseconds: 500), curve: Curves.easeOut);
    });
  }

  void categorySelect(int id, String name) {
    setState(() {
      chosenCategory = id;
      chosenCategoryName = name;
      ctrl.nextPage(
          duration: Duration(milliseconds: 500), curve: Curves.easeOut);
    });
  }

  void setMinPrice(int min) {
    setState(() {
      minPrice = min;
    });
  }

  void setMaxPrice(int max) {
    setState(() {
      maxPrice = max;
    });
  }

  void setMinYear(int min) {
    setState(() {
      minModel = min;
    });
  }

  void setMaxYear(int max) {
    setState(() {
      maxModel = max;
    });
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    if (error) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            width: double.infinity,
          ),
          Text(
            "Oh no! Something went wrong.",
            style: appBarTextStyle,
          ),
          SizedBox(
            height: 10,
          ),
          OutlinedButton(
              onPressed: () {
                getData();
              },
              child: Text(
                "Try Again",
                style: buttonTextStyle,
              ))
        ],
      );
    } else {
      return Stack(
        children: [
          PageView(
            physics: NeverScrollableScrollPhysics(),
            controller: ctrl,
            onPageChanged: (idx) {
              setState(() {
                curPage = idx;
              });
            },
            children: [
              DistributorSelect(
                categories: distributors,
                onCallback: distributorSelect,
              ),
              CategorySelect(
                categories: categories,
                onCallback: categorySelect,
              ),
              PriceSelect(
                setMax: setMaxPrice,
                setMin: setMinPrice,
              ),
              ModelSelect(
                setMini: setMinYear,
                setMaxi: setMaxYear,
              ),
              SearchSummary(
                  distributor: chosenDistributorName,
                  category: chosenCategoryName,
                  minPrice: minPrice,
                  maxPrice: maxPrice,
                  minYear: minModel,
                  maxYear: maxModel),
              results.isEmpty
                  ? Container(
                      padding:
                          EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                      child: Column(
                        children: [
                          const SizedBox(
                            height: 150,
                          ),
                          const Icon(
                            Icons.sentiment_dissatisfied_outlined,
                            size: 200,
                          ),
                          Text(
                            "Oh no!",
                            style: header,
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          Text(
                            "We could not find any cars that fit your selection.\n\nPlease try searching with different parameters, or use manual search.\n\nWe are doing our best to provide more cars in the future!",
                            style: header2.copyWith(color: Colors.black),
                            textAlign: TextAlign.center,
                          )
                        ],
                      ),
                    )
                  : Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 15),
                      child: Column(
                        children: [
                          SizedBox(
                            height: 110,
                          ),
                          Text(
                            "Here are your results!",
                            style: header.copyWith(fontSize: 30),
                          ),
                          SizedBox(
                            height: 20,
                          ),
                          SearchResults(
                            results: results,
                          ),
                        ],
                      ),
                    )
            ],
          ),
          curPage != 0 && curPage != 5
              ? Align(
                  alignment: Alignment.bottomLeft,
                  child: GestureDetector(
                    onTap: () {
                      ctrl.previousPage(
                          duration: Duration(milliseconds: 500),
                          curve: Curves.easeOut);
                    },
                    child: CategoryButton(
                      category: "Previous Step",
                      id: 1,
                    ),
                  ),
                )
              : Container(),
          curPage == 2 || curPage == 3
              ? Align(
                  alignment: Alignment.bottomRight,
                  child: GestureDetector(
                    onTap: () {
                      if (minPrice > maxPrice) {
                        showSnackBar(
                            context: context,
                            message:
                                "Minimum price can not be higher than the maximum price!");
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text("AAAA", style: snackBarTextStyle),
                            backgroundColor: !error
                                ? Colors.green
                                : Theme.of(context).errorColor,
                          ),
                        );
                      } else if (maxModel != 0 && minModel > maxModel) {
                        showSnackBar(
                            context: context,
                            message:
                                "Minimum model year can not be higher than the maximum model year!");
                      } else {
                        FocusScope.of(context).unfocus();
                        ctrl.nextPage(
                            duration: Duration(milliseconds: 500),
                            curve: Curves.easeOut);
                      }
                    },
                    child: CategoryButton(
                      category: "Next Step",
                      id: 1,
                    ),
                  ),
                )
              : Container(),
          curPage != 0
              ? Align(
                  alignment: Alignment.topCenter,
                  child: Padding(
                    padding: const EdgeInsets.only(top: 40),
                    child: StepProgressIndicator(
                      totalSteps: 6,
                      currentStep: curPage + 1,
                      size: 48,
                      selectedColor: Colors.black,
                      unselectedColor: Colors.grey,
                      customStep: (index, color, _) => color == Colors.black
                          ? Container(
                              color: color,
                              child: Icon(
                                Icons.check,
                                color: Colors.white,
                              ),
                            )
                          : Container(
                              color: color,
                              child: Icon(
                                Icons.remove,
                              ),
                            ),
                    ),
                  ),
                )
              : Container(),
          curPage == 4
              ? Align(
                  alignment: Alignment.bottomRight,
                  child: GestureDetector(
                    onTap: () {
                      searchCar();
                      ctrl.nextPage(
                          duration: Duration(milliseconds: 500),
                          curve: Curves.easeOut);
                    },
                    child: CategoryButton(
                      category: "Find me a new car!",
                      id: 1,
                    ),
                  ),
                )
              : Container(),
          curPage == 0
              ? Align(
                  alignment: Alignment.topRight,
                  child: GestureDetector(
                    onTap: () {
                      widget.onCallback();
                    },
                    child: Padding(
                      padding: const EdgeInsets.only(top: 35),
                      child: CategoryButton(
                        category: "Manual Search",
                        id: 1,
                      ),
                    ),
                  ),
                )
              : Container(),
          curPage == 5
              ? Align(
                  alignment: Alignment.bottomCenter,
                  child: GestureDetector(
                    onTap: () {
                      ctrl.jumpTo(0);
                    },
                    child: Padding(
                      padding: const EdgeInsets.only(top: 35),
                      child: CategoryButton(
                        category: "Start Over",
                        id: 1,
                      ),
                    ),
                  ),
                )
              : Container()
        ],
      );
    }
  }
}
