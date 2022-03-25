import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:flutter/material.dart';

// Our demo Products

List<Product> demoProducts = [
  Product(
    id: "123asd",
    images: [
      "assets/images/rb16b-1.jpg",
      "assets/images/rb16b-2.jpg",
      "assets/images/rb16b-3.jpg",
      "assets/images/rb16b-4.jpg",
      "assets/images/rb16b-5.jpg",
    ],
    title: "YER UÇAĞI - Keyfe Keder Dosta Gider RB16-B - ENNN DOLU PAKET",
    price: 120000000,
    description: description,
    rating: 4.8,
    isFavourite: true,
    isPopular: true,
  )
];
const String description =
    "Merhaba aracımda kesinlikle değişen tramer vs yoktur istediğiniz garaja gösterebilirsiniz lütfen padoktaki diğer araçlarla karşılaştırmayınız. Galeri ve Mercedesciler aramasın";
