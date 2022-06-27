import ProductStore from '../../models/product.model'

const productStore = new ProductStore()

describe('Product Model Methods Definitions', () => {
    it('Should have an index', () => {
        expect(productStore.index).toBeDefined()
    })
    it('Should have an create', () => {
        expect(productStore.create).toBeDefined()
    })
    it('Should have an show', () => {
        expect(productStore.show).toBeDefined()
    })
    it('Should have an edit', () => {
        expect(productStore.edit).toBeDefined()
    })
    it('Should have an delete', () => {
        expect(productStore.delete).toBeDefined()
    })
})
describe('Product Model Methods Are Functioning', () => {
    afterAll( async ()=>{
        const allProd = await productStore.index()
        if (allProd.length>0) {
            console.log("product_price");
            console.log(allProd[0].product_price);
            console.log("typeof product_price");
            console.log(typeof allProd[0].product_price);
        }
    })
    it('create method should add a product', async () => {
        const created_product = {
            product_name: 'product_name',
            product_price: 10.00,
            product_category: 'product_category',
        }
        const result = await productStore.create(created_product)
        expect(result).toEqual({
            product_id: 1,
            product_name: 'product_name',
            product_price: 10.00,
            product_category: 'product_category',
        })
    })
    it('index method should return a list of products with only one created product', async () => {
        const result = await productStore.index()
        expect(result).toEqual([
            {
                product_id: 1,
                product_name: 'product_name',
                product_price: 10.00,
                product_category: 'product_category',
            },
        ])
    })
    it('edit method should return the modified product', async () => {
        const modified_product = {
            product_name: 'product_name_modified',
            product_price: 15.00,
            product_category: 'product_category_modified',
        }
        const result = await productStore.edit(1, modified_product)
        expect(result).toEqual({
            product_id: 1,
            product_name: 'product_name_modified',
            product_price: 15.00,
            product_category: 'product_category_modified',
        })
    })
    it('show method should return the modified product', async () => {
        const result = await productStore.show(1)
        expect(result).toEqual({
            product_id: 1,
            product_name: 'product_name_modified',
            product_price: 15.00,
            product_category: 'product_category_modified',
        })
    })
    it('delete method should delete the only existing product and return it', async () => {
        const result = await productStore.delete(1)
        expect(result).toEqual({
            product_id: 1,
            product_name: 'product_name_modified',
            product_price: 15.00,
            product_category: 'product_category_modified',
        })
    })
    it('index method should return an empty list of products after deleting the product', async () => {
        const result = await productStore.index()
        expect(result).toEqual([])
    })
})
