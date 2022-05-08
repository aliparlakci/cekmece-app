import 'package:cekmece_mobile/models/cartItem/CartItem.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/util/network/networkProvider.dart';
import 'package:cekmece_mobile/views/order/views/mockPayment.dart';
import 'package:cekmece_mobile/views/order/views/succesfulOrder.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/widgets/showSnackBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_signin_button/button_list.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:place_picker/entities/entities.dart';
import 'package:place_picker/place_picker.dart';
import 'package:provider/provider.dart';

class AddressPicker extends StatefulWidget {
  AddressPicker({Key? key, required this.prevContext}) : super(key: key);
  BuildContext prevContext;

  @override
  State<AddressPicker> createState() => _AddressPickerState();
}

class _AddressPickerState extends State<AddressPicker> {
  bool addressSelected = false;
  late LocationResult result;
  LatLng latlng = const LatLng(41.015137, 28.979530);
  List<CartItem> cart = [];

  bool cartChanged(List<CartItem> prevCart, List<CartItem> newCart) {
    if (prevCart.length != newCart.length) return true;

    for (int i = 0; i < prevCart.length; i++) {
      if (prevCart[i].quantity != newCart[i].quantity) return true;
      if (prevCart[i].total != newCart[i].total) return true;
      if (prevCart[i].item.price != newCart[i].item.price) return true;
    }

    return false;
  }

  void processOrder() async {
    String localIPAddress = dotenv.env['LOCALADDRESS']!;

    var paymentResult = await pushNewScreen(
      context,
      screen: MockPayment(),
      withNavBar: false, // OPTIONAL VALUE. True by default.
      pageTransitionAnimation: PageTransitionAnimation.cupertino,
    );

    if (paymentResult) {
      try {
        NetworkService networkService =
            Provider.of<NetworkService>(context, listen: false);
        var body = {
          "addressLine1": result.formattedAddress!.substring(0, 45),
          "addressLine2": result.formattedAddress!.substring(45),
          "city": result.city!.name,
          "province": result.city!.name,
          "country": result.country!.name,
          "zipCode": result.postalCode
        };
        networkService.post('${localIPAddress}/api/orders/new', body: body);

        await pushNewScreen(
          context,
          screen: SuccesfulOrder(
            address: result,
            items: cart,
          ),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        );
      } catch (err) {
        showSnackBar(
            context: context,
            message:
                "We can not process your payment at the moment, please try again later",
            error: true);
      }

      BlocProvider.of<UserBloc>(widget.prevContext).add(UserUpdate());

      Navigator.pop(context);
    }
  }

  void updateCart() async {
    UserBloc userBloc = BlocProvider.of<UserBloc>(widget.prevContext);
    cart = await userBloc.getCart(userBloc.user.uid);
    if (cartChanged(userBloc.user.cart, cart)) {
      showSnackBar(
          context: context,
          message:
              "Your cart has been updated since your last action. Please confirm your cart again.");
      Navigator.pop(context);
    }

    setState(() {});
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    updateCart();
  }

  void showPlacePicker() async {
    try {
      result = await Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => PlacePicker(
                "AIzaSyDwmB4puUZeHnjiNCVcqnDBPKESXxJ-9h8",
              )));
      setState(() {
        addressSelected = true;
      });
    } catch (err) {
      setState(() {
        addressSelected = false;
      });
      showSnackBar(
          context: context,
          message: "Could not set delivery address!",
          error: true);
    }
  }

  Widget buildView() {
    if (addressSelected) {
      return Container(
        padding: EdgeInsets.symmetric(horizontal: 15, vertical: 10),
        child: Column(
          children: [
            OrderSummary(
              deliveryAddress: result.formattedAddress!,
              resetAddress: showPlacePicker,
              showResetAddress: true,
              items: cart,
            ),
            ConfirmOrderButton(
              onPressed: () => processOrder(),
            )
          ],
        ),
      );
    } else {
      return Container(
        padding: EdgeInsets.symmetric(horizontal: 15),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Great Choices!",
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(40),
                    fontWeight: FontWeight.bold)),
            SizedBox(
              height: 10,
            ),
            Text(
              "Now let's select a delivery address for your new car",
              style: GoogleFonts.raleway(
                  fontSize: getProportionateScreenHeight(20),
                  fontWeight: FontWeight.w400),
              textAlign: TextAlign.center,
            ),
            SizedBox(
              height: 60,
            ),
            GetLocationButton(
              onPressed: showPlacePicker,
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Delivery")),
      body: buildView(),
    );
  }
}

class OrderSummary extends StatelessWidget {
  OrderSummary(
      {Key? key,
      required this.deliveryAddress,
      required this.showResetAddress,
      required this.resetAddress,
      required this.items})
      : super(key: key);
  String deliveryAddress;
  bool showResetAddress;
  VoidCallback resetAddress;
  List<CartItem> items;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            width: double.infinity,
          ),
          Text(
            "Order Summary",
            style: GoogleFonts.raleway(
                fontSize: getProportionateScreenHeight(35),
                fontWeight: FontWeight.w600),
          ),
          SizedBox(
            height: 10,
          ),
          DeliverAddress(
            address: deliveryAddress,
            onPressed: resetAddress,
            showResetButton: showResetAddress,
          ),
          SizedBox(
            height: 10,
          ),
          OrderItems(
            items: items,
          ),
          SizedBox(
            height: 10,
          ),
        ],
      ),
    );
  }
}

class OrderItems extends StatelessWidget {
  OrderItems({Key? key, required this.items}) : super(key: key);
  List<CartItem> items;
  NumberFormat numberFormat =
      NumberFormat.simpleCurrency(locale: "en-US", decimalDigits: 0);

  int getTotal() {
    int sum = 0;
    for (CartItem item in items) {
      sum += item.total;
    }
    return sum;
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 8,
      child: Container(
        padding: EdgeInsets.fromLTRB(15, 15, 15, 5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Text("Your items:",
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(18),
                    fontWeight: FontWeight.w400)),
            SizedBox(
              height: 10,
            ),
            ListView.builder(
                padding: const EdgeInsets.all(0),
                shrinkWrap: true,
                itemCount: items.length,
                itemBuilder: ((context, index) {
                  return OrderItemSummary(item: items[index]);
                })),
            Divider(
              thickness: 1,
              color: Colors.black,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Total:",
                    style: GoogleFonts.raleway(
                        fontSize: getProportionateScreenHeight(15),
                        fontWeight: FontWeight.w600)),
                Text(numberFormat.format(getTotal()),
                    style: GoogleFonts.raleway(
                        fontSize: getProportionateScreenHeight(16),
                        fontWeight: FontWeight.w800)),
              ],
            ),
            SizedBox(
              height: 10,
            ),
          ],
        ),
      ),
    );
  }
}

class OrderItemSummary extends StatelessWidget {
  OrderItemSummary({Key? key, required this.item}) : super(key: key);
  CartItem item;
  NumberFormat numberFormat =
      NumberFormat.simpleCurrency(locale: "en-US", decimalDigits: 0);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            "${item.item.model} ${item.item.distributor["name"]} ${item.item.name} x ${item.quantity}",
            style: GoogleFonts.raleway(
                fontSize: getProportionateScreenHeight(15),
                fontWeight: FontWeight.w600),
            maxLines: 2,
          ),
          Text(numberFormat.format(item.total),
              style: GoogleFonts.raleway(
                  fontSize: getProportionateScreenHeight(16),
                  fontWeight: FontWeight.w800))
        ],
      ),
    );
  }
}

class DeliverAddress extends StatelessWidget {
  DeliverAddress(
      {Key? key,
      required this.address,
      required this.onPressed,
      required this.showResetButton})
      : super(key: key);
  String address;
  final VoidCallback onPressed;
  bool showResetButton;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      child: Container(
        padding: EdgeInsets.fromLTRB(15, 15, 15, 5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Your order will be delivered to:",
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(18),
                    fontWeight: FontWeight.w400)),
            SizedBox(
              height: 10,
            ),
            Text(address,
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(18),
                    fontWeight: FontWeight.w500)),
            SizedBox(
              height: 13,
            ),
            showResetButton
                ? ElevatedButton(
                    onPressed: onPressed,
                    style: ButtonStyle(
                        backgroundColor:
                            MaterialStateProperty.all(Colors.white),
                        elevation: MaterialStateProperty.all(7)),
                    child: Column(
                      children: [
                        SizedBox(
                          width: double.infinity,
                        ),
                        Text(
                          "Change Delivery Address",
                          style: GoogleFonts.raleway(
                              fontSize: getProportionateScreenHeight(13),
                              fontWeight: FontWeight.w500,
                              color: Colors.black),
                        ),
                      ],
                    ))
                : Container()
          ],
        ),
      ),
    );
  }
}

class GetLocationButton extends StatelessWidget {
  GetLocationButton({Key? key, required this.onPressed}) : super(key: key);
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Card(
        elevation: 10,
        margin: EdgeInsets.symmetric(vertical: 5, horizontal: 20),
        child: Container(
          height: getProportionateScreenHeight(70),
          width: getProportionateScreenWidth(250),
          margin: EdgeInsets.symmetric(vertical: 5, horizontal: 20),
          padding: EdgeInsets.all(5),
          child: Center(
            child: Text("Set Delivery Address",
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(25),
                    fontWeight: FontWeight.bold)),
          ),
        ),
      ),
    );
  }
}

class ConfirmOrderButton extends StatelessWidget {
  ConfirmOrderButton({Key? key, required this.onPressed}) : super(key: key);
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
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
            child: Text("Confirm Order & Pay",
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(25),
                    fontWeight: FontWeight.bold,
                    color: Colors.white)),
          ),
        ),
      ),
    );
  }
}
