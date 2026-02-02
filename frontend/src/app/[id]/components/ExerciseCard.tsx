'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal/Modal';
import { Exercise } from '@/types/Exercise';

type Props = {
  exercise: Exercise;
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

function getYoutubeEmbedUrl(url: string) {
  if (!url) return '';
  return url.includes('youtu.be')
    ? `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`
    : `https://www.youtube.com/embed/${url.split('v=')[1]}`;
}

export default function ExerciseCard({ exercise }: Props) {
  const [open, setOpen] = useState(false);

  const thumbnail =
    exercise.tutorial && getYouTubeThumbnail(exercise.tutorial);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          flex w-full max-w-sm gap-4
          rounded-2xl
          border border-slate-200
          bg-white
          p-4
          text-left
          shadow-sm
          transition
          hover:border-orange-500
          select-none
          cursor-pointer
        "
      >
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

          {/* Bloco de infos — espaço garantido */}
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

        {/* Thumbnail (somente visual) */}
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
      </button>

      {/* Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="mb-4 text-xl font-semibold">
          {exercise.exercise_name}
        </h2>

        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <iframe
            className="h-full w-full"
            src={getYoutubeEmbedUrl(exercise.tutorial)}
            title="Tutorial do exercício"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  );
}
