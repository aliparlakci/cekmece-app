import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:flutter/material.dart';

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
  int selectedImage = 0;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: getProportionateScreenHeight(310),
          child: AspectRatio(
            aspectRatio: 4,
            child: Hero(
              tag: widget.product.id.toString(),
              child: Image.asset(widget.product.images[selectedImage]),
            ),
          ),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ...List.generate(widget.product.images.length,
                    (index) => buildSmallProductPreview(index)),
              ],
            ),
          ),
        )
      ],
    );
  }

  GestureDetector buildSmallProductPreview(int index) {
    return GestureDetector(
      onTap: () {
        setState(() {
          selectedImage = index;
        });
      },
      child: AnimatedContainer(
        duration: Duration(milliseconds: 200),
        margin: EdgeInsets.only(right: 15),
        padding: EdgeInsets.all(8),
        height: getProportionateScreenWidth(48),
        width: getProportionateScreenWidth(48),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
              color: Colors.black.withOpacity(selectedImage == index ? 1 : 0)),
        ),
        child: Image.asset(widget.product.images[index]),
      ),
    );
  }
}
