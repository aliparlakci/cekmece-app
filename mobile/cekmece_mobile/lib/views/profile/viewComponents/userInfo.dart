import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/constants/font_constants.dart';
import 'package:cekmece_mobile/models/user/UserClass.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UserInfoView extends StatelessWidget {
  UserClass user;
  UserInfoView({required this.user});
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 25),
      decoration: BoxDecoration(
          color: Colors.black,
          borderRadius: const BorderRadius.all(
            Radius.circular(8.0),
          ),
          boxShadow: [
            BoxShadow(
              color: primaryColor.withOpacity(0.3),
              spreadRadius: 8,
              blurRadius: 6,
              offset: const Offset(0, 4),
            ),
          ]),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundImage: NetworkImage(user.photoUrl ??
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
                ),
                const SizedBox(
                  width: 20,
                ),
                Container(
                  width: 170,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        user.displayName ?? "User",
                        style: header3,
                        maxLines: 2,
                      ),
                      const SizedBox(
                        height: 3,
                      ),
                      Text(
                        user.email ?? "Unknown Email",
                        style: textDefault,
                      ),
                    ],
                  ),
                ),
                IconButton(
                    onPressed: () {
                      BlocProvider.of<UserBloc>(context)
                          .add(LogoutButtonPressed());
                    },
                    icon: const Icon(
                      CupertinoIcons.settings,
                      size: 25,
                      color: neutralColor,
                    ))
              ],
            ),
          ],
        ),
      ),
    );
  }
}
