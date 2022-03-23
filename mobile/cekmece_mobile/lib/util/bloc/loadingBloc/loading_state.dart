part of 'loading_bloc.dart';

abstract class LoadingState extends Equatable {
  @override
  List<Object> get props => [];
}

class NotLoading extends LoadingState {
  NotLoading();

  @override
  String toString() => 'Not loading.';

  @override
  List<Object> get props => [];
}

class Loading extends LoadingState {
  Loading();

  @override
  String toString() => 'Loading.';

  @override
  List<Object> get props => [];
}
