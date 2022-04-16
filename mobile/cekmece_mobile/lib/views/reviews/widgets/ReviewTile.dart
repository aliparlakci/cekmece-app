import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:intl/intl.dart';
import 'package:readmore/readmore.dart';
import '../../../models/review/ReviewClass.dart';

class ReviewTile extends StatelessWidget {
  const ReviewTile(
      {Key? key,
      required this.rating,
      required this.comment,
      required this.createdDate,
      required this.isApproved,
      required this.userId,
      this.onDelete})
      : super(key: key);

  final int rating;
  final String? comment;
  final DateTime createdDate;
  final bool isApproved;
  final String userId;
  final Future Function()? onDelete;

  factory ReviewTile.fromReviewClass(ReviewClass review) {
    return ReviewTile(
        rating: review.rating,
        comment: review.comment,
        createdDate: review.createdDate,
        isApproved: review.isApproved,
        userId: review.user["id"]);
  }

  factory ReviewTile.fromReviewClassWithDelete(
      ReviewClass review, Future Function() onDelete) {
    return ReviewTile(
      rating: review.rating,
      comment: review.comment,
      createdDate: review.createdDate,
      isApproved: review.isApproved,
      userId: review.user["id"],
      onDelete: onDelete,
    );
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => {},
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 15, 20, 18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    RatingBar(
                      initialRating: rating.toDouble(),
                      ignoreGestures: true,
                      itemCount: 5,
                      itemSize: 18,
                      ratingWidget: RatingWidget(
                        full: const Icon(Icons.star_sharp, color: Colors.black),
                        half: const Icon(Icons.star_half_sharp,
                            color: Colors.black),
                        empty: const Icon(Icons.star_outline_sharp,
                            color: Colors.black),
                      ),
                      onRatingUpdate: (double value) {},
                    ),
                    const SizedBox(width: 15),
                    Text(DateFormat.yMMMd().format(createdDate),
                        style: reviewTileDateStyle),
                  ],
                ),
                if (true)
                  PopupMenuButton(
                    child: const Icon(Icons.more_horiz_outlined),
                    onSelected: (value) {
                      if (value == 1) {
                        if (onDelete != null) {
                          onDelete!();
                        }
                      }
                    },
                    itemBuilder: (BuildContext context) => [
                      PopupMenuItem(
                        child: Text("Delete review",
                            style: popUpMenuItemTextStyle),
                        onTap: () {},
                        value: 1,
                      )
                    ],
                  )
              ],
            ),
            if (comment != null) const SizedBox(height: 10),
            if (comment != null)
              ReadMoreText(
                comment!,
                textAlign: TextAlign.left,
                style: isApproved
                    ? reviewTileCommentStyle
                    : reviewTileUnapprovedCommentStyle,
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
