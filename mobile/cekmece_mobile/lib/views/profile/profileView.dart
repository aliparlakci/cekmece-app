import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/profile/viewComponents/anonymousProfileView.dart';
import 'package:cekmece_mobile/views/profile/viewComponents/userInfo.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:skeleton_loader/skeleton_loader.dart';

class ProfileView extends StatefulWidget {
  UserClass user;
  ProfileView({required this.user});
  @override
  _ProfileViewState createState() => _ProfileViewState();
}

class _ProfileViewState extends State<ProfileView> {
  List<Map<String, dynamic>> quickSettings = [
    {"name": "Change Password", "widget": Container()},
    {"name": "Change Email", "widget": Container()},
    {"name": "Change Profile Photo", "widget": Container()},
    {"name": "Contact Us", "widget": Container()},
  ];
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
                            onPressed: () {},
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
                      LatestOrder(),
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
  const LatestOrder({Key? key}) : super(key: key);

  @override
  State<LatestOrder> createState() => _LatestOrderState();
}

class _LatestOrderState extends State<LatestOrder> {
  bool isLoading = true;

  Widget _buildBody() {
    if (isLoading) {
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
        Text(
          "Your Latest Order",
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
            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 15),
            height: getProportionateScreenHeight(180),
            child: _buildBody(),
          ),
        ),
      ],
    );
  }
}

class ProfileButton extends StatelessWidget {
  String text;
  IconData icon;
  Function onPressed;

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
      onTap: onPressed(),
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
