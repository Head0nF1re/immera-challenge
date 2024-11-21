import axios, { type InternalAxiosRequestConfig } from 'axios'
import { useRoute, useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { getCsrfCookie } from '@/api/authApi'

const httpClient = axios.create({
  baseURL: __API_BASE_URL__,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Origin: 'localhost',
  },
  withCredentials: true,
  withXSRFToken: true,
})

const csrfMethods = ['post', 'put', 'patch', 'delete']

const addCsrfCookieIfNotExists = async (config: InternalAxiosRequestConfig) => {
  if (csrfMethods.includes(config.method!.toLowerCase()) && !Cookies.get('XSRF-TOKEN')) {
    await getCsrfCookie()
  }

  return config
}

const redirectIfUnauthorized = (error) => {
  const status = error.response ? error.response.status : null

  if (status === 401) {
    // useRouter().push({ name: 'login', query: { redirect: useRoute().fullPath } })
  }

  if (status === 404) {
    useRouter().push({ name: '404' })
  }
}

httpClient.interceptors.request.use(addCsrfCookieIfNotExists)

httpClient.interceptors.response.use(
  (response) => response,
  (error) => redirectIfUnauthorized(error),
)

export default httpClient
