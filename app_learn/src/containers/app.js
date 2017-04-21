/**
 * Created by liushuo on 17/4/19.
 */

import React , {Component} from 'react';
import {AppRegistry ,  Text , View, StyleSheet, Navigator, Dimensions, Image, Platform} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import MsgListContainer from './msg/msgListContainer'
import SheetContainer from './work/sheetContainer'
import MyCenterContainer from './my/myCenterContainer'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectTabItemName: "tab1"
        }
    }

    render() {
        return (<TabNavigator>

            <TabNavigator.Item
                selected={this.state.selectTabItemName === "tab1"}
                title={"工单"}
                //{/*renderIcon={() => <Image source={{uri:normalIconName}} style={styles.tabIconStyle}/>}*/}
                //{/*renderSelectedIcon={() => <Image source={{uri:selectIconName}} style={styles.tabIconStyle}/>}*/}
                onPress={() => this.setState({ selectTabItemName: "tab1" })}
                selectedTitleStyle={styles.selecttitleStyle}>
                <SheetContainer {...this.props}/>
            </TabNavigator.Item>

            <TabNavigator.Item
                selected={this.state.selectTabItemName === "tab2"}
                title={"消息"}
                //{/*renderIcon={() => <Image source={{uri:normalIconName}} style={styles.tabIconStyle}/>}*/}
                //{/*renderSelectedIcon={() => <Image source={{uri:selectIconName}} style={styles.tabIconStyle}/>}*/}
                onPress={() => this.setState({ selectTabItemName: "tab2" })}
                selectedTitleStyle={styles.selecttitleStyle}>
                <MsgListContainer {...this.props}/>
            </TabNavigator.Item>

            <TabNavigator.Item
                selected={this.state.selectTabItemName === "tab3"}
                title={"我的"}
                //{/*renderIcon={() => <Image source={{uri:normalIconName}} style={styles.tabIconStyle}/>}*/}
                //{/*renderSelectedIcon={() => <Image source={{uri:selectIconName}} style={styles.tabIconStyle}/>}*/}
                onPress={() => this.setState({ selectTabItemName: "tab3" })}
                selectedTitleStyle={styles.selecttitleStyle}>
                <MyCenterContainer {...this.props}/>
            </TabNavigator.Item>
            {/*{this.renderTabItem("work", "工单", "", "","", MsgListContainer)}*/}
            {/*{this.renderTabItem("msg", "消息", "", "","", View)}*/}
            {/*{this.renderTabItem("center", "我的", "", "","", View)}*/}
        </TabNavigator>)
    }
}
const styles = StyleSheet.create({
    selecttitleStyle:{
        color:'purple'
    }
});