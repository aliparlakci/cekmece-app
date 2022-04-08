// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'CartItem.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_CartItem _$$_CartItemFromJson(Map<String, dynamic> json) => _$_CartItem(
      id: json['id'] as String,
      total: json['total'] as int,
      quantity: json['quantity'] as int,
      item: Product.fromJson(json['item'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$_CartItemToJson(_$_CartItem instance) =>
    <String, dynamic>{
      'id': instance.id,
      'total': instance.total,
      'quantity': instance.quantity,
      'item': instance.item,
    };
