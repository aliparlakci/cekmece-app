// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ReviewClass.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_ReviewClass _$$_ReviewClassFromJson(Map<String, dynamic> json) =>
    _$_ReviewClass(
      id: json['id'] as int,
      rating: json['rating'] as int,
      comment: json['comment'] as String?,
      createdDate: DateTime.parse(json['createdDate'] as String),
      approvalStatus: json['approvalStatus'] as String,
      user: json['user'] as Map<String, dynamic>,
    );

Map<String, dynamic> _$$_ReviewClassToJson(_$_ReviewClass instance) =>
    <String, dynamic>{
      'id': instance.id,
      'rating': instance.rating,
      'comment': instance.comment,
      'createdDate': instance.createdDate.toIso8601String(),
      'approvalStatus': instance.approvalStatus,
      'user': instance.user,
    };
