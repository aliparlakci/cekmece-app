import 'dart:convert';

import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/body.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/search/components/button.dart';
import 'package:cekmece_mobile/views/search/search.dart';
import 'package:cekmece_mobile/views/search/views/categoryPicker.dart';
import 'package:cekmece_mobile/views/search/views/distributorSelect.dart';
import 'package:cekmece_mobile/views/search/views/pricePicker.dart';
import 'package:cekmece_mobile/views/search/views/yearPicker.dart';
import 'package:cekmece_mobile/widgets/showSnackBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:step_progress_indicator/step_progress_indicator.dart';
import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';

class SearchBot extends StatefulWidget {
  SearchBot({Key? key, required this.onCallback}) : super(key: key);
  final Function onCallback;
  @override
  State<SearchBot> createState() => _SearchBotState();
}

class _SearchBotState extends State<SearchBot> {
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

  void getData() async {
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "Distributor fetch"));
    try {
      final distributorsresponse = await http
          .get(Uri.parse('http://192.168.10.103:5000/distributors'))
          .timeout(Duration(seconds: 10));

      if (distributorsresponse.statusCode == 200) {
        for (var elem in jsonDecode(distributorsresponse.body)) {
          distributors[elem["id"]] = elem["name"];
        }
      } else {
        throw Exception('Failed to load categories');
      }

      final response = await http
          .get(Uri.parse('http://192.168.10.103:5000/categories'))
          .timeout(Duration(seconds: 10));

      if (response.statusCode == 200) {
        print(response.body);
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
        children: [
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
                  maxYear: maxModel)
            ],
          ),
          curPage != 0
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
                      totalSteps: 5,
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
                      ctrl.jumpTo(0);
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
              : Container()
        ],
      );
    }
  }
}

class SearchSummary extends StatelessWidget {
  NumberFormat numberFormat = NumberFormat.simpleCurrency(locale: "en-US");

  int minYear, maxYear, minPrice, maxPrice;
  String distributor, category;
  SearchSummary(
      {Key? key,
      required this.distributor,
      required this.category,
      required this.minPrice,
      required this.maxPrice,
      required this.minYear,
      required this.maxYear})
      : super(key: key);

  String processModel() {
    if (minYear == 0 && maxYear == 0) {
      return "Not specified";
    } else if (minYear == 0) {
      return "Up to ${maxYear}";
    } else if (maxYear == 0) {
      return "At least ${minYear}";
    } else {
      return "${minYear} - ${maxYear}";
    }
  }

  String processPrice() {
    if (minPrice == 0 && maxPrice == 0) {
      return "Not specified";
    } else if (minPrice == 0) {
      return "Up to \$${maxPrice}";
    } else if (maxPrice == 0) {
      return "At least \$${minYear}";
    } else {
      return "Between \$${minPrice} - \$${maxPrice}";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Expanded(
        flex: 2,
        child: Column(mainAxisAlignment: MainAxisAlignment.end, children: [
          Icon(
            Icons.check,
            size: 180,
          ),
          Text(
            "You are almost done!",
            style: appBarTextStyle.copyWith(fontSize: 30),
            textAlign: TextAlign.center,
          ),
          SizedBox(
            height: 10,
          ),
          Text(
            "Lets take a brief look at your selections",
            style: appBarTextStyle.copyWith(fontSize: 20),
            textAlign: TextAlign.center,
          ),
          SizedBox(
            height: 20,
          ),
        ]),
      ),
      Expanded(
        flex: 2,
        child: SingleChildScrollView(
          child: Column(children: [
            CarSpecCard(left: "Distributor", right: distributor),
            CarSpecCard(left: "Category", right: category),
            CarSpecCard(left: "Price", right: processPrice()),
            CarSpecCard(left: "Model", right: processModel()),
            const SizedBox(
              height: 15,
            )
          ]),
        ),
      )
    ]);
  }
}
