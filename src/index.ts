import { AppError } from '@/lib/app-error';
import { HTTP } from '@/lib/app-error/HTTP';
import logger from '@/lib/logger';

const SEP = '# ----------------------------------------------------------------------- #';

const challengeSelector = process.argv
  .find(argument => argument.match(/^challenge=/gi));

if (!challengeSelector) {
  throw new AppError(HTTP.BAD_REQUEST, `No challenge found for args: ${process.argv}`);
}

const challengeName = challengeSelector.split('=')[1];

// Execute the TS challenge index file in the challenges folder
import(`./challenges/${challengeName}/index`)
  .then(() => {
    logger.info(`\n${SEP}\n#               Challenge ${challengeName} executed successfully.\n${SEP}`);
  })
  .catch((error) => {
    logger.error(new AppError(error));
  });
