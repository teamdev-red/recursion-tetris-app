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
    <select class="custom-select custom-select-lg" style="background-color: aliceblue;">
      <option value="500">EASY</option>
      <option value="400" selected>NORMAL</option>
      <option value="300">HARD</option>
    </select>  
  `;

  return container;
};
