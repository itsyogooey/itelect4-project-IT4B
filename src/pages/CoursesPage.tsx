// The Items page (route /projects). GT4 Part 2: it reads YOUR items from the
// real API, and the "Report an item" form saves a new one there.
import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiItem, Location } from "../types/index";
import CourseCard from "../components/CourseCard";
import usePrevious from "../hooks/usePrevious";
import useUIStore from "../store/uiStore";
import { API_URL, createItem, fetchItems, fetchLocations } from "../api/client";
import { itemSchema, type ItemFormValues } from "@/schemas/itemSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function CoursesPage() {
  const searchTerm = useUIStore((state) => state.searchTerm);
  const setSearchTerm = useUIStore((state) => state.setSearchTerm);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);
  const queryClient = useQueryClient();

  // Private: request() sends the token, and the API returns only MY items.
  const { data: items, isPending, isError, error } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // Public reference data for the dropdown, straight from Atlas.
  const { data: locations = [] } = useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: { title: "", status: "lost", locationCode: "", reward: 0 },
  });

  const addItem = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      reset();
      // Read the list again so the new item appears.
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  // The form and the API agree on exactly these fields. No ownerId and no
  // createdAt: the server fills those in from the token and the schema.
  const onSubmit = (values: ItemFormValues): void => {
    addItem.mutate(values);
  };

  const locationName = (code: string): string =>
    locations.find((location) => location.code === code)?.name ?? code;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const filteredItems =
    items?.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];

  if (isPending) {
    return (
      <div className="mx-auto mt-10 max-w-4xl animate-pulse rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
        Loading campus items...
      </div>
    );
  }

  // ===== GT3: "Something went wrong while loading the campus item registry."
  // ===== GT4 Part 2: name the host it actually tried -- usually the bug.
  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        {error.message} -- tried {API_URL}/api/items
      </div>
    );
  }

  return (
    <main className="page-frame page-panel">
      <p className="page-eyebrow">Item registry / my reports</p>
      <h2 className="page-title">Lost &amp; Found Items</h2>
      <p className="page-intro">Report an item, then find it here. Your reports are saved to the database.</p>

      <section className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Report an item</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="item-form-grid">
            <div className="grid gap-1.5">
              <Label htmlFor="title">Title</Label>
              <input id="title" className="item-form-control" placeholder="Black Wallet" {...register("title")} />
              {errors.title && <p role="alert" className="text-xs font-semibold text-red-600">{errors.title.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="status">Status</Label>
              <select id="status" className="item-form-control" {...register("status")}>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
              {errors.status && <p role="alert" className="text-xs font-semibold text-red-600">{errors.status.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="locationCode">Location</Label>
              {/* The dropdown reads GET /api/locations -- reference data in Atlas. */}
              <select id="locationCode" className="item-form-control" {...register("locationCode")}>
                <option value="">Choose a location</option>
                {locations.map((location) => (
                  <option key={location.code} value={location.code}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.locationCode && (
                <p role="alert" className="text-xs font-semibold text-red-600">{errors.locationCode.message}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="reward">Reward (PHP)</Label>
              <input
                id="reward"
                type="number"
                min={0}
                max={10000}
                className="item-form-control"
                {...register("reward", { valueAsNumber: true })}
              />
              {errors.reward && <p role="alert" className="text-xs font-semibold text-red-600">{errors.reward.message}</p>}
            </div>

            <div className="grid gap-1.5 self-end">
              <Button type="submit" disabled={addItem.isPending} className="w-full">
                {addItem.isPending ? "Saving..." : "Report item"}
              </Button>
            </div>
          </div>
        </form>

        {/* The API's own sentence when it refuses, e.g. "Validation failed". */}
        {addItem.isError && (
          <p role="alert" className="text-sm font-semibold text-red-700">{addItem.error.message}</p>
        )}
      </section>

      <div className="submission-form mt-6">
        <input
          ref={searchInputRef}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Items"
          className="w-full px-4 py-3 text-sm"
        />
        <button
          type="button"
          onClick={() => searchInputRef.current?.focus()}
          className="w-full rounded bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Search
        </button>
      </div>

      {previousSearch && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500">Previous search: "{previousSearch}"</p>
      )}

      {filteredItems.length === 0 && (
        <p className="mt-6 text-sm text-slate-500">No items yet. Report one with the form above.</p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <CourseCard key={item.id} course={item} locationName={locationName(item.locationCode)} />
        ))}
      </div>
    </main>
  );
}

export default CoursesPage;
