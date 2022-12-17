import { createGameArea } from '../components/gameArea';
import { createNextArea } from '../components/nextArea';
import { createScoreArea } from '../components/scoreArea';
import { createPausedModal } from '../components/pausedModal';
import { createTitleArea } from '../components/titleArea';

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

  const titleArea = createTitleArea();
  const scoreArea = createScoreArea();
  const gameArea = createGameArea();
  const nextArea = createNextArea();
  const pausedModal = createPausedModal();

  row.append(gameArea, scoreArea, nextArea);
  grid.append(titleArea, row);
  container.append(grid, pausedModal);

  return container;
};
