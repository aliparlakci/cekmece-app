import 'dart:convert';

import 'package:cekmece_mobile/models/cartItem/CartItem.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/util/network/networkProvider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'user_event.dart';
part 'user_state.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  BuildContext context;
  String localIPAddress = dotenv.env['LOCALADDRESS']!;
  late UserClass user;
  late NetworkService networkService;

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
        photoUrl: "",
        description: "",
        price: 0,
        number: 0,
        model: 0,
        quantity: 0,
        warranty: 0,
        distributor: {},
        category: {},
        reviewCount: 0,
        averageRating: "",
      );
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

  Future<UserClass> updateUser(dynamic me) async {
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "User fetch"));
    List<CartItem> cartList = await getCart(me["id"]);
    UserClass localUser = UserClass(
        displayName: me["displayName"],
        isAnonymous: false,
        email: me["email"],
        cart: cartList,
        uid: me["id"],
        photoUrl:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    return localUser;
  }

  Future<UserClass> updateLocalUser() async {
    BlocProvider.of<LoadingBloc>(context)
        .add(LoadingStart(loadingReason: "User fetch"));
    List<CartItem> cartList = await getLocalCart();
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

      networkService = Provider.of<NetworkService>(context, listen: false);

      try {
        if (userId != null) {
          bool localCookie = await networkService.getCookieFromLocalStorage();
          if (!localCookie) {
            throw new Exception("No cookie");
          }
          var me = await networkService.get('${localIPAddress}/api/auth/me');
          user = await updateUser(me);

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
        print(err);
        user = const UserClass(
            displayName: "",
            isAnonymous: true,
            uid: "0",
            cart: [],
            email: "",
            photoUrl: "");
        emit(LoggedIn(user: user));
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

      final prefs = await SharedPreferences.getInstance();
      try {
        var me = await networkService.get('${localIPAddress}/api/auth/me');

        user = await updateUser(me);
        emit(LoggedIn(user: user));
        await prefs.setString('id', me["id"]);
      } catch (err) {
        print(err);
      }

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    });

    on<LogoutButtonPressed>((event, emit) async {
      BlocProvider.of<LoadingBloc>(context)
          .add(LoadingStart(loadingReason: "User Logout"));

      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('id');
      await prefs.remove('cookies');
      await prefs.setStringList('cart', <String>[]);
      networkService.logout();
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

      try {
        final prefs = await SharedPreferences.getInstance();
        final String? userId = prefs.getString('id');
        final List<String>? cookie = prefs.getStringList('cookies');

        if (userId != null && cookie != null) {
          var me = await networkService.get('${localIPAddress}/api/auth/me');

          user = await updateUser(me);
          emit(LoggedIn(user: user));
        } else {
          user = await updateLocalUser();
          emit(LoggedIn(user: user));
        }
      } catch (err) {
        print(err);
      }

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
    });

    on<SetUser>((event, emit) async {
      emit(LoggedIn(user: user));
    });
  }
}
