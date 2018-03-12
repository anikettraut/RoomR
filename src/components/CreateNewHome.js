import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  ToolbarAndroid,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from "react-native";

import ListSecondary from "./listSecondary";
import AddPerson from "./AddPerson";
import CustomToolbar from "../components/CustomToolbar";
import * as Const from "../helpers/Const";

import { Card, Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";

export default class CreateNewHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addpersonView: false,
      index: null,
      topUsers: "",
      animating: true
    };
    this._addPerson = this._addPerson.bind(this);
  }

  componentWillMount() {
    console.log("componentDidMount topUsers >> ");
    AsyncStorage.getItem("personThumb")
      .then(value => {
        personData = JSON.parse(value);
        console.log("personData >> ", personData.length);

        this.setState({
          topUsers: personData
        });
      })
      .done();
  }

  _goToAddNewPerson = () => {
    let personData = this.state.topUsers;
    if (personData) {
      let i = 0;
      for (i; i < personData.length; i++) {
        // console.log("Found personData index at " + personData[i].name);
        if (
          !personData[i].name ||
          personData[i].name == undefined ||
          personData[i].name == "" ||
          personData[i].name.length == 0
        ) {
          console.log("Found Empty index at " + i);

          break;
        }
      }
      Actions.addPerson({ gridPosition: i });
    }
  };

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  _addPerson(index) {
    this.setState({ addpersonView: true, index });
  }

  render() {
    const animating = this.state.animating;
    console.log("animating", animating);
    // if (this.state.addpersonView) {
    //   return <sAddPerson />;
    // } else

    if (this.state.topUsers) {
      return (
        <View style={styles.container}>
          <CustomToolbar title={"Create a new Home"} />

          <View>
            <Image
              style={{
                width: "100%",
                overflow: "hidden",
                alignItems: "center",
                position: "relative"
              }}
              source={require("../images/banner_create_new_home.png")}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              Actions
              onPress={this._goToAddNewPerson}
              style={{
                position: "absolute",
                width: 100,
                overflow: "visible",
                height: 120,
                top: 100,
                alignItems: "center",
                justifyContent: "center",
                right: 13,
                bottom: 10
              }}
            >
              <Image
                source={{
                  uri:
                    "https://lh3.googleusercontent.com/TI8o079rVoxaQ5ZeDcLfQRlS7MQrwNbpGh4-WdOYC2lYIZk1jAhABtABLU_kl2aReCSl=w300"
                }}
                style={styles.FloatingButtonStyle}
              />
            </TouchableOpacity>
          </View>

          <View
            style={
              {
                // alignItems: "center"
                // alignItems: "center"
              }
            }
          >
            <ListSecondary data={this.state.topUsers} />
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => Actions.addRoom()}
            style={styles.TouchableOpacityStyle}
          >
            <Image
              source={{
                uri:
                  "https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png"
              }}
              style={styles.FloatingButtonStyle}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (animating) {
      return (
        <View style={styles.container}>
          <CustomToolbar title={"Create a new Home"} />

          <ActivityIndicator
            animating={animating}
            color="#44237C"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      );
    }
  }

  handleClick = () => {
    console.log("this is:", this);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: 50,
    height: 50
  },
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80
  }
});
