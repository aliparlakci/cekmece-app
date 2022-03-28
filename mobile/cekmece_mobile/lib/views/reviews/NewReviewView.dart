import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

import '../../widgets/linearProgressBar.dart';

class NewReviewView extends StatefulWidget {
  const NewReviewView({Key? key, required this.carId}) : super(key: key);
  final int carId;

  @override
  State<NewReviewView> createState() => _NewReviewViewState();
}

class _NewReviewViewState extends State<NewReviewView> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController textEditingController = TextEditingController();
  bool isUploading = false;

  handleSubmit(context) {
    return;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'New Review',
        ),
        actions: [
          TextButton(
            onPressed: isUploading ? null : () => handleSubmit(context),
            child: Text("Post", style: appBarActionTextStyle),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(children: [
          if (isUploading) LinearProgressBar(),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal:3.9),
            child: ListTile(
              title: Column(
                children: [
                  RatingBar.builder(
                    initialRating: 3,
                    glow: false,
                    minRating: 1,
                    maxRating: 5,
                    direction: Axis.horizontal,
                    allowHalfRating: false,
                    itemCount: 5,
                    itemSize: 40,
                    itemPadding: EdgeInsets.symmetric(horizontal:10),
                    unratedColor: const Color(0xFFCDCDCD),
                    itemBuilder: (context, _) => const Icon(
                      Icons.star,
                      color: Colors.black,
                    ),
                    onRatingUpdate: (rating) {
                      print(rating);
                    },
                  ),
                  /*
                  TextField(
                    maxLines: 15,
                    minLines: 5,
                    controller: textEditingController,
                    decoration: InputDecoration(
                      hintStyle: newReviewHintStyle,
                      hintText: "What's on your mind?",
                      border: InputBorder.none,
                    ),
                    style: reviewTileCommentStyle,
                  ),
                  const Divider(
                    thickness: 2,
                    color: Color(0x9ED9D9D9),
                  ),
                   */
                  SizedBox(height: 20),
                  TextField(
                    maxLines: 15,
                    minLines: 5,
                    controller: TextEditingController(),
                    decoration: InputDecoration(
                      labelText: "Comment",
                      labelStyle: newReviewTextFieldActiveLabelStyle,
                      floatingLabelStyle: newReviewTextFieldActiveLabelStyle,
                      floatingLabelBehavior: FloatingLabelBehavior.always,
                      enabledBorder: const OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(0)),
                          borderSide: BorderSide(
                            color: Color(0xFFB0B0B0),
                          )
                      ),
                      focusedBorder: const OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(0)),
                          borderSide: BorderSide(
                            color: Color(0xFF919191),
                          )
                      ),
                      fillColor: const Color(0xFFF6F6F6),
                      filled: true,
                      contentPadding: EdgeInsets.symmetric(horizontal: 25, vertical: 15),
                      isCollapsed: true, // FOR CENTERING THE TEXT INSIDE TEXT FORM FIELD
                    ),
                    style: newReviewTextFieldFillStyle,
                  ),

                ],
              ),
            ),
          ),
        ]),
      ),
    );
  }
}
