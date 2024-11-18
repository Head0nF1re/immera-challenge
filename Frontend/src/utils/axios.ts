import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const httpClient = axios.create({
  baseURL: __API_BASE_URL__,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null

    if (status === 401) {
      useRouter().push({ name: 'login', query: { redirect: useRoute().fullPath } })
    } else if (status === 404) {
    } else {
    }

    return Promise.reject(error)
  },
)

export default httpClient
