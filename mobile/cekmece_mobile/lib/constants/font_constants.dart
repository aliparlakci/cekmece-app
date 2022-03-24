import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

var header = GoogleFonts.ubuntu(
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
    color: Colors.black,
    letterSpacing: 1);

var header3 = GoogleFonts.ubuntu(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: Colors.black,
    letterSpacing: 1);

var textDefault = GoogleFonts.ubuntu(
    fontSize: 10,
    fontWeight: FontWeight.w400,
    color: Colors.black,
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
