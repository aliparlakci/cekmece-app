import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/main.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:cekmece_mobile/views/profile/profileView.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

class NavigationView extends StatefulWidget {
  UserClass user;

  NavigationView({required this.user});
  @override
  State<NavigationView> createState() => _NavigationViewState();
}

class _NavigationViewState extends State<NavigationView> {
  late PersistentTabController _controller;

  @override
  void initState() {
    super.initState();
    _controller = PersistentTabController(initialIndex: 0);
  }

  List<Widget> _buildScreens() {
    return [
      Container(
        child: Center(
          child: OutlinedButton(
            onPressed: () {
              pushNewScreen(
                context,
                screen: DetailsScreen(
                  product: mockProd,
                ),
                withNavBar: false, // OPTIONAL VALUE. True by default.
                pageTransitionAnimation: PageTransitionAnimation.cupertino,
              );
            },
            child: Text("Go to mock product page"),
          ),
        ),
      ),
      Container(
        child: Center(
          child: Text(
            "Favorites",
            style: header,
          ),
        ),
      ),
      Container(
        child: Center(
          child: Text(
            "Cart",
            style: header,
          ),
        ),
      ),
      ProfileView(
        user: widget.user,
      ),
    ];
  }

  List<PersistentBottomNavBarItem> _navBarsItems() {
    return [
      PersistentBottomNavBarItem(
        icon: const Icon(CupertinoIcons.home),
        title: ("Home"),
        activeColorPrimary: primaryColor,
        inactiveColorPrimary: CupertinoColors.systemGrey,
      ),
      PersistentBottomNavBarItem(
        icon: const Icon(CupertinoIcons.heart),
        title: ("Favorites"),
        activeColorPrimary: primaryColor,
        inactiveColorPrimary: CupertinoColors.systemGrey,
      ),
      PersistentBottomNavBarItem(
        icon: const Icon(CupertinoIcons.cart),
        title: ("Cart"),
        activeColorPrimary: primaryColor,
        inactiveColorPrimary: CupertinoColors.systemGrey,
      ),
      PersistentBottomNavBarItem(
        icon: const Icon(CupertinoIcons.person_fill),
        title: ("Profıle"),
        activeColorPrimary: primaryColor,
        inactiveColorPrimary: CupertinoColors.systemGrey,
      ),
    ];
  }

  int curIdx = 0;
  @override
  Widget build(BuildContext context) {
    return PersistentTabView(
      context,
      margin: const EdgeInsets.only(bottom: 5),
      controller: _controller,
      navBarHeight: 60,
      screens: _buildScreens(),
      items: _navBarsItems(),
      onItemSelected: (idx) async {
        if (idx != 0) {
          print("update user");
          BlocProvider.of<UserBloc>(context).add(UserUpdate(user: widget.user));
        }
      },
      confineInSafeArea: true,
      backgroundColor: Colors.white, // Default is Colors.white.
      handleAndroidBackButtonPress: true, // Default is true.
      resizeToAvoidBottomInset:
          true, // This needs to be true if you want to move up the screen when keyboard appears. Default is true.
      stateManagement: true, // Default is true.
      hideNavigationBarWhenKeyboardShows:
          true, // Recommended to set 'resizeToAvoidBottomInset' as true while using this argument. Default is true.
      decoration: const NavBarDecoration(
        border: Border(
          top: BorderSide(width: 1.0, color: primaryColor),
        ),
        colorBehindNavBar: Colors.white,
      ),
      popAllScreensOnTapOfSelectedTab: true,
      popActionScreens: PopActionScreensType.all,
      itemAnimationProperties: const ItemAnimationProperties(
        // Navigation Bar's items animation properties.
        duration: Duration(milliseconds: 200),
        curve: Curves.ease,
      ),
      screenTransitionAnimation: const ScreenTransitionAnimation(
        // Screen transition animation on change of selected tab.
        animateTabTransition: true,
        curve: Curves.ease,
        duration: Duration(milliseconds: 200),
      ),
      navBarStyle:
          NavBarStyle.style3, // Choose the nav bar style with this property.
    );
  }
}
