// src/App.tsx — FINAL VERSION
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AiHelperPage from "./pages/AiHelperPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        {/* Public, like login: you cannot be logged in yet. */}
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<CoursesPage />} />
          <Route path="projects/:id" element={<CourseDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* GT5: behind the same guard -- the API refuses it without a
              token anyway, so the page should not offer it. */}
          <Route path="ai-helper" element={<AiHelperPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
