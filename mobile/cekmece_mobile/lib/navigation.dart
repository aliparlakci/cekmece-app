import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/main.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:cekmece_mobile/views/profile/profileView.dart';
import 'package:cekmece_mobile/views/reviews/ReviewsView.dart';
import 'package:cekmece_mobile/views/search/search.dart';
import 'package:cekmece_mobile/views/search/searchWrapper.dart';
import 'package:cekmece_mobile/views/temp/TempView.dart';
import 'package:cekmece_mobile/views/temp/omerTemp.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:anim_search_bar/anim_search_bar.dart';

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
      OmerTest(),
      SearchWrapper(),
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
        inactiveIcon: const Icon(CupertinoIcons.house),
        inactiveColorPrimary: CupertinoColors.systemGrey,
        icon: const Icon(CupertinoIcons.house_fill),
        activeColorPrimary: bottomNavBarActiveColor,
        title: ("Home"),
      ),
      PersistentBottomNavBarItem(
        inactiveIcon: const Icon(CupertinoIcons.search),
        inactiveColorPrimary: CupertinoColors.systemGrey,
        icon: const Icon(CupertinoIcons.search),
        activeColorPrimary: bottomNavBarActiveColor,
        title: ("Search"),
      ),
      PersistentBottomNavBarItem(
        inactiveIcon: const Icon(CupertinoIcons.heart),
        inactiveColorPrimary: CupertinoColors.systemGrey,
        icon: const Icon(CupertinoIcons.heart_fill),
        activeColorPrimary: bottomNavBarActiveColor,
        title: ("Favorites"),
      ),
      PersistentBottomNavBarItem(
        inactiveIcon: const Icon(CupertinoIcons.cart),
        inactiveColorPrimary: CupertinoColors.systemGrey,
        icon: const Icon(CupertinoIcons.cart_fill),
        activeColorPrimary: bottomNavBarActiveColor,
        title: ("Cart"),
      ),
      PersistentBottomNavBarItem(
        inactiveIcon: const Icon(CupertinoIcons.person_circle),
        inactiveColorPrimary: CupertinoColors.systemGrey,
        icon: const Icon(CupertinoIcons.person_circle_fill),
        activeColorPrimary: bottomNavBarActiveColor,
        title: ("Profile"),
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
        if (!(idx == 0 || idx == 1)) {
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
          top: BorderSide(width: 1.0, color: Color(0xFFECECEC)),
        ),
        colorBehindNavBar: Colors.white,
      ),
      popAllScreensOnTapOfSelectedTab: true,
      popActionScreens: PopActionScreensType.all,
      navBarStyle:
          NavBarStyle.style12, // Choose the nav bar style with this property.
      itemAnimationProperties: const ItemAnimationProperties(
        // Navigation Bar's items animation properties.
        duration: Duration(milliseconds: 200),
        curve: Curves.ease,
      ),
      /*
      screenTransitionAnimation: const ScreenTransitionAnimation(
        // Screen transition animation on change of selected tab.
        animateTabTransition: true,
        curve: Curves.ease,
        duration: Duration(milliseconds: 200),
      ),
       */
    );
  }
}
