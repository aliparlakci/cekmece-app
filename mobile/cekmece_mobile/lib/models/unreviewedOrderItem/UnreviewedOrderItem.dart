import 'package:cekmece_mobile/models/unreviewedOrderItem/OrderSummary.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'UnreviewedOrderItem.freezed.dart';
part 'UnreviewedOrderItem.g.dart';

@freezed
class UnreviewedOrderItem with _$UnreviewedOrderItem {
  const factory UnreviewedOrderItem({
    required int id,
    required OrderSummary order,
  }) = _UnreviewedOrderItem;

  factory UnreviewedOrderItem.fromJson(Map<String, dynamic> json) =>
      _$UnreviewedOrderItemFromJson(json);
}
