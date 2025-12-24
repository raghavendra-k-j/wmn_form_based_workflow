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
} from '../../../../../components';
import { type DeliveryData } from './delivery-data';

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
 * DELIVERY EDIT/VIEW FORM
 * ============================================================================= */

interface DeliveryEditProps {
    mode: 'view' | 'edit';
    deliveryData: DeliveryData;
    onCancel: () => void;
    onUpdate: () => void;
}

export const DeliveryEdit = observer(({ mode, deliveryData, onCancel, onUpdate }: DeliveryEditProps) => {
    const [activeTab, setActiveTab] = useState<'delivery' | 'child' | 'discharge'>('delivery');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const isViewOnly = mode === 'view';

    // Section A: Delivery Details (prefilled)
    const [admissionDate, setAdmissionDate] = useState(deliveryData.admissionDate);
    const [noOfChildren, setNoOfChildren] = useState(deliveryData.noOfChildren);
    const [deliveryType, setDeliveryType] = useState(deliveryData.deliveryType);
    const [csInstrumentalIndication, setCsInstrumentalIndication] = useState(deliveryData.csInstrumentalIndication);
    const [admissionTime, setAdmissionTime] = useState(deliveryData.admissionTime);
    const [tears, setTears] = useState<string[]>(deliveryData.tears);
    const [ebl, setEbl] = useState(deliveryData.ebl);
    const [episiotomy, setEpisiotomy] = useState(deliveryData.episiotomy);
    const [suture, setSuture] = useState(deliveryData.suture);
    const [motherCondition, setMotherCondition] = useState(deliveryData.motherCondition);
    const [otherwiseReason, setOtherwiseReason] = useState(deliveryData.otherwiseReason);
    const [motherConditionRemarks, setMotherConditionRemarks] = useState(deliveryData.motherConditionRemarks);
    const [babyConditionRemarks, setBabyConditionRemarks] = useState(deliveryData.babyConditionRemarks);
    const [deliveryComments, setDeliveryComments] = useState(deliveryData.deliveryComments);
    const [deliveredBy, setDeliveredBy] = useState(deliveryData.deliveredBy);
    const [branch, setBranch] = useState(deliveryData.branch);

    // Section B: Child Info (prefilled)
    const [deliveryDate, setDeliveryDate] = useState(deliveryData.deliveryDate);
    const [babyCondition, setBabyCondition] = useState(deliveryData.babyCondition);
    const [babyOtherwiseReason, setBabyOtherwiseReason] = useState(deliveryData.babyOtherwiseReason);
    const [gender, setGender] = useState(deliveryData.gender);
    const [deliveryTime, setDeliveryTime] = useState(deliveryData.deliveryTime);
    const [babyWeight, setBabyWeight] = useState(deliveryData.babyWeight);
    const [apgarAt1Min, setApgarAt1Min] = useState(deliveryData.apgarAt1Min);
    const [apgarAt5Min, setApgarAt5Min] = useState(deliveryData.apgarAt5Min);

    // Section C: Discharge Details (prefilled)
    const [dischargeDate, setDischargeDate] = useState(deliveryData.dischargeDate);
    const [dischargeTime, setDischargeTime] = useState(deliveryData.dischargeTime);
    const [diagnosis, setDiagnosis] = useState(deliveryData.diagnosis);
    const [complicationsFound, setComplicationsFound] = useState(deliveryData.complicationsFound);
    const [proceduresPerformed, setProceduresPerformed] = useState(deliveryData.proceduresPerformed);
    const [selectedLabTests, setSelectedLabTests] = useState<string[]>(deliveryData.selectedLabTests);
    const [selectedScans, setSelectedScans] = useState<string[]>(deliveryData.selectedScans);
    const [otherInvestigations, setOtherInvestigations] = useState(deliveryData.otherInvestigations);
    const [medicationsPrescribed, setMedicationsPrescribed] = useState(deliveryData.medicationsPrescribed);
    const [dischargeConditionsInstructions, setDischargeConditionsInstructions] = useState(deliveryData.dischargeConditionsInstructions);
    const [conditionAtDischarge, setConditionAtDischarge] = useState(deliveryData.conditionAtDischarge);
    const [patientDisposition, setPatientDisposition] = useState(deliveryData.patientDisposition);
    const [dischargedBy, setDischargedBy] = useState(deliveryData.dischargedBy);
    const [followUp, setFollowUp] = useState(deliveryData.followUp);

    const handleUpdate = () => {
        setShowSuccessPopup(true);
        setTimeout(() => {
            setShowSuccessPopup(false);
            onUpdate();
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
            {/* Success Popup */}
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
                        <p className="text-zinc-600">Delivery info updated successfully</p>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="bg-zinc-100 px-4 py-2 border-b border-zinc-200">
                <h2 className="text-sm font-semibold text-pink-600">
                    {isViewOnly ? 'View Delivery Details' : 'Update Delivery Details'}
                </h2>
            </div>

            {/* Tabs Header */}
            <div className="flex border-b border-zinc-200 bg-zinc-50 px-4">
                <TabButton id="delivery" label="Delivery Details" />
                <TabButton id="child" label="Child Info" />
                <TabButton id="discharge" label="Discharge Details" />
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
                {/* SECTION A: DELIVERY DETAILS */}
                {activeTab === 'delivery' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <SectionHeader title="Delivery Details" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Admission Date" required><TextInput type="date" value={admissionDate} onChange={setAdmissionDate} disabled={isViewOnly} /></FormField>
                            <FormField label="No. of Children" required><SelectInput value={noOfChildren} onChange={setNoOfChildren} options={NO_OF_CHILDREN_OPTIONS} placeholder="Select..." disabled={isViewOnly} /></FormField>
                            <FormField label="Delivery Type" required><SelectInput value={deliveryType} onChange={setDeliveryType} options={DELIVERY_TYPE_OPTIONS} placeholder="Select..." disabled={isViewOnly} /></FormField>
                            <FormField label="CS/Instrumental Indication"><TextInput value={csInstrumentalIndication} onChange={setCsInstrumentalIndication} placeholder="Enter indication..." disabled={isViewOnly} /></FormField>
                            <FormField label="Admission Time" required><TextInput type="time" value={admissionTime} onChange={setAdmissionTime} disabled={isViewOnly} /></FormField>
                            <FormField label="EBL"><TextInput type="number" value={ebl} onChange={setEbl} placeholder="Enter EBL..." disabled={isViewOnly} /></FormField>
                            <FormField label="Episiotomy" required><RadioGroup value={episiotomy} onChange={setEpisiotomy} options={YES_NO_OPTIONS} disabled={isViewOnly} /></FormField>
                            <FormField label="Suture"><RadioGroup value={suture} onChange={setSuture} options={SUTURE_OPTIONS} disabled={isViewOnly} /></FormField>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Tears"><MultiSelectDropdown options={TEARS_OPTIONS} value={tears} onChange={setTears} placeholder="Select tears..." /></FormField>
                            <FormField label="Selected Tears">
                                <input
                                    type="text"
                                    readOnly
                                    value={tears.length > 0 ? tears.join(', ') : 'No tears selected'}
                                    className="w-full px-3 py-2 border border-zinc-200 bg-zinc-50 text-sm text-zinc-600 cursor-not-allowed"
                                />
                            </FormField>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Mother Condition" required><RadioGroup value={motherCondition} onChange={setMotherCondition} options={MOTHER_CONDITION_OPTIONS} disabled={isViewOnly} /></FormField>
                            {motherCondition === 'Otherwise' && <FormField label="Otherwise Reason"><SelectInput value={otherwiseReason} onChange={setOtherwiseReason} options={OTHERWISE_REASON_OPTIONS} placeholder="Select..." disabled={isViewOnly} /></FormField>}
                            <FormField label="Mother Condition Remarks" className="md:col-span-2"><TextInput value={motherConditionRemarks} onChange={setMotherConditionRemarks} placeholder="Enter remarks..." disabled={isViewOnly} /></FormField>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Baby Condition Remarks" required className="md:col-span-2"><TextInput value={babyConditionRemarks} onChange={setBabyConditionRemarks} placeholder="Enter remarks..." disabled={isViewOnly} /></FormField>
                            <FormField label="Delivery Comments" className="md:col-span-2"><TextInput value={deliveryComments} onChange={setDeliveryComments} placeholder="Enter comments..." disabled={isViewOnly} /></FormField>
                            <FormField label="Delivered By"><TextInput value={deliveredBy} onChange={setDeliveredBy} placeholder="Enter name..." disabled={isViewOnly} /></FormField>
                            <FormField label="Branch" required><SelectInput value={branch} onChange={setBranch} options={BRANCH_OPTIONS} placeholder="Select..." disabled={isViewOnly} /></FormField>
                        </div>
                    </div>
                )}

                {/* SECTION B: CHILD INFO */}
                {activeTab === 'child' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <SectionHeader title="Child Info" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Delivery Date" required><TextInput type="date" value={deliveryDate} onChange={setDeliveryDate} disabled={isViewOnly} /></FormField>
                            <FormField label="Baby Condition" required><TextInput type="number" value={babyCondition} onChange={setBabyCondition} placeholder="Enter condition..." disabled={isViewOnly} /></FormField>
                            <FormField label="Otherwise Reason"><SelectInput value={babyOtherwiseReason} onChange={setBabyOtherwiseReason} options={BABY_OTHERWISE_REASON_OPTIONS} placeholder="Select..." disabled={isViewOnly} /></FormField>
                            <FormField label="Gender" required><RadioGroup value={gender} onChange={setGender} options={GENDER_OPTIONS} disabled={isViewOnly} /></FormField>
                            <FormField label="Delivery Time" required><TextInput type="time" value={deliveryTime} onChange={setDeliveryTime} disabled={isViewOnly} /></FormField>
                            <FormField label="Baby Weight" required><TextInput type="number" value={babyWeight} onChange={setBabyWeight} placeholder="Enter weight..." disabled={isViewOnly} /></FormField>
                            <FormField label="Apgar at 1 min" required><TextInput type="number" value={apgarAt1Min} onChange={setApgarAt1Min} placeholder="Enter score..." disabled={isViewOnly} /></FormField>
                            <FormField label="Apgar at 5 min" required><TextInput type="number" value={apgarAt5Min} onChange={setApgarAt5Min} placeholder="Enter score..." disabled={isViewOnly} /></FormField>
                        </div>
                    </div>
                )}

                {/* SECTION C: DISCHARGE DETAILS */}
                {activeTab === 'discharge' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <SectionHeader title="Discharge Details" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Discharge Date" required><TextInput type="date" value={dischargeDate} onChange={setDischargeDate} disabled={isViewOnly} /></FormField>
                            <FormField label="Discharge Time" required><TextInput type="time" value={dischargeTime} onChange={setDischargeTime} disabled={isViewOnly} /></FormField>
                            <FormField label="Diagnosis" required className="md:col-span-2"><TextInput value={diagnosis} onChange={setDiagnosis} placeholder="Enter diagnosis..." disabled={isViewOnly} /></FormField>
                            <FormField label="Complications Found" className="md:col-span-2"><TextInput value={complicationsFound} onChange={setComplicationsFound} placeholder="Enter complications..." disabled={isViewOnly} /></FormField>
                            <FormField label="Procedures Performed" required className="md:col-span-2"><TextInput value={proceduresPerformed} onChange={setProceduresPerformed} placeholder="Enter procedures..." disabled={isViewOnly} /></FormField>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Lab Tests" required><MultiSelectDropdown options={LAB_TEST_OPTIONS} value={selectedLabTests} onChange={setSelectedLabTests} placeholder="Select lab tests..." /></FormField>
                            <FormField label="Selected Lab Tests">
                                <input
                                    type="text"
                                    readOnly
                                    value={selectedLabTests.length > 0 ? selectedLabTests.join(', ') : 'No lab tests selected'}
                                    className="w-full px-3 py-2 border border-zinc-200 bg-zinc-50 text-sm text-zinc-600 cursor-not-allowed"
                                />
                            </FormField>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Scans" required><MultiSelectDropdown options={SCANS_OPTIONS} value={selectedScans} onChange={setSelectedScans} placeholder="Select scans..." /></FormField>
                            <FormField label="Selected Scans">
                                <input
                                    type="text"
                                    readOnly
                                    value={selectedScans.length > 0 ? selectedScans.join(', ') : 'No scans selected'}
                                    className="w-full px-3 py-2 border border-zinc-200 bg-zinc-50 text-sm text-zinc-600 cursor-not-allowed"
                                />
                            </FormField>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                            <FormField label="Other Investigations" className="md:col-span-2"><TextInput value={otherInvestigations} onChange={setOtherInvestigations} placeholder="Enter other investigations..." disabled={isViewOnly} /></FormField>
                            <FormField label="Medications Prescribed" className="md:col-span-2"><TextInput value={medicationsPrescribed} onChange={setMedicationsPrescribed} placeholder="Enter medications..." disabled={isViewOnly} /></FormField>
                            <FormField label="Discharge Conditions/Instructions" className="md:col-span-2"><TextAreaInput value={dischargeConditionsInstructions} onChange={setDischargeConditionsInstructions} placeholder="Enter conditions/instructions..." rows={2} disabled={isViewOnly} /></FormField>
                            <FormField label="Condition at Discharge" required className="md:col-span-2"><TextInput value={conditionAtDischarge} onChange={setConditionAtDischarge} placeholder="Enter condition..." disabled={isViewOnly} /></FormField>
                            <FormField label="Patient Disposition" className="md:col-span-2"><TextInput value={patientDisposition} onChange={setPatientDisposition} placeholder="Enter disposition..." disabled={isViewOnly} /></FormField>
                            <FormField label="Discharged By"><TextInput value={dischargedBy} onChange={setDischargedBy} placeholder="Enter name..." disabled={isViewOnly} /></FormField>
                            <FormField label="Follow Up"><TextInput value={followUp} onChange={setFollowUp} placeholder="Enter follow up details..." disabled={isViewOnly} /></FormField>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons Footer */}
            <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 flex justify-end items-center gap-3">
                <Button variant="secondary" onClick={onCancel}>{isViewOnly ? 'Close' : 'Cancel'}</Button>
                {!isViewOnly && (
                    <button onClick={handleUpdate} className="px-4 py-2 text-sm font-medium rounded bg-green-600 hover:bg-green-700 text-white cursor-pointer transition-colors">
                        Update
                    </button>
                )}
            </div>
        </div>
    );
});

export type { DeliveryData };
