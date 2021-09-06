import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/events.route';
import menuRoutes from './routes/menu.route';
import adminRoutes from './routes/admin.route';
import mailingRoutes from './routes/mailing.routes';

const app = express();
app.use(cors());
app.use(express.json())


//routes
app.use(`/api/v1/events/`, eventRoutes);
app.use(`/api/v1/menu/`, menuRoutes);
app.use('/api/v1/auth/');
app.use(`/api/v1/spe1Ce/control/admin/`, adminRoutes);
app.use(`/api/v1/spe1Ce/control/innerMailing/`, mailingRoutes);
app.use('*', (req, res) => res.status(404).json({
    error:'No Such Page Exists'
}))

export default app;