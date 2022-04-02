// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'Product.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Product _$$_ProductFromJson(Map<String, dynamic> json) => _$_Product(
      id: json['id'] as int,
      name: json['name'] as String,
      price: json['price'] as int,
      number: json['number'] as int,
      model: json['model'] as int,
      quantity: json['quantity'] as int,
      warranty: json['warranty'] as int,
      distributor: json['distributor'] as Map<String, dynamic>,
      categories: (json['categories'] as List<dynamic>)
          .map((e) => e as Map<String, dynamic>)
          .toList(),
    );

Map<String, dynamic> _$$_ProductToJson(_$_Product instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'price': instance.price,
      'number': instance.number,
      'model': instance.model,
      'quantity': instance.quantity,
      'warranty': instance.warranty,
      'distributor': instance.distributor,
      'categories': instance.categories,
    };
