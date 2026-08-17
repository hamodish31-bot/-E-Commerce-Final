export const saveProductToStorage = (products) =>
    localStorage.setItem('products-list', JSON.stringify(products))


export const getProductsFromStorage = () => {
    const storedProducts = localStorage.getItem('products-list')

    return storedProducts ? JSON.parse(storedProducts) : []
}