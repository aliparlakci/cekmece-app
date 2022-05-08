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
      {required int id,
      required String name,
      required String photoUrl,
      required String description,
      required int price,
      required int number,
      required int model,
      required int quantity,
      required int warranty,
      required int reviewCount,
      required String averageRating,
      bool? userCanReviewCar,
      required Map<String, dynamic> distributor,
      required Map<String, dynamic> category}) {
    return _Product(
      id: id,
      name: name,
      photoUrl: photoUrl,
      description: description,
      price: price,
      number: number,
      model: model,
      quantity: quantity,
      warranty: warranty,
      reviewCount: reviewCount,
      averageRating: averageRating,
      userCanReviewCar: userCanReviewCar,
      distributor: distributor,
      category: category,
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
  int get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get photoUrl => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;
  int get price => throw _privateConstructorUsedError;
  int get number => throw _privateConstructorUsedError;
  int get model => throw _privateConstructorUsedError;
  int get quantity => throw _privateConstructorUsedError;
  int get warranty => throw _privateConstructorUsedError;
  int get reviewCount => throw _privateConstructorUsedError;
  String get averageRating => throw _privateConstructorUsedError;
  bool? get userCanReviewCar => throw _privateConstructorUsedError;
  Map<String, dynamic> get distributor => throw _privateConstructorUsedError;
  Map<String, dynamic> get category => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ProductCopyWith<Product> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ProductCopyWith<$Res> {
  factory $ProductCopyWith(Product value, $Res Function(Product) then) =
      _$ProductCopyWithImpl<$Res>;
  $Res call(
      {int id,
      String name,
      String photoUrl,
      String description,
      int price,
      int number,
      int model,
      int quantity,
      int warranty,
      int reviewCount,
      String averageRating,
      bool? userCanReviewCar,
      Map<String, dynamic> distributor,
      Map<String, dynamic> category});
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
    Object? name = freezed,
    Object? photoUrl = freezed,
    Object? description = freezed,
    Object? price = freezed,
    Object? number = freezed,
    Object? model = freezed,
    Object? quantity = freezed,
    Object? warranty = freezed,
    Object? reviewCount = freezed,
    Object? averageRating = freezed,
    Object? userCanReviewCar = freezed,
    Object? distributor = freezed,
    Object? category = freezed,
  }) {
    return _then(_value.copyWith(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      name: name == freezed
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      photoUrl: photoUrl == freezed
          ? _value.photoUrl
          : photoUrl // ignore: cast_nullable_to_non_nullable
              as String,
      description: description == freezed
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
      price: price == freezed
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as int,
      number: number == freezed
          ? _value.number
          : number // ignore: cast_nullable_to_non_nullable
              as int,
      model: model == freezed
          ? _value.model
          : model // ignore: cast_nullable_to_non_nullable
              as int,
      quantity: quantity == freezed
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as int,
      warranty: warranty == freezed
          ? _value.warranty
          : warranty // ignore: cast_nullable_to_non_nullable
              as int,
      reviewCount: reviewCount == freezed
          ? _value.reviewCount
          : reviewCount // ignore: cast_nullable_to_non_nullable
              as int,
      averageRating: averageRating == freezed
          ? _value.averageRating
          : averageRating // ignore: cast_nullable_to_non_nullable
              as String,
      userCanReviewCar: userCanReviewCar == freezed
          ? _value.userCanReviewCar
          : userCanReviewCar // ignore: cast_nullable_to_non_nullable
              as bool?,
      distributor: distributor == freezed
          ? _value.distributor
          : distributor // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>,
      category: category == freezed
          ? _value.category
          : category // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>,
    ));
  }
}

/// @nodoc
abstract class _$ProductCopyWith<$Res> implements $ProductCopyWith<$Res> {
  factory _$ProductCopyWith(_Product value, $Res Function(_Product) then) =
      __$ProductCopyWithImpl<$Res>;
  @override
  $Res call(
      {int id,
      String name,
      String photoUrl,
      String description,
      int price,
      int number,
      int model,
      int quantity,
      int warranty,
      int reviewCount,
      String averageRating,
      bool? userCanReviewCar,
      Map<String, dynamic> distributor,
      Map<String, dynamic> category});
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
    Object? name = freezed,
    Object? photoUrl = freezed,
    Object? description = freezed,
    Object? price = freezed,
    Object? number = freezed,
    Object? model = freezed,
    Object? quantity = freezed,
    Object? warranty = freezed,
    Object? reviewCount = freezed,
    Object? averageRating = freezed,
    Object? userCanReviewCar = freezed,
    Object? distributor = freezed,
    Object? category = freezed,
  }) {
    return _then(_Product(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      name: name == freezed
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      photoUrl: photoUrl == freezed
          ? _value.photoUrl
          : photoUrl // ignore: cast_nullable_to_non_nullable
              as String,
      description: description == freezed
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
      price: price == freezed
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as int,
      number: number == freezed
          ? _value.number
          : number // ignore: cast_nullable_to_non_nullable
              as int,
      model: model == freezed
          ? _value.model
          : model // ignore: cast_nullable_to_non_nullable
              as int,
      quantity: quantity == freezed
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as int,
      warranty: warranty == freezed
          ? _value.warranty
          : warranty // ignore: cast_nullable_to_non_nullable
              as int,
      reviewCount: reviewCount == freezed
          ? _value.reviewCount
          : reviewCount // ignore: cast_nullable_to_non_nullable
              as int,
      averageRating: averageRating == freezed
          ? _value.averageRating
          : averageRating // ignore: cast_nullable_to_non_nullable
              as String,
      userCanReviewCar: userCanReviewCar == freezed
          ? _value.userCanReviewCar
          : userCanReviewCar // ignore: cast_nullable_to_non_nullable
              as bool?,
      distributor: distributor == freezed
          ? _value.distributor
          : distributor // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>,
      category: category == freezed
          ? _value.category
          : category // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Product implements _Product {
  const _$_Product(
      {required this.id,
      required this.name,
      required this.photoUrl,
      required this.description,
      required this.price,
      required this.number,
      required this.model,
      required this.quantity,
      required this.warranty,
      required this.reviewCount,
      required this.averageRating,
      this.userCanReviewCar,
      required this.distributor,
      required this.category});

  factory _$_Product.fromJson(Map<String, dynamic> json) =>
      _$$_ProductFromJson(json);

  @override
  final int id;
  @override
  final String name;
  @override
  final String photoUrl;
  @override
  final String description;
  @override
  final int price;
  @override
  final int number;
  @override
  final int model;
  @override
  final int quantity;
  @override
  final int warranty;
  @override
  final int reviewCount;
  @override
  final String averageRating;
  @override
  final bool? userCanReviewCar;
  @override
  final Map<String, dynamic> distributor;
  @override
  final Map<String, dynamic> category;

  @override
  String toString() {
    return 'Product(id: $id, name: $name, photoUrl: $photoUrl, description: $description, price: $price, number: $number, model: $model, quantity: $quantity, warranty: $warranty, reviewCount: $reviewCount, averageRating: $averageRating, userCanReviewCar: $userCanReviewCar, distributor: $distributor, category: $category)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _Product &&
            const DeepCollectionEquality().equals(other.id, id) &&
            const DeepCollectionEquality().equals(other.name, name) &&
            const DeepCollectionEquality().equals(other.photoUrl, photoUrl) &&
            const DeepCollectionEquality()
                .equals(other.description, description) &&
            const DeepCollectionEquality().equals(other.price, price) &&
            const DeepCollectionEquality().equals(other.number, number) &&
            const DeepCollectionEquality().equals(other.model, model) &&
            const DeepCollectionEquality().equals(other.quantity, quantity) &&
            const DeepCollectionEquality().equals(other.warranty, warranty) &&
            const DeepCollectionEquality()
                .equals(other.reviewCount, reviewCount) &&
            const DeepCollectionEquality()
                .equals(other.averageRating, averageRating) &&
            const DeepCollectionEquality()
                .equals(other.userCanReviewCar, userCanReviewCar) &&
            const DeepCollectionEquality()
                .equals(other.distributor, distributor) &&
            const DeepCollectionEquality().equals(other.category, category));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(id),
      const DeepCollectionEquality().hash(name),
      const DeepCollectionEquality().hash(photoUrl),
      const DeepCollectionEquality().hash(description),
      const DeepCollectionEquality().hash(price),
      const DeepCollectionEquality().hash(number),
      const DeepCollectionEquality().hash(model),
      const DeepCollectionEquality().hash(quantity),
      const DeepCollectionEquality().hash(warranty),
      const DeepCollectionEquality().hash(reviewCount),
      const DeepCollectionEquality().hash(averageRating),
      const DeepCollectionEquality().hash(userCanReviewCar),
      const DeepCollectionEquality().hash(distributor),
      const DeepCollectionEquality().hash(category));

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
      {required int id,
      required String name,
      required String photoUrl,
      required String description,
      required int price,
      required int number,
      required int model,
      required int quantity,
      required int warranty,
      required int reviewCount,
      required String averageRating,
      bool? userCanReviewCar,
      required Map<String, dynamic> distributor,
      required Map<String, dynamic> category}) = _$_Product;

  factory _Product.fromJson(Map<String, dynamic> json) = _$_Product.fromJson;

  @override
  int get id;
  @override
  String get name;
  @override
  String get photoUrl;
  @override
  String get description;
  @override
  int get price;
  @override
  int get number;
  @override
  int get model;
  @override
  int get quantity;
  @override
  int get warranty;
  @override
  int get reviewCount;
  @override
  String get averageRating;
  @override
  bool? get userCanReviewCar;
  @override
  Map<String, dynamic> get distributor;
  @override
  Map<String, dynamic> get category;
  @override
  @JsonKey(ignore: true)
  _$ProductCopyWith<_Product> get copyWith =>
      throw _privateConstructorUsedError;
}
