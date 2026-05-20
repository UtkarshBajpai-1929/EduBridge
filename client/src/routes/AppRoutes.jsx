import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegisterSchool from "../pages/RegisterSchool";
import RegisterUser from "../pages/RegisterUser";
import AdminDashboard from "../pages/AdminDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import StudentLayout from "../components/StudentLayout";
import StudentVideo from "../pages/StudentVideo";
import StudentDoubts from "../pages/StudentDoubts";
import TeacherLayout from "../components/TeacherLayout";
import AdminLayout from "../components/AdminLayout";
import ManageUsers from "../pages/ManageUsers";
import AdminDoubts from "../pages/AdminDoubts";
import AdminVideos from "../pages/AdminVideos";
import ManageSubjects from "../pages/ManageSubjects";
import Settings from "../pages/Settings";
import TeacherDoubts from "../pages/TeacherDoubts";
import TeacherVideos from "../pages/TeacherVideos";
import StudentResponse from "../pages/StudentResponse";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-school" element={<RegisterSchool />} />
      <Route path="/register-user" element={<RegisterUser />} />
      //admin routes
      <Route
      path="/admin"
      element={<AdminLayout/>}
      >
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoutes roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/manage-users"
        element={
          <ProtectedRoutes roles={["admin"]}>
            <ManageUsers />
          </ProtectedRoutes>
        }
      />
        <Route
        path="/admin/manage-subjects"
        element={
          <ProtectedRoutes roles={["admin"]}>
            <ManageSubjects/>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/doubts"
        element={
          <ProtectedRoutes roles={["admin"]}>
            <AdminDoubts />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/videos"
        element={
          <ProtectedRoutes roles={["admin"]}>
            <AdminVideos />
          </ProtectedRoutes>
        }
      />
        <Route
        path="/admin/settings"
        element={
          <ProtectedRoutes roles={["admin"]}>
            <Settings />
          </ProtectedRoutes>
        }
      />
      </Route>
      //teacher page routes
      <Route path="/teacher" element={<TeacherLayout/>}>
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoutes roles={["teacher"]}>
            <TeacherDashboard />
          </ProtectedRoutes>
        }
      />
       <Route
        path="/teacher/doubts"
        element={
          <ProtectedRoutes roles={["teacher"]}>
            <TeacherDoubts />
          </ProtectedRoutes>
        }
      />
       <Route
        path="/teacher/videos"
        element={
          <ProtectedRoutes roles={["teacher"]}>
            <TeacherVideos />
          </ProtectedRoutes>
        }
      />
       <Route
        path="/teacher/settings"
        element={
          <ProtectedRoutes roles={["teacher"]}>
            <Settings />
          </ProtectedRoutes>
        }
      />
      </Route>
      //student routes
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoutes roles={["student"]}>
              {" "}
              <StudentDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/student/videos"
          element={
            <ProtectedRoutes roles={["student"]}>
              {" "}
              <StudentVideo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/student/doubts"
          element={
            <ProtectedRoutes roles={["student"]}>
              {" "}
              <StudentDoubts />
            </ProtectedRoutes>
          }
        />
         <Route
          path="/student/response"
          element={
            <ProtectedRoutes roles={["student"]}>
              {" "}
              <StudentResponse/>
            </ProtectedRoutes>
          }
        />

          <Route
          path="/student/settings"
          element={
            <ProtectedRoutes roles={["student"]}>
              {" "}
              <Settings />
            </ProtectedRoutes>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
