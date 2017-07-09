import React, {Component} from "react";
import {Image, ScrollView, Text, TouchableNativeFeedback, View, ToastAndroid, ActivityIndicator} from "react-native";
import ShotsFlatList from "../component/ShotsFlatList";

const labels = ['Animated', 'Attachments', 'Debuts', 'Playoffs', 'Rebounds', 'Teams'];
const ShotRepo = require("../../api/ShotRepo");
export  default class PopularShotsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curLabel: labels[0],
            loading: false,
            dataSet: {},
            noData: false,
            noMoreData: false,
            labelsData: [{}, {}, {}, {}, {}, {}],
            labelsPage: [1, 1, 1, 1, 1, 1],
            labelsNoData: [false, false, false, false, false, false],
            labelsNoMoreData: [false, false, false, false, false, false],
        };
    }


    componentWillMount() {
        this._onRefresh();
    }

    _onRefresh = () => {
        this.setState({loading: true});
        ShotRepo.getShots({list: this.state.curLabel.toLowerCase()}).then((result) => {
            let labelIndex = labels.indexOf(this.state.curLabel);
            this.state.labelsPage[labelIndex] = 1;

            if (result && result.length > 0) {
                let dataBlob = [];
                let index = 0;
                result.map((item) => {
                    dataBlob.push({
                        key: index,
                        value: item,
                    });
                    index++;
                });
                this.state.labelsData[labelIndex] = dataBlob;
                this.setState({dataSet: dataBlob, loading: false});
            } else {
                this.state.labelsNoData[labelIndex] = true;
                this.setState({noData: true, loading: false});
            }
        }).catch((error) => {
            this.setState({loading: false});
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    };

    _onReachEnd = () => {
        let page = this.state.labelsPage[labels.indexOf(this.state.curLabel)] + 1;
        ShotRepo.getShots({list: this.state.curLabel.toLowerCase(), page: page}).then((result) => {
            let labelIndex = labels.indexOf(this.state.curLabel);
            if (result && result.length > 0) {
                let dataBlob = this.state.dataSet;
                let index = dataBlob.length;
                result.map((item) => {
                    dataBlob.push({
                        key: index,
                        value: item
                    });
                    index++;
                });
                this.state.labelsData[labelIndex] = dataBlob;
                this.state.labelsPage[labelIndex] = page;
                this.setState({dataSet: dataBlob});
            } else {
                this.state.labelsNoMoreData[labelIndex] = true;
                this.setState({noMoreData: true});
            }
        }).catch((error) => {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    };

    _onTabPressed = (label) => {
        if (this.state.curLabel !== label) {
            let data = this.state.labelsData[labels.indexOf(label)];
            if (data && data.length > 0) {
                this.setState({curLabel: label, dataSet: data});
            } else {
                this.state.curLabel = label;
                this._onRefresh();
            }
        }
    };

    render() {
        let child;
        if (this.state.loading) {
            child = (
                <View style={{flex: 1}}>
                    <ActivityIndicator style={{marginTop: 16}} size={'small'}/>
                </View>);
        } else if (this.state.noData) {
            child = (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 26, color: 'black'}}>EmptyDataSet</Text>
                </View>
            );
        } else {
            child = (<ShotsFlatList data={this.state.dataSet}
                                    refreshing={this.state.loading}
                                    onRefresh={this._onRefresh}
                                    onEndReached={this._onReachEnd}
                                    noMoreData={this.state.noMoreData}
                                    navigation={this.props.navigation}/>);
        }
        return (
            <View style={{flex: 1}}>
                <View style={{
                    backgroundColor: 'white',
                    elevation: 8,
                }}>
                    <View style={{
                        height: 44,
                        alignSelf: 'stretch',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: 'white',
                    }}>
                        <TouchableNativeFeedback
                            onPress={() => this.props.navigation.goBack(null)}>
                            <View style={{height: 44, width: 44, justifyContent: 'center', alignItems: 'center'}}>
                                <Image style={{height: 24, width: 24}}
                                       source={require("../../res/image/ic_arrow_back_black_24dp.png")}
                                       resizeMethod={'scale'} resizeMode={'contain'}/>
                            </View>
                        </TouchableNativeFeedback>
                        <Text style={{fontSize: 22, alignSelf: 'center', color: 'black', marginLeft: 16}}>Popular</Text>
                    </View>

                    <ScrollView style={{height: 44}}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                        {labels.map((label) => {
                            let color = this.state.curLabel === label ? 'black' : '#D8D8D8';
                            return (
                                <TouchableNativeFeedback style={{height: 36, alignItems: 'center'}}
                                                         onPress={() => this._onTabPressed(label)}
                                                         background={TouchableNativeFeedback.SelectableBackground()}
                                                         key={label}>
                                    <View style={{paddingLeft: 12, paddingRight: 12, justifyContent: 'center'}}>
                                        <Text
                                            style={{fontSize: 16, color: color}}>{label}</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            );
                        })}
                    </ScrollView>
                </View>
                {child}
            </View>
        );
    }
}