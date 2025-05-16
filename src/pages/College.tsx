
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ResourceCard from '@/components/ResourceCard';
import FilterSection from '@/components/FilterSection';
import SearchBar from '@/components/SearchBar';

// Mock data for a college
const collegeDetails = {
  "1": {
    name: "Tech University",
    location: "New York, NY",
    description: "A leading institution in technology education with state-of-the-art facilities.",
    departments: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"],
    years: ["2025", "2024", "2023", "2022", "2021"],
  },
  "2": {
    name: "Central College",
    location: "Boston, MA",
    description: "Renowned for its science programs and research opportunities.",
    departments: ["Physics", "Mathematics", "Chemistry", "Biology"],
    years: ["2025", "2024", "2023", "2022", "2021"],
  },
  "3": {
    name: "State University",
    location: "Chicago, IL",
    description: "A comprehensive university with strong programs in business and economics.",
    departments: ["Business", "Economics", "Finance", "Marketing"],
    years: ["2025", "2024", "2023", "2022", "2021"],
  },
  "4": {
    name: "Liberal Arts College",
    location: "San Francisco, CA",
    description: "Focused on providing a well-rounded education in the arts and humanities.",
    departments: ["English", "History", "Philosophy", "Art"],
    years: ["2025", "2024", "2023", "2022", "2021"],
  },
};

// Mock resources data
const resourcesData = [
  {
    id: "1",
    title: "Data Structures and Algorithms",
    type: "Study Material",
    subject: "Computer Science",
    year: "2024",
    department: "Computer Science",
    fileSize: "3.2 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Digital Logic Design",
    type: "Course Notes",
    subject: "Electronics",
    year: "2023",
    department: "Electrical Engineering",
    fileSize: "1.8 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Operating Systems Final Exam",
    type: "Question Paper",
    subject: "Computer Science",
    year: "2024",
    department: "Computer Science",
    fileSize: "1.2 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    type: "Study Material",
    subject: "AI",
    year: "2023",
    department: "Computer Science",
    fileSize: "5.6 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "5",
    title: "Networking Protocols",
    type: "Course Notes",
    subject: "Computer Networks",
    year: "2022",
    department: "Computer Science",
    fileSize: "2.4 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "6",
    title: "Distributed Systems Midterm",
    type: "Question Paper",
    subject: "Advanced Computing",
    year: "2024",
    department: "Computer Science",
    fileSize: "1.5 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
];

const resourceTypes = ["Study Material", "Question Paper", "Course Notes"];

const College = () => {
  const { id } = useParams<{ id: string }>();
  const college = collegeDetails[id as keyof typeof collegeDetails];

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!college) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold mb-4">College not found</h1>
          <p>The college you are looking for does not exist.</p>
        </div>
      </>
    );
  }

  // Filter resources based on selected filters and search query
  const filteredResources = resourcesData.filter(resource => {
    return (
      (!selectedYear || resource.year === selectedYear) &&
      (!selectedDepartment || resource.department === selectedDepartment) &&
      (!selectedType || resource.type === selectedType) &&
      (!searchQuery || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        resource.subject?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const resetFilters = () => {
    setSelectedYear(null);
    setSelectedDepartment(null);
    setSelectedType(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* College Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
          <p className="text-brand-100 mb-4">{college.location}</p>
          <p className="max-w-3xl">{college.description}</p>
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
              years={college.years}
              departments={college.departments}
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
            
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    type={resource.type}
                    subject={resource.subject}
                    year={resource.year}
                    department={resource.department}
                    fileSize={resource.fileSize}
                    fileType={resource.fileType}
                    downloadUrl={resource.downloadUrl}
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

export default College;
