'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  FiArrowLeft,
  FiEdit,
  FiCheck,
  FiPlus,
} from 'react-icons/fi';

import WeekDays from '@/app/[id]/components/weekDays';
import ExerciseCard from '@/app/[id]/components/ExerciseCard';
import EditExerciseModal from '@/app/[id]/components/EditExerciseModal';
import CreateExerciseModal from '@/app/[id]/components/CreateExerciseModal';
import ExerciseCardEdit from '@/app/[id]/components/ExerciseCardEdit';
import { Exercise } from '@/types/Exercise';

type Training = {
  id: string;
  name: string;
  exercises: Exercise[];
};

function getTodayWeekDay(): string {
  const daysMap = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  return daysMap[new Date().getDay()];
}

export default function TrainingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [training, setTraining] = useState<Training | null>(null);
  const [selectedDay, setSelectedDay] = useState(getTodayWeekDay());
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingExercise, setEditingExercise] =
    useState<Exercise | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  async function fetchTraining() {
    const res = await fetch(`http://localhost:8000/trainings/${id}`);
    const data = await res.json();
    setTraining(data);
  }

  async function handleRemoveExercise(exerciseId: string) {
    if (!confirm('Remover exercício deste treino?')) return;

    await fetch(
      `http://localhost:8000/trainings/${id}/exercises`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exercise_id: exerciseId,
          week_day: selectedDay,
        }),
      }
    );

    fetchTraining();
  }

  useEffect(() => {
    fetchTraining();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!training) {
    return <p className="p-6 text-center">Carregando...</p>;
  }

  const exercisesByDay = training.exercises.filter(
    (ex) => ex.pivot.week_day === selectedDay
  );

  return (
    <>
      <main className="px-6 py-10">
        {/* Header */}
        <div className="mx-auto mb-6 grid w-full max-w-6xl grid-cols-3 items-center">
          <div className="flex justify-start">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:border-orange-500 hover:text-orange-500"
            >
              <FiArrowLeft size={18} />
              Voltar
            </button>
          </div>

          <h1 className="text-center text-2xl font-semibold">
            {training.name}
          </h1>

          <div className="flex justify-end gap-2">
            {isEditMode && (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:border-orange-500 hover:text-orange-500"
              >
                <FiPlus size={18} />
                Novo
              </button>
            )}

            <button
              onClick={() => setIsEditMode((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:border-orange-500 hover:text-orange-500"
            >
              {isEditMode ? (
                <>
                  <FiCheck size={18} />
                  Concluir
                </>
              ) : (
                <>
                  <FiEdit size={18} />
                  Editar
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <WeekDays
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>

        {/* Grid */}
        <section className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exercisesByDay.map((exercise) =>
            isEditMode ? (
              <ExerciseCardEdit
                key={exercise.id}
                exercise={exercise}
                onEdit={setEditingExercise}
                onRemove={handleRemoveExercise}
              />
            ) : (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
              />
            )
          )}

          {exercisesByDay.length === 0 && (
            <p className="col-span-full text-center text-slate-400">
              Nenhum exercício para este dia.
            </p>
          )}
        </section>
      </main>

      {/* Modais */}
      {editingExercise && (
        <EditExerciseModal
          isOpen
          trainingId={training.id}
          exercise={editingExercise}
          onClose={() => setEditingExercise(null)}
          onUpdated={fetchTraining}
        />
      )}

      {isCreateOpen && (
        <CreateExerciseModal
          isOpen
          trainingId={training.id}
          weekDay={selectedDay}
          onClose={() => setIsCreateOpen(false)}
          onCreated={fetchTraining}
        />
      )}
    </>
  );
}
