import { useState } from 'react';
import api from '../api/axios';
import { saveAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      saveAuth(res.data);
      navigate('/dashboard');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
};

export default Login;