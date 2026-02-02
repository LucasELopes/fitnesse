'use client';

import { useState } from 'react';

type Training = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  training: Training;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditTrainingModal({
  training,
  onClose,
  onUpdated,
}: Props) {
  const [name, setName] = useState(training.name);
  const [description, setDescription] = useState(training.description);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch(`http://localhost:8000/trainings/${training.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    setLoading(false);
    onUpdated();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold text-center">
          Editar treino
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Nome do treino
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:opacity-50"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
