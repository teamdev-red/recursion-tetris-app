import { createGameArea } from '../components/gameArea';
import { createNextArea } from '../components/nextArea';
import { createScoreArea } from '../components/scoreArea';
import { createPausedModal } from '../components/pausedModal';

/**
 * ゲーム画面ページを作成する関数
 * @return {HTMLDivElement} ゲーム画面ページ全体のdiv要素
 */
export const createGamePlayPage = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('bg-lightblue', 'vh-100');

  let grid = document.createElement('div');
  grid.classList.add('container');

  let row = document.createElement('div');
  row.classList.add('row');

  const scoreArea = createScoreArea();
  const gameArea = createGameArea();
  const nextArea = createNextArea();
  const pausedModal = createPausedModal();

  row.append(scoreArea, gameArea, nextArea);
  grid.append(row);
  container.append(grid, pausedModal);

  return container;
};
