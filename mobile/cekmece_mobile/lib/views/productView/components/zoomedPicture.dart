import 'package:flutter/material.dart';
import 'package:photo_view/photo_view.dart';

class ZoomedPicture extends StatelessWidget {
  String url;
  ZoomedPicture({Key? key, required this.url}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
        child: PhotoView(
      maxScale: 2.0,
      minScale: 0.1,
      imageProvider: NetworkImage(url),
    ));
  }
}
