import 'dart:convert';

import 'package:anim_search_bar/anim_search_bar.dart';
import 'package:cekmece_mobile/main.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/util/blocProviders.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:http/http.dart' as http;

class OmerTest extends StatefulWidget {
  const OmerTest({Key? key}) : super(key: key);

  @override
  State<OmerTest> createState() => _OmerTestState();
}
/*
      
      rating: 5,
      price: 123123,


*/

class _OmerTestState extends State<OmerTest> {
  String localIPAddress = dotenv.env['LOCALADDRESS']!;

  TextEditingController textController = TextEditingController();
  int prodId = 1;

  void getInfo() async {
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "Car fetch"));
    try {
      final response =
          await http.get(Uri.parse('http://${localIPAddress}:5000/api/cars/2'));

      if (response.statusCode == 200) {
        // If the server did return a 200 OK response,
        // then parse the JSON.
        Product car = Product.fromJson(jsonDecode(response.body));
        pushNewScreen(
          context,
          screen: DetailsScreen(
            product: car,
          ),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        );
      } else {
        // If the server did not return a 200 OK response,
        // then throw an exception.
        throw Exception('Failed to load product');
      }

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
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: OutlinedButton(
          onPressed: () {
            getInfo();
          },
          child: Text("Go to mock product page"),
        ),
      ),
    );
  }
}
