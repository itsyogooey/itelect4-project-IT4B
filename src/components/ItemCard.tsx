import type { ApiProject } from "../types/index";

export interface ItemCardProps {
  readonly item: ApiProject;
  readonly onClaim: () => void;
  readonly onFound: () => void;
}

export default function ItemCard({ item, onClaim, onFound }: ItemCardProps) {
  return (
    <article className="project-card border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
      <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
        <p>Status: {item.status}</p>
        <p>Location: {item.location}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-6">
        <button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" onClick={onClaim}>Claim</button>
        <button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" onClick={onFound}>Found</button>
      </div>
    </article>
  );
}