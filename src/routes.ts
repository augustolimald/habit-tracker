import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { body, query } from 'express-validator';

import {
  HabitController,
  HabitOccurrenceController,
  SessionController,
  UserController,
} from './app/controllers';
import { Authentication, Validation } from './app/middlewares';

import swaggerFile from './docs/swagger.json';

const routes = Router();

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

/**
 * Session Routes
 */
routes.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha inválida'),
  ],
  Validation,
  SessionController.store,
);

routes.post('/logout', Authentication, SessionController.remove);

/**
 * User Routes
 */
routes.post(
  '/users',
  [
    body('name').isLength({ min: 3 }).withMessage('Nome inválido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha inválida'),
  ],
  Validation,
  UserController.store,
);

routes.use(Authentication);

/**
 * Habit Routes
 */
routes.get(
  '/habits',
  [
    query('page').isInt({ min: 1 }).optional().withMessage('Página inválida'),
    query('amount').isInt({ min: 1 }).optional().withMessage('Quantidade inválida'),
  ],
  Validation,
  HabitController.index,
);

routes.post(
  '/habits',
  [body('name').isLength({ min: 3 }).withMessage('Nome inválido')],
  Validation,
  HabitController.store,
);

routes.delete('/habits/:idHabit', HabitController.remove);

/**
 * Habit Occurrence Routes
 */
routes.get('/habits/:idHabit/occurrences', HabitOccurrenceController.index);

routes.post(
  '/habits/:idHabit/occurrences',
  [body('measure').isNumeric().optional()],
  Validation,
  HabitOccurrenceController.store,
);

routes.delete('/habits/:idHabit/occurrences/:idOccurrence', HabitOccurrenceController.remove);

export default routes;
