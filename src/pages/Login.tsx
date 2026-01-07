import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use admin / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-hover p-5">
      <div className="bg-bg-card rounded-xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Employee Management</h1>
          <p className="text-text-secondary text-sm">Sign in to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-medium text-text-primary text-sm">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              className="px-4 py-3 border border-border-soft rounded-lg text-base transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-bg-card"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-text-primary text-sm">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              className="px-4 py-3 border border-border-soft rounded-lg text-base transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-bg-card"
            />
          </div>
          {error && <div className="bg-danger-soft text-danger px-3 py-3 rounded-lg text-sm text-center">{error}</div>}
          <button 
            type="submit" 
            className="bg-primary text-white px-4 py-3.5 rounded-lg text-base font-semibold mt-2 hover:bg-primary-hover hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
          <div className="text-center mt-2">
            <small className="text-text-secondary text-xs">Default credentials: admin / admin123</small>
          </div>
        </form>
      </div>
    </div>
  );
};
