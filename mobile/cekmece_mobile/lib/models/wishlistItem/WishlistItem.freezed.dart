// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'WishlistItem.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

WishlistItem _$WishlistItemFromJson(Map<String, dynamic> json) {
  return _WishlistItem.fromJson(json);
}

/// @nodoc
class _$WishlistItemTearOff {
  const _$WishlistItemTearOff();

  _WishlistItem call({required String id, required Product item}) {
    return _WishlistItem(
      id: id,
      item: item,
    );
  }

  WishlistItem fromJson(Map<String, Object?> json) {
    return WishlistItem.fromJson(json);
  }
}

/// @nodoc
const $WishlistItem = _$WishlistItemTearOff();

/// @nodoc
mixin _$WishlistItem {
  String get id => throw _privateConstructorUsedError;
  Product get item => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $WishlistItemCopyWith<WishlistItem> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $WishlistItemCopyWith<$Res> {
  factory $WishlistItemCopyWith(
          WishlistItem value, $Res Function(WishlistItem) then) =
      _$WishlistItemCopyWithImpl<$Res>;
  $Res call({String id, Product item});

  $ProductCopyWith<$Res> get item;
}

/// @nodoc
class _$WishlistItemCopyWithImpl<$Res> implements $WishlistItemCopyWith<$Res> {
  _$WishlistItemCopyWithImpl(this._value, this._then);

  final WishlistItem _value;
  // ignore: unused_field
  final $Res Function(WishlistItem) _then;

  @override
  $Res call({
    Object? id = freezed,
    Object? item = freezed,
  }) {
    return _then(_value.copyWith(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
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
abstract class _$WishlistItemCopyWith<$Res>
    implements $WishlistItemCopyWith<$Res> {
  factory _$WishlistItemCopyWith(
          _WishlistItem value, $Res Function(_WishlistItem) then) =
      __$WishlistItemCopyWithImpl<$Res>;
  @override
  $Res call({String id, Product item});

  @override
  $ProductCopyWith<$Res> get item;
}

/// @nodoc
class __$WishlistItemCopyWithImpl<$Res> extends _$WishlistItemCopyWithImpl<$Res>
    implements _$WishlistItemCopyWith<$Res> {
  __$WishlistItemCopyWithImpl(
      _WishlistItem _value, $Res Function(_WishlistItem) _then)
      : super(_value, (v) => _then(v as _WishlistItem));

  @override
  _WishlistItem get _value => super._value as _WishlistItem;

  @override
  $Res call({
    Object? id = freezed,
    Object? item = freezed,
  }) {
    return _then(_WishlistItem(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      item: item == freezed
          ? _value.item
          : item // ignore: cast_nullable_to_non_nullable
              as Product,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_WishlistItem implements _WishlistItem {
  const _$_WishlistItem({required this.id, required this.item});

  factory _$_WishlistItem.fromJson(Map<String, dynamic> json) =>
      _$$_WishlistItemFromJson(json);

  @override
  final String id;
  @override
  final Product item;

  @override
  String toString() {
    return 'WishlistItem(id: $id, item: $item)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _WishlistItem &&
            const DeepCollectionEquality().equals(other.id, id) &&
            const DeepCollectionEquality().equals(other.item, item));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(id),
      const DeepCollectionEquality().hash(item));

  @JsonKey(ignore: true)
  @override
  _$WishlistItemCopyWith<_WishlistItem> get copyWith =>
      __$WishlistItemCopyWithImpl<_WishlistItem>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_WishlistItemToJson(this);
  }
}

abstract class _WishlistItem implements WishlistItem {
  const factory _WishlistItem({required String id, required Product item}) =
      _$_WishlistItem;

  factory _WishlistItem.fromJson(Map<String, dynamic> json) =
      _$_WishlistItem.fromJson;

  @override
  String get id;
  @override
  Product get item;
  @override
  @JsonKey(ignore: true)
  _$WishlistItemCopyWith<_WishlistItem> get copyWith =>
      throw _privateConstructorUsedError;
}
