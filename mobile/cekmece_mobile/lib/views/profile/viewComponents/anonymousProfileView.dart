import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';

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
              "(actually anonymously logged in)\n\nYou are not logged in! In order to purchase an item, add to favories, and access many more features, please login or sign up. ",
              style: header2,
              textAlign: TextAlign.center,
            ),
            Column(
              children: [
                SignInButton(
                  Buttons.Google,
                  text: "Sign up with Google",
                  onPressed: () {
                    BlocProvider.of<UserBloc>(context)
                        .add(GoogleLoginButtonPressed());
                  },
                ),
                SignInButtonBuilder(
                  text: 'Sign up with Email',
                  icon: Icons.email,
                  onPressed: () async {
                    BlocProvider.of<LoadingBloc>(context)
                        .add(LoadingStart(loadingReason: "Google Login"));
                    await Future.delayed(Duration(seconds: 2));
                    BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
                  },
                  backgroundColor: Colors.blueGrey[700]!,
                ),
                SignInButtonBuilder(
                  text: 'Login with Email',
                  icon: Icons.email,
                  onPressed: () {},
                  backgroundColor: Colors.blueGrey[700]!,
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
