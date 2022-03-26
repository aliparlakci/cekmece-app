// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'Product.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

Product _$ProductFromJson(Map<String, dynamic> json) {
  return _Product.fromJson(json);
}

/// @nodoc
class _$ProductTearOff {
  const _$ProductTearOff();

  _Product call(
      {required String id,
      required List<String> images,
      required double rating,
      required bool isFavourite,
      required bool isPopular,
      required String title,
      required int price,
      required String description}) {
    return _Product(
      id: id,
      images: images,
      rating: rating,
      isFavourite: isFavourite,
      isPopular: isPopular,
      title: title,
      price: price,
      description: description,
    );
  }

  Product fromJson(Map<String, Object?> json) {
    return Product.fromJson(json);
  }
}

/// @nodoc
const $Product = _$ProductTearOff();

/// @nodoc
mixin _$Product {
  String get id => throw _privateConstructorUsedError;
  List<String> get images => throw _privateConstructorUsedError;
  double get rating => throw _privateConstructorUsedError;
  bool get isFavourite => throw _privateConstructorUsedError;
  bool get isPopular => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  int get price => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ProductCopyWith<Product> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ProductCopyWith<$Res> {
  factory $ProductCopyWith(Product value, $Res Function(Product) then) =
      _$ProductCopyWithImpl<$Res>;
  $Res call(
      {String id,
      List<String> images,
      double rating,
      bool isFavourite,
      bool isPopular,
      String title,
      int price,
      String description});
}

/// @nodoc
class _$ProductCopyWithImpl<$Res> implements $ProductCopyWith<$Res> {
  _$ProductCopyWithImpl(this._value, this._then);

  final Product _value;
  // ignore: unused_field
  final $Res Function(Product) _then;

  @override
  $Res call({
    Object? id = freezed,
    Object? images = freezed,
    Object? rating = freezed,
    Object? isFavourite = freezed,
    Object? isPopular = freezed,
    Object? title = freezed,
    Object? price = freezed,
    Object? description = freezed,
  }) {
    return _then(_value.copyWith(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      images: images == freezed
          ? _value.images
          : images // ignore: cast_nullable_to_non_nullable
              as List<String>,
      rating: rating == freezed
          ? _value.rating
          : rating // ignore: cast_nullable_to_non_nullable
              as double,
      isFavourite: isFavourite == freezed
          ? _value.isFavourite
          : isFavourite // ignore: cast_nullable_to_non_nullable
              as bool,
      isPopular: isPopular == freezed
          ? _value.isPopular
          : isPopular // ignore: cast_nullable_to_non_nullable
              as bool,
      title: title == freezed
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      price: price == freezed
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as int,
      description: description == freezed
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
abstract class _$ProductCopyWith<$Res> implements $ProductCopyWith<$Res> {
  factory _$ProductCopyWith(_Product value, $Res Function(_Product) then) =
      __$ProductCopyWithImpl<$Res>;
  @override
  $Res call(
      {String id,
      List<String> images,
      double rating,
      bool isFavourite,
      bool isPopular,
      String title,
      int price,
      String description});
}

/// @nodoc
class __$ProductCopyWithImpl<$Res> extends _$ProductCopyWithImpl<$Res>
    implements _$ProductCopyWith<$Res> {
  __$ProductCopyWithImpl(_Product _value, $Res Function(_Product) _then)
      : super(_value, (v) => _then(v as _Product));

  @override
  _Product get _value => super._value as _Product;

  @override
  $Res call({
    Object? id = freezed,
    Object? images = freezed,
    Object? rating = freezed,
    Object? isFavourite = freezed,
    Object? isPopular = freezed,
    Object? title = freezed,
    Object? price = freezed,
    Object? description = freezed,
  }) {
    return _then(_Product(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      images: images == freezed
          ? _value.images
          : images // ignore: cast_nullable_to_non_nullable
              as List<String>,
      rating: rating == freezed
          ? _value.rating
          : rating // ignore: cast_nullable_to_non_nullable
              as double,
      isFavourite: isFavourite == freezed
          ? _value.isFavourite
          : isFavourite // ignore: cast_nullable_to_non_nullable
              as bool,
      isPopular: isPopular == freezed
          ? _value.isPopular
          : isPopular // ignore: cast_nullable_to_non_nullable
              as bool,
      title: title == freezed
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      price: price == freezed
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as int,
      description: description == freezed
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Product implements _Product {
  const _$_Product(
      {required this.id,
      required this.images,
      required this.rating,
      required this.isFavourite,
      required this.isPopular,
      required this.title,
      required this.price,
      required this.description});

  factory _$_Product.fromJson(Map<String, dynamic> json) =>
      _$$_ProductFromJson(json);

  @override
  final String id;
  @override
  final List<String> images;
  @override
  final double rating;
  @override
  final bool isFavourite;
  @override
  final bool isPopular;
  @override
  final String title;
  @override
  final int price;
  @override
  final String description;

  @override
  String toString() {
    return 'Product(id: $id, images: $images, rating: $rating, isFavourite: $isFavourite, isPopular: $isPopular, title: $title, price: $price, description: $description)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _Product &&
            const DeepCollectionEquality().equals(other.id, id) &&
            const DeepCollectionEquality().equals(other.images, images) &&
            const DeepCollectionEquality().equals(other.rating, rating) &&
            const DeepCollectionEquality()
                .equals(other.isFavourite, isFavourite) &&
            const DeepCollectionEquality().equals(other.isPopular, isPopular) &&
            const DeepCollectionEquality().equals(other.title, title) &&
            const DeepCollectionEquality().equals(other.price, price) &&
            const DeepCollectionEquality()
                .equals(other.description, description));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(id),
      const DeepCollectionEquality().hash(images),
      const DeepCollectionEquality().hash(rating),
      const DeepCollectionEquality().hash(isFavourite),
      const DeepCollectionEquality().hash(isPopular),
      const DeepCollectionEquality().hash(title),
      const DeepCollectionEquality().hash(price),
      const DeepCollectionEquality().hash(description));

  @JsonKey(ignore: true)
  @override
  _$ProductCopyWith<_Product> get copyWith =>
      __$ProductCopyWithImpl<_Product>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_ProductToJson(this);
  }
}

abstract class _Product implements Product {
  const factory _Product(
      {required String id,
      required List<String> images,
      required double rating,
      required bool isFavourite,
      required bool isPopular,
      required String title,
      required int price,
      required String description}) = _$_Product;

  factory _Product.fromJson(Map<String, dynamic> json) = _$_Product.fromJson;

  @override
  String get id;
  @override
  List<String> get images;
  @override
  double get rating;
  @override
  bool get isFavourite;
  @override
  bool get isPopular;
  @override
  String get title;
  @override
  int get price;
  @override
  String get description;
  @override
  @JsonKey(ignore: true)
  _$ProductCopyWith<_Product> get copyWith =>
      throw _privateConstructorUsedError;
}
