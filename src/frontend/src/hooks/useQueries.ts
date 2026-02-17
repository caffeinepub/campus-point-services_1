import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { EnquiryWithId } from '../backend';

/**
 * Hook to fetch all enquiries with IDs
 * Only enabled when the user is authorized
 */
export function useGetAllEnquiries(isAuthorized: boolean) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<EnquiryWithId[]>({
    queryKey: ['enquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnquiriesWithIds();
    },
    enabled: !!actor && !!identity && !isFetching && isAuthorized,
    retry: false,
  });
}

/**
 * Hook to mark an enquiry as answered
 */
export function useMarkAnswered() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.markAnswered(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}

/**
 * Hook to create a new enquiry
 */
export function useCreateEnquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createEnquiry(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}
