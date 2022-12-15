import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

import "./assets/sounds/rotation.mp3";

import "./styles.css";

import { GameState } from "./models/gameState";
import { createGamePlayPage } from "./views/gamePlayPage";

const app = document.querySelector("#app");
const gamePlayPage = createGamePlayPage();
app.appendChild(gamePlayPage);

const gameState = new GameState(gamePlayPage);
gameState.gameStart();
