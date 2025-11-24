'use client';

import { useGetProfileQuery } from "@/features/auth/authApi";

export default function ProfilePage() {
//   const user = useAppSelector((s) => s.auth.user);
  // RTK Query will call /api/profile, and baseQueryWithReauth will refresh if necessary
  const { data, error, isLoading } = useGetProfileQuery();
  console.log(data)

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-400">Profile error</p>;

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">Profile</h2>
      <p className="text-slate-300">Email: {data?.user?.email ?? user?.email}</p>
      <p className="text-slate-400 mt-2">Member since: {new Date(data?.user?.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
