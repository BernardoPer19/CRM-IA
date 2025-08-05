import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';               // <-- importar cors
import { prisma } from './config/prisma.js';
import { errorHandler } from './error/errorHandler.js';
import { main as seedDB } from './seed/seed.prisma.js';

import { iniciarAuthRouter } from './features/auth/routes/auth.routes.js';
import { iniciarAuthAdminRouter } from './features/auth/routes/adminAuth.routes.js';
import { iniciarProductRouter } from './features/products/routes/products.routes.js';
import { iniciarMessagerRouter } from './features/messagges/routes/message.routes.js';
import { iniciarEmployeeRouter } from './features/empleooys/routes/employees.routes.js';
import { iniciarClientRouter } from './features/clients/routes/clients.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3000',   // Origen permitido (Next.js dev server)
  credentials: true,                 // Permite enviar cookies/autenticación
}));

app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/auth', iniciarAuthRouter({ prisma }));
app.use('/messages', iniciarMessagerRouter(prisma));
app.use('/clients', iniciarClientRouter({ prisma }));
app.use('/employee', iniciarEmployeeRouter({ prisma }));
app.use('/auth/admin', iniciarAuthAdminRouter({ prisma }));
app.use('/products/admin', iniciarProductRouter({ prisma }));

app.get('/seed', async (_req, res) => {
  try {
    await seedDB();
    res.status(200).json({ message: 'Seed ejecutado con éxito' });
  } catch (err) {
    console.error('❌ Error al ejecutar seed:', err);
    res.status(500).json({ error: 'Error al ejecutar seed' });
  }
});

app.get('/', (_req, res) => {
  res.send('API CRM Activa 🚀');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});
