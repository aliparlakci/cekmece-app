import 'package:cekmece_mobile/views/search/components/button.dart';
import 'package:cekmece_mobile/views/search/views/manualSearch.dart';
import 'package:cekmece_mobile/views/search/views/searchBot.dart';
import 'package:flutter/material.dart';

class SearchWrapper extends StatefulWidget {
  const SearchWrapper({Key? key}) : super(key: key);

  @override
  State<SearchWrapper> createState() => _SearchWrapperState();
}

class _SearchWrapperState extends State<SearchWrapper> {
  bool wizardActive = true;

  void switchState() {
    setState(() {
      wizardActive = !wizardActive;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Stack(
        children: [
          wizardActive
              ? SearchBot(onCallback: switchState)
              : ManualSearch(
                  onCallback: switchState,
                ),
        ],
      ),
    );
  }
}
