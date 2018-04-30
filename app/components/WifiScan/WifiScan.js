import React, { Component } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, List, ListItem, Text, Icon } from 'native-base';
import { Grid, Row, Col, Left, Right, Body } from 'native-base';
import { Spinner} from 'native-base';
import axios from 'axios'

import Styles from './../../utils/styles';



class WifiScan extends Component {
  static navigationOptions = {
    headerTitle: "Touch Switch Wifi",
    headerRight: (
      <TouchableOpacity style={{marginRight:10}} onPress={()=>global.refresh()}>
        <Icon name="refresh" style={{fontSize:17}} />
      </TouchableOpacity>
    )
  };
  constructor(props) {
    global.zeroconf, global.ws = null;
    super(props);
    this.state = {
      searching: true,
      networks: {}
    };
    global.refresh = this.refresh.bind(this);
    refresh();
  }
  refresh() {
    this.setState({searching:true});
    axios.get('http://192.168.4.1/scan').then((res)=>{
      console.log(res.data.networks);
      this.setState({networks: res.data.networks, searching:false})
    })
  }
  render() {
    if(this.state.searching) {
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
    return(
      <Container style={Styles.container}>
        <Content style={Styles.mgtop}>
          <List dataArray={this.state.networks}
            renderRow={(n) =>
              <ListItem style={Styles.mglist} onPress={()=>this.onPress(n)}>
                <Left><Text>{n.name}</Text></Left>
                <Right>{this.getEncrpytType(n)}</Right>
              </ListItem>
            }>
          </List>
          <Button light block style={{margin:10, marginTop:20}}><Icon name="plus"/></Button>
        </Content>
      </Container>
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
