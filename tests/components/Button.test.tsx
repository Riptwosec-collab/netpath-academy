import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDefined();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByText("Disabled").closest("button")!;
    expect(btn.disabled).toBe(true);
  });

  it("is disabled when loading is true", () => {
    render(<Button loading>Loading</Button>);
    const btn = screen.getByText("Loading").closest("button")!;
    expect(btn.disabled).toBe(true);
  });

  it("renders primary variant by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByText("Primary").closest("button")!;
    expect(btn.className).toContain("cyan");
  });

  it("renders danger variant correctly", () => {
    render(<Button variant="danger">Delete</Button>);
    const btn = screen.getByText("Delete").closest("button")!;
    expect(btn.className).toContain("rose");
  });
});
