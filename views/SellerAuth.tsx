import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SellerAuthProps {
  onAuthSuccess?: () => void;
}

const SellerAuth: React.FC<SellerAuthProps> = ({ onAuthSuccess }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      let authedUser;
      if (mode === 'login') {
        authedUser = await login(email, password);
      } else {
        authedUser = await register(name, email, password, 'seller');
      }

      if (authedUser.role !== 'seller') {
        setError('This account is registered as a customer. Please use a seller account or sign up as a seller.');
        return;
      }
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-black mb-6 text-[#2D3748]">
        {mode === 'login' ? 'Seller Portal Login' : 'Create Seller Account'}
      </h1>
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#F7E8D0]">
        <div className="flex mb-6 gap-2 text-xs font-black uppercase tracking-widest">
          <button
            className={`flex-1 py-2 rounded-full ${mode === 'login' ? 'bg-[#2D3748] text-white' : 'bg-slate-100 text-slate-500'}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-full ${mode === 'signup' ? 'bg-[#2D3748] text-white' : 'bg-slate-100 text-slate-500'}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Store Owner Name</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2D3748] text-white font-black py-3 rounded-xl mt-2 disabled:opacity-60"
          >
            {isSubmitting ? 'Please wait…' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerAuth;
