import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, Mail, AlertCircle } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetAllEnquiries, useMarkAnswered } from '@/hooks/useQueries';
import { useIsCallerAdmin } from '@/hooks/useAdmin';
import { toast } from 'sonner';

export function EnquiriesView() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: enquiries, isLoading: enquiriesLoading, error } = useGetAllEnquiries();
  const markAnsweredMutation = useMarkAnswered();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please try again.');
    }
  };

  const handleLogout = async () => {
    await clear();
    toast.success('Logged out successfully');
  };

  const handleMarkAnswered = async (id: string) => {
    setProcessingId(id);
    
    try {
      await markAnsweredMutation.mutateAsync(id);
      toast.success('Enquiry marked as answered');
    } catch (error: any) {
      console.error('Mark answered error:', error);
      toast.error('Failed to mark enquiry as answered');
    } finally {
      setProcessingId(null);
    }
  };

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-20 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Login Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Please login to view and manage enquiries.
            </p>
            <Button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full"
              size="lg"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login with Internet Identity'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading admin status
  if (isAdminLoading) {
    return (
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-20 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <AlertCircle className="h-6 w-6 text-destructive" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              You do not have permission to view enquiries. Only administrators can access this page.
            </p>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading enquiries
  if (enquiriesLoading) {
    return (
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  // Error loading enquiries
  if (error) {
    return (
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-20 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2 text-destructive">
              <AlertCircle className="h-6 w-6" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Failed to load enquiries. Please try again later.
            </p>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-20rem)]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Enquiries Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all submitted enquiries
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {!enquiries || enquiries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                No enquiries yet. Check back later.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {enquiries.map((item) => {
              const isProcessing = processingId === item.id;
              
              return (
                <Card key={item.id} className="border-border/40">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{item.enquiry.name}</CardTitle>
                        <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {item.enquiry.email}
                          </span>
                        </div>
                      </div>
                      <Badge variant={item.enquiry.answered ? 'default' : 'secondary'}>
                        {item.enquiry.answered ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Answered
                          </span>
                        ) : (
                          'Pending'
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Message:</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {item.enquiry.message}
                      </p>
                    </div>
                    {!item.enquiry.answered && (
                      <Button
                        onClick={() => handleMarkAnswered(item.id)}
                        disabled={isProcessing || markAnsweredMutation.isPending}
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Marking as answered...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Answered
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
