import React, {Component} from 'react';
import {Image, View, Dimensions, ActivityIndicator, StatusBar, TouchableNativeFeedback} from "react-native";

const windowWidth = Dimensions.get('window').width;

export  default class ComponentName extends Component {
    state = {
        loading: true,
    };

    _onLoad = () => {
        this.setState({loading: false});
    };

    render() {
        let height = (3 / 4.0) * windowWidth;
        let images = this.props.navigation.state.params.shot.images;
        let url = images.hidpi ? images.hidpi : images.normal;
        let loadingView;
        if (this.state.loading) {
            loadingView = (
                <View style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    justifyContent: 'center',
                    width: windowWidth,
                    height: height
                }}>
                    <ActivityIndicator style={{alignSelf: 'center'}}/>
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor='black' barStyle='light-content'/>
                <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}
                                         background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center'}}>
                        <View style={{width: windowWidth, height: height, justifyContent: 'center'}}>
                            <Image style={{width: windowWidth, height: height}}
                                   source={{uri: url}}
                                   resizeMethod={'scale'}
                                   resizeMode={'cover'}
                                   onLoad={this._onLoad}/>
                            {loadingView}
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>

        );
    }
}