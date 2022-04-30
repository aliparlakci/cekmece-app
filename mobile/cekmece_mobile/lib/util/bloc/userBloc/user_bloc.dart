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
  late UserClass user;

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
      return const Product(
          id: 1,
          name: "",
          price: 0,
          number: 0,
          model: 0,
          quantity: 0,
          warranty: 0,
          distributor: {},
          category: {});
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
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "User fetch"));
    List<CartItem> cartList = await getCart("1");

    UserClass localUser = UserClass(
        displayName: "Ahmet Omer Kayabasi",
        isAnonymous: false,
        email: "ahmetomer@sabanciuniv.edu",
        cart: cartList,
        uid: "1",
        photoUrl:
            "https://pbs.twimg.com/profile_images/1515493247413538826/jhuSAxfO_400x400.jpg");
    BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    return localUser;
  }

  Future<UserClass> updateLocalUser() async {
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "User fetch"));
    List<CartItem> cartList = await getLocalCart();
    print("update local user");
    print(cartList);
    UserClass localUser = UserClass(
        displayName: "Anon user",
        isAnonymous: true,
        email: "",
        cart: cartList,
        uid: "0",
        photoUrl: "");

    BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    return localUser;
  }

  Future<List<CartItem>> getLocalCart() async {
    final prefs = await SharedPreferences.getInstance();

    final List<String>? cart = prefs.getStringList('cart');
    List<CartItem> cartList = [];
    if (cart != null && cart != []) {
      for (String elem in cart) {
        String carId = elem.substring(0, elem.indexOf('-'));
        String quantity = elem.substring(elem.indexOf('-') + 1);
        Product car = await getCar(int.tryParse(carId)!);

        CartItem item = CartItem(
            id: "0",
            total: car.price * int.tryParse(quantity)!,
            quantity: int.tryParse(quantity)!,
            item: car);

        cartList.add(item);
      }
    } else {
      await prefs.setStringList('cart', <String>[]);
    }
    return cartList;
  }

  UserBloc({required this.context}) : super(NotLoggedIn()) {
    on<AppStarted>((event, emit) async {
      final prefs = await SharedPreferences.getInstance();
      final String? userId = prefs.getString('id');

      try {
        if (userId != null) {
          user = await updateUser(userId);
          emit(LoggedIn(user: user));
        } else {
          user = UserClass(
              displayName: "",
              isAnonymous: true,
              uid: "0",
              cart: await getLocalCart(),
              email: "",
              photoUrl: "");
          emit(LoggedIn(user: user));
        }
      } catch (err) {
        user = const UserClass(
            displayName: "",
            isAnonymous: true,
            uid: "0",
            cart: [],
            email: "",
            photoUrl: "");
        emit(NotLoggedIn());
      }
    });

    on<GoogleLoginButtonPressed>((event, emit) async {
      BlocProvider.of<LoadingBloc>(context)
          .add(LoadingStart(loadingReason: "Google Login"));
      try {
        final prefs = await SharedPreferences.getInstance();

        user = await updateUser("1");
        emit(LoggedIn(user: user));
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
      await prefs.setStringList('cart', <String>[]);
      user = const UserClass(
          displayName: "",
          isAnonymous: true,
          uid: "0",
          cart: [],
          email: "",
          photoUrl: "");
      emit(LoggedIn(user: user));

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    });

    on<UserUpdate>((event, emit) async {
      BlocProvider.of<LoadingBloc>(context)
          .add(LoadingStart(loadingReason: "User fetch"));

      final prefs = await SharedPreferences.getInstance();
      final String? userId = prefs.getString('id');

      if (userId != null) {
        user = await updateUser(userId);
        emit(LoggedIn(user: user));
      } else {
        user = await updateLocalUser();
        emit(LoggedIn(user: user));
      }

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    });

    on<SetUser>((event, emit) async {
      emit(LoggedIn(user: user));
    });
  }
}
