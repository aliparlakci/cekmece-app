import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/material.dart';

class CategoryButton extends StatelessWidget {
  String category;
  int id;
  CategoryButton({Key? key, required this.category, required this.id})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(5, 10, 5, 10),
      padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 15),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(2)),
        border: Border.all(color: Colors.black, width: 2),
      ),
      child: Text(
        category,
        style: buttonTextStyle,
      ),
    );
  }
}
