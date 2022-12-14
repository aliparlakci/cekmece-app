import 'package:cekmece_mobile/models/order/OrderItem.dart';
import 'package:cekmece_mobile/util/network/networkProvider.dart';
import 'package:cekmece_mobile/views/order/views/addressPick.dart';
import 'package:cekmece_mobile/views/order/views/succesfulOrder.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/profile/profileView.dart';
import 'package:cekmece_mobile/widgets/showSnackBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:place_picker/entities/entities.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

class MyOrders extends StatelessWidget {
  MyOrders({Key? key, required this.orders}) : super(key: key);
  List<OrderItem> orders;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("My Orders")),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 15),
        child: ListView.builder(
            itemCount: orders.length,
            shrinkWrap: true,
            itemBuilder: ((context, i) {
              return OrderTile(order: orders[i]);
            })),
      ),
    );
  }
}

class OrderTile extends StatelessWidget {
  OrderTile({Key? key, required this.order}) : super(key: key);
  OrderItem order;

  String refundMessage() {
    if (order.refund == null) {
      return "";
    }
    if (order.refund!["isApproved"]) {
      return "Approved";
    }
    if (!order.refund!["isApproved"] && !order.refund!["isRejected"]) {
      return "In Progress";
    }
    return "Rejected";
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        var res = await pushNewScreen(
          context,
          screen: OrderDetail(order: order),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        );
        if (res != null && res == "refreq") {
          Navigator.pop(context);
        }
      },
      child: Card(
          elevation: 8,
          margin: EdgeInsets.symmetric(vertical: 10),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(15, 20, 15, 0),
            child: Column(
              children: [
                OrderDetailRow(left: "Order ID:", right: order.id.toString()),
                OrderDetailRow(
                    left: "Order placed on:",
                    right: toBeginningOfSentenceCase(
                        order.createdDate.substring(0, 10))!),
                OrderDetailRow(
                    left: "Order Status:",
                    right: toBeginningOfSentenceCase(order.status)!),
                OrderDetailRow(
                    left: "Delivery Address:",
                    right: toBeginningOfSentenceCase(
                        "${order.province}, ${order.country}")!),
                order.refund != null
                    ? OrderDetailRow(
                        left: "Refund:",
                        right: toBeginningOfSentenceCase(refundMessage())!)
                    : Container()
              ],
            ),
          )),
    );
  }
}

class OrderDetailRow extends StatelessWidget {
  OrderDetailRow({Key? key, required this.left, required this.right})
      : super(key: key);
  String left, right;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(left,
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(16),
                    fontWeight: FontWeight.w500)),
            Text(right,
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(16),
                    fontWeight: FontWeight.w700))
          ],
        ),
        SizedBox(
          height: 14,
        ),
      ],
    );
  }
}

class OrderDetail extends StatelessWidget {
  NumberFormat numberFormat =
      NumberFormat.simpleCurrency(locale: "en-US", decimalDigits: 0);
  OrderDetail({Key? key, required this.order}) : super(key: key);
  OrderItem order;
  String localIPAddress = dotenv.env['LOCALADDRESS']!;

  String refundMessage() {
    if (order.refund == null) {
      return "";
    }
    if (order.refund!["isApproved"]) {
      return "Approved";
    }
    if (!order.refund!["isApproved"] && !order.refund!["isRejected"]) {
      return "In Progress";
    }
    return "Rejected";
  }

  Widget refundStatusWidget() {
    Color clr;
    String msg;

    String refundMsg = refundMessage();

    if (refundMsg == "Approved") {
      clr = Colors.green.shade300;
      msg = "Your refund request is approved";
    } else if (refundMsg == "In Progress") {
      clr = Colors.grey.shade300;
      msg = "Your refund is in progress";
    } else {
      clr = Colors.red.shade300;
      msg = "Your refund request is rejected";
    }
    return Padding(
      padding: const EdgeInsets.only(bottom: 5),
      child: Card(
        child: Container(
            width: double.infinity,
            height: 50,
            color: clr,
            child: Center(
              child: Text(
                msg,
                style: GoogleFonts.raleway(
                    fontSize: 17,
                    fontWeight: FontWeight.w600,
                    color: Colors.black,
                    letterSpacing: 2),
              ),
            )),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Order Detail"),
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.symmetric(vertical: 10, horizontal: 15),
          child: Column(
            children: [
              refundMessage() != "" ? refundStatusWidget() : Container(),
              OrderSummaryWithOrderItems(
                deliveryAddress: order.addressLine1 +
                    (order.addressLine2 ?? "") +
                    ', ' +
                    (order.province ?? "") +
                    ', ' +
                    order.country,
                items: order.orderItems,
                resetAddress: () {},
                showResetAddress: false,
              ),
              Card(
                elevation: 5,
                child: Container(
                  padding: EdgeInsets.symmetric(vertical: 15, horizontal: 15),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      OrderDetailRow(left: "Order ID:", right: "#${order.id}"),
                      OrderDetailRow(
                          left: "Order placed on:",
                          right: toBeginningOfSentenceCase(
                              order.createdDate.substring(0, 10))!),
                      OrderDetailRow(
                          left: "Order Status:",
                          right: toBeginningOfSentenceCase(order.status)!),
                      OrderDetailRow(
                          left: "Used Promo Code (if any):",
                          right: order.promoCode == null
                              ? "NA"
                              : order.promoCode!),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          order.discount != 0
                              ? Text(
                                  "Total (${numberFormat.format(order.discount)} discount):",
                                  style: GoogleFonts.raleway(
                                      fontSize:
                                          getProportionateScreenHeight(16),
                                      fontWeight: FontWeight.w500))
                              : Text("Total:",
                                  style: GoogleFonts.raleway(
                                      fontSize:
                                          getProportionateScreenHeight(16),
                                      fontWeight: FontWeight.w500)),
                          Text(numberFormat.format(order.total),
                              style: GoogleFonts.raleway(
                                  fontSize: getProportionateScreenHeight(16),
                                  fontWeight: FontWeight.w700))
                        ],
                      ),
                      SizedBox(
                        height: 14,
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  ProfileButton(
                    text: "Review Items",
                    icon: Icons.star,
                    onPressed: () {
                      print(order);
                    },
                  ),
                  ProfileButton(
                    text: order.status == "delivered"
                        ? "Ask for refund"
                        : "Cancel Order",
                    icon: Icons.close,
                    onPressed: () async {
                      if (refundMessage() != "") {
                        showSnackBar(
                            context: context,
                            message:
                                "You already have an ongoing refund process",
                            error: true);
                        return;
                      }

                      var networkService =
                          Provider.of<NetworkService>(context, listen: false);

                      try {
                        for (var i = 0; i < order.orderItems.length; i++) {
                          await networkService.post(
                              '${localIPAddress}/api/orders/newRefund/${order.orderItems[i].id}');
                        }
                        showSnackBar(
                          context: context,
                          message: "Refund request succesfully created",
                        );
                        Navigator.pop(context, "refreq");
                      } catch (err) {
                        showSnackBar(
                            context: context,
                            message: "Refund request failed",
                            error: true);
                      }
                    },
                  ),
                  ProfileButton(
                    text: "Get Invoice",
                    icon: Icons.inventory,
                    onPressed: () async {
                      try {
                        String localIPAddress = dotenv.env['LOCALADDRESS']!;

                        launch(
                            '${localIPAddress}/api/orders/invoice/${order.id}');
                      } catch (err) {
                        showSnackBar(
                            context: context,
                            message:
                                "Could not get invoice, please contact support.",
                            error: true);
                      }
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
/*
Column(
                  children: [
                    SizedBox(
                      height: 10,
                    ),
                    OrderDetailRow(
                        left: "Order ID:", right: order.id.toString()),
                    OrderDetailRow(
                        left: "Order placed on:",
                        right: toBeginningOfSentenceCase(
                            order.createdDate.substring(0, 10))!),
                    OrderDetailRow(
                        left: "Order Status:",
                        right: toBeginningOfSentenceCase(order.status)!),
                    OrderDetailRow(
                        left: "Sub Total:",
                        right: toBeginningOfSentenceCase(
                            "${order.province}, ${order.country}")!),
                  ],
                )
*/