import express from 'express';
const router = express.Router();
//Busca o AutorController
import AutorController from '../controllers/AutorController.js'
const controle = new AutorController();
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'autor/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/marca/add/ok',upload.single('fotoAutor'),controle.add)
router.post('/' + caminhobase + 'add', controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.edt)
export default router