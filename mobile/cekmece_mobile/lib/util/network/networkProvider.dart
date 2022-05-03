import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class NetworkService extends ChangeNotifier {
  String clientURL = dotenv.env['CLIENT_URL']!;
  final JsonDecoder _decoder = const JsonDecoder();
  final JsonEncoder _encoder = const JsonEncoder();
  final prefs = SharedPreferences.getInstance();

  Map<String, String> headers = {"content-type": "application/json"};
  Map<String, String> cookies = {};

  void _updateCookie(http.Response response) {
    String? allSetCookie = response.headers['set-cookie'];

    if (allSetCookie != null) {
      var setCookies = allSetCookie.split(',');

      for (var setCookie in setCookies) {
        var cookies = setCookie.split(';');

        for (var cookie in cookies) {
          _setCookie(cookie);
        }
      }

      headers['cookie'] = _generateCookieHeader();
      setCookieLocalStorage();
    }
  }

  Future<bool> getCookieFromLocalStorage() async {
    final prefs = await SharedPreferences.getInstance();
    final List<String>? cookies = prefs.getStringList('cookies');

    if (cookies != null) {
      for (String cookie in cookies) {
        //print("Processing: ${cookie}");
        _setCookie(cookie);
      }
      headers['cookie'] = _generateCookieHeader();
      return true;
    }
    return false;
  }

  void setCookieLocalStorage() async {
    final prefs = await SharedPreferences.getInstance();

    List<String> localCookies = [];

    cookies.forEach((key, value) {
      localCookies.add("${key}=${value}");
    });

    prefs.setStringList("cookies", localCookies);
  }

  void removeCookieLocalStorage() async {
    final prefs = await SharedPreferences.getInstance();

    prefs.remove("cookies");
  }

  void _setCookie(String? rawCookie) {
    if (rawCookie != null) {
      var keyValue = rawCookie.split('=');
      if (keyValue.length == 2) {
        var key = keyValue[0].trim();
        var value = keyValue[1];

        // ignore keys that aren't cookies
        if (key == 'path' || key == 'expires') return;

        cookies[key] = value;
      }
    }
  }

  String _generateCookieHeader() {
    String cookie = "";

    for (var key in cookies.keys) {
      if (cookie.isNotEmpty) cookie += ";";
      cookie += key + "=" + cookies[key]!;
    }

    return cookie;
  }

  Future<dynamic> login(String email, String password) {
    final body = {"email": email, "password": password};
    return http
        .post(Uri.parse('$clientURL/api/auth/login'),
            body: _encoder.convert(body), headers: headers)
        .then((http.Response response) {
      final String res = response.body;
      final int statusCode = response.statusCode;

      _updateCookie(response);

      if (statusCode < 200 || statusCode > 400) {
        throw Exception("Error while fetching data");
      }
      notifyListeners();
      return _decoder.convert(res);
    });
  }

  Future<dynamic> logout() {
    return http
        .post(Uri.parse('$clientURL/api/auth/logout'),
            body: {}, headers: headers)
        .then((http.Response response) {
      final String res = response.body;
      final int statusCode = response.statusCode;

      _updateCookie(response);

      if (statusCode < 200 || statusCode > 400) {
        throw Exception("Error while fetching data");
      }
      removeCookieLocalStorage();
      notifyListeners();
      return _decoder.convert(res);
    });
  }

  Future<dynamic> get(String url) {
    return http
        .get(Uri.parse(url), headers: headers)
        .then((http.Response response) {
      final String res = response.body;
      final int statusCode = response.statusCode;
      _updateCookie(response);

      if (statusCode < 200 || statusCode > 400) {
        throw Exception("Error while fetching data");
      }
      notifyListeners();
      return _decoder.convert(res);
    });
  }

  Future<dynamic> post(String url, {body, encoding}) {
    return http
        .post(Uri.parse(url),
            body: _encoder.convert(body), headers: headers, encoding: encoding)
        .then((http.Response response) {
      final String res = response.body;
      final int statusCode = response.statusCode;

      _updateCookie(response);

      if (statusCode < 200 || statusCode >= 400) {
        throw Exception("Error while fetching data");
      }
      notifyListeners();
      return _decoder.convert(res);
    });
  }

  Future<dynamic> put(String url, {body, encoding}) {
    return http
        .put(Uri.parse(url),
            body: _encoder.convert(body), headers: headers, encoding: encoding)
        .then((http.Response response) {
      final String res = response.body;
      final int statusCode = response.statusCode;

      _updateCookie(response);

      if (statusCode < 200 || statusCode > 400) {
        throw Exception("Error while fetching data");
      }
      notifyListeners();
      return _decoder.convert(res);
    });
  }
}
