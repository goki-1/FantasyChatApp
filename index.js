/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import StartappAds from "react-native-startapp-ads-module";
StartappAds.initialize('208339630', true);
import SmaatoAd from 'react-native-smaato-ad'
    SmaatoAd.init('1100049942')

AppRegistry.registerComponent(appName, () => App);
