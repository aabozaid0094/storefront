import express, { Request, Response } from 'express'
import ProductStore from '../models/product.model'

const productRoute = express.Router()
const productStore = new ProductStore()

productRoute.get('/', async (req: Request, res: Response) => {
    const products = await productStore.index()
    console.log('Product index route')
    res.json(products)
})

productRoute.get('/:product_id', async (req: Request, res: Response) => {
    const product = await productStore.show(
        parseInt(req.params.product_id as unknown as string)
    )
    console.log(`Product show route: ${JSON.stringify(product)}`)
    res.json(product)
})

productRoute.post('/', async (req: Request, res: Response) => {
    const { product_name, product_price, product_category } = req.body
    const product = await productStore.create({
        product_name,
        product_price,
        product_category,
    })
    console.log(`Product create route: ${JSON.stringify(product)}`)
    res.json(product)
})
productRoute.patch('/:product_id', async (req: Request, res: Response) => {
    const { product_name, product_price, product_category } = req.body
    const modifiedProduct = await productStore.edit(
        parseInt(req.params.product_id as unknown as string),
        { product_name, product_price, product_category }
    )
    console.log(`Product edit route: ${JSON.stringify(modifiedProduct)}`)
    res.json(modifiedProduct)
})

productRoute.delete('/:product_id', async (req: Request, res: Response) => {
    const deletedProduct = await productStore.delete(
        parseInt(req.params.product_id as unknown as string)
    )
    console.log(`Product delete route: ${JSON.stringify(deletedProduct)}`)
    res.json(deletedProduct)
})

export default productRoute
