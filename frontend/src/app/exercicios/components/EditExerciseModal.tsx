'use client';

import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { Exercise } from '@/types/Exercise';

export type EditExerciseModalProps = {
  isOpen: boolean;
  exercise: Exercise;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditExerciseModal({
  isOpen,
  exercise,
  onClose,
  onUpdated,
}: EditExerciseModalProps) {
  const [exercise_name, setExerciseName] = useState(exercise.exercise_name);
  const [category, setCategory] = useState(exercise.category);
  const [description, setDescription] = useState(exercise.description || '');
  const [tutorial, setTutorial] = useState(exercise.tutorial || '');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`http://localhost:8000/exercises/${exercise.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exercise_name,
          category,
          description,
          tutorial,
        }),
      });

      onUpdated();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-6 text-xl font-semibold">Editar exercício</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Nome do exercício
          </label>
          <input
            value={exercise_name}
            onChange={(e) => setExerciseName(e.target.value)}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="peito">Peito</option>
            <option value="costas">Costas</option>
            <option value="ombro">Ombro</option>
            <option value="biceps">Bíceps</option>
            <option value="triceps">Tríceps</option>
            <option value="perna">Perna</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Link do tutorial (YouTube)
          </label>
          <input
            value={tutorial}
            onChange={(e) => setTutorial(e.target.value)}
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
            type="submit"
            disabled={loading}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
