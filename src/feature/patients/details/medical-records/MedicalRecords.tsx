import { FileText } from 'lucide-react';

export function MedicalRecords() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-zinc-400">
        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-zinc-300" />
        </div>
        <p>Medical Records content goes here.</p>
      </div>
    </div>
  );
}
