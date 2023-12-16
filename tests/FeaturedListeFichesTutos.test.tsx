/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import FeaturedListeFichesTutos from "../src/app/_components/FeaturedListeFichesTutos";
import { FicheTutoGateway } from "../src/_infrastructure/Gateway/FicheTutoGateway";
import { FicheTuto } from "../src/_domain/FicheTuto";
import { renderAsync } from "./renderAsync";

describe("<FeaturedListeFichesTutos/>", () => {
  it("", async () => {
    //Given
    jest
      .spyOn(FicheTutoGateway.prototype, "getFeatured")
      .mockImplementation(async (): Promise<FicheTuto[]> => {
        return [
          new FicheTuto("faz", "salut"),
          new FicheTuto("gage", "salut 2"),
        ];
      });

    //When
    await renderAsync(FeaturedListeFichesTutos, null);
    //Then
    expect(screen.getAllByRole("listitem").length).toBe(2);
  });
});
