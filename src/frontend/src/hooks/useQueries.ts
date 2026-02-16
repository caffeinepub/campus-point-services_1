import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { EnquiryWithId } from '../backend';

export function useGetAllEnquiries(enabled: boolean = true) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<EnquiryWithId[]>({
    queryKey: ['enquiries'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllEnquiriesWithIds();
      } catch (error) {
        console.error('Error fetching enquiries:', error);
        throw error;
      }
    },
    enabled: !!actor && !!identity && !isFetching && enabled,
    retry: false,
  });
}

export function useCreateEnquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Backend generates and returns the ID
      const id = await actor.createEnquiry(name, email, message);
      return { id: id.toString() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}

export function useMarkAnswered() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      // Convert string ID to bigint for backend
      await actor.markAnswered(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}
