part of 'loading_bloc.dart';

abstract class LoadingEvent extends Equatable {
  const LoadingEvent();

  @override
  List<Object> get props => [];
}

class AppStartedLoading extends LoadingEvent {
  @override
  String toString() => 'App started - Currently not loading anything.';
}

class LoadingStart extends LoadingEvent {
  String loadingReason;
  LoadingStart({required this.loadingReason});
  @override
  String toString() => 'Currently loading: $loadingReason';
}

class LoadingEnd extends LoadingEvent {
  @override
  String toString() => 'Loading Stopped';
}
