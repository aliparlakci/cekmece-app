// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'dart:convert';
import 'dart:math';

import 'package:cekmece_mobile/models/order/OrderItem.dart';
import 'package:cekmece_mobile/models/review/ReviewClass.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'package:cekmece_mobile/main.dart';

void main() async {
  TestWidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");

  group('JSON Parsing Tests ||', () {
    late UserClass user;
    late OrderItem order;
    late ReviewClass review;
    test('JSON Parse - User', () async {
      user = UserClass.fromJson(userJson);

      expect("test test", user.displayName);
      expect("test@test.edu", user.email);
    });

    test('JSON Parse - User Cart', () {
      expect(user.cart.length, 1);
      expect(user.cart[0].total, 1080000);
      expect(user.cart[0].quantity, 4);
    });

    test('JSON Parse - Item in User Cart', () {
      expect(user.cart[0].item.name, "Elantra");
      expect(user.cart[0].item.category["name"], "Formula 1");
      expect(user.cart[0].item.quantity, 2);
    });

    test('JSON Parse - Order Item', () {
      order = OrderItem.fromJson(orderJSON);
      expect(1, order.id);
      expect(524000, order.subTotal);
    });

    test('JSON Parse - Cart Items in Order', () {
      expect(3, order.orderItems.length);
      expect(150000, order.orderItems[0].total);
      expect(1, order.orderItems[0].quantity);
    });

    test('JSON Parse - Referenced Car Items in Order', () {
      expect("W13", order.orderItems[0].item.name);
      expect(2021, order.orderItems[0].item.model);
      expect(150000, order.orderItems[0].item.price);
      expect("Mercedes", order.orderItems[0].item.distributor["name"]);
    });

    test('JSON Parse - Review', () {
      review = ReviewClass.fromJson(reviewJSON);
      expect(1, review.id);
      expect(5, review.rating);
      expect("good", review.comment);
      expect(25, review.createdDate.day);
      expect(12, review.createdDate.month);
    });
  });
}

const userJson = {
  "uid": "248bbed0-bd9c-493a-95c1-a0131583ecb4",
  "email": "test@test.edu",
  "displayName": "test test",
  "role": "Customer",
  "isAnonymous": false,
  "cart": [
    {
      "id": "4f01e8f6-89a2-49f1-9942-a2b317cc5c54",
      "total": 1080000,
      "quantity": 4,
      "item": {
        "id": 6,
        "name": "Elantra",
        "model": 2018,
        "number": 65,
        "quantity": 2,
        "price": 45000,
        "warranty": 3,
        "unitsSold": 5,
        "reviewCount": 0,
        "category": {"id": 2, "name": "Formula 1"},
        "distributor": {"id": 2, "name": "Mercedes"},
        "averageRating": "0.00"
      }
    }
  ]
};

const reviewJSON = {
  "id": 1,
  "rating": 5,
  "comment": "good",
  "createdDate": "2018-12-25 23:50:55",
  "isApproved": true,
  "user": {"id": "555"},
};

const orderJSON = {
  "id": 1,
  "subTotal": 524000,
  "shipping": 15,
  "discount": 524015,
  "total": 0,
  "status": "processing",
  "promoCode": "ADMIN",
  "createdDate": "2022-05-07T21:41:58.518Z",
  "updatedDate": "2022-05-07T21:41:58.518Z",
  "addressLine1": "Kucukyali Merkez Mahallesi",
  "addressLine2": null,
  "city": "Istanbul",
  "province": "Maltepe",
  "zipCode": 34840,
  "country": "Turkey",
  "shippingOption": "free",
  "user": {"id": "248bbed0-bd9c-493a-95c1-a0131583ecb4"},
  "orderItems": [
    {
      "id": "ccf398ee-b144-4cf0-946c-e47d0af0e76a",
      "total": 150000,
      "quantity": 1,
      "item": {
        "id": 3,
        "name": "W13",
        "model": 2021,
        "number": 44,
        "quantity": 0,
        "price": 150000,
        "warranty": 2,
        "unitsSold": 1,
        "reviewCount": 0,
        "averageRating": "0.00",
        "category": {"id": 4, "name": "Formula 2"},
        "distributor": {"id": 3, "name": "Mercedes"}
      }
    },
    {
      "id": "99233d21-4d95-4829-a1b0-d8c01e148857",
      "total": 45000,
      "quantity": 1,
      "item": {
        "id": 6,
        "name": "Elantra",
        "model": 2018,
        "number": 65,
        "quantity": 0,
        "price": 45000,
        "warranty": 3,
        "unitsSold": 5,
        "reviewCount": 0,
        "averageRating": "0.00",
        "category": {"id": 3, "name": "Formula 1"},
        "distributor": {"id": 1, "name": "Ferrari"}
      }
    },
    {
      "id": "6f0d6138-2c68-4aa9-92e0-1bcb5f2c8077",
      "total": 329000,
      "quantity": 1,
      "item": {
        "id": 2,
        "name": "RB-19B",
        "model": 2021,
        "number": 33,
        "quantity": 0,
        "price": 329000,
        "warranty": 2,
        "unitsSold": 1,
        "reviewCount": 0,
        "averageRating": "0.00",
        "category": {"id": 3, "name": "Formula 1"},
        "distributor": {"id": 2, "name": "RedBull"}
      }
    }
  ]
};
