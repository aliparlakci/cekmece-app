import 'package:cekmece_mobile/views/reviews/NewReviewView.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import '../../../constants/font_constants.dart';

class LeaveAReviewButton extends StatelessWidget {
  const LeaveAReviewButton({Key? key, required this.carId}) : super(key: key);
  final int carId;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: TextButton(
        onPressed: () {
          pushNewScreen(
            context,
            screen: NewReviewView(carId: carId),
            withNavBar: false,
            pageTransitionAnimation: PageTransitionAnimation.cupertino,
          );
        },
        style: TextButton.styleFrom(
          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          backgroundColor: Colors.black,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(0),
          ),
        ),
        child: SizedBox(
          width: 220,
          child: Center(
            child: Text(
              "LEAVE A REVIEW",
              style: blackButtonTextStyle,
            ),
          ),
        ),
      ),
    );
  }
}
