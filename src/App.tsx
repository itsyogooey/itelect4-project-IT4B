import { useEffect, useRef, useState, type ChangeEvent } from "react";
import "./App.css";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import usePrevious from "./hooks/usePrevious";
import useToggle from "./hooks/useToggle";
import type { Course, Submission, User } from "./types";

const MOCK_USER: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const MOCK_COURSES: Course[] = [
  { code: "ITELECT4", title: "IT Elective 4", units: 3, semester: "1st Semester 2026-2027" },
  { code: "WEB101", title: "Web Development Basics", units: 4, semester: "2nd Semester 2026-2027" },
];

const MOCK_SUBMISSION: Submission = {
  id: 1,
  studentId: 1,
  courseCode: "ITELECT4",
  repoUrl: "https://github.com/example/repo",
  submittedAt: new Date(),
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  const prevQuery = usePrevious(query);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setUser(MOCK_USER);
      setCourses(MOCK_COURSES);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(id);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setQuery(e.target.value);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.code.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) {
    return <div className="animate-pulse p-6 text-gray-500">Loading courses...</div>;
  }
  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700">
        Could not load courses. Please try again.
      </div>
    );
  }

  // ✅ Final render with dark mode wrapper
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <header>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">GT2 — Part 2</h1>
        </header>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white
                     dark:bg-gray-200 dark:text-gray-900"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Simulate error */}
        <button
          onClick={() => setIsError(true)}
          className="ml-2 rounded bg-red-100 px-2 py-1 text-xs text-red-700"
        >
          Simulate Error
        </button>

        {/* Search input */}
        <section>
          <label htmlFor="search">Search courses</label>
          <div className="flex gap-2 items-center">
            <input
              id="search"
              ref={inputRef}
              value={query}
              onChange={handleChange}
              placeholder="Search courses..."
              className="mt-4 w-full rounded border p-2"
            />
            <button type="button" onClick={() => inputRef.current?.focus()}>
              Focus
            </button>
          </div>
          {prevQuery !== undefined && prevQuery !== query && (
            <small>Previous: {prevQuery}</small>
          )}
        </section>

        {/* User section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User</h2>
          {user && <UserCard user={user} onSelect={setUser} />}
        </section>

        {/* Courses section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Courses</h2>
          <button type="button" onClick={toggleDetails}>
            {showDetails ? "Hide" : "Show"} details
          </button>
          {showDetails && <div>Showing {filtered.length} course(s)</div>}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.code} course={c} variant="compact" />
            ))}
          </div>
        </section>

        {/* Submission section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Submission</h2>
          <SubmissionBadge submission={MOCK_SUBMISSION}>
            <span>Pending</span>
          </SubmissionBadge>
        </section>
      </div>
    </div>
  );
}
