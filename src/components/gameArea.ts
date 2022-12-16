/**
 * ゲームエリアのdiv要素を作成する関数
 * @return {HTMLDivElement} ゲームエリアのdiv要素
 */
export const createGameArea = (): HTMLDivElement => {
  let container = document.createElement('div');
  // レスポンシブのグリッド幅(スマホ：100%, タブレット:100%、　PC：1/3)
  container.classList.add('col-12', 'col-lg', 'order-lg-2');

  container.innerHTML = `
    <div class="field bg-dark mx-auto mb-4 mb-md-5"></div>
  `;

  return container;
};
