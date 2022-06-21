import 'package:cekmece_mobile/views/productsView/sortAndFilterOptions.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:multi_select_flutter/chip_field/multi_select_chip_field.dart';
import 'package:multi_select_flutter/util/multi_select_item.dart';

import '../../constants/font_constants.dart';

class FilterProductsView extends StatefulWidget {
  const FilterProductsView(
      {Key? key,
      required this.categories,
      this.appliedFilterOptions,
      required this.applyFilter,
      required this.resetFilter})
      : super(key: key);

  final Set<String> categories;
  final FilterOptions? appliedFilterOptions;
  final void Function(FilterOptions) applyFilter;
  final void Function() resetFilter;

  @override
  State<FilterProductsView> createState() => _FilterProductsViewState();
}

class _FilterProductsViewState extends State<FilterProductsView> {
  final _formKey = GlobalKey<FormState>();
  late FilterOptions filterOptions;

  final List<bool> _popularitySelections = List.generate(2, (_) => false);
  final List<bool> _priceSelections = List.generate(2, (_) => false);
  final List<bool> _modelSelections = List.generate(2, (_) => false);

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    if (widget.appliedFilterOptions != null) {
      filterOptions = widget.appliedFilterOptions!;

      if (filterOptions.sortOption == SortOptions.PRICE_ASC) {
        _priceSelections[0] = true;
      }
      else if (filterOptions.sortOption == SortOptions.PRICE_DESC) {
        _priceSelections[1] = true;
      }
      else if (filterOptions.sortOption == SortOptions.MODEL_ASC) {
        _modelSelections[0] = true;
      }
      else if (filterOptions.sortOption == SortOptions.MODEL_DESC) {
        _modelSelections[1] = true;
      }
      else if (filterOptions.sortOption == SortOptions.POP_ASC) {
        _popularitySelections[0] = true;
      }
      else if (filterOptions.sortOption == SortOptions.POP_DESC) {
        _popularitySelections[1] = true;
      }
    } else {
      filterOptions =
          FilterOptions(selectedCategories: widget.categories.toList());
    }
  }

  buildChoiceChips() {
    List<Widget> choiceChips = [];
    for (String category in widget.categories) {
      choiceChips.add(ChoiceChip(
          pressElevation: 0,
          label: Text(category),
          labelStyle: filterOptions.selectedCategories.contains(category)
              ? filterProductsSelectedCategoryChipTextStyle
              : filterProductsUnselectedCategoryChipTextStyle,
          backgroundColor: Colors.white,
          selectedColor: const Color(0xFFCA51FF),
          shape: StadiumBorder(
            side: BorderSide(
              width: 1,
              color: filterOptions.selectedCategories.contains(category)
                  ? Colors.transparent
                  : const Color(0xFFD4D4D4),
            ),
          ),
          selected: filterOptions.selectedCategories.contains(category),
          onSelected: (selected) {
            setState(() {
              filterOptions.selectedCategories.contains(category)
                  ? filterOptions.selectedCategories.remove(category)
                  : filterOptions.selectedCategories.add(category);
            });
          }));
    }
    return choiceChips;
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScopeNode currentFocus = FocusScope.of(context);
        if (!currentFocus.hasPrimaryFocus) {
          currentFocus.unfocus();
        }
      },
      child: Scaffold(
        appBar: AppBar(
            title: const Text("Sort & Filter"),
            leading: IconButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                icon: const Icon(CupertinoIcons.xmark))),
        body: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Popularity", style: filterProductsTitlesTextStyle),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text("Sort by", style: filterProductsOptionsTextStyle),
                      Container(
                        height: 40,
                        padding: EdgeInsets.zero,
                        decoration: const BoxDecoration(
                          color: Color(0xFFF3F3F3),
                          borderRadius: BorderRadius.all(Radius.circular(5.0)),
                        ),
                        child: ToggleButtons(
                          borderRadius: BorderRadius.circular(5),
                          fillColor: Colors.white,
                          selectedColor: Colors.black,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                children: [
                                  Text(
                                    "Ascending",
                                    style: !_popularitySelections[0]
                                        ? filterProductsOptionsTextStyle
                                        : filterProductsOptionsSelectedTextStyle,
                                  ),
                                  const SizedBox(width: 5),
                                  !_popularitySelections[0]
                                      ? const Icon(
                                      CupertinoIcons.sort_up_circle)
                                      : const Icon(
                                      CupertinoIcons.sort_up_circle_fill),
                                ],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                children: [
                                  Text(
                                    "Descending",
                                    style: !_popularitySelections[1]
                                        ? filterProductsOptionsTextStyle
                                        : filterProductsOptionsSelectedTextStyle,
                                  ),
                                  const SizedBox(width: 5),
                                  !_popularitySelections[1]
                                      ? const Icon(
                                      CupertinoIcons.sort_down_circle)
                                      : const Icon(
                                      CupertinoIcons.sort_down_circle_fill),
                                ],
                              ),
                            ),
                          ],
                          isSelected: _popularitySelections,
                          onPressed: (int index) {
                            setState(() {
                              if (index == 0) {
                                filterOptions.sortOption =
                                _popularitySelections[index] == false
                                    ? SortOptions.POP_ASC
                                    : null;
                                _popularitySelections[0] = !_popularitySelections[0];
                                _popularitySelections[1] = false;
                              } else {
                                filterOptions.sortOption =
                                _popularitySelections[index] == false
                                    ? SortOptions.POP_DESC
                                    : null;
                                _popularitySelections[1] = !_popularitySelections[1];
                                _popularitySelections[0] = false;
                              }

                              for (int i = 0;
                              i < _modelSelections.length;
                              i++) {
                                _modelSelections[i] = false;
                              }

                              for (int i = 0;
                              i < _priceSelections.length;
                              i++) {
                                _priceSelections[i] = false;
                              }
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 8.0),
                    child: Divider(thickness: 1),
                  ),
                  Text("Price", style: filterProductsTitlesTextStyle),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text("Sort by", style: filterProductsOptionsTextStyle),
                      Container(
                        height: 40,
                        padding: EdgeInsets.zero,
                        decoration: const BoxDecoration(
                          color: Color(0xFFF3F3F3),
                          borderRadius: BorderRadius.all(Radius.circular(5.0)),
                        ),
                        child: ToggleButtons(
                          borderRadius: BorderRadius.circular(5),
                          fillColor: Colors.white,
                          selectedColor: Colors.black,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                children: [
                                  Text(
                                    "Ascending",
                                    style: !_priceSelections[0]
                                        ? filterProductsOptionsTextStyle
                                        : filterProductsOptionsSelectedTextStyle,
                                  ),
                                  const SizedBox(width: 5),
                                  !_priceSelections[0]
                                      ? const Icon(
                                          CupertinoIcons.sort_up_circle)
                                      : const Icon(
                                          CupertinoIcons.sort_up_circle_fill),
                                ],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                children: [
                                  Text(
                                    "Descending",
                                    style: !_priceSelections[1]
                                        ? filterProductsOptionsTextStyle
                                        : filterProductsOptionsSelectedTextStyle,
                                  ),
                                  const SizedBox(width: 5),
                                  !_priceSelections[1]
                                      ? const Icon(
                                          CupertinoIcons.sort_down_circle)
                                      : const Icon(
                                          CupertinoIcons.sort_down_circle_fill),
                                ],
                              ),
                            ),
                          ],
                          isSelected: _priceSelections,
                          onPressed: (int index) {
                            setState(() {
                              if (index == 0) {
                                filterOptions.sortOption =
                                    _priceSelections[index] == false
                                        ? SortOptions.PRICE_ASC
                                        : null;
                                _priceSelections[0] = !_priceSelections[0];
                                _priceSelections[1] = false;
                              } else {
                                filterOptions.sortOption =
                                    _priceSelections[index] == false
                                        ? SortOptions.PRICE_DESC
                                        : null;
                                _priceSelections[1] = !_priceSelections[1];
                                _priceSelections[0] = false;
                              }

                              for (int i = 0;
                                  i < _modelSelections.length;
                                  i++) {
                                _modelSelections[i] = false;
                              }

                              for (int i = 0;
                              i < _popularitySelections.length;
                              i++) {
                                _popularitySelections[i] = false;
                              }
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(
                          child: TextFormField(
                            initialValue: "${filterOptions.minPrice ?? ""}",
                        onChanged: (value) {
                          setState(() {
                            try {
                              filterOptions.minPrice = int.parse(value.trim());
                            } catch (e) {
                              filterOptions.minPrice = null;
                            }
                          });
                        },
                        validator: (value) {
                          String toValidate = value!.trim();
                          if (toValidate.isNotEmpty) {
                            if (filterOptions.maxPrice != null &&
                                int.parse(toValidate) >
                                    filterOptions.maxPrice!) {
                              return "Min price must be smaller than or equal to max price.";
                            }
                          }

                          return null;
                        },
                        decoration: InputDecoration(
                          label: const Text("Min"),
                          floatingLabelStyle: filterProductsOptionsTextStyle,
                          floatingLabelBehavior: FloatingLabelBehavior.never,
                          enabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          focusedBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          disabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          errorMaxLines: 3,
                          errorStyle: filterProductsOptionsErrorTextStyle,
                          errorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(5)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          focusedErrorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(5)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          fillColor: const Color(0xFFF6F6F6),
                          filled: true,
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 10),
                          isCollapsed:
                              true, // FOR CENTERING THE TEXT INSIDE TEXT FORM FIELD
                        ),
                        keyboardType: const TextInputType.numberWithOptions(
                            signed: false, decimal: false),
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly
                        ],
                        style: filterProductsOptionsTextStyle,
                      )),
                      Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 10),
                          child:
                              Text("-", style: filterProductsOptionsTextStyle)),
                      Expanded(
                          child: TextFormField(
                            initialValue: "${filterOptions.maxPrice ?? ""}",
                            onChanged: (value) {
                          setState(() {
                            try {
                              filterOptions.maxPrice = int.parse(value.trim());
                            } catch (e) {
                              filterOptions.maxPrice = null;
                            }
                          });
                        },
                        validator: (value) {
                          String toValidate = value!.trim();
                          if (toValidate.isNotEmpty) {
                            if (filterOptions.minPrice != null &&
                                filterOptions.minPrice! >
                                    int.parse(toValidate)) {
                              return "Max price must be greater than or equal to min price.";
                            }
                          }

                          return null;
                        },
                        decoration: InputDecoration(
                          label: const Text("Max"),
                          floatingLabelStyle: filterProductsOptionsTextStyle,
                          floatingLabelBehavior: FloatingLabelBehavior.never,
                          enabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          focusedBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          disabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          errorMaxLines: 3,
                          errorStyle: filterProductsOptionsErrorTextStyle,
                          errorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(5)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          focusedErrorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(5)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          fillColor: const Color(0xFFF6F6F6),
                          filled: true,
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 10),
                          isCollapsed:
                              true, // FOR CENTERING THE TEXT INSIDE TEXT FORM FIELD
                        ),
                        keyboardType: const TextInputType.numberWithOptions(
                            signed: false, decimal: false),
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly
                        ],
                        style: filterProductsOptionsTextStyle,
                      )),
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 8.0),
                    child: Divider(thickness: 1),
                  ),
                  Text("Model", style: filterProductsTitlesTextStyle),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text("Sort by", style: filterProductsOptionsTextStyle),
                      Container(
                        height: 40,
                        padding: EdgeInsets.zero,
                        decoration: const BoxDecoration(
                          color: Color(0xFFF3F3F3),
                          borderRadius: BorderRadius.all(Radius.circular(5.0)),
                        ),
                        child: ToggleButtons(
                          borderRadius: BorderRadius.circular(5),
                          fillColor: Colors.white,
                          selectedColor: Colors.black,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                children: [
                                  Text(
                                    "Ascending",
                                    style: !_modelSelections[0]
                                        ? filterProductsOptionsTextStyle
                                        : filterProductsOptionsSelectedTextStyle,
                                  ),
                                  const SizedBox(width: 5),
                                  !_modelSelections[0]
                                      ? const Icon(
                                          CupertinoIcons.sort_up_circle)
                                      : const Icon(
                                          CupertinoIcons.sort_up_circle_fill),
                                ],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                children: [
                                  Text(
                                    "Descending",
                                    style: !_modelSelections[1]
                                        ? filterProductsOptionsTextStyle
                                        : filterProductsOptionsSelectedTextStyle,
                                  ),
                                  const SizedBox(width: 5),
                                  !_modelSelections[1]
                                      ? const Icon(
                                          CupertinoIcons.sort_down_circle)
                                      : const Icon(
                                          CupertinoIcons.sort_down_circle_fill),
                                ],
                              ),
                            ),
                          ],
                          isSelected: _modelSelections,
                          onPressed: (int index) {
                            setState(() {
                              if (index == 0) {
                                filterOptions.sortOption =
                                    _modelSelections[index] == false
                                        ? SortOptions.MODEL_ASC
                                        : null;
                                _modelSelections[0] = !_modelSelections[0];
                                _modelSelections[1] = false;
                              } else {
                                filterOptions.sortOption =
                                    _modelSelections[index] == false
                                        ? SortOptions.MODEL_DESC
                                        : null;
                                _modelSelections[1] = !_modelSelections[1];
                                _modelSelections[0] = false;
                              }

                              for (int i = 0;
                                  i < _priceSelections.length;
                                  i++) {
                                _priceSelections[i] = false;
                              }

                              for (int i = 0;
                              i < _popularitySelections.length;
                              i++) {
                                _popularitySelections[i] = false;
                              }
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(
                          child: TextFormField(
                            initialValue: "${filterOptions.minModel ?? ""}",
                            onChanged: (value) {
                          setState(() {
                            try {
                              filterOptions.minModel = int.parse(value.trim());
                            } catch (e) {
                              filterOptions.minModel = null;
                            }
                          });
                        },
                        validator: (value) {
                          String toValidate = value!.trim();
                          if (toValidate.isNotEmpty) {
                            if (filterOptions.maxModel != null &&
                                int.parse(toValidate) >
                                    filterOptions.maxModel!) {
                              return "Min model must be smaller than or equal to max model.";
                            }
                          }

                          return null;
                        },
                        decoration: InputDecoration(
                          label: const Text("Min"),
                          floatingLabelStyle: filterProductsOptionsTextStyle,
                          floatingLabelBehavior: FloatingLabelBehavior.never,
                          enabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          focusedBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          disabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          errorMaxLines: 3,
                          errorStyle: filterProductsOptionsErrorTextStyle,
                          errorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(5)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          focusedErrorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(5)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          fillColor: const Color(0xFFF6F6F6),
                          filled: true,
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 10),
                          isCollapsed:
                              true, // FOR CENTERING THE TEXT INSIDE TEXT FORM FIELD
                        ),
                        keyboardType: const TextInputType.numberWithOptions(
                            signed: false, decimal: false),
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly
                        ],
                        style: filterProductsOptionsTextStyle,
                      )),
                      Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 10),
                          child:
                              Text("-", style: filterProductsOptionsTextStyle)),
                      Expanded(
                          child: TextFormField(
                            initialValue: "${filterOptions.maxModel ?? ""}",
                            onChanged: (value) {
                          setState(() {
                            try {
                              filterOptions.maxModel = int.parse(value.trim());
                            } catch (e) {
                              filterOptions.maxModel = null;
                            }
                          });
                        },
                        validator: (value) {
                          String toValidate = value!.trim();
                          if (toValidate.isNotEmpty) {
                            if (filterOptions.minModel != null &&
                                filterOptions.minModel! >
                                    int.parse(toValidate)) {
                              return "Max model must be greater than or equal to min model.";
                            }
                          }

                          return null;
                        },
                        decoration: InputDecoration(
                          label: const Text("Max"),
                          floatingLabelStyle: filterProductsOptionsTextStyle,
                          floatingLabelBehavior: FloatingLabelBehavior.never,
                          enabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          focusedBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          disabledBorder: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(5)),
                              borderSide: BorderSide(
                                color: Color(0xFFE0E0E0),
                              )),
                          errorMaxLines: 3,
                          errorStyle: filterProductsOptionsErrorTextStyle,
                          errorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(5)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          focusedErrorBorder: const OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(5)),
                            borderSide: BorderSide(
                              color: Colors.red,
                            ),
                          ),
                          fillColor: const Color(0xFFF6F6F6),
                          filled: true,
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 10),
                          isCollapsed:
                              true, // FOR CENTERING THE TEXT INSIDE TEXT FORM FIELD
                        ),
                        keyboardType: const TextInputType.numberWithOptions(
                            signed: false, decimal: false),
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly
                        ],
                        style: filterProductsOptionsTextStyle,
                      )),
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 8.0),
                    child: Divider(thickness: 1),
                  ),
                  Text("Categories", style: filterProductsTitlesTextStyle),
                  SizedBox(height: 6),
                  Wrap(
                    spacing: 4,
                    runSpacing: -8,
                    children: buildChoiceChips(),
                  ),
                ],
              ),
            ),
          ),
        ),
        bottomNavigationBar: Row(
          children: [
            if (!filterOptions.isNoFilterApplied(categories: widget.categories))
              Expanded(
                child: Container(
                  color: Colors.white,
                  height: MediaQuery.of(context).size.height / 12.5,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(5, 5, 0, 5),
                    child: TextButton(
                      onPressed: () {
                        setState(() {
                          widget.resetFilter();
                          filterOptions = FilterOptions(selectedCategories: widget.categories.toList());
                          for(int i = 0; i < _priceSelections.length; i++) {
                            _priceSelections[i] = false;
                          }
                          for(int i = 0; i < _modelSelections.length; i++) {
                            _modelSelections[i] = false;
                          }
                          for(int i = 0; i < _popularitySelections.length; i++) {
                            _popularitySelections[i] = false;
                          }
                        });
                      },
                      style: ButtonStyle(
                        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        backgroundColor:
                            MaterialStateProperty.resolveWith<Color>((states) {
                          if (states.contains(MaterialState.disabled)) {
                            return const Color(0xFF515151); // Disabled color
                          }
                          return Color(0xFF5A5A5A); // Regular color
                        }),
                        shape: MaterialStateProperty.resolveWith<
                            RoundedRectangleBorder>((states) {
                          return const RoundedRectangleBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(0)));
                        }),
                      ),
                      child: Text("RESET FILTERS",
                          style: bottomBarBlackButtonTextStyle),
                    ),
                  ),
                ),
              ),
            Expanded(
              child: Container(
                color: Colors.white,
                height: MediaQuery.of(context).size.height / 12.5,
                child: Padding(
                  padding: const EdgeInsets.all(5),
                  child: TextButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        // All Good
                        _formKey.currentState!.save();
                        print(filterOptions);
                        if (!filterOptions.isNoFilterApplied(categories: widget.categories)) {
                          widget.applyFilter(filterOptions);
                        }
                        Navigator.of(context).pop();
                      }
                    },
                    style: ButtonStyle(
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                      backgroundColor:
                          MaterialStateProperty.resolveWith<Color>((states) {
                        if (states.contains(MaterialState.disabled)) {
                          return const Color(0xFF515151); // Disabled color
                        }
                        return Colors.black; // Regular color
                      }),
                      shape: MaterialStateProperty.resolveWith<
                          RoundedRectangleBorder>((states) {
                        return const RoundedRectangleBorder(
                            borderRadius: BorderRadius.all(Radius.circular(0)));
                      }),
                    ),
                    child: Text("SEE RESULTS",
                        style: bottomBarBlackButtonTextStyle),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
