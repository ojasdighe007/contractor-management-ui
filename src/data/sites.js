export const sites = [
  {
    id: 'skyline-residences',
    name: 'Skyline Residences',
    location: 'Powai, Mumbai',
    manager: 'Rohan Mehta',
    phone: '+91 98200 11122',
    progress: 64,
    units: 48,
    startedOn: '2025-03-12',
    targetHandover: '2026-12-30',
    description: '12-storey premium residential tower with 48 apartments.',
  },
  {
    id: 'green-acres-villas',
    name: 'Green Acres Villas',
    location: 'Lonavala',
    manager: 'Anita Joshi',
    phone: '+91 99300 44455',
    progress: 32,
    units: 14,
    startedOn: '2025-09-01',
    targetHandover: '2027-04-15',
    description: '14 independent villas across a 3.5 acre gated layout.',
  },
  {
    id: 'harbour-view-tower',
    name: 'Harbour View Tower',
    location: 'Worli, Mumbai',
    manager: 'Sameer Khan',
    phone: '+91 98765 43210',
    progress: 88,
    units: 22,
    startedOn: '2024-06-20',
    targetHandover: '2026-08-30',
    description: 'Boutique 22-unit tower nearing finishing handover.',
  },
  {
    id: 'orchard-heights',
    name: 'Orchard Heights',
    location: 'Wakad, Pune',
    manager: 'Priya Nair',
    phone: '+91 91234 56789',
    progress: 18,
    units: 96,
    startedOn: '2026-01-08',
    targetHandover: '2028-06-30',
    description: 'Two-tower 96-flat development in early structural works.',
  },
];

export function findSite(id) {
  return sites.find((site) => site.id === id) ?? null;
}
