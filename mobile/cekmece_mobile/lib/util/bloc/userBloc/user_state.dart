part of 'user_bloc.dart';

abstract class UserState extends Equatable {
  @override
  List<Object> get props => [];
}

class NotLoggedIn extends UserState {
  NotLoggedIn();

  @override
  String toString() => 'NotLoggedIn';

  @override
  List<Object> get props => [];
}

class LoggedIn extends UserState {
  UserClass user;

  LoggedIn({required this.user});

  @override
  String toString() => 'LoggedIn ${user}';

  @override
  List<Object> get props => [user];
}
