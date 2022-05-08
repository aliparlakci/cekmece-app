import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:percent_indicator/linear_percent_indicator.dart';
import 'package:percent_indicator/percent_indicator.dart';

class LinearProgressWithLabels extends StatelessWidget {
  const LinearProgressWithLabels(
      {Key? key, required this.star, required this.value})
      : super(key: key);
  final int star;
  final double value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 2),
      child: Row(
        children: [
          RatingBar(
            initialRating: star.toDouble(),
            ignoreGestures: true,
            itemCount: 5,
            itemSize: 18,
            ratingWidget: RatingWidget(
              full: const Icon(Icons.star_sharp, color: Colors.black),
              half: const Icon(Icons.star_half_sharp, color: Colors.black),
              empty: const Icon(Icons.star_outline_sharp, color: Colors.black),
            ),
            onRatingUpdate: (double value) {},
          ),
          Expanded(
            child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: Container(
                  color: Color(0xFFe0e0e0),
                  child: Padding(
                    padding: const EdgeInsets.all(1.0),
                    child: LinearPercentIndicator(
                      padding: EdgeInsets.zero,
                      clipLinearGradient: true,
                      percent: value / 100,
                      lineHeight: 14,
                      backgroundColor: Colors.white,
                      linearStrokeCap: LinearStrokeCap.butt,
                      linearGradient: LinearGradient(
                          colors: [
                            Color(0xFFc899f5),
                            Color(0xFF6faeed),
                          ],
                          stops: [
                            0.0,
                            1
                          ]
                      ),
                    ),
                  ),
                )
            ),
          ),

          Container(
              width: 32,
              child: Text(
                "${value.round()}%",
                style: value != 100 ? linearProgressLabelStyle : linearProgressLabelStyleAlt,
              ))
        ],
      ),
    );
  }
}
