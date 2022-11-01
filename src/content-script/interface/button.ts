import { LOGGER } from '@/content-script/utilities/logger';
import { titleCase } from '@/content-script/core/title-casing';
import { getActiveGitHubTheme } from '@/content-script/interface/theme';
import { BUTTON_ID } from '@/content-script/utilities/constants';

type PullRequestTitleInput = HTMLInputElement;

export function attemptToCreateButton(): void {
  placeButtonNextToTextbox(findPullRequestTitleTextbox());
}

export function spawnObserver(): void {
  // In situations wherein the textbox cannot be found due to dynamic single-page application
  // shenanigans, we use a mutation observer as a fallback to watch the DOM for updates and
  // dynamically create the button whenever the pull request textbox appears
  const observer = new MutationObserver(() => {
    if (document !== null) {
      // This if statement is made necessary by an issue with JSDOM during test execution involving
      // mutation observers: the document is null at unhandled times during the execution of JSDOM's
      // internal notifyMutationObservers() function
      attemptToCreateButton();
    }
  });
  observer.observe(document, { subtree: true, childList: true });
}

function placeButtonNextToTextbox(textbox: PullRequestTitleInput | null): void {
  // This function must be idempotent to prevent situations wherein the button gets created and
  // "mounted" into the interface multiple times
  if (
    textbox !== null &&
    textbox.parentElement !== null &&
    document.getElementById(BUTTON_ID) === null
  ) {
    LOGGER.info('Attaching a title-casing button to the pull request interface...');
    const button = createButtonElement();
    textbox.parentElement.classList.add('prtc-button-parent');
    textbox.parentElement.append(button);
    button.onclick = () => {
      textbox.value = titleCase(textbox.value);
    };
  }
}

function createButtonElement(): HTMLButtonElement {
  const button = document.createElement('button');
  button.id = BUTTON_ID;
  button.innerText = 'tc';
  button.title = 'Title-case the pull request';
  button.type = 'button'; // Prevents clicks from inducing form submission
  button.className = getActiveGitHubTheme();
  return button;
}

function findPullRequestTitleTextbox(): PullRequestTitleInput | null {
  return document.querySelector('#pull_request_title');
}
