import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/views/profile/viewComponents/anonymousProfileView.dart';
import 'package:cekmece_mobile/views/profile/viewComponents/userInfo.dart';
import 'package:flutter/material.dart';

class ProfileView extends StatefulWidget {
  UserClass user;
  ProfileView({required this.user});
  @override
  _ProfileViewState createState() => _ProfileViewState();
}

class _ProfileViewState extends State<ProfileView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.user.isAnonymous
          ? AnonymousProfileView()
          : Container(
              padding: const EdgeInsets.fromLTRB(25, 60, 25, 25),
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [UserInfoView(user: widget.user)]),
            ),
    );
  }
}
