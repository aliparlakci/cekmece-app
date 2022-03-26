import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/product.dart';
import 'package:flutter/material.dart';

class ProductDescription extends StatelessWidget {
  const ProductDescription({
    Key? key,
    required this.product,
    this.pressOnSeeMore,
  }) : super(key: key);

  final Product product;
  final GestureTapCallback? pressOnSeeMore;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(
              horizontal: getProportionateScreenHeight(20)),
          child: Text(
            product.title,
            style: Theme.of(context).textTheme.headline6,
          ),
        ),
        SizedBox(
          height: 10,
        ),
        Padding(
          padding: EdgeInsets.only(
            left: getProportionateScreenWidth(20),
            right: getProportionateScreenWidth(64),
          ),
          child: Text(
            product.description,
            maxLines: 4,
          ),
        ),
        Padding(
          padding: EdgeInsets.symmetric(
            horizontal: getProportionateScreenWidth(20),
            vertical: 10,
          ),
          child: GestureDetector(
            onTap: () {},
            child: Row(
              children: [
                Text(
                  "See More Detail",
                  style: TextStyle(
                      fontWeight: FontWeight.w600, color: Colors.black),
                ),
                SizedBox(width: 5),
                Icon(
                  Icons.arrow_forward_ios,
                  size: 12,
                  color: Colors.black,
                ),
              ],
            ),
          ),
        )
      ],
    );
  }
}
