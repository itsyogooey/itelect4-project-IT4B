import React from "react";
import type { Course } from "../types";

export interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="course-card" style={{ border: "1px solid #ddd", padding: 8, borderRadius: 6 }}>
      <h4>{course.title}</h4>
      <div>{course.code} — {course.units} units</div>
      <div style={{ fontSize: 12, color: "#666" }}>{course.semester}</div>
    </div>
  );
}
