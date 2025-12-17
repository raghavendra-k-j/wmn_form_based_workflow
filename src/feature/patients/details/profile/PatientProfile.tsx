// import { Edit } from 'lucide-react';

const patientData = {
  id: 'WMN-1027',
  name: 'Ananya Gupta',
  age: '35Y, 4M',
  gender: 'F',
  phone: '+91 6363703772',
  risks: ['Diabetes Type 2', 'Previous C-Section']
};

export function PatientProfile() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-100">
            <h3 className="font-semibold text-zinc-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-500 font-medium">Full Name</label>
                  <p className="text-sm font-medium text-zinc-900">{patientData.name}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium">Date of Birth</label>
                  <p className="text-sm font-medium text-zinc-900">12 Jan 1999</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium">Blood Group</label>
                  <p className="text-sm font-medium text-zinc-900">O+</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium">Marital Status</label>
                  <p className="text-sm font-medium text-zinc-900">Married</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
