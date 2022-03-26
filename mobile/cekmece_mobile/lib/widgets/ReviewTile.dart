import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:intl/intl.dart';
import 'package:readmore/readmore.dart';

class ReviewTile extends StatelessWidget {
  const ReviewTile(
      {Key? key,
      required this.rating,
      required this.comment,
      required this.date})
      : super(key: key);

  final double rating;
  final String comment;
  final DateTime date;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => {},
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical:15, horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                RatingBarIndicator(
                  rating: rating,
                  itemBuilder: (context, index) => const Icon(
                    Icons.star,
                    color: Colors.black,
                  ),
                  itemCount: 5,
                  itemSize: 18.0,
                  unratedColor: Color(0xFFCDCDCD),
                ),
                const SizedBox(width: 15),
                Text(
                  DateFormat.yMMMd().format(date),
                  style: reviewTileDateStyle
                )
              ],
            ),
            const SizedBox(height: 10),
            ReadMoreText(
              comment,
              textAlign: TextAlign.left,
              style: reviewTileCommentStyle,
              trimMode: TrimMode.Line,
              trimLines: 3,
              moreStyle: reviewTileMoreLessStyle,
              lessStyle: reviewTileMoreLessStyle,
            )
          ],
        ),
      ),
    );
  }
}
