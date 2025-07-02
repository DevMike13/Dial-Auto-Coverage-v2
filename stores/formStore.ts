import { create } from "@/node_modules/zustand/index";
import { persist } from '@/node_modules/zustand/middleware';

type FormData = {
  medicareEnrollment: string;
  zip: string;
  state: string;
  phone: string;
  offer_id: string;
  affiliate_id: string;
  sub1: string;
  transaction_id: string;
  key: string;
  type: string;
  did_number: string;
};
  
  type FormStore = {
    step: number;
    formData: FormData;
    nextStep: () => void;
    prevStep: () => void;
    updateField: (field: keyof FormData, value: string) => void;
    resetForm: () => void;
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
  };
  
  export const useFormStore = create<FormStore>()(
    persist(
      (set) => ({
        step: 0,
        formData: {
          medicareEnrollment: '',
          zip: '',
          state: '',
          phone: '',
          offer_id: '5148',
          affiliate_id: '3407',
          sub1: '',
          transaction_id: '',
          key: '',
          type: '',
          did_number: '+18336703557'
        },
        nextStep: () => set((state) => ({ step: state.step + 1 })),
        prevStep: () => set((state) => ({ step: state.step - 1 })),
        updateField: (field, value) =>
          set((state) => ({
            formData: { ...state.formData, [field]: value },
          })),
        resetForm: () =>
          set((state) => ({
            step: 0,
            formData: {
              medicareEnrollment: '',
              zip: '',
              state: '',
              phone: '',
              offer_id: state.formData.offer_id,
              affiliate_id: state.formData.affiliate_id,
              sub1: '',
              transaction_id: '',
              key: '',
              type: '',
              did_number: state.formData.did_number
            },
          })),
          hasHydrated: false,
          setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      }),
      {
        name: 'form-storage',
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  );
  