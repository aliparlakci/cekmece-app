import 'package:cekmece_mobile/util/blocProviders.dart';
import 'package:cekmece_mobile/util/network/networkProvider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider<NetworkService>(create: (_) => NetworkService())
    ],
    child: BlocProviders(),
  ));
}
