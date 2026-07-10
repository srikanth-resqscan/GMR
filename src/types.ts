/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  villaType: string;
  message: string;
  createdAt: string;
  daysRemaining?: number;
  isValid?: boolean;
  validUntil?: string;
}

export interface VillaDetail {
  id: string;
  name: string;
  plotSize: string;
  plotArea: string;
  groundFloor: string;
  firstFloor: string;
  secondFloor: string;
  totalArea: string;
  facing: 'East' | 'West' | 'North-East' | 'North-West';
  description: string;
  features: string[];
}

export interface Amenity {
  name: string;
  category: 'clubhouse' | 'outdoor' | 'facility';
}

export interface LocationDistance {
  name: string;
  distance: string;
  category: 'transit' | 'education' | 'healthcare' | 'industry';
}

export interface SpecificationSection {
  title: string;
  details: string[];
}
