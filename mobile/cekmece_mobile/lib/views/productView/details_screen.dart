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
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

import 'components/body.dart';
import 'components/custom_app_bar.dart';

class DetailsScreen extends StatelessWidget {
  static String routeName = "/details";
  Product product;
  UserBloc userBloc;

  DetailsScreen({required this.product, required this.userBloc});

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: Color(0xFFF5F6F9),
      body: Body(product: product),
      bottomNavigationBar: ProductBottomBar(
        userBloc: userBloc,
        product: product,
      ),
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
    try {
      final response = await http.post(Uri.parse(
          '$clientURL/api/cart/${widget.userBloc.user.uid}/add/${widget.product.id}'));

      if (response.statusCode == 200) {
      } else {
        showSnackBar(
          context: context,
          error: true,
          message: "Could not add item to the cart!",
        );
        throw Exception('Failed to add to cart');
      }
    } catch (err) {
      print(err);
    }

    setState(() {
      isLoading = false;
    });

    user = await widget.userBloc.updateUser(widget.userBloc.user.uid);
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
          left: SizeConfig.screenWidth * 0.10,
          right: SizeConfig.screenWidth * 0.10,
          bottom: getProportionateScreenWidth(10),
          top: getProportionateScreenWidth(10),
        ),
        child: Row(
          children: [
            Expanded(
                child: Text(
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
                                        final response = await http.post(Uri.parse(
                                            '$clientURL/api/cart/remove/${cartId}'));

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
                                      } catch (err) {
                                        print(err);
                                      }

                                      setState(() {
                                        isLoading = false;
                                      });

                                      user = await widget.userBloc
                                          .updateUser(widget.userBloc.user.uid);
                                      inCart = isInCart();

                                      setState(() {});
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
