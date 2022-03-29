import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/util/firebase/firebaseConnectionWrapper.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");

  runApp(FirebaseWrapper());
}

final mockProd = Product(
  id: "123",
  images: [
    "assets/images/rb16b-1.jpg",
    "assets/images/rb16b-2.jpg",
    "assets/images/rb16b-3.jpg",
    "assets/images/rb16b-4.jpg",
    "assets/images/rb16b-5.jpg",
  ],
  title:
      "YER UÇAĞI - Keyfe Keder Dosta Gider RB16-B - ENNN DOLU PAKET - CİDDE MAKYAJLI",
  price: 120000000,
  description: description,
  rating: 4.8,
  isFavourite: true,
  isPopular: true,
);
const String description =
    "Merhaba aracımda kesinlikle değişen tramer vs yoktur istediğiniz garaja gösterebilirsiniz lütfen padoktaki diğer araçlarla karşılaştırmayınız. Galeri ve Mercedesciler aramasın Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis purus sit amet neque suscipit aliquam sed at leo. Cras ac dui ac neque mollis luctus ut a nisl. Fusce maximus facilisis sem, eget auctor turpis dignissim mattis. Nunc id interdum enim. Praesent augue mauris, tincidunt non eros eget, pulvinar tempor sapien. Proin faucibus, sem sit amet eleifend lobortis, purus arcu efficitur sapien, in consequat magna lacus ut nibh. Aenean porta imperdiet velit, quis tincidunt metus vulputate a. Nulla quis justo augue. Nulla ullamcorper sed turpis vitae tincidunt. Vestibulum at urna a tortor lobortis egestas. Vestibulum laoreet semper urna id imperdiet. Suspendisse ullamcorper suscipit justo id pellentesque. Mauris nulla metus, molestie sit amet ullamcorper interdum, cursus vitae mi. Pellentesque justo ante, mollis id urna eget, scelerisque rutrum lorem. Praesent odio eros, blandit vel augue vitae, rutrum luctus ipsum. Proin efficitur metus non odio bibendum, ac convallis quam mollis.";
