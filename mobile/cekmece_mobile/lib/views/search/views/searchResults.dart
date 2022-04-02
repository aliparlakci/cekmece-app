import 'dart:convert';

import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

class SearchResults extends StatefulWidget {
  List<Product> results;
  SearchResults({Key? key, required this.results}) : super(key: key);

  @override
  State<SearchResults> createState() => _SearchResultsState();
}

class _SearchResultsState extends State<SearchResults> {
  NumberFormat numberFormat = NumberFormat.simpleCurrency(locale: "en-US");

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: ListView.builder(
          itemCount: widget.results.length,
          physics: BouncingScrollPhysics(),
          shrinkWrap: true,
          itemBuilder: (BuildContext context, int index) {
            Product car = widget.results[index];
            return Padding(
              padding: const EdgeInsets.symmetric(vertical: 5),
              child: GestureDetector(
                onTap: () {
                  pushNewScreen(
                    context,
                    screen: DetailsScreen(
                      product: car,
                    ),
                    withNavBar: false, // OPTIONAL VALUE. True by default.
                    pageTransitionAnimation: PageTransitionAnimation.cupertino,
                  );
                },
                child: Card(
                  elevation: 5,
                  child: Container(
                    height: getProportionateScreenHeight(80),
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
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    widget.results[index].name,
                                    style: appBarTextStyle,
                                  ),
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        '${car.model} - ${car.distributor["name"]}',
                                        style: buttonTextStyle.copyWith(
                                            fontSize: 12),
                                      ),
                                      Text(
                                        numberFormat.format(car.price),
                                        style: newReviewTextFieldFillStyle,
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
    );
  }
}
