/**
 * ゲームエリアのdiv要素を作成する関数
 * @return {HTMLDivElement} ゲームエリアのdiv要素
 */
export const createGameArea = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('col-4');

  container.innerHTML = `
    <div class="field bg-dark mx-auto mb-4"></div>
  `;

  return container;
};
