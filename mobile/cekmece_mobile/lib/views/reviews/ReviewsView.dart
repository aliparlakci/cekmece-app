import 'dart:convert';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/review/ReviewClass.dart';
import 'package:cekmece_mobile/views/reviews/widgets/LoadingScreen.dart';
import 'package:cekmece_mobile/views/reviews/widgets/ReviewsList.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

import '../../models/user/UserClass.dart';
import '../../util/bloc/userBloc/user_bloc.dart';
import '../misc/loadingOverlay.dart';

class ReviewsView extends StatefulWidget {
  const ReviewsView({Key? key, required this.userId, required this.carId}) : super(key: key);
  final String userId;
  final int carId;

  @override
  State<ReviewsView> createState() => _ReviewsViewState();
}

class _ReviewsViewState extends State<ReviewsView> {
  late int reviewCount;
  late double averageRating;
  late Map reviewRatioByRating;
  List<ReviewClass> yourReviews = [];
  List<ReviewClass> reviews = [];

  final LoadingOverlay _loadingOverlay = LoadingOverlay();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  Future getReviewsByCar(carId) async {
    try {
      var response = await http.get(
          Uri.parse("${dotenv.env['CLIENT_URL']}/api/cars/$carId/reviews"),
          headers: <String, String>{
            "Accept": "application/json",
            "Content-Type": "charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          }).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        dynamic reviewsDetails = jsonDecode(response.body);
        reviewCount = reviewsDetails["reviewCount"];
        averageRating = double.parse(reviewsDetails["averageRating"]);
        reviewRatioByRating = reviewsDetails["reviewRatioByRating"];

        if (widget.userId != "0") {
          List<ReviewClass> tempYourReviews = [];
          List<ReviewClass> tempReviews = [];
          for (var jsonObj in (reviewsDetails["reviews"] as List)) {
            ReviewClass review = ReviewClass.fromJson(jsonObj);
            if (review.user["id"] == widget.userId) {
              tempYourReviews.add(review);
            }
            else {
              tempReviews.add(review);
            }
          }
          yourReviews = List.from(tempYourReviews);
          reviews = List.from(tempReviews);
        } else {
          reviews = (reviewsDetails["reviews"] as List)
              .map((jsonObj) => ReviewClass.fromJson(jsonObj))
              .toList();
        }
      } else {
        return Future.error(Error());
      }
    } catch (e) {
      print(e);
      return Future.error(e.toString());
    }
  }

  void _refreshReviews() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: const Text("Reviews"),
      ),
      body: FutureBuilder(
        future: getReviewsByCar(widget.carId),
        builder: (BuildContext context, snapshot) {
          Widget child;
          if (snapshot.connectionState == ConnectionState.waiting) {
            child = LoadingScreen();
          } else if (snapshot.hasError) {
            child = Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Icon(CupertinoIcons.exclamationmark_circle, size: 35),
                const SizedBox(height: 10),
                Center(
                    child: Text(
                        "An error occurred while getting reviews.\nPlease try again later.",
                        textAlign: TextAlign.center,
                        style: errorTextStyle)),
                const SizedBox(height: 50),
              ],
            );
          } else {
            child = reviews.isNotEmpty || yourReviews.isNotEmpty
                ? ReviewsList(
                reviewCount: reviewCount,
                averageRating: averageRating,
                reviewRatioByRating: reviewRatioByRating,
                yourReviews: yourReviews,
                reviews: reviews,
                carId: widget.carId,
                refreshReviews: _refreshReviews)
                : Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Icon(CupertinoIcons.tray, size: 35),
                const SizedBox(height: 10),
                Center(
                    child: Text(
                        "There are no customer reviews for this item.",
                        textAlign: TextAlign.center,
                        style: errorTextStyle)),
                const SizedBox(height: 50),
              ],
            );
          }
          return AnimatedSwitcher(
            duration: const Duration(milliseconds: 250),
            child: child,
          );
        },
      ),
    );
  }
}
