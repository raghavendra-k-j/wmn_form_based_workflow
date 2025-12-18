import { useState } from 'react';
import {
  FlaskConical,
  ScanLine,
  Syringe,
  Calendar,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Droplets
} from 'lucide-react';

/* ============================================================================
 * TYPES
 * ============================================================================ */

interface BookingTest {
  name: string;
  date: string;
  value: string;
}

interface TrimesterTest {
  name: string;
  week24: { date: string; value: string };
  week32: { date: string; value: string };
  week36: { date: string; value: string };
}

interface Vaccine {
  name: string;
  date: string;
  done: boolean;
}

interface RhData {
  date: string;
  ict: string;
  antiD: string;
}

interface AntenatalSession {
  part: string;
  date: string;
}

interface USGScan {
  name: string;
  date: string;
  findings: string;
  gestationalAge?: string;
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
}

function SectionWrapper({ title, icon, iconColor, children, defaultExpanded = true }: SectionWrapperProps) {
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
 * EDITABLE CELL COMPONENT
 * ============================================================================ */

interface EditableCellProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date';
  className?: string;
}

function EditableCell({ value, onChange, placeholder = '-', type = 'text', className = '' }: EditableCellProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-2 py-1.5 text-xs bg-transparent border-0 focus:outline-none focus:bg-blue-50 rounded transition-colors text-center ${className}`}
    />
  );
}

/* ============================================================================
 * MAIN COMPONENT
 * ============================================================================ */

export function AncTestsScansTab() {
  // Booking Tests (1st Trimester)
  const [bookingTests, setBookingTests] = useState<BookingTest[]>([
    { name: 'Hb', date: '', value: '' },
    { name: 'PCV', date: '', value: '' },
    { name: 'Platelets', date: '', value: '' },
    { name: 'FBS/RBS', date: '', value: '' },
    { name: 'GCT/GTT', date: '', value: '' },
    { name: 'TSH', date: '', value: '' },
    { name: 'Rubella IgG', date: '', value: '' },
    { name: 'VDRL', date: '', value: '' },
    { name: 'HIV', date: '', value: '' },
    { name: 'HbsAg', date: '', value: '' },
    { name: 'ICT', date: '', value: '' },
    { name: 'Urine', date: '', value: '' },
    { name: 'HBA1c', date: '', value: '' },
    { name: 'Blood Group', date: '', value: '' },
    { name: 'Others', date: '', value: '' },
  ]);

  // Trimester-wise Follow-up Tests
  const [trimesterTests, setTrimesterTests] = useState<TrimesterTest[]>([
    { name: 'Hb', week24: { date: '', value: '' }, week32: { date: '', value: '' }, week36: { date: '', value: '' } },
    { name: 'PCV', week24: { date: '', value: '' }, week32: { date: '', value: '' }, week36: { date: '', value: '' } },
    { name: 'RBS/FBS', week24: { date: '', value: '' }, week32: { date: '', value: '' }, week36: { date: '', value: '' } },
    { name: 'GTT', week24: { date: '', value: '' }, week32: { date: '', value: '' }, week36: { date: '', value: '' } },
    { name: 'TSH', week24: { date: '', value: '' }, week32: { date: '', value: '' }, week36: { date: '', value: '' } },
  ]);

  // Vaccines
  const [vaccines, setVaccines] = useState<Vaccine[]>([
    { name: 'TD', date: '', done: false },
    { name: 'TDAP', date: '', done: false },
  ]);

  // Rh Incompatibility Data
  const [isRhNegative, setIsRhNegative] = useState(false);
  const [rhData, setRhData] = useState<RhData>({ date: '', ict: '', antiD: '' });

  // Antenatal Sessions
  const [sessions, setSessions] = useState<AntenatalSession[]>([
    { part: 'Part I', date: '' },
    { part: 'Part II', date: '' },
  ]);

  // USG Scans
  const [usgScans, setUsgScans] = useState<USGScan[]>([
    { name: 'Dating Scan', date: '', findings: '', gestationalAge: '' },
    { name: 'NT Scan (11-13 Wks)', date: '', findings: '', gestationalAge: '' },
    { name: 'Combined Screening', date: '', findings: '', gestationalAge: '' },
    { name: 'Anomaly Scan (TIFFA)', date: '', findings: '', gestationalAge: '' },
    { name: 'Growth Scan - I', date: '', findings: '', gestationalAge: '' },
    { name: 'Growth Scan - II', date: '', findings: '', gestationalAge: '' },
    { name: 'Doppler Study', date: '', findings: '', gestationalAge: '' },
    { name: 'Other Investigations', date: '', findings: '', gestationalAge: '' },
  ]);

  // Update handlers
  const updateBookingTest = (index: number, field: 'date' | 'value', value: string) => {
    setBookingTests(prev => prev.map((test, i) => 
      i === index ? { ...test, [field]: value } : test
    ));
  };

  const updateTrimesterTest = (index: number, week: 'week24' | 'week32' | 'week36', field: 'date' | 'value', value: string) => {
    setTrimesterTests(prev => prev.map((test, i) => 
      i === index ? { ...test, [week]: { ...test[week], [field]: value } } : test
    ));
  };

  const updateVaccine = (index: number, field: 'date' | 'done', value: string | boolean) => {
    setVaccines(prev => prev.map((v, i) => 
      i === index ? { ...v, [field]: value } : v
    ));
  };

  const updateSession = (index: number, date: string) => {
    setSessions(prev => prev.map((s, i) => 
      i === index ? { ...s, date } : s
    ));
  };

  const updateUSGScan = (index: number, field: 'date' | 'findings' | 'gestationalAge', value: string) => {
    setUsgScans(prev => prev.map((scan, i) => 
      i === index ? { ...scan, [field]: value } : scan
    ));
  };

  return (
    <div className="space-y-0">
      {/* Booking Tests (1st Trimester) */}
      <SectionWrapper
        title="Booking Investigations (1st Trimester)"
        icon={<FlaskConical className="w-4 h-4" />}
        iconColor="text-purple-500"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-50">
                <th className="border border-purple-200 px-3 py-2 text-left text-xs font-semibold text-purple-700 w-40">Test</th>
                <th className="border border-purple-200 px-3 py-2 text-center text-xs font-semibold text-purple-700 w-32">Date</th>
                <th className="border border-purple-200 px-3 py-2 text-center text-xs font-semibold text-purple-700">Value / Result</th>
              </tr>
            </thead>
            <tbody>
              {bookingTests.map((test, index) => (
                <tr key={test.name} className="hover:bg-zinc-50 transition-colors">
                  <td className="border border-zinc-200 px-3 py-1 text-sm font-medium text-zinc-700">{test.name}</td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      type="date"
                      value={test.date} 
                      onChange={(v) => updateBookingTest(index, 'date', v)} 
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      value={test.value} 
                      onChange={(v) => updateBookingTest(index, 'value', v)} 
                      placeholder="Enter result"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* Trimester-wise Follow-up Tests */}
      <SectionWrapper
        title="Follow-up Investigations"
        icon={<Calendar className="w-4 h-4" />}
        iconColor="text-blue-500"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="border border-blue-200 px-3 py-2 text-left text-xs font-semibold text-blue-700 w-24" rowSpan={2}>Test</th>
                <th className="border border-blue-200 px-3 py-2 text-center text-xs font-semibold text-blue-700" colSpan={2}>24-28 Weeks</th>
                <th className="border border-blue-200 px-3 py-2 text-center text-xs font-semibold text-blue-700" colSpan={2}>32 Weeks</th>
                <th className="border border-blue-200 px-3 py-2 text-center text-xs font-semibold text-blue-700" colSpan={2}>36 Weeks</th>
              </tr>
              <tr className="bg-blue-50/50">
                <th className="border border-blue-200 px-2 py-1 text-center text-[10px] font-medium text-blue-600 w-24">Date</th>
                <th className="border border-blue-200 px-2 py-1 text-center text-[10px] font-medium text-blue-600">Value</th>
                <th className="border border-blue-200 px-2 py-1 text-center text-[10px] font-medium text-blue-600 w-24">Date</th>
                <th className="border border-blue-200 px-2 py-1 text-center text-[10px] font-medium text-blue-600">Value</th>
                <th className="border border-blue-200 px-2 py-1 text-center text-[10px] font-medium text-blue-600 w-24">Date</th>
                <th className="border border-blue-200 px-2 py-1 text-center text-[10px] font-medium text-blue-600">Value</th>
              </tr>
            </thead>
            <tbody>
              {trimesterTests.map((test, index) => (
                <tr key={test.name} className="hover:bg-zinc-50 transition-colors">
                  <td className="border border-zinc-200 px-3 py-1 text-sm font-medium text-zinc-700">{test.name}</td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      type="date"
                      value={test.week24.date} 
                      onChange={(v) => updateTrimesterTest(index, 'week24', 'date', v)} 
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      value={test.week24.value} 
                      onChange={(v) => updateTrimesterTest(index, 'week24', 'value', v)} 
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      type="date"
                      value={test.week32.date} 
                      onChange={(v) => updateTrimesterTest(index, 'week32', 'date', v)} 
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      value={test.week32.value} 
                      onChange={(v) => updateTrimesterTest(index, 'week32', 'value', v)} 
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      type="date"
                      value={test.week36.date} 
                      onChange={(v) => updateTrimesterTest(index, 'week36', 'date', v)} 
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      value={test.week36.value} 
                      onChange={(v) => updateTrimesterTest(index, 'week36', 'value', v)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* Two Column Layout: Vaccines + Rh Incompatibility + Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {/* Vaccines */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border-b border-green-100">
            <Syringe className="w-4 h-4 text-green-600" />
            <h3 className="font-semibold text-zinc-900 text-sm">Vaccines</h3>
          </div>
          <div className="p-3">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-50/50">
                  <th className="border border-green-200 px-2 py-1.5 text-left text-xs font-semibold text-green-700">Vaccine</th>
                  <th className="border border-green-200 px-2 py-1.5 text-center text-xs font-semibold text-green-700">Date</th>
                  <th className="border border-green-200 px-2 py-1.5 text-center text-xs font-semibold text-green-700 w-12">Done</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((vaccine, index) => (
                  <tr key={vaccine.name} className="hover:bg-zinc-50 transition-colors">
                    <td className="border border-zinc-200 px-2 py-1 text-sm font-medium text-zinc-700">{vaccine.name}</td>
                    <td className="border border-zinc-200 p-0">
                      <EditableCell 
                        type="date"
                        value={vaccine.date} 
                        onChange={(v) => updateVaccine(index, 'date', v)} 
                      />
                    </td>
                    <td className="border border-zinc-200 p-1 text-center">
                      <input 
                        type="checkbox" 
                        checked={vaccine.done}
                        onChange={(e) => updateVaccine(index, 'done', e.target.checked)}
                        className="w-4 h-4 text-green-600 rounded border-zinc-300 focus:ring-green-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rh Incompatibility */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-red-50 border-b border-red-100">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-red-600" />
              <h3 className="font-semibold text-zinc-900 text-sm">Rh Incompatibility</h3>
            </div>
            <label className="flex items-center gap-1.5 text-xs">
              <input 
                type="checkbox" 
                checked={isRhNegative}
                onChange={(e) => setIsRhNegative(e.target.checked)}
                className="w-3.5 h-3.5 text-red-600 rounded border-zinc-300 focus:ring-red-500"
              />
              <span className="text-zinc-600">Rh-ve, Husband+ve</span>
            </label>
          </div>
          <div className="p-3">
            {isRhNegative ? (
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="border border-zinc-200 px-2 py-1 text-sm font-medium text-zinc-700 w-20">Date</td>
                    <td className="border border-zinc-200 p-0">
                      <EditableCell 
                        type="date"
                        value={rhData.date} 
                        onChange={(v) => setRhData(prev => ({ ...prev, date: v }))} 
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="border border-zinc-200 px-2 py-1 text-sm font-medium text-zinc-700">ICT</td>
                    <td className="border border-zinc-200 p-0">
                      <EditableCell 
                        value={rhData.ict} 
                        onChange={(v) => setRhData(prev => ({ ...prev, ict: v }))} 
                        placeholder="Enter ICT result"
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="border border-zinc-200 px-2 py-1 text-sm font-medium text-zinc-700">Anti-D</td>
                    <td className="border border-zinc-200 p-0">
                      <EditableCell 
                        value={rhData.antiD} 
                        onChange={(v) => setRhData(prev => ({ ...prev, antiD: v }))} 
                        placeholder="Enter Anti-D details"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="text-center py-4 text-zinc-400 text-sm">
                Not applicable
              </div>
            )}
          </div>
        </div>

        {/* Antenatal Sessions */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border-b border-amber-100">
            <GraduationCap className="w-4 h-4 text-amber-600" />
            <h3 className="font-semibold text-zinc-900 text-sm">Antenatal Sessions</h3>
          </div>
          <div className="p-3">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-50/50">
                  <th className="border border-amber-200 px-2 py-1.5 text-left text-xs font-semibold text-amber-700">Session</th>
                  <th className="border border-amber-200 px-2 py-1.5 text-center text-xs font-semibold text-amber-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={session.part} className="hover:bg-zinc-50 transition-colors">
                    <td className="border border-zinc-200 px-2 py-1 text-sm font-medium text-zinc-700">{session.part}</td>
                    <td className="border border-zinc-200 p-0">
                      <EditableCell 
                        type="date"
                        value={session.date} 
                        onChange={(v) => updateSession(index, v)} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* USG Scans */}
      <SectionWrapper
        title="USG (Ultrasound Scans)"
        icon={<ScanLine className="w-4 h-4" />}
        iconColor="text-cyan-500"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-cyan-50">
                <th className="border border-cyan-200 px-3 py-2 text-left text-xs font-semibold text-cyan-700 w-48">Scan Type</th>
                <th className="border border-cyan-200 px-3 py-2 text-center text-xs font-semibold text-cyan-700 w-32">Date</th>
                <th className="border border-cyan-200 px-3 py-2 text-center text-xs font-semibold text-cyan-700 w-28">GA at Scan</th>
                <th className="border border-cyan-200 px-3 py-2 text-center text-xs font-semibold text-cyan-700">Findings / Remarks</th>
              </tr>
            </thead>
            <tbody>
              {usgScans.map((scan, index) => (
                <tr key={scan.name} className="hover:bg-zinc-50 transition-colors">
                  <td className="border border-zinc-200 px-3 py-1 text-sm font-medium text-zinc-700">{scan.name}</td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      type="date"
                      value={scan.date} 
                      onChange={(v) => updateUSGScan(index, 'date', v)} 
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      value={scan.gestationalAge || ''} 
                      onChange={(v) => updateUSGScan(index, 'gestationalAge', v)} 
                      placeholder="e.g., 12w 3d"
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <EditableCell 
                      value={scan.findings} 
                      onChange={(v) => updateUSGScan(index, 'findings', v)} 
                      placeholder="Enter findings..."
                      className="text-left"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>
    </div>
  );
}
