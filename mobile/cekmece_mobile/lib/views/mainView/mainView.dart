import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/views/productsView/productsView.dart';
import 'package:cekmece_mobile/views/productsView/sortAndFilterOptions.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

class MainView extends StatefulWidget {
  const MainView({Key? key}) : super(key: key);

  @override
  State<MainView> createState() => _MainViewState();
}

class _MainViewState extends State<MainView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(5, 60, 5, 15),
            child: Center(
                child: Image.asset(
              "assets/images/logo.png",
              height: 100,
            )),
          ),
          Text("CarWow", style: mainViewTitle),
          const SizedBox(
            height: 5,
          ),
          Text("Driven by passion", style: mainViewSubTitle),
          const SizedBox(height: 10,),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: InkWell(
              onTap: () {
                pushNewScreen(context, screen: const ProductsView(carouselSortOption: SortOptions.POP_DESC,));
              },
              child: Stack(
                alignment: Alignment.bottomCenter,
                children: [
                Image.asset(
                  "assets/images/popularCarousel.jpg",
                  width: 750,
                  fit: BoxFit.cover,
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 30),
                  child: Column(
                    children: [
                      Text("CHECK OUT", style: mainViewCardText),
                      Text("WHAT'S POPULAR", style: mainViewCardTextAlternate),
                    ],
                  ),
                ),
              ],),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
            child: InkWell(
              onTap: () {
                pushNewScreen(context, screen: const ProductsView(carouselSortOption: SortOptions.PRICE_DESC,));
              },
              child: Stack(
                alignment: Alignment.topLeft,
                children: [
                  Image.asset(
                    "assets/images/expensiveCarousel.jpg",
                    width: 750,
                    fit: BoxFit.cover,
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 25, horizontal: 25),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("LOOKING FOR", style: mainViewCardText),
                        Text("LUXURY?", style: mainViewCardTextAlternate),
                      ],
                    ),
                  ),
                ],),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
            child: InkWell(
              onTap: () {
                pushNewScreen(context, screen: const ProductsView(carouselSortOption: SortOptions.PRICE_ASC,));
              },
              child: Stack(
                alignment: Alignment.topCenter,
                children: [
                  Image.asset(
                    "assets/images/affordableCarousel.jpg",
                    width: 750,
                    fit: BoxFit.cover,
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 25, horizontal: 25),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text("AFFORDABLE", style: mainViewCardTextAlternateBlack),
                        Text("IS THE WAY TO GO", style: mainViewCardTextBlack),
                      ],
                    ),
                  ),
                ],),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
            child: InkWell(
              onTap: () {
                pushNewScreen(context, screen: const ProductsView());
              },
              child: Stack(
                alignment: Alignment.topRight,
                children: [
                  Image.asset(
                    "assets/images/fullCollectionCarousel.jpg",
                    width: 750,
                    fit: BoxFit.cover,
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 25, horizontal: 25),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text("SEE FULL", style: mainViewCardText),
                        Text("COLLECTION", style: mainViewCardTextAlternate),
                      ],
                    ),
                  ),
                ],),
            ),
          ),
        ],
      ),
    ));
  }
}
