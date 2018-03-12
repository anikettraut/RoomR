import React, { Component } from "react";
import { Router, Scene, Stack } from "react-native-router-flux";

import CreateRoom from "./components/CreateRoom";
import CreateNewHome from "./components/CreateNewHome";
import AddPerson from "./components/AddPerson";
import AddNewPerson from "./components/AddNewPerson";
import AddRoom from "./components/AddRoom";
import CustomToolbar from "./components/CustomToolbar";

const MyRouter = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Stack key="CreateRoom">
          <Scene key="cr" component={CreateRoom} hideNavBar initial />
          <Scene key="createNewHome" component={CreateNewHome} hideNavBar />
          <Scene key="addPerson" component={AddPerson} hideNavBar />
          <Scene key="addRoom" component={AddRoom} hideNavBar />
          <Scene key="addNewPerson" component={AddNewPerson} hideNavBar />
        </Stack>
      </Scene>
    </Router>
  );
};

export default MyRouter;
