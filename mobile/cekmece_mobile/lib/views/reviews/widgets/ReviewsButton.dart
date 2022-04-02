import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import '../../../constants/font_constants.dart';
import '../ReviewsView.dart';

class ReviewsButton extends StatelessWidget {
  const ReviewsButton({Key? key, required this.carId, required this.reviewCount, this.reviewAverage}) : super(key: key);
  final int carId;
  final int reviewCount;
  final double? reviewAverage;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: TextButton(
        onPressed: () {
          pushNewScreen(
            context,
            screen: ReviewsView(carId: carId),
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
              RatingBarIndicator(
                rating: reviewAverage ?? 5,
                itemBuilder: (context, index) => const Icon(
                  Icons.star,
                  color: Colors.black,
                ),
                itemCount: 5,
                itemSize: 18.0,
                unratedColor: const Color(0xFFCDCDCD),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
