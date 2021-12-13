import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import {
  HabitController,
  HabitOccurrenceController,
  SessionController,
  UserController,
} from './app/controllers';
import { Authentication } from './app/middlewares';

import swaggerFile from './docs/swagger.json';

const routes = Router();

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

/**
 * Session Routes
 */
routes.post('/login', SessionController.store);
routes.post('/logout', Authentication, SessionController.remove);

/**
 * User Routes
 */
routes.post('/users', UserController.store);

routes.use(Authentication);

/**
 * Habit Routes
 */
routes.get('/habits', HabitController.index);
routes.post('/habits', HabitController.store);
routes.delete('/habits', HabitController.remove);

/**
 * Habit Occurrence Routes
 */
routes.get('/habits/:idHabit/occurrences', HabitOccurrenceController.store);
routes.post('/habits/:idHabit/occurrences', HabitOccurrenceController.store);
routes.delete('/habits/:idHabit/occurrences/:idOccurrence', HabitOccurrenceController.store);

export default routes;
