import {
  Calendar,
  AlertTriangle,
  ClipboardList,
  Ruler,
  Scale
} from 'lucide-react';
import { EmbeddableMedicalHistory } from '../../medical-history/EmbeddableMedicalHistory';
import { EmbeddableObstetricHistory } from '../../obs-history/EmbeddableObstetricHistory';
import { Section, Field, TextAreaField } from './components';

/* ============================================================================
 * TYPES
 * ============================================================================ */

export interface AncBookingData {
  // Patient Details (from profile, displayed here)
  bookingDate: string;
  height: string;
  weight: string;
  bmi: string;
  
  // Examination at Booking
  thyroid: string;
  breast: string;
  pulseRate: string;
  cvs: string;
  rs: string;
  bp: string;
  pa: string; // Per Abdomen
  ve: string; // Vaginal Examination
  spo2: string;
  pallor: string;
  
  // Allergies
  knownAllergies: string;
  drugAllergies: string;
  foodAllergies: string;
}

/* ============================================================================
 * COMPONENT
 * ============================================================================ */

interface OverviewTabProps {
  bookingData: AncBookingData;
  updateBooking: (field: keyof AncBookingData, value: string) => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

export function AncOverviewTab({ bookingData, updateBooking, expandedSections, toggleSection }: OverviewTabProps) {
  const hasAllergies = bookingData.knownAllergies || bookingData.drugAllergies || bookingData.foodAllergies;

  return (
    <div className="space-y-0">
      {/* Obstetric History - Shows LMP, GA, EDD */}
      <EmbeddableObstetricHistory 
        defaultCollapsed={false}
      />

      {/* Booking Details */}
      <Section
        title="Booking Details"
        icon={<ClipboardList className="w-4 h-4" />}
        iconColor="text-blue-500"
        isExpanded={expandedSections.booking ?? true}
        onToggle={() => toggleSection('booking')}
      >
        {/* Row 1: Date, Height, Weight, BMI */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium text-zinc-500">Booking Date</label>
            <div className="relative">
              <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="date"
                value={bookingData.bookingDate}
                onChange={(e) => updateBooking('bookingDate', e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium text-zinc-500 flex items-center gap-1">
              <Ruler className="w-3 h-3" /> Height (cm)
            </label>
            <input
              type="text"
              value={bookingData.height}
              onChange={(e) => {
                updateBooking('height', e.target.value);
                // Auto-update BMI
                const heightCm = parseFloat(e.target.value);
                const weightKg = parseFloat(bookingData.weight);
                if (heightCm > 0 && weightKg > 0) {
                  const heightM = heightCm / 100;
                  updateBooking('bmi', (weightKg / (heightM * heightM)).toFixed(1));
                }
              }}
              placeholder="cm"
              className="w-full px-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium text-zinc-500 flex items-center gap-1">
              <Scale className="w-3 h-3" /> Weight (kg)
            </label>
            <input
              type="text"
              value={bookingData.weight}
              onChange={(e) => {
                updateBooking('weight', e.target.value);
                // Auto-update BMI
                const heightCm = parseFloat(bookingData.height);
                const weightKg = parseFloat(e.target.value);
                if (heightCm > 0 && weightKg > 0) {
                  const heightM = heightCm / 100;
                  updateBooking('bmi', (weightKg / (heightM * heightM)).toFixed(1));
                }
              }}
              placeholder="kg"
              className="w-full px-2 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-zinc-300"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="text-xs font-medium text-zinc-500">BMI</label>
            <input
              type="text"
              value={bookingData.bmi}
              readOnly
              placeholder="Auto"
              className="w-full px-2 py-1.5 text-sm bg-zinc-100 border border-zinc-200 rounded-md text-zinc-600 placeholder:text-zinc-300"
            />
          </div>
        </div>

        {/* Row 2: Examination */}
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">General Examination</p>
          <div className="grid grid-cols-5 gap-2">
            <Field small label="Thyroid" value={bookingData.thyroid} onChange={(v) => updateBooking('thyroid', v)} placeholder="+/-" />
            <Field small label="Breast" value={bookingData.breast} onChange={(v) => updateBooking('breast', v)} placeholder="NAD" />
            <Field small label="Pulse Rate" value={bookingData.pulseRate} onChange={(v) => updateBooking('pulseRate', v)} placeholder="bpm" />
            <Field small label="CVS" value={bookingData.cvs} onChange={(v) => updateBooking('cvs', v)} placeholder="S1S2+" />
            <Field small label="RS" value={bookingData.rs} onChange={(v) => updateBooking('rs', v)} placeholder="Clear" />
          </div>
        </div>

        {/* Row 3: More Examination */}
        <div className="grid grid-cols-5 gap-2">
          <Field small label="BP" value={bookingData.bp} onChange={(v) => updateBooking('bp', v)} placeholder="mm Hg" />
          <Field small label="P/A" value={bookingData.pa} onChange={(v) => updateBooking('pa', v)} placeholder="Soft" />
          <Field small label="V/E" value={bookingData.ve} onChange={(v) => updateBooking('ve', v)} placeholder="NAD" />
          <Field small label="SpO2" value={bookingData.spo2} onChange={(v) => updateBooking('spo2', v)} placeholder="%" />
          <Field small label="Pallor" value={bookingData.pallor} onChange={(v) => updateBooking('pallor', v)} placeholder="+/-" />
        </div>
      </Section>

      {/* Allergies */}
      <Section
        title="Allergies"
        icon={<AlertTriangle className="w-4 h-4" />}
        iconColor="text-red-500"
        isExpanded={expandedSections.allergies ?? true}
        onToggle={() => toggleSection('allergies')}
        badge={hasAllergies ? (
          <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">Recorded</span>
        ) : undefined}
      >
        <div className="space-y-3">
          <div className="p-3 bg-red-50/50 rounded-lg border border-red-100">
            <TextAreaField 
              label="Known Allergies" 
              value={bookingData.knownAllergies} 
              onChange={(v) => updateBooking('knownAllergies', v)} 
              placeholder="List any known allergies (NKDA if none)..."
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Drug Allergies" value={bookingData.drugAllergies} onChange={(v) => updateBooking('drugAllergies', v)} placeholder="e.g. Penicillin, Sulfa..." />
            <Field label="Food Allergies" value={bookingData.foodAllergies} onChange={(v) => updateBooking('foodAllergies', v)} placeholder="e.g. Peanuts, Shellfish..." />
          </div>
        </div>
      </Section>

      {/* Medical History */}
      <EmbeddableMedicalHistory 
        mode="summary"
        defaultCollapsed={true}
      />
    </div>
  );
}
