import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import '../../../constants/font_constants.dart';
import '../ReviewsView.dart';

class ReviewsButton extends StatelessWidget {
  const ReviewsButton({Key? key, required this.userId, required this.carId, required this.reviewCount, this.reviewAverage, required this.updateReviewCountAndAverageRating}) : super(key: key);
  final String userId;
  final int carId;
  final int reviewCount;
  final double? reviewAverage;
  final Function(int, String) updateReviewCountAndAverageRating;

  double roundReviewAverage(double reviewAverage) {
    if (reviewAverage % 1 == 0) {return reviewAverage;}
    else if (0 < reviewAverage && reviewAverage < 1) {return 0.5;}
    else if (1 < reviewAverage && reviewAverage < 2) {return 1.5;}
    else if (2 < reviewAverage && reviewAverage < 3) {return 2.5;}
    else if (3 < reviewAverage && reviewAverage < 4) {return 3.5;}
    else if (4 < reviewAverage && reviewAverage < 5) {return 4.5;}
    else { return 0; }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: TextButton(
        onPressed: () {
          pushNewScreen(
            context,
            screen: ReviewsView(userId: userId, carId: carId, updateReviewCountAndAverageRating: updateReviewCountAndAverageRating),
            withNavBar: false,
            pageTransitionAnimation: PageTransitionAnimation.cupertino,
          );
        },
        style: TextButton.styleFrom(
          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(0),
          ),
        ),
        child: SizedBox(
          width: 220,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                  "REVIEWS ($reviewCount)",
                  style: buttonTextStyle
              ),
              const SizedBox(
                  width: 15
              ),
              RatingBar(
                initialRating: reviewAverage != null ? roundReviewAverage(reviewAverage!) : 0,
                ignoreGestures: true,
                allowHalfRating: true,
                itemCount: 5,
                itemSize: 18,
                ratingWidget: RatingWidget(
                  full: const Icon(Icons.star_sharp, color: Colors.black),
                  half: const Icon(Icons.star_half_sharp, color: Colors.black),
                  empty: const Icon(Icons.star_outline_sharp, color: Colors.black),
                ), onRatingUpdate: (double value) { },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
