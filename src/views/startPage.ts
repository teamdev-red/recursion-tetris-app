import { createBootstrapBtn } from '../components/bootstrapBtn';
import { createBootstrapSelect } from '../components/bootstrapSelect';

/**
 * スタート画面ページを作成する関数
 * @return {HTMLDivElement} スタート画面ページ全体のdiv要素
 */
export const createStartPage = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('bg-lightblue', 'vh-100');
  container.innerHTML = `
  <h1 class="display-2 font-weight-bold text-center py-5">TETRIS</h1>
  `;

  const startButton = createBootstrapBtn('GAME START', 'primary', 'gameStart');
  const difficultyLevel = createBootstrapSelect();

  container.append(startButton, difficultyLevel);

  return container;
};
