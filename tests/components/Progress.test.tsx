import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Progress from "@/components/ui/Progress";

describe("Progress", () => {
  it("renders without crashing", () => {
    const { container } = render(<Progress value={50} />);
    expect(container.firstChild).toBeDefined();
  });

  it("clamps value > 100 to 100", () => {
    const { container } = render(<Progress value={150} />);
    const bar = container.querySelector("[style]") as HTMLElement;
    expect(bar?.style.width).toBe("100%");
  });

  it("clamps value < 0 to 0", () => {
    const { container } = render(<Progress value={-10} />);
    const bar = container.querySelector("[style]") as HTMLElement;
    expect(bar?.style.width).toBe("0%");
  });

  it("shows label when showLabel is true", () => {
    render(<Progress value={75} showLabel />);
    expect(screen.getByText("75%")).toBeDefined();
  });

  it("shows custom label text", () => {
    render(<Progress value={60} label="XP Progress" />);
    expect(screen.getByText("XP Progress")).toBeDefined();
  });
});
