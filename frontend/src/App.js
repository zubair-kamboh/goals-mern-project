import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './components/Header'
import { IsAuth, IsNotAuth } from './PrivateRoute'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <IsAuth>
              <Dashboard />
            </IsAuth>
          }
        />
        <Route
          path="/register"
          element={
            <IsNotAuth>
              <Signup />
            </IsNotAuth>
          }
        />
        <Route
          path="/login"
          element={
            <IsNotAuth>
              <Signin />
            </IsNotAuth>
          }
        />
      </Routes>

      <ToastContainer />
    </Router>
  )
}

export default App
