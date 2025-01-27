import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { __dirname } from './dirname.js';
import shopRouter from './shopRouter.js';

const app = express();

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', mustacheExpress(), "html");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public'));

// Usa express.json() para procesar datos en formato JSON
app.use(express.json());

// Usa express.urlencoded() para procesar datos de formularios (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use('/', shopRouter);

app.listen(3000, () => console.log('Listening on port 3000!'));
