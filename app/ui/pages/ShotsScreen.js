import React, {Component} from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Text,
    ToastAndroid,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import ShotsFlatList from "../component/ShotsFlatList";

const ShotRepo = require("../../api/ShotRepo");
const DateUtils = require("../../utils/DateUtils");
const NumberUtils = require("../../utils/NumberUtils");

const windowWidth = Dimensions.get('window').width;

export default class ShotsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shots: [],
            popular: {},
            init: false,
            initError: false,
            refreshing: false,
            noData: false,
            noMoreData: false,
            curPage: 1
        };
    }

    _init() {
        ShotRepo.getShots({pageSize: 1}).then((result) => {
            if (result && result.length > 0) {
                this.setState({popular: result[0]});
            }
            return ShotRepo.getShots({sort: 'recent'});
        }).then((result) => {
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
                this.setState({shots: dataBlob, init: true});
            } else {
                this.setState({noData: true, init: true});
            }
        }).catch((error) => {
            this.setState({initError: true, init: true});
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        ShotRepo.getShots({PageSize: 1}).then(() => {
            if (result && result.length > 0) {
                this.setState({popular: result[0]});
            }
            return ShotRepo.getShots({sort: 'recent'});
        }).then((result) => {
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
                this.setState({shots: dataBlob, refreshing: false, curPage: 1});
            } else {
                this.setState({noData: true, curPage: 1});
            }
        }).catch((error) => {
            this.setState({refreshing: false});
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    };

    _onReachEnd = () => {
        let page = this.state.curPage + 1;
        ShotRepo.getShots({sort: 'recent', page: page}).then((result) => {
            if (result && result.length > 0) {
                let dataBlob = this.state.shots;
                let index = dataBlob.length;
                result.map((item) => {
                    dataBlob.push({
                        key: index,
                        value: item
                    });
                    index++;
                });
                this.setState({shots: dataBlob, curPage: page});
            } else {
                this.setState({noMoreData: true});
            }
        }).catch((error) => {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    };

    _renderInit = () => {
        return (
            <View style={{flex: 1}}>
                <ActivityIndicator style={{marginTop: 16}} size={'small'}/>
            </View>
        );
    };

    _renderEmpty = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 26, color: 'black'}}>EmptyDataSet</Text>
            </View>
        );
    };

    _renderError = () => {
        return (
            <View style={{flex: 1}}>
                <Text style={{fontSize: 26, color: 'black'}}>Error</Text>
            </View>
        );
    };

    _renderListHeader = () => {
        let {title, images, team, user} = this.state.popular;
        let teamView;
        if (team) {
            teamView = (
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text style={{fontSize: 12, color: '#D8D8D8', marginLeft: 3}}>in</Text>
                    <Text style={{fontSize: 16, color: 'black', marginLeft: 3}}>{team.name}</Text>
                </View>
            );
        }
        return (
            <TouchableOpacity style={{paddingBottom: 20}} onPress={() => {
                this.props.screenProps.appNavigator.navigate('Popular');
            }}>
                <View style={{backgroundColor: 'white', paddingBottom: 8}}>
                    <View style={{
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'center',
                        paddingLeft: 15,
                        paddingRight: 15,
                    }}>
                        <Image style={{height: 24, width: 24}} resizeMode={'contain'}
                               resizeMethod={'scale'}
                               source={require("../../res/image/popular.png")}/>

                        <Text style={{fontSize: 18, color: 'black', marginLeft: 8, flex: 1}}>Popular</Text>

                        <Image style={{height: 16, width: 16}} resizeMode={'contain'}
                               resizeMethod={'scale'}
                               source={require("../../res/image/common_arrow_right.png")}/>

                    </View>
                    <View style={{height: 0.5, alignSelf: 'stretch', backgroundColor: '#D8D8D8'}}/>

                    <View style={{
                        flexDirection: 'row',
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 8,
                        paddingBottom: 8,
                        justifyContent: 'space-between'
                    }}>
                        <View>
                            <Text style={{fontSize: 16, color: 'black'}}>{title}</Text>

                            <View style={{flexDirection: 'row', alignItems: 'flex-end', marginTop: 5}}>
                                <Text style={{fontSize: 10, color: '#D8D8D8'}}>by</Text>
                                <Text style={{fontSize: 14, color: 'black', marginLeft: 3}}>{user.username}</Text>
                                {teamView}
                            </View>
                        </View>

                        <Image style={{height: 52.5, width: 75}}
                               source={{uri: images.normal}}
                               resizeMethod={'scale'}
                               resizeMode={'contain'}/>
                    </View>
                </View>

            </TouchableOpacity>
        );
    };

    _renderContent = () => {
        return (
            <ShotsFlatList style={{flex: 1}}
                           refreshing={this.state.refreshing}
                           onRefreshing={this._onRefresh}
                           data={this.state.shots}
                           onEndReached={this._onReachEnd}
                           renderListHeader={this._renderListHeader}
                           navigation={this.props.screenProps.appNavigator}/>
        );
    };

    componentWillMount() {
        this._init();
    }

    render() {
        let child;
        if (!this.state.init) {
            child = this._renderInit();
        } else {
            if (this.state.initError) {
                child = this._renderError();
            } else if (this.state.noData) {
                child = this._renderEmpty();
            } else {
                child = this._renderContent();
            }
        }

        return (
            <View style={{flex: 1}}>
                <View style={{
                    height: 44,
                    alignSelf: 'stretch',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    elevation: 8,
                }}>

                    <TouchableNativeFeedback
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                        <View style={{height: 44, width: 44, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{height: 24, width: 24}}
                                   source={require("../../res/image/ic_menu_black_24dp.png")}
                                   resizeMethod={'scale'} resizeMode={'contain'}/>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{
                        height: 44,
                        width: windowWidth - 88,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image style={{height: 32}}
                               source={require("../../res/image/app_title.png")}
                               resizeMethod={'scale'} resizeMode={'contain'}/>
                    </View>
                </View>
                {child}
            </View >
        );
    }
}