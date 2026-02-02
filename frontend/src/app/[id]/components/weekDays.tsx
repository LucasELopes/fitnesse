'use client';

type WeekDaysProps = {
  selectedDay: string;
  onSelectDay: (day: string) => void;
};

const days = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];

export default function WeekDays({
  selectedDay,
  onSelectDay,
}: WeekDaysProps) {
  return (
    <section className="w-full flex justify-center">
      <div
        className="
          grid
          grid-cols-7
          gap-2
          max-w-4xl
        "
      >
        {days.map((day) => {
          const isActive = selectedDay === day;

          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`
                flex
                items-center
                justify-center

                h-[clamp(44px,6vw,64px)]
                w-[clamp(44px,6vw,64px)]

                rounded-xl
                border
                font-semibold
                text-[clamp(0.75rem,2.5vw,1rem)]
                transition-colors

                ${
                  isActive
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-white border-slate-300 text-slate-400 hover:border-orange-500 hover:text-orange-500'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </section>
  );
}
