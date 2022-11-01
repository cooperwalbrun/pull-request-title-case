import '@/popup/main.scss';
import { setVersionNumber } from '@/popup/interface/version';

function main(): void {
  setVersionNumber();
}

main(); // See: https://stackoverflow.com/q/66949098
