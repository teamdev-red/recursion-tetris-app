import {
  createControlsCard,
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
  const controlsCard = createControlsCard();
  const pausedModal = createPausedModal();

  // PCサイズの左側エリア（HOLDと操作方法）
  let leftArea = document.createElement('div');
  // レスポンシブのグリッド幅(スマホ：表示なし, タブレット:50%、PC：1/3)
  leftArea.classList.add(
    'd-none',
    'd-sm-block',
    'd-md-block',
    'col-12',
    'col-sm-6',
    'col-lg',
    'order-lg-1'
  );
  leftArea.append(holdArea, controlsCard);

  // PCサイズの右側エリア（NEXTとSCORE）
  let rightArea = document.createElement('div');
  // レスポンシブのグリッド幅(スマホ：100%, タブレット:50%、　PC：1/3)
  rightArea.classList.add('col-12', 'col-sm-6', 'col-lg', 'order-lg-3');
  rightArea.append(nextArea, scoreArea);

  row.append(gameArea, leftArea, rightArea);
  grid.append(titleArea, row);
  container.append(grid, pausedModal);

  return container;
};
