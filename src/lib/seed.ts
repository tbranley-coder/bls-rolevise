import seedJson from "../../SEED.json";

export type Classification = "keep" | "automate" | "outsource";

export type Task = {
  id: string;
  title: string;
  description: string;
  suggested: Classification;
  frequency: string;
  hours_per_week: number;
};

export type SeedData = {
  company: string;
  role: string;
  demo_login: {
    email: string;
    password: string;
  };
  audit_price_usd: number;
  classification_options: Classification[];
  deferred_allowed: boolean;
  tasks: Task[];
};

export const seed: SeedData = seedJson as SeedData;

export const CLASSIFICATIONS_KEY = "rolevise-classifications";

export const LABELS: Record<Classification, string> = {
  keep: "Keep",
  automate: "Automate",
  outsource: "Outsource",
};
