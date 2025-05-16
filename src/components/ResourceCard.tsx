
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  title: string;
  type: string;
  subject?: string;
  year: string;
  department: string;
  fileSize?: string;
  fileType?: string;
  downloadUrl: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  type,
  subject,
  year,
  department,
  fileSize = "2.4 MB",
  fileType = "PDF",
  downloadUrl,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-50 p-2 rounded-md">
              <File className="h-5 w-5 text-brand-600" />
            </div>
            <Badge variant="outline" className="bg-brand-50 text-brand-700 hover:bg-brand-100">
              {type}
            </Badge>
          </div>
          <Badge variant="secondary">{fileType}</Badge>
        </div>
        <h3 className="text-lg font-medium mt-2">{title}</h3>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-1">
          {subject && <p className="text-sm"><span className="font-medium">Subject:</span> {subject}</p>}
          <p className="text-sm"><span className="font-medium">Year:</span> {year}</p>
          <p className="text-sm"><span className="font-medium">Department:</span> {department}</p>
          <p className="text-sm text-muted-foreground">{fileSize}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full gap-2" 
          onClick={() => window.open(downloadUrl, "_blank")}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
