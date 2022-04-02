import 'package:cekmece_mobile/models/review/ReviewClass.dart';
import 'package:cekmece_mobile/views/reviews/widgets/ReviewTile.dart';
import 'package:cekmece_mobile/widgets/linearProgressBar.dart';
import 'package:cekmece_mobile/widgets/showSnackBar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'ReviewTile.dart';

class ReviewsList extends StatefulWidget {
  const ReviewsList({Key? key, required this.reviews, required this.carId})
      : super(key: key);
  final List<ReviewClass> reviews;
  final int carId;

  @override
  State<ReviewsList> createState() => _ReviewsListState();
}

class _ReviewsListState extends State<ReviewsList> {
  String localIPAddress = dotenv.env['LOCALADDRESS']!;

  bool isLoading = false;

  Future deleteReview(reviewId, listIndex) async {
    try {
      setState(() {
        isLoading = true;
      });

      var response = await http.delete(
          Uri.parse(
              "http://${localIPAddress}:5000/cars/${widget.carId}/reviews/$reviewId"),
          headers: <String, String>{
            "Accept": "application/json",
            "Content-Type": "charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          }).timeout(const Duration(seconds: 5));

      if (response.statusCode < 400) {
        setState(() {
          widget.reviews.removeAt(listIndex);
          isLoading = false;
        });

        showSnackBar(context: context, message: "Review deleted successfully.");
      } else {
        showSnackBar(
            context: context,
            message: "An error occurred while deleting the review.",
            error: true);
      }
    } catch (e) {
      setState(() {
        isLoading = false;
      });

      showSnackBar(
          context: context,
          message: "An error occurred while deleting the review.",
          error: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ListView.builder(
            shrinkWrap: false,
            itemCount: widget.reviews.length,
            itemBuilder: (context, index) {
              return Column(
                children: [
                  ReviewTile.fromReviewClassWithDelete(widget.reviews[index],
                      () async {
                    await deleteReview(widget.reviews[index].id, index);
                  }),
                  const Divider(
                    height: 0,
                    thickness: 1,
                  ),
                ],
              );
            }),
        if (isLoading) LinearProgressBar(),
      ],
    );
  }
}
