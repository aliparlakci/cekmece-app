import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/views/productView/components/button.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:flutter/material.dart';

import 'components/body.dart';
import 'components/custom_app_bar.dart';

class DetailsScreen extends StatelessWidget {
  static String routeName = "/details";
  Product product;

  DetailsScreen({required this.product});

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: Color(0xFFF5F6F9),
      body: Body(product: product),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
            border: Border(
                top: BorderSide(
                    color: secondaryColor.withOpacity(0.5), width: 2))),
        child: Padding(
          padding: EdgeInsets.only(
            left: SizeConfig.screenWidth * 0.10,
            right: SizeConfig.screenWidth * 0.10,
            bottom: getProportionateScreenWidth(10),
            top: getProportionateScreenWidth(10),
          ),
          child: Row(
            children: [
              Expanded(
                  child: Text(
                "\$1.250.000",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: secondaryColor,
                    fontSize: getProportionateScreenWidth(16)),
              )),
              Expanded(
                flex: 2,
                child: DefaultButton(
                  text: "Configure & Add To Cart",
                  press: () {},
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/*
PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: CustomAppBar(rating: product.rating),
      )
*/