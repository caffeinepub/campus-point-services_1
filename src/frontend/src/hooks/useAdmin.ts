import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !!identity && !isFetching,
    retry: false,
  });
}

/**
 * Hook to check if the current caller is authorized to access enquiries
 * Uses backend authorization logic (AccessControl admin OR authorized email)
 */
export function useIsCallerAuthorizedForEnquiries() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['isCallerAuthorizedForEnquiries', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return false;
      return actor.isAdminEnquiryAccess(identity.getPrincipal());
    },
    enabled: !!actor && !!identity && !isFetching,
    retry: false,
  });
}
