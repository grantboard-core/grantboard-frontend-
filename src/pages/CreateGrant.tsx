import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGrant } from '../lib/api';
import type { Milestone } from '../lib/api';

export default function CreateGrant() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    poster: '',
    reviewer: '',
    token: '',
    totalAmount: 0,
  });
  const [milestones, setMilestones] = useState<Milestone[]>([{ description: '', amount: 0 }]);
  const [loading, setLoading] = useState(false);

  const updateMilestone = (index: number, field: keyof Milestone, value: string | number) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const addMilestone = () => setMilestones([...milestones, { description: '', amount: 0 }]);
  const removeMilestone = (index: number) => setMilestones(milestones.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const grant = await createGrant({ ...form, milestones });
      navigate(`/grants/${grant.id}`);
    } catch {
      alert('Failed to create grant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Post a Grant</h1>
        <div className="space-y-4">
          {(['title', 'description', 'poster', 'reviewer', 'token'] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm text-gray-400 mb-1 capitalize">{field}</label>
              <input
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Total Amount (XLM)</label>
            <input
              type="number"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              value={form.totalAmount}
              onChange={(e) => setForm({ ...form, totalAmount: Number(e.target.value) })}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Milestones</label>
              <button onClick={addMilestone} className="text-xs text-indigo-400 hover:text-indigo-300">+ Add</button>
            </div>
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input
                    placeholder="Description"
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                    value={m.description}
                    onChange={(e) => updateMilestone(i, 'description', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    className="w-24 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                    value={m.amount}
                    onChange={(e) => updateMilestone(i, 'amount', Number(e.target.value))}
                  />
                  {milestones.length > 1 && (
                    <button onClick={() => removeMilestone(i)} className="text-red-400 hover:text-red-300 text-sm">✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium mt-4"
          >
            {loading ? 'Posting...' : 'Post Grant'}
          </button>
        </div>
      </div>
    </div>
  );
}