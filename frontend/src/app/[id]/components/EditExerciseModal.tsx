'use client';

import { useState } from 'react';
import { Exercise } from '@/types/Exercise';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  trainingId: string;
  exercise: Exercise;
  onUpdated: () => void;
};

const WEEK_DAYS = [
  { value: 'dom', label: 'Domingo' },
  { value: 'seg', label: 'Segunda' },
  { value: 'ter', label: 'Terça' },
  { value: 'qua', label: 'Quarta' },
  { value: 'qui', label: 'Quinta' },
  { value: 'sex', label: 'Sexta' },
  { value: 'sab', label: 'Sábado' },
];

export default function EditExerciseModal({
  isOpen,
  onClose,
  trainingId,
  exercise,
  onUpdated,
}: Props) {
  const [reps, setReps] = useState(exercise.pivot.reps);
  const [weight, setWeight] = useState(exercise.pivot.weight ?? '');
  const [weekDay, setWeekDay] = useState(exercise.pivot.week_day);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/trainings/${trainingId}/exercises/${exercise.pivot.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reps,
            weight: weight === '' ? null : weight,
            week_day: weekDay,
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error('Erro backend:', text);
        alert('Erro ao atualizar exercício. Veja o console.');
        return;
      }

      onUpdated();
      onClose();
    } catch (err) {
      console.error('Erro inesperado ao atualizar exercício:', err);
      alert('Erro inesperado ao atualizar exercício');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-xl font-semibold text-center">
          Editar exercício
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Exercício */}
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Exercício
            </label>
            <input
              value={exercise.exercise_name}
              disabled
              className="mt-1 w-full rounded-lg border bg-slate-100 px-3 py-2 text-sm"
            />
          </div>

          {/* Dia da semana */}
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Dia da semana
            </label>
            <select
              value={weekDay}
              onChange={(e) => setWeekDay(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
            >
              {WEEK_DAYS.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reps */}
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Repetições
            </label>
            <input
              type="number"
              min={1}
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>

          {/* Peso */}
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Peso (kg)
            </label>
            <input
              type="number"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
              placeholder="Opcional"
            />
          </div>

          {/* Ações */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
