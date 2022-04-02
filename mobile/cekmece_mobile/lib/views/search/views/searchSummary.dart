import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/views/productView/components/body.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

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
