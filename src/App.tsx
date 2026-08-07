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
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showDetails, toggleDetails] = useToggle(false);

  const prevQuery = usePrevious(query);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setUser(MOCK_USER);
      setCourses(MOCK_COURSES);
      setLoading(false);
    }, 300);
    return () => clearTimeout(id);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setQuery(e.target.value);

  const filtered = courses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app">
      <header>
        <h1>GT2 — Part 2</h1>
      </header>

      <section>
        <label htmlFor="search">Search courses</label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            id="search"
            ref={inputRef}
            value={query}
            onChange={handleChange}
            placeholder="Search courses..."
          />
          <button type="button" onClick={() => inputRef.current?.focus()}>Focus</button>
        </div>
        {prevQuery !== undefined && prevQuery !== query && <small>Previous: {prevQuery}</small>}
      </section>

      <section>
        <h2>User</h2>
        {user && <UserCard user={user} onSelect={setUser} />}
      </section>

      <section>
        <h2>Courses</h2>
        <button type="button" onClick={toggleDetails}>{showDetails ? "Hide" : "Show"} details</button>
        {showDetails && <div>Showing {filtered.length} course(s)</div>}
        <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
          {filtered.map((c) => <CourseCard key={c.code} course={c} />)}
        </div>
      </section>

      <section>
        <h2>Submission</h2>
        <SubmissionBadge submission={MOCK_SUBMISSION}><span>Pending</span></SubmissionBadge>
      </section>
    </div>
  );
}
