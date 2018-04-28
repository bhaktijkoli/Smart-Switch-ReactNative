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
      loading: true,
      data: {}
    };
  }
  render() {
    if(this.state.loading == true) {
      return(
        <Container style={Styles.container}>
          <Grid>
            <Col style={{marginTop:'50%'}}>
              <Spinner color="black"/>
            </Col>
          </Grid>
        </Container>
      )
    }
    return(
      <Container style={Styles.container}>
        <Content style={Styles.mgtop}>
          <Grid>
            {/* <Text style={{marginLeft:10, marginTop:10, alignSelf:'center'}}>Lights</Text> */}
            <Row>
              <ButtonEx name="Light 1" icon="lightbulb-o"/>
              <ButtonEx name="Light 2" icon="lightbulb-o"/>
            </Row>
            {/* <Text style={{marginLeft:10, marginTop:10, alignSelf:'center'}}>Fans</Text> */}
            <Row>
              <ButtonEx name="Fan 1" icon="bolt"/>
              <ButtonEx name="Fan 2" icon="bolt"/>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

export default Home;
