import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/material.dart';

Future<void> showSnackBar(
    {required BuildContext context, required String message, bool error = false}) async {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(message, style: snackBarTextStyle),
      backgroundColor: !error ? Colors.green : Theme.of(context).errorColor,
    ),
  );
}