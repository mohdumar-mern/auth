'use client';
import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/features/auth/authApi';
import { setCredentials } from '@/features/auth/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password)
      const res = await login({ email, password }).unwrap();
      console.log("res", res)
      // response expected: { accessToken, user }
      dispatch(setCredentials({ accessToken: res.accessToken, user: res.user }));
      router.push('/profile');
    } catch (err) {
      alert(err?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-slate-800 p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <Button type="submit">{isLoading ? 'Logging...' : 'Login'}</Button>
      </form>
    </div>
  );
}
