/**
 * スコア表示エリアのdiv要素を作成する関数
 * @return {HTMLDivElement} スコア表示エリアのdiv要素
 */
export const createHoldArea = (): HTMLDivElement => {
  let container = document.createElement('div');
  // レスポンシブのグリッド幅(スマホ：表示なし, タブレット:50%、PC：1/3)
  container.classList.add(
    'd-none',
    'd-sm-block',
    'd-md-block',
    'col-12',
    'col-sm-6',
    'col-lg',
    'order-lg-1'
  );

  container.innerHTML = `
    <div class="d-flex justify-content-sm-end">
      <div class="hold-area bg-dark p-2">
        <p class="h5 text-center text-white">HOLD</p>
      </div>
    </div>  
  `;

  return container;
};
