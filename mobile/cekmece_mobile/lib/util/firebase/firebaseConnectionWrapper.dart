import 'package:cekmece_mobile/views/misc/firebaseError.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

//Checks firebase connection. If established, forwards to main application. Displays a loading spinner otherwise.
class FirebaseWrapper extends StatefulWidget {
  @override
  _FirebaseWrapperState createState() => _FirebaseWrapperState();
}

class _FirebaseWrapperState extends State<FirebaseWrapper> {
  final Future<FirebaseApp> _initialization = Firebase.initializeApp();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: _initialization,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            print('Cannot connect to firebase: ' + snapshot.error.toString());
            return MaterialApp(
              home: Text("Cannot connect to firebase"),
            );
          }
          if (snapshot.connectionState == ConnectionState.done) {
            print('Firebase connected');
            return FirebaseErrorView();
          }

          return MaterialApp(
            home: Text("Loading"),
          );
        });
  }
}
