import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';

class PriceSelect extends StatelessWidget {
  final Function setMin;
  final Function setMax;

  PriceSelect({Key? key, required this.setMin, required this.setMax})
      : super(key: key);
  int min = 0;
  int max = 0;

  void setMinimum(int value) {
    min = value;
    setMin(min);
  }

  void setMaximum(int value) {
    max = value;
    setMax(max);
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
              Icons.attach_money,
              size: 150,
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              "How about the price?",
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
              PricePicker(
                priceTag: "Minimum",
                setPrice: setMin,
              ),
              SizedBox(
                height: 30,
              ),
              PricePicker(
                priceTag: "Maximum",
                setPrice: setMax,
              ),
            ],
          ),
        )
      ]),
    );
  }
}

class PricePicker extends StatefulWidget {
  PricePicker({Key? key, required this.priceTag, required this.setPrice})
      : super(key: key);
  final Function setPrice;
  String priceTag;
  @override
  State<PricePicker> createState() => _PricePickerState();
}

class _PricePickerState extends State<PricePicker> {
  final _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: [
        Container(
          height: getProportionateScreenWidth(40),
          width: getProportionateScreenWidth(100),
          color: Colors.black,
          child: Center(
            child: Text(
              widget.priceTag,
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
            maxLength: 12,
            keyboardType: TextInputType.number,
            controller: _controller,
            inputFormatters: [
              FilteringTextInputFormatter.digitsOnly,
              CurrencyTextInputFormatter(symbol: "\$", decimalDigits: 0)
            ],
            onChanged: (val) {
              if (val.isNotEmpty) {
                final output = val.replaceAll(RegExp('[\$,]'), '');
                widget.setPrice(int.tryParse(output));
              } else {
                widget.setPrice(-1);
              }
            },
            decoration: InputDecoration(
                counterText: "",
                hintText: "Price",
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
