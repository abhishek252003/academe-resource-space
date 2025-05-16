
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CollegeCard from '@/components/CollegeCard';
import SearchBar from '@/components/SearchBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock colleges data
const collegesData = [
  {
    id: "1",
    name: "Tech University",
    location: "New York, NY",
    departments: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"]
  },
  {
    id: "2",
    name: "Central College",
    location: "Boston, MA",
    departments: ["Physics", "Mathematics", "Chemistry", "Biology"]
  },
  {
    id: "3",
    name: "State University",
    location: "Chicago, IL",
    departments: ["Business", "Economics", "Finance", "Marketing"]
  },
  {
    id: "4",
    name: "Liberal Arts College",
    location: "San Francisco, CA",
    departments: ["English", "History", "Philosophy", "Art"]
  },
  {
    id: "5",
    name: "Engineering Institute",
    location: "Austin, TX",
    departments: ["Computer Science", "Electronics", "Robotics", "Aerospace Engineering"]
  },
  {
    id: "6",
    name: "Metropolitan University",
    location: "Seattle, WA",
    departments: ["Medicine", "Nursing", "Dentistry", "Pharmacy"]
  },
  {
    id: "7",
    name: "South State College",
    location: "Miami, FL",
    departments: ["Law", "Criminal Justice", "Political Science", "Sociology"]
  },
  {
    id: "8",
    name: "Creative Arts Academy",
    location: "Los Angeles, CA",
    departments: ["Film Studies", "Fine Arts", "Music", "Theater"]
  },
];

// Unique locations for the filter
const locations = Array.from(new Set(collegesData.map(college => college.location.split(',')[1].trim())));

const Colleges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Filter colleges based on search query and location
  const filteredColleges = collegesData.filter(college => {
    const matchesSearch = !searchQuery || 
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.departments.some(dept => dept.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = !selectedLocation || 
      college.location.includes(selectedLocation);
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Colleges</h1>
          <p className="max-w-3xl">
            Browse all colleges and find academic resources specific to your institution.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <div>
              <Select onValueChange={(value) => setSelectedLocation(value === "all" ? null : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Colleges List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            All Colleges {filteredColleges.length > 0 ? `(${filteredColleges.length})` : ''}
          </h2>
          
          {filteredColleges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  id={college.id}
                  name={college.name}
                  location={college.location}
                  departments={college.departments}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
              <p className="text-gray-500">
                Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StudyHub</h3>
              <p className="text-gray-300">
                The ultimate resource platform for students to find academic materials.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="/colleges" className="text-gray-300 hover:text-white">Colleges</a></li>
                <li><a href="/resources" className="text-gray-300 hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 mb-2">support@studyhub.com</p>
              <p className="text-gray-300">© 2025 StudyHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Colleges;
