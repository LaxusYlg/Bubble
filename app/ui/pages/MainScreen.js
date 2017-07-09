import React, {Component} from "react";
import {Image, ScrollView, StatusBar, Text, View, StyleSheet} from "react-native";
import {DrawerNavigator} from "react-navigation";
import ShotsScreen from "./ShotsScreen";


const Drawer = DrawerNavigator({
    Shots: {screen: ShotsScreen},
}, {
    contentComponent: props =>
        <View style={{flex: 1}}>
            <View style={{height: 160, alignSelf: 'stretch', justifyContent: 'center'}}>
                <Image style={{height: 60, width: 60, marginLeft: 30}}
                       source={require("../../res/image/logo.png")}
                       resizeMethod={'scale'}
                       resizeMode={'contain'}/>
            </View>
            <View style={{height: 1, backgroundColor: '#D8D8D8'}}/>
            <ScrollView style={{flex: 1}}>
                <View style={styles.item_container}>
                    <Image style={styles.item_image}
                           source={require("../../res/image/buckets.png")}
                           resizeMode={'contain'}
                           resizeMethod={'scale'}/>
                    <Text style={styles.item_text}>Buckets</Text>
                </View>

                <View style={styles.item_container}>
                    <Image style={styles.item_image}
                           source={require("../../res/image/shots.png")}
                           resizeMode={'contain'}
                           resizeMethod={'scale'}/>
                    <Text style={styles.item_text}>Shots</Text>
                </View>

                <View style={styles.item_container}>
                    <Image style={styles.item_image}
                           source={require("../../res/image/likes.png")}
                           resizeMode={'contain'}
                           resizeMethod={'scale'}/>
                    <Text style={styles.item_text}>Likes</Text>
                </View>
            </ScrollView>
        </View>
});

export default class MainScreen extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor='white' barStyle='dark-content'/>
                <Drawer screenProps={{appNavigator: this.props.navigation}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item_container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 26,
    },
    item_image: {
        height: 18,
        width: 18,
    },
    item_text: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 12,
    },
});
