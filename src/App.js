/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import store from "./reducers/index";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image
} from "react-native";

import SplashScreen from "react-native-splash-screen";

import Router from "./Routes";
import sampleData from "./helpers/RawData";
import { items } from "./helpers/Const";

console.disableYellowBox = true;

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function(uri, options, ...args) {
  return global._fetch(uri, options, ...args).then(response => {
    console.log("Fetch", { request: { uri, options, ...args }, response });
    return response;
  });
};

export default class App extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    this._saveData();

    SplashScreen.hide();
  }

  async _saveData() {
    try {
      const value = await AsyncStorage.getItem("isFirstTime");
      console.log("isFirstTime ", value);

      if (value == null) {
        // Saves to storage as a JSON-string
        AsyncStorage.setItem("isFirstTime", JSON.stringify(false));
        AsyncStorage.setItem("users", JSON.stringify(sampleData));
        AsyncStorage.setItem("personThumb", JSON.stringify(items));
      } else {
        // Retrieves from storage
        AsyncStorage.getItem("personThumb")
          .then(value => {
            console.log("personThumb >> ", value);
          })
          .done();
      }
    } catch (error) {
      // Error saving data
      console.log("Error ", err);
    }
  }

  render() {
    return (
      // implemented with Text and Button as children

      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  button: {
    alignItems: "center",
    padding: 10,
    margin: 10
  }
});
