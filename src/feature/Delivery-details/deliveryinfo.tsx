import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
    FormField,
    TextInput,
    SelectInput,
    TextAreaInput,
    RadioGroup,
    SectionHeader,
    Button,
    MultiSelectDropdown,
} from '../../components';
import { DeliveryList, SAMPLE_DELIVERIES } from '../cases/pnc/encounter/delivery-info/delivery-lists';
import { DeliveryEdit } from '../cases/pnc/encounter/delivery-info/delivery-edit';
import { type DeliveryData } from '../cases/pnc/encounter/delivery-info/delivery-data';

/* =============================================================================
 * OPTION LISTS
 * ============================================================================= */

const NO_OF_CHILDREN_OPTIONS = ['Single', 'Twin', 'Triplets'];
const DELIVERY_TYPE_OPTIONS = ['Normal', 'Forceps', 'Vacuum', 'C-Section'];
const TEARS_OPTIONS = ['1st', '2nd', '3A', '3B', '3C', '4th', 'Cervical'];
const YES_NO_OPTIONS = ['Yes', 'No'];
const SUTURE_OPTIONS = ['Catgut', 'Vicryl'];
const MOTHER_CONDITION_OPTIONS = ['Satisfactory', 'Otherwise'];
const OTHERWISE_REASON_OPTIONS = ['Transfer to ICU', 'Transfer to IDU', 'Mortality'];
const BRANCH_OPTIONS = ['Shri Rangadore Memorial Hospital'];
const BABY_OTHERWISE_REASON_OPTIONS = ['Transfer to NICU', 'Mortality'];
const GENDER_OPTIONS = ['Male', 'Female'];

const LAB_TEST_OPTIONS = [
    'Hb', 'PPBS', 'PCV', 'OGCT', 'RBS', 'TSH', 'FBS', 'Rubella IgG',
    'VDRL', 'APTT', 'HIV', 'Urine test', 'HBsAG', 'Others', 'ICT', 'PT',
];

const SCANS_OPTIONS = [
    'USG dating info', 'USG 11 to 13 WKS info', 'USG anomaly info', 'USG growth info', 'Others',
];

/* =============================================================================
 * HELPER FUNCTIONS
 * ============================================================================= */

function getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
}

function getCurrentTime(): string {
    return new Date().toTimeString().slice(0, 5);
}

/* =============================================================================
 * SELECTED ITEMS DISPLAY (READ-ONLY TEXTBOX)
 * ============================================================================= */

const SelectedItemsTextbox = observer(({ items }: { items: string[] }) => {
    const displayText = items.length > 0 ? items.join(', ') : 'No items selected';
    return (
        <input
            type="text"
            readOnly
            value={displayText}
            className="w-full px-3 py-2 border border-zinc-200 bg-zinc-50 text-sm text-zinc-600 cursor-not-allowed"
        />
    );
});

/* =============================================================================
 * DELIVERY INFO FORM (Add New)
 * ============================================================================= */

const DeliveryForm = observer(({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) => {
    const [activeTab, setActiveTab] = useState<'delivery' | 'child' | 'discharge'>('delivery');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Section A: Delivery Details
    const [admissionDate, setAdmissionDate] = useState(getTodayDate);
    const [noOfChildren, setNoOfChildren] = useState('');
    const [deliveryType, setDeliveryType] = useState('');
    const [csInstrumentalIndication, setCsInstrumentalIndication] = useState('');
    const [admissionTime, setAdmissionTime] = useState(getCurrentTime);
    const [tears, setTears] = useState<string[]>([]);
    const [ebl, setEbl] = useState('');
    const [episiotomy, setEpisiotomy] = useState('');
    const [suture, setSuture] = useState('');
    const [motherCondition, setMotherCondition] = useState('');
    const [otherwiseReason, setOtherwiseReason] = useState('');
    const [motherConditionRemarks, setMotherConditionRemarks] = useState('');
    const [babyConditionRemarks, setBabyConditionRemarks] = useState('');
    const [deliveryComments, setDeliveryComments] = useState('');
    const [deliveredBy, setDeliveredBy] = useState('');
    const [branch, setBranch] = useState('');

    // Section B: Child Info
    const [deliveryDate, setDeliveryDate] = useState(getTodayDate);
    const [babyCondition, setBabyCondition] = useState('');
    const [babyOtherwiseReason, setBabyOtherwiseReason] = useState('');
    const [gender, setGender] = useState('');
    const [deliveryTime, setDeliveryTime] = useState(getCurrentTime);
    const [babyWeight, setBabyWeight] = useState('');
    const [apgarAt1Min, setApgarAt1Min] = useState('');
    const [apgarAt5Min, setApgarAt5Min] = useState('');

    // Section C: Discharge Details
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeTime, setDischargeTime] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [complicationsFound, setComplicationsFound] = useState('');
    const [proceduresPerformed, setProceduresPerformed] = useState('');
    const [selectedLabTests, setSelectedLabTests] = useState<string[]>([]);
    const [selectedScans, setSelectedScans] = useState<string[]>([]);
    const [otherInvestigations, setOtherInvestigations] = useState('');
    const [medicationsPrescribed, setMedicationsPrescribed] = useState('');
    const [dischargeConditionsInstructions, setDischargeConditionsInstructions] = useState('');
    const [conditionAtDischarge, setConditionAtDischarge] = useState('');
    const [patientDisposition, setPatientDisposition] = useState('');
    const [dischargedBy, setDischargedBy] = useState('');
    const [followUp, setFollowUp] = useState('');

    // Validation
    const isDeliveryValid = Boolean(admissionDate && noOfChildren && deliveryType && admissionTime && episiotomy && motherCondition && babyConditionRemarks && branch);
    const isChildValid = Boolean(deliveryDate && babyCondition && gender && deliveryTime && babyWeight && apgarAt1Min && apgarAt5Min);
    const isDischargeValid = Boolean(dischargeDate && dischargeTime && diagnosis && proceduresPerformed && selectedLabTests.length > 0 && selectedScans.length > 0 && conditionAtDischarge);

    const getCurrentSectionValid = () => {
        switch (activeTab) {
            case 'delivery': return isDeliveryValid;
            case 'child': return isChildValid;
            case 'discharge': return isDischargeValid;
            default: return false;
        }
    };

    const handleSaveAndNext = () => {
        if (activeTab === 'delivery') setActiveTab('child');
        else if (activeTab === 'child') setActiveTab('discharge');
    };

    const handleBack = () => {
        if (activeTab === 'child') setActiveTab('delivery');
        else if (activeTab === 'discharge') setActiveTab('child');
    };

    const handleFinalSave = () => {
        setShowSuccessPopup(true);
        setTimeout(() => {
            setShowSuccessPopup(false);
            onSave();
        }, 2000);
    };

    const TabButton = ({ id, label }: { id: 'delivery' | 'child' | 'discharge'; label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${activeTab === id
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300'
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="flex flex-col h-full bg-white relative">
            {showSuccessPopup && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-800">Success!</h3>
                        </div>
                        <p className="text-zinc-600">Delivery info added successfully</p>
                    </div>
                </div>
            )}

            <div className="bg-pink-100 border-b border-pink-200 px-4 py-3">
                <h2 className="text-lg font-semibold text-pink-700">Add New Delivery</h2>
            </div>

            <div className="flex border-b border-zinc-200 bg-zinc-50 px-4">
                <TabButton id="delivery" label="Delivery Details" />
                <TabButton id="child" label="Child Info" />
                <TabButton id="discharge" label="Discharge Details" />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'delivery' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <SectionHeader title="Delivery Details" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Admission Date" required><TextInput type="date" value={admissionDate} onChange={setAdmissionDate} /></FormField>
                            <FormField label="No. of Children" required><SelectInput value={noOfChildren} onChange={setNoOfChildren} options={NO_OF_CHILDREN_OPTIONS} placeholder="Select..." /></FormField>
                            <FormField label="Delivery Type" required><SelectInput value={deliveryType} onChange={setDeliveryType} options={DELIVERY_TYPE_OPTIONS} placeholder="Select..." /></FormField>
                            <FormField label="CS/Instrumental Indication"><TextInput value={csInstrumentalIndication} onChange={setCsInstrumentalIndication} placeholder="Enter indication..." /></FormField>
                            <FormField label="Admission Time" required><TextInput type="time" value={admissionTime} onChange={setAdmissionTime} /></FormField>
                            <FormField label="EBL"><TextInput type="number" value={ebl} onChange={setEbl} placeholder="Enter EBL..." /></FormField>
                            <FormField label="Episiotomy" required><RadioGroup value={episiotomy} onChange={setEpisiotomy} options={YES_NO_OPTIONS} /></FormField>
                            <FormField label="Suture"><RadioGroup value={suture} onChange={setSuture} options={SUTURE_OPTIONS} /></FormField>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                            <FormField label="Tears"><MultiSelectDropdown options={TEARS_OPTIONS} value={tears} onChange={setTears} placeholder="Select tears..." /></FormField>
                            <FormField label="Selected Tears"><SelectedItemsTextbox items={tears} /></FormField>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Mother Condition" required><RadioGroup value={motherCondition} onChange={setMotherCondition} options={MOTHER_CONDITION_OPTIONS} /></FormField>
                            {motherCondition === 'Otherwise' && <FormField label="Otherwise Reason"><SelectInput value={otherwiseReason} onChange={setOtherwiseReason} options={OTHERWISE_REASON_OPTIONS} placeholder="Select..." /></FormField>}
                            <FormField label="Mother Condition Remarks" className="md:col-span-2"><TextInput value={motherConditionRemarks} onChange={setMotherConditionRemarks} placeholder="Enter remarks..." /></FormField>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Baby Condition Remarks" required className="md:col-span-2"><TextInput value={babyConditionRemarks} onChange={setBabyConditionRemarks} placeholder="Enter remarks..." /></FormField>
                            <FormField label="Delivery Comments" className="md:col-span-2"><TextInput value={deliveryComments} onChange={setDeliveryComments} placeholder="Enter comments..." /></FormField>
                            <FormField label="Delivered By"><TextInput value={deliveredBy} onChange={setDeliveredBy} placeholder="Enter name..." /></FormField>
                            <FormField label="Branch" required><SelectInput value={branch} onChange={setBranch} options={BRANCH_OPTIONS} placeholder="Select..." /></FormField>
                        </div>
                    </div>
                )}

                {activeTab === 'child' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <SectionHeader title="Child Info" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Delivery Date" required><TextInput type="date" value={deliveryDate} onChange={setDeliveryDate} /></FormField>
                            <FormField label="Baby Condition" required><TextInput type="number" value={babyCondition} onChange={setBabyCondition} placeholder="Enter condition..." /></FormField>
                            <FormField label="Otherwise Reason"><SelectInput value={babyOtherwiseReason} onChange={setBabyOtherwiseReason} options={BABY_OTHERWISE_REASON_OPTIONS} placeholder="Select..." /></FormField>
                            <FormField label="Gender" required><RadioGroup value={gender} onChange={setGender} options={GENDER_OPTIONS} /></FormField>
                            <FormField label="Delivery Time" required><TextInput type="time" value={deliveryTime} onChange={setDeliveryTime} /></FormField>
                            <FormField label="Baby Weight" required><TextInput type="number" value={babyWeight} onChange={setBabyWeight} placeholder="Enter weight..." /></FormField>
                            <FormField label="Apgar at 1 min" required><TextInput type="number" value={apgarAt1Min} onChange={setApgarAt1Min} placeholder="Enter score..." /></FormField>
                            <FormField label="Apgar at 5 min" required><TextInput type="number" value={apgarAt5Min} onChange={setApgarAt5Min} placeholder="Enter score..." /></FormField>
                        </div>
                    </div>
                )}

                {activeTab === 'discharge' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <SectionHeader title="Discharge Details" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Discharge Date" required><TextInput type="date" value={dischargeDate} onChange={setDischargeDate} /></FormField>
                            <FormField label="Discharge Time" required><TextInput type="time" value={dischargeTime} onChange={setDischargeTime} /></FormField>
                            <FormField label="Diagnosis" required className="md:col-span-2"><TextInput value={diagnosis} onChange={setDiagnosis} placeholder="Enter diagnosis..." /></FormField>
                            <FormField label="Complications Found" className="md:col-span-2"><TextInput value={complicationsFound} onChange={setComplicationsFound} placeholder="Enter complications..." /></FormField>
                            <FormField label="Procedures Performed" required className="md:col-span-2"><TextInput value={proceduresPerformed} onChange={setProceduresPerformed} placeholder="Enter procedures..." /></FormField>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                            <FormField label="Lab Tests" required><MultiSelectDropdown options={LAB_TEST_OPTIONS} value={selectedLabTests} onChange={setSelectedLabTests} placeholder="Select lab tests..." /></FormField>
                            <FormField label="Selected Lab Tests"><SelectedItemsTextbox items={selectedLabTests} /></FormField>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                            <FormField label="Scans" required><MultiSelectDropdown options={SCANS_OPTIONS} value={selectedScans} onChange={setSelectedScans} placeholder="Select scans..." /></FormField>
                            <FormField label="Selected Scans"><SelectedItemsTextbox items={selectedScans} /></FormField>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Other Investigations" className="md:col-span-2"><TextInput value={otherInvestigations} onChange={setOtherInvestigations} placeholder="Enter other investigations..." /></FormField>
                            <FormField label="Medications Prescribed" className="md:col-span-2"><TextInput value={medicationsPrescribed} onChange={setMedicationsPrescribed} placeholder="Enter medications..." /></FormField>
                            <FormField label="Discharge Conditions/Instructions" className="md:col-span-2"><TextAreaInput value={dischargeConditionsInstructions} onChange={setDischargeConditionsInstructions} placeholder="Enter conditions/instructions..." rows={2} /></FormField>
                            <FormField label="Condition at Discharge" required className="md:col-span-2"><TextInput value={conditionAtDischarge} onChange={setConditionAtDischarge} placeholder="Enter condition..." /></FormField>
                            <FormField label="Patient Disposition" className="md:col-span-2"><TextInput value={patientDisposition} onChange={setPatientDisposition} placeholder="Enter disposition..." /></FormField>
                            <FormField label="Discharged By"><TextInput value={dischargedBy} onChange={setDischargedBy} placeholder="Enter name..." /></FormField>
                            <FormField label="Follow Up"><TextInput value={followUp} onChange={setFollowUp} placeholder="Enter follow up details..." /></FormField>
                        </div>
                    </div>
                )}
            </div>

            <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 flex justify-between items-center">
                <div>{(activeTab === 'child' || activeTab === 'discharge') && <Button variant="secondary" onClick={handleBack}>Back</Button>}</div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    {activeTab === 'discharge' ? (
                        <button onClick={handleFinalSave} disabled={!getCurrentSectionValid()} className={`px-4 py-2 text-sm font-medium rounded transition-colors ${getCurrentSectionValid() ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'}`}>Save</button>
                    ) : (
                        <button onClick={handleSaveAndNext} disabled={!getCurrentSectionValid()} className={`px-4 py-2 text-sm font-medium rounded transition-colors ${getCurrentSectionValid() ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'}`}>Save & Next</button>
                    )}
                </div>
            </div>
        </div>
    );
});

/* =============================================================================
 * MAIN DELIVERY INFO COMPONENT (List-First Pattern with View/Edit)
 * ============================================================================= */

type ViewMode = 'list' | 'add' | 'view' | 'edit';

export const DeliveryInfo = observer(() => {
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedDelivery, setSelectedDelivery] = useState<DeliveryData | null>(null);

    const handleAddNew = () => setViewMode('add');
    const handleCancel = () => { setViewMode('list'); setSelectedDelivery(null); };
    const handleSave = () => { setViewMode('list'); setSelectedDelivery(null); };

    const handleView = (delivery: DeliveryData) => {
        setSelectedDelivery(delivery);
        setViewMode('view');
    };

    const handleEdit = (delivery: DeliveryData) => {
        setSelectedDelivery(delivery);
        setViewMode('edit');
    };

    if (viewMode === 'add') {
        return <DeliveryForm onCancel={handleCancel} onSave={handleSave} />;
    }

    if ((viewMode === 'view' || viewMode === 'edit') && selectedDelivery) {
        return (
            <DeliveryEdit
                mode={viewMode}
                deliveryData={selectedDelivery}
                onCancel={handleCancel}
                onUpdate={handleSave}
            />
        );
    }

    return <DeliveryList onAddNew={handleAddNew} onView={handleView} onEdit={handleEdit} />;
});
