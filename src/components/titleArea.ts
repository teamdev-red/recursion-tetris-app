/**
 * タイトルエリアのdiv要素を作成する関数
 * @return {HTMLDivElement} タイトルエリアのdiv要素
 */
export const createTitleArea = (): HTMLDivElement => {
  let container = document.createElement("div");
  container.classList.add("row");

  container.innerHTML = `
    <div class="col-4 mx-auto">
      <div class="d-flex justify-content-center align-items-center">
        <h1 id="game-title" class="text-center py-3 mr-3 mb-0 clickable">TETRIS</h1>
        <div id="pauseButton">
          <i class="fa-solid fa-circle-pause fa-2x text-secondary clickable"></i>
        </div>
        <div type="button" data-toggle="modal" data-target="#myModal">
          <i class="fa-solid fa-circle-question fa-2x text-secondary clickable ml-2"></i>
        </div>
      </div>
    </div>
  `;

  return container;
};
