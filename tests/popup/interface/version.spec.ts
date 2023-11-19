import { setVersionNumber } from '@/popup/interface/version';

test('setVersionNumber()', () => {
  document.body.innerHTML = '<span class="version"></span>';

  expect(document.querySelector<HTMLSpanElement>('.version')?.textContent).toEqual('');
  setVersionNumber();
  expect(document.querySelector<HTMLSpanElement>('.version')?.textContent).not.toEqual('');
});
