import React, {Component} from 'react';
import {
    Image, SectionList, Text, TouchableHighlight, TouchableNativeFeedback, View, StyleSheet,
    ActivityIndicator, ToastAndroid, Dimensions,
} from "react-native";
import NumberUtils from "../../utils/NumberUtils";
import DateUtils from "../../utils/DateUtils";
import HtmlView from "react-native-htmlview/HTMLView";

const ShotRepo = require("../../api/ShotRepo");
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default class CommentsScreen extends Component {
    state = {
        shot: this.props.navigation.state.params.shot,
        curPage: 0,
        comments: [],
        section: [],
        initError: false,
        noData: false,
        noMoreData: false,
    };

    _renderCommentHeader = () => {
        return (
            <View style={{height: 36, backgroundColor: 'white'}}>
                <View style={{flex: 1, justifyContent: 'center', paddingLeft: 15}}>
                    <Text style={{fontSize: 16, color: 'black'}}>Newest</Text>
                </View>
                <View style={{height: 0.5, backgroundColor: '#979797', alignSelf: 'stretch'}}/>
            </View>
        );
    };

    _renderEmptyOrError = () => {
        return (
            <View style={{
                height: windowHeight - 66,
                width: windowWidth,
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
                <Text style={{marginTop: 36}}>{this.state.initError ? 'Init Error' : 'No Comments'}</Text>
            </View>
        );
    };

    _renderCommentItem = ({item}) => {
        let {user, created_at, body} = item.valid;
        let date = new Date(created_at);
        return (
            <View style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, paddingTop: 8}}>

                <View style={{flexDirection: 'row'}}>
                    <Image style={{height: 36, width: 36, borderRadius: 18}}
                           source={{uri: user.avatar_url}}/>

                    <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 14, color: 'black'}}>{user.username}</Text>
                        <Text style={{
                            fontSize: 10,
                            color: '#979797',
                            marginTop: 3
                        }}>{DateUtils.formatDate(date)}</Text>
                    </View>
                </View>

                <View style={{marginTop: 8}}>
                    <HtmlView value={body}/>
                </View>
                <View style={{height: 0.5, backgroundColor: '#D8D8D8', marginTop: 8}}/>
            </View>
        );
    };


    headerSection = {data: ['header'], key: 'header', renderItem: this._renderCommentHeader};
    commentSection = {data: this.state.comments, key: 'comments', renderItem: this._renderCommentItem};
    emptyOrErrorSection = {data: ['emptyOrError'], key: 'emptyOrError', renderItem: this._renderEmptyOrError};

    constructor(props) {
        super(props);
    }

    _fetchComments = () => {
        if (!(this.state.noData && this.state.initError)) {
            let page = this.state.curPage + 1;
            let id = this.state.shot.value.id;
            ShotRepo.getShotComments({id, page}).then((result) => {
                if (result && result.length > 0) {
                    let dataBlob = this.state.comments;
                    let index = this.state.comments.length;
                    result.forEach((item) => {
                        dataBlob.push({
                            key: index,
                            valid: item,
                        });
                        index++;
                    });
                    this.setState({
                        comment: dataBlob,
                        section: [this.headerSection, this.commentSection],
                        curPage: page
                    });
                } else {
                    this.setState({noData: true, section: [this.emptyOrErrorSection]});
                }
            }).catch((error) => {
                ToastAndroid.show(error, ToastAndroid.SHORT);
                this.setState({initError: true, section: [this.emptyOrErrorSection]});
            });
        }
    };

    _renderShot = (item) => {
        let {
            user, title, images, created_at,
            views_count, likes_count, comments_count, attachments_count, rebound_source_url,
            animated
        } = item.value;
        let date = new Date(created_at);
        let gifIndicator;
        if (animated) {
            gifIndicator = (<Image style={{height: 24, width: 24}}
                                   source={require("../../res/image/gif_indicator.png")}
                                   resizeMode={'contain'}
                                   resizeMethod={'scale'}/>);
        }
        let rebound;
        if (rebound_source_url) {
            rebound = (
                <TouchableHighlight>
                    <View style={styles.item_count_container}>
                        <Image style={styles.item_icon}
                               resizeMode={'contain'}
                               resizeMethod={'scale'}
                               source={require("../../res/image/icon_rebound.png")}/>
                    </View>
                </TouchableHighlight>
            );
        }
        let attachment;
        if (attachments_count && attachments_count > 0) {
            attachment = (
                <TouchableHighlight style={{marginLeft: 6}}>
                    <View style={styles.item_count_container}>
                        <Image style={styles.item_icon}
                               resizeMode={'contain'}
                               resizeMethod={'scale'}
                               source={require("../../res/image/icon_attachment.png")}/>
                    </View>
                </TouchableHighlight>
            );
        }

        return (
            <View style={{flex: 1, paddingBottom: 10}}>
                <View style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, paddingTop: 8}}>

                    <View style={{flexDirection: 'row'}}>
                        <Image style={{height: 36, width: 36, borderRadius: 6}}
                               source={{uri: user.avatar_url}}/>

                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize: 14, color: 'black'}}>{user.username}</Text>
                            <Text style={{
                                fontSize: 10,
                                color: '#979797',
                                marginTop: 3
                            }}>{DateUtils.formatDate(date)}</Text>
                        </View>
                    </View>

                    <Text style={{fontSize: 16, color: 'black', marginTop: 8}}>{title}</Text>

                    <View>
                        <Image style={{height: 150, width: 200, marginTop: 8}}
                               source={{uri: images.normal}}/>
                        <View style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            top: 15,
                            left: 160,
                        }}>
                            {gifIndicator}
                        </View>
                    </View>


                    <View style={{height: 0.5, backgroundColor: '#D8D8D8', alignSelf: 'stretch', marginTop: 10}}/>

                    <View style={{flexDirection: 'row', height: 36, alignItems: 'center'}}>
                        <TouchableHighlight >
                            <View style={styles.item_count_container}>
                                <Image style={styles.item_icon}
                                       resizeMode={'contain'}
                                       resizeMethod={'scale'}
                                       source={require("../../res/image/view.png")}
                                />
                                <Text
                                    style={styles.item_text}>{NumberUtils.formatNumber(views_count)}</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight style={{marginLeft: 12}}>
                            <View style={styles.item_count_container}>
                                <Image style={styles.item_icon}
                                       resizeMode={'contain'}
                                       resizeMethod={'scale'}
                                       source={require("../../res/image/comment.png")}/>
                                <Text
                                    style={styles.item_text}>{NumberUtils.formatNumber(comments_count)}</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight style={{marginLeft: 12}}>
                            <View style={styles.item_count_container}>
                                <Image style={styles.item_icon}
                                       resizeMode={'contain'}
                                       resizeMethod={'scale'}
                                       source={require("../../res/image/like.png")}/>
                                <Text
                                    style={styles.item_text}>{NumberUtils.formatNumber(likes_count)}</Text>
                            </View>
                        </TouchableHighlight>

                        <View style={{flex: 1}}/>
                        {rebound}
                        {attachment}
                    </View>

                </View>
            </View>
        );
    };

    _renderListFooter = (noMoreData) => {
        if (this.state.noData) {
            return (
                <View/>
            );
        }
        let child;
        if (noMoreData) {
            child = (<Text>noMoreData</Text>);
        } else {
            child = (<ActivityIndicator size={'small'}/>);
        }
        return (
            <View style={{height: 36, justifyContent: 'center', alignItems: 'center'}}>
                {child}
            </View>
        );
    };


    render() {
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
                        <Text
                            style={{fontSize: 22, alignSelf: 'center', color: 'black', marginLeft: 16}}>Comments</Text>
                    </View>


                </View>
                <SectionList ListHeaderComponent={( this._renderShot(this.state.shot))}
                             ListFooterComponent={(this._renderListFooter(this.state.noMoreData))}
                             sections={this.state.section}
                             onEndReached={this._fetchComments}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item_count_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    item_icon: {
        height: 12,
        width: 24,
    },

    item_text: {
        fontSize: 12,
        color: '#979797',
        marginLeft: 3
    },
});