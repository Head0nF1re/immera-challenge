import type { IPaginate } from '@/types/api/paginationTypes'
import type { CreateOrUpdateProductRequest, IProduct } from '@/types/api/productApiTypes'
import httpClient from '@/utils/axios'

export const getAllProducts = async (pageNumber: number) => {
  return await httpClient.get<IPaginate<IProduct>>(`products?page=${pageNumber}`)
}

export const getProduct = async (id: number) => {
  return await httpClient.get<IProduct>(`/products/${id}`)
}

export const createProduct = async (createProductRequest: CreateOrUpdateProductRequest) => {
  return await httpClient.post('/products', createProductRequest)
}

export const updateProduct = async (
  id: number,
  updateProductRequest: CreateOrUpdateProductRequest,
) => {
  return await httpClient.put(`/products/${id}`, updateProductRequest)
}

export const deleteProduct = async (id: number) => {
  return await httpClient.delete(`/products/${id}`)
}
