// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'UnreviewedOrderItem.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

UnreviewedOrderItem _$UnreviewedOrderItemFromJson(Map<String, dynamic> json) {
  return _UnreviewedOrderItem.fromJson(json);
}

/// @nodoc
class _$UnreviewedOrderItemTearOff {
  const _$UnreviewedOrderItemTearOff();

  _UnreviewedOrderItem call({required String id, required OrderSummary order}) {
    return _UnreviewedOrderItem(
      id: id,
      order: order,
    );
  }

  UnreviewedOrderItem fromJson(Map<String, Object?> json) {
    return UnreviewedOrderItem.fromJson(json);
  }
}

/// @nodoc
const $UnreviewedOrderItem = _$UnreviewedOrderItemTearOff();

/// @nodoc
mixin _$UnreviewedOrderItem {
  String get id => throw _privateConstructorUsedError;
  OrderSummary get order => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UnreviewedOrderItemCopyWith<UnreviewedOrderItem> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UnreviewedOrderItemCopyWith<$Res> {
  factory $UnreviewedOrderItemCopyWith(
          UnreviewedOrderItem value, $Res Function(UnreviewedOrderItem) then) =
      _$UnreviewedOrderItemCopyWithImpl<$Res>;
  $Res call({String id, OrderSummary order});

  $OrderSummaryCopyWith<$Res> get order;
}

/// @nodoc
class _$UnreviewedOrderItemCopyWithImpl<$Res>
    implements $UnreviewedOrderItemCopyWith<$Res> {
  _$UnreviewedOrderItemCopyWithImpl(this._value, this._then);

  final UnreviewedOrderItem _value;
  // ignore: unused_field
  final $Res Function(UnreviewedOrderItem) _then;

  @override
  $Res call({
    Object? id = freezed,
    Object? order = freezed,
  }) {
    return _then(_value.copyWith(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      order: order == freezed
          ? _value.order
          : order // ignore: cast_nullable_to_non_nullable
              as OrderSummary,
    ));
  }

  @override
  $OrderSummaryCopyWith<$Res> get order {
    return $OrderSummaryCopyWith<$Res>(_value.order, (value) {
      return _then(_value.copyWith(order: value));
    });
  }
}

/// @nodoc
abstract class _$UnreviewedOrderItemCopyWith<$Res>
    implements $UnreviewedOrderItemCopyWith<$Res> {
  factory _$UnreviewedOrderItemCopyWith(_UnreviewedOrderItem value,
          $Res Function(_UnreviewedOrderItem) then) =
      __$UnreviewedOrderItemCopyWithImpl<$Res>;
  @override
  $Res call({String id, OrderSummary order});

  @override
  $OrderSummaryCopyWith<$Res> get order;
}

/// @nodoc
class __$UnreviewedOrderItemCopyWithImpl<$Res>
    extends _$UnreviewedOrderItemCopyWithImpl<$Res>
    implements _$UnreviewedOrderItemCopyWith<$Res> {
  __$UnreviewedOrderItemCopyWithImpl(
      _UnreviewedOrderItem _value, $Res Function(_UnreviewedOrderItem) _then)
      : super(_value, (v) => _then(v as _UnreviewedOrderItem));

  @override
  _UnreviewedOrderItem get _value => super._value as _UnreviewedOrderItem;

  @override
  $Res call({
    Object? id = freezed,
    Object? order = freezed,
  }) {
    return _then(_UnreviewedOrderItem(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      order: order == freezed
          ? _value.order
          : order // ignore: cast_nullable_to_non_nullable
              as OrderSummary,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_UnreviewedOrderItem implements _UnreviewedOrderItem {
  const _$_UnreviewedOrderItem({required this.id, required this.order});

  factory _$_UnreviewedOrderItem.fromJson(Map<String, dynamic> json) =>
      _$$_UnreviewedOrderItemFromJson(json);

  @override
  final String id;
  @override
  final OrderSummary order;

  @override
  String toString() {
    return 'UnreviewedOrderItem(id: $id, order: $order)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _UnreviewedOrderItem &&
            const DeepCollectionEquality().equals(other.id, id) &&
            const DeepCollectionEquality().equals(other.order, order));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(id),
      const DeepCollectionEquality().hash(order));

  @JsonKey(ignore: true)
  @override
  _$UnreviewedOrderItemCopyWith<_UnreviewedOrderItem> get copyWith =>
      __$UnreviewedOrderItemCopyWithImpl<_UnreviewedOrderItem>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_UnreviewedOrderItemToJson(this);
  }
}

abstract class _UnreviewedOrderItem implements UnreviewedOrderItem {
  const factory _UnreviewedOrderItem(
      {required String id,
      required OrderSummary order}) = _$_UnreviewedOrderItem;

  factory _UnreviewedOrderItem.fromJson(Map<String, dynamic> json) =
      _$_UnreviewedOrderItem.fromJson;

  @override
  String get id;
  @override
  OrderSummary get order;
  @override
  @JsonKey(ignore: true)
  _$UnreviewedOrderItemCopyWith<_UnreviewedOrderItem> get copyWith =>
      throw _privateConstructorUsedError;
}
