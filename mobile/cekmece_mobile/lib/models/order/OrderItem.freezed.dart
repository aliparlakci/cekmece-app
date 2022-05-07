// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'OrderItem.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

OrderItem _$OrderItemFromJson(Map<String, dynamic> json) {
  return _OrderItem.fromJson(json);
}

/// @nodoc
class _$OrderItemTearOff {
  const _$OrderItemTearOff();

  _OrderItem call(
      {required int id,
      required int subTotal,
      required int shipping,
      required int discount,
      required int total,
      required String status,
      required String promoCode,
      required String createdDate,
      required String updatedDate,
      required String addressLine1,
      required String province,
      required int zipCode,
      required String country,
      required String shippingOption,
      required List<CartItem> orderItems}) {
    return _OrderItem(
      id: id,
      subTotal: subTotal,
      shipping: shipping,
      discount: discount,
      total: total,
      status: status,
      promoCode: promoCode,
      createdDate: createdDate,
      updatedDate: updatedDate,
      addressLine1: addressLine1,
      province: province,
      zipCode: zipCode,
      country: country,
      shippingOption: shippingOption,
      orderItems: orderItems,
    );
  }

  OrderItem fromJson(Map<String, Object?> json) {
    return OrderItem.fromJson(json);
  }
}

/// @nodoc
const $OrderItem = _$OrderItemTearOff();

/// @nodoc
mixin _$OrderItem {
  int get id => throw _privateConstructorUsedError;
  int get subTotal => throw _privateConstructorUsedError;
  int get shipping => throw _privateConstructorUsedError;
  int get discount => throw _privateConstructorUsedError;
  int get total => throw _privateConstructorUsedError;
  String get status => throw _privateConstructorUsedError;
  String get promoCode => throw _privateConstructorUsedError;
  String get createdDate => throw _privateConstructorUsedError;
  String get updatedDate => throw _privateConstructorUsedError;
  String get addressLine1 => throw _privateConstructorUsedError;
  String get province => throw _privateConstructorUsedError;
  int get zipCode => throw _privateConstructorUsedError;
  String get country => throw _privateConstructorUsedError;
  String get shippingOption => throw _privateConstructorUsedError;
  List<CartItem> get orderItems => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $OrderItemCopyWith<OrderItem> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderItemCopyWith<$Res> {
  factory $OrderItemCopyWith(OrderItem value, $Res Function(OrderItem) then) =
      _$OrderItemCopyWithImpl<$Res>;
  $Res call(
      {int id,
      int subTotal,
      int shipping,
      int discount,
      int total,
      String status,
      String promoCode,
      String createdDate,
      String updatedDate,
      String addressLine1,
      String province,
      int zipCode,
      String country,
      String shippingOption,
      List<CartItem> orderItems});
}

/// @nodoc
class _$OrderItemCopyWithImpl<$Res> implements $OrderItemCopyWith<$Res> {
  _$OrderItemCopyWithImpl(this._value, this._then);

  final OrderItem _value;
  // ignore: unused_field
  final $Res Function(OrderItem) _then;

  @override
  $Res call({
    Object? id = freezed,
    Object? subTotal = freezed,
    Object? shipping = freezed,
    Object? discount = freezed,
    Object? total = freezed,
    Object? status = freezed,
    Object? promoCode = freezed,
    Object? createdDate = freezed,
    Object? updatedDate = freezed,
    Object? addressLine1 = freezed,
    Object? province = freezed,
    Object? zipCode = freezed,
    Object? country = freezed,
    Object? shippingOption = freezed,
    Object? orderItems = freezed,
  }) {
    return _then(_value.copyWith(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      subTotal: subTotal == freezed
          ? _value.subTotal
          : subTotal // ignore: cast_nullable_to_non_nullable
              as int,
      shipping: shipping == freezed
          ? _value.shipping
          : shipping // ignore: cast_nullable_to_non_nullable
              as int,
      discount: discount == freezed
          ? _value.discount
          : discount // ignore: cast_nullable_to_non_nullable
              as int,
      total: total == freezed
          ? _value.total
          : total // ignore: cast_nullable_to_non_nullable
              as int,
      status: status == freezed
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as String,
      promoCode: promoCode == freezed
          ? _value.promoCode
          : promoCode // ignore: cast_nullable_to_non_nullable
              as String,
      createdDate: createdDate == freezed
          ? _value.createdDate
          : createdDate // ignore: cast_nullable_to_non_nullable
              as String,
      updatedDate: updatedDate == freezed
          ? _value.updatedDate
          : updatedDate // ignore: cast_nullable_to_non_nullable
              as String,
      addressLine1: addressLine1 == freezed
          ? _value.addressLine1
          : addressLine1 // ignore: cast_nullable_to_non_nullable
              as String,
      province: province == freezed
          ? _value.province
          : province // ignore: cast_nullable_to_non_nullable
              as String,
      zipCode: zipCode == freezed
          ? _value.zipCode
          : zipCode // ignore: cast_nullable_to_non_nullable
              as int,
      country: country == freezed
          ? _value.country
          : country // ignore: cast_nullable_to_non_nullable
              as String,
      shippingOption: shippingOption == freezed
          ? _value.shippingOption
          : shippingOption // ignore: cast_nullable_to_non_nullable
              as String,
      orderItems: orderItems == freezed
          ? _value.orderItems
          : orderItems // ignore: cast_nullable_to_non_nullable
              as List<CartItem>,
    ));
  }
}

/// @nodoc
abstract class _$OrderItemCopyWith<$Res> implements $OrderItemCopyWith<$Res> {
  factory _$OrderItemCopyWith(
          _OrderItem value, $Res Function(_OrderItem) then) =
      __$OrderItemCopyWithImpl<$Res>;
  @override
  $Res call(
      {int id,
      int subTotal,
      int shipping,
      int discount,
      int total,
      String status,
      String promoCode,
      String createdDate,
      String updatedDate,
      String addressLine1,
      String province,
      int zipCode,
      String country,
      String shippingOption,
      List<CartItem> orderItems});
}

/// @nodoc
class __$OrderItemCopyWithImpl<$Res> extends _$OrderItemCopyWithImpl<$Res>
    implements _$OrderItemCopyWith<$Res> {
  __$OrderItemCopyWithImpl(_OrderItem _value, $Res Function(_OrderItem) _then)
      : super(_value, (v) => _then(v as _OrderItem));

  @override
  _OrderItem get _value => super._value as _OrderItem;

  @override
  $Res call({
    Object? id = freezed,
    Object? subTotal = freezed,
    Object? shipping = freezed,
    Object? discount = freezed,
    Object? total = freezed,
    Object? status = freezed,
    Object? promoCode = freezed,
    Object? createdDate = freezed,
    Object? updatedDate = freezed,
    Object? addressLine1 = freezed,
    Object? province = freezed,
    Object? zipCode = freezed,
    Object? country = freezed,
    Object? shippingOption = freezed,
    Object? orderItems = freezed,
  }) {
    return _then(_OrderItem(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      subTotal: subTotal == freezed
          ? _value.subTotal
          : subTotal // ignore: cast_nullable_to_non_nullable
              as int,
      shipping: shipping == freezed
          ? _value.shipping
          : shipping // ignore: cast_nullable_to_non_nullable
              as int,
      discount: discount == freezed
          ? _value.discount
          : discount // ignore: cast_nullable_to_non_nullable
              as int,
      total: total == freezed
          ? _value.total
          : total // ignore: cast_nullable_to_non_nullable
              as int,
      status: status == freezed
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as String,
      promoCode: promoCode == freezed
          ? _value.promoCode
          : promoCode // ignore: cast_nullable_to_non_nullable
              as String,
      createdDate: createdDate == freezed
          ? _value.createdDate
          : createdDate // ignore: cast_nullable_to_non_nullable
              as String,
      updatedDate: updatedDate == freezed
          ? _value.updatedDate
          : updatedDate // ignore: cast_nullable_to_non_nullable
              as String,
      addressLine1: addressLine1 == freezed
          ? _value.addressLine1
          : addressLine1 // ignore: cast_nullable_to_non_nullable
              as String,
      province: province == freezed
          ? _value.province
          : province // ignore: cast_nullable_to_non_nullable
              as String,
      zipCode: zipCode == freezed
          ? _value.zipCode
          : zipCode // ignore: cast_nullable_to_non_nullable
              as int,
      country: country == freezed
          ? _value.country
          : country // ignore: cast_nullable_to_non_nullable
              as String,
      shippingOption: shippingOption == freezed
          ? _value.shippingOption
          : shippingOption // ignore: cast_nullable_to_non_nullable
              as String,
      orderItems: orderItems == freezed
          ? _value.orderItems
          : orderItems // ignore: cast_nullable_to_non_nullable
              as List<CartItem>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_OrderItem implements _OrderItem {
  const _$_OrderItem(
      {required this.id,
      required this.subTotal,
      required this.shipping,
      required this.discount,
      required this.total,
      required this.status,
      required this.promoCode,
      required this.createdDate,
      required this.updatedDate,
      required this.addressLine1,
      required this.province,
      required this.zipCode,
      required this.country,
      required this.shippingOption,
      required this.orderItems});

  factory _$_OrderItem.fromJson(Map<String, dynamic> json) =>
      _$$_OrderItemFromJson(json);

  @override
  final int id;
  @override
  final int subTotal;
  @override
  final int shipping;
  @override
  final int discount;
  @override
  final int total;
  @override
  final String status;
  @override
  final String promoCode;
  @override
  final String createdDate;
  @override
  final String updatedDate;
  @override
  final String addressLine1;
  @override
  final String province;
  @override
  final int zipCode;
  @override
  final String country;
  @override
  final String shippingOption;
  @override
  final List<CartItem> orderItems;

  @override
  String toString() {
    return 'OrderItem(id: $id, subTotal: $subTotal, shipping: $shipping, discount: $discount, total: $total, status: $status, promoCode: $promoCode, createdDate: $createdDate, updatedDate: $updatedDate, addressLine1: $addressLine1, province: $province, zipCode: $zipCode, country: $country, shippingOption: $shippingOption, orderItems: $orderItems)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _OrderItem &&
            const DeepCollectionEquality().equals(other.id, id) &&
            const DeepCollectionEquality().equals(other.subTotal, subTotal) &&
            const DeepCollectionEquality().equals(other.shipping, shipping) &&
            const DeepCollectionEquality().equals(other.discount, discount) &&
            const DeepCollectionEquality().equals(other.total, total) &&
            const DeepCollectionEquality().equals(other.status, status) &&
            const DeepCollectionEquality().equals(other.promoCode, promoCode) &&
            const DeepCollectionEquality()
                .equals(other.createdDate, createdDate) &&
            const DeepCollectionEquality()
                .equals(other.updatedDate, updatedDate) &&
            const DeepCollectionEquality()
                .equals(other.addressLine1, addressLine1) &&
            const DeepCollectionEquality().equals(other.province, province) &&
            const DeepCollectionEquality().equals(other.zipCode, zipCode) &&
            const DeepCollectionEquality().equals(other.country, country) &&
            const DeepCollectionEquality()
                .equals(other.shippingOption, shippingOption) &&
            const DeepCollectionEquality()
                .equals(other.orderItems, orderItems));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(id),
      const DeepCollectionEquality().hash(subTotal),
      const DeepCollectionEquality().hash(shipping),
      const DeepCollectionEquality().hash(discount),
      const DeepCollectionEquality().hash(total),
      const DeepCollectionEquality().hash(status),
      const DeepCollectionEquality().hash(promoCode),
      const DeepCollectionEquality().hash(createdDate),
      const DeepCollectionEquality().hash(updatedDate),
      const DeepCollectionEquality().hash(addressLine1),
      const DeepCollectionEquality().hash(province),
      const DeepCollectionEquality().hash(zipCode),
      const DeepCollectionEquality().hash(country),
      const DeepCollectionEquality().hash(shippingOption),
      const DeepCollectionEquality().hash(orderItems));

  @JsonKey(ignore: true)
  @override
  _$OrderItemCopyWith<_OrderItem> get copyWith =>
      __$OrderItemCopyWithImpl<_OrderItem>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_OrderItemToJson(this);
  }
}

abstract class _OrderItem implements OrderItem {
  const factory _OrderItem(
      {required int id,
      required int subTotal,
      required int shipping,
      required int discount,
      required int total,
      required String status,
      required String promoCode,
      required String createdDate,
      required String updatedDate,
      required String addressLine1,
      required String province,
      required int zipCode,
      required String country,
      required String shippingOption,
      required List<CartItem> orderItems}) = _$_OrderItem;

  factory _OrderItem.fromJson(Map<String, dynamic> json) =
      _$_OrderItem.fromJson;

  @override
  int get id;
  @override
  int get subTotal;
  @override
  int get shipping;
  @override
  int get discount;
  @override
  int get total;
  @override
  String get status;
  @override
  String get promoCode;
  @override
  String get createdDate;
  @override
  String get updatedDate;
  @override
  String get addressLine1;
  @override
  String get province;
  @override
  int get zipCode;
  @override
  String get country;
  @override
  String get shippingOption;
  @override
  List<CartItem> get orderItems;
  @override
  @JsonKey(ignore: true)
  _$OrderItemCopyWith<_OrderItem> get copyWith =>
      throw _privateConstructorUsedError;
}
