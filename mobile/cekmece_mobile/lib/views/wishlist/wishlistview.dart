import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:cekmece_mobile/views/search/views/searchResults.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

import '../../models/product/Product.dart';

class WishlistView extends StatefulWidget {
  const WishlistView({Key? key}) : super(key: key);

  @override
  _WishlistViewState createState() => _WishlistViewState();
}

class _WishlistViewState extends State<WishlistView> {
  NumberFormat numberFormat = NumberFormat.simpleCurrency(locale: "en-US");

  late UserBloc userBloc;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    userBloc = BlocProvider.of<UserBloc>(context);
    print(userBloc.user.wishlist);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Wishlist"),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 5),
        child: ListView.builder(
            itemCount: userBloc.user.wishlist.length,
            physics: BouncingScrollPhysics(),
            shrinkWrap: true,
            itemBuilder: (BuildContext context, int index) {
              Product car = userBloc.user.wishlist[index].item;
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 5),
                child: GestureDetector(
                  onTap: () {
                    pushNewScreen(
                      context,
                      screen: DetailsScreen(
                        carId: car.id,
                        userBloc: userBloc,
                      ),
                      withNavBar: false, // OPTIONAL VALUE. True by default.
                      pageTransitionAnimation:
                          PageTransitionAnimation.cupertino,
                    );

                    BlocProvider.of<UserBloc>(context).add(SetUser());
                  },
                  child: Card(
                    elevation: 5,
                    child: Container(
                      height: getProportionateScreenHeight(80),
                      child: Row(
                        children: [
                          Expanded(
                            flex: 2,
                            child: Image.network(car.photoUrl),
                          ),
                          Expanded(
                              flex: 5,
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                    vertical: 10, horizontal: 5),
                                child: Column(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceAround,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      userBloc.user.wishlist[index].item.name,
                                      style: appBarTextStyle,
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          '${car.model} - ${car.distributor["name"]}',
                                          style: buttonTextStyle.copyWith(
                                              fontSize: 12),
                                        ),
                                        Text(
                                          numberFormat.format(car.price),
                                          style: GoogleFonts.raleway(
                                            fontWeight: FontWeight.w600,
                                            fontSize: 15,
                                            color: Colors.black,
                                          ),
                                        ),
                                      ],
                                    )
                                  ],
                                ),
                              ))
                        ],
                      ),
                    ),
                  ),
                ),
              );
            }),
      ),
    );
  }
}
