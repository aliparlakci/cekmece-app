import 'package:freezed_annotation/freezed_annotation.dart';

part 'Product.freezed.dart';
part 'Product.g.dart';

@freezed
class Product with _$Product {
  const factory Product({
    required int id,
    required String name,
    required int price,
    required int number,
    required int model,
    required int quantity,
    required int warranty,
    required dynamic distributor,
    required List<String> categories,
  }) = _Product;

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
}
/*
    required String review_count,
    required double rating,
*/