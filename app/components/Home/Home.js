import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Header, Content, Button, Text, Icon } from 'native-base';
import { Grid, Row, Col, H3 } from 'native-base';
import { Spinner} from 'native-base';
import Zeroconf from 'react-native-zeroconf'

import ButtonEx from './../Other/ButtonEx'

import Styles from './../../utils/styles';



class Home extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      connectionState: 0,
      data: {}
    };
  }
  componentDidMount() {
    this.setState({connectionState: 0});
    global.zeroconf = new Zeroconf();
    zeroconf.scan(type = 'ws', protocol = 'tcp', domain = 'local.');
    zeroconf.on('start', () => console.log('The scan has started.'))
    zeroconf.on('stop', () => {
      if(this.state.address.length == 0) {
        this.callForError();
      }
      console.log('The scan has stoped.')
    })
    zeroconf.on("resolved", (data)=>{
      if(data.name == "touchswitch") {
        this.setState({address:data.addresses});
        this.startWs();
      }
    })
    setTimeout(function () {
      zeroconf.stop();
    }.bind(this), 5000);
  }
  startWs() {
    if(this.state.address.length == 0) return;
    global.ws = new WebSocket('ws://'+this.state.address+':81');
    ws.onopen = () => {
      this.setState({connectionState: 2})
    };

    ws.onmessage = (e) => {
      console.log("WS Message",e.data);
      var obj = JSON.parse(e.data);
      console.log(obj);
      if(obj.type == "STATUS") {
        console.log(obj.data);
        this.setState({data:obj.data})
      }
    };

    ws.onerror = (e) => {
      console.log("WS Error",e.message);
      this.callForError();
    };

    ws.onclose = (e) => {
      this.setState({connectionState: 0});
      console.log(e.code, e.reason);
    };
  }
  render() {
    if(this.state.connectionState == 0) {
      return(
        <Container style={Styles.container}>
          <Grid>
            <Col style={{marginTop:'50%'}}>
              <Spinner color="white"/>
            </Col>
          </Grid>
        </Container>
      )
    }
    if(this.state.connectionState == 1) {
      return(
        <Container style={Styles.container}>
        </Container>
      )
    }
    return(
      <Container style={Styles.container}>
        <Content style={Styles.mgtop}>
          <Grid>
            {/* <Text style={{marginLeft:10, marginTop:10, alignSelf:'center'}}>Lights</Text> */}
            <Row>
              <ButtonEx name="Light 1" icon="lightbulb-o" pin={1} status={this.state.data[1]}/>
              <ButtonEx name="Light 2" icon="lightbulb-o" pin={2} status={this.state.data[2]}/>
            </Row>
            {/* <Text style={{marginLeft:10, marginTop:10, alignSelf:'center'}}>Fans</Text> */}
            <Row>
              <ButtonEx name="Fan 1" icon="bolt" pin={3} status={this.state.data[3]}/>
              <ButtonEx name="Fan 2" icon="bolt" pin={4} status={this.state.data[4]}/>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
  callForError() {
    this.setState({connectionState: 1});
    global.ws = null;
    global.zeroconf = null;
    Alert.alert(
      'No Device Found',
      'We where not able to find any switch devices.',
      [
        {text: 'Retry', onPress: () => {
          global.ws = null;
          this.componentDidMount();
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }
}

export default Home;
