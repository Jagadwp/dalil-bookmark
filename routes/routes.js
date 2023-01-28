import { Router } from 'express';
import * as ctr from '../controllers/dalils.controller.js';

const router = Router();

router.get('/', ctr.index);

router.get('/dalil', ctr.renderDalils);

router.post('/dalil', ctr.insertDalil);

router.put('/dalil/:id', ctr.updateDalil);

router.delete('/dalil/:id', ctr.deleteDalil);

router.put('/dalil/tag/:id', ctr.addTag);

router.delete('/dalil/tag/:id', ctr.deleteTag);

export default router;
