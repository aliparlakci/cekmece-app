import 'package:cekmece_mobile/views/reviews/widgets/LeaveAReviewButton.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

import '../../constants/font_constants.dart';
import '../reviews/ReviewsView.dart';
import '../reviews/widgets/ReviewsButton.dart';

class TempView extends StatefulWidget {
  const TempView({Key? key}) : super(key: key);

  @override
  State<TempView> createState() => _TempViewState();
}

class _TempViewState extends State<TempView> {
  int carId = 1;
  double _rating = 3.5;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Heirloom")),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // ReviewsButton(carId: carId, reviewCount: 555, reviewAverage: 4.1),
          const SizedBox(
            height: 5,
          ),
          LeaveAReviewButton(carId: carId),
        ],
      ),
    );
  }
}
