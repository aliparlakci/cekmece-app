import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'CartItem.freezed.dart';
part 'CartItem.g.dart';

@freezed
class CartItem with _$CartItem {
  const factory CartItem(
      {required String id,
      required int total,
      required int quantity,
      required Product item}) = _CartItem;

  factory CartItem.fromJson(Map<String, dynamic> json) =>
      _$CartItemFromJson(json);
}
