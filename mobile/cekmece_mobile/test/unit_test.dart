// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:cekmece_mobile/main.dart';

void main() {
  group('Non-Anonymous User Class Test -', () {
    late UserClass testUser;
    setUp(() {
      testUser = const UserClass(
          isAnonymous: false,
          uid: "123",
          displayName: "John Doe",
          email: "johndoe@gmail.com",
          cart: ["1", "2"]);
    });
    test('User Class name property', () {
      expect(testUser.displayName, "John Doe");
    });

    test('User Class uid property', () {
      expect(testUser.uid, "123");
    });

    test('User Class anonymity property', () {
      expect(testUser.isAnonymous, false);
    });

    test('User Class cart property', () {
      expect(testUser.cart, ["1", "2"]);
    });
  });
}
