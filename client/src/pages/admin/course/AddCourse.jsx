import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle,setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [createCourse,{data,error,isSuccess,isLoading}] = useCreateCourseMutation();

  const navigate = useNavigate();
  
  const getSelectedCategory = (value) => {
     setCategory(value);
  }
  
  const createCourseHandler = async()=>{
    await createCourse({courseTitle,category});
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message || "Course Created.");
      navigate("/admin/course");
    }
  },[isSuccess,error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic course details for your new course
        </h1>
        <p className="text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet,
          qui!
        </p>
      </div>
      <div>
        <div className="space-y-4">
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e)=> setCourseTitle(e.target.value)}
            placeholder="Enter course name"
          />
        </div>
        <div className="space-y-4">
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <Button variant="outline" onClick={()=>navigate("/admin/course")}>Back</Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {
              isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Please Wait
                </>
              ) : "Create"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
