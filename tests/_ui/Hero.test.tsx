/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Hero } from "../../src/app/_components/_ui/Hero";

describe("<Hero/>", () => {
  it("devrait avoir un paragraphe et une image", () => {
    //Given
    render(<Hero />);
    const heroParagraphe = screen.getByText(/Ta boussole*/);
    const heroImage = screen.getByAltText("nice pics");

    //When
    //no user action

    //Then
    expect(heroParagraphe).toBeDefined();
    expect(heroImage).toBeDefined();
  });
});
