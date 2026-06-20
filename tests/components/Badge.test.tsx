import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>CCNA</Badge>);
    expect(screen.getByText("CCNA")).toBeDefined();
  });

  it("renders primary variant", () => {
    const { container } = render(<Badge variant="primary">Primary</Badge>);
    expect(container.firstChild?.toString()).toBeTruthy();
  });

  it("renders danger variant", () => {
    render(<Badge variant="danger">Error</Badge>);
    const el = screen.getByText("Error");
    expect(el.className).toContain("rose");
  });

  it("renders success variant", () => {
    render(<Badge variant="success">Pass</Badge>);
    const el = screen.getByText("Pass");
    expect(el.className).toContain("emerald");
  });

  it("supports legacy color prop", () => {
    render(<Badge color="blue">Legacy</Badge>);
    const el = screen.getByText("Legacy");
    expect(el.className).toContain("cyan");
  });
});
