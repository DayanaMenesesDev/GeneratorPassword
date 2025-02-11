import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { PORT, HOST } from './config/config.js';
import router from './routes/index.routes.js';

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs')
app.set('views', join(__dirname, '/views'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, '/public/img')))
app.use(express.static(join(__dirname, '/public/css')))
app.use(express.static(join(__dirname, '/public/js')))

app.use(router)

app.listen(PORT, ()=> {
    console.log(`Server runing on port: ${HOST}`);
})