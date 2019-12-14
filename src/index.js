import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebaseAppInit, { appService } from "./libraries/firebase";
import dotenv from "dotenv";

dotenv.config();
firebaseAppInit();
ReactDOM.render(<App firebase={appService} />, document.getElementById("root"));

serviceWorker.unregister();
