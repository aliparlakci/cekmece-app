import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class LoadingView extends StatefulWidget {
  @override
  _LoadingViewState createState() => _LoadingViewState();
}

class _LoadingViewState extends State<LoadingView>
    with SingleTickerProviderStateMixin {
  late AnimationController ctrl = AnimationController(
      vsync: this, duration: const Duration(milliseconds: 1200));

  @override
  void dispose() {
    // TODO: implement dispose
    ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black.withOpacity(0.5),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SpinKitSquareCircle(
            color: Colors.white,
            size: 80.0,
            controller: ctrl,
          ),
        ],
      ),
    );
  }
}
