import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  ToolbarAndroid,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import CustomToolbar from "../components/CustomToolbar";

import { Card } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { items } from "../helpers/Const";

var personData;

export default class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topUsers: ""
    };
  }
  handleClick = () => {
    console.log("this is:", this);
    Actions.addPerson();
  };

  

  render() {
    return (
      <View style={styles.container}>
        <CustomToolbar title={"Create Room"} />

        <Card
          containerStyle={{
            borderRadius: 10,
            backgroundColor: "#44237C",
            marginTop: 20,
            marginLeft: 50,
            marginRight: 50
          }}
          image={require("../images/create_room_bg.png")}
          imageStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: "hidden"
          }}
          imageWrapperStyle={{ borderRadius: 20 }}
        >
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => Actions.createNewHome()}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Create a Home {"\n"}
            </Text>
            <Text style={{ color: "white", fontWeight: "normal" }}>
              I have a room for new housemate
            </Text>
          </TouchableOpacity>
        </Card>

        <Card
          containerStyle={{
            borderRadius: 10,
            backgroundColor: "#F4823C",
            marginTop: 20,
            marginLeft: 50,
            marginRight: 50
          }}
          image={require("../images/begin_search_bg.png")}
          imageStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: "hidden"
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Begin a Search
            </Text>
            <Text style={{ color: "white", fontWeight: "normal" }}>
              I have a room for new housemate
            </Text>
          </TouchableOpacity>
        </Card>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50
          }}
        >
          <Text style={{ color: "#A7A7A7", fontWeight: "bold" }}>
            Skip & Browse
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
