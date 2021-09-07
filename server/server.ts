import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/events.route';
import menuRoutes from './routes/menu.route';
import adminRoutes from './routes/admin.route';
import mailingRoutes from './routes/mailing.route';
import authRoutes from './routes/auth.route'

const app = express();
app.use(cors());
app.use(express.json())


//routes
app.use(`/api/v1/events/`, eventRoutes);
app.use(`/api/v1/menu/`, menuRoutes);
app.use('/api/v1/auth/', authRoutes);
app.use(`/api/v1/innerMailing/`, mailingRoutes);
app.use(`/api/v1/spe1Ce/control/admin/`, adminRoutes);
app.use('*', (req, res) => res.status(404).json({
    error:'No Such Page Exists'
}))

export default app;