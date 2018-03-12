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

export default class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: this.props.options[0]
    };
  }
  updateActiveOption = activeOption => {
    this.setState({
      activeOption
    });
  };
  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 100,
          marginBottom: 100
        }}
      >
        {this.props.options.map((option, index) => (
          <TouchableOpacity
            onPress={() => {
              this.props.onChange(option);
              this.updateActiveOption(option);
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  width: 50,
                  borderWidth: 0,
                  height: 50,
                  color: this.state.activeOption === option ? "red" : "black"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  // source={{
                  //   uri:
                  //     "https://facebook.github.io/react-native/docs/assets/favicon.png"
                  // }}

                  source={
                    this.state.activeOption === option
                      ? {
                          uri:
                            "https://facebook.github.io/react-native/docs/assets/favicon.png"
                        }
                      : {
                          uri:
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="
                        }
                  }
                />

                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
