import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/models/wishlistItem/WishlistItem.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/util/network/networkProvider.dart';
import 'package:cekmece_mobile/views/productView/components/custom_app_bar.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:cekmece_mobile/views/reviews/widgets/LeaveAReviewButton.dart';
import 'package:cekmece_mobile/views/reviews/widgets/ReviewsButton.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:like_button/like_button.dart';
import 'package:provider/provider.dart';

import 'product_description.dart';
import 'top_rounded_container.dart';
import 'product_images.dart';

class Body extends StatefulWidget {
  final Product product;
  final UserBloc userBloc;

  Body({Key? key, required this.product, required this.userBloc})
      : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  final CarouselController _controller = CarouselController();
  int _current = 0;
  bool _isOnWishlist = false;
  String wlID = "";

  @override
  void initState() {
    // TODO: implement initState
    checkWishlist();
    super.initState();
  }

  void checkWishlist() {
    for (WishlistItem wlItem in widget.userBloc.user.wishlist) {
      if (wlItem.item.id == widget.product.id) {
        wlID = wlItem.id;
        _isOnWishlist = true;
        setState(() {});
        break;
      }
    }
  }

  Future<bool> setFav(bool favState) async {
    var networkService = Provider.of<NetworkService>(context, listen: false);

    try {
      if (_isOnWishlist) {
        await networkService.post(
            '${dotenv.env['CLIENT_URL']}/api/wishlist/${widget.userBloc.user.uid}/remove/${wlID}');
        wlID = "";
        _isOnWishlist = false;
        //remove from wl
      } else {
        var res = await networkService.post(
            '${dotenv.env['CLIENT_URL']}/api/wishlist/${widget.userBloc.user.uid}/add/${widget.product.id}');
        wlID = res["wishlistItem"]["id"];
        _isOnWishlist = true;
        //add to wl
      }
    } catch (err) {
      print(err);
      return false;
    }
    setState(() {});
    return true;
  }

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
          CarSpecCard(left: "In Stock", right: "${widget.product.quantity}"),
          const SizedBox(
            height: 15,
          ),
          ReviewsButton(
              userId: widget.userBloc.user.uid,
              carId: widget.product.id,
              reviewCount: widget.product.reviewCount,
              reviewAverage: double.parse(widget.product.averageRating)),
          const SizedBox(
            height: 5,
          ),
          if (widget.product.userCanReviewCar != null &&
              widget.product.userCanReviewCar == true)
            LeaveAReviewButton(carId: widget.product.id),
          const SizedBox(
            height: 20,
          ),
        ],
      ),
      PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: SafeArea(
          child: Padding(
            padding: EdgeInsets.symmetric(
                horizontal: getProportionateScreenWidth(20)),
            child: Row(
              children: [
                SizedBox(
                  height: getProportionateScreenHeight(40),
                  width: getProportionateScreenWidth(40),
                  child: TextButton(
                      style: TextButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(60),
                        ),
                        primary: Colors.black,
                        backgroundColor: Colors.white,
                        padding: EdgeInsets.zero,
                      ),
                      onPressed: () => Navigator.pop(context),
                      child: Icon(Icons.arrow_back)),
                ),
                Spacer(),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  height: 45,
                  child: LikeButton(
                    isLiked: _isOnWishlist,
                    onTap: ((isLiked) => setFav(isLiked)),
                  ),
                )
              ],
            ),
          ),
        ),
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
