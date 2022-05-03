import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/util/blocProviders.dart';
import 'package:cekmece_mobile/util/network/networkProvider.dart';
import 'package:cekmece_mobile/views/misc/loadingOverlay.dart';
import 'package:cekmece_mobile/views/productView/components/size.dart';
import 'package:cekmece_mobile/widgets/showSnackBar.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_signin_button/button_list.dart';
import 'package:flutter_signin_button/button_view.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:provider/provider.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final LoadingOverlay _loadingOverlay = LoadingOverlay();

  String email = "";
  String password = "";
  String name = "";

  bool _rememberMe = false;

  Widget _buildEmailTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          'Email',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextFormField(
            keyboardType: TextInputType.emailAddress,
            style: TextStyle(
              color: Colors.black,
              fontFamily: 'Raleway',
            ),
            onChanged: (val) {
              email = val;
            },
            validator: (val) {
              if (val == "") {
                return "Please enter email";
              }
              if (!EmailValidator.validate(val!)) {
                return "Please enter a valid email";
              }
              return null;
            },
            decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  Icons.email,
                  color: Colors.black,
                ),
                hintText: 'Enter your Email',
                hintStyle: kHintTextStyle,
                errorStyle: kHintTextStyle),
          ),
        ),
      ],
    );
  }

  Widget _buildNameTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          'Name',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextFormField(
            keyboardType: TextInputType.name,
            style: TextStyle(
              color: Colors.black,
              fontFamily: 'OpenSans',
            ),
            onChanged: (val) {
              name = val;
            },
            validator: (val) {
              if (val == "") {
                return "Please enter your name";
              }

              if (val!.length < 6) {
                return "Seriously? You can't have a name that short.";
              }

              return null;
            },
            decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  Icons.person,
                  color: Colors.black,
                ),
                hintText: 'Enter your name',
                hintStyle: kHintTextStyle,
                errorStyle: kHintTextStyle),
          ),
        ),
      ],
    );
  }

  Widget _buildPasswordTF() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          'Password',
          style: kLabelStyle,
        ),
        SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 60.0,
          child: TextFormField(
            obscureText: true,
            style: TextStyle(
              color: Colors.black,
              fontFamily: 'OpenSans',
            ),
            onChanged: (val) {
              password = val;
            },
            validator: (val) {
              if (val == "") {
                return "Please enter password";
              }
              if (val!.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            },
            decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: EdgeInsets.only(top: 14.0),
                prefixIcon: Icon(
                  Icons.lock,
                  color: Colors.black,
                ),
                hintText: 'Enter your Password',
                hintStyle: kHintTextStyle,
                errorStyle: kHintTextStyle),
          ),
        ),
      ],
    );
  }

  Widget _buildRegisterBtn() {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 25.0),
      height: getProportionateScreenHeight(95),
      width: double.infinity,
      child: ElevatedButton(
        onPressed: () async {
          if (_formKey.currentState!.validate()) {
            //_loadingOverlay.show(context);
            try {
              String clientURL = dotenv.env['CLIENT_URL']!;
              final networkService =
                  Provider.of<NetworkService>(context, listen: false);
              var res = await networkService.post(
                '$clientURL/api/users/',
                body: {
                  "email": email,
                  "displayName": name,
                  "password": password
                },
              );
              await networkService.login(email, password);
              Navigator.pop(context, true);
            } catch (err) {
              print(err);
              showSnackBar(
                  context: context,
                  message:
                      "An error happened during registration. Please try again later",
                  error: true);
            }
          }
          //_loadingOverlay.hide();
        },
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all(Colors.black),
        ),
        child: Text(
          'REGISTER',
          style: header3.copyWith(color: Colors.white),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle.light,
        child: Form(
          key: _formKey,
          child: GestureDetector(
            onTap: () => FocusScope.of(context).unfocus(),
            child: Stack(
              children: <Widget>[
                Container(
                  height: double.infinity,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.black,
                        Colors.white,
                      ],
                      stops: [0.15, 0.9],
                    ),
                  ),
                ),
                Container(
                  height: double.infinity,
                  child: SingleChildScrollView(
                    physics: AlwaysScrollableScrollPhysics(),
                    padding: EdgeInsets.symmetric(
                      horizontal: 40.0,
                      vertical: 120.0,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text(
                          'Register',
                          style: header.copyWith(color: Colors.white),
                        ),
                        SizedBox(height: 30.0),
                        _buildNameTF(),
                        SizedBox(
                          height: 30.0,
                        ),
                        _buildEmailTF(),
                        SizedBox(
                          height: 30.0,
                        ),
                        _buildPasswordTF(),
                        _buildRegisterBtn(),
                      ],
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
