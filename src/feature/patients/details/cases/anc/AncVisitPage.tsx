import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Save, 
  Activity, 
  Stethoscope, 
  FileText,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Section, Field, TextAreaField } from './components';

/* ============================================================================
 * TYPES
 * ============================================================================ */

export interface AncVisit {
  id: string;
  date: string;
  complaints: string;
  weight: string;
  bp: string;
  weeksByLMP: string;
  sfh: string; // Symphysis Fundal Height
  pp: string;  // Presenting Part
  fh: string;  // Fetal Heart
  remarks: string;
  nextVisit: string;
  sb: string;
}

/* ============================================================================
 * COMPONENT
 * ============================================================================ */

interface AncVisitPageProps {
  visit?: AncVisit | null; // If null, it's a new visit
  onSave: (visit: AncVisit) => void;
  onBack: () => void;
}

export function AncVisitPage({ visit, onSave, onBack }: AncVisitPageProps) {
  // Section expansion state
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    examination: true,
    plan: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Form Data State
  const [formData, setFormData] = useState<AncVisit>({
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    complaints: '',
    weight: '',
    bp: '',
    weeksByLMP: '',
    sfh: '',
    pp: '',
    fh: '',
    remarks: '',
    nextVisit: '',
    sb: ''
  });

  // Load existing data if editing
  useEffect(() => {
    if (visit) {
      setFormData(visit);
    }
  }, [visit]);

  const updateField = (field: keyof AncVisit, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.date) {
      alert('Visit date is required');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-200 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-zinc-900">
              {visit ? 'Edit Visit' : 'New ANC Visit'}
            </h2>
            <p className="text-xs text-zinc-500">
              {formData.date ? new Date(formData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Set date...'}
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white text-sm font-semibold rounded-lg hover:bg-pink-700 transition-all shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Visit
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full">
        
        {/* SECTION 1: General Info */}
        <Section
          title="General Information"
          icon={<Calendar className="w-4 h-4" />}
          iconColor="text-blue-500"
          isExpanded={expandedSections.general}
          onToggle={() => toggleSection('general')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-medium text-zinc-500">Visit Date</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                />
              </div>
            </div>
            {/* Placeholder for Gestational Age calculation based on LMP if available in wider context */}
          </div>
          
          <TextAreaField 
            label="Chief Complaints" 
            value={formData.complaints} 
            onChange={(v) => updateField('complaints', v)} 
            placeholder="Describe patient's complaints, symptoms, or concerns..." 
            rows={3}
          />
        </Section>

        {/* SECTION 2: Examination & Vitals */}
        <Section
          title="Examination & Vitals"
          icon={<Activity className="w-4 h-4" />}
          iconColor="text-teal-500"
          isExpanded={expandedSections.examination}
          onToggle={() => toggleSection('examination')}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Field label="Weight (kg)" value={formData.weight} onChange={(v) => updateField('weight', v)} placeholder="e.g. 65" />
            <Field label="Blood Pressure (mmHg)" value={formData.bp} onChange={(v) => updateField('bp', v)} placeholder="e.g. 120/80" />
            <Field label="Weeks by LMP" value={formData.weeksByLMP} onChange={(v) => updateField('weeksByLMP', v)} placeholder="e.g. 24" />
            <Field label="SFH (cm)" value={formData.sfh} onChange={(v) => updateField('sfh', v)} placeholder="Symphysis Fundal Height" />
          </div>

          <div className="p-4 bg-zinc-50/50 rounded-lg border border-zinc-100 mb-2">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Stethoscope className="w-3 h-3" />
              Obstetric Findings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Presenting Part (PP)" value={formData.pp} onChange={(v) => updateField('pp', v)} placeholder="e.g. Cephalic" />
              <Field label="Fetal Heart (FH)" value={formData.fh} onChange={(v) => updateField('fh', v)} placeholder="bpm" />
              <Field label="S/B" value={formData.sb} onChange={(v) => updateField('sb', v)} placeholder="Scan/Blood details" />
            </div>
          </div>
        </Section>

        {/* SECTION 3: Plan & Advice */}
        <Section
          title="Assessment & Plan"
          icon={<FileText className="w-4 h-4" />}
          iconColor="text-purple-500"
          isExpanded={expandedSections.plan}
          onToggle={() => toggleSection('plan')}
        >
          <div className="mb-4">
            <TextAreaField 
              label="Remarks / Plan / Advice" 
              value={formData.remarks} 
              onChange={(v) => updateField('remarks', v)} 
              placeholder="Clinical plan, medications prescribed, advice given..." 
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-1 max-w-xs p-3 bg-blue-50/30 rounded-lg border border-blue-100">
            <label className="text-xs font-bold text-zinc-600 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Next Follow-up Visit
            </label>
            <div className="relative mt-1">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="date"
                value={formData.nextVisit}
                onChange={(e) => updateField('nextVisit', e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
              />
            </div>
            <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Patient will be notified via SMS
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}
