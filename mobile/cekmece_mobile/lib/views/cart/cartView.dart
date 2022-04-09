import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/cartItem/CartItem.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

class CartView extends StatefulWidget {
  CartView({Key? key, required this.user}) : super(key: key);
  UserClass user;

  @override
  State<CartView> createState() => _CartViewState();
}

class _CartViewState extends State<CartView> {
  NumberFormat numberFormat =
      NumberFormat.simpleCurrency(locale: "en-US", decimalDigits: 0);
  late UserBloc userBloc;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    userBloc = BlocProvider.of<UserBloc>(context);
  }

  int getTotal() {
    int sum = 0;
    for (CartItem item in widget.user.cart) {
      sum += item.total;
    }
    return sum;
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: AppBar(
        title: Text("Cart"),
        centerTitle: true,
      ),
      body: Stack(children: [
        Column(
          children: [
            SizedBox(
              height: 15,
            ),
            Text(
              "You have ${widget.user.cart.length} items in your cart",
              style: appBarTextStyle,
            ),
            SizedBox(
              height: 10,
            ),
            SingleChildScrollView(
              child: ListView.builder(
                  itemCount: widget.user.cart.length,
                  physics: BouncingScrollPhysics(),
                  shrinkWrap: true,
                  itemBuilder: (BuildContext context, int index) {
                    Product car = widget.user.cart[index].item;
                    return Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 5, horizontal: 15),
                      child: GestureDetector(
                        onTap: () async {
                          await pushNewScreen(
                            context,
                            screen: DetailsScreen(
                              product: car,
                              userBloc: userBloc,
                            ),
                            withNavBar:
                                false, // OPTIONAL VALUE. True by default.
                            pageTransitionAnimation:
                                PageTransitionAnimation.cupertino,
                          );
                          BlocProvider.of<UserBloc>(context)
                              .add(UserUpdate(user: userBloc.user));
                        },
                        child: Card(
                          elevation: 5,
                          child: Container(
                            height: getProportionateScreenHeight(80),
                            child: Row(
                              children: [
                                Expanded(
                                  flex: 2,
                                  child: Image.network(
                                      "https://cdn.motor1.com/images/mgl/g1gW9/s1/nuova-bmw-z4.webp"),
                                ),
                                Expanded(
                                    flex: 7,
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                          vertical: 10, horizontal: 5),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceAround,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              Text(
                                                car.name,
                                                style: appBarTextStyle,
                                              ),
                                              Text(
                                                "${numberFormat.format(car.price)} x ${widget.user.cart[index].quantity}",
                                                style: GoogleFonts.raleway(
                                                  fontWeight: FontWeight.w600,
                                                  fontSize: 15,
                                                  color: Colors.black,
                                                ),
                                              )
                                            ],
                                          ),
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              Text(
                                                '${car.model} - ${car.distributor["name"]}',
                                                style: buttonTextStyle.copyWith(
                                                    fontSize: 12),
                                              ),
                                              Text(
                                                numberFormat.format(car.price *
                                                    widget.user.cart[index]
                                                        .quantity),
                                                style: GoogleFonts.raleway(
                                                  fontWeight: FontWeight.w600,
                                                  fontSize: 15,
                                                  color: Colors.black,
                                                ),
                                              ),
                                            ],
                                          )
                                        ],
                                      ),
                                    ))
                              ],
                            ),
                          ),
                        ),
                      ),
                    );
                  }),
            ),
            SizedBox(
              height: 60,
            ),
          ],
        ),
        Align(
          alignment: Alignment.bottomCenter,
          child: Container(
            height: 90,
            padding: EdgeInsets.symmetric(horizontal: 15),
            decoration: BoxDecoration(
                border: Border(top: BorderSide(width: 1)),
                color: Colors.black12),
            child: Row(children: [
              Expanded(
                  child: Container(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Total",
                        style: buttonTextStyle.copyWith(
                            fontWeight: FontWeight.w300),
                      ),
                      SizedBox(
                        height: 5,
                      ),
                      Text(
                        numberFormat.format(getTotal()),
                        style: appBarTextStyle.copyWith(fontSize: 25),
                      )
                    ]),
              )),
              Expanded(
                  child: ElevatedButton(
                style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.black)),
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  child: Text("Complete Order"),
                ),
                onPressed: () {},
              ))
            ]),
          ),
        )
      ]),
    );
  }
}
