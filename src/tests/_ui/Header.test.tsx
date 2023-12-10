/**
 * @jest-environment jsdom
 */
import { render, screen, within } from "@testing-library/react";
import Header from "../../app/_components/_ui/Header";
import { userEvent } from "@testing-library/user-event";
import { menuItems } from "../../../public/menuItems";

describe("<Header/>", () => {
  it("L'entête de page est présente", async () => {
    // Given
    render(<Header />);

    const header = screen.getByRole("banner");
    const navigation = within(header).getByRole("navigation");
    //When
    //Pas d'action utilisateur

    // Then

    expect(header).toBeDefined();
    expect(navigation.classList.contains("hidden")).toBe(true);
  });

  it("Le menu mobile est complet", async () => {
    // Given
    render(<Header />);

    const header = screen.getByRole("banner");
    const navigation = within(header).getByRole("navigation");
    const navigationItems = within(navigation).getAllByRole("listitem");
    //When
    //Pas d'action utilisateur

    // Then

    expect(navigationItems.length).toBe(menuItems.length);
  });

  it("Le menu mobile s'affiche lorsque l'utilisateur clique sur 'menu'", async () => {
    // Given
    render(<Header />);

    const header = screen.getByRole("banner");
    const navigation = within(header).getByRole("navigation");
    const hamburgerButton = screen.getByTestId("hamburger"); // Replace with the actual test ID or selector

    //When
    await userEvent.click(hamburgerButton);
    // Then

    expect(navigation.classList.contains("hidden")).toBe(false);
  });
});
