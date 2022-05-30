import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

var header = GoogleFonts.raleway(
    fontSize: 48,
    fontWeight: FontWeight.w700,
    color: Colors.black,
    letterSpacing: 1);

var loadingViewTitle = GoogleFonts.raleway(
    fontSize: 48,
    fontWeight: FontWeight.w600,
    color: Colors.white,
    letterSpacing: 2);

var header2 = GoogleFonts.raleway(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    color: neutralColor,
    letterSpacing: 1);

var header3 = GoogleFonts.raleway(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: neutralColor,
    letterSpacing: 1);

var textDefault = GoogleFonts.raleway(
    fontSize: 10,
    fontWeight: FontWeight.w400,
    color: neutralColor,
    letterSpacing: 1);

final kHintTextStyle = GoogleFonts.raleway(
  fontSize: 13,
  fontWeight: FontWeight.w400,
  color: Colors.black,
);

final kLabelStyle = GoogleFonts.raleway(
    fontSize: 15,
    fontWeight: FontWeight.w600,
    color: Colors.white,
    letterSpacing: 1);

final kBoxDecorationStyle = BoxDecoration(
  color: Colors.white,
  borderRadius: BorderRadius.circular(5.0),
  boxShadow: [
    BoxShadow(
      color: Colors.white,
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

/* ReviewsListHeader.dart */

final reviewCountHeader700 = GoogleFonts.raleway(
  fontSize: 20,
  fontWeight: FontWeight.w700,
  color: Colors.black,
);

final reviewCountHeader500 = GoogleFonts.raleway(
  fontSize: 20,
  fontWeight: FontWeight.w500,
  color: Colors.black,
);

final yourReviewsHeader700 = GoogleFonts.raleway(
  fontSize: 20,
  fontWeight: FontWeight.w800,
  color: Colors.white,
);

final yourReviewsHeader400 = GoogleFonts.raleway(
  fontSize: 20,
  fontWeight: FontWeight.w500,
  color: Colors.white,
);

final averageRatingHeader = GoogleFonts.raleway(
  fontSize: 24,
  fontWeight: FontWeight.w700,
  color: Colors.black,
);

final linearProgressLabelStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w500,
  color: Colors.black,
);

final linearProgressLabelStyleAlt = GoogleFonts.raleway(
  fontSize: 13,
  fontWeight: FontWeight.w500,
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

final popUpMenuItemSelectedTextStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w600,
  color: Colors.white,
);

final popUpMenuItemDisabledTextStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w600,
  color: Colors.grey,
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

/* Products View */

final productCardModelAndDistributorTextStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w600,
  color: Colors.black,
);

final productCardNameTextStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w500,
  color: Colors.black,
);

final productCardPriceTextStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w700,
  color: Colors.black,
);

/* Filter Products View */

final filterProductsTitlesTextStyle = GoogleFonts.raleway(
  fontSize: 18,
  fontWeight: FontWeight.w700,
  color: Colors.black,
);

final filterProductsOptionsTextStyle = GoogleFonts.raleway(
  fontSize: 16,
  fontWeight: FontWeight.w500,
  color: Colors.black,
);

final filterProductsOptionsErrorTextStyle = GoogleFonts.raleway(
  fontSize: 15,
  fontWeight: FontWeight.w600,
  color: Colors.red,
);

final filterProductsOptionsSelectedTextStyle = GoogleFonts.raleway(
  fontSize: 16,
  fontWeight: FontWeight.w700,
  color: Colors.black,
);

final filterProductsUnselectedCategoryChipTextStyle = GoogleFonts.raleway(
  fontSize: 16,
  fontWeight: FontWeight.w600,
  color: Colors.black,
);

final filterProductsSelectedCategoryChipTextStyle = GoogleFonts.raleway(
  fontSize: 16,
  fontWeight: FontWeight.w600,
  color: Colors.white,
);

/* Main View */

final mainViewTitle = GoogleFonts.raleway(
  fontSize: 24,
  fontWeight: FontWeight.w600,
  color: Colors.black,
);

final mainViewSubTitle = GoogleFonts.raleway(
  fontSize: 18,
  fontWeight: FontWeight.w400,
  color: Colors.black,
  fontStyle: FontStyle.italic
);

final mainViewCardText = GoogleFonts.raleway(
    fontSize: 18,
    fontWeight: FontWeight.w500,
    color: Colors.white,
);

final mainViewCardTextAlternate = GoogleFonts.raleway(
  fontSize: 20,
  fontWeight: FontWeight.w800,
  color: Colors.white,
);

final mainViewCardTextBlack = GoogleFonts.raleway(
  fontSize: 18,
  fontWeight: FontWeight.w500,
  color: Colors.black,
);

final mainViewCardTextAlternateBlack = GoogleFonts.raleway(
  fontSize: 20,
  fontWeight: FontWeight.w800,
  color: Colors.black,
);