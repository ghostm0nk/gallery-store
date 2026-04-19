import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('id, email, display_name, role')
            .eq('id', session.user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 is 'No rows found' which means profile might not be created yet, handle in handle_new_user trigger
            console.error('Error fetching profile:', error);
          }
          setUser({ ...session.user, profile });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Initial check for current session
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      }
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, email, display_name, role')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
        }
        setUser({ ...session.user, profile });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};