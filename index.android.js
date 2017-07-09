import React from "react";
import {AppRegistry} from "react-native";
import MainScreen from "./app/ui/pages/MainScreen";
import {StackNavigator} from "react-navigation";
import PopularShotsScreen from "./app/ui/pages/PopularShotsScreen";
import CommentsScreen from "./app/ui/pages/CommentsScreen";
import ImageDetailScreen from "./app/ui/pages/ImageDetailScreen";
const AppNavigator = StackNavigator({
    Home: {screen: MainScreen},
    ImageDetail: {screen: ImageDetailScreen},
    Popular: {screen: PopularShotsScreen},
    Comments: {screen: CommentsScreen},
}, {
    headerMode: 'none',
});


AppRegistry.registerComponent('Bubble', () => AppNavigator);

export {AppNavigator}
