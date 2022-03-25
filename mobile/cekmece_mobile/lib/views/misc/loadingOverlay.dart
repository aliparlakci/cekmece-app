import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/views/misc/loadingView.dart';
import 'package:flutter/material.dart';

class LoadingOverlay {
  late OverlayEntry _overlay;

  void show(BuildContext context) {
    _overlay = OverlayEntry(
      // replace with your own layout
      builder: (context) => ColoredBox(
        color: primaryColor.withOpacity(0.5),
        child: LoadingView(),
      ),
    );
    Overlay.of(context)?.insert(_overlay);
  }

  void hide() {
    _overlay.remove();
  }
}
