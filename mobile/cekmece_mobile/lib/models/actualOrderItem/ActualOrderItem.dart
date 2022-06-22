import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'ActualOrderItem.freezed.dart';
part 'ActualOrderItem.g.dart';

@freezed
class ActualOrderItem with _$ActualOrderItem {
  const factory ActualOrderItem(
      {required int id,
        required int total,
        required int quantity,
        required Product item}) = _ActualOrderItem;

  factory ActualOrderItem.fromJson(Map<String, dynamic> json) =>
      _$ActualOrderItemFromJson(json);
}
