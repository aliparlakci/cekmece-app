import 'package:freezed_annotation/freezed_annotation.dart';

part 'Product.freezed.dart';
part 'Product.g.dart';

@freezed
class Product with _$Product {
  const factory Product({
    required String id,
    required List<String> images,
    required double rating,
    required bool isFavourite,
    required bool isPopular,
    required String title,
    required int price,
    required String description,
  }) = _Product;

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
}
