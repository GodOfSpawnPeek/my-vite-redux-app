import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthForm from './components/AuthForm';
import LoginForm from './components/LoginForm';
import { selectIsAuthenticated, selectUser, logout, login } from './features/user/userSlice';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import PostFeed from './pages/PostFeed';
import ProfilePage from './pages/ProfilePage';

function AppContent({ isAuthenticated, user, dispatch }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {isAuthenticated && user && location.pathname !== '/login' && location.pathname !== '/register' && (
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 32px 0 32px',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: 24,
        }}>
          <nav style={{ display: 'flex', gap: 24 }}>
            <Link
              to="/"
              style={{
                color: location.pathname === '/' ? '#2563eb' : '#111',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Главная
            </Link>
            <Link
              to={`/profile/${user.id}`}
              style={{
                color: location.pathname.startsWith('/profile') ? '#2563eb' : '#111',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Профиль
            </Link>
          </nav>
          <span
            onClick={async () => {
              try {
                await fetch('http://localhost:5000/api/auth/logout', {
                  method: 'POST',
                  credentials: 'include',
                });
              } catch (e) {}
              dispatch(logout());
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = '/login';
            }}
            style={{
              color: '#e11d48',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'color 0.18s',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#be123c')}
            onMouseOut={e => (e.currentTarget.style.color = '#e11d48')}
          >
            Выйти
          </span>
        </header>
      )}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && user ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <PostFeed />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route
          path="/login"
          element={
            <LoginForm
              onSuccess={() => navigate('/')}
              onSwitchToRegister={() => navigate('/register')}
            />
          }
        />
        <Route
          path="/register"
          element={
            <AuthForm onSwitchToLogin={() => navigate('/login')} />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          dispatch(login({
            id: data.user.id,
            nickname: data.user.nickname,
            role: data.user.role,
            token: ''
          }));
        }
      });
  }, [dispatch]);

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        user={user}
        dispatch={dispatch}
      />
    </Router>
  );
}

export default App;
