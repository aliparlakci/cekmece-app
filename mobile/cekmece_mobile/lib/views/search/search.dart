import 'dart:convert';
import 'dart:math';

import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:cekmece_mobile/views/search/views/searchBot.dart';
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
  bool botStart = false;
  void botStarted() {
    setState(() {
      botStart = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 25),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Expanded(
            child: SearchBot(
              onCallback: botStarted,
            ),
          )
        ]),
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