'use client';

import Image from 'next/image';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Exercise } from '@/types/Exercise';

type Props = {
  exercise: Exercise;
  onEdit: (exercise: Exercise) => void;
  onRemove: (id: string) => void;
};

const DEFAULT_THUMBNAIL = '/images/default-tutorial.png';

function getYouTubeThumbnail(url: string) {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
  } catch {
    return null;
  }
}

export default function ExerciseCardEdit({
  exercise,
  onEdit,
  onRemove,
}: Props) {
  const thumbnail =
    exercise.tutorial && getYouTubeThumbnail(exercise.tutorial);

  return (
    <div
      className="
        relative
        flex w-full max-w-sm gap-4
        rounded-2xl
        border border-slate-200
        bg-white
        p-4
        text-left
        shadow-sm
        transition
        hover:border-orange-500
        animate-wiggle
        select-none
      "
    >
      {/* Botões flutuantes */}
      <div className="absolute right-2 top-2 flex gap-2">
        <button
          onClick={() => onEdit(exercise)}
          className="
            rounded-md
            bg-white/90
            p-2
            shadow
            hover:text-orange-500
            transition
            cursor-pointer
          "
          title="Editar exercício"
        >
          <FiEdit size={16} />
        </button>

        <button
          onClick={() => onRemove(exercise.id)}
          className="
            rounded-md
            bg-white/90
            p-2
            shadow
            hover:text-red-500
            transition
            cursor-pointer
          "
          title="Excluir exercício"
        >
          <FiTrash2 size={16} />
        </button>
      </div>

      {/* Texto */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {exercise.exercise_name}
          </h3>

          <p className="mt-1 text-sm font-medium text-orange-500">
            {exercise.category}
          </p>
        </div>

        {/* Mesmo espaçamento do card normal */}
        <div className="mt-4 flex justify-between text-sm text-slate-600">
          <span>
            <strong>Reps:</strong> {exercise.pivot.reps}
          </span>

          <span>
            <strong>Peso:</strong>{' '}
            {exercise.pivot.weight
              ? `${exercise.pivot.weight} kg`
              : 'Livre'}
          </span>
        </div>
      </div>

      {/* Thumbnail */}
      <div
        className="
          pointer-events-none
          flex-shrink-0
          h-24 w-24
          overflow-hidden
          rounded-lg
          bg-slate-100
        "
      >
        <Image
          src={thumbnail || DEFAULT_THUMBNAIL}
          alt={`Thumbnail do exercício ${exercise.exercise_name}`}
          width={96}
          height={96}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
}
