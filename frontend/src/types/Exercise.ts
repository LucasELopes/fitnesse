export type Exercise = {
  id: string;
  exercise_name: string;
  description: string;
  category: string;
  tutorial: string;
  pivot: {
    id: string;
    reps: number;
    weight: string | null;
    week_day: string;
  };
};