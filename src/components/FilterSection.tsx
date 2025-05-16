
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface FilterSectionProps {
  onYearChange?: (year: string) => void;
  onDepartmentChange?: (department: string) => void;
  onTypeChange?: (type: string) => void;
  years: string[];
  departments: string[];
  resourceTypes: string[];
  onReset?: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  onYearChange,
  onDepartmentChange,
  onTypeChange,
  years,
  departments,
  resourceTypes,
  onReset,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block text-gray-700">
            Academic Year
          </label>
          <Select onValueChange={onYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block text-gray-700">
            Department
          </label>
          <Select onValueChange={onDepartmentChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block text-gray-700">
            Resource Type
          </label>
          <Select onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {resourceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
