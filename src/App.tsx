import { useState } from 'react'
import './App.css'
import CourseCard from './components/CourseCard'
import UserCard from './components/UserCard'
import SubmissionBadge from './components/SubmissionBadge'
import type { User, Course, Submission } from './types'

function App() {
  const [count, setCount] = useState(0)

  // Mock data
  const mockUser: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    isActive: true
  }

  const mockCourse: Course = {
    code: "ITELECT4",
    title: "IT Elective 4",
    units: 3,
    semester: "1st"
  }

  const mockSubmission: Submission = {
    id: 1,
    studentId: 1,
    courseCode: "ITELECT4",
    repoUrl: "https://github.com/example/repo",
    submittedAt: new Date()
  }

  const handleUserSelect = (user: User) => {
    console.log("Selected user:", user)
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>GT2 - Part 1 of 3</h1>
          <h2>Components Demo</h2>
        </div>
      </section>
      <section>
        <h2>User Card</h2>
        <UserCard user={mockUser} onSelect={handleUserSelect} />
      </section>
      <section>
        <h2>Course Card</h2>
        <CourseCard course={mockCourse} />
      </section>
      <section>
        <h2>Submission Badge</h2>
        <SubmissionBadge submission={mockSubmission}>
          <p>Status: Pending</p>
        </SubmissionBadge>
      </section>
    </>
  )
}

export default App

