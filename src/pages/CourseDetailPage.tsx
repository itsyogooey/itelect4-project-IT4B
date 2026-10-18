// The item detail page (route /projects/:id).
// GT3 asked json-server for /projects?slug=... and read matches[0]. The real
// API has a route for one item, so there is no array to unwrap.
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { ApiItem, Location } from "../types/index";
import CourseCard from "../components/CourseCard";
import { fetchItemById, fetchLocationByCode } from "../api/client";

function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: item, isPending, isError, error } = useQuery<ApiItem>({
    queryKey: ["items", id],
    queryFn: () => fetchItemById(id ?? ""),
    enabled: Boolean(id),
  });

  // The second public route: GET /api/locations/:code, one object.
  const { data: location } = useQuery<Location>({
    queryKey: ["locations", item?.locationCode],
    queryFn: () => fetchLocationByCode(item?.locationCode ?? ""),
    enabled: Boolean(item?.locationCode),
  });

  if (isPending) return <div className="p-6 animate-pulse">Loading item...</div>;

  if (isError || !item) {
    return (
      <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-red-700">Item Not Found</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          {error?.message ?? "No reported item matches"} <strong>{id}</strong>
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
        >
          Back
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Item Details — {item.title}
      </h2>
      <CourseCard course={item} locationName={location?.name} />

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
        >
          Back to Items
        </button>
      </div>
    </main>
  );
}

export default CourseDetailPage;
