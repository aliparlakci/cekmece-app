import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/views/productView/components/custom_app_bar.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:cekmece_mobile/views/reviews/widgets/LeaveAReviewButton.dart';
import 'package:cekmece_mobile/views/reviews/widgets/ReviewsButton.dart';
import 'package:flutter/material.dart';

import 'product_description.dart';
import 'top_rounded_container.dart';
import 'product_images.dart';

class Body extends StatefulWidget {
  final Product product;

  Body({Key? key, required this.product}) : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  final CarouselController _controller = CarouselController();
  int _current = 0;

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      ListView(
        children: [
          ProductImages(product: widget.product),
          Divider(
            thickness: 1,
            color: Colors.black,
          ),
          TopRoundedContainer(
            color: Colors.white,
            child: Column(
              children: [
                ProductDescription(
                  product: widget.product,
                  pressOnSeeMore: () {},
                ),
              ],
            ),
          ),
          CarSpecCard(left: "Year", right: "${widget.product.model}"),
          CarSpecCard(
              left: "Distributor", right: widget.product.distributor["name"]),
          CarSpecCard(
              left: "Warranty", right: "${widget.product.warranty} years"),
          CarSpecCard(
              left: "Category", right: "${widget.product.category["name"]}"),
          const SizedBox(
            height: 15,
          ),
          ReviewsButton(carId: 1, reviewCount: 555, reviewAverage: 4.8),
          const SizedBox(
            height: 5,
          ),
          LeaveAReviewButton(carId: 1),
          const SizedBox(
            height: 20,
          ),
        ],
      ),
      PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: CustomAppBar(rating: 4.8),
      )
    ]);
  }
}

class CarSpecCard extends StatelessWidget {
  String left, right;
  CarSpecCard({
    Key? key,
    required this.left,
    required this.right,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TopRoundedContainer(
      color: Colors.white,
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 2, horizontal: 20),
        child:
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          Text(
            left,
            style: buttonTextStyle,
          ),
          Text(
            right,
            style: buttonTextStyle,
          )
        ]),
      ),
    );
  }
}
