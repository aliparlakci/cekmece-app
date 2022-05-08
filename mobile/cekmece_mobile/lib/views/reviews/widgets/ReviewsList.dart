import 'package:cekmece_mobile/models/review/ReviewClass.dart';
import 'package:cekmece_mobile/views/reviews/widgets/ReviewTile.dart';
import 'package:cekmece_mobile/views/reviews/widgets/ReviewsListHeader.dart';
import 'package:cekmece_mobile/widgets/linearProgressBar.dart';
import 'package:cekmece_mobile/widgets/showSnackBar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../../../constants/font_constants.dart';
import '../../../util/network/networkProvider.dart';
import 'ReviewTile.dart';
import 'ReviewsListHeader.dart';

class ReviewsList extends StatefulWidget {
  const ReviewsList(
      {Key? key,
      required this.reviewCount,
      required this.averageRating,
      required this.reviewRatioByRating,
      required this.yourReviews,
      required this.reviews,
      required this.carId,
      required this.refreshReviews})
      : super(key: key);
  final int reviewCount;
  final double averageRating;
  final Map reviewRatioByRating;
  final List<ReviewClass> yourReviews;
  final List<ReviewClass> reviews;
  final int carId;
  final void Function() refreshReviews;

  @override
  State<ReviewsList> createState() => _ReviewsListState();
}

class _ReviewsListState extends State<ReviewsList> {
  bool isLoading = false;

  Future deleteReview(reviewId) async {
    try {
      setState(() {
        isLoading = true;
      });

      final networkService = Provider.of<NetworkService>(context, listen: false);
      var response = await networkService.delete("${dotenv.env['CLIENT_URL']}/api/cars/${widget.carId}/reviews/$reviewId");
       setState(() {
          isLoading = false;
        });

        showSnackBar(context: context, message: "Review deleted successfully.");
    } catch (e) {
      print(e);
      setState(() {
        isLoading = false;
      });

      showSnackBar(
          context: context,
          message: "An error occurred while deleting the review.",
          error: true);
    }
    widget.refreshReviews();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              ReviewsListHeader(
                reviewCount: widget.reviewCount,
                averageRating: widget.averageRating,
                reviewRatioByRating: widget.reviewRatioByRating,
              ),
              if (widget.yourReviews.isNotEmpty) Ink(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                      colors: [
                        Color(0xFF6faeed),
                        Color(0xFFc899f5),
                      ],
                  ),
                ),
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(0, 15, 0, 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Text("YOUR", style: yourReviewsHeader700),
                          const SizedBox(width: 8),
                          Text("REVIEW(S)", style: yourReviewsHeader400),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: Ink(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: Colors.white,
                        ),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 5),
                          child: ListView.builder(
                              shrinkWrap: true,
                              itemCount: widget.yourReviews.length,
                              physics: const NeverScrollableScrollPhysics(),
                              itemBuilder: (context, index) {
                                return Column(
                                  children: [
                                    ReviewTile.fromReviewClassWithDelete(
                                        widget.yourReviews[index], () async {
                                      await deleteReview(widget.yourReviews[index].id);
                                    }),
                                    if ( index != widget.yourReviews.length - 1 ) const Divider(
                                      height: 0,
                                      thickness: 1,
                                    ),
                                  ],
                                );
                              }),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              ListView.builder(
                  shrinkWrap: true,
                  itemCount: widget.reviews.length,
                  physics: const NeverScrollableScrollPhysics(),
                  itemBuilder: (context, index) {
                    return Column(
                      children: [
                        if (index == 0)
                          const Divider(
                            height: 0,
                            thickness: 1,
                          ),
                        ReviewTile.fromReviewClass(
                            widget.reviews[index],),
                        const Divider(
                          height: 0,
                          thickness: 1,
                        ),
                      ],
                    );
                  })
            ],
          ),
        ),
        if (isLoading) LinearProgressBar(),
      ],
    );
  }
}
