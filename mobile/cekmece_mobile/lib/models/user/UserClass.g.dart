// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'UserClass.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_UserClass _$$_UserClassFromJson(Map<String, dynamic> json) => _$_UserClass(
      displayName: json['displayName'] as String?,
      isAnonymous: json['isAnonymous'] as bool,
      uid: json['uid'] as String,
      cart: (json['cart'] as List<dynamic>)
          .map((e) => CartItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      wishlist: (json['wishlist'] as List<dynamic>)
          .map((e) => WishlistItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      email: json['email'] as String?,
      photoUrl: json['photoUrl'] as String?,
    );

Map<String, dynamic> _$$_UserClassToJson(_$_UserClass instance) =>
    <String, dynamic>{
      'displayName': instance.displayName,
      'isAnonymous': instance.isAnonymous,
      'uid': instance.uid,
      'cart': instance.cart,
      'wishlist': instance.wishlist,
      'email': instance.email,
      'photoUrl': instance.photoUrl,
    };
