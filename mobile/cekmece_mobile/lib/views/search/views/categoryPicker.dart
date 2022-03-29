import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/views/search/components/button.dart';
import 'package:cekmece_mobile/views/search/views/searchBot.dart';
import 'package:flutter/material.dart';

class CategorySelect extends StatelessWidget {
  Map<int, String> categories;
  final Function onCallback;
  CategorySelect({Key? key, required this.categories, required this.onCallback})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Expanded(
        flex: 4,
        child: Column(mainAxisAlignment: MainAxisAlignment.end, children: [
          Icon(
            Icons.car_repair,
            size: 150,
          ),
          SizedBox(
            height: 10,
          ),
          Text(
            "Great choice!\nLet's now choose a category!",
            style: appBarTextStyle.copyWith(fontSize: 30),
            textAlign: TextAlign.center,
          ),
          SizedBox(
            height: 50,
          ),
        ]),
      ),
      Expanded(
        flex: 3,
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
