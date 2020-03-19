import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import validateSessionStore from './app/validators/SessionStore';
import validateOrderStore from './app/validators/OrderStore';
import validateOrderUpdate from './app/validators/OrderUpdate';
import validateDeliveryUpdate from './app/validators/DeliveryUpdate';
import validateDeliverymanStore from './app/validators/DeliverymanStore';
import validateDeliverymanUpdate from './app/validators/DeliverymanUpdate';
import validateDeliveryProblemStore from './app/validators/DeliveryProblemStore';
import validateRecipientStore from './app/validators/RecipientStore';
import validateRecipientUpdate from './app/validators/RecipientUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.get('/deliveryman/:id/deliveries', DeliveryController.index);
routes.get(
  '/deliveryman/:deliverymanId/deliveries/:orderId',
  DeliveryController.show
);
routes.put(
  '/deliveryman/:deliverymanId/deliveries/:orderId',
  validateDeliveryUpdate,
  DeliveryController.update
);

routes.get('/deliverymen/:id', DeliverymanController.show);

routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.post(
  '/delivery/:id/problems',
  validateDeliveryProblemStore,
  DeliveryProblemController.store
);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  validateRecipientUpdate,
  RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverymen', DeliverymanController.index);
routes.post(
  '/deliverymen',
  validateDeliverymanStore,
  DeliverymanController.store
);
routes.put(
  '/deliverymen/:id',
  validateDeliverymanUpdate,
  DeliverymanController.update
);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/orders', OrderController.index);
routes.get('/orders/:id', OrderController.show);
routes.post('/orders', validateOrderStore, OrderController.store);
routes.put('/orders/:id', validateOrderUpdate, OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/delivery/problems', DeliveryProblemController.index);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

export default routes;
