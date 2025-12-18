import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { 
  ArrowLeft, 
  Save, 
  User, 
  MapPin, 
  Phone,
  Calendar,
  Mail,
  Briefcase,
  Hospital,
  Smartphone,
  MessageSquare,
  Globe,
  Hash,
  Activity,
  UserPlus
} from 'lucide-react';

interface PatientFormData {
  hospitalNumber: string;
  patientName: string;
  dateOfBirth: string;
  primaryPhone: string;
  whatsappNumber: string;
  sameAsPhone: boolean;
  alternativePhone: string;
  email: string;
  occupation: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  emergencyContactName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
}

const initialFormData: PatientFormData = {
  hospitalNumber: '',
  patientName: '',
  dateOfBirth: '',
  primaryPhone: '',
  whatsappNumber: '',
  sameAsPhone: false,
  alternativePhone: '',
  email: '',
  occupation: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: 'India',
  pinCode: '',
  emergencyContactName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
};

const relationshipOptions = ['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other'];

export function NewPatientPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);

  const handleChange = (field: keyof PatientFormData, value: string | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'sameAsPhone' && value === true) updated.whatsappNumber = prev.primaryPhone;
      if (field === 'primaryPhone' && prev.sameAsPhone) updated.whatsappNumber = value as string;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/patients');
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-50/50 font-sans">
      {/* Premium Header */}
      <div className="h-14 px-4 border-b border-zinc-200 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/patients')} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-zinc-900 tracking-tight leading-tight">Patient Registration</h1>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Create new electronic medical record</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/patients')} className="h-9 px-4 text-zinc-600 text-sm font-semibold hover:bg-zinc-100 rounded-md transition-all">
            Discard
          </button>
          <button onClick={handleSubmit} className="h-9 px-5 bg-teal-600 text-white rounded-md text-sm font-bold hover:bg-teal-700 transition-all flex items-center gap-2 shadow-lg shadow-teal-500/10 active:scale-95">
            <Save className="w-4 h-4" />
            Save Profile
          </button>
        </div>
      </div>

      {/* High-Density Dashboard Content */}
      <div className="flex-1 overflow-auto p-4 bg-zinc-50/50">
        <div className="flex flex-col gap-4">
          
          {/* Section 1: Basic Information (Full Width) */}
          <Card section="Basic Information" icon={<User className="w-4 h-4" />} color="teal">
            <div className="grid grid-cols-5 gap-4">
              <Input label="Hospital Number" icon={<Hospital className="w-3.5 h-3.5" />} value={formData.hospitalNumber} onChange={v => handleChange('hospitalNumber', v)} placeholder="HOSP-0000" />
              <Input label="Patient Name" icon={<User className="w-3.5 h-3.5" />} required value={formData.patientName} onChange={v => handleChange('patientName', v)} placeholder="Legal Full Name" />
              <Input label="Date of Birth" icon={<Calendar className="w-3.5 h-3.5" />} type="date" required value={formData.dateOfBirth} onChange={v => handleChange('dateOfBirth', v)} />
              <Input label="Primary Phone" icon={<Phone className="w-3.5 h-3.5" />} prefix="+91" required value={formData.primaryPhone} onChange={v => handleChange('primaryPhone', v)} placeholder="9999999999" />
              
              <div className="relative">
                <Input 
                  label="WhatsApp Number" 
                  icon={<MessageSquare className="w-3.5 h-3.5" />} 
                  prefix="+91" 
                  value={formData.whatsappNumber} 
                  onChange={v => handleChange('whatsappNumber', v)} 
                  disabled={formData.sameAsPhone}
                  placeholder="WhatsApp"
                />
                <button 
                  onClick={() => handleChange('sameAsPhone', !formData.sameAsPhone)}
                  className={`absolute top-0 right-0 text-[10px] font-bold uppercase tracking-tighter transition-colors ${formData.sameAsPhone ? 'text-teal-600' : 'text-zinc-400'}`}
                >
                  {formData.sameAsPhone ? 'Synced' : 'Sync Phone'}
                </button>
              </div>

              <Input label="Alternative Phone" icon={<Smartphone className="w-3.5 h-3.5" />} prefix="+91" value={formData.alternativePhone} onChange={v => handleChange('alternativePhone', v)} placeholder="Other number" />
              <Input label="Email ID" icon={<Mail className="w-3.5 h-3.5" />} type="email" value={formData.email} onChange={v => handleChange('email', v)} placeholder="email@address.com" />
              <Input label="Occupation" icon={<Briefcase className="w-3.5 h-3.5" />} value={formData.occupation} onChange={v => handleChange('occupation', v)} placeholder="e.g. Software Engineer" />
            </div>
          </Card>

          {/* Row 2: Two Columns */}
          <div className="grid grid-cols-12 gap-4">
            
            {/* Address Details (2/3 width) */}
            <div className="col-span-8">
              <Card section="Residential Address" icon={<MapPin className="w-4 h-4" />} color="blue">
                <div className="space-y-4">
                  <Input label="Address Line 1" icon={<MapPin className="w-3.5 h-3.5" />} required value={formData.addressLine1} onChange={v => handleChange('addressLine1', v)} placeholder="Door No, Building, Street" />
                  <Input label="Address Line 2 (Optional)" icon={<Activity className="w-3.5 h-3.5" />} value={formData.addressLine2} onChange={v => handleChange('addressLine2', v)} placeholder="Landmark, Locality" />
                  <div className="grid grid-cols-4 gap-4">
                    <Input label="City" icon={<Hash className="w-3.5 h-3.5" />} required value={formData.city} onChange={v => handleChange('city', v)} placeholder="City" />
                    <Input label="State" icon={<Globe className="w-3.5 h-3.5" />} required value={formData.state} onChange={v => handleChange('state', v)} placeholder="State" />
                    <Input label="Country" icon={<Globe className="w-3.5 h-3.5" />} required value={formData.country} onChange={v => handleChange('country', v)} placeholder="India" />
                    <Input label="PIN Code" icon={<Hash className="w-3.5 h-3.5" />} required value={formData.pinCode} onChange={v => handleChange('pinCode', v)} placeholder="600000" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Emergency Contact (1/3 width) */}
            <div className="col-span-4">
              <Card section="Emergency Access" icon={<UserPlus className="w-4 h-4" />} color="orange">
                <div className="space-y-4">
                  <Input label="Contact Person Name" icon={<User className="w-3.5 h-3.5" />} value={formData.emergencyContactName} onChange={v => handleChange('emergencyContactName', v)} placeholder="Next of Kin Name" />
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1">
                        Relationship
                      </label>
                      <select 
                        value={formData.emergencyRelationship} 
                        onChange={e => handleChange('emergencyRelationship', e.target.value)}
                        className="form-input-refined bg-zinc-50/50"
                      >
                        <option value="">Select Bond</option>
                        {relationshipOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <Input label="Emergency Phone" icon={<Phone className="w-3.5 h-3.5" />} prefix="+91" value={formData.emergencyPhone} onChange={v => handleChange('emergencyPhone', v)} placeholder="Contact Number" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** HELPER COMPONENTS */

interface CardProps {
  section: string;
  icon: React.ReactNode;
  color: 'teal' | 'blue' | 'orange';
  children: React.ReactNode;
}

function Card({ section, icon, color, children }: CardProps) {
  const themes = {
    teal: 'border-teal-100 text-teal-600 bg-teal-50/30',
    blue: 'border-blue-100 text-blue-600 bg-blue-50/30',
    orange: 'border-orange-100 text-orange-600 bg-orange-50/30'
  };
  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
      <div className={`px-4 py-2 border-b border-inherit flex items-center gap-2 ${themes[color]}`}>
        {icon}
        <span className="text-xs font-bold uppercase tracking-widest">{section}</span>
      </div>
      <div className="p-4 bg-white">
        {children}
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  prefix?: string;
  disabled?: boolean;
}

function Input({ label, icon, value, onChange, placeholder, required, type = 'text', prefix, disabled }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      <label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1">
        {label}
        {required && <span className="text-red-400 text-sm leading-none">*</span>}
      </label>
      <div className={`relative flex items-center group ${disabled ? 'opacity-60' : ''}`}>
        <div className="absolute left-2.5 flex items-center gap-2 pointer-events-none transition-colors group-focus-within:text-teal-600 text-zinc-400">
          {icon}
          {prefix && <span className="text-xs font-bold border-r border-zinc-200 pr-2">{prefix}</span>}
        </div>
        <input 
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`form-input-refined ${prefix ? '!pl-20' : '!pl-10'}`}
        />
      </div>
    </div>
  );
}

export default NewPatientPage;

