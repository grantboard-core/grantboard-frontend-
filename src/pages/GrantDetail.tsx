import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGrant, applyToGrant, selectApplicant, approveMilestone } from '../lib/api';
import type { Grant } from '../lib/api';

export default function GrantDetail() {
  const { id } = useParams<{ id: string }>();
  const [grant, setGrant] = useState<Grant | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicantAddress, setApplicantAddress] = useState('');

  useEffect(() => {
    if (id) getGrant(id).then(setGrant).finally(() => setLoading(false));
  }, [id]);

  const refresh = () => { if (id) getGrant(id).then(setGrant); };

  const handleApply = async () => {
    if (!id || !applicantAddress) return;
    await applyToGrant(id, applicantAddress);
    setApplicantAddress('');
    refresh();
  };

  const handleSelect = async (applicant: string) => {
    if (!id) return;
    await selectApplicant(id, applicant);
    refresh();
  };

  const handleApprove = async () => {
    if (!id) return;
    await approveMilestone(id);
    refresh();
  };

  if (loading) return <div className="min-h-screen bg-gray-950 text-white p-8">Loading...</div>;
  if (!grant) return <div className="min-h-screen bg-gray-950 text-white p-8">Grant not found.</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{grant.title}</h1>
              <p className="text-gray-400 mt-1">{grant.description}</p>
            </div>
            <span className="text-indigo-400 font-bold text-xl">{grant.totalAmount} XLM</span>
          </div>
          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>Poster: <span className="text-gray-300">{grant.poster}</span></p>
            <p>Reviewer: <span className="text-gray-300">{grant.reviewer}</span></p>
            <p>Token: <span className="text-gray-300">{grant.token}</span></p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Milestones</h2>
          <div className="space-y-3">
            {grant.milestones.map((m, i) => (
              <div
                key={i}
                className={`flex justify-between items-center p-3 rounded-lg border ${
                  i < grant.currentMilestone
                    ? 'border-green-700 bg-green-900/20'
                    : i === grant.currentMilestone
                    ? 'border-indigo-600 bg-indigo-900/20'
                    : 'border-gray-700'
                }`}
              >
                <div>
                  <p className="text-sm font-medium">{m.description}</p>
                  <p className="text-xs text-gray-400">{m.amount} XLM</p>
                </div>
                <span className="text-xs">
                  {i < grant.currentMilestone ? '✅ Done' : i === grant.currentMilestone ? '🔄 Current' : '⏳ Pending'}
                </span>
              </div>
            ))}
          </div>
          {grant.selectedApplicant && grant.currentMilestone < grant.milestones.length && (
            <button
              onClick={handleApprove}
              className="mt-4 w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium"
            >
              Approve Current Milestone
            </button>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Applicants</h2>
          {grant.applicants.length === 0 ? (
            <p className="text-gray-500 text-sm">No applicants yet.</p>
          ) : (
            <div className="space-y-2">
              {grant.applicants.map((a) => (
                <div key={a} className="flex justify-between items-center">
                  <span className="text-sm text-gray-300 truncate">{a}</span>
                  {!grant.selectedApplicant && (
                    <button
                      onClick={() => handleSelect(a)}
                      className="text-xs bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg"
                    >
                      Select
                    </button>
                  )}
                  {grant.selectedApplicant === a && (
                    <span className="text-xs text-green-400">Selected</span>
                  )}
                </div>
              ))}
            </div>
          )}
          {!grant.selectedApplicant && (
            <div className="mt-4 flex gap-2">
              <input
                placeholder="Your Stellar address"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                value={applicantAddress}
                onChange={(e) => setApplicantAddress(e.target.value)}
              />
              <button
                onClick={handleApply}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}