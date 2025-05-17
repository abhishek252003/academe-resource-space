
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const uploadSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  college: z.string().min(1, { message: "Please select a college" }),
  department: z.string().min(1, { message: "Please select a department" }),
  year: z.string().min(1, { message: "Please select a year" }),
  type: z.string().min(1, { message: "Please select a resource type" }),
  file: z.any().refine((file) => file && file.length > 0, "File is required"),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

const UploadResource = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch colleges from Supabase
  const { data: collegesData } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch departments from Supabase
  const { data: departmentsData } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('name')
        .order('name');
      
      if (error) throw error;
      return data?.map(dep => dep.name) || [];
    }
  });

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      description: "",
      college: "",
      department: "",
      year: "",
      type: "",
    },
  });

  const onSubmit = async (data: UploadFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to upload resources",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Upload file to Supabase Storage
      const file = data.file[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { error: uploadError, data: fileData } = await supabase.storage
        .from('resources')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage.from('resources').getPublicUrl(filePath);
      
      // 2. Get college ID based on selected college name
      let collegeId = null;
      if (data.college) {
        const selectedCollege = collegesData?.find(college => college.name === data.college);
        collegeId = selectedCollege?.id;
      }

      // 3. Insert resource record in database
      const { error: resourceError } = await supabase
        .from('resources')
        .insert({
          title: data.title,
          description: data.description,
          user_id: user.id,
          college_id: collegeId,
          department: data.department,
          year: data.year,
          type: data.type,
          file_url: publicUrl,
          file_type: fileExt?.toUpperCase() || 'UNKNOWN',
          file_size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          status: 'pending', // Requires admin approval
        });

      if (resourceError) throw resourceError;
      
      toast({
        title: "Resource uploaded successfully",
        description: "Your resource has been submitted for review",
      });
      
      navigate('/profile');
    } catch (error) {
      console.error('Error uploading resource:', error);
      toast({
        title: "Upload failed",
        description: "Something went wrong while uploading your resource",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Years data
  const years = ["2022", "2023", "2024", "2025"];
  
  // Resource types
  const resourceTypes = ["Notes", "Question Papers", "Textbooks", "Assignments", "Lab Reports"];

  // Show colleges from the database or use fallback data
  const colleges = collegesData?.map(college => college.name) || 
    ["Stanford University", "MIT", "Harvard University", "UCLA"];
    
  // Show departments from the database or use fallback data
  const departments = departmentsData || 
    ["Computer Science", "Mechanical Engineering", "Business", "Physics", "Mathematics"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upload Resource</CardTitle>
              <CardDescription>
                Share educational resources with other students
              </CardDescription>
            </CardHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resource Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter resource title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe what this resource contains" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="college"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select college" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {colleges.map((college) => (
                                <SelectItem key={college} value={college}>
                                  {college}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Academic Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resource Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {resourceTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Upload File</FormLabel>
                        <FormControl>
                          <Input 
                            type="file" 
                            onChange={(e) => onChange(e.target.files)}
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormDescription>
                          PDF, DOCX, PPT, or ZIP files up to 50MB
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Upload Resource
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadResource;
