import { useEffect, useState } from "react";
import type { ApiProject } from "../types/index";
import useUIStore from "../store/uiStore";
import ItemCard from "../components/ItemCard";

const dashboardItems: ApiProject[] = [
  {
    id: "Wallet-872361",
    slug: "wallet",
    title: "Black Wallet",
    description: "Black wallet with cherry keychain.",
    dueDate: "2026-08-27T04:00:00.000Z",
    category: "Wallet",
    location: "MB Building",
    status: "Lost",
    postedBy: "Student1",
    reportedDate: "2026-08-27",
  },
  {
    id: "Accessory-459201",
    slug: "pearl-earrings",
    title: "Pearl Earrings",
    description: "White pearl earrings.",
    dueDate: "2026-08-27T04:00:00.000Z",
    category: "Accessory",
    location: "MB Building",
    status: "Lost",
    postedBy: "Student1",
    reportedDate: "2026-08-27",
  },
  {
    id: "Vl2r8lGIb5o",
    slug: "cellphone",
    title: "iPhone 16",
    description: "iPhone 16 reported missing.",
    dueDate: "2026-08-27T04:00:00.000Z",
    category: "Electronics",
    location: "CBEAM",
    status: "Lost",
    postedBy: "Student1",
    reportedDate: "2026-08-27",
  },
  {
    id: "Keys-2046",
    slug: "keychain",
    title: "Blue Keychain",
    description: "Blue keychain with two keys.",
    dueDate: "2026-08-26T04:00:00.000Z",
    category: "Accessory",
    location: "Library",
    status: "Lost",
    postedBy: "Student1",
    reportedDate: "2026-08-26",
  },
];

function DashboardPage() {
  const [items, setItems] = useState<ApiProject[]>([]);
  const claimedItemIds = useUIStore((state) => state.claimedItemIds);
  const claimItem = useUIStore((state) => state.claimItem);

  useEffect(() => {
    setItems(dashboardItems);
  }, []);

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
