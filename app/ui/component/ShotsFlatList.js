import React, {Component} from 'react';
import {
    FlatList, Image, RefreshControl, Text, TouchableHighlight, View, StyleSheet,
    ActivityIndicator, TouchableNativeFeedback
} from "react-native";
import NumberUtils from "../../utils/NumberUtils";
import DateUtils from "../../utils/DateUtils";
import TouchableItem from "../../../node_modules/react-navigation/lib/views/TouchableItem";

export  default class ShotsFlatList extends Component {

    _onCommentPress = (item) => {
        this.props.navigation.navigate('Comments', {shot: item});
    };


    _renderItem = ({item}) => {
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

                <TouchableNativeFeedback onPress={() => {
                    this.props.navigation.navigate('ImageDetail', {shot: item.value});
                }} background={TouchableNativeFeedback.SelectableBackground()}>
                    <View>
                        <Image style={{height: 150, width: 200, marginTop: 8}}
                               source={{uri: images.normal}}/>
                        <View style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            top: 12,
                            left: 168,
                        }}>
                            {gifIndicator}
                        </View>
                    </View>
                </TouchableNativeFeedback>


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

                    <TouchableHighlight style={{marginLeft: 12}} onPress={() => this._onCommentPress(item)}>
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
        );
    };

    _renderListFooter = (noMoreData) => {
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
            <FlatList style={{flex: 1}}
                      data={this.props.data}
                      renderItem={this._renderItem}
                      onEndReached={this.props.onEndReached}
                      ListHeaderComponent={() => {
                          if (this.props.renderListHeader) {
                              return this.props.renderListHeader();
                          } else {
                              return null;
                          }
                      }}
                      ListFooterComponent={() => {
                          return this._renderListFooter(this.props.noMoreData);
                      }}
                      ItemSeparatorComponent={() => (<View style={{height: 8}}/>)}
                      refreshControl={<RefreshControl refreshing={this.props.refreshing}
                                                      onRefresh={this.props.onRefresh}
                                                      colors={['black']}/>}/>
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