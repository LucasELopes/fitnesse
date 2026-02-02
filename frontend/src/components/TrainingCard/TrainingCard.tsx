'use client';

import { useRouter } from 'next/navigation';

type Training = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  training: Training;
};

export function TrainingCard({ training }: Props) {
  const router = useRouter();

  return (
    <div
      className="
        rounded-2xl border bg-white p-6 shadow-sm
        transition hover:border-orange-500 select-none cursor-pointer
      "
    >
      <button
        onClick={() => router.push(`/${training.id}`)}
        className="w-full text-left cursor-pointer"
      >
        <h2 className="text-lg font-semibold text-center">
          {training.name}
        </h2>

        <p className="mt-2 text-sm text-slate-500 text-center">
          {training.description}
        </p>
      </button>
    </div>
  );
}
