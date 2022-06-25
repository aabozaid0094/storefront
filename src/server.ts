import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import port from './config'

const usablePort: Number = port ? (port as unknown as Number) : 3000

const app: express.Application = express()
const address: string = `0.0.0.0:${usablePort}`

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(usablePort, function () {
    console.log(`starting app on: ${address}`)
})
