import { createBootstrapBtn } from '../components/bootstrapBtn';

/**
 * 結果画面ページを作成する関数
 * @return {HTMLDivElement} 結果画面ページ全体のdiv要素
 */
export const createResultPage = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('bg-lightblue', 'vh-100');

  container.innerHTML = `
    <h1 class="display-4 font-weight-bold text-center py-5">RESULT</h1>
    <p id="score" class="h2 text-center">SCORE : 0</p>
  `;

  const backHomeButton = createBootstrapBtn('BACK HOME', 'primary', 'backHome');
  container.append(backHomeButton);

  return container;
};
