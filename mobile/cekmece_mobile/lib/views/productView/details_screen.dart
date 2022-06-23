import 'dart:convert';
import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/models/cartItem/CartItem.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/util/blocProviders.dart';
import 'package:cekmece_mobile/views/productView/components/button.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/widgets/showSnackBar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants/font_constants.dart';
import '../../util/network/networkProvider.dart';
import '../reviews/widgets/LoadingScreen.dart';
import 'components/body.dart';
import 'components/custom_app_bar.dart';

class DetailsScreen extends StatefulWidget {
  static String routeName = "/details";
  int carId;
  UserBloc userBloc;
  final Function(bool, String)? refreshProductCard;

  DetailsScreen({required this.carId, required this.userBloc, this.refreshProductCard});

  @override
  State<DetailsScreen> createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen> {
  late Product product;

  Future getCar() async {
    final networkService = Provider.of<NetworkService>(context, listen: false);

    try {
      var response = await networkService
          .get("${dotenv.env['CLIENT_URL']}/api/cars/${widget.carId}");
      product = Product.fromJson(response);
    } catch (e) {
      print(e);
      return Future.error(e.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return FutureBuilder(
      future: getCar(),
      builder: (BuildContext context, snapshot) {
        Widget child;
        if (snapshot.connectionState == ConnectionState.waiting) {
          child = Scaffold(body: LoadingScreen());
        } else if (snapshot.hasError) {
          child = Scaffold(
            appBar: AppBar(
              title: Text("Error"),
            ),
            body: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Icon(CupertinoIcons.exclamationmark_circle, size: 35),
                const SizedBox(height: 10),
                Center(
                    child: Text(
                        "An error occurred while displaying car details.\nPlease try again later.",
                        textAlign: TextAlign.center,
                        style: errorTextStyle)),
                const SizedBox(height: 50),
              ],
            ),
          );
        } else {
          child = Scaffold(
            backgroundColor: Color(0xFFF5F6F9),
            body: Body(product: product, userBloc: widget.userBloc, refreshProductCard: widget.refreshProductCard),
            bottomNavigationBar: ProductBottomBar(
              userBloc: widget.userBloc,
              product: product,
            ),
          );
        }
        return AnimatedSwitcher(
          duration: const Duration(milliseconds: 250),
          child: child,
        );
      },
    );
  }
}

/*
PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: CustomAppBar(rating: product.rating),
      )
*/
class ProductBottomBar extends StatefulWidget {
  ProductBottomBar({Key? key, required this.product, required this.userBloc})
      : super(key: key);
  Product product;
  UserBloc userBloc;

  @override
  State<ProductBottomBar> createState() => _ProductBottomBarState();
}

class _ProductBottomBarState extends State<ProductBottomBar> {
  NumberFormat numberFormat = NumberFormat.simpleCurrency(locale: "en-US");
  bool inCart = false;
  int quantity = 0;
  bool isLoading = false;
  String cartId = "";

  late UserClass user;

  bool isInCart() {
    for (CartItem prod in user.cart) {
      if (prod.item.id == widget.product.id) {
        quantity = prod.quantity;
        cartId = prod.id;
        return true;
      }
    }
    return false;
  }

  void addToCart() async {
    String clientURL = dotenv.env['CLIENT_URL']!;
    setState(() {
      isLoading = true;
    });
    if (isInCart() && widget.product.quantity < quantity + 1) {
      showSnackBar(
          context: context, message: "Stock limit reached", error: true);
      setState(() {
        isLoading = false;
      });
      return;
    }
    try {
      if (widget.userBloc.user.isAnonymous == false) {
        final networkService =
            Provider.of<NetworkService>(context, listen: false);
        final response = await networkService.post(
            '$clientURL/api/cart/${widget.userBloc.user.uid}/add/${widget.product.id}');

        user = await widget.userBloc
            .updateUser({"id": "${widget.userBloc.user.uid}"});
      } else {
        final prefs = await SharedPreferences.getInstance();
        final List<String> cart = prefs.getStringList('cart')!;

        if (cart.contains("${widget.product.id}-${quantity}")) {
          cart.remove("${widget.product.id}-${quantity}");
          cart.add("${widget.product.id}-${quantity + 1}");
        } else {
          cart.add("${widget.product.id}-1");
        }
        await prefs.setStringList('cart', cart);

        user = await widget.userBloc.updateLocalUser();
      }
    } catch (err) {
      showSnackBar(
        context: context,
        error: true,
        message: "Could not add item to the cart!",
      );
      print(err);
    }

    setState(() {
      isLoading = false;
    });

    inCart = isInCart();

    setState(() {});
  }

  @override
  void initState() {
    user = widget.userBloc.user;
    // TODO: implement initState
    super.initState();
    inCart = isInCart();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          border: Border(
              top: BorderSide(
                  color: secondaryColor.withOpacity(0.5), width: 2))),
      child: Padding(
        padding: EdgeInsets.only(
          left: SizeConfig.screenWidth * 0.05,
          right: SizeConfig.screenWidth * 0.05,
          bottom: getProportionateScreenWidth(10),
          top: getProportionateScreenWidth(10),
        ),
        child: Row(
          children: [
            Expanded(
                child: widget.product.discount != 0
                    ? Container(
                        height: getProportionateScreenHeight(50),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                              numberFormat.format(widget.product.price),
                              style: TextStyle(
                                  fontWeight: FontWeight.normal,
                                  color: Colors.red,
                                  decoration: TextDecoration.lineThrough,
                                  fontSize: getProportionateScreenWidth(12)),
                            ),
                            Text(
                              numberFormat.format(widget.product.price * (100 - widget.product.discount) / 100),
                              style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.green,
                                  fontSize: getProportionateScreenWidth(18)),
                            )
                          ],
                        ),
                      )
                    : Text(
                        numberFormat.format(widget.product.price),
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                            fontSize: getProportionateScreenWidth(16)),
                      )),
            Expanded(
              flex: 1,
              child: inCart
                  ? (isLoading
                      ? CircularProgressIndicator(
                          color: Colors.black,
                        )
                      : Container(
                          width: double.infinity,
                          height: getProportionateScreenHeight(56),
                          child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                IconButton(
                                    onPressed: () async {
                                      String clientURL =
                                          dotenv.env['CLIENT_URL']!;
                                      setState(() {
                                        isLoading = true;
                                      });
                                      try {
                                        if (widget.userBloc.user.isAnonymous) {
                                          // Obtain shared preferences.
                                          final prefs = await SharedPreferences
                                              .getInstance();
                                          final List<String>? cart =
                                              prefs.getStringList('cart');
                                          if (quantity == 1) {
                                            cart!.remove(
                                                "${widget.product.id}-1");
                                          } else {
                                            cart!.remove(
                                                "${widget.product.id}-${quantity}");

                                            cart.add(
                                                "${widget.product.id}-${quantity - 1}");
                                          }
                                          await prefs.setStringList(
                                              'cart', cart);

                                          user = await widget.userBloc
                                              .updateLocalUser();
                                        } else {
                                          final networkService =
                                              Provider.of<NetworkService>(
                                                  context,
                                                  listen: false);
                                          final response =
                                              await networkService.post(
                                                  '$clientURL/api/cart/${widget.userBloc.user.uid}/remove/${widget.product.id}');

                                          user = await widget.userBloc
                                              .updateUser({
                                            "id": widget.userBloc.user.uid
                                          });
                                          if (response.statusCode == 200) {
                                          } else {
                                            showSnackBar(
                                              context: context,
                                              error: true,
                                              message:
                                                  "Could not remove item to the cart!",
                                            );
                                            throw Exception(
                                                'Failed to remove to cart');
                                          }
                                        }
                                      } catch (err) {
                                        print(err);
                                      }

                                      inCart = isInCart();

                                      setState(() {
                                        isLoading = false;
                                      });
                                    },
                                    icon: Icon(Icons.remove)),
                                Text(
                                  quantity.toString(),
                                  style: GoogleFonts.raleway(
                                    fontSize: 35,
                                    fontWeight: FontWeight.w400,
                                    color: Colors.black,
                                  ),
                                ),
                                IconButton(
                                    onPressed: () {
                                      addToCart();
                                    },
                                    icon: Icon(Icons.add)),
                              ]),
                        ))
                  : widget.product.quantity == 0
                      ? Container(
                          child: Center(
                              child: Text(
                            "Out of stock",
                            style: TextStyle(
                                fontSize: 20, fontWeight: FontWeight.bold),
                          )),
                          height: getProportionateScreenHeight(56),
                        )
                      : DefaultButton(
                          text: "Configure & Add To Cart",
                          press: () {
                            addToCart();
                          },
                        ),
            ),
          ],
        ),
      ),
    );
  }
}
