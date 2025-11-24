'use client';
import Link from 'next/link';
// import { useAppSelector } from '../store/hooks';
// import { useLogoutMutation } from '../features/auth/authApi';
// import { useDispatch } from 'react-redux';
// import { clearAuth } from '../features/auth/authSlice';

export default function Navbar() {
//   const user = useAppSelector((s) => s.auth.user);
//   const [logout] = useLogoutMutation();
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//     } catch (e) {
//       // ignore
//     } finally {
//       dispatch(clearAuth());
//     }
//   };

  return (
    <nav className="bg-slate-800 px-4 py-3 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">Brand</Link>
        <div className="flex gap-4 items-center">
          <Link href="/">Home</Link>
          {/* {user ? ( */}
            {/* <>
              <Link href="/profile">Profile</Link>
              <button onClick={handleLogout} className="text-sm bg-red-600 px-3 py-1 rounded">Logout</button>
            </> */}
          {/* ) : ( */}
            <>
              <Link href="/login" className="text-sm">Login</Link>
              <Link href="/register" className="text-sm bg-indigo-600 px-3 py-1 rounded">Sign up</Link>
            </>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
}
