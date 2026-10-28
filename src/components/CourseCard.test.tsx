// ===== GT6: a NEW file ================================================
// Test 1 of 3: a component render. CourseCard is the item card on the
// Items page. The test sits beside the file it tests.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CourseCard from "./CourseCard";
import type { ApiItem } from "../types/index";

// One item shaped exactly like a row from GET /api/items. Typed, so a
// field that does not exist in ApiItem is a compile error here too.
const wallet: ApiItem = {
  id: "665f1c2ab4e8d3a1f0c9e101",
  title: "Black Wallet",
  status: "lost",
  locationCode: "MB",
  reward: 150,
  createdAt: "2026-10-17T02:15:00.000Z",
  ownerId: "665f1c2ab4e8d3a1f0c9e001",
};

// CourseCard links its title to the detail page, and <Link> only works
// inside a router. MemoryRouter is a router without a browser address bar.
function renderCard(item: ApiItem, locationName?: string) {
  render(
    <MemoryRouter>
      <CourseCard course={item} locationName={locationName} />
    </MemoryRouter>,
  );
}

describe("CourseCard", () => {
  it("shows the status, the location name and the reward", () => {
    renderCard(wallet, "MB Building");

    expect(screen.getByText("Black Wallet")).toBeInTheDocument();
    expect(screen.getByText("Status: lost")).toBeInTheDocument();
    expect(screen.getByText("Location: MB Building")).toBeInTheDocument();
    expect(screen.getByText("Reward: PHP 150")).toBeInTheDocument();
  });

  it("falls back to the location code and hides a zero reward", () => {
    // Everything from wallet, but no reward -- and no location name
    // passed, as before GET /api/locations has answered.
    const noReward: ApiItem = { ...wallet, reward: 0 };

    renderCard(noReward);

    expect(screen.getByText("Location: MB")).toBeInTheDocument();
    // queryBy, not getBy: it returns null instead of throwing, which is
    // what checking that something is NOT on the page needs.
    expect(screen.queryByText(/Reward:/)).not.toBeInTheDocument();
  });
});
