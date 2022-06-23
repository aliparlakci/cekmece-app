part of 'user_bloc.dart';

abstract class UserEvent extends Equatable {
  const UserEvent();

  @override
  List<Object> get props => [];
}

class AppStarted extends UserEvent {
  @override
  String toString() => 'Login/Logout Process started';
}

class UserUpdate extends UserEvent {
  @override
  String toString() => 'User data update event.';
}

class UserUpdateNoLoading extends UserEvent {
  @override
  String toString() => 'User data update no loading event.';
}

class SetUser extends UserEvent {
  SetUser();
  @override
  String toString() => 'User data set event.';
}

class GoogleLoginButtonPressed extends UserEvent {
  @override
  String toString() => 'Google Login button pressed';
}

class LoginButtonPressed extends UserEvent {
  @override
  String toString() => 'Login button pressed';
}

class LogoutButtonPressed extends UserEvent {
  @override
  String toString() => 'Logout button pressed';
}
