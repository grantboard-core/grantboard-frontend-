import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGrants } from '../lib/api';
import type { Grant } from '../lib/api';

export default function Home() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGrants()
      .then(setGrants)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">GrantBoard</h1>
          <Link
            to="/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Post a Grant
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading grants...</p>
        ) : grants.length === 0 ? (
          <p className="text-gray-400">No grants yet. Be the first to post one.</p>
        ) : (
          <div className="grid gap-4">
            {grants.map((grant) => (
              <Link
                key={grant.id}
                to={`/grants/${grant.id}`}
                className="block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{grant.title}</h2>
                    <p className="text-gray-400 text-sm mt-1">{grant.description}</p>
                  </div>
                  <span className="text-indigo-400 font-bold text-lg">{grant.totalAmount} XLM</span>
                </div>
                <div className="flex gap-4 mt-4 text-xs text-gray-500">
                  <span>{grant.milestones.length} milestones</span>
                  <span>{grant.applicants.length} applicants</span>
                  <span>{grant.selectedApplicant ? 'In Progress' : 'Open'}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}