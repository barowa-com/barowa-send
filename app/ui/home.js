const html = require('choo/html');
const raw = require('choo/html/raw');
const { list } = require('../utils');
const archiveTile = require('./archiveTile');
const modal = require('./modal');
const intro = require('./intro');
const assets = require('../../common/assets');

module.exports = function(state, emit) {
  const archives = state.storage.files
    .filter(archive => !archive.expired)
    .map(archive => archiveTile(state, emit, archive));
  let left = '';
  if (state.uploading) {
    left = archiveTile.uploading(state, emit);
  } else if (state.archive.numFiles > 0) {
    left = archiveTile.wip(state, emit);
  } else {
    left = archiveTile.empty(state, emit);
  }

  if (archives.length > 0 && state.WEB_UI.UPLOADS_LIST_NOTICE_HTML) {
    archives.push(html`
      <p
        class="w-full p-2 border-default dark:border-grey-70 rounded-default text-orange-60 bg-yellow-40 text-center leading-normal"
      >
        ${raw(state.WEB_UI.UPLOADS_LIST_NOTICE_HTML)}
      </p>
    `);
  }

  archives.reverse();

  if (archives.length > 0 && state.WEB_UI.SHOW_THUNDERBIRD_SPONSOR) {
    archives.push(html`
      <a
        class="w-full p-2 border-default dark:border-grey-70 rounded-default text-orange-60 bg-yellow-40 text-center leading-normal d-block"
        href="https://www.thunderbird.net/"
      >
        <svg
          width="30"
          height="30"
          class="m-2 mr-3 d-inline-block align-middle"
        >
          <image
            xlink:href="${assets.get('thunderbird-icon.svg')}"
            src="${assets.get('thunderbird-icon.svg')}"
            width="30"
            height="30"
          />
        </svg>
        Sponsored by Thunderbird
      </a>
    `);
  }

  const right =
    archives.length === 0
      ? intro(state)
      : html`
          <div
            class="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-default border border-grey-60 bg-grey-10 dark:border-grey-70 dark:bg-grey-90"
          >
            ${list(
              archives,
              'flex flex-1 min-h-0 w-full flex-col gap-4 overflow-y-auto p-4',
              'w-full'
            )}
          </div>
        `;

  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <section
        class="h-full w-full p-6 md:p-8 overflow-hidden md:flex md:flex-row md:items-stretch"
      >
        <div
          class="flex min-h-0 w-full min-w-0 flex-col flex-1 px-2 md:mr-8 md:px-0"
        >
          ${left}
        </div>
        <div class="mt-6 flex min-h-0 w-full min-w-0 flex-1 flex-col md:mt-0">
          ${right}
        </div>
      </section>
    </main>
  `;
};
