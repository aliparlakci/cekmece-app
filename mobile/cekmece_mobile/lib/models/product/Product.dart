import 'package:freezed_annotation/freezed_annotation.dart';

part 'Product.freezed.dart';
part 'Product.g.dart';

@freezed
class Product with _$Product {
  const factory Product({
    required int id,
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
    required Map<String, dynamic> category,
  }) = _Product;

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
}
/*
    required String review_count,
    required double rating,
*/