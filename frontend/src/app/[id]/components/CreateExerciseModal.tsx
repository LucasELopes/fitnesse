'use client';

import { useState, useEffect } from 'react';
import { Exercise } from '@/types/Exercise';

type ValidationErrors = {
  [key: string]: string[];
};

type Props = {
  isOpen: boolean;
  trainingId: string;
  weekDay: string;
  onClose: () => void;
  onCreated: () => Promise<void>;
};

type FieldErrorProps = {
  name: string;
  errors: ValidationErrors;
};

function FieldError({ name, errors }: FieldErrorProps) {
  if (!errors[name]) return null;
  return (
    <p className="mt-1 text-sm text-red-500">
      {errors[name][0]}
    </p>
  );
}

export default function CreateExerciseModal({
  isOpen,
  trainingId,
  weekDay,
  onClose,
  onCreated,
}: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [category, setCategory] = useState('');
  const [exerciseId, setExerciseId] = useState('');
  const [description, setDescription] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const categories = ['peito', 'costas', 'ombro', 'biceps', 'triceps', 'perna'];

  // Buscar exercícios do backend
  useEffect(() => {
    async function fetchExercises() {
      try {
        const res = await fetch('http://localhost:8000/exercises');
        const data: Exercise[] = await res.json();
        setExercises(data);
      } catch (err) {
        console.error('Erro ao buscar exercícios:', err);
      }
    }

    fetchExercises();
  }, []);

  // Filtrar exercícios por categoria
  const filteredExercises = category
    ? exercises.filter((ex) => ex.category === category)
    : [];

  // Preencher descrição e tutorial ao selecionar exercício
  useEffect(() => {
    const selected = exercises.find((ex) => ex.id === exerciseId);
    if (selected) {
      setDescription(selected.description || '');
    }
  }, [exerciseId, exercises]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!exerciseId) {
        setErrors({ exercise_id: ['Selecione um exercício'] });
        setLoading(false);
        return;
    }

    try {
        const res = await fetch(
        `http://localhost:8000/trainings/${trainingId}/exercises`,
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
            exercise_id: exerciseId,
            week_day: weekDay,
            reps: reps ? Number(reps) : null,
            weight: weight ? Number(weight) : null,
            }),
        });
        if (res.status === 422) {
          const data = await res.json();
          setErrors(data.errors || {});
          return;
        }

        if (!res.ok) {
          const text = await res.text();
          console.error('Erro backend:', text);
          alert('Erro ao criar exercício. Veja o console.');
          return;
        }

        await onCreated(); // atualizar lista
        onClose(); // fechar modal
      } catch (err) {
        console.error('Erro inesperado:', err);
        alert('Erro inesperado ao criar exercício');
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold">
          Adicionar exercício
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Categoria */}
          <div>
            <label className="text-sm font-medium">Categoria</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setExerciseId('');
                setDescription('');
              }}
              className={`mt-1 w-full rounded-lg border px-3 py-2 ${
                errors.category ? 'border-red-500' : ''
              }`}
            >
              <option value="">Selecione a categoria</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <FieldError name="category" errors={errors} />
          </div>

          {/* Exercício */}
          <div>
            <label className="text-sm font-medium">Exercício</label>
            <select
              value={exerciseId}
              onChange={(e) => setExerciseId(e.target.value)}
              className={`mt-1 w-full rounded-lg border px-3 py-2 ${
                errors.exercise_id ? 'border-red-500' : ''
              }`}
              disabled={!category}
            >
              <option value="">Selecione o exercício</option>
              {filteredExercises.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.exercise_name}</option>
              ))}
            </select>
            <FieldError name="exercise_id" errors={errors} />
          </div>

          {/* Dia da semana */}
          <div>
            <label className="text-sm font-medium">Dia da semana</label>
            <input
              value={weekDay}
              disabled
              className="mt-1 w-full cursor-not-allowed rounded-lg border bg-slate-100 px-3 py-2 text-slate-600"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              disabled
            />
          </div>

          {/* Reps */}
          <div>
            <label className="text-sm font-medium">Repetições</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Peso */}
          <div>
            <label className="text-sm font-medium">Peso (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* Ações */}
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
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
