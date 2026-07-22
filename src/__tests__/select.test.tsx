import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Select, SelectGroup, SelectItem } from "@lib/components/select";

describe("Select", () => {
  it("renders placeholder when no value selected", () => {
    render(
      <Select placeholder="Pick one...">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick one...");
  });

  it("renders selected value from defaultValue", () => {
    render(
      <Select
        placeholder="Pick one..."
        defaultValue="banana"
        items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
      >
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("Banana");
  });

  it("opens popup on trigger click and selects an option", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select
        placeholder="Pick one..."
        onValueChange={onChange}
        items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
      >
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </Select>,
    );

    await user.click(screen.getByRole("combobox"));

    const option = await screen.findByRole("option", { name: "Cherry" });
    await user.click(option);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("cherry", expect.any(Object));
    expect(screen.getByRole("combobox")).toHaveTextContent("Cherry");
  });
  it("does not open popup when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Select placeholder="Pick one..." disabled>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </Select>,
    );

    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("merges custom className on trigger", () => {
    render(
      <Select className="my-custom-class" placeholder="Test">
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    expect(screen.getByRole("combobox").className).toContain("my-custom-class");
  });

  it("forwards ref to trigger button", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Select ref={ref} placeholder="Ref">
        <SelectItem value="a">A</SelectItem>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders selected indicator on the chosen option", async () => {
    const user = userEvent.setup();

    render(
      <Select placeholder="Pick..." defaultValue="banana">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </Select>,
    );

    await user.click(screen.getByRole("combobox"));

    const selectedOption = await screen.findByRole("option", {
      name: "Banana",
    });
    const checkmark = selectedOption.querySelector("svg");
    expect(checkmark).toBeInTheDocument();

    const otherOption = screen.getByRole("option", { name: "Apple" });
    const otherCheckmark = otherOption.querySelector("svg");
    expect(otherCheckmark).not.toBeInTheDocument();
  });

  it("shows 'No options available' when no children provided", async () => {
    const user = userEvent.setup();
    render(<Select placeholder="Empty" />);

    await user.click(screen.getByRole("combobox"));
    expect(await screen.findByText("No options available")).toBeInTheDocument();
  });

  it("renders group labels for grouped options", async () => {
    const user = userEvent.setup();

    render(
      <Select placeholder="Pick...">
        <SelectGroup label="Citrus">
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="lemon">Lemon</SelectItem>
        </SelectGroup>
      </Select>,
    );

    await user.click(screen.getByRole("combobox"));
    expect(await screen.findByText("Citrus")).toBeInTheDocument();
  });
});
