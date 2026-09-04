import { useQuery } from "@tanstack/react-query";
import type { ApiProject } from "../types/index";
import useUIStore from "../store/uiStore";
import ItemCard from "../components/ItemCard";
import { fetchProjects } from "../api/client";

function DashboardPage() {
  const claimedItemIds = useUIStore((state) => state.claimedItemIds);
  const claimItem = useUIStore((state) => state.claimItem);
  const { data: items = [], isPending, isError } = useQuery<ApiProject[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isPending) {
    return (
      <main className="page-frame page-panel animate-pulse">
        <p className="page-eyebrow">Campus lost & found</p>
        <h2 className="page-title">Loading items</h2>
        <p className="page-intro">Loading campus items...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="page-frame page-panel">
        <p className="page-eyebrow">Campus lost & found</p>
        <h2 className="page-title text-red-700">Items unavailable</h2>
        <p className="page-intro">Could not load campus items. Please try again.</p>
      </main>
    );
  }

  return (
    <main className="page-frame page-panel">
      <p className="page-eyebrow">Campus lost & found / 2026</p>
      <h2 className="page-title">Dashboard</h2>
      <p className="page-intro">Browse the latest lost and found reports on campus.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.filter((item) => !claimedItemIds.includes(item.id)).map((item) => (
          <ItemCard key={item.id} item={item} onClaim={() => claimItem(item.id, item.title, "Claimed")} onFound={() => claimItem(item.id, item.title, "Found")} />
        ))}
      </div>

    </main>
  );
}

export default DashboardPage;
