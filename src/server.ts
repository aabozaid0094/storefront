import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config'
import productRoute from './routes/product.route'
import userRoute from './routes/user.route'

const usablePort: number = config.port
    ? (config.port as unknown as number)
    : 3000

const app: express.Application = express()
const address: string = `0.0.0.0:${usablePort}`

const corsOptions = {
    origin: address,
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use('/product', productRoute)
app.use('/user', userRoute)

app.get('/', function (req: Request, res: Response) {
    res.send('Storefront Home')
})

app.listen(usablePort, function () {
    console.log(`starting app on: ${address}`)
})
