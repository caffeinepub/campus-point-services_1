import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

/**
 * Hook to fetch the list of authorized admin emails
 */
export function useGetAuthorizedAdminEmails() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<string[]>({
    queryKey: ['authorizedAdminEmails'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAuthorizedAdminEmails();
    },
    enabled: !!actor && !!identity && !isFetching,
    retry: false,
  });
}

/**
 * Hook to add a new admin email to the authorized list
 */
export function useAddAdminEmail() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not initialized');
      const result = await actor.addAdminEmail(email);
      if (!result) {
        throw new Error('Email already exists in the authorized list');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authorizedAdminEmails'] });
    },
  });
}

/**
 * Hook to remove an admin email from the authorized list
 */
export function useRemoveAdminEmail() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not initialized');
      const result = await actor.removeAdminEmail(email);
      if (!result) {
        throw new Error('Email not found in the authorized list');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authorizedAdminEmails'] });
    },
  });
}
