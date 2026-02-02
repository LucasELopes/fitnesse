'use client';

import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateTrainingModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    await fetch('http://localhost:8000/trainings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });

    setLoading(false);
    setName('');
    setDescription('');
    onCreated();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-center">
          Novo treino
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Nome do treino
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Descrição
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Cancelar
            </button>

            <button
              disabled={loading}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
