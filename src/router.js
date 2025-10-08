import express from 'express';
import path from 'path';
import { __dirname } from './dirname.js';

const router = express.Router();

// Rutas estáticas
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/socialMedia.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/socialMedia.html'));
});

router.get('/projects.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/projects.html'));
});
export default router;
