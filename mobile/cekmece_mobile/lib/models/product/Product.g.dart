// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'Product.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Product _$$_ProductFromJson(Map<String, dynamic> json) => _$_Product(
      id: json['id'] as int,
      name: json['name'] as String,
      photoUrl: json['photoUrl'] as String,
      description: json['description'] as String,
      price: json['price'] as int,
      number: json['number'] as int,
      model: json['model'] as int,
      quantity: json['quantity'] as int,
      warranty: json['warranty'] as int,
      reviewCount: json['reviewCount'] as int,
      averageRating: json['averageRating'] as String,
      userCanReviewCar: json['userCanReviewCar'] as bool?,
      distributor: json['distributor'] as Map<String, dynamic>,
      category: json['category'] as Map<String, dynamic>,
    );

Map<String, dynamic> _$$_ProductToJson(_$_Product instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'photoUrl': instance.photoUrl,
      'description': instance.description,
      'price': instance.price,
      'number': instance.number,
      'model': instance.model,
      'quantity': instance.quantity,
      'warranty': instance.warranty,
      'reviewCount': instance.reviewCount,
      'averageRating': instance.averageRating,
      'userCanReviewCar': instance.userCanReviewCar,
      'distributor': instance.distributor,
      'category': instance.category,
    };
