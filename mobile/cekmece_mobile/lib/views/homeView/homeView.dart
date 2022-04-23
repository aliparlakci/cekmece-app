import 'dart:convert';

import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/views/productView/details_screen.dart';
import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;

import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

import '../../models/product/Product.dart';
import '../productView/components/size.dart';

class HomeView extends StatefulWidget {
  PersistentTabController tabController;
  HomeView({Key? key, required this.tabController}) : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  NumberFormat numberFormat =
      NumberFormat.simpleCurrency(locale: "en-US", decimalDigits: 0);
  String clientURL = dotenv.env['CLIENT_URL']!;
  List<Product> cars = [
    const Product(
        id: 1,
        name: "RB-18B",
        price: 49900,
        number: 1,
        model: 2019,
        quantity: 1,
        warranty: 1,
        distributor: {"name": "RedBull"},
        category: {"name": "Formula 2"}),
    const Product(
        id: 1,
        name: "F1-75",
        price: 85000,
        number: 1,
        model: 2019,
        quantity: 1,
        warranty: 1,
        distributor: {"name": "Ferrari"},
        category: {"name": "Formula 1"}),
    const Product(
        id: 1,
        name: "W13",
        price: 49900,
        number: 1,
        model: 2019,
        quantity: 1,
        warranty: 1,
        distributor: {"name": "Mercedes"},
        category: {"name": "Formula 3"}),
    const Product(
        id: 1,
        name: "Guila",
        price: 38750,
        number: 1,
        model: 2021,
        quantity: 1,
        warranty: 1,
        distributor: {"name": "Alfa Romeo"},
        category: {"name": "Sedan"})
  ];
  List<Map<String, dynamic>> distributors = [];

  void getCars() async {
    cars = [];
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "Car fetch"));
    try {
      final response = await http.get(Uri.parse('$clientURL/api/cars/'));

      if (response.statusCode == 200) {
        for (Map<String, dynamic> carData in jsonDecode(response.body)) {
          Product car = Product.fromJson(carData);
          cars.add(car);
        }
      } else {
        throw Exception('Failed to load product');
      }

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    } catch (err) {
      print(err);
      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    }
    setState(() {});
  }

  void getDistributors() async {
    List<Map<String, dynamic>> result = [];
    try {
      final response =
          await http.get(Uri.parse('$clientURL/api/distributors/'));

      if (response.statusCode == 200) {
        for (Map<String, dynamic> categoryData in jsonDecode(response.body)) {
          result.add(categoryData);
        }
      } else {
        throw Exception('Failed to load product');
      }

      setState(() {});
    } catch (err) {
      print(err);
      distributors = [];
    }
    distributors = result;
    print(distributors);
    setState(() {});
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDistributors();
    getCars();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ScrollConfiguration(
        behavior: CustomScroll(),
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                height: getProportionateScreenHeight(10),
              ),
              CarouselWidget(cars: cars),
              SizedBox(
                height: getProportionateScreenHeight(15),
              ),
              CarWizardBanner(widget: widget),
              SizedBox(
                height: getProportionateScreenHeight(10),
              ),
              /*

Text(
                "Distributors",
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(25),
                    fontWeight: FontWeight.w600),
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    Container(
                      height: getProportionateScreenHeight(60),
                      padding: EdgeInsets.symmetric(horizontal: 5),
                      child: ListView.builder(
                          itemCount: distributors.length,
                          shrinkWrap: true,
                          scrollDirection: Axis.horizontal,
                          itemBuilder: ((context, index) {
                            return Card(
                              elevation: 5,
                              child: Container(
                                width: getProportionateScreenWidth(120),
                                child: Center(
                                  child: Text(
                                    distributors[index]["name"],
                                    style: GoogleFonts.raleway(
                                        fontSize:
                                            getProportionateScreenHeight(20),
                                        fontWeight: FontWeight.w600),
                                  ),
                                ),
                              ),
                            );
                          })),
                    )
                  ],
                ),
              ),
              SizedBox(
                height: getProportionateScreenHeight(10),
              ),
			  */
              Text(
                "Our Latest Cars",
                style: GoogleFonts.raleway(
                    fontSize: getProportionateScreenHeight(25),
                    fontWeight: FontWeight.w600),
              ),
              ListView.builder(
                  itemCount: cars.length,
                  physics: ClampingScrollPhysics(),
                  shrinkWrap: true,
                  itemBuilder: (BuildContext context, int index) {
                    Product car = cars[index];
                    return Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 5, horizontal: 20),
                      child: GestureDetector(
                        onTap: () {
                          pushNewScreen(
                            context,
                            screen: DetailsScreen(
                              product: car,
                              userBloc: BlocProvider.of<UserBloc>(context),
                            ),
                            withNavBar:
                                false, // OPTIONAL VALUE. True by default.
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
                                  child: Image.network(
                                      "https://cdn.motor1.com/images/mgl/g1gW9/s1/nuova-bmw-z4.webp"),
                                ),
                                Expanded(
                                    flex: 5,
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                          vertical: 10, horizontal: 5),
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            cars[index].name,
                                            style: appBarTextStyle,
                                          ),
                                          SizedBox(
                                            height:
                                                getProportionateScreenHeight(9),
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
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    right: 10),
                                                child: Text(
                                                  numberFormat
                                                      .format(car.price),
                                                  style: GoogleFonts.raleway(
                                                    fontWeight: FontWeight.w600,
                                                    fontSize: 15,
                                                    color: Colors.black,
                                                  ),
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
                  })
            ],
          ),
        ),
      ),
      appBar: AppBar(
        title: Text("CarWow"),
        centerTitle: true,
      ),
    );
  }
}

class CarWizardBanner extends StatelessWidget {
  const CarWizardBanner({
    Key? key,
    required this.widget,
  }) : super(key: key);

  final HomeView widget;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        widget.tabController.jumpToTab(1);
      },
      child: Card(
        elevation: 10,
        margin: EdgeInsets.symmetric(vertical: 5, horizontal: 20),
        child: Container(
          height: getProportionateScreenHeight(90),
          margin: EdgeInsets.symmetric(vertical: 5, horizontal: 20),
          padding: EdgeInsets.all(5),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Looking for your next car?",
                    style: GoogleFonts.raleway(
                        fontSize: getProportionateScreenHeight(20),
                        fontWeight: FontWeight.normal),
                  ),
                  SizedBox(
                    height: getProportionateScreenHeight(5),
                  ),
                  Text("Try CarWizard!",
                      style: GoogleFonts.raleway(
                          fontSize: getProportionateScreenHeight(25),
                          fontWeight: FontWeight.bold)),
                ],
              ),
              Icon(
                Icons.arrow_forward_sharp,
                size: getProportionateScreenHeight(50),
              )
            ],
          ),
        ),
      ),
    );
  }
}

class CarouselWidget extends StatelessWidget {
  const CarouselWidget({
    Key? key,
    required this.cars,
  }) : super(key: key);

  final List<Product> cars;

  @override
  Widget build(BuildContext context) {
    return CarouselSlider(
      options: CarouselOptions(
        height: getProportionateScreenHeight(220),
        autoPlay: true,
        autoPlayInterval: const Duration(seconds: 6),
        enlargeCenterPage: true,
        viewportFraction: 0.74,
      ),
      items: cars.map((car) {
        return Builder(
          builder: (BuildContext context) {
            return CarouselContainer(
              car: car,
            );
          },
        );
      }).toList(),
    );
  }
}

class CarouselContainer extends StatelessWidget {
  NumberFormat numberFormat =
      NumberFormat.simpleCurrency(locale: "en-US", decimalDigits: 0);
  Product car;

  CarouselContainer({Key? key, required this.car}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        pushNewScreen(
          context,
          screen: DetailsScreen(
            product: car,
            userBloc: BlocProvider.of<UserBloc>(context),
          ),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        );
      },
      child: Container(
          width: MediaQuery.of(context).size.width,
          margin: const EdgeInsets.symmetric(horizontal: 5.0, vertical: 5),
          decoration:
              const BoxDecoration(color: Colors.transparent, boxShadow: [
            BoxShadow(
              color: Colors.black,
              blurRadius: 2.0,
              spreadRadius: 0.0,
              offset: Offset(1.0, 2), // shadow direction: bottom right
            )
          ]),
          child: Stack(
            children: [
              Image.network(
                  "https://cdn.motor1.com/images/mgl/KpgwG/s1/alfa-romeo-giulia-quadrifoglio-drift.jpg"),
              Align(
                alignment: Alignment.bottomCenter,
                child: Container(
                  decoration: BoxDecoration(color: Colors.white),
                  height: getProportionateScreenHeight(75),
                  padding: EdgeInsets.symmetric(vertical: 5),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const SizedBox(
                        width: double.infinity,
                      ),
                      Text("${car.distributor["name"]} ${car.name}",
                          style: GoogleFonts.raleway(
                              fontSize: getProportionateScreenHeight(20),
                              fontWeight: FontWeight.bold)),
                      Text(
                        "${car.model} - ${car.category["name"]}",
                        style: GoogleFonts.raleway(
                            fontSize: getProportionateScreenHeight(13),
                            fontWeight: FontWeight.w400),
                      ),
                      Text(
                        "${numberFormat.format(car.price)}",
                        style: GoogleFonts.raleway(
                            fontSize: getProportionateScreenHeight(19),
                            fontWeight: FontWeight.w600),
                      )
                    ],
                  ),
                ),
              ),
            ],
          )),
    );
  }
}

class CustomScroll extends ScrollBehavior {
  @override
  Widget buildViewportChrome(
      BuildContext context, Widget child, AxisDirection axisDirection) {
    return child;
  }
}
