import 'dart:convert';

import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:cekmece_mobile/views/search/components/button.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:http/http.dart' as http;

List<Product> dummyProducts = [
  Product(
    id: 1,
    name: "test",
    price: 123,
    model: 1,
    number: 111,
    quantity: 2,
    warranty: 2,
    distributor: "distributor",
    categories: [],
  ),
  Product(
    id: 1,
    name: "mest",
    price: 650,
    model: 1,
    number: 111,
    quantity: 2,
    warranty: 2,
    distributor: "distributor",
    categories: [],
  )
];

class ManualSearch extends StatefulWidget {
  final Function onCallback;
  const ManualSearch({Key? key, required this.onCallback}) : super(key: key);

  @override
  State<ManualSearch> createState() => _ManualSearchState();
}

class _ManualSearchState extends State<ManualSearch> {
  late TextEditingController _textController;
  NumberFormat numberFormat = NumberFormat.simpleCurrency(locale: "en-US");

  List<Product> results = [];

  @override
  void initState() {
    super.initState();
    _textController = TextEditingController();
  }

  void getInfo(String query) async {
    results = [];
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "Car fetch"));
    try {
      final response =
          await http.get(Uri.parse('http://192.168.10.103:5000/cars/'));

      if (response.statusCode == 200) {
        for (Map<String, dynamic> carData in jsonDecode(response.body)) {
          if (carData["name"].toLowerCase().contains(query.toLowerCase())) {
            List<String> categoriesStr = carData["categories"].cast<String>();
            Product car = Product(
                id: carData["id"],
                name: carData["name"],
                price: carData["price"],
                number: carData["number"],
                model: carData["model"],
                quantity: carData["quantity"],
                warranty: carData["warranty"],
                distributor: carData["distributor"],
                categories: categoriesStr);

            results.add(car);
          }
        }
      } else {
        throw Exception('Failed to load product');
      }

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    } catch (err) {
      print(err);
      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    }
  }

  void makeSearch(String query) async {
    getInfo(query);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);

    return Scaffold(
      body: SafeArea(
        child: Stack(children: [
          Container(
            padding: EdgeInsets.all(10),
            child: Column(
              children: [
                Expanded(
                  flex: 2,
                  child: CupertinoSearchTextField(
                    controller: _textController,
                    onSubmitted: (query) => makeSearch(query),
                  ),
                ),
                SizedBox(
                  height: 15,
                ),
                Expanded(
                  flex: 2,
                  child: Container(
                    color: Colors.amber,
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Expanded(
                  flex: 20,
                  child: SingleChildScrollView(
                    child: ListView.builder(
                        itemCount: results.length,
                        physics: BouncingScrollPhysics(),
                        shrinkWrap: true,
                        itemBuilder: (BuildContext context, int index) {
                          Product car = results[index];
                          return Padding(
                            padding: const EdgeInsets.symmetric(vertical: 5),
                            child: GestureDetector(
                              onTap: () {
                                pushNewScreen(
                                  context,
                                  screen: DetailsScreen(
                                    product: car,
                                  ),
                                  withNavBar:
                                      false, // OPTIONAL VALUE. True by default.
                                  pageTransitionAnimation:
                                      PageTransitionAnimation.cupertino,
                                );
                              },
                              child: Card(
                                elevation: 5,
                                child: Container(
                                  height: getProportionateScreenWidth(80),
                                  child: Row(
                                    children: [
                                      Expanded(
                                        flex: 2,
                                        child: Image.network(
                                            "https://cdn.motor1.com/images/mgl/g1gW9/s1/nuova-bmw-z4.webp"),
                                      ),
                                      Expanded(
                                          flex: 5,
                                          child: Padding(
                                            padding: const EdgeInsets.symmetric(
                                                vertical: 10, horizontal: 5),
                                            child: Column(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.spaceAround,
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                Text(
                                                  results[index].name,
                                                  style: appBarTextStyle,
                                                ),
                                                Row(
                                                  mainAxisAlignment:
                                                      MainAxisAlignment
                                                          .spaceBetween,
                                                  children: [
                                                    Text(
                                                      '${car.model} - ${car.distributor["name"]}',
                                                      style: buttonTextStyle
                                                          .copyWith(
                                                              fontSize: 12),
                                                    ),
                                                    Text(
                                                      numberFormat
                                                          .format(car.price),
                                                      style:
                                                          newReviewTextFieldFillStyle,
                                                    ),
                                                  ],
                                                )
                                              ],
                                            ),
                                          ))
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          );
                        }),
                  ),
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () {
              widget.onCallback();
            },
            child: Align(
                alignment: Alignment.bottomCenter,
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: CategoryButton(category: "Return to CarWizard", id: 1),
                )),
          )
        ]),
      ),
    );
  }
}

/*
                            title: Text(results[index].name),
                            subtitle: Text(
                                '${car.model} model, Distributed by ${car.distributor["name"]}'),
                            trailing: Text(numberFormat.format(car.price)),
*/