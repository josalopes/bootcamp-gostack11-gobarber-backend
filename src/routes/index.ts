import { Router } from 'express';
// import appointments from './appointments.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
