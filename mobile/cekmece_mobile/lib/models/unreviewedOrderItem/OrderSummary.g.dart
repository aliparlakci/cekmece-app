// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'OrderSummary.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_OrderSummary _$$_OrderSummaryFromJson(Map<String, dynamic> json) =>
    _$_OrderSummary(
      id: json['id'] as int,
      createdDate: DateTime.parse(json['createdDate'] as String),
      updatedDate: DateTime.parse(json['updatedDate'] as String),
    );

Map<String, dynamic> _$$_OrderSummaryToJson(_$_OrderSummary instance) =>
    <String, dynamic>{
      'id': instance.id,
      'createdDate': instance.createdDate.toIso8601String(),
      'updatedDate': instance.updatedDate.toIso8601String(),
    };
