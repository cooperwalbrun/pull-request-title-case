import fs from 'fs';
import path from 'path';
import { attemptToCreateButton, spawnObserver } from '@/content-script/interface/button';
import { GitHubTheme } from '@/content-script/interface/theme';
import userEvent from '@testing-library/user-event';
import { awaitableTimeout, setTheme } from '../../utilities';

function getButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>('.prtc-button-parent > #prtc-button');
}

function buildMockDOM(): void {
  // Set up and validate the mock HTML data
  const pullRequestPageBody = fs.readFileSync(
    path.join(__dirname, '../mocks/pull-request-page-body.html'),
    'utf-8'
  );
  document.body.innerHTML = pullRequestPageBody;
  setTheme(GitHubTheme.LIGHT_DEFAULT);
}

function tearDownMockDOM(): void {
  document.body.innerHTML = '';
}

beforeEach(() => {
  tearDownMockDOM();
});

test('attemptToCreateButton()', async () => {
  buildMockDOM();
  const textbox = document.querySelector<HTMLInputElement>('#pull_request_title');
  expect(textbox).not.toBeNull();

  expect(getButton()).toBeNull();
  attemptToCreateButton();
  const button = getButton();
  expect(button).not.toBeNull();

  // Assert on the behavior of clicking the button
  if (textbox !== null && button !== null) {
    const user = userEvent.setup();
    textbox.value = 'testing';
    await user.pointer({ target: button, keys: '[MouseLeft]' });
  }
  // The assertion below is intentionally left outside the null guard condition so that it fails if
  // the textbox element is null
  expect(textbox?.value).toEqual('Testing');
});

test('spawnObserver()', async () => {
  expect(getButton()).toBeNull();
  spawnObserver();
  expect(getButton()).toBeNull();
  buildMockDOM();
  await awaitableTimeout(500); // Gives the JSDOM framework a chance to notify our observer(s)
  expect(getButton()).not.toBeNull();
});
