/**
 * 操作方法カードのdiv要素を作成する関数
 * @return {HTMLDivElement} 操作方法カードのdiv要素
 */
export const createControlsCard = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('d-flex', 'justify-content-sm-end', 'mt-4');

  container.innerHTML = `
    <div class="controls-card d-flex justify-content-center shadow-lg py-3 bg-light rounded">
      <div>
        <p class="font-weight-bold">右矢印キー：右に移動</p>
        <p class="font-weight-bold">左矢印キー：左に移動</p>
        <p class="font-weight-bold">上矢印キー：一番下まで落下</p>
        <p class="font-weight-bold">下矢印キー：下に移動</p>
        <p class="font-weight-bold">スペースキー：回転</p>
        <p class="font-weight-bold">シフトキー：ホールド</p>
        <p class="font-weight-bold">Pキー：ポーズ，再開</p>
      </div>
    </div>
  `;

  return container;
};
