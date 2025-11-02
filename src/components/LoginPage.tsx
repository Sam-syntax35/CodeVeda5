"use client";

import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logoImage from 'figma:asset/4d744d9dc222fec480d1bb61c0c3c5755b6f748e.png';

type Props = {
  onLoginSuccess: () => void;
};

export function LoginPage({ onLoginSuccess }: Props) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign In form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in production, this would validate against a backend
    if (signInEmail && signInPassword) {
      onLoginSuccess();
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - in production, this would create an account
    if (signUpName && signUpEmail && signUpPassword && signUpPassword === signUpConfirmPassword) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Section - Branding */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-700">
                <img src={logoImage} alt="Codeveda Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl text-indigo-600 dark:text-indigo-400">CODEVEDA</span>
            </div>

            <h1 className="text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6 leading-tight">
              Welcome to the Future of{' '}
              <span className="text-indigo-600 dark:text-indigo-400">Healthcare</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Advanced MDR infection control system combining real-time tracking, AI-powered monitoring, and comprehensive patient care.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {[
                'Real-time infection tracking and monitoring',
                '24/7 AI-powered medical assistance',
                'Secure patient data management',
                'Multi-role dashboard access'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Login/Signup Forms */}
          <div>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('signin')}
                  className={`flex-1 py-4 text-center transition-all ${
                    activeTab === 'signin'
                      ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-4 text-center transition-all ${
                    activeTab === 'signup'
                      ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {activeTab === 'signin' ? (
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl text-gray-900 dark:text-white mb-2">
                        Welcome Back
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Sign in to access your dashboard
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="signin-email" className="text-gray-700 dark:text-gray-300">
                          Email Address
                        </Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="signin-email"
                            type="email"
                            value={signInEmail}
                            onChange={(e) => setSignInEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="pl-10 h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signin-password" className="text-gray-700 dark:text-gray-300">
                          Password
                        </Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="signin-password"
                            type={showPassword ? 'text' : 'password'}
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                        </label>
                        <button
                          type="button"
                          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        GitHub
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl text-gray-900 dark:text-white mb-2">
                        Create Account
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Join Codeveda to get started
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="signup-name" className="text-gray-700 dark:text-gray-300">
                          Full Name
                        </Label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="signup-name"
                            type="text"
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value)}
                            placeholder="John Doe"
                            className="pl-10 h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signup-email" className="text-gray-700 dark:text-gray-300">
                          Email Address
                        </Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="signup-email"
                            type="email"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="pl-10 h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signup-password" className="text-gray-700 dark:text-gray-300">
                          Password
                        </Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="signup-password"
                            type={showPassword ? 'text' : 'password'}
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            placeholder="Create a password"
                            className="pl-10 pr-10 h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signup-confirm-password" className="text-gray-700 dark:text-gray-300">
                          Confirm Password
                        </Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="signup-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={signUpConfirmPassword}
                            onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10 h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {signUpConfirmPassword && signUpPassword !== signUpConfirmPassword && (
                          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                            Passwords do not match
                          </p>
                        )}
                      </div>

                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          required
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          I agree to the{' '}
                          <button type="button" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                            Terms of Service
                          </button>{' '}
                          and{' '}
                          <button type="button" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                            Privacy Policy
                          </button>
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
                      disabled={signUpPassword !== signUpConfirmPassword}
                    >
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                          Or sign up with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        GitHub
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Card>

            {/* Mobile Logo */}
            <div className="lg:hidden text-center mt-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-700">
                  <img src={logoImage} alt="Codeveda Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-2xl text-indigo-600 dark:text-indigo-400">CODEVEDA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
