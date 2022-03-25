import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/material.dart';

class FirebaseErrorView extends StatelessWidget {
  FirebaseErrorView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
          primarySwatch: Colors.amber,
          canvasColor: neutralColor,
          primaryColor: primaryColor),
      home: Scaffold(
        body: Container(
          color: primaryColor,
          padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 60),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(
                width: double.infinity,
              ),
              const Icon(
                Icons.warning_amber_sharp,
                size: 200,
              ),
              Text(
                "Oh no!",
                style: header,
              ),
              const SizedBox(
                height: 20,
              ),
              Text(
                "It seems like there is something wrong.\n\nPlease try restarting the app and check your connection.\n\nIf the problem continues, please try again after some time.",
                style: header2,
                textAlign: TextAlign.center,
              )
            ],
          ),
        ),
      ),
    );
  }
}
