/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VillaDetail, Amenity, LocationDistance, SpecificationSection } from "./types";

export const PROJECT_INFO = {
  name: "GMR MUKUNDA",
  tagline: "LIVE WHOLEHEARTEDLY",
  subtitle: "Gated Community Luxury Triplex Villas @ Rampur, Hanamkonda",
  developer: "GBR HOMES LLP",
  address: "On Hanamkonda-Hyderabad Highway, Old Thushara PG College Premises, Beside Kapil Foods, Rampur, Hanamkonda.",
  phone: "9704707976",
  email: "gbrhomesllp@gmail.com",
  reraNumber: "P00300008652",
  credaiMember: true,
  scale: "12.5 Acres | 130 Villas",
  clubhouseSize: "16,000 Sft",
};

export const VILLAS: VillaDetail[] = [
  {
    id: "v-east",
    name: "East-Facing Triplex Villa",
    plotSize: "35'9\" x 60'",
    plotArea: "238.33 sq. yds",
    groundFloor: "1460 Sft",
    firstFloor: "1460 Sft",
    secondFloor: "690 Sft",
    totalArea: "3610 Sft",
    facing: "East",
    description: "Designed with state-of-the-art aluminum formwork (MIVAN) shear wall technology. Provides exceptional structural strength, superior ventilation, and expansive layout containing luxurious double-height ceilings, modular spaces, and an open sky terrace bar.",
    features: [
      "3 Luxurious Bedrooms",
      "Spacious Multipurpose Hall / Home Theatre (690 Sft)",
      "Double Height Drawing Area for vertical space luxury",
      "Exclusive Provision for Villa Elevator (Lift)",
      "Open Bar Lounge with adjoining Sit-out",
      "Leather-finish granite staircase"
    ]
  },
  {
    id: "v-west",
    name: "West-Facing Triplex Villa",
    plotSize: "35'9\" x 60'",
    plotArea: "238.33 sq. yds",
    groundFloor: "1405 Sft",
    firstFloor: "1405 Sft",
    secondFloor: "770 Sft",
    totalArea: "3580 Sft",
    facing: "West",
    description: "A gorgeous West-facing triplex home featuring an optimized floor design. Focuses on seamless transition between indoor and outdoor living, complete with private balconies, double-height ceilings, and high-performance cross ventilation.",
    features: [
      "3 Premium Bedrooms with en-suite baths",
      "Spacious Family Lounge on First Floor",
      "Open Terrace and separate Utility Yard",
      "Integrated Elevator / Lift Provision",
      "Modern Multipurpose Hall with Bar Lounge",
      "Premium vitrified flooring throughout"
    ]
  },
  {
    id: "v-ne-corner",
    name: "North-East Corner Triplex Villa",
    plotSize: "60' x 60'",
    plotArea: "400.00 sq. yds",
    groundFloor: "1980 Sft",
    firstFloor: "1980 Sft",
    secondFloor: "756 Sft",
    totalArea: "4716 Sft",
    facing: "North-East",
    description: "The crown jewel of GMR Mukunda. An expansive North-East corner home designed to perfection for high-net-worth families. Offers maximum natural light, sprawling lawns, and an auxiliary servant room with private access.",
    features: [
      "4 Sprawling Bedrooms with master suite",
      "Dedicated Servant Room with private toilet",
      "Double Height Living room for high-volume ventilation",
      "Grand Dining Area with separate Pooja room",
      "Wrap-around glass balconies & wide green terraces",
      "Elevator shaft integrated"
    ]
  },
  {
    id: "v-nw-corner",
    name: "North-West Corner Triplex Villa",
    plotSize: "60' x 60'",
    plotArea: "400.00 sq. yds",
    groundFloor: "1880 Sft",
    firstFloor: "1880 Sft",
    secondFloor: "730 Sft",
    totalArea: "4490 Sft",
    facing: "North-West",
    description: "A highly spacious, ultra-luxury corner estate featuring standalone study quarters, oversized kitchens, and private utility zones. Designed for multi-generational comfort and premium indoor recreation.",
    features: [
      "4 Bedrooms & Independent Study Room",
      "Spacious Servant Quarters & Utility Yard",
      "Wide open double-height family lounge",
      "Gourmet kitchen with double granite counters",
      "Oversized open terrace & sky lounge",
      "Full premium sanitaries and plumbing systems"
    ]
  }
];

export const CLUBHOUSE_AMENITIES = [
  {
    floor: "Ground Floor",
    items: ["Super Market", "Meeting Room", "Grand Lounge", "Coffee Deck", "AC Gym", "Restrooms"]
  },
  {
    floor: "First Floor",
    items: ["AC Banquet Hall", "Yoga / Meditation Deck", "Baby Care Center"]
  },
  {
    floor: "Second Floor",
    items: ["AC Indoor Badminton Court", "Indoor Games Hall", "AC Mini Theatre"]
  },
  {
    floor: "Third Floor",
    items: ["AC Guest Rooms"]
  },
  {
    floor: "Terrace Floor",
    items: ["Multipurpose Dais", "Terrace Garden"]
  }
];

export const AMENITIES: Amenity[] = [
  { name: "Outdoor Gym", category: "outdoor" },
  { name: "Swimming Pool", category: "clubhouse" },
  { name: "Tennis Court", category: "outdoor" },
  { name: "Children's Play Area", category: "outdoor" },
  { name: "Landscaped Gardens with Avenue Tree Plantations", category: "outdoor" },
  { name: "Seating Zone", category: "outdoor" },
  { name: "Half Basketball Court", category: "outdoor" },
  { name: "Pet Park", category: "outdoor" },
  { name: "Tot Lot (or) Fun Zone", category: "outdoor" },
  { name: "Party Lawn", category: "outdoor" },
  { name: "100% Generator Back-up", category: "facility" },
  { name: "24/7 Security", category: "facility" },
  { name: "Intercom Facility", category: "facility" },
  { name: "Solar Fencing", category: "facility" },
  { name: "Rain Water Harvesting Pits", category: "facility" },
  { name: "Well-developed Park with a Landscaped Plaza", category: "outdoor" },
  { name: "STP (Sewage Treatment Plant)", category: "facility" },
  { name: "Nakshatra Garden", category: "outdoor" },
  { name: "Guest Drivers' Rooms", category: "facility" },
  { name: "Meditation Deck", category: "clubhouse" },
  { name: "Cricket Net", category: "outdoor" },
  { name: "Water Treatment Plant", category: "facility" }
];

export const SPECIFICATIONS: SpecificationSection[] = [
  {
    title: "Structure",
    details: [
      "RCC-framed structure with shear wall technology using high precision aluminium form work (MIVAN form work) to withstand seismic loads for Zone 2."
    ]
  },
  {
    title: "Doors and Windows",
    details: [
      "Main Door: 8'0\" height wood door frame with veneer finish door shutter and hardware of reputed brand.",
      "Internal Doors: 8'0\" height wood door frames and laminated flush doors with hardware of reputed brand.",
      "Windows: Aluminium windows with mosquito mesh shutters."
    ]
  },
  {
    title: "Flooring",
    details: [
      "Living, Drawing, Dining, Bed rooms, Kitchen and Foyer Areas: 1200mm x 1800mm glazed vitrified tiles of reputed brand.",
      "Multipurpose Hall: 1200mm x 1200mm vitrified wooden plank tiles of reputed brand.",
      "Balconies and Sitout Areas: Anti-skid vitrified tiles of reputed brand.",
      "Staircase: Leather-finish granite."
    ]
  },
  {
    title: "Painting",
    details: [
      "Internal: Smooth putty-finish with two coats of premium acrylic emulsion paint of reputed make over one coat of primer.",
      "External: Exteriors with texture/weather-proof paint of reputed brand."
    ]
  },
  {
    title: "Kitchen",
    details: [
      "Granite platform with stainless steel sink.",
      "Glazed ceramic tiles dado up to 4'-0\" height above kitchen platform."
    ]
  },
  {
    title: "Toilets",
    details: [
      "Single-lever diverter with overhead shower, wall hung EWC with concealed flushing cistern, counter top/half pedestal wash basins of reputed brand.",
      "Provision for geysers in all toilets.",
      "All CP fittings and sanitaryware of reputed brand.",
      "Designer concept wall tiles of reputed brand up to 8'0\"."
    ]
  },
  {
    title: "Water Supply",
    details: [
      "Borewell water and treated water supplied from underground sumps through hydro-pneumatic system to entire community."
    ]
  },
  {
    title: "Electrical",
    details: [
      "Concealed copper wiring of premium-brand and adequate light, fan, power points with modular switches of standard-make.",
      "Three-phase power supply for each unit with individual meter boards.",
      "Internet points in living room, master bedroom and multipurpose hall."
    ]
  },
  {
    title: "Power Back-up",
    details: [
      "100% DC backup for all villas and common facilities."
    ]
  },
  {
    title: "Landscaping and Security",
    details: [
      "Landscaping: Professionally designed landscaping by a reputed architect with exclusive lawns, footpaths, children's play areas, activity areas, outdoor gym equipment and synthetic play courts.",
      "Security: Sophisticated 24x7 security surveillance system, CCTV cameras in strategic locations, and clubhouse with monitoring and recording system. Solar power-fencing all-around the compound."
    ]
  },
  {
    title: "Lift",
    details: [
      "Provision for lift in each villa."
    ]
  }
];

export const NEARBY_PLACES: LocationDistance[] = [
  { name: "Outer Ring Road (ORR)", distance: "2.0 km", category: "transit" },
  { name: "DPS Warangal", distance: "2.0 km", category: "education" },
  { name: "The Hyderabad Public School", distance: "3.0 km", category: "education" },
  { name: "IT Park", distance: "3.0 km", category: "industry" },
  { name: "Textile Park", distance: "3.2 km", category: "industry" },
  { name: "Kazipet Junction Railway Station", distance: "3.5 km", category: "transit" },
  { name: "Sri Chaitanya CBSE School", distance: "4.0 km", category: "education" },
  { name: "KVS - Kendriya Vidyalaya", distance: "4.0 km", category: "education" },
  { name: "St. Ann's High School", distance: "4.0 km", category: "education" },
  { name: "St. Ann's Hospital", distance: "4.5 km", category: "healthcare" },
  { name: "St. Gabriel's School", distance: "4.5 km", category: "education" },
  { name: "Bishop Beretta School", distance: "4.5 km", category: "education" },
  { name: "NIT Warangal", distance: "5.0 km", category: "education" },
  { name: "Hanumakonda Collectorate", distance: "7.0 km", category: "transit" },
  { name: "Rohini Hospital", distance: "7.5 km", category: "healthcare" },
  { name: "Ekashila Hospital", distance: "9.0 km", category: "healthcare" },
  { name: "Kakatiya University", distance: "9.0 km", category: "education" },
  { name: "Medicover Hospital", distance: "10.0 km", category: "healthcare" }
];
