import { Router } from 'express';
import { indexController } from '../controller/index.controller.js';

const router = Router()

router.get('/', indexController.index)

export default router