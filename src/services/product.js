import axiosInstance from './axios'

export async function getProductList() {
  return await axiosInstance.get('/products')
}

export async function getProductById(id) {
  return await axiosInstance.get(`/products/${id}`)
}

export async function updateProductById(id, model) {
  return await axiosInstance.put(`/products/${id}`, model)
}

export async function getProductColorList() {
  return await axiosInstance.get('/productColorList')
}
