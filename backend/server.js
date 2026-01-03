import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Allow any local dev origin (3000, 5173, etc.) while developing
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'KiranaConnect backend up' });
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`KiranaConnect backend listening on port ${PORT}`);
});
