/**
 * ホールドしたテトリミノ表示エリアのdiv要素を作成する関数
 * @return {HTMLDivElement} ホールドしたテトリミノ表示エリアのdiv要素
 */
export const createHoldArea = (): HTMLDivElement => {
  let container = document.createElement("div");
  container.classList.add("d-flex", "justify-content-sm-end");

  container.innerHTML = `
    <div class="hold-area bg-dark p-2 d-flex flex-column justify-content-center align-items-center">
      <p class="h5 text-center text-white">HOLD</p>
    </div>
  `;

  return container;
};
