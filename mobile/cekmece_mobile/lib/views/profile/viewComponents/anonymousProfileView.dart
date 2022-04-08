import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/views/profile/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';

class AnonymousProfileView extends StatelessWidget {
  const AnonymousProfileView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text(
              "You are not logged in! In order to purchase an item, add to favories, and access many more features, please login or sign up. ",
              style: header2.copyWith(color: secondaryColor),
              textAlign: TextAlign.center,
            ),
            Column(
              children: [
                SignInButtonBuilder(
                  text: 'Sign up / Log in',
                  icon: Icons.email,
                  padding: EdgeInsets.symmetric(vertical: 15, horizontal: 5),
                  onPressed: () async {
                    var res = await pushNewScreen(
                      context,
                      screen: LoginScreen(),
                      withNavBar: false, // OPTIONAL VALUE. True by default.
                      pageTransitionAnimation:
                          PageTransitionAnimation.cupertino,
                    );
                    if (res == "google") {
                      BlocProvider.of<UserBloc>(context)
                          .add(GoogleLoginButtonPressed());
                    }
                  },
                  backgroundColor: Colors.black,
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
