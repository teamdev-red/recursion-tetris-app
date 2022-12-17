/**
 * 次のテトリミノ表示エリアのdiv要素を作成する関数
 * @return {HTMLDivElement} 次のテトリミノ表示エリアのdiv要素
 */
export const createNextArea = (): HTMLDivElement => {
  let container = document.createElement('div');
  // レスポンシブのグリッド幅(スマホ：表示なし, タブレット:50%、　PC：1/3)
  container.classList.add('d-none', 'd-sm-block', 'd-md-block', 'col-sm-6', 'col-lg', 'order-lg-3');

  container.innerHTML = `
    <div class="next-area bg-dark p-2">
      <p class="h5 text-center text-white">NEXT</p>
    </div>
    <div class="hold-area bg-dark p-2">
      <p class="h5 text-center text-white">HOLD</p>
    </div>
  `;

  return container;
};
