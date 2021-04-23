import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each toppings option from server", async () => {
  render(<Options optionType="toppings" />);
  // find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(images).toHaveLength(3);

  // check alt text for image
  // @ts-ignore
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toStrictEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("Should not update total if input is invalid", async () => {
  render(<Options optionType="scoops" />);

  // expect button to be enabled once scoop is added
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");

  // expect scoops subtotal to not be updated
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubtotal).toBeInTheDocument();
});
