// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'Product.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Product _$$_ProductFromJson(Map<String, dynamic> json) => _$_Product(
      id: json['id'] as String,
      images:
          (json['images'] as List<dynamic>).map((e) => e as String).toList(),
      rating: (json['rating'] as num).toDouble(),
      isFavourite: json['isFavourite'] as bool,
      isPopular: json['isPopular'] as bool,
      title: json['title'] as String,
      price: json['price'] as int,
      description: json['description'] as String,
    );

Map<String, dynamic> _$$_ProductToJson(_$_Product instance) =>
    <String, dynamic>{
      'id': instance.id,
      'images': instance.images,
      'rating': instance.rating,
      'isFavourite': instance.isFavourite,
      'isPopular': instance.isPopular,
      'title': instance.title,
      'price': instance.price,
      'description': instance.description,
    };
