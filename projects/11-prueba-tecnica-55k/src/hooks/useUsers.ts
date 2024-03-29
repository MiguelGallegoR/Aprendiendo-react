import { fetchUsers } from "../services/users";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { User } from "../types";

export const useUsers = () =>  {
    const {isLoading, isError, data, refetch, fetchNextPage, hasNextPage} = useInfiniteQuery<{nextCursor?: number, users: User[]}>(
    ['users'],
    fetchUsers,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor
    }
  )

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users:  data?.pages?.flatMap(page => page.users) ?? [],
    hasNextPage
  }
}