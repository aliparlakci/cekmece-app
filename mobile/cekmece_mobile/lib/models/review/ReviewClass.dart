import 'package:freezed_annotation/freezed_annotation.dart';

part 'ReviewClass.freezed.dart';
part 'ReviewClass.g.dart';

@freezed
class ReviewClass with _$ReviewClass {
  const factory ReviewClass({
    required int id,
    required int rating,
    required String comment,
    required DateTime createdDate,
    bool? isApproved,
  }) = _ReviewClass;

  factory ReviewClass.fromJson(Map<String, dynamic> json) =>
      _$ReviewClassFromJson(json);
}
