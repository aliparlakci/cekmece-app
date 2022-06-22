// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'UnreviewedOrderItem.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_UnreviewedOrderItem _$$_UnreviewedOrderItemFromJson(
        Map<String, dynamic> json) =>
    _$_UnreviewedOrderItem(
      id: json['id'] as int,
      order: OrderSummary.fromJson(json['order'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$_UnreviewedOrderItemToJson(
        _$_UnreviewedOrderItem instance) =>
    <String, dynamic>{
      'id': instance.id,
      'order': instance.order,
    };
