/**
 * Created by liushuo on 17/4/19.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    UIManager,
    Animated,
    Easing,
    PanResponder
} from 'react-native';
import NavigationBar from '../../component/navBarCommon'
import * as Constants from  '../../constants/constant'
import {connect} from 'react-redux'


class MsgListContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            bg:"orange",
            bg1:"red",
            bg2:"yellow",
            view3:{
                top:150,
                left:90.5,
            },
            animatedX:new Animated.Value(100),
            animatedY:new Animated.Value(64),
        }
        this.touchStart = null;
        this.lastMoveNativeEvent = null;

        this.moveTotalLeft = 0;
        this.moveTotalTop = 0;


        this.panResponder1 = {
            onStartShouldSetResponder:(nativeEvent, gestureState)=>{
                return true
            },
            onMoveShouldSetResponder:(nativeEvent, gestureState)=> {
                return true
            },
            onResponderGrant:(nativeEvent, gestureState)=> {
                this.setState({
                    bg1:"blue"
                })
            },
            onResponderMove:(nativeEvent, gestureState)=>{
                return true
            },
            onResponderRelease:(nativeEvent, gestureState)=>{
                this.setState({
                    bg1:"red"
                })
            },
            onResponderTerminationRequest:()=>{
                return false;
            },
            //结束异常事件的响应
            onResponderTerminate:()=>{

            }
        }
        this.panResponder2 = {
            onStartShouldSetResponder:(nativeEvent, gestureState)=>{
                // false 不响应 -> view1会响应
                return true
            },
            onMoveShouldSetResponder:(nativeEvent, gestureState)=> {
                return true
            },
            onResponderGrant:(nativeEvent, gestureState)=> {
                this.setState({
                    bg2:"green"
                })
            },
            onResponderMove:(nativeEvent, gestureState)=>{
                return true
            },
            onResponderRelease:(nativeEvent, gestureState)=>{
                this.setState({
                    bg2:"yellow"
                })
            },
            onResponderTerminationRequest:()=>{
                return true;
            },
            //结束异常事件的响应
            onResponderTerminate:()=>{

            }
        }
        this.panResponder0 = {
            onStartShouldSetResponder:(evt,gestureState)=>{return true},
            onMoveShouldSetResponder:(evt,gestureState)=>{return true},
            onStartShouldSetPanResponderCapture:(evt,gestureState)=>{return true},
            onStartShouldSetPanResponder:(evt,gestureState)=>{return true},
            onMoveShouldSetPanResponderCapture:(evt,gestureState)=>{return true},
            onMoveShouldSetPanResponder:(evt,gestureState)=>{
                return true
            },
            onResponderGrant:(evt, gestureState)=> {
                console.log(evt.nativeEvent)
                this.touchStart = {top:evt.nativeEvent.pageY - evt.nativeEvent.locationY,left:evt.nativeEvent.pageX - evt.nativeEvent.locationX}
                console.log(this.touchStart)
            },
            onResponderMove:(evt, gestureState)=>{
                console.log(evt.nativeEvent)


                if (this.lastMoveNativeEvent){
                    const horizontalDistance = evt.nativeEvent.pageX - this.lastMoveNativeEvent.pageX;
                    const verDistance = evt.nativeEvent.pageY -this.lastMoveNativeEvent.pageY;

                    this.moveTotalLeft = this.moveTotalLeft +horizontalDistance;
                    this.moveTotalTop = this.moveTotalTop + verDistance;

                    console.log(this.touchStart.left,this.touchStart.top,horizontalDistance,verDistance,this.moveTotalLeft,this.moveTotalTop)



                    const toValueHor = this.touchStart.left + this.moveTotalLeft;
                    const toValuever = this.touchStart.top + this.moveTotalTop;

                    const timestamp = evt.nativeEvent.timestamp - this.lastMoveNativeEvent.timestamp
                    console.log(toValueHor,toValuever)

                    Animated.timing(this.state.animatedX,{
                        toValue:toValueHor,
                        duration:100,
                    }).start();
                    Animated.timing(this.state.animatedY,{
                        toValue:toValuever,
                        duration:timestamp,
                    }).start();
                }
                this.lastMoveNativeEvent = evt.nativeEvent;
            },
            onResponderRelease:(evt, gestureState)=>{

                const horizontalDistance = evt.nativeEvent.pageX - this.lastMoveNativeEvent.pageX;
                const verDistance = evt.nativeEvent.pageY -this.lastMoveNativeEvent.pageY;

                this.moveTotalLeft = this.moveTotalLeft +horizontalDistance;
                this.moveTotalTop = this.moveTotalTop + verDistance;

                console.log(this.touchStart.left,this.touchStart.top,horizontalDistance,verDistance,this.moveTotalLeft,this.moveTotalTop)



                const toValueHor = this.touchStart.left + this.moveTotalLeft;
                const toValuever = this.touchStart.top + this.moveTotalTop;

                const timestamp = evt.nativeEvent.timestamp - this.lastMoveNativeEvent.timestamp
                console.log(toValueHor,toValuever)

                Animated.timing(this.state.animatedX,{
                    toValue:toValueHor,
                    duration:100,
                }).start();
                Animated.timing(this.state.animatedY,{
                    toValue:toValuever,
                    duration:100,
                }).start();


                this.moveTotalLeft = 0;
                this.moveTotalTop = 0
                this.lastMoveNativeEvent = null;
            },
        }
    }
    layout(e){
        console.log(e.layout)
        console.log(e)
        this.width = e.layout.width;
        this.height = e.layout.height;



        UIManager.measure(e.target,(x,y,width,height,left,top)=> {
            console.log("x= " + x);
            console.log("y= " + y);
            console.log("width= " + width);
            console.log("height= " + height);
            console.log("left= " + left);
            console.log("top= " + top);
        })
    }
    layoutMove(e){
        this.moveWidth = e.layout.width;
        this.moveHeight = e.layout.height;
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title="tab 2"/>
                <View ref="btn"
                      style={styles.outView}
                      onLayout={({nativeEvent:e})=>this.layout(e)}
                >
                    <View style={[styles.textView,{backgroundColor:this.state.bg}]}
                          onStartShouldSetResponder={(nativeEvent, gestureState)=>{
                              return true
                          }}
                          onMoveShouldSetResponder={(nativeEvent, gestureState)=>{
                              return true
                          }}
                          onResponderGrant={(nativeEvent, gestureState)=> {
                              this.setState({
                                  bg:"gray"
                              })
                          }}
                          onResponderMove={(event, gestureState)=>{
                              return true
                          }}
                          onResponderRelease={(nativeEvent, gestureState)=>{
                              this.setState({
                                  bg:"blue"
                              })
                          }}
                    >
                        <Text>click</Text>
                    </View>


                    <View style={[styles.one,{backgroundColor:this.state.bg1}]}
                          {...this.panResponder1}
                    >
                        <View style={[styles.two,{backgroundColor:this.state.bg2}]}
                              {...this.panResponder2}
                        >
                            <Text>子View</Text>
                        </View>
                    </View>
                    <Animated.View onLayout={({nativeEvent:e})=>this.layoutMove(e)} style={[styles.moveView,{
                        left:this.state.animatedX,
                        top:this.state.animatedY
                    }]}
                          {...this.panResponder0}
                    >
                        <Text>可拖拽</Text>
                    </Animated.View>




                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Constants.viewBgColor,
    },
    outView:{
        flex:1,
    },
    textView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:60,
        height:60,
        borderRadius:30,
    },
    one:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:90,
        height:90,
        borderRadius:45,
    },
    two:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:60,
        height:60,
        borderRadius:30,
    },
    moveView:{
        position:'absolute',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:"red"
    }
})
function mapStateToProps(state) {
    const {tab2Reducer} = state;
    return tab2Reducer;
}
export default connect(null)(MsgListContainer);