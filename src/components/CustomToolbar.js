import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TouchableOpacity
} from "react-native";

import { Icon } from "react-native-elements";

import { toolbar_backgroundColor } from "../helpers/Const";
import { Actions } from "react-native-router-flux";

export default class CustomToolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ToolbarAndroid
        style={styles.toolbar}
        title={this.props.title}
        onActionSelected={this.onActionSelected}
        titleColor="#ffffff"
        actions={[
          {
            title: "Back",
            icon: require("../images/ic_close_24.png"),
            show: "always"
          }
        ]}
      />
    );
  }

  onActionSelected(position) {
    Actions.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  toolbar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#44237C",
    height: 56,

    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF"
  }
});
