import 'dart:convert';

import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:google_sign_in/google_sign_in.dart';

part 'user_event.dart';
part 'user_state.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  UserBloc() : super(NotLoggedIn()) {
    on<AppStarted>((event, emit) async {
      //Check if a user is stored locally
      User? user = await FirebaseAuth.instance.currentUser;
      UserClass localUser;

      // If a user exist locally, log in.
      if (user != null) {
        localUser = UserClass(
            displayName: user.displayName,
            isAnonymous: user.isAnonymous,
            email: user.email,
            cart: [],
            uid: user.uid,
            photoUrl: user.photoURL);
        emit(LoggedIn(user: localUser));
      }
      // If a user does not exist, create an anonymous user and log in.
      else {
        UserCredential userCredential =
            await FirebaseAuth.instance.signInAnonymously();
        User user = userCredential.user!;
        localUser = UserClass(
            displayName: user.displayName,
            isAnonymous: user.isAnonymous,
            uid: user.uid,
            cart: [],
            email: user.email,
            photoUrl: user.photoURL);
        emit(LoggedIn(user: localUser));
      }
    });

    on<GoogleLoginButtonPressed>((event, emit) async {
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

      // Obtain the auth details from the request
      final GoogleSignInAuthentication? googleAuth =
          await googleUser?.authentication;

      // Create a new credential
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth?.accessToken,
        idToken: googleAuth?.idToken,
      );

      // Once signed in, return the UserCredential
      UserCredential user =
          await FirebaseAuth.instance.signInWithCredential(credential);
      UserClass localUser = UserClass(
          displayName: user.user!.displayName,
          isAnonymous: user.user!.isAnonymous,
          email: user.user!.email,
          cart: [],
          uid: user.user!.uid,
          photoUrl: user.user!.photoURL);

      if (user.user != null) {
        emit(LoggedIn(user: localUser));
      } else {
        emit(NotLoggedIn());
      }
    });

    on<LoginButtonPressed>((event, emit) async {
      //loadingBloc.add(LoadingStart(loadingReason: "Google Login Start"));
    });

    on<LogoutButtonPressed>((event, emit) async {
      final GoogleSignIn googleUser = await GoogleSignIn();
      await googleUser.signOut();
      await FirebaseAuth.instance.signOut();

      UserCredential userCredential =
          await FirebaseAuth.instance.signInAnonymously();

      User user = userCredential.user!;
      UserClass localUser = UserClass(
          displayName: user.displayName,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          cart: [],
          email: user.email,
          photoUrl: user.photoURL);

      emit(LoggedIn(user: localUser));
    });

    on<UserUpdate>((event, emit) async {
      //update the user and emit logged in state
      //BlocProvider.of<LoadingBloc>(context).add(LoadingStart(loadingReason:"asd"));
      emit(LoggedIn(user: event.user));
      await Future.delayed(Duration(seconds: 2));
      emit(LoggedIn(user: event.user));
    });
  }
}
