import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

import '../../widgets/ReviewTile.dart';

class ReviewsView extends StatefulWidget {
  const ReviewsView({Key? key, required this.carID}) : super(key: key);
  final int carID;

  @override
  State<ReviewsView> createState() => _ReviewsViewState();
}

class _ReviewsViewState extends State<ReviewsView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Reviews (222)"),
        ),
        body: Column(
          children: [
            ReviewTile(
              rating: 4,
              comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus lorem id scelerisque dignissim. Etiam aliquet commodo mauris ac tempor. In hac habitasse platea dictumst. Cras fermentum egestas neque nec suscipit. Morbi vel leo interdum neque vulputate rhoncus. Proin tincidunt enim pellentesque, egestas mi non, iaculis orci. Mauris pharetra pulvinar tellus a iaculis. Mauris elementum eros eget orci congue semper.",
              date: DateTime.now(),
            ),
            ReviewTile(
              rating: 4,
              comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus lorem id scelerisque dignissim. Etiam aliquet commodo mauris ac tempor. In hac habitasse platea dictumst. Cras fermentum egestas neque nec suscipit. Morbi vel leo interdum neque vulputate rhoncus. Proin tincidunt enim pellentesque, egestas mi non, iaculis orci. Mauris pharetra pulvinar tellus a iaculis. Mauris elementum eros eget orci congue semper.",
              date: DateTime.now(),
            ),
            ReviewTile(
              rating: 4,
              comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus lorem id scelerisque dignissim. Etiam aliquet commodo mauris ac tempor. In hac habitasse platea dictumst. Cras fermentum egestas neque nec suscipit. Morbi vel leo interdum neque vulputate rhoncus. Proin tincidunt enim pellentesque, egestas mi non, iaculis orci. Mauris pharetra pulvinar tellus a iaculis. Mauris elementum eros eget orci congue semper.",
              date: DateTime.now(),
            ),

            /*
            ListView.builder(
                shrinkWrap: true,
                itemCount: posts.length,
                itemBuilder: (context, index) {
                  return posts[index];
                }
            )
             */
          ],
        ));
  }
}
