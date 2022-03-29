import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/views/search/components/button.dart';
import 'package:cekmece_mobile/views/search/views/searchBot.dart';
import 'package:flutter/material.dart';

class DistributorSelect extends StatelessWidget {
  Map<int, String> categories;
  final Function onCallback;
  DistributorSelect(
      {Key? key, required this.categories, required this.onCallback})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Expanded(
        flex: 3,
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Icon(
            Icons.search,
            size: 180,
          ),
          Text(
            "Find your new car with CarWizard!",
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
              runSpacing: 5,
              spacing: 10,
              alignment: WrapAlignment.spaceEvenly,
              runAlignment: WrapAlignment.spaceEvenly,
              children: categories.entries
                  .map((e) => GestureDetector(
                      onTap: () {
                        print("pressed");
                        onCallback(e.key, e.value);
                      },
                      child: CategoryButton(category: e.value, id: e.key)))
                  .toList()
              //  categories.map((e) => CategoryButton(category: e)).toList(),
              //categories.entries.map((key, value) => CategoryButton(category: )).toList()
              ),
        ),
      )
    ]);
  }
}
