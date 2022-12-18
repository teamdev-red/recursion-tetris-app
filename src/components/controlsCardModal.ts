/**
 * 操作方法カードのdiv要素を作成する関数
 * @return {HTMLDivElement} 操作方法カードのdiv要素
 */
export const createControlsCardModal = (): HTMLDivElement => {
  let container = document.createElement("div");
  container.classList.add("d-flex", "justify-content-sm-end", "mt-4");

  container.innerHTML = `
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      ${modalHeader()}
      ${modalBody()}
      ${modalFooter()}
    </div>
  </div>
</div>
  `;

  return container;
};

const modalHeader = () => {
  return `
  <div class="modal-header">
  <h5 class="modal-title" id="myModalLabel">How-to</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  `;
};

const modalBody = () => {
  return `
  <div class="modal-body font-weight-bold">
  <div class="d-flex justify-content-between">
    <p>Right arrow key</p>
    <p>Move right</p>
  </div>
  <div class="d-flex justify-content-between">
    <p>Left arrow key</p>
    <p>Move left</p>
  </div>
  <div class="d-flex justify-content-between">
    <p>Up arrow key</p>
    <p>Fall to the bottom</p>
  </div>
  <div class="d-flex justify-content-between">
    <p>Down arrow key</p>
    <p>Move down</p>
  </div>
  <div class="d-flex justify-content-between">
    <p>Space bar</p>
    <p>Rotate</p>
  </div>
  <div class="d-flex justify-content-between">
    <p>Shift Key</p>
    <p>Hold</p>
  </div>
  <div class="d-flex justify-content-between">
    <p>P key</p>
    <p>Pause, Resume</p>
  </div>
  </div>
  `;
};

const modalFooter = () => {
  return `
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  `;
};
