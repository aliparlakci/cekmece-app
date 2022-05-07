// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'OrderItem.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_OrderItem _$$_OrderItemFromJson(Map<String, dynamic> json) => _$_OrderItem(
      id: json['id'] as int,
      subTotal: json['subTotal'] as int,
      shipping: json['shipping'] as int,
      discount: json['discount'] as int,
      total: json['total'] as int,
      status: json['status'] as String,
      promoCode: json['promoCode'] as String,
      createdDate: json['createdDate'] as String,
      updatedDate: json['updatedDate'] as String,
      addressLine1: json['addressLine1'] as String,
      province: json['province'] as String,
      zipCode: json['zipCode'] as int,
      country: json['country'] as String,
      shippingOption: json['shippingOption'] as String,
      orderItems: (json['orderItems'] as List<dynamic>)
          .map((e) => CartItem.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$_OrderItemToJson(_$_OrderItem instance) =>
    <String, dynamic>{
      'id': instance.id,
      'subTotal': instance.subTotal,
      'shipping': instance.shipping,
      'discount': instance.discount,
      'total': instance.total,
      'status': instance.status,
      'promoCode': instance.promoCode,
      'createdDate': instance.createdDate,
      'updatedDate': instance.updatedDate,
      'addressLine1': instance.addressLine1,
      'province': instance.province,
      'zipCode': instance.zipCode,
      'country': instance.country,
      'shippingOption': instance.shippingOption,
      'orderItems': instance.orderItems,
    };
