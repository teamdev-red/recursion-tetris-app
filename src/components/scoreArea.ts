/**
 * スコア表示エリアのdiv要素を作成する関数
 * @return {HTMLDivElement} スコア表示エリアのdiv要素
 */
export const createScoreArea = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('mt-4');

  container.innerHTML = `
    <div class="score-area bg-dark text-white mx-auto mx-sm-0 p-2">
      <p class="h5">SCORE</p>
      <p class="h2 text-right" id="score">0</p>
    </div>
  `;

  return container;
};
