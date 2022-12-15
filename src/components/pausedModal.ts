/**
 * bootstrapのモーダルを作成する関数
 * @return {HTMLDivElement} bootstrapのモーダルのdiv要素
 */
export const createPausedModal = (): HTMLDivElement => {
  let container = document.createElement('div');
  container.classList.add('modal', 'fade');
  container.setAttribute('id', 'pausedModal');
  container.setAttribute('tabindex', '-1');
  container.setAttribute('role', 'dialog');
  container.setAttribute('aria-hidden', 'true');
  container.setAttribute('data-backdrop', 'static');

  container.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-title text-center border-bottom">
          <p class="h3 my-3">PAUSED</p>
        </div>
        <div class="py-5 text-center">
          <button type="button" class="btn btn-primary mr-2" data-dismiss="modal">
            CONTINUE
          </button>
          <button type="button" class="btn btn-danger">QUIT</button>
        </div>
      </div>
    </div>
  `;

  return container;
};

// ブートストラップのモーダルのドキュメント: https://getbootstrap.jp/docs/4.5/components/modal/#methods
// 「Live demo」のコードを参考に作成
