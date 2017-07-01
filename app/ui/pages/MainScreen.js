import React, {Component} from "react";
import {StatusBar, View} from "react-native";
import {TabNavigator} from "react-navigation";
import ShotsScreen from "./ShotsScreen";
import MineScreen from "./MineScreen";


const PageNavigator = TabNavigator({
    Shots: {screen: ShotsScreen},
    Mine: {screen: MineScreen},
}, {
    tabBarOptions: {
        activeTintColor: '#45C018',
        inactiveTintColor: '#999999',
        showIcon: false,
        height: 60,
        labelStyle: {
            fontSize: 12,
            marginTop: 0,
            marginBottom: 0,
        },
        style: {
            marginBottom: -2,
            backgroundColor: '#FCFCFC',
        },
        tabStyle: {}
    },
    tabBarPosition: 'bottom',
});

export default class MainScreen extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor='white' barStyle='dark-content'/>
                <PageNavigator/>
            </View>
        );
    }
}
