/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createUser, deleteUser, getUserList, editUser } from '@/ApiRqquest.js'
import { USER } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useUserData() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUserList,
  })
}

export function userCreateUser() {
  const useQueryClientvalue = useQueryClient()
  return useMutation({
    mutationFn: (data: USER) => createUser(data),
    onMutate: () => {
      console.log('mutate')
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await useQueryClientvalue.invalidateQueries({ queryKey: ['users'] })
      }
    },
  })
}

export function useDeleteUsers(p0: never[]) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ids: string[]) => {
      for (const id of ids) {
        await deleteUser(id)
        await delay(500) // 1-second delay between calls
      }
    },
    onMutate: () => {
      console.log('Deleting multiple users')
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
      }
    },
  })
}

export function useEditUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<USER> }) =>
      editUser(id, data),
    onMutate: () => {
      console.log('Editing user')
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
      }
    },
  })
}
