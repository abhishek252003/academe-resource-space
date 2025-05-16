
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Check, X, Download, Edit, Trash, Users, FileText, BookOpen } from 'lucide-react';

// Mock data
const pendingResources = [
  { id: 1, title: "Advanced Calculus Notes", type: "Notes", college: "MIT", department: "Mathematics", year: "2024", uploadedBy: "student@studyhub.com", uploadDate: "2024-05-10" },
  { id: 2, title: "Computer Networks Question Paper", type: "Question Papers", college: "Stanford University", department: "Computer Science", year: "2023", uploadedBy: "student@studyhub.com", uploadDate: "2024-05-09" },
  { id: 3, title: "Organic Chemistry Lab Manual", type: "Lab Reports", college: "Harvard University", department: "Chemistry", year: "2024", uploadedBy: "student@studyhub.com", uploadDate: "2024-05-08" },
];

const downloadStats = [
  { name: 'Notes', value: 400 },
  { name: 'Question Papers', value: 300 },
  { name: 'Textbooks', value: 200 },
  { name: 'Lab Reports', value: 100 },
];

const collegeStats = [
  { name: 'MIT', downloads: 250, uploads: 120 },
  { name: 'Stanford', downloads: 310, uploads: 100 },
  { name: 'Harvard', downloads: 190, uploads: 80 },
  { name: 'UCLA', downloads: 140, uploads: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [pendingList, setPendingList] = useState(pendingResources);
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const approveResource = (id: number) => {
    setPendingList(pendingList.filter(item => item.id !== id));
    toast({
      title: "Resource approved",
      description: "The resource is now available for download",
    });
  };

  const rejectResource = (id: number) => {
    setPendingList(pendingList.filter(item => item.id !== id));
    toast({
      title: "Resource rejected",
      description: "The resource has been rejected and removed",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-brand-600" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">256</p>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-brand-600" />
                Total Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,247</p>
              <p className="text-sm text-muted-foreground">+24% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Download className="h-5 w-5 mr-2 text-brand-600" />
                Total Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8,549</p>
              <p className="text-sm text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="manage">Manage Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Resource Approvals</CardTitle>
                <CardDescription>
                  Review and approve submitted educational resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingList.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>College</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Year</TableHead>
                          <TableHead>Upload Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingList.map((resource) => (
                          <TableRow key={resource.id}>
                            <TableCell className="font-medium">{resource.title}</TableCell>
                            <TableCell>{resource.type}</TableCell>
                            <TableCell>{resource.college}</TableCell>
                            <TableCell>{resource.department}</TableCell>
                            <TableCell>{resource.year}</TableCell>
                            <TableCell>{resource.uploadDate}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => approveResource(resource.id)}>
                                  <Check className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => rejectResource(resource.id)}>
                                  <X className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Pending Resources</h3>
                    <p className="text-gray-500">All resources have been reviewed!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resources by Type</CardTitle>
                  <CardDescription>
                    Distribution of downloads by resource type
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={downloadStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {downloadStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>College Activity</CardTitle>
                  <CardDescription>
                    Downloads and uploads by college
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={collegeStats}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="downloads" fill="#3196FF" name="Downloads" />
                      <Bar dataKey="uploads" fill="#00C49F" name="Uploads" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage Resources</CardTitle>
                <CardDescription>
                  Edit, update or remove existing resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>College</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Downloads</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Data Structures and Algorithms</TableCell>
                        <TableCell>Notes</TableCell>
                        <TableCell>Stanford University</TableCell>
                        <TableCell>Computer Science</TableCell>
                        <TableCell>245</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Business Economics Final Paper</TableCell>
                        <TableCell>Question Papers</TableCell>
                        <TableCell>Harvard University</TableCell>
                        <TableCell>Business</TableCell>
                        <TableCell>189</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
