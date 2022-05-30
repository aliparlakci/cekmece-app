import 'package:cached_network_image/cached_network_image.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

import '../../constants/font_constants.dart';
import '../../models/product/Product.dart';
import '../../util/bloc/userBloc/user_bloc.dart';

class ProductCard extends StatefulWidget {
  const ProductCard({Key? key, required this.product}) : super(key: key);
  final Product product;

  @override
  State<ProductCard> createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  NumberFormat numberFormat = NumberFormat.simpleCurrency(locale: "en-US");
  bool isLiked = false;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        pushNewScreen(context, screen: DetailsScreen(carId: widget.product.id, userBloc: BlocProvider.of<UserBloc>(context)), withNavBar: false);
      },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CachedNetworkImage(
              imageUrl: widget.product.photoUrl, fit: BoxFit.cover, height: 150),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Stack(
              children: [
                SizedBox(
                  width: MediaQuery.of(context).size.width / 2.6,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "${widget.product.model} ${widget.product.distributor["name"]}",
                        style: productCardModelAndDistributorTextStyle,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                      Text(
                        widget.product.name,
                        style: productCardNameTextStyle,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                      ),
                      Text(numberFormat.format(widget.product.price),
                          style: productCardPriceTextStyle),
                    ],
                  ),
                ),
                Align(
                  alignment: Alignment.topRight,
                  child: IconButton(
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    onPressed: () {
                      setState(() {
                        isLiked = !isLiked;
                      });
                    },
                    icon: !isLiked
                        ? const Icon(CupertinoIcons.heart)
                        : const Icon(CupertinoIcons.heart_fill,
                            color: Colors.red),
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
