import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon } from 'native-base';
import { Grid, Row, Col, H3 } from 'native-base';
import { Spinner} from 'native-base';

import ButtonEx from './../Other/ButtonEx'

import Styles from './../../utils/styles';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      connectionState: 0,
      data: {}
    };
  }
  componentDidMount() {
    global.ws = new WebSocket('ws://192.168.4.1:81');

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
      this.setState({connectionState: 1});
      console.log("WS Error",e.message);
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
              <ButtonEx name="Light 1" icon="lightbulb-o" pin={this.state.data[1]}/>
              <ButtonEx name="Light 2" icon="lightbulb-o" pin={this.state.data[2]}/>
            </Row>
            {/* <Text style={{marginLeft:10, marginTop:10, alignSelf:'center'}}>Fans</Text> */}
            <Row>
              <ButtonEx name="Fan 1" icon="bolt" pin={this.state.data[3]}/>
              <ButtonEx name="Fan 2" icon="bolt" pin={this.state.data[4]}/>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

export default Home;