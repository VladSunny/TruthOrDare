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
  const [saw, setSaw] = useState(null);
  const [rated, setRated] = useState(null);

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

    const fecthSawRated = async () => {
      const {data: cur_user} = await supabase.auth.getUser();

      if (!cur_user) {
        console.error('Error fetching user:');
        return;
      }

      const { data, error } = await supabase.from('users').select('saw, rated').eq('id', cur_user.user.id).single();
      if (data) {
        setSaw(data.saw);
        setRated(data.rated);
      } else if (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
    fecthSawRated();

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
    <UserContext.Provider value={{ user, loading, lastSubmissionTime, setLastSubmissionTime, rated, saw, setSaw, setRated }}>
      {children}
    </UserContext.Provider>
  );
};
