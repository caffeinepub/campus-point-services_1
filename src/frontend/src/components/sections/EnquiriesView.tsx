import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, Mail, AlertCircle } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetAllEnquiries, useMarkAnswered } from '@/hooks/useQueries';
import { useIsCallerAdmin } from '@/hooks/useAdmin';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '@/hooks/useUserProfile';
import { isAuthorizedAdminEmail } from '@/constants/admin';
import { toast } from 'sonner';

export function EnquiriesView() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const saveProfileMutation = useSaveCallerUserProfile();
  
  // Profile form state
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  
  // Check if profile is missing or has empty/whitespace email
  const needsProfileCompletion = !userProfile || !userProfile.email.trim();
  
  // Check if user is authorized (admin AND has the correct email)
  const isAuthorized = isAdmin && userProfile && isAuthorizedAdminEmail(userProfile.email);
  
  // Only fetch enquiries if authorized
  const { data: enquiries, isLoading: enquiriesLoading, error } = useGetAllEnquiries(!!isAuthorized);
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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileName.trim() || !profileEmail.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await saveProfileMutation.mutateAsync({
        name: profileName.trim(),
        email: profileEmail.trim(),
      });
      toast.success('Profile saved successfully');
    } catch (error: any) {
      console.error('Save profile error:', error);
      toast.error('Failed to save profile. Please try again.');
    }
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

  // Loading admin status or profile
  if (isAdminLoading || profileLoading) {
    return (
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Show profile completion form if needed
  if (isAuthenticated && profileFetched && needsProfileCompletion) {
    return (
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-20 px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Complete Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <p className="text-center text-muted-foreground mb-4">
                Please complete your profile to access the enquiries dashboard.
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="profile-name">Name</Label>
                <Input
                  id="profile-name"
                  type="text"
                  placeholder="Enter your name"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  disabled={saveProfileMutation.isPending}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  placeholder="Enter your email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  disabled={saveProfileMutation.isPending}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={saveProfileMutation.isPending}
                  className="flex-1"
                >
                  {saveProfileMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Profile'
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={handleLogout}
                  variant="outline"
                  disabled={saveProfileMutation.isPending}
                >
                  Logout
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not authorized (either not admin OR wrong email) - show diagnostic info
  if (!isAuthorized) {
    const profileEmail = userProfile?.email || 'not set';
    const adminStatus = isAdmin ? 'Admin' : 'Not Admin';
    
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
              You do not have permission to view enquiries. Only authorized administrators can access this page.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Admin Status:</span>
                <span className="font-medium">{adminStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profile Email:</span>
                <span className="font-medium break-all">{profileEmail}</span>
              </div>
            </div>
            
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
