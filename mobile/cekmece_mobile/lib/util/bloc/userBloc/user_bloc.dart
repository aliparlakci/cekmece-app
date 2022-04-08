import 'dart:convert';

import 'package:cekmece_mobile/models/cartItem/CartItem.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

part 'user_event.dart';
part 'user_state.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  BuildContext context;
  String localIPAddress = dotenv.env['LOCALADDRESS']!;

  Future<Product> getCar(int carId) async {
    try {
      final response =
          await http.get(Uri.parse('${localIPAddress}/api/cars/${carId}'));

      if (response.statusCode == 200) {
        return Product.fromJson(jsonDecode(response.body));
      } else {
        throw Exception('Failed to load product');
      }
    } catch (err) {
      print(err);
      return const Product(
          id: 1,
          name: "",
          price: 0,
          number: 0,
          model: 0,
          quantity: 0,
          warranty: 0,
          distributor: {},
          categories: []);
    }
  }

  Future<List<CartItem>> getCart(String userId) async {
    List<CartItem> cart = [];
    try {
      final response =
          await http.get(Uri.parse('${localIPAddress}/api/cart/${userId}'));

      List<dynamic> cartJson = jsonDecode(response.body)["cart"];

      if (response.statusCode == 200) {
        for (Map<String, dynamic> cartItem in cartJson) {
          Product car = await getCar(cartItem["item"]["id"]);

          cartItem["item"] = car.toJson();
          CartItem item = CartItem.fromJson(cartItem);
          cart.add(item);
        }
      } else {
        throw Exception('Failed to load cart');
      }
    } catch (err) {
      print(err);
    }
    return cart;
  }

  Future<UserClass> updateUser(String id) async {
    List<CartItem> cartList = await getCart("1");

    UserClass localUser = UserClass(
        displayName: "Ahmet Omer Kayabasi",
        isAnonymous: false,
        email: "ahmetomer@sabanciuniv.edu",
        cart: cartList,
        uid: "1",
        photoUrl:
            "https://pbs.twimg.com/profile_images/1506730396679036937/zDIidO5w_400x400.jpg");

    return localUser;
  }

  UserBloc({required this.context}) : super(NotLoggedIn()) {
    on<AppStarted>((event, emit) async {
      final prefs = await SharedPreferences.getInstance();
      final String? userId = prefs.getString('id');

      try {
        if (userId != null) {
          emit(LoggedIn(user: await updateUser(userId)));
        } else {
          emit(LoggedIn(
              user: const UserClass(
                  displayName: "",
                  isAnonymous: true,
                  uid: "0",
                  cart: [],
                  email: "",
                  photoUrl: "")));
        }
      } catch (err) {
        emit(NotLoggedIn());
      }
    });

    on<GoogleLoginButtonPressed>((event, emit) async {
      BlocProvider.of<LoadingBloc>(context)
          .add(LoadingStart(loadingReason: "Google Login"));
      try {
        final prefs = await SharedPreferences.getInstance();
        emit(LoggedIn(user: await updateUser("1")));
        await prefs.setString('id', '1');

        BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
      } catch (err) {
        BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
      }
    });

    on<LoginButtonPressed>((event, emit) async {
      BlocProvider.of<LoadingBloc>(context)
          .add(LoadingStart(loadingReason: "User Login"));

      await Future.delayed(Duration(seconds: 2));

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    });

    on<LogoutButtonPressed>((event, emit) async {
      BlocProvider.of<LoadingBloc>(context)
          .add(LoadingStart(loadingReason: "User Logout"));

      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('id');

      emit(LoggedIn(
          user: const UserClass(
              displayName: "",
              isAnonymous: true,
              uid: "0",
              cart: [],
              email: "",
              photoUrl: "")));

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    });

    on<UserUpdate>((event, emit) async {
      BlocProvider.of<LoadingBloc>(context)
          .add(LoadingStart(loadingReason: "User fetch"));

      final prefs = await SharedPreferences.getInstance();
      final String? userId = prefs.getString('id');

      if (userId != null) {
        emit(LoggedIn(user: await updateUser(userId)));
      }

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    });
  }
}
