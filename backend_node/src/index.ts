import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import routerAuth from './routes/auth.route'
import routerAdmin from './routes/admin.route'
import routerUser from './routes/user.route'

const app: Application = express()

// settings
app.set('port', process.env.PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb' }))

// routes
app.use(routerAuth);
app.use(routerUser)
app.use(routerAdmin);

const PORT = app.get('port');
const main = () => {
    app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`))
}
  
main();

