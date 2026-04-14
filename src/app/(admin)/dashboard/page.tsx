// src/app/(admin)/dashboard/page.tsx
export default function AdminDashboard() {
  return (
    <div className="p-10 text-white bg-[#0d0d0d] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#1a1a1a] rounded-2xl border border-white/10 hover:border-red-500/50 transition-all">
          <h2 className="text-xl font-bold mb-2">Projects Management</h2>
          <p className="text-gray-400 mb-4">Add, edit or delete your portfolio projects.</p>
          <button className="bg-red-600 px-4 py-2 rounded-lg font-bold">Manage Projects</button>
        </div>
        <div className="p-6 bg-[#1a1a1a] rounded-2xl border border-white/10 hover:border-red-500/50 transition-all">
          <h2 className="text-xl font-bold mb-2">Blog Management</h2>
          <p className="text-gray-400 mb-4">Write and manage your thoughts/articles.</p>
          <button className="bg-red-600 px-4 py-2 rounded-lg font-bold">Manage Blogs</button>
        </div>
      </div>
    </div>
  );
}