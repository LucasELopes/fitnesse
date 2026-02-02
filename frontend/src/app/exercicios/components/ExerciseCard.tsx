'use client';
import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal/Modal';
import { Exercise } from '@/types/Exercise';

type ExerciseCardProps = {
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

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [open, setOpen] = useState(false);
  const thumbnail = exercise.tutorial ? getYouTubeThumbnail(exercise.tutorial) : null;

  return (
    <>
      <div className="flex w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-4 shadow-sm gap-3 select-none">
        {/* Texto */}
        <div className="flex-1">
          <h3 className="text-base font-semibold">{exercise.exercise_name}</h3>
          {exercise.description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-3">
              {exercise.description}
            </p>
          )}
        </div>

        {/* Thumbnail clicável */}
        {exercise.tutorial && (
          <button
            onClick={() => setOpen(true)}
            className="flex-shrink-0 w-28 h-28 overflow-hidden rounded-lg cursor-pointer"
          >
            <Image
              src={thumbnail || DEFAULT_THUMBNAIL}
              alt={`Preview do tutorial de ${exercise.exercise_name}`}
              width={112}
              height={112}
              className="h-28 w-28 object-cover transition-transform duration-200 hover:scale-105"
              draggable={false}
            />
          </button>
        )}
      </div>

      {/* Modal */}
      {exercise.tutorial && open && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <h2 className="mb-4 text-xl font-semibold">{exercise.exercise_name}</h2>
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              className="h-full w-full"
              src={getYoutubeEmbedUrl(exercise.tutorial)}
              title={`Tutorial de ${exercise.exercise_name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Modal>
      )}
    </>
  );
}
