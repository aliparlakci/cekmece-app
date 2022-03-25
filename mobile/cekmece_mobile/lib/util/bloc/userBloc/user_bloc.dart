import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:google_sign_in/google_sign_in.dart';

part 'user_event.dart';
part 'user_state.dart';

class UserBloc extends Bloc<UserEvent, UserState> {
  BuildContext context;
  UserBloc({required this.context}) : super(NotLoggedIn()) {
    on<AppStarted>((event, emit) async {
      User? user = await FirebaseAuth.instance.currentUser;
      UserClass localUser;

      if (user != null) {
        localUser = UserClass(
            displayName: user.displayName,
            isAnonymous: user.isAnonymous,
            email: user.email,
            cart: [],
            uid: user.uid,
            photoUrl: user.photoURL);
        emit(LoggedIn(user: localUser));
      } else {
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
      BlocProvider.of<LoadingBloc>(context)
          .add(LoadingStart(loadingReason: "Google Login"));
      try {
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
        BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());
      } catch (err) {
        print("Google login error.");
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

      BlocProvider.of<LoadingBloc>(context).add(LoadingEnd());

      emit(LoggedIn(user: localUser));
    });

    on<UserUpdate>((event, emit) async {});
  }
}
