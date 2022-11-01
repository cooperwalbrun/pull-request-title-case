export function setVersionNumber(): void {
  const versionElement = document.querySelector<HTMLSpanElement>('.version');
  if (versionElement !== null) {
    versionElement.textContent = `v${EXTENSION_VERSION}`;
  }
}
