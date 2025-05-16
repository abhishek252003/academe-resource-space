
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Navbar: React.FC = () => {
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
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button className="bg-brand-600 hover:bg-brand-700">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
