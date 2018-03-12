import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ToolbarAndroid,
  DatePickerAndroid,
  Image,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import CustomToolbar from "../components/CustomToolbar";

import { Card, Button, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { items } from "../helpers/Const";
import Option from "../components/Option";
import FontAwesome, { Icons } from "react-native-fontawesome";


export default class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: "22 June 2017",
      dataSet: [],
      selected: true,
      gender: true
    };
  }

  handleClick = () => {
    console.log("this is:", this);
    Actions.addPerson();
  };

  componentDidMount() {
    AsyncStorage.getItem("users")
      .then(value => {
        console.log("Add room >> ", value);
        this.setState({
          dataSet: JSON.stringify(value)
        });
      })
      .done();
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
  }

  async openAndroidDatePicker() {
    try {
      console.log("openAndroidDatePicker");
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action == DatePickerAndroid.dateSetAction) {
        console.log(year + " " + month + " " + day);

        var dateVal = new Date(year, month, day);
        month = month + 1;
        if (day < 10) {
          day = "0" + day;
        }
        if (month < 10) {
          month = "0" + month;
        }
        var NewDate = day + "/" + month + "/" + year;
        console.log("Selected Date is: " + NewDate);
        this.setState({
          selectedDate: NewDate
        });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomToolbar title={"Add Room"} />

        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: "#F7F6F6",
              flexDirection: "column"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <Text
                style={{
                  margin: 10,
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: 18,
                  flex: 0.5,
                  fontWeight: "bold"
                }}
              >
                Suitable for
              </Text>

              <Text
                style={{
                  margin: 10,
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: 18,
                  flex: 0.5,
                  fontWeight: "bold"
                }}
              >
                Male or Female
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 20,
                marginTop: 5,
                marginRight: 20
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 5,
                  marginRight: 10
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    borderRadius: 8,
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "white",

                    borderWidth: 0.5,
                    borderColor: "#d6d7da"
                  }}
                  onPress={() =>
                    this.setState({
                      selected: this.state.selected ? false : true
                    })
                  }
                >
                  <FontAwesome
                    style={{
                      fontSize: 32,
                      color: this.state.selected ? "#44237C" : "#DAD9D9",
                      backgroundColor: "transparent"
                    }}
                  >
                    {Icons.user}
                  </FontAwesome>
                </TouchableOpacity>
                <Text style={{ margin: 10, fontSize: 15, textAlign: "left" }}>
                  1 Person
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  marginTop: 5,
                  marginRight: 10
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    borderRadius: 8,
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "white",

                    borderWidth: 0.5,
                    borderColor: "#d6d7da"
                  }}
                  onPress={() =>
                    this.setState({
                      selected: this.state.selected ? false : true
                    })
                  }
                >
                  <FontAwesome
                    style={{
                      fontSize: 32,
                      color: this.state.selected ? "#DAD9D9" : "#44237C",
                      backgroundColor: "transparent"
                    }}
                  >
                    {Icons.users}
                  </FontAwesome>
                </TouchableOpacity>
                <Text style={{ margin: 10, fontSize: 15, textAlign: "left" }}>
                  2 Sharing
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  marginTop: 5,
                  marginLeft: 30,
                  marginRight: 10
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    borderRadius: 8,
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "white",

                    borderWidth: 0.5,
                    borderColor: "#d6d7da"
                  }}
                  onPress={() =>
                    this.setState({
                      gender: this.state.gender ? false : true
                    })
                  }
                >
                  <FontAwesome
                    style={{
                      fontSize: 32,
                      color: this.state.gender ? "#44237C" : "#DAD9D9",
                      backgroundColor: "transparent"
                    }}
                  >
                    {Icons.male}
                  </FontAwesome>
                </TouchableOpacity>
                <Text style={{ margin: 10, fontSize: 15, textAlign: "left" }}>
                  Male
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  marginTop: 5,
                  marginRight: 10
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    borderRadius: 8,
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "white",
                    height: 50,
                    width: 50,
                    borderWidth: 0.5,
                    borderColor: "#d6d7da"
                  }}
                  onPress={() =>
                    this.setState({
                      gender: this.state.gender ? false : true
                    })
                  }
                >
                  <FontAwesome
                    style={{
                      fontSize: 32,
                      color: this.state.gender ? "#DAD9D9" : "#44237C",
                      backgroundColor: "transparent"
                    }}
                  >
                    {Icons.female}
                  </FontAwesome>
                </TouchableOpacity>
                <Text style={{ margin: 10, fontSize: 15, textAlign: "left" }}>
                  Female
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: "black",
                marginLeft: 20,
                marginTop: 5,
                fontSize: 16
              }}
            >
              Monthly Cost
            </Text>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="$550"
              keyboardType="numeric"
            />

            <TextInput
              style={styles.inputHeader}
              autoCorrect={false}
              value="Security Deposit"
              underlineColorAndroid="transparent"
              editable={false}
              selectTextOnFocus={false}
            />
            <TextInput
              style={styles.input}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              placeholder="$550"
            />

            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <TextInput
                style={{
                  marginTop: 15,
                  fontSize: 15,
                  flex: 0.5,
                  color: "black",
                  paddingLeft: 20,
                  backgroundColor: "#F7F6F6"
                }}
                autoCorrect={false}
                value="Available from"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />

              <TextInput
                style={{
                  marginTop: 15,
                  fontSize: 15,
                  color: "black",
                  flex: 0.5,
                  paddingLeft: 20,
                  backgroundColor: "#F7F6F6"
                }}
                autoCorrect={false}
                value="Term Length"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  fontSize: 15,
                  flex: 0.5
                }}
                onPress={this.openAndroidDatePicker}
              >
                <TextInput
                  style={{
                    flex: 0.5,
                    color: "black",
                    paddingLeft: 20,
                    backgroundColor: "#FFF"
                  }}
                  autoCorrect={false}
                  placeholder={this.state.selectedDate}
                  value={this.state.selectedDate}
                  underlineColorAndroid="transparent"
                  editable={false}
                  selectTextOnFocus={false}
                />
              </TouchableOpacity>

              <TextInput
                style={{
                  marginTop: 15,
                  fontSize: 15,
                  color: "black",
                  flex: 0.5,
                  paddingLeft: 20,
                  backgroundColor: "#FFF"
                }}
                autoCorrect={false}
                placeholder="Long Term"
                underlineColorAndroid="transparent"
              />
            </View>

            <TextInput
              style={{
                marginTop: 15,
                fontSize: 15,
                color: "black",
                flex: 0.5,
                paddingLeft: 20,
                backgroundColor: "#F7F6F6"
              }}
              autoCorrect={false}
              value="Brief Discussion of Room"
              underlineColorAndroid="transparent"
              editable={false}
              selectTextOnFocus={false}
            />

            <TextInput
              style={{
                marginTop: 15,
                fontSize: 15,
                flex: 0.5,
                color: "black",
                paddingLeft: 20,
                backgroundColor: "#FFF",
                height: 100,
                textAlignVertical: "top"
              }}
              autoCorrect={false}
              placeholder="Eg. Downstair with the sunlight in the morning."
              multiline={true}
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={{
                marginTop: 15,
                fontSize: 15,
                color: "black",
                flex: 0.5,
                paddingLeft: 20,
                backgroundColor: "#F7F6F6"
              }}
              autoCorrect={false}
              value="Photos of the Room"
              underlineColorAndroid="transparent"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.button}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 18
              }}
            >
              Add Room
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  input: {
    marginTop: 15,
    fontSize: 15,
    paddingLeft: 20,
    backgroundColor: "#FFFFFF"
  },
  inputHeader: {
    marginTop: 15,
    fontSize: 15,
    color: "black",
    paddingLeft: 20,
    backgroundColor: "#F7F6F6"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#44B3E4",

    alignItems: "center",
    justifyContent: "center",

    padding: 10
  }
});
