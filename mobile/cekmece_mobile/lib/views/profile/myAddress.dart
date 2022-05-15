import 'package:cekmece_mobile/views/order/views/addressPick.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

class MyAddressView extends StatefulWidget {
  const MyAddressView({Key? key}) : super(key: key);

  @override
  State<MyAddressView> createState() => _MyAddressViewState();
}

class _MyAddressViewState extends State<MyAddressView> {
  late Future<String> _address;

  Future<String> getAddress() async {
    await Future.delayed(Duration(seconds: 2));
    return "Istanbul Maltepe";
  }

  void setAddress() async {
    var address = await pushNewScreen(
      context,
      screen: AddressPicker(
        returnAddress: true,
        prevContext: context,
      ),
      withNavBar: false, // OPTIONAL VALUE. True by default.
      pageTransitionAnimation: PageTransitionAnimation.cupertino,
    );
    if (address != null) {
      setState(() {});
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _address = getAddress();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("My address"),
      ),
      body: Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
        SizedBox(
          width: double.infinity,
        ),
        Expanded(
          flex: 5,
          child: FutureBuilder<String>(
            future: _address,
            builder: (
              BuildContext context,
              AsyncSnapshot<String> snapshot,
            ) {
              print(snapshot.connectionState);
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(child: CircularProgressIndicator());
              } else if (snapshot.connectionState == ConnectionState.done) {
                if (snapshot.hasError) {
                  return const Text('Error');
                } else if (snapshot.hasData) {
                  return AdressDisplay(address: snapshot.data!);
                } else {
                  return const Text('Empty data');
                }
              } else {
                return Text('State: ${snapshot.connectionState}');
              }
            },
          ),
        ),
        Expanded(
            child: Padding(
          padding: const EdgeInsets.fromLTRB(15, 10, 15, 20),
          child: GetLocationButton(
            onPressed: setAddress,
          ),
        ))
      ]),
    );
  }
}

class AdressDisplay extends StatelessWidget {
  AdressDisplay({Key? key, required this.address}) : super(key: key);
  String address;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text(
          "Your current delivery address is: ",
          style: GoogleFonts.raleway(
              fontSize: getProportionateScreenHeight(20),
              fontWeight: FontWeight.w500),
        ),
        SizedBox(
          height: 20,
        ),
        Text(
          address,
          style: GoogleFonts.raleway(
              fontSize: getProportionateScreenHeight(25),
              fontWeight: FontWeight.w600),
        )
      ]),
    );
  }
}
