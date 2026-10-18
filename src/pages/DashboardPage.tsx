import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiItem } from "../types/index";
import useUIStore from "../store/uiStore";
import ItemCard from "../components/ItemCard";
import { fetchItems, updateItem } from "../api/client";

function DashboardPage() {
  const claimItem = useUIStore((state) => state.claimItem);
  const queryClient = useQueryClient();

  const { data: items = [], isPending, isError, error } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // GT3 only remembered Claim/Found in the browser. Now it is a PATCH, so
  // the new status is saved in Atlas and survives a refresh.
  const changeStatus = useMutation({
    mutationFn: ({ item, status }: { item: ApiItem; status: "claimed" | "found" }) =>
      updateItem(item.id, { status }),
    onSuccess: (updated, { status }) => {
      claimItem(updated.id, updated.title, status === "claimed" ? "Claimed" : "Found");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
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
        <p className="page-intro">{error.message}</p>
      </main>
    );
  }

  const lostItems = items.filter((item) => item.status === "lost");

  return (
    <main className="page-frame page-panel">
      <p className="page-eyebrow">Campus lost & found / 2026</p>
      <h2 className="page-title">Dashboard</h2>
      <p className="page-intro">Your items that are still lost. Mark one as claimed or found when it turns up.</p>

      {lostItems.length === 0 && (
        <p className="mt-6 text-sm text-slate-500">
          Nothing lost right now. <Link to="/projects" className="font-semibold text-blue-600">Report an item</Link>
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {lostItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            disabled={changeStatus.isPending}
            onClaim={() => changeStatus.mutate({ item, status: "claimed" })}
            onFound={() => changeStatus.mutate({ item, status: "found" })}
          />
        ))}
      </div>

      {changeStatus.isError && (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{changeStatus.error.message}</p>
      )}
    </main>
  );
}

export default DashboardPage;
