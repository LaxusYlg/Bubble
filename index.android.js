import React from "react";
import {AppRegistry} from "react-native";
import MainScreen from "./app/ui/pages/MainScreen";
import {StackNavigator} from "react-navigation";
const AppNavigator = StackNavigator({
    Home: {screen: MainScreen}
});


AppRegistry.registerComponent('Bubble', () => AppNavigator);
