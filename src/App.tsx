import { useState, useEffect, useRef, type ChangeEvent } from "react";
import "./App.css";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";
import type { User, Course, Submission } from "./types";

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const mockCourses: Course[] = [
  {
    code: "ITELECT4",
    title: "IT Elective 4",
    units: 3,
    semester: "1st Semester 2026-2027",
  },
  {
    code: "WEB101",
    title: "Web Development Basics",
    units: 4,
    semester: "2nd Semester 2026-2027",
  },
];

const mockSubmission: Submission = {
  id: 1,
  studentId: 1,
  courseCode: "ITELECT4",
  repoUrl: "https://github.com/example/repo",
  submittedAt: new Date("2026-08-07T17:39:15"),
};

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDetails, toggleDetails] = useToggle(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
  };

  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="app">
      <section id="center">
        <div>
          <h1>GT2 - Part 2 of 3</h1>
          <h2>Hooks, state, and typed events</h2>
        </div>
      </section>

      <section>
        <h2>Search Courses</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ padding: "8px 10px", minWidth: 240 }}
          />
          <button type="button" onClick={focusSearch}>
            Focus search
          </button>
        </div>
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="previous-search">Previous search: "{previousSearch}"</p>
        )}
      </section>

      <section>
        <h2>User Card</h2>
        <UserCard user={student} onSelect={handleUserSelect} />
        {selectedUser && <p>Selected: {selectedUser.name}</p>}
      </section>

      <section>
        <h2>Available Courses</h2>
        <button type="button" onClick={toggleDetails}>
          {showDetails ? "Hide details" : "Show details"}
        </button>
        {showDetails && (
          <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            <p>Showing {filteredCourses.length} course(s)</p>
            <p>Search term: "{searchTerm || "(empty)"}"</p>
          </div>
        )}
        {filteredCourses.length === 0 ? (
          <p>No courses match your search.</p>
        ) : (
          filteredCourses.map((course) => <CourseCard key={course.code} course={course} />)
        )}
      </section>

      <section>
        <h2>Recent Submission</h2>
        <SubmissionBadge submission={mockSubmission}>
          <p>Status: Pending</p>
        </SubmissionBadge>
      </section>
    </div>
  );
}

export default App;
