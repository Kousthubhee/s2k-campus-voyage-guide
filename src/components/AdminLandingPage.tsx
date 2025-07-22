
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AdminLandingPageProps {
  onAccessGranted: () => void;
}

export const AdminLandingPage: React.FC<AdminLandingPageProps> = ({ onAccessGranted }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'Venture@pasS2Kampus25') {
      setError('');
      onAccessGranted();
    } else {
      setError("Access denied! That code's as fake as a 10€ biryani in Montmartre.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center space-y-6">
          {/* Lock Icon with Glow Effect */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30">
              <Lock className="h-12 w-12 text-purple-300 animate-pulse" />
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">
              🔒 Hey there, this area is strictly for admins of pasS2Kampus only.
            </h1>
            
            {/* Subtext */}
            <p className="text-lg text-gray-300 leading-relaxed">
              If you are one of us, use the code secretly provided to you.<br />
              If not... you're trespassing. Leave the page right now. 🫣
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="I solemnly swear I am up to no good..."
                className={`
                  w-full px-6 py-4 text-lg text-center
                  bg-white/10 backdrop-blur-sm 
                  border-2 border-purple-400/30
                  rounded-xl
                  text-white placeholder-gray-400
                  focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20
                  transition-all duration-300
                  shadow-lg shadow-purple-500/10
                  ${isShaking ? 'animate-pulse' : ''}
                `}
                autoFocus
              />
              
              {/* Glowing effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-sm -z-10 opacity-50"></div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`text-red-400 text-sm font-medium text-center p-2 rounded-lg bg-red-500/10 border border-red-500/20 ${isShaking ? 'animate-bounce' : ''}`}>
                {error}
              </div>
            )}

            {/* Submit Button (Hidden - form submits on Enter) */}
            <Button type="submit" className="sr-only">
              Submit
            </Button>
          </form>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-2 opacity-30">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>
    </div>
  );
};
