import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/cartItem/CartItem.dart';
import 'package:cekmece_mobile/models/order/OrderItem.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/network/networkProvider.dart';
import 'package:cekmece_mobile/views/order/views/addressPick.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/profile/myOrders.dart';
import 'package:cekmece_mobile/views/profile/viewComponents/anonymousProfileView.dart';
import 'package:cekmece_mobile/views/profile/viewComponents/userInfo.dart';
import 'package:cekmece_mobile/widgets/showSnackBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:provider/provider.dart';
import 'package:skeleton_loader/skeleton_loader.dart';
import 'package:intl/intl.dart' show NumberFormat, toBeginningOfSentenceCase;

class ProfileView extends StatefulWidget {
  UserClass user;
  ProfileView({required this.user});
  @override
  _ProfileViewState createState() => _ProfileViewState();
}

class _ProfileViewState extends State<ProfileView> {
  String localIPAddress = dotenv.env['LOCALADDRESS']!;
  List<OrderItem> orders = [];

  List<Map<String, dynamic>> quickSettings = [
    {"name": "Change Password", "widget": Container()},
    {"name": "Change Email", "widget": Container()},
    {"name": "Change Profile Photo", "widget": Container()},
    {"name": "Contact Us", "widget": Container()},
  ];

  List<Map<String, dynamic>> processCart(List<dynamic> cart) {
    List<Map<String, dynamic>> cartList = [];
    for (Map<String, dynamic> item in cart) {
      item["item"] = item["car"];
      cartList.add(item);
    }
    return cartList;
  }

  Future getOrders() async {
    final networkService = Provider.of<NetworkService>(context, listen: false);
    orders = [];
    try {
      var ordersJson = await networkService.get('${localIPAddress}/api/orders');
      for (dynamic singleOrder in ordersJson) {
        singleOrder["orderItems"] = processCart(singleOrder["orderItems"]);
        orders.add(OrderItem.fromJson(singleOrder));
      }
    } catch (err) {
      print(err);
      showSnackBar(
          context: context, message: "Could not get orders", error: true);
    }
    setState(() {});
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getOrders();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.user.isAnonymous
          ? AnonymousProfileView()
          : SingleChildScrollView(
              child: Container(
                padding: const EdgeInsets.fromLTRB(25, 60, 25, 25),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      UserInfoView(user: widget.user),
                      SizedBox(
                        height: getProportionateScreenHeight(20),
                      ),
                      Row(
                        children: [
                          ProfileButton(
                            text: "My Reviews",
                            icon: Icons.star,
                            onPressed: () {},
                          ),
                          ProfileButton(
                            text: "My Orders",
                            icon: Icons.inventory_outlined,
                            onPressed: () async {
                              await getOrders();
                              var res = await pushNewScreen(
                                context,
                                screen: MyOrders(
                                  orders: orders,
                                ),
                                withNavBar:
                                    true, // OPTIONAL VALUE. True by default.
                                pageTransitionAnimation:
                                    PageTransitionAnimation.cupertino,
                              );
                            },
                          ),
                          ProfileButton(
                            text: "My Addresses",
                            icon: Icons.home,
                            onPressed: () {},
                          ),
                        ],
                      ),
                      SizedBox(
                        height: getProportionateScreenHeight(20),
                      ),
                      !orders.isEmpty
                          ? LatestOrder(
                              order: orders[0],
                            )
                          : Container(),
                      SizedBox(
                        height: getProportionateScreenHeight(20),
                      ),
                      Text(
                        "Quick Settings",
                        style: GoogleFonts.raleway(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      SizedBox(
                        height: getProportionateScreenHeight(10),
                      ),
                      Card(
                        elevation: 10,
                        child: Container(
                          padding: EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          child: MediaQuery.removePadding(
                            context: context,
                            removeTop: true,
                            child: ListView.builder(
                                shrinkWrap: true,
                                physics: NeverScrollableScrollPhysics(),
                                itemCount: quickSettings.length,
                                itemBuilder: ((context, index) {
                                  return ListTile(
                                    title: Text(
                                      quickSettings[index]["name"],
                                      style: GoogleFonts.raleway(
                                        fontSize: 15,
                                        fontWeight: FontWeight.w500,
                                        color: Colors.black,
                                      ),
                                    ),
                                  );
                                })),
                          ),
                        ),
                      ),
                    ]),
              ),
            ),
    );
  }
}

class LatestOrder extends StatefulWidget {
  LatestOrder({Key? key, required this.order}) : super(key: key);
  OrderItem order;

  @override
  State<LatestOrder> createState() => _LatestOrderState();
}

class _LatestOrderState extends State<LatestOrder> {
  Widget _buildBody() {
    if (widget.order == null) {
      return SkeletonLoader(
        builder: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Row(
              children: <Widget>[
                CircleAvatar(
                  backgroundColor: Colors.white,
                  radius: 30,
                ),
                SizedBox(width: 10),
                Expanded(
                  child: Column(
                    children: <Widget>[
                      Container(
                        width: double.infinity,
                        height: 10,
                        color: Colors.white,
                      ),
                      SizedBox(height: 10),
                      Container(
                        width: double.infinity,
                        height: 25,
                        color: Colors.white,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
        items: 1,
        period: Duration(seconds: 2),
        highlightColor: Colors.black,
        direction: SkeletonDirection.ltr,
      );
    } else {
      return Text("done");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Card(
          elevation: 10,
          child: Container(
            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 15),
            child: Column(
              children: [
                SizedBox(
                  height: getProportionateScreenHeight(5),
                ),
                Text(
                  "Your Latest Order",
                  style: GoogleFonts.raleway(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
                SizedBox(
                  height: getProportionateScreenHeight(13),
                ),
                OrderStatus(order: widget.order),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class OrderStatus extends StatelessWidget {
  NumberFormat numberFormat =
      NumberFormat.simpleCurrency(locale: "en-US", decimalDigits: 0);
  OrderStatus({Key? key, required this.order}) : super(key: key);
  OrderItem order;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
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
          Text(
            "Ordered Items:",
            style: GoogleFonts.raleway(
                fontSize: getProportionateScreenHeight(16),
                fontWeight: FontWeight.w500),
          ),
          ListView.builder(
              padding: const EdgeInsets.all(0),
              shrinkWrap: true,
              itemCount: order.orderItems.length,
              itemBuilder: ((context, index) {
                return OrderItemSummary(item: order.orderItems[index]);
              })),
          SizedBox(
            height: 7,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              order.discount != 0
                  ? Text(
                      "Total (${numberFormat.format(order.discount)} discount):",
                      style: GoogleFonts.raleway(
                          fontSize: getProportionateScreenHeight(16),
                          fontWeight: FontWeight.w500))
                  : Text("Total:",
                      style: GoogleFonts.raleway(
                          fontSize: getProportionateScreenHeight(16),
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
    );
  }
}

class ProfileButton extends StatelessWidget {
  String text;
  IconData icon;
  VoidCallback onPressed;

  ProfileButton(
      {Key? key,
      required this.text,
      required this.icon,
      required this.onPressed})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: GestureDetector(
      onTap: onPressed,
      child: SizedBox(
        height: getProportionateScreenHeight(105),
        child: Card(
          elevation: 10,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Icon(
                  icon,
                  size: getProportionateScreenHeight(40),
                ),
                Text(
                  text,
                  style: reviewTileCommentStyle,
                  maxLines: 2,
                  textAlign: TextAlign.center,
                )
              ],
            ),
          ),
        ),
      ),
    ));
  }
}
