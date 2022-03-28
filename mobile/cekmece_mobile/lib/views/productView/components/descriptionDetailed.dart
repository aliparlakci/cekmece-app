import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class DescriptionDetail extends StatelessWidget {
  String description;
  DescriptionDetail({Key? key, required this.description}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Detailed Description"),
        backgroundColor: Colors.white,
      ),
      body: Container(
        padding: EdgeInsets.all(8),
        child: SingleChildScrollView(
          child: Text(
            description,
            style: textDefault.copyWith(color: Colors.black, fontSize: 20),
          ),
        ),
      ),
    );
  }
}
