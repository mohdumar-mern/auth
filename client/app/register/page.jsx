'use client';
import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useRegisterMutation } from '@/features/auth/authApi';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '../../features/auth/authSlice';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading }] = useRegisterMutation();
//   const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, password }).unwrap();
    //   dispatch(setCredentials({ accessToken: res.accessToken, user: res.user }));
      router.push('/profile');
    } catch (err) {
      alert(err?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-slate-800 p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <Button type="submit">{isLoading ? 'Creating...' : 'Create account'}</Button>
      </form>
    </div>
  );
}
