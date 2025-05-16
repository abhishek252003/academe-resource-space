
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import CollegeCard from '@/components/CollegeCard';

const collegeData = [
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
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Academic Resources for <span className="text-brand-600">Every Student</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Access study materials, question papers, and course notes organized by college, year, and department - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/colleges">Browse Colleges</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/resources">Find Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Colleges Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Colleges</h2>
            <Link to="/colleges" className="text-brand-600 font-medium hover:underline">
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collegeData.map((college) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                location={college.location}
                departments={college.departments}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Find Everything You Need</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
              <p className="text-gray-600">
                Access comprehensive study resources for all subjects organized by college, year, and department.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  <path d="M13 13v8"></path>
                  <path d="M19 19H9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Previous Year Papers</h3>
              <p className="text-gray-600">
                Practice with previous year question papers to understand exam patterns and prepare effectively.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Course Notes</h3>
              <p className="text-gray-600">
                Get detailed course notes contributed by professors and top students to enhance your learning.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to ace your exams?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who use our platform to find the resources they need.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-brand-600">
            <Link to="/colleges">Get Started</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/colleges" className="text-gray-300 hover:text-white">Colleges</Link></li>
                <li><Link to="/resources" className="text-gray-300 hover:text-white">Resources</Link></li>
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

export default Index;
