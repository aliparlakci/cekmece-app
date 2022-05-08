import 'dart:convert';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/unreviewedOrderItem/UnreviewedOrderItem.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../../util/network/networkProvider.dart';
import '../../widgets/linearProgressBar.dart';
import '../../widgets/showSnackBar.dart';
import 'package:intl/intl.dart';

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

  @override
  void initState() {
    // TODO: implement initState
    getUnreviewedOrderItems();
    super.initState();
  }

  bool isLoading = false;
  List<UnreviewedOrderItem> unreviewedOrderItems = [];

  String orderItemId = "";

  double rating = 3;
  String comment = "";
  bool isUploading = false;
  bool autoValidate = false;

  Future getUnreviewedOrderItems() async {
    final networkService = Provider.of<NetworkService>(context, listen: false);
    setState(() {
      isLoading = true;
    });

    try {
      var response = await networkService.get(
          "${dotenv.env['CLIENT_URL']}/api/orders/unreviewed/${widget.carId}");

      unreviewedOrderItems = (response as List)
          .map((jsonObj) => UnreviewedOrderItem.fromJson(jsonObj))
          .toList();

      setState(() {
        isLoading = false;
      });
    }
    catch(e) {
      print(e);
      setState(() {
        isLoading = false;
      });
    }
  }

  Future submitReview(context) async {
    try {
      setState(() {
        isUploading = true;
      });

      final networkService =
          Provider.of<NetworkService>(context, listen: false);
      var response = await networkService.post(
          "${dotenv.env['CLIENT_URL']}/api/cars/${widget.carId}/reviews/new",
          body: comment.isNotEmpty
              ? {
                  "rating": rating,
                  "comment": comment,
                  "orderItemId": orderItemId
                }
              : {"rating": rating, "orderItemId": orderItemId});

      Navigator.of(context).pop();
      widget.onSuccess();
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
              onPressed: isUploading ||
                      orderItemId == "" ||
                      !_formKey.currentState!.validate()
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
              style: ButtonStyle(
                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                backgroundColor: MaterialStateProperty.resolveWith<Color>((states) {
                  if (states.contains(MaterialState.disabled)) {
                    return Color(0xFF515151); // Disabled color
                  }
                  return Colors.black; // Regular color
                }),
                shape: MaterialStateProperty.resolveWith<RoundedRectangleBorder>((states) {
                  return RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(0)));
                }),
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
              padding: const EdgeInsets.fromLTRB(3.9, 15, 3.9, 3.9),
              child: ListTile(
                title: Column(
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        border: Border.all(color: Color(0x40000000)),
                        gradient: const LinearGradient(
                          colors: [
                            Color(0xFF6faeed),
                            Color(0xFFc899f5),
                          ],
                        ),
                      ),
                      child: DropdownButton(
                        underline: Container(),
                        isExpanded: true,
                        value: orderItemId,
                        style: popUpMenuItemSelectedTextStyle,
                        icon: const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 10),
                          child: Icon(
                            Icons.expand_more,
                            color: Colors.white,
                          ),
                        ),
                        onChanged: (String? newValue) {
                          print(newValue);
                          setState(() {
                            orderItemId = newValue!;
                          });
                        },
                        selectedItemBuilder: (BuildContext ctx) {
                          return [
                                DropdownMenuItem<String>(
                                  value: "",
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 15.0),
                                    child: Text("Select Order",
                                        style: popUpMenuItemSelectedTextStyle),
                                  ),
                                  enabled: false,
                                )
                              ] +
                              unreviewedOrderItems.map<
                                      DropdownMenuItem<String>>(
                                  (UnreviewedOrderItem unreviewedOrderItem) {
                                return DropdownMenuItem<String>(
                                  value: unreviewedOrderItem.id,
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 15.0),
                                    child: Text(
                                        "Delivered on ${DateFormat.yMMMd().format(unreviewedOrderItem.order.updatedDate)} - Order #${unreviewedOrderItem.order.id}",
                                        style: popUpMenuItemSelectedTextStyle),
                                  ),
                                );
                              }).toList();
                        },
                        items: [
                              DropdownMenuItem<String>(
                                value: "",
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 15.0),
                                  child: Text("Select Order",
                                      style: popUpMenuItemDisabledTextStyle),
                                ),
                                enabled: false,
                              )
                            ] +
                            unreviewedOrderItems.map<DropdownMenuItem<String>>(
                                (UnreviewedOrderItem unreviewedOrderItem) {
                              return DropdownMenuItem<String>(
                                value: unreviewedOrderItem.id,
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 15.0),
                                  child: Text(
                                      "Delivered on ${DateFormat.yMMMd().format(unreviewedOrderItem.order.updatedDate)} - Order ${unreviewedOrderItem.order.id}",
                                      style: popUpMenuItemTextStyle),
                                ),
                              );
                            }).toList(),
                      ),
                    ),
                    const SizedBox(height: 17),
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
