import type { IPaginate } from '@/types/api/paginationTypes'
import type { IProduct } from '@/types/api/productApiTypes'
import httpClient from '@/utils/axios'

export const getAllProducts = async (pageNumber: number) => {
  return await httpClient.get<IPaginate<IProduct>>(`products?page=${pageNumber}`)
}

export const getProduct = async (id: number) => {
  return await httpClient.get<IProduct>(`/products/${id}`)
}

export const updateProduct = async (updateRequest: IProduct) => {
  return await httpClient.post('/products', updateRequest)
}

export const deleteProduct = async (id: number) => {
  return await httpClient.post(`/products/${id}`)
}
