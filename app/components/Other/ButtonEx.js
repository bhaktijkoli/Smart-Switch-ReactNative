import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Row, Col, Button, Text, Icon } from 'native-base';

// import Styles from './../../utils/styles';

class ButtonEx extends Component {
  render() {
    return(
      <Col>
        <Button style={Styles.button} light={this.props.status==1?true:false} onPress={this.onPress.bind(this)}>
          <Col>
            <Icon name={this.props.icon} style={[Styles.center,this.props.status==0?Styles.white:{}]}/>
          </Col>
        </Button>
        <Text style={[Styles.center]}>{this.props.name}</Text>
      </Col>
    )
  }
  onPress() {
    var data = {
      type: 'TOGGLE',
      pin: this.props.pin,
    }
    global.ws.send(JSON.stringify(data));
  }
}

const Styles = StyleSheet.create({
  button: {
    height:100,
    width:100,
    marginTop:20,
    marginBottom:5,
    borderRadius:100,
    alignSelf: 'center',
  },
  center: {
    alignSelf: 'center',
  },
  white: {
    color: '#FFF'
  }
});

export default ButtonEx;
