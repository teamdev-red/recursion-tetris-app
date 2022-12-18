/**
 * bootstrapのセレクトを作成する関数
 * @return {HTMLDivElement} bootstrapのボタンのdiv要素
 */
export const createBootstrapSelect = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('mx-auto');
  container.style.width = '200px';

  container.innerHTML = `
    <p>DIFFICULT LEVEL</p>
      <select
        id="difficultyLevel"
        class="custom-select custom-select-lg shadow"
        style="background-color: aliceblue"
      >
        <option value="easy">EASY</option>
        <option value="normal" selected>NORMAL</option>
        <option value="hard">HARD</option>
      </select>
  `;

  return container;
};
