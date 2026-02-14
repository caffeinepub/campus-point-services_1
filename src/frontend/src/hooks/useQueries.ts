import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { EnquiryWithId } from '../backend';

export function useGetAllEnquiries() {
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
    enabled: !!actor && !!identity && !isFetching,
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
      
      // Generate a unique ID for the enquiry
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      await actor.createEnquiry(id, name, email, message);
      return { id };
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
      await actor.markAnswered(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}
