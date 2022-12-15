import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

import "./assets/sounds/rotation.mp3";

import "./styles.css";

import { GameState } from "./models/gameState";

let app = document.querySelector("#app");
let can = document.createElement("canvas");
app.appendChild(can);

const gameState = new GameState(can);
gameState.gameStart();
