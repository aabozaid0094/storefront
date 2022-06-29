import config from '../config'
import express, { Request, Response } from 'express'
import UserStore from '../models/user.model'
import jwt from 'jsonwebtoken'

const userRoute = express.Router()
const userStore = new UserStore()

userRoute.get('/', async (req: Request, res: Response) => {
    const users = await userStore.index()
    console.log('User index route')
    res.json(users)
})

userRoute.get('/:user_id', async (req: Request, res: Response) => {
    const user = await userStore.show(
        parseInt(req.params.user_id as unknown as string)
    )
    console.log(`User show route: ${JSON.stringify(user)}`)
    res.json(user)
})

userRoute.post('/register', async (req: Request, res: Response) => {
    const { user_email, user_first_name, user_last_name, user_password } =
        req.body
    const user = await userStore.create({
        user_email,
        user_first_name,
        user_last_name,
        user_password,
    })
    console.log(`User create route: ${JSON.stringify(user)}`)
    res.json(user)
})

userRoute.post('/login', async (req: Request, res: Response) => {
    const { user_email, user_password } =
        req.body
    const loggedUser = await userStore.login(
        user_email, user_password
    )
    if (loggedUser != null) {
        const user_token = jwt.sign(loggedUser, config.token)
        res.status(200).send({
            status: "Loged Successfully",
            message: "Loged Successfully",
            data: {...loggedUser, user_token},
        })
    }
})

userRoute.patch('/:user_id', async (req: Request, res: Response) => {
    const { user_email, user_first_name, user_last_name, user_password } =
        req.body
    const modifiedUser = await userStore.edit(
        parseInt(req.params.user_id as unknown as string),
        { user_email, user_first_name, user_last_name, user_password }
    )
    console.log(`User edit route: ${JSON.stringify(modifiedUser)}`)
    res.json(modifiedUser)
})

userRoute.delete('/:user_id', async (req: Request, res: Response) => {
    const deletedUser = await userStore.delete(
        parseInt(req.params.user_id as unknown as string)
    )
    console.log(`User delete route: ${JSON.stringify(deletedUser)}`)
    res.json(deletedUser)
})

export default userRoute
