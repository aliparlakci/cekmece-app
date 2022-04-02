import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:flutter/material.dart';

Container LinearProgressBar() {
  return Container(
      alignment: Alignment.topCenter,
      child: const LinearProgressIndicator(
        backgroundColor: Colors.transparent,
        valueColor: AlwaysStoppedAnimation(primaryColor),
      )
  );
}