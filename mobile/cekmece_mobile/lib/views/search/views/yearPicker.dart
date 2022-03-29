import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';

class ModelSelect extends StatelessWidget {
  final Function setMaxi, setMini;
  ModelSelect({Key? key, required this.setMaxi, required this.setMini})
      : super(key: key);
  int min = 0;
  int max = 0;

  void setMin(int value) {
    min = value;
    setMini(min);
  }

  void setMax(int value) {
    max = value;
    setMaxi(max);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Expanded(
          flex: 3,
          child: Column(mainAxisAlignment: MainAxisAlignment.end, children: [
            Icon(
              Icons.drive_eta_sharp,
              size: 150,
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              "What about the model?",
              style: appBarTextStyle.copyWith(fontSize: 30),
              textAlign: TextAlign.center,
            ),
            Text(
              "you can skip this part",
              style: appBarTextStyle.copyWith(fontSize: 15),
              textAlign: TextAlign.center,
            ),
            SizedBox(
              height: 50,
            ),
          ]),
        ),
        Expanded(
          flex: 3,
          child: Column(
            children: [
              YearPicker(
                tag: "Minimum Year",
                setPrice: setMin,
              ),
              SizedBox(
                height: 30,
              ),
              YearPicker(
                tag: "Maximum Year",
                setPrice: setMax,
              ),
            ],
          ),
        )
      ]),
    );
  }
}

class YearPicker extends StatefulWidget {
  YearPicker({Key? key, required this.tag, required this.setPrice})
      : super(key: key);
  final Function setPrice;
  String tag;
  @override
  State<YearPicker> createState() => _YearPickerState();
}

class _YearPickerState extends State<YearPicker> {
  final _controller = TextEditingController();
  NumberFormat numberFormat = NumberFormat.simpleCurrency(locale: "en-US");

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: [
        Container(
          height: getProportionateScreenWidth(40),
          width: getProportionateScreenWidth(160),
          color: Colors.black,
          child: Center(
            child: Text(
              widget.tag,
              style: appBarTextStyle.copyWith(color: Colors.white),
            ),
          ),
        ),
        Container(
          height: getProportionateScreenWidth(50),
          width: getProportionateScreenWidth(200),
          decoration: BoxDecoration(border: Border.all(width: 2)),
          child: TextField(
            textAlign: TextAlign.center,
            style: appBarActionTextStyle.copyWith(color: Colors.black),
            cursorColor: Colors.transparent,
            keyboardType: TextInputType.number,
            controller: _controller,
            maxLength: 4,
            inputFormatters: [
              FilteringTextInputFormatter.digitsOnly,
            ],
            onChanged: (val) {
              if (val.isNotEmpty) {
                widget.setPrice(int.tryParse(val));
              } else {
                widget.setPrice(0);
              }
            },
            decoration: const InputDecoration(
                hintText: "Year",
                counterText: "",
                // [enabledBorder], displayed when [TextField, InputDecoration.enabled] is true
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.transparent),
                ),
                //[focusedBorder], displayed when [TextField, InputDecorator.isFocused] is true
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.transparent),
                )),
          ),
        ),
      ],
    ));
  }
}
