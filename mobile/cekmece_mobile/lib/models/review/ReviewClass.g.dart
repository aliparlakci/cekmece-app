// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ReviewClass.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_ReviewClass _$$_ReviewClassFromJson(Map<String, dynamic> json) =>
    _$_ReviewClass(
      id: json['id'] as int,
      carId: json['carId'] as int,
      userId: json['userId'] as int?,
      rating: json['rating'] as int,
      comment: json['comment'] as String,
      date: DateTime.parse(json['date'] as String),
      isApproved: json['isApproved'] as bool?,
    );

Map<String, dynamic> _$$_ReviewClassToJson(_$_ReviewClass instance) =>
    <String, dynamic>{
      'id': instance.id,
      'carId': instance.carId,
      'userId': instance.userId,
      'rating': instance.rating,
      'comment': instance.comment,
      'date': instance.date.toIso8601String(),
      'isApproved': instance.isApproved,
    };
