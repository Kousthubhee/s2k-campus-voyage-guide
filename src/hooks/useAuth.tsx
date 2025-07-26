
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Security: Log auth events for monitoring
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('🔐 User signed in:', session.user.id);
          
          // Ensure profile exists with correct ID when user signs in
          setTimeout(async () => {
            try {
              console.log('🔍 Checking profile for user:', session.user.id);
              const { data: existingProfile, error: fetchError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', session.user.id)
                .single();

              if (fetchError && fetchError.code === 'PGRST116') {
                // Profile doesn't exist, create it
                console.log('📝 Creating profile for user:', session.user.id);
                const { error: insertError } = await supabase
                  .from('profiles')
                  .insert({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || session.user.email || 'New User',
                    email: session.user.email || ''
                  });
                
                if (insertError) {
                  console.error('❌ Error creating profile:', insertError);
                } else {
                  console.log('✅ Profile created successfully');
                }
              } else if (fetchError) {
                console.error('❌ Error checking profile:', fetchError);
              } else {
                console.log('✅ Profile already exists for user:', session.user.id);
              }
            } catch (error) {
              console.error('❌ Error in profile creation process:', error);
            }
          }, 100);
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('🔓 User signed out');
        }
        
        if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 Token refreshed for user:', session?.user?.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      console.log('🔓 Signing out user');
      await supabase.auth.signOut();
    } catch (error) {
      console.error('❌ Sign out error:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('🔐 Starting Google OAuth');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        console.error('❌ Google OAuth error:', error);
        throw error;
      }
    } catch (error) {
      console.error('❌ Google sign in failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signOut,
      signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
