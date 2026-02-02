'use client';

import { useEffect, useState } from 'react';
import { FiSearch, FiEdit, FiArrowLeft, FiPlus } from 'react-icons/fi';

import ExerciseCard from './components/ExerciseCard';
import ExerciseCardEdit from './components/ExerciseCardEdit';

import CreateExerciseModal from './components/CreateExerciseModal';
import EditExerciseModal from './components/EditExerciseModal';
import { Exercise } from '@/types/Exercise';

const CATEGORIES: Exercise['category'][] = [
  'peito',
  'costas',
  'ombro',
  'biceps',
  'triceps',
  'perna',
];

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingExercise, setEditingExercise] =
    useState<Exercise | null>(null);

  async function fetchExercises() {
    const res = await fetch('http://localhost:8000/exercises');
    const data: Exercise[] = await res.json();
    setExercises(data);
  }

  async function handleDeleteExercise(id: string) {
    if (!confirm('Deseja remover este exercício?')) return;

    await fetch(`http://localhost:8000/exercises/${id}`, {
      method: 'DELETE',
    });

    fetchExercises();
  }

  useEffect(() => {
    let isMounted = true;

    async function loadExercises() {
      const res = await fetch('http://localhost:8000/exercises');
      const data: Exercise[] = await res.json();
      if (isMounted) {
        setExercises(data);
      }
    }

    loadExercises();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredExercises = exercises.filter((ex) =>
    ex.exercise_name.toLowerCase().includes(search.toLowerCase())
  );

  const exercisesByCategory: Record<string, Exercise[]> = {};
  CATEGORIES.forEach((cat) => {
    exercisesByCategory[cat] = filteredExercises.filter(
      (ex) => ex.category === cat
    );
  });

  return (
    <>
      <main className="px-6 py-10">
        {/* Header */}
        <div className="mx-auto mb-8 grid w-full max-w-6xl grid-cols-3 items-center">
          <div />
          
          <h1 className="text-center text-2xl font-semibold">
            Exercícios
          </h1>
          
          <div className="flex justify-end gap-2">
            {editMode && (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:border-orange-500 hover:text-orange-500"
              >
                <FiPlus size={18} />
                Novo
              </button>
            )}
        
            <button
              onClick={() => setEditMode((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:border-orange-500 hover:text-orange-500"
            >
              <FiEdit size={18} />
              {editMode ? 'Concluir' : 'Editar'}
            </button>
          </div>
        </div>


        {/* Busca */}
        <div className="relative mx-auto mb-10 max-w-xl">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar exercícios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Lista */}
        <div className="mx-auto max-w-6xl space-y-10">
          {CATEGORIES.map((cat) => (
            <section key={cat}>
              <h2 className="mb-4 text-xl font-semibold capitalize">
                {cat}
                <hr className='text-gray-300'/>
              </h2>

              {exercisesByCategory[cat].length === 0 ? (
                <p className="text-sm text-gray-500">
                  Nenhum exercício nesta categoria.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {exercisesByCategory[cat].map((exercise) =>
                    editMode ? (
                      <ExerciseCardEdit
                        key={exercise.id}
                        exercise={exercise}
                        onEdit={() => setEditingExercise(exercise)}
                        onDelete={handleDeleteExercise}
                      />
                    ) : (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                      />
                    )
                  )}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      {/* Modais */}
      <CreateExerciseModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={fetchExercises}
      />

      {editingExercise && (
        <EditExerciseModal
          isOpen={true}
          exercise={editingExercise}
          onClose={() => setEditingExercise(null)}
          onUpdated={fetchExercises}
        />
      )}
    </>
  );
}
