import 'dart:convert';

import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:cekmece_mobile/views/search/components/button.dart';
import 'package:cekmece_mobile/views/search/views/searchResults.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:http/http.dart' as http;

class ManualSearch extends StatefulWidget {
  final Function onCallback;

  ManualSearch({Key? key, required this.onCallback}) : super(key: key);

  @override
  State<ManualSearch> createState() => _ManualSearchState();
}

class _ManualSearchState extends State<ManualSearch> {
  late TextEditingController _textController;
  String localIPAddress = dotenv.env['LOCALADDRESS']!;
  List<Product> results = [];

  void getInfo(String query) async {
    results = [];
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "Car fetch"));
    try {
      final response =
          await http.get(Uri.parse('http://${localIPAddress}:5000/cars/'));

      if (response.statusCode == 200) {
        for (Map<String, dynamic> carData in jsonDecode(response.body)) {
          print(carData);
          if (carData["name"].toLowerCase().contains(query.toLowerCase())) {
            Product car = Product.fromJson(carData);
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
  void initState() {
    super.initState();
    _textController = TextEditingController();
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
                  child: SearchResults(results: results),
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