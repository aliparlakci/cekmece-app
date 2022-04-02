// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'ReviewClass.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

ReviewClass _$ReviewClassFromJson(Map<String, dynamic> json) {
  return _ReviewClass.fromJson(json);
}

/// @nodoc
class _$ReviewClassTearOff {
  const _$ReviewClassTearOff();

  _ReviewClass call(
      {required int id,
      required int rating,
      String? comment,
      required DateTime createdDate,
      required bool isApproved,
      required Map<dynamic, dynamic> user}) {
    return _ReviewClass(
      id: id,
      rating: rating,
      comment: comment,
      createdDate: createdDate,
      isApproved: isApproved,
      user: user,
    );
  }

  ReviewClass fromJson(Map<String, Object?> json) {
    return ReviewClass.fromJson(json);
  }
}

/// @nodoc
const $ReviewClass = _$ReviewClassTearOff();

/// @nodoc
mixin _$ReviewClass {
  int get id => throw _privateConstructorUsedError;
  int get rating => throw _privateConstructorUsedError;
  String? get comment => throw _privateConstructorUsedError;
  DateTime get createdDate => throw _privateConstructorUsedError;
  bool get isApproved => throw _privateConstructorUsedError;
  Map<dynamic, dynamic> get user => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ReviewClassCopyWith<ReviewClass> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ReviewClassCopyWith<$Res> {
  factory $ReviewClassCopyWith(
          ReviewClass value, $Res Function(ReviewClass) then) =
      _$ReviewClassCopyWithImpl<$Res>;
  $Res call(
      {int id,
      int rating,
      String? comment,
      DateTime createdDate,
      bool isApproved,
      Map<dynamic, dynamic> user});
}

/// @nodoc
class _$ReviewClassCopyWithImpl<$Res> implements $ReviewClassCopyWith<$Res> {
  _$ReviewClassCopyWithImpl(this._value, this._then);

  final ReviewClass _value;
  // ignore: unused_field
  final $Res Function(ReviewClass) _then;

  @override
  $Res call({
    Object? id = freezed,
    Object? rating = freezed,
    Object? comment = freezed,
    Object? createdDate = freezed,
    Object? isApproved = freezed,
    Object? user = freezed,
  }) {
    return _then(_value.copyWith(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      rating: rating == freezed
          ? _value.rating
          : rating // ignore: cast_nullable_to_non_nullable
              as int,
      comment: comment == freezed
          ? _value.comment
          : comment // ignore: cast_nullable_to_non_nullable
              as String?,
      createdDate: createdDate == freezed
          ? _value.createdDate
          : createdDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      isApproved: isApproved == freezed
          ? _value.isApproved
          : isApproved // ignore: cast_nullable_to_non_nullable
              as bool,
      user: user == freezed
          ? _value.user
          : user // ignore: cast_nullable_to_non_nullable
              as Map<dynamic, dynamic>,
    ));
  }
}

/// @nodoc
abstract class _$ReviewClassCopyWith<$Res>
    implements $ReviewClassCopyWith<$Res> {
  factory _$ReviewClassCopyWith(
          _ReviewClass value, $Res Function(_ReviewClass) then) =
      __$ReviewClassCopyWithImpl<$Res>;
  @override
  $Res call(
      {int id,
      int rating,
      String? comment,
      DateTime createdDate,
      bool isApproved,
      Map<dynamic, dynamic> user});
}

/// @nodoc
class __$ReviewClassCopyWithImpl<$Res> extends _$ReviewClassCopyWithImpl<$Res>
    implements _$ReviewClassCopyWith<$Res> {
  __$ReviewClassCopyWithImpl(
      _ReviewClass _value, $Res Function(_ReviewClass) _then)
      : super(_value, (v) => _then(v as _ReviewClass));

  @override
  _ReviewClass get _value => super._value as _ReviewClass;

  @override
  $Res call({
    Object? id = freezed,
    Object? rating = freezed,
    Object? comment = freezed,
    Object? createdDate = freezed,
    Object? isApproved = freezed,
    Object? user = freezed,
  }) {
    return _then(_ReviewClass(
      id: id == freezed
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      rating: rating == freezed
          ? _value.rating
          : rating // ignore: cast_nullable_to_non_nullable
              as int,
      comment: comment == freezed
          ? _value.comment
          : comment // ignore: cast_nullable_to_non_nullable
              as String?,
      createdDate: createdDate == freezed
          ? _value.createdDate
          : createdDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      isApproved: isApproved == freezed
          ? _value.isApproved
          : isApproved // ignore: cast_nullable_to_non_nullable
              as bool,
      user: user == freezed
          ? _value.user
          : user // ignore: cast_nullable_to_non_nullable
              as Map<dynamic, dynamic>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_ReviewClass implements _ReviewClass {
  const _$_ReviewClass(
      {required this.id,
      required this.rating,
      this.comment,
      required this.createdDate,
      required this.isApproved,
      required this.user});

  factory _$_ReviewClass.fromJson(Map<String, dynamic> json) =>
      _$$_ReviewClassFromJson(json);

  @override
  final int id;
  @override
  final int rating;
  @override
  final String? comment;
  @override
  final DateTime createdDate;
  @override
  final bool isApproved;
  @override
  final Map<dynamic, dynamic> user;

  @override
  String toString() {
    return 'ReviewClass(id: $id, rating: $rating, comment: $comment, createdDate: $createdDate, isApproved: $isApproved, user: $user)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _ReviewClass &&
            const DeepCollectionEquality().equals(other.id, id) &&
            const DeepCollectionEquality().equals(other.rating, rating) &&
            const DeepCollectionEquality().equals(other.comment, comment) &&
            const DeepCollectionEquality()
                .equals(other.createdDate, createdDate) &&
            const DeepCollectionEquality()
                .equals(other.isApproved, isApproved) &&
            const DeepCollectionEquality().equals(other.user, user));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(id),
      const DeepCollectionEquality().hash(rating),
      const DeepCollectionEquality().hash(comment),
      const DeepCollectionEquality().hash(createdDate),
      const DeepCollectionEquality().hash(isApproved),
      const DeepCollectionEquality().hash(user));

  @JsonKey(ignore: true)
  @override
  _$ReviewClassCopyWith<_ReviewClass> get copyWith =>
      __$ReviewClassCopyWithImpl<_ReviewClass>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_ReviewClassToJson(this);
  }
}

abstract class _ReviewClass implements ReviewClass {
  const factory _ReviewClass(
      {required int id,
      required int rating,
      String? comment,
      required DateTime createdDate,
      required bool isApproved,
      required Map<dynamic, dynamic> user}) = _$_ReviewClass;

  factory _ReviewClass.fromJson(Map<String, dynamic> json) =
      _$_ReviewClass.fromJson;

  @override
  int get id;
  @override
  int get rating;
  @override
  String? get comment;
  @override
  DateTime get createdDate;
  @override
  bool get isApproved;
  @override
  Map<dynamic, dynamic> get user;
  @override
  @JsonKey(ignore: true)
  _$ReviewClassCopyWith<_ReviewClass> get copyWith =>
      throw _privateConstructorUsedError;
}
