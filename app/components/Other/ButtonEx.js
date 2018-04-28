import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Row, Col, Button, Text, Icon } from 'native-base';

// import Styles from './../../utils/styles';

class ButtonEx extends Component {
  render() {
    return(
      <Col>
        <Button style={Styles.button} light={this.props.pin?true:false}>
          <Col>
            <Icon name={this.props.icon} style={[Styles.center]}/>
          </Col>
        </Button>
        <Text style={[Styles.center]}>{this.props.name}</Text>
      </Col>
    )
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
  }
});

export default ButtonEx;
