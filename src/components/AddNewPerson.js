import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage,
  Alert,
  Image
} from "react-native";
import { Card, ListItem, Button, Input, Avatar } from "react-native-elements";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Camera from "react-native-camera";
import { Actions } from "react-native-router-flux";
import { RNCamera } from "react-native-camera";
import CustomToolbar from "../components/CustomToolbar";
import MultipleTags from "react-native-multiple-tags";

const tags = ["Cooking", "Music", "Wekends", "Coffee", "Running"];

var ds = [];

export default class AddNewPerson extends Component {
  constructor(props) {
    super(props);
    console.log(props, "detailProps");

    this.camera = null;

    this.state = {
      path: this.props.path,
      openCamera: false,
      content: [],
      dataSet: [],
      name: "",
      age: ""
    };
    this.takePicture = this.takePicture.bind(this);
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log("camera response", data.uri);
      this.setState({
        openCamera: false,
        path: data.uri
      });
    }
  }

  componentWillMount() {
    AsyncStorage.getItem("users")
      .then(value => {
        console.log("Add room >> ", value);
        ds = value;
        this.setState({
          dataSet: JSON.stringify(value)
        });
      })
      .done();
  }

  _addGuest() {
    console.log("Name", this.state.name);
    if (this.state.name == null) {
      alert("Enter Name");
      return;
    }
    if (this.state.age == null) {
      alert("Enter Age");
      return;
    }
    console.log("_addRomm=====>", typeof ds);
    var roomDetails = {
      id: this.state.age,
      name: this.state.name,
      email: "dido@gmail.com",
      address: "xx-xx-xxxx,x - street, x - country",
      gender: "female",
      avatar_url:
        this.state.path,
      phone: {
        mobile: "+91 0000000000",
        home: "00 000000",
        office: "00 000000"
      }
    };
    ds = JSON.parse(ds);
    ds.push(roomDetails);
    console.log("After _addRomm", ds);
    AsyncStorage.setItem("users", JSON.stringify(ds));

    Alert.alert(
      "Roomr",
      "Person Added Successfully!!",
      [{ text: "OK", onPress: this._onPressButton }],
      { cancelable: false }
    );
  }

  _onPressButton = () => {
    Actions.pop();
    Actions.pop();
    Actions.addPerson({ refresh: {} });
  };

  render() {
    return (
      // implemented with Text and Button as children
      <View style={{ flex: 1, backgroundColor: "#F7F6F6" }}>
        <CustomToolbar title={"Add a New Person"} />
        {this.state.openCamera ? (
          <View style={styles.Cameracontainer}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={"Permission to use camera"}
              permissionDialogMessage={
                "We need your permission to use your camera phone"
              }
            />
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={this.takePicture}
                style={styles.capture}
              >
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              permissionDialogTitle={"Permission to use camera"}
              permissionDialogMessage={
                "We need your permission to use your camera phone"
              }
            />

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
                marginTop: 20,
                alignItems: "center"
              }}
            >
              <Avatar
                xlarge
                rounded
                icon={{ name: "user" }}
                avatarStyle={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                // source={{ uri: this.state.path }}
                source={
                  this.state.path
                    ? { uri: this.state.path }
                    : require("../images/icons8-user-male-48.png")
                }
                onPress={() => this.setState({ openCamera: true })}
                activeOpacity={0.7}
                containerStyle={{
                  flex: 5,
                  borderWidth: 2,
                  borderColor: "#412277"
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#F7F6F6"
              }}
            >
              <TextInput
                style={{
                  marginTop: 15,
                  fontSize: 15,
                  flex: 0.5,
                  color: "black",
                  paddingLeft: 20
                }}
                autoCorrect={false}
                value="Name"
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
                  paddingLeft: 20
                }}
                autoCorrect={false}
                value="Age"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#FFF"
              }}
            >
              <TextInput
                style={{
                  fontSize: 15,
                  flex: 0.5,
                  color: "black",
                  paddingLeft: 20
                }}
                autoCorrect={false}
                placeholder="Anand"
                onChangeText={text => this.setState({ name: text })}
                underlineColorAndroid="transparent"
              />

              <TextInput
                style={{
                  marginTop: 15,
                  fontSize: 15,
                  color: "black",
                  flex: 0.5,
                  paddingLeft: 20
                }}
                autoCorrect={false}
                placeholder="26"
                onChangeText={text => this.setState({ age: text })}
                underlineColorAndroid="transparent"
              />
            </View>

            <View
              style={{
                padding: 10,
                backgroundColor: "#F7F6F6",
                color: "red"
              }}
            >
              <MultipleTags
                tags={tags}
                search
                onChangeItem={content => {
                  this.setState({ content });
                }}
                title="Tags"
                visibleOnOpen={true}
                defaultInstructionOpen="Add Tags"
              />
            </View>
          </ScrollView>
        )}

        {!this.state.openCamera ? (
          <TouchableOpacity
            style={styles.button}
            onPress={this._addGuest.bind(this)}
          >
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
                Add
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
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
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  Cameracontainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#44B3E4",

    alignItems: "center",
    justifyContent: "center",

    padding: 10
  }
});
