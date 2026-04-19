import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';

function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let authResponse;
      if (isSignIn) {
        authResponse = await supabase.auth.signInWithPassword({ email, password });
      } else {
        authResponse = await supabase.auth.signUp({ email, password });
      }

      if (authResponse.error) {
        setError(authResponse.error.message);
      } else {
        navigate('/profile'); // Redirect to profile or home on success
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
        />
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <Button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transform hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Loading...' : (isSignIn ? 'Sign In' : 'Sign Up')}
        </Button>
      </form>
      <p className="text-center text-gray-600 mt-6">
        {isSignIn ? 'Don\'t have an account?' : 'Already have an account?'}
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-blue-600 hover:text-blue-800 font-medium ml-2 transition-colors duration-200"
        >
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;