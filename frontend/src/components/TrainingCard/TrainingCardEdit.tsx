'use client';

import { FiEdit, FiTrash2 } from 'react-icons/fi';

type Training = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  training: Training;
  onEdit: (training: Training) => void;
  onRemove: (id: string) => void;
};

export function TrainingCardEdit({
  training,
  onEdit,
  onRemove,
}: Props) {
  return (
    <div
      className="
        relative
        rounded-2xl border bg-white p-6 shadow-sm
        transition hover:border-orange-500
        animate-wiggle select-none
      "
    >
      {/* Ações de edição */}
      <div className="absolute right-2 top-2 flex gap-2">
        <button
          onClick={() => onEdit(training)}
          className="
            rounded-md bg-white/90 p-2 shadow
            hover:text-orange-500 cursor-pointer
          "
          title="Editar treino"
        >
          <FiEdit size={16} />
        </button>

        <button
          onClick={() => onRemove(training.id)}
          className="
            rounded-md bg-white/90 p-2 shadow
            hover:text-red-500 cursor-pointer
          "
          title="Excluir treino"
        >
          <FiTrash2 size={16} />
        </button>
      </div>

      <h2 className="text-lg font-semibold text-center">
        {training.name}
      </h2>

      <p className="mt-2 text-sm text-slate-500 text-center">
        {training.description}
      </p>
    </div>
  );
}
