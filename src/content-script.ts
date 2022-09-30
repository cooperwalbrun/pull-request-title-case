import '@/content-script/main.scss';
import { attemptToCreateButton, spawnObserver } from '@/content-script/interface/button';
import { LOGGER } from '@/content-script/utilities/logger';

function main(): void {
  LOGGER.info(`Successfully loaded v${EXTENSION_VERSION} of ${EXTENSION_NAME}!`);
  attemptToCreateButton();
  spawnObserver();
}

main();
