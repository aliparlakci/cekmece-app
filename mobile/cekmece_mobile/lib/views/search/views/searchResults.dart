import 'dart:convert';

import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

import 'package:intl/intl.dart';
import 'package:modal_bottom_sheet/modal_bottom_sheet.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

class SearchResults extends StatefulWidget {
  List<Product> results;
  SearchResults({Key? key, required this.results}) : super(key: key);

  @override
  State<SearchResults> createState() => _SearchResultsState();
}

class _SearchResultsState extends State<SearchResults> {
  NumberFormat numberFormat = NumberFormat.simpleCurrency(locale: "en-US");
  String filterStatus = "";
  late UserBloc userBloc;
  late UserClass user;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    userBloc = BlocProvider.of<UserBloc>(context);
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.all(10),
        child: Column(
          children: [
            SizedBox(
              height: 10,
            ),
            Container(
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(border: Border.all(width: 2)),
                      padding:
                          EdgeInsets.symmetric(vertical: 10, horizontal: 5),
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.filter_list,
                              size: 30,
                            ),
                            SizedBox(
                              width: 10,
                            ),
                            Text(
                              "Filter",
                              style: header2.copyWith(color: Colors.black),
                            )
                          ]),
                    ),
                  ),
                  Expanded(
                    child: GestureDetector(
                      onTap: () async {
                        String? result = await showMaterialModalBottomSheet(
                          context: context,
                          builder: (context) => SingleChildScrollView(
                            controller: ModalScrollController.of(context),
                            child: Container(
                                child: Column(
                              children: [
                                ListTile(
                                  title: Text("Price - Ascending"),
                                  leading: Icon(Icons.attach_money),
                                  onTap: () {
                                    Navigator.pop(context, "Price - Ascending");
                                  },
                                ),
                                ListTile(
                                  title: Text("Price - Descending"),
                                  leading: Icon(Icons.attach_money),
                                  onTap: () {
                                    Navigator.pop(
                                        context, "Price - Descending");
                                  },
                                ),
                                ListTile(
                                  title: Text("Year - Ascending"),
                                  leading: Icon(Icons.calendar_today),
                                  onTap: () {
                                    Navigator.pop(context, "Year - Ascending");
                                  },
                                ),
                                ListTile(
                                  title: Text("Year - Descending"),
                                  leading: Icon(Icons.calendar_today),
                                  onTap: () {
                                    Navigator.pop(context, "Year - Descending");
                                  },
                                ),
                              ],
                            )),
                          ),
                        );

                        if (result == "Price - Ascending") {
                          widget.results
                              .sort(((a, b) => a.price.compareTo(b.price)));
                          filterStatus = "Price - Ascending";
                        } else if (result == "Price - Descending") {
                          widget.results
                              .sort(((a, b) => b.price.compareTo(a.price)));
                          filterStatus = "Price - Descending";
                        } else if (result == "Year - Ascending") {
                          widget.results
                              .sort(((a, b) => a.model.compareTo(b.model)));
                          filterStatus = "Year - Ascending";
                        } else if (result == "Year - Descending") {
                          widget.results
                              .sort(((a, b) => b.model.compareTo(a.model)));
                          filterStatus = "Year - Descending";
                        }
                        setState(() {});
                      },
                      child: Container(
                        decoration: BoxDecoration(border: Border.all(width: 2)),
                        padding:
                            EdgeInsets.symmetric(vertical: 10, horizontal: 5),
                        child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.sort,
                                size: 30,
                              ),
                              SizedBox(
                                width: 10,
                              ),
                              Text(
                                "Sort",
                                style: header2.copyWith(color: Colors.black),
                              )
                            ]),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 5,
            ),
            filterStatus != ""
                ? Text(
                    "Sorting by: ${filterStatus}",
                    style:
                        buttonTextStyle.copyWith(fontWeight: FontWeight.w300),
                  )
                : Container(),
            SingleChildScrollView(
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
                              carId: car.id,
                              userBloc: userBloc,
                            ),
                            withNavBar:
                                false, // OPTIONAL VALUE. True by default.
                            pageTransitionAnimation:
                                PageTransitionAnimation.cupertino,
                          );

                          BlocProvider.of<UserBloc>(context).add(SetUser());
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
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
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
                                                style: GoogleFonts.raleway(
                                                  fontWeight: FontWeight.w600,
                                                  fontSize: 15,
                                                  color: Colors.black,
                                                ),
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
          ],
        ),
      ),
    );
  }
}
