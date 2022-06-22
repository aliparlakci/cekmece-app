// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ActualOrderItem.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_ActualOrderItem _$$_ActualOrderItemFromJson(Map<String, dynamic> json) =>
    _$_ActualOrderItem(
      id: json['id'] as int,
      total: json['total'] as int,
      quantity: json['quantity'] as int,
      item: Product.fromJson(json['item'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$_ActualOrderItemToJson(_$_ActualOrderItem instance) =>
    <String, dynamic>{
      'id': instance.id,
      'total': instance.total,
      'quantity': instance.quantity,
      'item': instance.item,
    };
