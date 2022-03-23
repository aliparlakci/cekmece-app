import 'package:freezed_annotation/freezed_annotation.dart';

part 'UserClass.freezed.dart';
part 'UserClass.g.dart';

@freezed
class UserClass with _$UserClass {
  const factory UserClass(
      {String? displayName,
      required bool isAnonymous,
      required String uid,
      List<String>? cart,
      String? email,
      String? photoUrl}) = _UserClass;

  factory UserClass.fromJson(Map<String, dynamic> json) =>
      _$UserClassFromJson(json);
}
