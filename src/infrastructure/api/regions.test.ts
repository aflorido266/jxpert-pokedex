import { describe, it, expect } from "vitest";
import { getRegionRange, REGIONS } from "./regions";

describe("getRegionRange", () => {

  it("devuelve kanto con offset 0 y limit 151", () => {
    const result = getRegionRange("kanto");
    expect(result.name).toBe("kanto");
    expect(result.offset).toBe(0);
    expect(result.limit).toBe(151);
  });

  it("devuelve johto con offset 151", () => {
    const result = getRegionRange("johto");
    expect(result.offset).toBe(151);
    expect(result.limit).toBe(100);
  });

  it("devuelve kanto por defecto si la región no existe", () => {
    const result = getRegionRange("marte" as any);
    expect(result.name).toBe("kanto");
  });

  it("devuelve paldea correctamente", () => {
    const result = getRegionRange("paldea");
    expect(result.offset).toBe(905);
    expect(result.limit).toBe(120);
  });

  it("REGIONS tiene exactamente 9 regiones", () => {
    expect(REGIONS).toHaveLength(9);
  });

});