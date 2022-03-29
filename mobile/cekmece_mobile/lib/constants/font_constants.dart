import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

var header = GoogleFonts.raleway(
    fontSize: 48,
    fontWeight: FontWeight.w700,
    color: Colors.black,
    letterSpacing: 1);

var loadingViewTitle = GoogleFonts.ubuntu(
    fontSize: 48,
    fontWeight: FontWeight.w600,
    color: Colors.white,
    letterSpacing: 2);

var header2 = GoogleFonts.ubuntu(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    color: neutralColor,
    letterSpacing: 1);

var header3 = GoogleFonts.ubuntu(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: neutralColor,
    letterSpacing: 1);

var textDefault = GoogleFonts.ubuntu(
    fontSize: 10,
    fontWeight: FontWeight.w400,
    color: neutralColor,
    letterSpacing: 1);

final kHintTextStyle = TextStyle(
  color: Colors.white54,
  fontFamily: 'OpenSans',
);

final kLabelStyle = TextStyle(
  color: Colors.white,
  fontWeight: FontWeight.bold,
  fontFamily: 'OpenSans',
);

final kBoxDecorationStyle = BoxDecoration(
  color: Color(0xFF6CA8F1),
  borderRadius: BorderRadius.circular(10.0),
  boxShadow: [
    BoxShadow(
      color: Colors.black12,
      blurRadius: 6.0,
      offset: Offset(0, 2),
    ),
  ],
);


/* General */

final appBarTextStyle = GoogleFonts.raleway(
  fontSize: 20,
  fontWeight: FontWeight.w600,
  color: Colors.black,
);

final buttonTextStyle = GoogleFonts.raleway(
  fontSize: 16,
  fontWeight: FontWeight.w700,
  color: Colors.black,
);

final blackButtonTextStyle = GoogleFonts.raleway(
  fontSize: 16,
  fontWeight: FontWeight.w700,
  color: Colors.white,
);

final bottomBarBlackButtonTextStyle = GoogleFonts.raleway(
  fontSize: 17,
  fontWeight: FontWeight.w700,
  color: Colors.white,
);

/* showSnackBar.dart */

final snackBarTextStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w700,
  color: Colors.white,
);


/* ReviewsView.dart */

final errorTextStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w700,
  color: Colors.black,
);


/* ReviewTile.dart */

final reviewTileDateStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w600,
  color: Colors.black,
);

final reviewTileCommentStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w500,
  color: Colors.black,
);

final reviewTileUnapprovedCommentStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontStyle: FontStyle.italic,
  fontWeight: FontWeight.w500,
  color: Colors.black,
);

final reviewTileMoreLessStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w700,
  color: Colors.black,
);

final popUpMenuItemTextStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w600,
  color: Colors.black,
);

/* NewReviewView.dart */

final appBarActionTextStyle = GoogleFonts.raleway(
  fontSize: 20,
  fontWeight: FontWeight.w600,
  color: primaryColor,
);

final newReviewHintStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w500,
  color: const Color(0xFF888888),
);

final newReviewTextFormFieldActiveLabelStyle = GoogleFonts.raleway(
  fontWeight: FontWeight.w600,
  fontSize: 20,
  color: Color(0xFF919191),
);

final newReviewTextFieldFormInactiveLabelStyle = GoogleFonts.raleway(
  fontWeight: FontWeight.w600,
  fontSize: 20,
  color: const Color(0xFF888888),
);

final newReviewTextFormFieldFillStyle = GoogleFonts.raleway(
  fontWeight: FontWeight.w600,
  fontSize: 15,
  color: Colors.black,
);

final newReviewTextFormFieldErrorFillStyle = GoogleFonts.raleway(
  fontWeight: FontWeight.w600,
  fontSize: 15,
  color: Colors.red,
);
