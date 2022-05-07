// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'OrderSummary.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

OrderSummary _$OrderSummaryFromJson(Map<String, dynamic> json) {
  return _OrderSummary.fromJson(json);
}

/// @nodoc
class _$OrderSummaryTearOff {
  const _$OrderSummaryTearOff();

  _OrderSummary call(
      {required int id,
      required DateTime createdDate,
      required DateTime updatedDate}) {
    return _OrderSummary(
      id: id,
      createdDate: createdDate,
      updatedDate: updatedDate,
    );
  }

  OrderSummary fromJson(Map<String, Object?> json) {
    return OrderSummary.fromJson(json);
  }
}

/// @nodoc
const $OrderSummary = _$OrderSummaryTearOff();

/// @nodoc
mixin _$OrderSummary {
  int get id => throw _privateConstructorUsedError;
  DateTime get createdDate => throw _privateConstructorUsedError;
  DateTime get updatedDate => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $OrderSummaryCopyWith<OrderSummary> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderSummaryCopyWith<$Res> {
  factory $OrderSummaryCopyWith(
          OrderSummary value, $Res Function(OrderSummary) then) =
      _$OrderSummaryCopyWithImpl<$Res>;
  $Res call({int id, DateTime createdDate, DateTime updatedDate});
}

/// @nodoc
class _$OrderSummaryCopyWithImpl<$Res> implements $OrderSummaryCopyWith<$Res> {
  _$OrderSummaryCopyWithImpl(this._value, this._then);

  final OrderSummary _value;
  // ignore: unused_field
  final $Res Function(OrderSummary) _then;

  @override
  $Res call({
    Object? id = freezed,
    Object? createdDate = freezed,
    Object? updatedDate = freezed,
  }) {
    return _then(_value.copyWith(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      createdDate: createdDate == freezed
          ? _value.createdDate
          : createdDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      updatedDate: updatedDate == freezed
          ? _value.updatedDate
          : updatedDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ));
  }
}

/// @nodoc
abstract class _$OrderSummaryCopyWith<$Res>
    implements $OrderSummaryCopyWith<$Res> {
  factory _$OrderSummaryCopyWith(
          _OrderSummary value, $Res Function(_OrderSummary) then) =
      __$OrderSummaryCopyWithImpl<$Res>;
  @override
  $Res call({int id, DateTime createdDate, DateTime updatedDate});
}

/// @nodoc
class __$OrderSummaryCopyWithImpl<$Res> extends _$OrderSummaryCopyWithImpl<$Res>
    implements _$OrderSummaryCopyWith<$Res> {
  __$OrderSummaryCopyWithImpl(
      _OrderSummary _value, $Res Function(_OrderSummary) _then)
      : super(_value, (v) => _then(v as _OrderSummary));

  @override
  _OrderSummary get _value => super._value as _OrderSummary;

  @override
  $Res call({
    Object? id = freezed,
    Object? createdDate = freezed,
    Object? updatedDate = freezed,
  }) {
    return _then(_OrderSummary(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      createdDate: createdDate == freezed
          ? _value.createdDate
          : createdDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      updatedDate: updatedDate == freezed
          ? _value.updatedDate
          : updatedDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_OrderSummary implements _OrderSummary {
  const _$_OrderSummary(
      {required this.id, required this.createdDate, required this.updatedDate});

  factory _$_OrderSummary.fromJson(Map<String, dynamic> json) =>
      _$$_OrderSummaryFromJson(json);

  @override
  final int id;
  @override
  final DateTime createdDate;
  @override
  final DateTime updatedDate;

  @override
  String toString() {
    return 'OrderSummary(id: $id, createdDate: $createdDate, updatedDate: $updatedDate)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _OrderSummary &&
            const DeepCollectionEquality().equals(other.id, id) &&
            const DeepCollectionEquality()
                .equals(other.createdDate, createdDate) &&
            const DeepCollectionEquality()
                .equals(other.updatedDate, updatedDate));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(id),
      const DeepCollectionEquality().hash(createdDate),
      const DeepCollectionEquality().hash(updatedDate));

  @JsonKey(ignore: true)
  @override
  _$OrderSummaryCopyWith<_OrderSummary> get copyWith =>
      __$OrderSummaryCopyWithImpl<_OrderSummary>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_OrderSummaryToJson(this);
  }
}

abstract class _OrderSummary implements OrderSummary {
  const factory _OrderSummary(
      {required int id,
      required DateTime createdDate,
      required DateTime updatedDate}) = _$_OrderSummary;

  factory _OrderSummary.fromJson(Map<String, dynamic> json) =
      _$_OrderSummary.fromJson;

  @override
  int get id;
  @override
  DateTime get createdDate;
  @override
  DateTime get updatedDate;
  @override
  @JsonKey(ignore: true)
  _$OrderSummaryCopyWith<_OrderSummary> get copyWith =>
      throw _privateConstructorUsedError;
}
