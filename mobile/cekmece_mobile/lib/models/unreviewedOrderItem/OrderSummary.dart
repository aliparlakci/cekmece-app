import 'package:freezed_annotation/freezed_annotation.dart';

part 'OrderSummary.freezed.dart';
part 'OrderSummary.g.dart';

@freezed
class OrderSummary with _$OrderSummary {
  const factory OrderSummary({
    required int id,
    required DateTime createdDate,
    required DateTime updatedDate,
  }) = _OrderSummary;

  factory OrderSummary.fromJson(Map<String, dynamic> json) =>
      _$OrderSummaryFromJson(json);
}
