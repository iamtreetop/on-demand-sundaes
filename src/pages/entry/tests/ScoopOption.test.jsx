import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test.only("Scoop count should be positive integer and in range", () => {
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

  // expect input to be invalid with negative number
  const vanillaInput = screen.getByRole("spinbutton");
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // expect input to be invalid with floats
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // expect input to be invalid when scoops is too large
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  // expect input to be valid with valid integer
  // note: test validation rules (the input displays as valid)
  // not react-bootstrap response
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
