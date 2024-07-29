import axios from 'axios'

// const BASE_URL = 'http://localhost:3000'
const BASE_URL = '/'
const axiosInstance = axios.create({ baseURL: BASE_URL })
interface USER {
  first_name: string
  last_name: string
  email: string
  alternate_email: string
  password: string
  age: string
}
export const getUserList = async () => {
  return (await axiosInstance.get('api/users')).data
}

export const createUser = async (data: USER) => {
  return (await axiosInstance.post('api/users', data)).data
}

export const deleteUser = async (id: string) => {
  return (await axiosInstance.delete(`api/users?uid=${id}`)).data
}
export const editUser = async (id: string, data: Partial<USER>) => {
  return (await axiosInstance.put(`api/users?uid=${id}`, data)).data
}
