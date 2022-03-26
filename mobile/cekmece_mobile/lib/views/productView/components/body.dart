import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/views/productView/components/custom_app_bar.dart';
import 'package:cekmece_mobile/views/productView/product.dart';
import 'package:flutter/material.dart';

import 'product_description.dart';
import 'top_rounded_container.dart';
import 'product_images.dart';

class Body extends StatelessWidget {
  final Product product;

  const Body({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      ListView(
        children: [
          ProductImages(product: product),
          TopRoundedContainer(
            color: Colors.white,
            child: Column(
              children: [
                ProductDescription(
                  product: product,
                  pressOnSeeMore: () {},
                ),
              ],
            ),
          ),
        ],
      ),
      PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: CustomAppBar(rating: product.rating),
      )
    ]);
  }
}
