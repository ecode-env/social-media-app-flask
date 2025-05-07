import { AuthProvider }    from './context/AuthContext';
import { ThemeProvider }   from './context/ThemeContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header              from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx'
import HomePage            from './pages/HomePage.jsx';
import LoginPage           from './pages/LoginPage';
import RegisterPage        from "./pages/RegisterPage.jsx";
import SinglePost from './components/features/posts/SinglePost.jsx'
import './index.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/posts/:id" element={<SinglePost />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
