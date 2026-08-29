import { useNavigate } from "react-router";
import useUIStore from "../store/uiStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ProfilePage() {
  const navigate = useNavigate();
  const claimedItems = useUIStore((state) => state.claimedItems);

  return (
    <main className="page-frame page-panel">
      <p className="page-eyebrow">Account</p>
      <h2 className="page-title">Profile</h2>
      <p className="page-intro">View your student account information.</p>

      <section className="project-card mt-8 max-w-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Name</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">Gwyneth A. Salazar</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Email</p>
            <Label htmlFor="profile-email" className="sr-only">Email</Label>
            <Input id="profile-email" value="Student1@example.com" readOnly className="mt-1 text-lg font-semibold" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Program</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">BS IT Student</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Department</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">CITE Department</p>
          </div>
        </div>
      </section>

      <section className="project-card mt-6 max-w-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Item activity</h3>
        {claimedItems.length > 0 ? (
          <div className="mt-4 space-y-3">
            {claimedItems.map((item) => (
              <div key={item.id} className="border-b border-slate-200 pb-3 text-sm dark:border-slate-700">
                <span className="font-semibold text-slate-800 dark:text-slate-100">{item.title} - {item.action}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">No item activity yet.</p>
        )}
      </section>

      <Button type="button" variant="secondary" className="mt-6" onClick={() => navigate("/")}>Back to Dashboard</Button>
    </main>
  );
}

export default ProfilePage;
