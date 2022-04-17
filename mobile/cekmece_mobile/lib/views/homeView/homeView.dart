import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

import '../../models/product/Product.dart';
import '../productView/components/size.dart';

class HomeView extends StatefulWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  List<Product> cars = [
    Product(
        id: 1,
        name: "RB-18B",
        price: 123,
        number: 1,
        model: 2019,
        quantity: 1,
        warranty: 1,
        distributor: {"name": "Mercedes"},
        category: {"name": "Formula 1"})
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          CarouselSlider(
            options: CarouselOptions(
              height: getProportionateScreenHeight(160),
              autoPlay: true,
              autoPlayInterval: const Duration(seconds: 6),
              enlargeCenterPage: true,
              viewportFraction: 0.75,
            ),
            items: [1, 2, 3, 4, 5].map((i) {
              return Builder(
                builder: (BuildContext context) {
                  return Container(
                      width: MediaQuery.of(context).size.width,
                      margin: EdgeInsets.symmetric(horizontal: 5.0),
                      decoration: BoxDecoration(color: Colors.amber),
                      child: Text(
                        'text $i',
                        style: TextStyle(fontSize: 16.0),
                      ));
                },
              );
            }).toList(),
          )
        ],
      ),
      appBar: AppBar(
        title: Text("CarWow"),
        centerTitle: true,
      ),
    );
  }
}
