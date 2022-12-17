import {
  createGameArea,
  createHoldArea,
  createNextArea,
  createPausedModal,
  createScoreArea,
  createTitleArea,
} from '../components';

/**
 * ゲーム画面ページを作成する関数
 * @return {HTMLDivElement} ゲーム画面ページ全体のdiv要素
 */
export const createGamePlayPage = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('bg-lightblue', 'min-vh-100');

  let grid = document.createElement('div');
  grid.classList.add('container');

  let row = document.createElement('div');
  row.classList.add('row');

  const titleArea = createTitleArea();
  const holdArea = createHoldArea();
  const gameArea = createGameArea();
  const nextArea = createNextArea();
  const scoreArea = createScoreArea();
  const pausedModal = createPausedModal();

  // PCサイズの右側エリア（NEXTとSCORE）
  let rightArea = document.createElement('div');
  // レスポンシブのグリッド幅(スマホ：100%, タブレット:50%、　PC：1/3)
  rightArea.classList.add('col-12', 'col-sm-6', 'col-lg', 'order-lg-3');
  rightArea.append(nextArea, scoreArea);

  row.append(gameArea, holdArea, rightArea);
  grid.append(titleArea, row);
  container.append(grid, pausedModal);

  return container;
};
