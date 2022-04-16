import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';

part 'loading_event.dart';
part 'loading_state.dart';

class LoadingBloc extends Bloc<LoadingEvent, LoadingState> {
  LoadingBloc() : super(NotLoading()) {
    on<AppStartedLoading>((event, emit) async {
      emit(NotLoading());
    });

    on<LoadingStart>((event, emit) async {
      emit(Loading());
    });

    on<LoadingEnd>((
      event,
      emit,
    ) async {
      emit(NotLoading());
    });
  }
}
