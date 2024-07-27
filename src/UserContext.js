import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './database/Database';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user);
      } else if (error) {
        console.error('Error fetching user:', error);
      }
      setLoading(false);
    };

    getUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setUser(session?.user || null);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, lastSubmissionTime, setLastSubmissionTime }}>
      {children}
    </UserContext.Provider>
  );
};
