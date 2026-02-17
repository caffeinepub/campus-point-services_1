import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, Mail, AlertCircle, Edit, X, Plus, Shield } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetAllEnquiries, useMarkAnswered } from '@/hooks/useQueries';
import { useIsCallerAuthorizedForEnquiries } from '@/hooks/useAdmin';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '@/hooks/useUserProfile';
import { useGetAuthorizedAdminEmails, useAddAdminEmail, useRemoveAdminEmail } from '@/hooks/useEnquiryAdminEmails';
import { normalizeEmail } from '@/constants/admin';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function EnquiriesView() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAuthorized, isLoading: authLoading } = useIsCallerAuthorizedForEnquiries();
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const saveProfileMutation = useSaveCallerUserProfile();
  
  // Admin emails management
  const { data: authorizedEmails, isLoading: emailsLoading } = useGetAuthorizedAdminEmails();
  const addEmailMutation = useAddAdminEmail();
  const removeEmailMutation = useRemoveAdminEmail();
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [emailToRemove, setEmailToRemove] = useState<string | null>(null);
  
  // Profile form state
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Prefill form when profile loads or when editing
  useEffect(() => {
    if (userProfile && (isEditingProfile || !userProfile.email.trim())) {
      setProfileName(userProfile.name || '');
      setProfileEmail(userProfile.email || '');
    }
  }, [userProfile, isEditingProfile]);
  
  // Check if profile is missing or has empty/whitespace email
  const needsProfileCompletion = !userProfile || !userProfile.email.trim();
  
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
      toast.success('Profile updated successfully');
      setIsEditingProfile(false);
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

  const handleAddAdminEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = newAdminEmail.trim();
    if (!trimmedEmail) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      await addEmailMutation.mutateAsync(trimmedEmail);
      toast.success('Admin email added successfully');
      setNewAdminEmail('');
    } catch (error: any) {
      console.error('Add admin email error:', error);
      if (error.message.includes('already exists')) {
        toast.error('This email is already in the authorized list');
      } else {
        toast.error('Failed to add admin email. Please try again.');
      }
    }
  };

  const handleRemoveAdminEmail = async () => {
    if (!emailToRemove) return;

    try {
      await removeEmailMutation.mutateAsync(emailToRemove);
      toast.success('Admin email removed successfully');
      setEmailToRemove(null);
    } catch (error: any) {
      console.error('Remove admin email error:', error);
      toast.error('Failed to remove admin email. Please try again.');
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
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="mb-2 font-medium text-foreground">How to gain access:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>An authorized admin must add your email to the access list</li>
                <li>Login with Internet Identity</li>
                <li>Save your profile with the same email address</li>
              </ol>
            </div>
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

  // Loading authorization status or profile
  if (authLoading || profileLoading) {
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
              
              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground mb-4">
                <p className="mb-2 font-medium text-foreground">Access Requirements:</p>
                <p>Your email must be authorized by an existing admin. After saving your profile with an authorized email, you'll gain access to the enquiries dashboard.</p>
              </div>
              
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

  // Not authorized - show diagnostic info with edit option
  if (!isAuthorized) {
    const profileEmail = userProfile?.email || 'not set';
    const isEmailAuthorized = userProfile && authorizedEmails 
      ? authorizedEmails.some(email => normalizeEmail(email) === normalizeEmail(userProfile.email))
      : false;
    
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
            {!isEditingProfile ? (
              <>
                <p className="text-center text-muted-foreground">
                  You do not have permission to view enquiries. Only authorized administrators can access this page.
                </p>
                
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile Email:</span>
                    <span className="font-medium break-all">{profileEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email Authorized:</span>
                    <span className="font-medium">
                      {emailsLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin inline" />
                      ) : (
                        isEmailAuthorized ? 'Yes' : 'No'
                      )}
                    </span>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                  <p className="mb-2 font-medium text-foreground">How to gain access:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Ask an authorized admin to add your email to the access list</li>
                    <li>Update your profile with the authorized email address</li>
                    <li>You'll automatically gain access after saving</li>
                  </ol>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => setIsEditingProfile(true)}
                    variant="default"
                    className="w-full"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <p className="text-center text-muted-foreground mb-4">
                  Update your profile with an authorized email address to gain access.
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-profile-name">Name</Label>
                  <Input
                    id="edit-profile-name"
                    type="text"
                    placeholder="Enter your name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    disabled={saveProfileMutation.isPending}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-profile-email">Email</Label>
                  <Input
                    id="edit-profile-email"
                    type="email"
                    placeholder="Enter your email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    disabled={saveProfileMutation.isPending}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    type="submit"
                    disabled={saveProfileMutation.isPending}
                    className="w-full"
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
                    onClick={() => setIsEditingProfile(false)}
                    variant="outline"
                    disabled={saveProfileMutation.isPending}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
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

        {/* Admin Access Management Panel */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Admin Access Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Admin Email */}
            <div>
              <Label htmlFor="new-admin-email" className="text-base font-medium mb-3 block">
                Add New Admin
              </Label>
              <form onSubmit={handleAddAdminEmail} className="flex gap-2">
                <Input
                  id="new-admin-email"
                  type="email"
                  placeholder="Enter email address"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  disabled={addEmailMutation.isPending}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={addEmailMutation.isPending || !newAdminEmail.trim()}
                  size="default"
                >
                  {addEmailMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Authorized Admins List */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                Authorized Admins ({emailsLoading ? '...' : authorizedEmails?.length || 0})
              </Label>
              
              {emailsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : !authorizedEmails || authorizedEmails.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No authorized admins yet
                </div>
              ) : (
                <div className="space-y-2">
                  {authorizedEmails.map((email) => (
                    <div
                      key={email}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium truncate">{email}</span>
                      </div>
                      <Button
                        onClick={() => setEmailToRemove(email)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                        disabled={removeEmailMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">How admin access works:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Add an email address to the authorized list above</li>
                <li>The new admin logs in with Internet Identity</li>
                <li>They save their profile with the authorized email</li>
                <li>Access is automatically granted</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Enquiries List */}
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

      {/* Remove Admin Confirmation Dialog */}
      <AlertDialog open={!!emailToRemove} onOpenChange={(open) => !open && setEmailToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Admin Access</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{emailToRemove}</strong> from the authorized admin list? 
              They will lose access to the enquiries dashboard immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={removeEmailMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveAdminEmail}
              disabled={removeEmailMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removeEmailMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                'Remove'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
