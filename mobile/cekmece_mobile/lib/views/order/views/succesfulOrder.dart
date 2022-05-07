import 'package:cekmece_mobile/models/cartItem/CartItem.dart';
import 'package:cekmece_mobile/views/order/views/addressPick.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:place_picker/entities/entities.dart';

class SuccesfulOrder extends StatelessWidget {
  SuccesfulOrder({Key? key, required this.address, required this.items})
      : super(key: key);
  LocationResult address;
  List<CartItem> items;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
        child: SingleChildScrollView(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(
                  height: 15,
                ),
                Icon(
                  Icons.check,
                  size: getProportionateScreenHeight(150),
                ),
                Text("We got your order!",
                    style: GoogleFonts.raleway(
                        fontSize: getProportionateScreenHeight(38),
                        fontWeight: FontWeight.bold)),
                const SizedBox(
                  height: 15,
                ),
                const Divider(
                  indent: 20,
                  endIndent: 20,
                  color: Colors.black,
                  thickness: 2,
                ),
                const SizedBox(
                  height: 5,
                ),
                OrderSummary(
                    deliveryAddress: address,
                    showResetAddress: false,
                    resetAddress: () {},
                    items: items),
                GestureDetector(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  child: Card(
                    elevation: 10,
                    color: Colors.black,
                    margin: EdgeInsets.symmetric(vertical: 5, horizontal: 0),
                    child: Container(
                      height: getProportionateScreenHeight(70),
                      width: double.infinity,
                      margin: EdgeInsets.symmetric(vertical: 5, horizontal: 20),
                      padding: EdgeInsets.all(5),
                      child: Center(
                        child: Text("Return to CarWow",
                            style: GoogleFonts.raleway(
                                fontSize: getProportionateScreenHeight(25),
                                fontWeight: FontWeight.bold,
                                color: Colors.white)),
                      ),
                    ),
                  ),
                )
              ]),
        ),
      ),
    );
  }
}
