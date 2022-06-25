import client from '../database/index.db'
import { Product } from '../types/product.type'

export default class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect()
            const query = 'SELECT * FROM products'
            const result = await connection.query(query)
            connection.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot get all products: ${error}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const connection = await client.connect()
            const query =
                'INSERT INTO products (product_name, product_price, product_category) VALUES ($1,$2,$3) returning *'
            const result = await connection.query(query, [
                product.product_name,
                product.product_price,
                product.product_category,
            ])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot create product: ${error}`)
        }
    }

    async show(product_id: Number): Promise<Product> {
        try {
            const connection = await client.connect()
            const query = 'SELECT * FROM products WHERE product_id=($1)'
            const result = await connection.query(query, [product_id])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot find product ${product_id}: ${error}`)
        }
    }

    async edit(
        product_id: Number,
        modified_product: Product
    ): Promise<Product> {
        try {
            const connection = await client.connect()
            const query =
                'UPDATE products SET product_name = $2, product_price = $3, product_category = $4, WHERE product_id = $1 returning *'
            const result = await connection.query(query, [
                product_id,
                modified_product.product_name,
                modified_product.product_price,
                modified_product.product_category,
            ])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot edit product ${product_id}: ${error}`)
        }
    }

    async delete(product_id: Number): Promise<Product> {
        try {
            const connection = await client.connect()
            const query =
                'DELETE FORM products WHERE product_id = $1 returning *'
            const result = await connection.query(query, [product_id])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot delete product ${product_id}: ${error}`)
        }
    }
}
