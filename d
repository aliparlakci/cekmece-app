[33mcommit 6f895b4dc3d4667a64af128c24e8231e383ec076[m[33m ([m[1;36mHEAD -> [m[1;32m58-add-to-cart-mobile[m[33m, [m[1;31morigin/58-add-to-cart-mobile[m[33m)[m
Merge: b44afbb 3155474
Author: Ahmet Ömer Kayabaşı <69629296+amedumer@users.noreply.github.com>
Date:   Fri Apr 8 17:57:43 2022 +0300

    Merge remote-tracking branch 'remotes/origin/master' into HEAD

[1mdiff --cc mobile/cekmece_mobile/lib/views/search/views/manualSearch.dart[m
[1mindex 5b9abe7,6b121da..fcbccee[m
[1m--- a/mobile/cekmece_mobile/lib/views/search/views/manualSearch.dart[m
[1m+++ b/mobile/cekmece_mobile/lib/views/search/views/manualSearch.dart[m
[36m@@@ -34,8 -34,8 +34,7 @@@[m [mclass _ManualSearchState extends State<[m
      BlocProvider.of<LoadingBloc>(context)[m
          .add(LoadingStart(loadingReason: "Car fetch"));[m
      try {[m
[31m--      final response =[m
[31m-           await http.get(Uri.parse('http://${localIPAddress}:5000/api/cars/'));[m
[31m -          await http.get(Uri.parse('$clientURL/cars/'));[m
[32m++      final response = await http.get(Uri.parse('$clientURL/api/cars/'));[m
  [m
        if (response.statusCode == 200) {[m
          for (Map<String, dynamic> carData in jsonDecode(response.body)) {[m
[1mdiff --cc mobile/cekmece_mobile/lib/views/search/views/searchBot.dart[m
[1mindex 5c106a6,de3b115..3d887bd[m
[1m--- a/mobile/cekmece_mobile/lib/views/search/views/searchBot.dart[m
[1m+++ b/mobile/cekmece_mobile/lib/views/search/views/searchBot.dart[m
[36m@@@ -79,8 -79,8 +79,7 @@@[m [mProduct[m
      BlocProvider.of<LoadingBloc>(context)[m
          .add(LoadingStart(loadingReason: "Car fetch"));[m
      try {[m
[31m--      final response =[m
[31m-           await http.get(Uri.parse('http://${localIPAddress}:5000/api/cars/'));[m
[31m -          await http.get(Uri.parse('$clientURL/cars/'));[m
[32m++      final response = await http.get(Uri.parse('$clientURL/api/cars/'));[m
  [m
        if (response.statusCode == 200) {[m
          for (Map<String, dynamic> carData in jsonDecode(response.body)) {[m
[36m@@@ -118,7 -118,7 +117,7 @@@[m
          .add(LoadingStart(loadingReason: "Distributor fetch"));[m
      try {[m
        final distributorsresponse = await http[m
[31m-           .get(Uri.parse('http://${localIPAddress}:5000/api/distributors'))[m
[31m -          .get(Uri.parse('$clientURL/distributors'))[m
[32m++          .get(Uri.parse('$clientURL/api/distributors'))[m
            .timeout(Duration(seconds: 10));[m
  [m
        if (distributorsresponse.statusCode == 200) {[m
[36m@@@ -130,7 -130,7 +129,7 @@@[m
        }[m
  [m
        final response = await http[m
[31m-           .get(Uri.parse('http://${localIPAddress}:5000/api/categories'))[m
[31m -          .get(Uri.parse('$clientURL/categories'))[m
[32m++          .get(Uri.parse('$clientURL/api/categories'))[m
            .timeout(Duration(seconds: 10));[m
  [m
        if (response.statusCode == 200) {[m
[1mdiff --cc mobile/cekmece_mobile/lib/views/temp/omerTemp.dart[m
[1mindex a70fc89,ab5c18c..513035a[m
[1m--- a/mobile/cekmece_mobile/lib/views/temp/omerTemp.dart[m
[1m+++ b/mobile/cekmece_mobile/lib/views/temp/omerTemp.dart[m
[36m@@@ -36,8 -36,8 +36,7 @@@[m [mclass _OmerTestState extends State<Omer[m
      BlocProvider.of<LoadingBloc>(context)[m
          .add(LoadingStart(loadingReason: "Car fetch"));[m
      try {[m
[31m--      final response =[m
[31m-           await http.get(Uri.parse('http://${localIPAddress}:5000/api/cars/2'));[m
[31m -          await http.get(Uri.parse('$clientURL/cars/1'));[m
[32m++      final response = await http.get(Uri.parse('$clientURL/api/cars/1'));[m
  [m
        if (response.statusCode == 200) {[m
          // If the server did return a 200 OK response,[m
