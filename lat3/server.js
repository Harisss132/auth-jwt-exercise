import express from 'express';
import 'dotenv/config'
import router from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server berjalan pada ${PORT}`);
})