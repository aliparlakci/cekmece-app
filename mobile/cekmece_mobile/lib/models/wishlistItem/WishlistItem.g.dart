// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'WishlistItem.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_WishlistItem _$$_WishlistItemFromJson(Map<String, dynamic> json) =>
    _$_WishlistItem(
      id: json['id'] as String,
      item: Product.fromJson(json['item'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$_WishlistItemToJson(_$_WishlistItem instance) =>
    <String, dynamic>{
      'id': instance.id,
      'item': instance.item,
    };
