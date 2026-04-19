import React from 'react';
import { useParams, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const { mode } = useParams(); // 'login' or 'register'

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4">
      {mode === 'login' ? <LoginForm /> : <RegisterForm />}
      <div className="mt-4 text-gray-700">
        {mode === 'login' ? (
          <p>Don't have an account? <Link to="/auth/register" className="text-blue-600 hover:underline">Register here</Link></p>
        ) : (
          <p>Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline">Login here</Link></p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;