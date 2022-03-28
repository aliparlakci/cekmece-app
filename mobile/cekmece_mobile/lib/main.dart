import 'package:cekmece_mobile/models/product/Product.dart';
import 'package:cekmece_mobile/util/firebase/firebaseConnectionWrapper.dart';
import 'package:flutter/material.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(FirebaseWrapper());
}

const String description =
    "Merhaba aracımda kesinlikle değişen tramer vs yoktur istediğiniz garaja gösterebilirsiniz lütfen padoktaki diğer araçlarla karşılaştırmayınız. Galeri ve Mercedesciler aramasın Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis purus sit amet neque suscipit aliquam sed at leo. Cras ac dui ac neque mollis luctus ut a nisl. Fusce maximus facilisis sem, eget auctor turpis dignissim mattis. Nunc id interdum enim. Praesent augue mauris, tincidunt non eros eget, pulvinar tempor sapien. Proin faucibus, sem sit amet eleifend lobortis, purus arcu efficitur sapien, in consequat magna lacus ut nibh. Aenean porta imperdiet velit, quis tincidunt metus vulputate a. Nulla quis justo augue. Nulla ullamcorper sed turpis vitae tincidunt. Vestibulum at urna a tortor lobortis egestas. Vestibulum laoreet semper urna id imperdiet. Suspendisse ullamcorper suscipit justo id pellentesque. Mauris nulla metus, molestie sit amet ullamcorper interdum, cursus vitae mi. Pellentesque justo ante, mollis id urna eget, scelerisque rutrum lorem. Praesent odio eros, blandit vel augue vitae, rutrum luctus ipsum. Proin efficitur metus non odio bibendum, ac convallis quam mollis.";
