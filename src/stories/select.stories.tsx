import { Select, SelectGroup, SelectItem } from "@lib/components/select";
import type { Meta, StoryObj } from "@storybook/react-vite";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Select an option...",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: "text" },
    defaultValue: { control: "text" },
    children: { control: false },
    items: { control: false },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} items={fruits}>
      {fruits.map((f) => (
        <SelectItem key={f.value} value={f.value}>
          {f.label}
        </SelectItem>
      ))}
    </Select>
  ),
};

export const WithValue: Story = {
  render: (args) => (
    <Select {...args} items={fruits}>
      {fruits.map((f) => (
        <SelectItem key={f.value} value={f.value}>
          {f.label}
        </SelectItem>
      ))}
    </Select>
  ),
  args: {
    defaultValue: "cherry",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} items={fruits}>
      {fruits.map((f) => (
        <SelectItem key={f.value} value={f.value}>
          {f.label}
        </SelectItem>
      ))}
    </Select>
  ),
  args: {
    defaultValue: "banana",
    disabled: true,
  },
};

const groupedItems = [
  {
    label: "Citrus",
    items: [
      { value: "orange", label: "Orange" },
      { value: "lemon", label: "Lemon" },
      { value: "lime", label: "Lime" },
    ],
  },
  {
    label: "Berries",
    items: [
      { value: "strawberry", label: "Strawberry" },
      { value: "blueberry", label: "Blueberry" },
    ],
  },
  {
    label: "Tropical",
    items: [
      { value: "mango", label: "Mango" },
      { value: "pineapple", label: "Pineapple" },
      { value: "papaya", label: "Papaya" },
    ],
  },
] satisfies ReadonlyArray<{
  label: string;
  items: readonly { value: string; label: string }[];
}>;

export const Grouped: Story = {
  render: (args) => (
    <Select {...args} items={groupedItems}>
      {groupedItems.map((group) => (
        <SelectGroup key={group.label} label={group.label}>
          {group.items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      ))}
    </Select>
  ),
  args: {
    placeholder: "Choose a fruit...",
  },
};

export const LongList: Story = {
  render: (args) => {
    const items = Array.from({ length: 50 }, (_, i) => ({
      value: String(i + 1),
      label: `Item ${i + 1}`,
    }));
    const itemsMap = Object.fromEntries(items.map((i) => [i.value, i.label]));
    return (
      <Select {...args} items={itemsMap}>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    );
  },
  args: {
    placeholder: "Pick a number...",
  },
};

export const EmptyOptions: Story = {
  args: {},
};
