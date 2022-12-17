/**
 * タイトルエリアのdiv要素を作成する関数
 * @return {HTMLDivElement} タイトルエリアのdiv要素
 */
export const createTitleArea = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('row');

  container.innerHTML = `
    <div class="col-4 mx-auto">
      <div class="d-flex justify-content-center align-items-center">
        <h1 class="text-center py-3 mr-3 mb-0">TETRIS</h1>
        <div id="pauseButton">
          <i class="fa-solid fa-circle-play fa-2x text-secondary clickable"></i>
        </div>
      </div>
    </div>
  `;

  return container;
};
