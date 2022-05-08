import 'package:cekmece_mobile/models/cartItem/CartItem.dart';
import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'OrderItem.freezed.dart';
part 'OrderItem.g.dart';

@freezed
class OrderItem with _$OrderItem {
  const factory OrderItem({
    required int id,
    required int subTotal,
    required int shipping,
    required int discount,
    required int total,
    required String status,
    String? promoCode,
    required String createdDate,
    required String updatedDate,
    required String addressLine1,
    String? addressLine2,
    required String province,
    required int zipCode,
    required String country,
    required String shippingOption,
    required List<CartItem> orderItems,
  }) = _OrderItem;

  factory OrderItem.fromJson(Map<String, dynamic> json) =>
      _$OrderItemFromJson(json);
}
