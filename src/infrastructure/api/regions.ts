export interface RegionRange {
  name: string;
  offset: number;
  limit: number ;
}

export const REGIONS: RegionRange[] = [
  { name: "kanto", offset: 0, limit: 151 },
  { name: "johto", offset: 151, limit: 100 },
  { name: "hoenn", offset: 251, limit: 135 },
  { name: "sinnoh", offset: 386, limit: 108 },
  { name: "unova", offset: 494, limit: 155 },
  { name: "kalos", offset: 649, limit: 72 },
  { name: "alola", offset: 721, limit: 88 },
  { name: "galar", offset: 809, limit: 96 },
  { name: "paldea", offset: 905, limit: 120 },
];

export function getRegionRange(regionName: string): RegionRange {
  const region = REGIONS.find((r) => r.name === regionName);
  return region ?? REGIONS[0];
}


