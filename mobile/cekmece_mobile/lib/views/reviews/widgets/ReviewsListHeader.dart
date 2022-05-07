import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/views/reviews/widgets/LinearProgressWithLabels.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:percent_indicator/linear_percent_indicator.dart';

class ReviewsListHeader extends StatelessWidget {
  const ReviewsListHeader(
      {Key? key,
        required this.reviewCount,
        required this.averageRating,
        required this.reviewRatioByRating})
      : super(key: key);
  final int reviewCount;
  final double averageRating;
  final Map reviewRatioByRating;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color(0xFFF6F6F6),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(0, 20, 0, 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text("$reviewCount", style: reviewCountHeader700),
                const SizedBox(width: 12),
                Text("REVIEWS", style: reviewCountHeader500),
              ],
            ),
          ),
          Padding(
              padding: const EdgeInsets.fromLTRB(0, 0, 0, 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  RatingBar(
                    initialRating: averageRating,
                    allowHalfRating: true,
                    ignoreGestures: true,
                    itemCount: 5,
                    itemSize: 32,
                    ratingWidget: RatingWidget(
                      full: const Icon(Icons.star_sharp, color: Colors.black),
                      half:
                      const Icon(Icons.star_half_sharp, color: Colors.black),
                      empty: const Icon(Icons.star_outline_sharp,
                          color: Colors.black),
                    ),
                    onRatingUpdate: (double value) {},
                  ),
                  const SizedBox(width: 10),
                  Text("$averageRating", style: averageRatingHeader),
                ],
              )
          ),
          LinearProgressWithLabels(star: 5, value: reviewRatioByRating["5"].toDouble()),
          LinearProgressWithLabels(star: 4, value: reviewRatioByRating["4"].toDouble()),
          LinearProgressWithLabels(star: 3, value: reviewRatioByRating["3"].toDouble()),
          LinearProgressWithLabels(star: 2, value: reviewRatioByRating["2"].toDouble()),
          LinearProgressWithLabels(star: 1, value: reviewRatioByRating["1"].toDouble()),
          SizedBox(height: 15),
        ],
      ),
    );
  }
}
