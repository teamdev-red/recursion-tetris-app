import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

import "./assets/sounds/rotation.mp3";
import "./assets/sounds/ground.mp3";
import "./assets/sounds/clear.mp3";
import "./assets/sounds/play.mp3";
import "./assets/sounds/pause.mp3";
import "./assets/sounds/gameover.mp3";


import "./styles.css";

import { GameState } from "./models/gameState";
import { createGamePlayPage } from "./views/gamePlayPage";

const app = document.querySelector("#app");
const gamePlayPage = createGamePlayPage();
app.appendChild(gamePlayPage);

const gameState = new GameState(gamePlayPage);
