import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  Button,
  ToolbarAndroid,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Alert,
  Modal
} from "react-native";

import CustomToolbar from "../components/CustomToolbar";
import * as Const from "../helpers/Const";
import MultipleTags from "react-native-multiple-tags";
import { Card, Avatar, List, ListItem } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import PopupDialog, {
  SlideAnimation,
  DialogTitle
} from "react-native-popup-dialog";
import { RNCamera } from "react-native-camera";
const tags = ["Cooking", "Music", "Wekends", "Coffee", "Running"];

var users = [];
const slideAnimation = new SlideAnimation({
  slideFrom: "bottom"
});
var personData;

export default class ListSecondary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data,
      position: "",
      modalVisible: false,
      selectedPerson: "",
      selectedPersonPosition: ""
    };

    users = this.props.data;
    console.log("ListSecondary constructor Users >>>>", users);
  }

  componentWillMount() {
    AsyncStorage.getItem("personThumb")
      .then(value => {
        console.log("Person Thumbnails >> ", value);
        users = JSON.parse(value);
        // personData = JSON.parse(value);

        // this.setState({
        //   items: JSON.stringify(value)
        // });
      })
      .done();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    this.setState({
      items: this.props.data
    });
  }

  _removePerson() {
    var ds = users;
    var pos = this.state.selectedPersonPosition;
    console.log("Deleting  item at position ", pos);

    users.splice(pos, 1, { name: "" });
    console.log("personData ", users);

    AsyncStorage.setItem("personThumb", JSON.stringify(users));

    this.popupDialog.dismiss();
    Actions.pop();
    Actions.pop();
    Actions.createNewHome({ data: users, position: pos });
  }

  render() {
    console.log(" Render State --->", this.state.items);
    if (this.props.data.name) {
      if (this.props.position !== -1) {
        users[this.props.position] = this.props.data;
      }
    }
    console.log(" Render Props--->", users);

    return (
      <View>
        <FlatList
          style={
            {
              // backgroundColor: "green",
            }
          }
          data={users}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
          numColumns={3}
        />

        <PopupDialog
          dialogTitle={<DialogTitle title="Edit User" />}
          width={0.9}
          height={1}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <ScrollView contentContainerStyle={styles.contentContainer}>
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
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
                marginTop: 20,
                marginLeft: 50,
                marginRight: 50,
                alignItems: "center"
              }}
            >
              <Avatar
                large
                rounded
                icon={{ name: "user" }}
                avatarStyle={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                // source={{ uri: this.state.path }}
                source={
                  this.state.selectedPerson.avatar_url
                    ? { uri: this.state.selectedPerson.avatar_url }
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
                backgroundColor: "#FFF"
              }}
            >
              <TextInput
                style={{
                  fontSize: 20,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  flex: 1,
                  marginTop: 5,
                  color: "black",
                  textAlign: "center"
                }}
                autoCorrect={false}
                value={
                  this.state.selectedPerson.name +
                  ", " +
                  this.state.selectedPerson.id
                }
                onChangeText={text => this.setState({ name: text })}
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

            <View>
              <TouchableOpacity
                style={styles.editScreenButton}
                onPress={() => this.popupDialog.dismiss()}
                underlayColor="#fff"
              >
                <Text
                  style={{
                    color: "#000",
                    textAlign: "center",
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 5,
                    paddingTop: 5
                  }}
                >
                  Edit Person
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={() => this._removePerson()}
                underlayColor="#fff"
              >
                <Text style={styles.submitText}>Remove from Profile</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </PopupDialog>
      </View>

      // <View style={{ flex: 1, flexDirection: "row" }}>
      //   {users.map((item, index) => {
      //     return (
      //       <ScrollView>
      //         <View>
      //           <Avatar
      //             medium
      //             rounded
      //             icon={{ name: "add" }}
      //             // onPress={() => Actions.addPerson({ gridPosition: index })}
      //             onPress={() => this._editProfile(item, index)}
      //             containerStyle={{ flex: 1, marginTop: 75 }}
      //             activeOpacity={0.7}
      //             source={{ uri: item.avatar_url }}
      //           />
      //           <Text>{item.name}</Text>
      //         </View>
      //       </ScrollView>
      //     );
      //   })}

      // </View>
    );
  }

  _editProfile(personInfo, index) {
    // alert("_editProfile");
    console.log("Selected person is ", personInfo);
    if (personInfo.name) {
      this.setState({ selectedPerson: personInfo });
      this.setState({ selectedPersonPosition: index });
      this.popupDialog.show();
    } else {
      //this.props.addPerson(index)
      Actions.addPerson({ gridPosition: index });
    }
  }

  renderRowItem = ({ item, index }) => {
    console.log("ItemData --->", item);

    return (
      <View style={{ marginLeft: 15, justifyContent: "space-between" }}>
        <Avatar
          medium
          rounded
          icon={{ name: "add" }}
          // onPress={() => Actions.addPerson({ gridPosition: index })}
          onPress={() => this._editProfile(item, index)}
          containerStyle={{ flex: 1, marginTop: 20 }}
          activeOpacity={0.7}
          source={{ uri: item.avatar_url }}
        />
        <Text
          style={{
            flex: 1,
            alignItems: "stretch"
          }}
        >
          {item.name}
        </Text>
      </View>
    );
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
  loginScreenButton: {
    backgroundColor: "red",
    padding: 10,

    borderColor: "#fff"
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,

    paddingRight: 10
  },
  buttonStyle: {
    backgroundColor: "#aaa"
  }
});
