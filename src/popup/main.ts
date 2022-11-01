import '@/popup/main.scss';

function main(): void {
  const versionElement = document.querySelector<HTMLSpanElement>('.version');
  if (versionElement !== null) {
    versionElement.innerText = `v${EXTENSION_VERSION}`;
  }
}

main(); // See: https://stackoverflow.com/q/66949098
