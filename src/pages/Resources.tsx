
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ResourceCard from '@/components/ResourceCard';
import FilterSection from '@/components/FilterSection';
import SearchBar from '@/components/SearchBar';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: string;
  department: string;
  year: string;
  file_url: string;
  file_type: string;
  file_size: string;
  subject?: string;
}

const Resources = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch departments for filter dropdown
  const { data: allDepartments } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('name')
        .order('name');
      
      if (error) throw error;
      return data?.map(dep => dep.name) || [];
    },
    initialData: [
      "Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering",
      "Physics", "Mathematics", "Chemistry", "Biology", 
      "Business", "Economics", "Finance", "Marketing",
      "English", "History", "Philosophy", "Art"
    ]
  });

  // Years data
  const years = ["2025", "2024", "2023", "2022", "2021"];
  
  // Resource types
  const resourceTypes = ["Notes", "Question Papers", "Textbooks", "Assignments", "Lab Reports"];

  // Fetch resources from Supabase
  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources', selectedYear, selectedDepartment, selectedType],
    queryFn: async () => {
      let query = supabase
        .from('resources')
        .select('*')
        .eq('status', 'approved');
      
      if (selectedYear) {
        query = query.eq('year', selectedYear);
      }
      if (selectedDepartment) {
        query = query.eq('department', selectedDepartment);
      }
      if (selectedType) {
        query = query.eq('type', selectedType);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return data as Resource[];
    },
    initialData: [] // Empty array as initial data
  });

  // Filter resources based on search query
  const filteredResources = resources.filter(resource => {
    return !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.department.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const resetFilters = () => {
    setSelectedYear(null);
    setSelectedDepartment(null);
    setSelectedType(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Academic Resources</h1>
          <p className="max-w-3xl">
            Find study materials, question papers, and course notes from all colleges.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterSection
              years={years}
              departments={allDepartments}
              resourceTypes={resourceTypes}
              onYearChange={setSelectedYear}
              onDepartmentChange={setSelectedDepartment}
              onTypeChange={setSelectedType}
              onReset={resetFilters}
            />
          </div>
          
          {/* Resources */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              Resources {filteredResources.length > 0 ? `(${filteredResources.length})` : ''}
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <Loader2 className="h-12 w-12 animate-spin text-brand-600" />
              </div>
            ) : filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    type={resource.type}
                    subject={resource.subject}
                    year={resource.year}
                    department={resource.department}
                    fileSize={resource.file_size}
                    fileType={resource.file_type}
                    downloadUrl={resource.file_url}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
              </div>
            )}
          </div>
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

export default Resources;
