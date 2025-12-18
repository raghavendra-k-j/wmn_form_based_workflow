import { useState } from 'react';
import {
  Pill,
  Plus,
  Trash2,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

/* ============================================================================
 * TYPES
 * ============================================================================ */

interface PrescriptionEntry {
  id: string;
  date: string;
  visitNumber: number;
  medications: string;
  notes: string;
}

/* ============================================================================
 * SECTION WRAPPER COMPONENT
 * ============================================================================ */

interface SectionWrapperProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  badge?: React.ReactNode;
}

function SectionWrapper({ title, icon, iconColor, children, defaultExpanded = true, badge }: SectionWrapperProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden mb-3">
      <div 
        className="flex items-center justify-between px-3 py-2 bg-zinc-50/50 border-b border-zinc-100 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className={`flex-shrink-0 ${iconColor}`}>{icon}</span>
          <h3 className="font-semibold text-zinc-900 select-none text-sm">{title}</h3>
          {badge}
        </div>
        <button className="p-1 text-zinc-400 hover:text-zinc-600 rounded hover:bg-zinc-100 transition-colors">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
      {isExpanded && (
        <div className="p-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
 * MAIN COMPONENT
 * ============================================================================ */

export function AncPrescriptionsTab() {
  // Current prescription (for ongoing/regular medications)
  const [currentPrescription, setCurrentPrescription] = useState(
`• Folic Acid 5mg - Once daily
• Iron + Folic Acid (IFA) 100mg - Once daily after meals
• Calcium 500mg - Twice daily (2 hrs apart from iron)
• Vitamin D3 60,000 IU - Once weekly
• DHA (Omega-3) 200mg - Once daily with meals`
  );

  // Prescription history entries
  const [prescriptions, setPrescriptions] = useState<PrescriptionEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      visitNumber: 1,
      medications: `• Folic Acid 5mg OD
• Calcium 500mg BD
• Vitamin D3 60,000 IU weekly`,
      notes: 'Initial booking visit - started essential supplements'
    },
    {
      id: '2',
      date: '2024-01-20',
      visitNumber: 2,
      medications: `• Ondansetron 4mg SOS (for nausea)`,
      notes: 'Prescribed for morning sickness'
    },
    {
      id: '3',
      date: '2024-02-01',
      visitNumber: 3,
      medications: `• DHA 200mg OD`,
      notes: 'Added DHA for fetal brain development'
    },
    {
      id: '4',
      date: '2024-02-15',
      visitNumber: 4,
      medications: `• IFA 100mg + 0.5mg OD`,
      notes: 'Started iron supplementation from 2nd trimester'
    }
  ]);

  // Add new prescription
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    date: '',
    medications: '',
    notes: ''
  });

  const handleAddPrescription = () => {
    if (newPrescription.date && newPrescription.medications) {
      setPrescriptions(prev => [{
        id: Date.now().toString(),
        date: newPrescription.date,
        visitNumber: prev.length + 1,
        medications: newPrescription.medications,
        notes: newPrescription.notes
      }, ...prev]);
      setNewPrescription({ date: '', medications: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const deletePrescription = (id: string) => {
    if (confirm('Are you sure you want to delete this prescription record?')) {
      setPrescriptions(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-0">
      {/* Current / Regular Medications */}
      <SectionWrapper
        title="Current Medications"
        icon={<Pill className="w-4 h-4" />}
        iconColor="text-pink-500"
        badge={
          <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full ml-2">
            Active
          </span>
        }
      >
        <div className="space-y-3">
          <p className="text-xs text-zinc-500">
            List of regular medications and supplements for this pregnancy:
          </p>
          <textarea
            value={currentPrescription}
            onChange={(e) => setCurrentPrescription(e.target.value)}
            placeholder="Enter current medications...&#10;&#10;Example:&#10;• Folic Acid 5mg - Once daily&#10;• Calcium 500mg - Twice daily"
            rows={8}
            className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 focus:bg-white transition-all placeholder:text-zinc-400 resize-none font-mono"
          />
        </div>
      </SectionWrapper>

      {/* Prescription History */}
      <SectionWrapper
        title="Prescription History"
        icon={<FileText className="w-4 h-4" />}
        iconColor="text-indigo-500"
        badge={
          <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full ml-2">
            {prescriptions.length} Records
          </span>
        }
      >
        <div className="space-y-3">
          {/* Add New Button / Form */}
          {showAddForm ? (
            <div className="p-4 bg-indigo-50/50 rounded-lg border border-indigo-200">
              <h4 className="text-sm font-semibold text-zinc-800 mb-3">Add New Prescription</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-zinc-600 mb-1 block">Date</label>
                  <input
                    type="date"
                    value={newPrescription.date}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, date: e.target.value }))}
                    className="w-48 px-3 py-1.5 text-sm bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600 mb-1 block">Medications Prescribed</label>
                  <textarea
                    value={newPrescription.medications}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, medications: e.target.value }))}
                    placeholder="Enter medications...&#10;&#10;Example:&#10;• Tab. Paracetamol 500mg SOS&#10;• Iron syrup 10ml OD"
                    rows={4}
                    className="w-full px-3 py-2 text-sm bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 resize-none font-mono placeholder:text-zinc-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600 mb-1 block">Notes (optional)</label>
                  <input
                    type="text"
                    value={newPrescription.notes}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="e.g., Prescribed for nausea relief"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 placeholder:text-zinc-400"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleAddPrescription}
                    className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Save Prescription
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-1.5 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-md hover:bg-zinc-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Prescription Record
            </button>
          )}

          {/* Prescription List */}
          <div className="space-y-3">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                      Visit #{prescription.visitNumber}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {prescription.date}
                    </span>
                  </div>
                  <button
                    onClick={() => deletePrescription(prescription.id)}
                    className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <pre className="text-sm text-zinc-700 whitespace-pre-wrap font-mono bg-white p-2 rounded border border-zinc-100 mb-2">
                  {prescription.medications}
                </pre>
                
                {prescription.notes && (
                  <p className="text-xs text-zinc-500 italic">
                    📝 {prescription.notes}
                  </p>
                )}
              </div>
            ))}
          </div>

          {prescriptions.length === 0 && (
            <div className="text-center py-8 text-zinc-400">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No prescription records yet</p>
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
