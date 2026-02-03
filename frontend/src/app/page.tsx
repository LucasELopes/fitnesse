'use client';

import { useEffect, useState } from 'react';
import { FiEdit, FiCheck, FiPlus } from 'react-icons/fi';

import EditTrainingModal from '@/components/EditTrainingModal/EditTrainingModal';
import CreateTrainingModal from '@/components/CreateTrainingModal/CreateTrainingModal';
import { TrainingCard } from '@/components/TrainingCard/TrainingCard';
import { TrainingCardEdit } from '@/components/TrainingCard/TrainingCardEdit';
import { Training } from '@/types/training';

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTraining, setEditingTraining] =
    useState<Training | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  async function fetchTrainings() {
    const res = await fetch(`http://localhost:8000/trainings`);
    const data = await res.json();
    setTrainings(data);
  }

  async function handleRemoveTraining(id: string) {
    if (!confirm('Deseja remover este treino?')) return;

    await fetch(`http://localhost:8000/trainings/${id}`, {
      method: 'DELETE',
    });

    fetchTrainings();
  }

  useEffect(() => {
    fetchTrainings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="flex flex-col items-center px-6 py-10">
        {/* Header */}
        <div className="mb-8 grid w-full max-w-6xl grid-cols-3 items-center">
          <div />

          <h1 className="text-center text-2xl font-semibold">
            Seus treinos
          </h1>

          <div className="flex justify-end gap-2">
            {isEditMode && (
              <button
                onClick={() => setIsCreateOpen(true)}
                className="
                  flex items-center gap-2
                  rounded-lg border px-4 py-2 text-sm
                  hover:border-orange-500 hover:text-orange-500
                "
              >
                <FiPlus size={18} />
                Novo
              </button>
            )}

            <button
              onClick={() => setIsEditMode((prev) => !prev)}
              className="
                flex items-center gap-2
                rounded-lg border px-4 py-2 text-sm
                hover:border-orange-500 hover:text-orange-500
              "
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

        {/* Grid */}
        <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainings.map((training) =>
            isEditMode ? (
              <TrainingCardEdit
                key={training.id}
                training={training}
                onEdit={setEditingTraining}
                onRemove={handleRemoveTraining}
              />
            ) : (
              <TrainingCard
                key={training.id}
                training={training}
              />
            ),
          )}

          {trainings.length === 0 && (
            <p className="text-slate-400">
              Nenhum treino cadastrado.
            </p>
          )}
        </div>
      </main>

      {/* Modal editar */}
      {editingTraining && (
        <EditTrainingModal
          training={editingTraining}
          onClose={() => setEditingTraining(null)}
          onUpdated={fetchTrainings}
        />
      )}

      {/* Modal criar */}
      <CreateTrainingModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={fetchTrainings}
      />
    </>
  );
}
