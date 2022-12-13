/**
 * ゲームエリアのdiv要素を作成する関数
 * @return {HTMLDivElement} ゲームエリアのdiv要素
 */
export const createGameArea = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('col-4');

  container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
      <h1 class="text-center py-3 mr-3 mb-0">TETRIS</h1>
      <i class="fa-solid fa-circle-pause fa-2x text-secondary clickable"></i>
    </div>
    <div class="field bg-dark mx-auto"></div>
  `;

  return container;
};
