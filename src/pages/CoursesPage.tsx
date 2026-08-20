// src/pages/CoursesPage.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import type { Course } from "../types/index";
import CourseCard from "../components/CourseCard";
import usePrevious from "../hooks/usePrevious";
import { allCourses } from "../data/mockData";

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    setTimeout(() => {
      setCourses(allCourses);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6 animate-pulse">Loading Gwyneth’s courses...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 rounded-lg bg-red-50 text-red-700">
        Sorry Gwyneth, something went wrong while loading your courses.
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Gwyneth’s Courses
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Search and explore the courses I’m enrolled in.
      </p>

      <input
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search my courses..."
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {previousSearch && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500">
          Previous search: "{previousSearch}"
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((c) => (
          <Link key={c.code} to={`/courses/${c.code}`}>
            <CourseCard course={c} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default CoursesPage;
