/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Footer from "../../src/app/_components/_ui/Footer";

describe("<Footer/>", () => {
  it("Le pieds de page est present", () => {
    //Given
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    //When
    //pas d'actions utilisateur

    //Then
    expect(footer).toBeDefined();
  });
  it("Le pieds de page est complet", () => {
    //Given
    render(<Footer />);

    const footerItems = screen.getAllByRole("listitem");
    //When
    //pas d'actions utilisateur

    //Then
    expect(footerItems.length).toBe(8);
  });
});
