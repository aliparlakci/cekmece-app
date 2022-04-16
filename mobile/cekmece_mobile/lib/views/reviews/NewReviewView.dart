import 'dart:convert';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:http/http.dart' as http;
import '../../widgets/linearProgressBar.dart';
import '../../widgets/showSnackBar.dart';

class NewReviewView extends StatefulWidget {
  const NewReviewView({Key? key, required this.carId, required this.onSuccess})
      : super(key: key);
  final int carId;
  final Function() onSuccess;

  @override
  State<NewReviewView> createState() => _NewReviewViewState();
}

class _NewReviewViewState extends State<NewReviewView> {
  final _formKey = GlobalKey<FormState>();
  String comment = "";
  double rating = 3;
  bool isUploading = false;
  bool autoValidate = false;

  Future submitReview(context) async {
    try {
      setState(() {
        isUploading = true;
      });

      var response = await http
          .post(
              Uri.parse(
                  "${dotenv.env['CLIENT_URL']}/api/cars/${widget.carId}/reviews/new"),
              headers: <String, String>{
                'Content-Type': 'application/json; charset=UTF-8',
              },
              body: comment.isNotEmpty
                  ? jsonEncode(
                      <String, dynamic>{"rating": rating, "comment": comment})
                  : jsonEncode(<String, dynamic>{"rating": rating}))
          .timeout(const Duration(seconds: 5));

      if (response.statusCode < 400) {
        Navigator.of(context).pop();
        widget.onSuccess();
      } else {
        showSnackBar(
            context: context,
            message: "An error occurred while submitting the review.",
            error: true);
      }
    } catch (e) {
      showSnackBar(
          context: context,
          message: "An error occurred while submitting the review.",
          error: true);
    }

    setState(() {
      isUploading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScopeNode currentFocus = FocusScope.of(context);
        if (!currentFocus.hasPrimaryFocus) {
          currentFocus.unfocus();
        }
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            'New Review',
          ),
        ),
        bottomNavigationBar: Container(
          color: Colors.white,
          height: MediaQuery.of(context).size.height / 12.5,
          child: Padding(
            padding: const EdgeInsets.all(5.0),
            child: TextButton(
              onPressed: isUploading
                  ? null
                  : () {
                      if (_formKey.currentState!.validate()) {
                        // All Good
                        _formKey.currentState!.save();
                        submitReview(context);
                      } else {
                        setState(() {
                          autoValidate = true;
                        });
                      }
                    },
              style: TextButton.styleFrom(
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                backgroundColor: Colors.black,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(0),
                ),
              ),
              child:
                  Text("SUBMIT REVIEW", style: bottomBarBlackButtonTextStyle),
            ),
          ),
        ),
        body: SingleChildScrollView(
          child: Stack(children: [
            if (isUploading) LinearProgressBar(),
            Padding(
              padding: const EdgeInsets.fromLTRB(3.9, 20, 3.9, 3.9),
              child: ListTile(
                title: Column(
                  children: [
                    RatingBar(
                      initialRating: 3,
                      glow: false,
                      minRating: 1,
                      maxRating: 5,
                      itemCount: 5,
                      itemSize: 40,
                      itemPadding: const EdgeInsets.symmetric(horizontal: 10),
                      ratingWidget: RatingWidget(
                        full: const Icon(Icons.star_sharp, color: Colors.black),
                        half: const Icon(Icons.star_half, color: Colors.black),
                        empty: const Icon(Icons.star_outline_sharp,
                            color: Colors.black),
                      ),
                      onRatingUpdate: (double rt) {
                        rating = rt;
                      },
                    ),
                    const SizedBox(height: 20),
                    Form(
                      key: _formKey,
                      autovalidateMode: autoValidate
                          ? AutovalidateMode.onUserInteraction
                          : AutovalidateMode.disabled,
                      child: TextFormField(
                        enabled: !isUploading,
                        maxLines: 20,
                        minLines: 5,
                        decoration: InputDecoration(
                          labelText: "Comment (Optional)",
                          labelStyle: newReviewTextFormFieldActiveLabelStyle,
                          floatingLabelStyle:
                              newReviewTextFormFieldActiveLabelStyle,
                          floatingLabelBehavior: FloatingLabelBehavior.always,
                          enabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(0)),
                              borderSide: BorderSide(
                                color: Color(0xFFB0B0B0),
                              )),
                          focusedBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(0)),
                              borderSide: BorderSide(
                                color: Color(0xFF919191),
                              )),
                          disabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(0)),
                              borderSide: BorderSide(
                                color: Color(0xFFB0B0B0),
                              )),
                          errorMaxLines: 2,
                          errorStyle: newReviewTextFormFieldErrorFillStyle,
                          errorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(0)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          focusedErrorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(0)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          fillColor: const Color(0xFFF6F6F6),
                          filled: true,
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 25, vertical: 15),
                          isCollapsed:
                              true, // FOR CENTERING THE TEXT INSIDE TEXT FORM FIELD
                        ),
                        style: newReviewTextFormFieldFillStyle,
                        onSaved: (value) {
                          if (value != null) {
                            comment = value.trim();
                          }
                        },
                        validator: (value) {
                          String toValidate = value!.trim();
                          if (toValidate.isNotEmpty) {
                            if (toValidate.length < 3) {
                              return "A comment must have at least 3 characters.";
                            } else if (toValidate.length > 1000) {
                              return "A comment can have at most 1000 characters.";
                            } else {
                              return null;
                            }
                          }
                          return null;
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ]),
        ),
      ),
    );
  }
}
