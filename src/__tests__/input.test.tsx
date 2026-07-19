import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Input } from "@lib/components/input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
  });

  it("renders start icon", () => {
    render(
      <Input
        placeholder="Search"
        startIcon={<span data-testid="start-icon">🔍</span>}
      />,
    );
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
  });

  it("renders end icon", () => {
    render(
      <Input
        placeholder="Password"
        endIcon={<span data-testid="end-icon">👁</span>}
      />,
    );
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("renders both icons", () => {
    render(
      <Input
        placeholder="Amount"
        startIcon={<span data-testid="start-icon">$</span>}
        endIcon={<span data-testid="end-icon">💰</span>}
      />,
    );
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("renders as disabled", () => {
    render(<Input placeholder="Disabled" disabled />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("merges custom className on wrapper", () => {
    const { container } = render(
      <Input className="my-custom-class" placeholder="Custom" />,
    );
    const wrapper = container.querySelector(".my-custom-class");
    expect(wrapper).toBeInTheDocument();
  });

  it("passes additional HTML attributes to input", () => {
    render(
      <Input
        data-testid="test-input"
        aria-label="custom label"
        placeholder="Aria"
      />,
    );
    const input = screen.getByTestId("test-input");
    expect(input).toHaveAttribute("aria-label", "custom label");
  });
});
