import { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  Mail, 
  Briefcase, 
  MessageSquare, 
  Globe, 
  Hash, 
  UserPlus,
  Edit2,
  X,
  Save,
  Droplets
} from 'lucide-react';
import { usePatientDetails } from '../context';
import { type Patient } from '../store';

/** 
 * Patient Profile Page - Carbon Design System
 * Handles both viewing and editing of comprehensive patient demographics.
 */
export function ProfilePage() {
  const { store } = usePatientDetails();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Patient>({ ...store.patient });

  const handleSave = () => {
    store.patient = { ...editData };
    // @ts-ignore - Triggering notify manually since we updated patient directly
    store.notify();
    setIsEditing(false);
  };

  const handleChange = (field: keyof Patient, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const patient = store.patient;

  return (
    <div className="h-full bg-zinc-100 flex flex-col overflow-hidden">
      {/* Carbon Header - User Friendly */}
      <div className="h-14 px-6 border-b border-zinc-300 flex items-center justify-between bg-white shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-bold text-zinc-900 uppercase tracking-widest">
            {isEditing ? 'Update Patient Details' : 'Patient Profile'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(false)}
                className="h-8 px-4 text-zinc-500 text-[12px] font-bold hover:bg-zinc-100 transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="h-8 px-5 bg-indigo-600 text-white text-[12px] font-bold hover:bg-indigo-700 flex items-center gap-2 transition-colors uppercase tracking-wider shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="h-8 px-5 border border-zinc-300 text-zinc-700 text-[12px] font-bold hover:bg-zinc-50 flex items-center gap-2 transition-colors uppercase tracking-wider bg-white shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit Details
            </button>
          )}
        </div>
      </div>

      {/* Profile Content - High Density Integrated View */}
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="grid grid-cols-12 gap-5">
          
          {/* Section 1: Clinical Demographics (9 Columns) */}
          <div className="col-span-9 flex flex-col gap-5">
            
            {/* Basic Information Section */}
            <ProfileCard title="Personal Information" icon={<User className="w-4 h-4" />} variant="indigo">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                <DataField 
                  label="Full Name" 
                  value={patient.name} 
                  isEditing={isEditing} 
                  editValue={editData.name}
                  onChange={v => handleChange('name', v)}
                  icon={<User className="w-3.5 h-3.5" />}
                />
                <DataField 
                  label="Patient ID" 
                  value={patient.uhid} 
                  readOnly
                  icon={<Hash className="w-3.5 h-3.5" />}
                />
                <DataField 
                  label="Date of Birth" 
                  value={patient.dateOfBirth} 
                  isEditing={isEditing} 
                  editValue={editData.dateOfBirth}
                  onChange={v => handleChange('dateOfBirth', v)}
                  type="date"
                  icon={<Calendar className="w-3.5 h-3.5" />}
                />
                <DataField 
                  label="Blood Group" 
                  value={patient.bloodGroup} 
                  isEditing={isEditing} 
                  editValue={editData.bloodGroup}
                  onChange={v => handleChange('bloodGroup', v)}
                  icon={<Droplets className="w-3.5 h-3.5" />}
                />
                <DataField 
                  label="Occupation" 
                  value={patient.occupation} 
                  isEditing={isEditing} 
                  editValue={editData.occupation}
                  onChange={v => handleChange('occupation', v)}
                  icon={<Briefcase className="w-3.5 h-3.5" />}
                />
              </div>
            </ProfileCard>

            {/* Contact & Communication Section */}
            <ProfileCard title="Contact Information" icon={<Phone className="w-4 h-4" />} variant="emerald">
              <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                <DataField 
                  label="Mobile Number" 
                  value={patient.phone} 
                  isEditing={isEditing} 
                  editValue={editData.phone}
                  onChange={v => handleChange('phone', v)}
                  icon={<Phone className="w-3.5 h-3.5" />}
                />
                <DataField 
                  label="WhatsApp" 
                  value={patient.whatsapp || 'Not Provided'} 
                  isEditing={isEditing} 
                  editValue={editData.whatsapp}
                  onChange={v => handleChange('whatsapp', v)}
                  icon={<MessageSquare className="w-3.5 h-3.5" />}
                />
                <DataField 
                  label="Backup Phone" 
                  value={patient.alternativePhone || 'Not Provided'} 
                  isEditing={isEditing} 
                  editValue={editData.alternativePhone}
                  onChange={v => handleChange('alternativePhone', v)}
                  icon={<Phone className="w-3.5 h-3.5" />}
                />
                <DataField 
                  label="Email Address" 
                  value={patient.email} 
                  isEditing={isEditing} 
                  editValue={editData.email}
                  onChange={v => handleChange('email', v)}
                  type="email"
                  icon={<Mail className="w-3.5 h-3.5" />}
                />
              </div>
            </ProfileCard>

            {/* Residential Information */}
            <ProfileCard title="Home Address" icon={<MapPin className="w-4 h-4" />} variant="amber">
              <div className="grid grid-cols-4 gap-x-6 gap-y-5">
                <DataField 
                  label="Address Line 1" 
                  value={patient.addressLine1} 
                  isEditing={isEditing} 
                  editValue={editData.addressLine1}
                  onChange={v => handleChange('addressLine1', v)}
                  fullWidth
                />
                <DataField 
                  label="Address Line 2" 
                  value={patient.addressLine2 || 'Not Provided'} 
                  isEditing={isEditing} 
                  editValue={editData.addressLine2}
                  onChange={v => handleChange('addressLine2', v)}
                  fullWidth
                />
                <DataField 
                  label="City" 
                  value={patient.city} 
                  isEditing={isEditing} 
                  editValue={editData.city}
                  onChange={v => handleChange('city', v)}
                />
                <DataField 
                  label="State" 
                  value={patient.state} 
                  isEditing={isEditing} 
                  editValue={editData.state}
                  onChange={v => handleChange('state', v)}
                />
                 <DataField 
                  label="Pincode" 
                  value={patient.pinCode} 
                  isEditing={isEditing} 
                  editValue={editData.pinCode}
                  onChange={v => handleChange('pinCode', v)}
                />
                <DataField 
                  label="Country" 
                  value={patient.country} 
                  isEditing={isEditing} 
                  editValue={editData.country}
                  onChange={v => handleChange('country', v)}
                />
              </div>
            </ProfileCard>
          </div>

          {/* Section 2: Support Information (3 Columns) */}
          <div className="col-span-3 flex flex-col gap-5">
            {/* Emergency Contact */}
            <ProfileCard title="Emergency Contact" icon={<UserPlus className="w-4 h-4" />} variant="rose">
              <div className="flex flex-col gap-5">
                <DataField 
                  label="Contact Name" 
                  value={patient.emergencyContactName} 
                  isEditing={isEditing} 
                  editValue={editData.emergencyContactName}
                  onChange={v => handleChange('emergencyContactName', v)}
                  icon={<User className="w-3.5 h-3.5" />}
                  fullWidth
                />
                <DataField 
                  label="Relationship" 
                  value={patient.emergencyRelationship} 
                  isEditing={isEditing} 
                  editValue={editData.emergencyRelationship}
                  onChange={v => handleChange('emergencyRelationship', v)}
                  fullWidth
                />
                <DataField 
                  label="Phone Number" 
                  value={patient.emergencyPhone} 
                  isEditing={isEditing} 
                  editValue={editData.emergencyPhone}
                  onChange={v => handleChange('emergencyPhone', v)}
                  icon={<Phone className="w-3.5 h-3.5" />}
                  fullWidth
                />
              </div>
            </ProfileCard>
          </div>

        </div>
      </div>
    </div>
  );
}

/** Internal Card Component with Variant Support */
function ProfileCard({ 
  title, 
  icon, 
  children, 
  variant = 'indigo' 
}: { 
  title: string, 
  icon: React.ReactNode, 
  children: React.ReactNode,
  variant?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'zinc'
}) {
  const styles = {
    indigo: 'bg-indigo-50 border-indigo-100/50 text-indigo-700 h-10',
    emerald: 'bg-emerald-50 border-emerald-100/50 text-emerald-700 h-10',
    amber: 'bg-amber-50 border-amber-100/50 text-amber-700 h-10',
    rose: 'bg-rose-50 border-rose-100/50 text-rose-700 h-10',
    zinc: 'bg-zinc-100 border-zinc-200 text-zinc-700 h-10'
  };

  return (
    <div className="bg-white border border-zinc-300 flex flex-col overflow-hidden shadow-none">
      <div className={`px-5 flex items-center gap-2.5 border-b border-inherit ${styles[variant]}`}>
        <div className="opacity-80">{icon}</div>
        <h3 className="text-[11px] font-bold uppercase tracking-widest">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

/** Internal Data Field Component (View/Edit) - More Legible */
function DataField({ 
  label, 
  value, 
  isEditing, 
  editValue, 
  onChange, 
  icon, 
  type = 'text', 
  fullWidth = false,
  readOnly = false
}: { 
  label: string, 
  value: string | number, 
  isEditing?: boolean, 
  editValue?: any, 
  onChange?: (v: any) => void,
  icon?: React.ReactNode,
  type?: string,
  fullWidth?: boolean,
  readOnly?: boolean
}) {
  if (isEditing && !readOnly) {
    return (
      <div className={`flex flex-col gap-1.5 ${fullWidth ? 'col-span-full' : ''}`}>
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
          {label}
        </label>
        <div className="relative flex items-center group">
          {icon && (
            <div className="absolute left-3 text-zinc-400 group-focus-within:text-indigo-600 transition-colors">
              {icon}
            </div>
          )}
          <input 
            type={type}
            value={editValue}
            onChange={e => onChange?.(e.target.value)}
            className={`w-full h-9 bg-zinc-50/80 border border-zinc-200 px-3 text-[13px] text-zinc-900 focus:outline-none focus:bg-white focus:border-indigo-500 transition-all ${icon ? 'pl-10' : ''}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'col-span-full' : ''}`}>
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{label}</span>
      <div className="flex items-center gap-2 min-h-[22px]">
        {icon && <div className="text-zinc-300 shrink-0">{icon}</div>}
        <span className="text-[13px] font-bold text-zinc-800 break-all">{value || '—'}</span>
      </div>
    </div>
  );
}



