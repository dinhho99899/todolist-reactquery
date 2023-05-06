import { useQuery } from '@tanstack/react-query'
import customFetch from './ultil/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
export const useFetchTasks = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/')
      return data
    },
  })
  return { isLoading, isError, data }
}
export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (task) => customFetch.post('/', { title: task }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('task added')
    },
    onError: (error) => {
      toast.error(error.response.data.msg)
    },
  })
  return { createTask, isLoading }
}
export const useEditTask = () => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (error) => {
      console.log(error.response.data.error)
    },
  })
  return { editTask }
}
export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteTask, isLoading: deleteLoading } = useMutation({
    mutationFn: ({ taskId }) => {
      return customFetch.delete(`/${taskId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (error) => {
      console.log(error.response.data.error)
    },
  })
  return { deleteTask }
}
