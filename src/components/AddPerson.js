import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  ToolbarAndroid,
  FlatList,
  TextInput,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import CustomToolbar from "../components/CustomToolbar";
import * as Const from "../helpers/Const";

import { Card, Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";

import sampleData from "../helpers/RawData";
var sortJsonArray = require("sort-json-array");
import SearchInput, { createFilter } from "react-native-search-filter";
const KEYS_TO_FILTERS = ["name"];
var personData;
var ds = [];

const items = [
  { name: "TURQUOISE", code: "#1abc9c" },
  { name: "EMERALD", code: "#2ecc71" },
  { name: "PETER RIVER", code: "#3498db" },
  { name: "AMETHYST", code: "#9b59b6" },
  { name: "WET ASPHALT", code: "#34495e" },
  { name: "GREEN SEA", code: "#16a085" }
];

export default class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      gridPosition: this.props.gridPosition,
      searchTerm: ""
    };
    this.arrayholder = [];
  }
  componentWillMount() {
    console.log("RECEIVED POSITION", this.state.gridPosition);
  }

  searchUpdated(term) {
    console.log("Search query", term);

    this.setState({ searchTerm: term });
    const filteredUsers = this.state.dataSet.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    console.log("filteredUsers", filteredUsers);
    if (term) {
      this.setState({
        dataSet: filteredUsers
      });
    } else {
      this.setState({
        dataSet: sampleData
      });
    }
  }

  componentDidMount() {
    // Retrieves users from storage
    AsyncStorage.getItem("users")
      .then(value => {
        console.log("Get users >> ", value);

        // sort by `name` in ascending order because order is not passed
        console.log(sortJsonArray(JSON.parse(value), "name"));
        this.arrayholder = JSON.parse(value);

        this.setState({
          dataSet: sortJsonArray(JSON.parse(value), "name")
        });
      })
      .done();

    AsyncStorage.getItem("personThumb")
      .then(value => {
        personData = JSON.parse(value);
        console.log("AsyncStorage Person Thumbnails >> ", personData);

        // this.setState({
        //   items: JSON.stringify(value)
        // });
      })
      .done();
  }

  render() {
    const filteredUsers = this.state.dataSet.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <View style={styles.container}>
        <CustomToolbar title={"Create a new Home"} />
        <TextInput
          style={styles.input}
          autoCapitalize={"sentences"}
          autoCorrect={false}
          placeholder="Search..."
          // onChangeText={text => this.SearchFilterFunction(text)}
          onChangeText={term => {
            this.searchUpdated(term);
          }}
        />

        <FlatList
          data={this.state.dataSet}
          numColumns={1}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => Actions.addNewPerson()}
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
  }
  renderRowItem = ({ item, index }) => {
    var str = item.name;
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join("");
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this._setUser(item, index)}
        >
          <View style={{ margin: 10, flexDirection: "row", padding: 5 }}>
            <View>
              <Avatar
                small
                rounded
                source={item.avatar_url ? { uri: item.avatar_url } : null}
                title={acronym}
                onPress={() => this._setUser(item, index)}
                activeOpacity={0.7}
              />
            </View>

            <Text style={styles.text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: "#DEDDE0",
            borderBottomWidth: 1,
            marginLeft: 15,
            marginRight: 15
          }}
        />
      </View>
    );
  };

  _setUser(item, position) {
    personData.splice(this.state.gridPosition, 1, item);

    console.log("After add to thumbnail ", personData);
    AsyncStorage.setItem("personThumb", JSON.stringify(personData));

    Actions.pop();
    Actions.pop();
    Actions.createNewHome({ refresh: {} });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F6"
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
  sTextItem: {
    height: 50,
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18
  },
  sSearchBar: {
    paddingHorizontal: 10,
    margin: 10,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18
  },
  text: {
    alignSelf: "center",
    marginLeft: 10,
    textAlign: "center",
    fontSize: 16,
    color: "black"
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  },

  scontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C1C1C1"
  },
  input: {
    paddingLeft: 10,
    fontSize: 15,
    backgroundColor: "#FFFFFF"
  }
});
