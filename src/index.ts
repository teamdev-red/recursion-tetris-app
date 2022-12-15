import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

import "./styles.css";

import { GameState } from "./models/gameState";
import { createGamePlayPage } from "./views/gamePlayPage";

const app = document.querySelector("#app");
const gamePlayPage = createGamePlayPage();
app.appendChild(gamePlayPage);

const gameState = new GameState(gamePlayPage);
gameState.gameStart();
