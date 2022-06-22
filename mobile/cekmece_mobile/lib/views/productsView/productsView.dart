import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/views/productsView/filterProductsView.dart';
import 'package:cekmece_mobile/views/productsView/productCard.dart';
import 'package:cekmece_mobile/views/productsView/sortAndFilterOptions.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:badges/badges.dart';

class ProductsView extends StatefulWidget {
  const ProductsView({Key? key, this.carouselSortOption, required this.appBarTitle}) : super(key: key);

  final SortOptions? carouselSortOption;
  final String appBarTitle;

  @override
  State<ProductsView> createState() => _ProductsViewState();
}

class _ProductsViewState extends State<ProductsView> {
  bool isLoading = true;
  bool error = false;
  bool firstTime = true;

  List<Product> products = [];
  Set<String> categories = {};

  FilterOptions? filterOptions;
  List<Product> sortedAndFilteredProducts = [];

  final RefreshController _refreshController =
      RefreshController(initialRefresh: false);

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getCars();
  }

  Future getCars() async {
    setState(() {
      isLoading = true;
      error = false;
    });

    try {
      var response = await http.get(
          Uri.parse("${dotenv.env['CLIENT_URL']}/api/cars"),
          headers: <String, String>{
            "Accept": "application/json",
            "Content-Type": "charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          }).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        products = (jsonDecode(response.body) as List)
            .map((product) => Product.fromJson(product))
            .toList();

        categories.clear();
        for (Product product in products) {
          categories.add(product.category["name"]);
        }

        if (firstTime && widget.carouselSortOption != null) {
          filterOptions = FilterOptions.fromCarousel(sortOption: widget.carouselSortOption, selectedCategories: categories.toList());
          firstTime = false;
        }

        if (filterOptions != null) {
          setState(() {
            sortedAndFilteredProducts = filterOptions!.applyFilterToProducts(products);
          });
        }

        _refreshController.refreshCompleted();
      }
    } catch (e) {
      setState(() {
        error = true;
      });
      _refreshController.refreshFailed();
      print(e);
    }

    setState(() {
      isLoading = false;
    });
  }

  void applyFilter(FilterOptions filterOptions) {
    setState(() {
      this.filterOptions = filterOptions;
      sortedAndFilteredProducts = filterOptions.applyFilterToProducts(products);
    });
  }

  void resetFilter() {
    setState(() {
      filterOptions = null;
      sortedAndFilteredProducts = products;
    });
  }

  buildScaffoldBody() {
    Widget child;

    if (isLoading) {
      return const SpinKitWave(
        itemCount: 5,
        color: Colors.black,
        size: 35.0,
      );
    } else if (error) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Icon(CupertinoIcons.exclamationmark_circle, size: 35),
          const SizedBox(height: 10),
          Center(
              child: Text(
                  "An error occurred while getting cars.\nPlease try again later.",
                  textAlign: TextAlign.center,
                  style: errorTextStyle)),
          const SizedBox(height: 50),
        ],
      );
    } else {
      if (filterOptions != null) {
        if (sortedAndFilteredProducts.isEmpty) {
          return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Icon(CupertinoIcons.cube_box, size: 35),
              const SizedBox(height: 10),
              Center(
                  child: Text(
                      "There are no cars that meet the criteria you have specified.",
                      textAlign: TextAlign.center,
                      style: errorTextStyle)),
              const SizedBox(height: 50),
            ],
          );
        }

        return MasonryGridView.count(
            crossAxisCount: 2,
            itemCount: sortedAndFilteredProducts.length,
            crossAxisSpacing: 4,
            mainAxisSpacing: 4,
            itemBuilder: (context, index) {
              return ProductCard(product: sortedAndFilteredProducts[index]);
            });
      }

      if (products.isEmpty) {
        return Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Icon(CupertinoIcons.cube_box, size: 35),
            const SizedBox(height: 10),
            Center(
                child: Text(
                    "There are no cars available to show.",
                    textAlign: TextAlign.center,
                    style: errorTextStyle)),
            const SizedBox(height: 50),
          ],
        );
      }

      return MasonryGridView.count(
          crossAxisCount: 2,
          itemCount: products.length,
          crossAxisSpacing: 4,
          mainAxisSpacing: 4,
          itemBuilder: (context, index) {
            return ProductCard(product: products[index]);
          });
    }

    /*
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 250),
      child: child,
    );
     */
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.appBarTitle),
        leading: IconButton(
          onPressed: () {Navigator.of(context).pop();},
          icon: const Icon(CupertinoIcons.back),
        ),
        actions: [
          IconButton(
            icon: filterOptions != null
                ? Badge(
                    badgeContent: const Text(""),
                    position: BadgePosition.topStart(top: -14),
                    badgeColor: const Color(0xFFCA51FF),
                    child:
                        const Icon(CupertinoIcons.line_horizontal_3_decrease))
                : const Icon(CupertinoIcons.line_horizontal_3_decrease),
            onPressed: isLoading
                ? null
                : () {
                    pushNewScreen(context,
                        screen: FilterProductsView(
                            categories: categories, appliedFilterOptions: filterOptions, applyFilter: applyFilter, resetFilter: resetFilter),
                        withNavBar: false,
                        pageTransitionAnimation:
                            PageTransitionAnimation.cupertino);
                  },
          ),
        ],
      ),
      body: SmartRefresher(
          controller: _refreshController,
          header: WaterDropHeader(),
          physics: BouncingScrollPhysics(),
          onRefresh: getCars,
          child: buildScaffoldBody()),
    );
  }
}
