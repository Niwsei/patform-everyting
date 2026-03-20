import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Currency = 'LAK' | 'USD' | 'THB';

interface CurrencyState {
  currency: Currency;
  rates: Record<Currency, number>; // Rate relative to LAK
  setCurrency: (currency: Currency) => void;
  formatPrice: (lakPrice: number) => string;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'LAK',
      rates: {
        LAK: 1,
        USD: 0.000045, // Example rates
        THB: 0.0016,
      },
      setCurrency: (currency) => set({ currency }),
      formatPrice: (lakPrice) => {
        const { currency, rates } = get();
        const converted = lakPrice * rates[currency];

        if (currency === 'USD') {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(converted);
        }

        if (currency === 'THB') {
           return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            maximumFractionDigits: 0,
          }).format(converted);
        }

        return `₭${lakPrice.toLocaleString()}`;
      },
    }),
    {
      name: 'currency-storage',
    }
  )
)
