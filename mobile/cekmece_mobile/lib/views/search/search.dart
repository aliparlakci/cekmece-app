import 'dart:convert';
import 'dart:math';

import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

class SearchView extends StatefulWidget {
  const SearchView({Key? key}) : super(key: key);

  @override
  State<SearchView> createState() => _SearchViewState();
}

class _SearchViewState extends State<SearchView> {
  Map<int, String> categories = {};

  void getCategories() async {
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "Car fetch"));
    try {
      final response =
          await http.get(Uri.parse('http://192.168.10.103:5000/distributors'));

      if (response.statusCode == 200) {
        // If the server did return a 200 OK response,
        // then parse the JSON.
        print(response.body);
        for (var elem in jsonDecode(response.body)) {
          categories[elem["id"]] = elem["name"];
        }
      } else {
        // If the server did not return a 200 OK response,
        // then throw an exception.
        throw Exception('Failed to load categories');
      }

      setState(() {});

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    } catch (err) {
      print(err);
      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    }

    /*
pushNewScreen(
                context,
                screen: DetailsScreen(
                  product: testProd,
                ),
                withNavBar: false, // OPTIONAL VALUE. True by default.
                pageTransitionAnimation: PageTransitionAnimation.cupertino,
              );
	*/
  }

  @override
  void initState() {
    super.initState();
    getCategories();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 25),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Expanded(
            flex: 3,
            child:
                Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Icon(
                Icons.search,
                size: 200,
              ),
              Text(
                "Looking for your next car?\nWe got you covered!",
                style: appBarTextStyle.copyWith(fontSize: 30),
                textAlign: TextAlign.center,
              ),
              SizedBox(
                height: 10,
              ),
              Text(
                "Choose a distributor to get started",
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
              child: Wrap(
                  runSpacing: 10,
                  alignment: WrapAlignment.center,
                  children: categories.entries
                      .map((e) => CategoryButton(category: e.value, id: e.key))
                      .toList()
                  //  categories.map((e) => CategoryButton(category: e)).toList(),
                  //categories.entries.map((key, value) => CategoryButton(category: )).toList()
                  ),
            ),
          )
        ]),
      ),
    );
  }
}

class CategoryButton extends StatelessWidget {
  String category;
  int id;
  CategoryButton({Key? key, required this.category, required this.id})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {},
      child: Container(
        margin: const EdgeInsets.fromLTRB(10, 10, 10, 10),
        padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 15),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.all(Radius.circular(2)),
          boxShadow: [
            BoxShadow(
              color: Colors.black,
              blurRadius: 2.0,
              spreadRadius: 0.0,
              offset: Offset(0.0, -0.0), // shadow direction: bottom right
            )
          ],
        ),
        child: Text(
          category,
          style: buttonTextStyle,
        ),
      ),
    );
  }
}

/*
ListView.builder(
                shrinkWrap: true,
                itemCount: categories.length,
                itemBuilder: (context, index) {
                  return Container(
                      width: 50,
                      height: 100,
                      color: Colors.blue,
                      child: Text(categories[index]));
                },
              )
*/