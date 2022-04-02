import 'package:carousel_slider/carousel_controller.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/components/zoomedPicture.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

List<String> images = [
  "assets/images/rb16b-1.jpg",
  "assets/images/rb16b-2.jpg",
  "assets/images/rb16b-3.jpg",
  "assets/images/rb16b-4.jpg",
  "assets/images/rb16b-5.jpg",
];

class ProductImages extends StatefulWidget {
  const ProductImages({
    Key? key,
    required this.product,
  }) : super(key: key);

  final Product product;

  @override
  _ProductImagesState createState() => _ProductImagesState();
}

class _ProductImagesState extends State<ProductImages> {
  final CarouselController _controller = CarouselController();
  int _current = 0;
  int selectedImage = 0;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CarouselSlider.builder(
          itemCount: 5,
          carouselController: _controller,
          options: CarouselOptions(
              aspectRatio: 16 / 9,
              viewportFraction: 1,
              height: getProportionateScreenHeight(310),
              onPageChanged: (index, reason) {
                setState(() {
                  _current = index;
                });
              }),
          itemBuilder:
              (BuildContext context, int itemIndex, int pageViewIndex) =>
                  Container(
            child: GestureDetector(
                onTap: () {
                  pushNewScreen(
                    context,
                    screen: ZoomedPicture(
                      url: "assets/images/rb16b-${itemIndex + 1}.jpg",
                    ),
                    withNavBar: false, // OPTIONAL VALUE. True by default.
                    pageTransitionAnimation: PageTransitionAnimation.cupertino,
                  );
                },
                child: Image.asset("assets/images/rb16b-${itemIndex + 1}.jpg")),
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: images.asMap().entries.map((entry) {
            return Container(
              width: 12.0,
              height: 12.0,
              margin: EdgeInsets.symmetric(vertical: 8.0, horizontal: 4.0),
              decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: (Theme.of(context).brightness == Brightness.dark
                          ? Colors.white
                          : Colors.black)
                      .withOpacity(_current == entry.key ? 0.9 : 0.4)),
            );
          }).toList(),
        )
      ],
    );
  }
}
