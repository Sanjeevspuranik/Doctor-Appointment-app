import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Applydoctor from "./pages/Applydoctor";
import Appointment from "./pages/Appointment";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/profile";
import NotificationPage from "./pages/NotificationPage";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import "./styles/NavBar.css";
import Help from "./pages/Help";
import { useSelector } from "react-redux";
import Spinners from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Users from "./pages/admin/Users";
import BookingPage from "./pages/BookingPage";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import LoginHelp from "./pages/help/LoginHelp";
import RegisterHelp from "./pages/help/RegisterHelp";
import DoctorHelp from "./pages/help/DoctorHelp";
import AppointmentHelp from "./pages/help/AppointmentHelp";
import Contact from "./pages/help/Contact";
import AboutDataSecurity from "./pages/help/AboutDataSecurity";
import ReadAboutMedicine from "./pages/articles/ReadAboutMedicine";
import ReadHealthArticles from "./pages/articles/ReadHealthArticles";

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <BrowserRouter>
      <Toaster />
      {loading ? (
        <Spinners />
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <Applydoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help/login-help"
              element={
                <ProtectedRoute>
                  <LoginHelp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help/register-help"
              element={
                <ProtectedRoute>
                  <RegisterHelp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help/appointment-help"
              element={
                <ProtectedRoute>
                  <AppointmentHelp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help/doctor-help"
              element={
                <ProtectedRoute>
                  <DoctorHelp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-data-security"
              element={
                <ProtectedRoute>
                  <AboutDataSecurity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/read-health-article"
              element={
                <ProtectedRoute>
                  <ReadHealthArticles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/read-about-medicine"
              element={
                <ProtectedRoute>
                  <ReadAboutMedicine />
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
