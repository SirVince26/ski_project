import { Resort } from '@/lib/types';

/**
 * Corduroy Trip Cost Estimation Engine
 * 
 * Provides transparent, explainable cost estimates for ski trips.
 * Uses configurable assumptions that can be adjusted later.
 */

// Configurable assumptions — easy to tune or expose to users in the future
const LODGING_RATES = {
  budget: { nightly: 120, label: 'Budget (motel/hostel)' },
  moderate: { nightly: 220, label: 'Moderate (hotel/condo)' },
  premium: { nightly: 400, label: 'Premium (resort/luxury)' },
} as const;

type LodgingTier = keyof typeof LODGING_RATES;

export interface TripEstimateInput {
  resort: Resort;
  numDays: number;
  groupSize: number;
  lodgingTier?: LodgingTier;
}

export interface TripEstimate {
  liftTicketTotal: number;
  liftTicketPerPerson: number;
  lodgingTotal: number;
  lodgingNightly: number;
  lodgingTier: string;
  roomsNeeded: number;
  grandTotal: number;
  perPersonTotal: number;
  breakdown: {
    label: string;
    amount: number;
    detail: string;
  }[];
}

/**
 * Calculate estimated trip cost.
 * 
 * Lift tickets: days × price × group size
 * Lodging: days × nightly rate × rooms needed (assumes 2 per room)
 */
export function estimateTripCost(input: TripEstimateInput): TripEstimate {
  const { resort, numDays, groupSize, lodgingTier = 'moderate' } = input;

  const ticketPrice = resort.lift_ticket_price_usd || 0;
  const liftTicketPerPerson = ticketPrice * numDays;
  const liftTicketTotal = liftTicketPerPerson * groupSize;

  const roomsNeeded = Math.ceil(groupSize / 2);
  const lodgingNightly = LODGING_RATES[lodgingTier].nightly;
  const lodgingTotal = lodgingNightly * numDays * roomsNeeded;

  const grandTotal = liftTicketTotal + lodgingTotal;
  const perPersonTotal = groupSize > 0 ? Math.round(grandTotal / groupSize) : 0;

  return {
    liftTicketTotal,
    liftTicketPerPerson,
    lodgingTotal,
    lodgingNightly,
    lodgingTier: LODGING_RATES[lodgingTier].label,
    roomsNeeded,
    grandTotal,
    perPersonTotal,
    breakdown: [
      {
        label: 'Lift Tickets',
        amount: liftTicketTotal,
        detail: `${groupSize} × $${ticketPrice}/day × ${numDays} days`,
      },
      {
        label: 'Lodging',
        amount: lodgingTotal,
        detail: `${roomsNeeded} room${roomsNeeded > 1 ? 's' : ''} × $${lodgingNightly}/night × ${numDays} nights`,
      },
    ],
  };
}

export function getLodgingTiers() {
  return Object.entries(LODGING_RATES).map(([key, value]) => ({
    value: key as LodgingTier,
    label: value.label,
    nightly: value.nightly,
  }));
}
