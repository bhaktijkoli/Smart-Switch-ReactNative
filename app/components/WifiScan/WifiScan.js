import React, { Component } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, List, ListItem, Text, Icon } from 'native-base';
import { Grid, Row, Col, Left, Right, Body } from 'native-base';
import { Footer, FooterTab } from 'native-base';
import { Spinner} from 'native-base';
import axios from 'axios'

import Styles from './../../utils/styles';



class WifiScan extends Component {
  static navigationOptions = {
    headerTitle: "Smart Switch Wifi",
  };
  constructor(props) {
    global.zeroconf, global.ws = null;
    super(props);
    this.state = {
      searching: true,
      networks: {}
    };
  }
  componentDidMount() {
    this.refresh();
  }
  refresh() {
    this.setState({searching:true});
    axios.get('http://192.168.4.1/scan').then((res)=>{
      console.log(res.data.networks);
      this.setState({networks: res.data.networks, searching:false})
    })
  }
  render() {
    return(
      <Container style={Styles.container}>
        <Content style={Styles.mgtop}>
          {this.renderList()}
        </Content>
          <Footer>
            <FooterTab>
              <Button onPress={this.refresh.bind(this)} disabled={this.state.searching}>
                <Icon name="refresh" />
              </Button>
              <Button>
                <Icon name="plus" />
              </Button>
              <Button>
                <Icon name="recycle" />
              </Button>
            </FooterTab>
          </Footer>
      </Container>
    )
  }
  renderList() {
    if(this.state.searching) {
      return(
        <Grid>
          <Col style={{marginTop:'50%'}}>
            <Spinner color="white"/>
          </Col>
        </Grid>
      )
    }
    return(
      <List dataArray={this.state.networks}
        renderRow={(n) =>
          <ListItem style={Styles.mglist} onPress={()=>this.onPress(n)}>
            <Left><Text>{n.name}</Text></Left>
            <Right>{this.getEncrpytType(n)}</Right>
          </ListItem>
        }>
      </List>
    )
  }
  onPress(item) {
    this.props.navigation.navigate('WifiPassword', {item:item});
  }
  getEncrpytType(item) {
    if(item.encryption==7) return null;
    return(
      <Icon name="lock"/>
    )
  }
}

export default WifiScan;
