import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";

const CourseDetail = () => {
  const purchasedCourse = false;
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course title</h1>
          <p className="text-base md:text-lg">Course Sub-title</p>
          <p>
            Created By{" "}
            <span className="text-[#c0c4fc] underline italic">
              Ayush MernStack
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated 01-01-2026</p>
          </div>
          <p>Students enrolled: 10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non at
            pariatur voluptate quas, ipsum ad ex quia fugiat facere autem
            tenetur est quibusdam iste, ratione sint reprehenderit. Quia,
            doloribus iste perferendis quod, tempora quisquam dolorem aliquam
            nemo inventore quo consectetur voluptate dolore pariatur nobis
            facilis exercitationem itaque molestiae.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>Lecture title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4 ">
                React Player Video Here
              </div>
              <h1>Lecture title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchasedCourse ? (
                <Button className="w-full">Continue Course</Button>
              ) : (
                    <BuyCourseButton/>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
