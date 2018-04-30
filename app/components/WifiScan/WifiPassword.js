import React, { Component } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, H3, Button, Text } from 'native-base';
import axios from 'axios'

import Styles from './../../utils/styles';



class WifiPassword extends Component {
  static navigationOptions = {
    headerTitle: "Enter password",
  };
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params);
    this.state={item:this.props.navigation.state.params.item, password: '', process:false}
  }
  render() {
    return(
      <Container style={Styles.container}>
        <Content style={Styles.mgtop}>
          <H3 style={{marginLeft:10}}>{this.state.item.name}</H3>
          <Form>
            <Item floatingLabel style={{marginRight:10, marginLeft:10}}>
              <Label style={{color:'#FFF'}}>Password</Label>
              <Input value={this.state.password} onChangeText={v=>this.setState({password:v})}/>
            </Item>
            <Button light style={{marginRight:10, marginLeft:10, marginTop:20}} block onPress={this.onPress.bind(this)}>
              {this.getButtonText()}
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
  onPress() {
    this.setState({process:true})
    var data = {name:this.state.item.name, password: this.state.password};
    console.log(data);
    axios.post("http://192.168.4.1/connect", data).then((res)=>{
      this.setState({process:false})
      if(res.data == 1) {
        Alert.alert(
          'Connected',
          'Now connect to the same wifi from your smartphone and restart the app.',
          [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ],
          { cancelable: false }
        )
      }else {
        Alert.alert( 'Error connecting', 'Invalid password.', [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } )
      }
    }).catch((res)=>{
      this.setState({process:false})
      Alert.alert( 'Error connecting', 'Invalid password.', [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } )
    })
  }
  getButtonText() {
    if(this.state.process) {
      return <Spinner color="#000" />
    }else return <Text>Connect</Text>
  }
}

export default WifiPassword;
