import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, View} from "react-native";

const ShotRepo = require("../../api/ShotRepo");

export default class ShotsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {data: "empty"};
    }

    _onReset() {
        this.setState({data: "reset"});
    };

    _onListShot() {
        ShotRepo.getShots({'page': 1}).then((response) => {
            return response.text();
        }).then((result) => {
            this.setState({data: result});
        }).catch((error) => {
            this.setState({data: error});
        })
    };

    _onShot() {
        if (this.state.data) {
            let json = JSON.parse(this.state.data);
            let firstShot = json[0];
            let {id} = firstShot;
            ShotRepo.getShotById(id).then((response) => {
                return response.text();
            }).then((result) => {
                this.setState({data: result});
            }).catch((error) => {
                this.setState({data: error});
            });
        } else {
            this.setState({data: "no shot list"});
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1, padding: 15}}>
                    <Text>{this.state.data}</Text>
                </ScrollView>
                <View style={{height: 2, backgroundColor: 'rgba(255,255,255,8)'}}/>
                <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: 'center'}}>
                    <View style={styles.space}/>

                    <TouchableHighlight onPress={() => this._onReset()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Reset</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.space}/>

                    <TouchableNativeFeedback onPress={() => this._onListShot()}
                                             background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>list shots</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={styles.space}/>

                    <TouchableNativeFeedback onPress={() => this._onShot()}
                                             background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Shot</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={styles.space}/>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#03A9F3',
        height: 50,
        width: 260,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    space: {
        height: 20
    }
});