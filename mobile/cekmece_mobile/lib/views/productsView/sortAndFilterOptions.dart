import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:flutter/material.dart';

enum SortOptions {
  PRICE_ASC,
  PRICE_DESC,
  MODEL_ASC,
  MODEL_DESC,
  POP_ASC,
  POP_DESC,
}

class FilterOptions {
  SortOptions? sortOption;
  int? minPrice;
  int? maxPrice;
  int? minModel;
  int? maxModel;
  List<String> selectedCategories;

  //FilterOptions({this.sortOption, this.minPrice, this.maxPrice, this.minModel, this.maxModel, this.selectedCategories});
  FilterOptions({required this.selectedCategories});
  FilterOptions.fromCarousel({required this.sortOption, required this.selectedCategories});

  bool isNoFilterApplied({required Set<String> categories}) {
    if (selectedCategories.length == categories.length &&
        minPrice == null &&
        maxPrice == null &&
        minModel == null &&
        maxModel == null &&
        sortOption == null) {
      return true;
    }
    return false;
  }

  List<Product> applyFilterToProducts(List<Product> products) {
    List<Product> sortedAndFilteredProducts = List.from(products);
    int tempMinPrice = minPrice ?? 0;
    int tempMaxPrice = maxPrice ?? 9223372036854775807;
    int tempMinModel = minModel ?? 0;
    int tempMaxModel = maxModel ?? 9223372036854775807;

    sortedAndFilteredProducts = sortedAndFilteredProducts.where((product) {
      if (product.price < tempMinPrice || product.price > tempMaxPrice) {
        return false;
      }

      if (product.model < tempMinModel || product.model > tempMaxModel) {
        return false;
      }

      if (!selectedCategories.contains(product.category["name"])) {
        return false;
      }

      return true;
    }).toList();

    if (sortOption == SortOptions.PRICE_ASC) {
      sortedAndFilteredProducts.sort((a, b) => a.price.compareTo(b.price));
    } else if (sortOption == SortOptions.PRICE_DESC) {
      sortedAndFilteredProducts.sort((b, a) => a.price.compareTo(b.price));
    } else if (sortOption == SortOptions.MODEL_ASC) {
      sortedAndFilteredProducts.sort((a, b) => a.model.compareTo(b.model));
    } else if (sortOption == SortOptions.MODEL_DESC) {
      sortedAndFilteredProducts.sort((b, a) => a.model.compareTo(b.model));
    } else if (sortOption == SortOptions.POP_ASC) {
      sortedAndFilteredProducts.sort((a, b) => a.unitsSold.compareTo(b.unitsSold));
    } else if (sortOption == SortOptions.POP_DESC) {
      sortedAndFilteredProducts.sort((b, a) => a.unitsSold.compareTo(b.unitsSold));
    }

    return sortedAndFilteredProducts;
  }

  @override
  String toString() {
    return "sortOption: $sortOption, minPrice: $minPrice, maxPrice: $maxPrice, minModel: $minModel, maxModel: $maxModel, selectedCategories: $selectedCategories";
  }
}
