import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

import '../../constants/font_constants.dart';
import '../reviews/ReviewsView.dart';

class TempView extends StatefulWidget {
  const TempView({Key? key}) : super(key: key);

  @override
  State<TempView> createState() => _TempViewState();
}

class _TempViewState extends State<TempView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Heirloom")
      ),
      body: TextButton(
        onPressed: () {
          pushNewScreen(
            context,
            screen: ReviewsView(carID: 1),
            withNavBar: true,
            pageTransitionAnimation: PageTransitionAnimation.cupertino,
          );
        },
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
                "REVIEWS (57)",
                style: buttonTextStyle
            ),
            const SizedBox(
                width: 15
            ),
            RatingBarIndicator(
              rating: 4.5,
              itemBuilder: (context, index) => const Icon(
                Icons.star,
                color: Colors.black,
              ),
              itemCount: 5,
              itemSize: 18.0,
              unratedColor: Color(0xFFCDCDCD),
            ),
          ],
        ),
      ),
    );
  }
}
