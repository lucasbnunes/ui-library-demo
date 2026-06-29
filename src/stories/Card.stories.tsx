import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import { expect, userEvent, within } from "storybook/test";

import { Card } from "./Card";

const meta = {
  title: "Example/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    accentColor: { control: "color" },
    featured: { control: "boolean" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Getting Started",
    description:
      "Use this card to display concise information with optional actions.",
  },
};

export const Featured: Story = {
  args: {
    title: "Pro Plan",
    description: "Unlock advanced features and priority support.",
    featured: true,
  },
};

export const WithAccentColor: Story = {
  args: {
    title: "Custom Accent",
    description:
      "Set the accentColor control in the panel to change the top border.",
    accentColor: "#8b5cf6",
  },
};

export const WithChildren: Story = {
  args: {
    title: "Card with Children",
    description: "This card renders additional content below the description.",
    children: (
      <div className="flex gap-2">
        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
          React
        </span>
        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          Tailwind
        </span>
        <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
          Storybook
        </span>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    title: "Clickable Card",
    description: "Click me or press Enter/Space to trigger the action.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("button", { name: /Clickable Card/i });
    await expect(card).toBeInTheDocument();
    await userEvent.click(card);
  },
};
