import 'package:cekmece_mobile/models/cartItem/CartItem.dart';
import 'package:cekmece_mobile/models/wishlistItem/WishlistItem.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'UserClass.freezed.dart';
part 'UserClass.g.dart';

@freezed
class UserClass with _$UserClass {
  const factory UserClass(
      {String? displayName,
      required bool isAnonymous,
      required String uid,
      required List<CartItem> cart,
      required List<WishlistItem> wishlist,
      String? email,
      String? photoUrl}) = _UserClass;

  factory UserClass.fromJson(Map<String, dynamic> json) =>
      _$UserClassFromJson(json);
}
