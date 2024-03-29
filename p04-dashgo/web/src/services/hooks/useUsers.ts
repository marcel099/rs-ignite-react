import { AxiosResponse } from "axios"
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query"

import { api } from "../axios"

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUsersResponse = {
  totalCount: number
  users: User[]
}

type UsersResponse = {
  users: User[]
  total: number
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data } = await api.get<UsersResponse>('users', {
    params: {
      page,
    }
  })

  const totalCount = data.total

  const users = data.users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }))

  return {
    users,
    totalCount,
  }
}

export function useUsers(page: number /*, options: UseQueryOptions */) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,   // 10 minutes
    // ...options,
  }) // as UseQueryResult<GetUsersResponse, unknown>
}