'use client';

import Image from 'next/image';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Exercise } from '@/types/Exercise';

type Props = {
  exercise: Exercise;
  onEdit: () => void;
  onDelete: (id: string) => void;
};

const DEFAULT_THUMBNAIL = '/images/default-tutorial.png';

function getYouTubeThumbnail(url?: string | null) {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/0.jpg`
      : null;
  } catch {
    return null;
  }
}

export default function ExerciseCardEdit({
  exercise,
  onEdit,
  onDelete,
}: Props) {
  const thumbnail = exercise.tutorial
    ? getYouTubeThumbnail(exercise.tutorial)
    : null;

  return (
    <div
      className="
        relative
        flex
        w-full
        max-w-xs
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition
        hover:border-orange-500
        animate-wiggle
        select-none
      "
    >
      {/* Ações flutuantes */}
      <div className="absolute right-2 top-2 z-10 flex gap-2">
        <button
          onClick={onEdit}
          className="
            rounded-md
            bg-white/90
            p-2
            shadow
            transition
            hover:text-orange-500
            cursor-pointer
          "
          title="Editar exercício"
        >
          <FiEdit size={14} />
        </button>

        <button
          onClick={() => onDelete(exercise.id)}
          className="
            rounded-md
            bg-white/90
            p-2
            shadow
            transition
            hover:text-red-500
            cursor-pointer
          "
          title="Excluir exercício"
        >
          <FiTrash2 size={14} />
        </button>
      </div>

      {/* Texto */}
      <div className="flex-1 pr-2">
        <h3 className="text-base font-semibold">
          {exercise.exercise_name}
        </h3>

        {exercise.description && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-3">
            {exercise.description}
          </p>
        )}
      </div>

      {/* Thumbnail (não clicável no modo edição) */}
      {exercise.tutorial && (
        <div className="flex-shrink-0 h-28 w-28 overflow-hidden rounded-lg">
          <Image
            src={thumbnail || DEFAULT_THUMBNAIL}
            alt={`Preview do tutorial de ${exercise.exercise_name}`}
            width={112}
            height={112}
            className="h-28 w-28 object-cover"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
