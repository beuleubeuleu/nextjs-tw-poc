import { getDistanceVoldOiseauFromLatLonInKm } from "../src/utils";

describe("getDistanceVoldOiseauFromLatLonInKm", () => {
  it("calcule la distance entre deux points", () => {
    //Given
    const parisLat = 48.8566;
    const parisLon = 2.3522;

    const nearbyLat = 49.2827;
    const nearbyLon = 2.5023;

    const expectedDistance = 48.6;
    const delta = 0.1;

    //When
    const result = getDistanceVoldOiseauFromLatLonInKm(
      parisLat,
      parisLon,
      nearbyLat,
      nearbyLon,
    );

    //Then
    expect(result).toBeCloseTo(expectedDistance, delta);
  });

  it("calcule la distance entre deux points identique(0km)", () => {
    //Given
    const lat = 40.7128;
    const lon = -74.006;

    //When
    const result = getDistanceVoldOiseauFromLatLonInKm(lat, lon, lat, lon);

    //Then
    expect(result).toBe(0);
  });
});
