/**
 * bootstrapのボタンを作成する関数
 * @param {string} text ボタン内のテキスト
 * @param {string} type bootstrapボタンのタイプ（primary,secondaryなど）
 * @param {string} id ボタンタグのid
 * @return {HTMLDivElement} bootstrapのボタンのdiv要素
 */
export const createBootstrapBtn = (text: string, type: string, id: string): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('my-4', 'mx-auto');
  container.style.width = '200px';

  container.innerHTML = `
    <button type="button" id="${id}" class="btn btn-outline-${type} btn-lg btn-block">${text}</button>
  `;

  return container;
};
