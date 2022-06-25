import { User } from '../../types/user.type'
import UserStore from '../../models/user.model'
import config from '../../config'
import bcrypt from 'bcrypt'

const userStore = new UserStore()
const hashPassword = (password: string) =>
    bcrypt.hashSync(`${password}${config.pepper}`, config.salt_rounds)

describe('User Model', () => {
    it('Should have an index', () => {
        expect(userStore.index).toBeDefined()
    })
    it('Should have an create', () => {
        expect(userStore.create).toBeDefined()
    })
    it('Should have an show', () => {
        expect(userStore.show).toBeDefined()
    })
    it('Should have an edit', () => {
        expect(userStore.edit).toBeDefined()
    })
    it('Should have an delete', () => {
        expect(userStore.delete).toBeDefined()
    })
    it('create method should add a user', async () => {
        const created_user = {
            user_email: 'user_email@test.test',
            user_first_name: 'user_first_name',
            user_last_name: 'user_last_name',
            user_password: 'user_password',
        }
        const result = await userStore.create(created_user)
        expect(result).toEqual({
            user_id: 1,
            user_email: 'user_email@test.test',
            user_first_name: 'user_first_name',
            user_last_name: 'user_last_name',
            user_password: hashPassword('user_password'),
        })
    })
    it('index method should return a list of users', async () => {
        const result = await userStore.index()
        expect(result).toEqual([
            {
                user_id: 1,
                user_email: 'user_email@test.test',
                user_first_name: 'user_first_name',
                user_last_name: 'user_last_name',
                user_password: hashPassword('user_password'),
            },
        ])
    })
    it('edit method should return the modified user', async () => {
        const modified_user = {
            user_email: 'user_email_modified@test.test',
            user_first_name: 'user_first_name_modified',
            user_last_name: 'user_last_name_modified',
            user_password: 'user_password_modified',
        }
        const result = await userStore.edit(1, modified_user)
        expect(result).toEqual({
            user_id: 1,
            user_email: 'user_email_modified@test.test',
            user_first_name: 'user_first_name_modified',
            user_last_name: 'user_last_name_modified',
            user_password: hashPassword('user_password_modified'),
        })
    })
    it('show method should return the modified user', async () => {
        const result = await userStore.show(1)
        expect(result).toEqual({
            user_id: 1,
            user_email: 'user_email_modified@test.test',
            user_first_name: 'user_first_name_modified',
            user_last_name: 'user_last_name_modified',
            user_password: hashPassword('user_password_modified'),
        })
    })
    it('delete method should delete the only existing user and return it', async () => {
        const result = await userStore.delete(1)
        expect(result).toEqual({
            user_id: 1,
            user_email: 'user_email_modified@test.test',
            user_first_name: 'user_first_name_modified',
            user_last_name: 'user_last_name_modified',
            user_password: hashPassword('user_password_modified'),
        })
    })
    it('index method should return an empty list of users after deleting the user', async () => {
        const result = await userStore.index()
        expect(result).toEqual([])
    })
})
