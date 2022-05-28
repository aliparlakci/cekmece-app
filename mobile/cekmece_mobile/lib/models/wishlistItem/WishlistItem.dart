import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'WishlistItem.freezed.dart';
part 'WishlistItem.g.dart';

@freezed
class WishlistItem with _$WishlistItem {
  const factory WishlistItem({required String id, required Product item}) =
      _WishlistItem;

  factory WishlistItem.fromJson(Map<String, dynamic> json) =>
      _$WishlistItemFromJson(json);
}
