import 'package:cached_network_image/cached_network_image.dart';
import 'package:cekmece_mobile/models/wishlistItem/WishlistItem.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:provider/provider.dart';

import '../../constants/font_constants.dart';
import '../../models/product/Product.dart';
import '../../util/bloc/userBloc/user_bloc.dart';
import '../../util/network/networkProvider.dart';
import '../../widgets/showSnackBar.dart';

class ProductCard extends StatefulWidget {
  const ProductCard({Key? key, required this.product}) : super(key: key);
  final Product product;

  @override
  State<ProductCard> createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  NumberFormat numberFormat = NumberFormat.simpleCurrency(locale: "en-US");
  bool isOnWishlist = false;
  String wishlistItemID = "";

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    setIsOnWishlistAndWishlistItemID();
  }

  void setIsOnWishlistAndWishlistItemID() {
    List<WishlistItem> wishlistItems =
        BlocProvider.of<UserBloc>(context).user.wishlist;
    for (WishlistItem wishlistItem in wishlistItems) {
      if (wishlistItem.item.id == widget.product.id) {
        isOnWishlist = true;
        wishlistItemID = wishlistItem.id;
        return;
      }
    }
    isOnWishlist = false;
    wishlistItemID = "";
  }

  Future toggleWishlist() async {
    var networkService = Provider.of<NetworkService>(context, listen: false);

    try {
      if (BlocProvider.of<UserBloc>(context).user.isAnonymous) {
        showSnackBar(
            context: context, message: "You need to be logged in", error: true);
        throw "User not logged in";
      }

      if (isOnWishlist) {
        await networkService.post(
            '${dotenv.env['CLIENT_URL']}/api/wishlist/${BlocProvider.of<UserBloc>(context).user.uid}/remove/$wishlistItemID');
        setState(() {
          wishlistItemID = "";
          isOnWishlist = false;
        });
      } else {
        var res = await networkService.post(
            '${dotenv.env['CLIENT_URL']}/api/wishlist/${BlocProvider.of<UserBloc>(context).user.uid}/add/${widget.product.id}');
        setState(() {
          wishlistItemID = res["wishlistItem"]["id"];
          isOnWishlist = true;
        });
      }
    } catch (err) {
      print(err);
      setState(() {
        setIsOnWishlistAndWishlistItemID();
      });
    }

    setState(() {
      BlocProvider.of<UserBloc>(context).add(UserUpdateNoLoading());
    });
  }

  void refreshProductCard(
      bool updatedIsOnWishlist, String updatedWishlistItemID) {
    setState(() {
      isOnWishlist = updatedIsOnWishlist;
      wishlistItemID = updatedWishlistItemID;
      BlocProvider.of<UserBloc>(context).add(UserUpdateNoLoading());
    });
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        pushNewScreen(context,
            screen: DetailsScreen(
              carId: widget.product.id,
              userBloc: BlocProvider.of<UserBloc>(context),
              refreshProductCard: refreshProductCard,
            ),
            withNavBar: false);
      },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CachedNetworkImage(
              imageUrl: widget.product.photoUrl,
              fit: BoxFit.cover,
              height: 150),
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
                      widget.product.discount != 0
                          ? Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  numberFormat.format(widget.product.price * (100 - widget.product.discount) / 100),
                                  style: productCardDiscountedPriceTextStyle,
                                ),
                                Text(
                                  numberFormat.format(widget.product.price),
                                  style:
                                      productCardPriceBeforeDiscountTextStyle,
                                )
                              ],
                            )
                          : Column(
                              children: [
                                Text(numberFormat.format(widget.product.price),
                                    style: productCardPriceTextStyle),
                              ],
                            )
                    ],
                  ),
                ),
                if (!BlocProvider.of<UserBloc>(context).user.isAnonymous)
                  Align(
                    alignment: Alignment.topRight,
                    child: IconButton(
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                      onPressed: () {
                        toggleWishlist();
                      },
                      icon: !isOnWishlist
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
