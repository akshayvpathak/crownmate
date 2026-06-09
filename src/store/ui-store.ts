import { create } from "zustand";

type AgeGateStep = "confirm" | "blocked";

interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isAgeVerified: boolean;
  showAgeGate: boolean;
  ageGateStep: AgeGateStep;
  stickyCtaVisible: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  verifyAge: (verified: boolean) => void;
  setAgeGateStep: (step: AgeGateStep) => void;
  setStickyCtaVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isAgeVerified: false,
  showAgeGate: true,
  ageGateStep: "confirm",
  stickyCtaVisible: false,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  verifyAge: (verified) =>
    set({
      isAgeVerified: verified,
      showAgeGate: !verified,
      ageGateStep: verified ? "confirm" : "blocked",
    }),

  setAgeGateStep: (step) => set({ ageGateStep: step }),

  setStickyCtaVisible: (visible) => set({ stickyCtaVisible: visible }),
}));
