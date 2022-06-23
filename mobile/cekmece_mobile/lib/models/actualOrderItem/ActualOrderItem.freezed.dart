// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'ActualOrderItem.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

ActualOrderItem _$ActualOrderItemFromJson(Map<String, dynamic> json) {
  return _ActualOrderItem.fromJson(json);
}

/// @nodoc
class _$ActualOrderItemTearOff {
  const _$ActualOrderItemTearOff();

  _ActualOrderItem call(
      {required int id,
      required int total,
      required int quantity,
      required Product item}) {
    return _ActualOrderItem(
      id: id,
      total: total,
      quantity: quantity,
      item: item,
    );
  }

  ActualOrderItem fromJson(Map<String, Object?> json) {
    return ActualOrderItem.fromJson(json);
  }
}

/// @nodoc
const $ActualOrderItem = _$ActualOrderItemTearOff();

/// @nodoc
mixin _$ActualOrderItem {
  int get id => throw _privateConstructorUsedError;
  int get total => throw _privateConstructorUsedError;
  int get quantity => throw _privateConstructorUsedError;
  Product get item => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ActualOrderItemCopyWith<ActualOrderItem> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ActualOrderItemCopyWith<$Res> {
  factory $ActualOrderItemCopyWith(
          ActualOrderItem value, $Res Function(ActualOrderItem) then) =
      _$ActualOrderItemCopyWithImpl<$Res>;
  $Res call({int id, int total, int quantity, Product item});

  $ProductCopyWith<$Res> get item;
}

/// @nodoc
class _$ActualOrderItemCopyWithImpl<$Res>
    implements $ActualOrderItemCopyWith<$Res> {
  _$ActualOrderItemCopyWithImpl(this._value, this._then);

  final ActualOrderItem _value;
  // ignore: unused_field
  final $Res Function(ActualOrderItem) _then;

  @override
  $Res call({
    Object? id = freezed,
    Object? total = freezed,
    Object? quantity = freezed,
    Object? item = freezed,
  }) {
    return _then(_value.copyWith(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      total: total == freezed
          ? _value.total
          : total // ignore: cast_nullable_to_non_nullable
              as int,
      quantity: quantity == freezed
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as int,
      item: item == freezed
          ? _value.item
          : item // ignore: cast_nullable_to_non_nullable
              as Product,
    ));
  }

  @override
  $ProductCopyWith<$Res> get item {
    return $ProductCopyWith<$Res>(_value.item, (value) {
      return _then(_value.copyWith(item: value));
    });
  }
}

/// @nodoc
abstract class _$ActualOrderItemCopyWith<$Res>
    implements $ActualOrderItemCopyWith<$Res> {
  factory _$ActualOrderItemCopyWith(
          _ActualOrderItem value, $Res Function(_ActualOrderItem) then) =
      __$ActualOrderItemCopyWithImpl<$Res>;
  @override
  $Res call({int id, int total, int quantity, Product item});

  @override
  $ProductCopyWith<$Res> get item;
}

/// @nodoc
class __$ActualOrderItemCopyWithImpl<$Res>
    extends _$ActualOrderItemCopyWithImpl<$Res>
    implements _$ActualOrderItemCopyWith<$Res> {
  __$ActualOrderItemCopyWithImpl(
      _ActualOrderItem _value, $Res Function(_ActualOrderItem) _then)
      : super(_value, (v) => _then(v as _ActualOrderItem));

  @override
  _ActualOrderItem get _value => super._value as _ActualOrderItem;

  @override
  $Res call({
    Object? id = freezed,
    Object? total = freezed,
    Object? quantity = freezed,
    Object? item = freezed,
  }) {
    return _then(_ActualOrderItem(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      total: total == freezed
          ? _value.total
          : total // ignore: cast_nullable_to_non_nullable
              as int,
      quantity: quantity == freezed
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as int,
      item: item == freezed
          ? _value.item
          : item // ignore: cast_nullable_to_non_nullable
              as Product,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_ActualOrderItem implements _ActualOrderItem {
  const _$_ActualOrderItem(
      {required this.id,
      required this.total,
      required this.quantity,
      required this.item});

  factory _$_ActualOrderItem.fromJson(Map<String, dynamic> json) =>
      _$$_ActualOrderItemFromJson(json);

  @override
  final int id;
  @override
  final int total;
  @override
  final int quantity;
  @override
  final Product item;

  @override
  String toString() {
    return 'ActualOrderItem(id: $id, total: $total, quantity: $quantity, item: $item)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _ActualOrderItem &&
            const DeepCollectionEquality().equals(other.id, id) &&
            const DeepCollectionEquality().equals(other.total, total) &&
            const DeepCollectionEquality().equals(other.quantity, quantity) &&
            const DeepCollectionEquality().equals(other.item, item));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(id),
      const DeepCollectionEquality().hash(total),
      const DeepCollectionEquality().hash(quantity),
      const DeepCollectionEquality().hash(item));

  @JsonKey(ignore: true)
  @override
  _$ActualOrderItemCopyWith<_ActualOrderItem> get copyWith =>
      __$ActualOrderItemCopyWithImpl<_ActualOrderItem>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_ActualOrderItemToJson(this);
  }
}

abstract class _ActualOrderItem implements ActualOrderItem {
  const factory _ActualOrderItem(
      {required int id,
      required int total,
      required int quantity,
      required Product item}) = _$_ActualOrderItem;

  factory _ActualOrderItem.fromJson(Map<String, dynamic> json) =
      _$_ActualOrderItem.fromJson;

  @override
  int get id;
  @override
  int get total;
  @override
  int get quantity;
  @override
  Product get item;
  @override
  @JsonKey(ignore: true)
  _$ActualOrderItemCopyWith<_ActualOrderItem> get copyWith =>
      throw _privateConstructorUsedError;
}
