import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import Button, { type Props } from ".";

const mockChildren = "Click Me";
const mockSpinnerRole = "spinbutton";
const defaultProps: Props = {
  children: mockChildren,
  isLoading: false,
};

const setup = async (props?: Partial<Props>) => {
  return render(<Button {...defaultProps} {...props} />);
};

describe("<Button />", () => {
  beforeEach(async () => vi.clearAllMocks());

  test("renders children correctly", async () => {
    const { getByText } = await setup();
    await expect.element(getByText(mockChildren)).toBeInTheDocument();
  });

  test.each([
    {
      isLoading: true,
      shouldShow: true,
      description: "shows spinner when loading",
    },
    {
      isLoading: false,
      shouldShow: false,
      description: "does not show spinner when not loading",
    },
  ])("$description", async ({ isLoading, shouldShow }) => {
    const { getByRole } = await setup({ isLoading });
    const spinner = getByRole(mockSpinnerRole);
    if (shouldShow) {
      expect(spinner).not.toBeNull();
    } else {
      expect(spinner.query()).toBeNull();
    }
  });
});
