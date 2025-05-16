
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BookOpen, User } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <div className="flex justify-center">
                  <div className="bg-brand-100 rounded-full p-6">
                    <User className="h-12 w-12 text-brand-600" />
                  </div>
                </div>
                <CardTitle className="text-center mt-2">{user.name}</CardTitle>
                <CardDescription className="text-center">{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="bg-gray-50 p-2 rounded-md flex justify-between items-center">
                    <span className="font-medium">Role:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                      {user.role === 'admin' ? 'Admin' : 'Student'}
                    </span>
                  </div>
                  
                  <Button variant="outline" onClick={logout} className="w-full mt-4">
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="w-full md:w-2/3">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    My Bookmarks
                  </CardTitle>
                  <CardDescription>Resources you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 text-gray-500">
                    You haven't bookmarked any resources yet.
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    My Uploads
                  </CardTitle>
                  <CardDescription>Resources you've contributed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 text-gray-500">
                    You haven't uploaded any resources yet.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
