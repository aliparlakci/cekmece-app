import 'package:cekmece_mobile/constants/color_contsants.dart';
import 'package:cekmece_mobile/navigation.dart';
import 'package:cekmece_mobile/util/bloc/loadingBloc/loading_bloc.dart';
import 'package:cekmece_mobile/util/bloc/userBloc/user_bloc.dart';
import 'package:cekmece_mobile/views/misc/loadingOverlay.dart';
import 'package:cekmece_mobile/views/misc/loadingView.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class BlocProviders extends StatelessWidget {
  BlocProviders({Key? key}) : super(key: key);
  final LoadingOverlay _loadingOverlay = LoadingOverlay();

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Cekmece',
        theme: ThemeData(
            primarySwatch: Colors.blue,
            canvasColor: neutralColor,
            primaryColor: primaryColor),
        home: MultiBlocProvider(
            providers: [
              BlocProvider(create: (context) => LoadingBloc()),
              BlocProvider<UserBloc>(
                create: (context) =>
                    UserBloc(context: context)..add(AppStarted()),
              ),
            ],
            child: BlocBuilder<UserBloc, UserState>(
              builder: (context, state) {
                if (state is LoggedIn) {
                  print(state.user);
                  return MultiBlocListener(
                    listeners: [
                      BlocListener<LoadingBloc, LoadingState>(
                        listener: (context, loadState) {
                          if (loadState is Loading) {
                            _loadingOverlay.show(context);
                          } else {
                            _loadingOverlay.hide();
                          }
                        },
                      ),
                    ],
                    child: NavigationView(
                      user: state.user,
                    ),
                  );
                } else {
                  return LoadingView();
                }
              },
            )));
  }
}
