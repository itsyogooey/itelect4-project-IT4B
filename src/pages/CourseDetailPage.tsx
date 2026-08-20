// src/pages/CourseDetailPage.tsx
import { useParams, useNavigate } from "react-router";
import { allCourses } from "../data/mockData";
import CourseCard from "../components/CourseCard";

function CourseDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const course = allCourses.find((c) => c.code === code);

  if (!course) {
    return (
      <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-red-700">Course Not Found</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Sorry Gwyneth, no course exists with the code <strong>{code}</strong>.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
        >
          Back
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Course Detail — {course.title}
      </h2>
      <CourseCard course={course} />

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        This is one of Gwyneth’s enrolled courses. Explore its details and track submissions.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-100"
      >
        Back to Courses
      </button>
    </main>
  );
}

export default CourseDetailPage;
