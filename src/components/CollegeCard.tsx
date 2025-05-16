
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface CollegeCardProps {
  id: string;
  name: string;
  location: string;
  departments: string[];
  imageUrl?: string;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ id, name, location, departments, imageUrl }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="h-40 overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-50">
            <span className="text-3xl font-bold text-brand-300">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{location}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1">
          {departments.slice(0, 3).map((dept, index) => (
            <span 
              key={index} 
              className="inline-block bg-brand-50 text-brand-700 rounded-full px-2 py-1 text-xs font-semibold"
            >
              {dept}
            </span>
          ))}
          {departments.length > 3 && (
            <span className="inline-block bg-gray-100 text-gray-500 rounded-full px-2 py-1 text-xs font-semibold">
              +{departments.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/college/${id}`}>View Resources</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
