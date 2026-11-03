import express from 'express';
const router = express.Router();

import SiteController from '../controllers/SiteController.js';

const controle = new SiteController();

const caminhobase = '/site';

router.get(caminhobase, controle.home);
router.get(caminhobase + '/login', controle.login);
router.get(caminhobase + '/conta', controle.login);
router.get(caminhobase + '/acervo', controle.acervo);
router.get(caminhobase + '/autores', controle.autores);
router.get(caminhobase + '/avaliacoes', controle.avaliacoes);
router.get(caminhobase + '/livro-detalhe', controle.livroDetalhe);

export default router;
