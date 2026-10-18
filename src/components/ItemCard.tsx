import type { ApiItem } from "../types/index";

export interface ItemCardProps {
  readonly item: ApiItem;
  readonly onClaim: () => void;
  readonly onFound: () => void;
  readonly disabled?: boolean;
}

export default function ItemCard({ item, onClaim, onFound, disabled = false }: ItemCardProps) {
  return (
    <article className="project-card border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
      <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
        <p>Status: {item.status}</p>
        <p>Location: {item.locationCode}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-6">
        <button type="button" disabled={disabled} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50" onClick={onClaim}>Claim</button>
        <button type="button" disabled={disabled} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50" onClick={onFound}>Found</button>
      </div>
    </article>
  );
}
