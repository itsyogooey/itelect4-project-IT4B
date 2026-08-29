// src/App.tsx — FINAL VERSION
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<CoursesPage />} />
          <Route path="projects/:slug" element={<CourseDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
