// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'UserClass.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

UserClass _$UserClassFromJson(Map<String, dynamic> json) {
  return _UserClass.fromJson(json);
}

/// @nodoc
class _$UserClassTearOff {
  const _$UserClassTearOff();

  _UserClass call(
      {String? displayName,
      required bool isAnonymous,
      required String uid,
      List<String>? cart,
      String? email,
      String? photoUrl}) {
    return _UserClass(
      displayName: displayName,
      isAnonymous: isAnonymous,
      uid: uid,
      cart: cart,
      email: email,
      photoUrl: photoUrl,
    );
  }

  UserClass fromJson(Map<String, Object?> json) {
    return UserClass.fromJson(json);
  }
}

/// @nodoc
const $UserClass = _$UserClassTearOff();

/// @nodoc
mixin _$UserClass {
  String? get displayName => throw _privateConstructorUsedError;
  bool get isAnonymous => throw _privateConstructorUsedError;
  String get uid => throw _privateConstructorUsedError;
  List<String>? get cart => throw _privateConstructorUsedError;
  String? get email => throw _privateConstructorUsedError;
  String? get photoUrl => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UserClassCopyWith<UserClass> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UserClassCopyWith<$Res> {
  factory $UserClassCopyWith(UserClass value, $Res Function(UserClass) then) =
      _$UserClassCopyWithImpl<$Res>;
  $Res call(
      {String? displayName,
      bool isAnonymous,
      String uid,
      List<String>? cart,
      String? email,
      String? photoUrl});
}

/// @nodoc
class _$UserClassCopyWithImpl<$Res> implements $UserClassCopyWith<$Res> {
  _$UserClassCopyWithImpl(this._value, this._then);

  final UserClass _value;
  // ignore: unused_field
  final $Res Function(UserClass) _then;

  @override
  $Res call({
    Object? displayName = freezed,
    Object? isAnonymous = freezed,
    Object? uid = freezed,
    Object? cart = freezed,
    Object? email = freezed,
    Object? photoUrl = freezed,
  }) {
    return _then(_value.copyWith(
      displayName: displayName == freezed
          ? _value.displayName
          : displayName // ignore: cast_nullable_to_non_nullable
              as String?,
      isAnonymous: isAnonymous == freezed
          ? _value.isAnonymous
          : isAnonymous // ignore: cast_nullable_to_non_nullable
              as bool,
      uid: uid == freezed
          ? _value.uid
          : uid // ignore: cast_nullable_to_non_nullable
              as String,
      cart: cart == freezed
          ? _value.cart
          : cart // ignore: cast_nullable_to_non_nullable
              as List<String>?,
      email: email == freezed
          ? _value.email
          : email // ignore: cast_nullable_to_non_nullable
              as String?,
      photoUrl: photoUrl == freezed
          ? _value.photoUrl
          : photoUrl // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
abstract class _$UserClassCopyWith<$Res> implements $UserClassCopyWith<$Res> {
  factory _$UserClassCopyWith(
          _UserClass value, $Res Function(_UserClass) then) =
      __$UserClassCopyWithImpl<$Res>;
  @override
  $Res call(
      {String? displayName,
      bool isAnonymous,
      String uid,
      List<String>? cart,
      String? email,
      String? photoUrl});
}

/// @nodoc
class __$UserClassCopyWithImpl<$Res> extends _$UserClassCopyWithImpl<$Res>
    implements _$UserClassCopyWith<$Res> {
  __$UserClassCopyWithImpl(_UserClass _value, $Res Function(_UserClass) _then)
      : super(_value, (v) => _then(v as _UserClass));

  @override
  _UserClass get _value => super._value as _UserClass;

  @override
  $Res call({
    Object? displayName = freezed,
    Object? isAnonymous = freezed,
    Object? uid = freezed,
    Object? cart = freezed,
    Object? email = freezed,
    Object? photoUrl = freezed,
  }) {
    return _then(_UserClass(
      displayName: displayName == freezed
          ? _value.displayName
          : displayName // ignore: cast_nullable_to_non_nullable
              as String?,
      isAnonymous: isAnonymous == freezed
          ? _value.isAnonymous
          : isAnonymous // ignore: cast_nullable_to_non_nullable
              as bool,
      uid: uid == freezed
          ? _value.uid
          : uid // ignore: cast_nullable_to_non_nullable
              as String,
      cart: cart == freezed
          ? _value.cart
          : cart // ignore: cast_nullable_to_non_nullable
              as List<String>?,
      email: email == freezed
          ? _value.email
          : email // ignore: cast_nullable_to_non_nullable
              as String?,
      photoUrl: photoUrl == freezed
          ? _value.photoUrl
          : photoUrl // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_UserClass implements _UserClass {
  const _$_UserClass(
      {this.displayName,
      required this.isAnonymous,
      required this.uid,
      this.cart,
      this.email,
      this.photoUrl});

  factory _$_UserClass.fromJson(Map<String, dynamic> json) =>
      _$$_UserClassFromJson(json);

  @override
  final String? displayName;
  @override
  final bool isAnonymous;
  @override
  final String uid;
  @override
  final List<String>? cart;
  @override
  final String? email;
  @override
  final String? photoUrl;

  @override
  String toString() {
    return 'UserClass(displayName: $displayName, isAnonymous: $isAnonymous, uid: $uid, cart: $cart, email: $email, photoUrl: $photoUrl)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _UserClass &&
            const DeepCollectionEquality()
                .equals(other.displayName, displayName) &&
            const DeepCollectionEquality()
                .equals(other.isAnonymous, isAnonymous) &&
            const DeepCollectionEquality().equals(other.uid, uid) &&
            const DeepCollectionEquality().equals(other.cart, cart) &&
            const DeepCollectionEquality().equals(other.email, email) &&
            const DeepCollectionEquality().equals(other.photoUrl, photoUrl));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(displayName),
      const DeepCollectionEquality().hash(isAnonymous),
      const DeepCollectionEquality().hash(uid),
      const DeepCollectionEquality().hash(cart),
      const DeepCollectionEquality().hash(email),
      const DeepCollectionEquality().hash(photoUrl));

  @JsonKey(ignore: true)
  @override
  _$UserClassCopyWith<_UserClass> get copyWith =>
      __$UserClassCopyWithImpl<_UserClass>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_UserClassToJson(this);
  }
}

abstract class _UserClass implements UserClass {
  const factory _UserClass(
      {String? displayName,
      required bool isAnonymous,
      required String uid,
      List<String>? cart,
      String? email,
      String? photoUrl}) = _$_UserClass;

  factory _UserClass.fromJson(Map<String, dynamic> json) =
      _$_UserClass.fromJson;

  @override
  String? get displayName;
  @override
  bool get isAnonymous;
  @override
  String get uid;
  @override
  List<String>? get cart;
  @override
  String? get email;
  @override
  String? get photoUrl;
  @override
  @JsonKey(ignore: true)
  _$UserClassCopyWith<_UserClass> get copyWith =>
      throw _privateConstructorUsedError;
}
