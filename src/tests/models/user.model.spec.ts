import UserStore from '../../models/user.model'
import config from '../../config'
import bcrypt from 'bcrypt'
import { User } from '../../types/user.type'

const userStore = new UserStore()
const compareUsers = (toCompareUser: User, toCompareWithUser: User): boolean => {
    return  toCompareUser.user_id === toCompareWithUser.user_id 
    && toCompareUser.user_email === toCompareWithUser.user_email 
    && toCompareUser.user_first_name === toCompareWithUser.user_first_name 
    && toCompareUser.user_last_name === toCompareWithUser.user_last_name 
    && bcrypt.compareSync(`${toCompareUser.user_password}${config.pepper}`, toCompareWithUser.user_password)
}

describe('User Model Methods Definitions', () => {
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
})
describe('User Model Methods Are Functioning', () => {
    it('create method should add a user', async () => {
        const created_user = {
            user_email: 'user_email@test.test',
            user_first_name: 'user_first_name',
            user_last_name: 'user_last_name',
            user_password: 'user_password',
        }
        const result = await userStore.create(created_user)
        const toCompareUser = {
            user_id: 1,
            user_email: 'user_email@test.test',
            user_first_name: 'user_first_name',
            user_last_name: 'user_last_name',
            user_password: 'user_password',
        }
        expect(compareUsers(toCompareUser, result)).toEqual(true)
    })
    it('index method should return a list of users with only one created user', async () => {
        const result = await userStore.index()
        const toCompareUser = {
            user_id: 1,
            user_email: 'user_email@test.test',
            user_first_name: 'user_first_name',
            user_last_name: 'user_last_name',
            user_password: 'user_password',
        }
        expect(compareUsers(toCompareUser, result[0])).toEqual(true)
    })
    it('edit method should return the modified user', async () => {
        const modified_user = {
            user_email: 'user_email_modified@test.test',
            user_first_name: 'user_first_name_modified',
            user_last_name: 'user_last_name_modified',
            user_password: 'user_password_modified',
        }
        const result = await userStore.edit(1, modified_user)
        const toCompareUser = {
            user_id: 1,
            user_email: 'user_email_modified@test.test',
            user_first_name: 'user_first_name_modified',
            user_last_name: 'user_last_name_modified',
            user_password: 'user_password_modified',
        }
        expect(compareUsers(toCompareUser, result)).toEqual(true)
    })
    it('show method should return the modified user', async () => {
        const result = await userStore.show(1)
        const toCompareUser = {
            user_id: 1,
            user_email: 'user_email_modified@test.test',
            user_first_name: 'user_first_name_modified',
            user_last_name: 'user_last_name_modified',
            user_password: 'user_password_modified',
        }
        expect(compareUsers(toCompareUser, result)).toEqual(true)
    })
    it('delete method should delete the only existing user and return it', async () => {
        const result = await userStore.delete(1)
        const toCompareUser = {
            user_id: 1,
            user_email: 'user_email_modified@test.test',
            user_first_name: 'user_first_name_modified',
            user_last_name: 'user_last_name_modified',
            user_password: 'user_password_modified',
        }
        expect(compareUsers(toCompareUser, result)).toEqual(true)
    })
    it('index method should return an empty list of users after deleting the user', async () => {
        const result = await userStore.index()
        expect(result).toEqual([])
    })
})
