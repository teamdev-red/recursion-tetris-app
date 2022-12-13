import { createGameArea } from '../components/gameArea';
import { createNextArea } from '../components/nextArea';
import { createScoreArea } from '../components/scoreArea';

/**
 * ゲーム画面のページを作成する関数
 * @return {HTMLDivElement} ゲーム画面ののdiv要素
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

  row.append(scoreArea, gameArea, nextArea);
  grid.append(row);
  container.append(grid);

  return container;
};
