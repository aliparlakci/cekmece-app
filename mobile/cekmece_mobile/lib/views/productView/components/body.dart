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
          ReviewsButton(carId: 1, reviewCount: 555, reviewAverage: 4.3),
          const SizedBox(
            height: 5,
          ),
          LeaveAReviewButton(carId: 1)
        ],
      ),
      PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: CustomAppBar(rating: widget.product.rating),
      )
    ]);
  }
}
