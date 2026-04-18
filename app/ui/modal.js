const html = require('choo/html');

module.exports = function(state, emit) {
  return html`
    <send-modal
      class="absolute inset-0 z-40 overflow-y-auto overflow-x-hidden bg-white dark:bg-black"
    >
      <div
        class="flex min-h-full w-full flex-col items-center justify-center px-4 py-6 md:px-6 md:py-8"
      >
        <div class="w-full">
          ${state.modal(state, emit, close)}
        </div>
      </div>
    </send-modal>
  `;

  function close(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    emit('closeModal');
  }
};
