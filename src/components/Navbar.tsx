
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, User, LogOut, Upload, BookOpen, LogIn } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-700">StudyHub</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-brand-600 font-medium">
            Home
          </Link>
          <Link to="/colleges" className="text-gray-700 hover:text-brand-600 font-medium">
            Colleges
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-brand-600 font-medium">
            Resources
          </Link>
          {isAuthenticated && (
            <Link to="/upload" className="text-gray-700 hover:text-brand-600 font-medium flex items-center">
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin/dashboard" className="text-gray-700 hover:text-brand-600 font-medium">
              Dashboard
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon" asChild>
            <Link to="/resources">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          
          {isAuthenticated ? (
            <>
              <div className="hidden md:block text-sm text-gray-600 mr-2">
                {user?.name}
              </div>
              <Button variant="outline" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button className="bg-brand-600 hover:bg-brand-700" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" /> Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
