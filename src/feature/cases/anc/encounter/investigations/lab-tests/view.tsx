import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Plus, Paperclip, Trash2, X, Upload, FileText } from 'lucide-react';
import { useLabTestsStore } from './context';
import type { LabTestRecord } from './store';

/** Test Row Component */
const TestRow = observer(({ test }: { test: LabTestRecord }) => {
  const store = useLabTestsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      store.attachFile(test.id, file);
    }
  };

  return (
    <tr className="border-b border-zinc-100 hover:bg-zinc-50/50">
      {/* Test Name */}
      <td className="px-3 py-2 text-[12px] font-medium text-zinc-700 w-32">
        {test.name}
      </td>
      
      {/* Value */}
      <td className="px-3 py-2 w-32">
        {test.isQualitative ? (
          <select
            value={test.value}
            onChange={(e) => store.updateTest(test.id, 'value', e.target.value)}
            className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
          >
            <option value="">Select</option>
            {test.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={test.value}
            onChange={(e) => store.updateTest(test.id, 'value', e.target.value)}
            placeholder="Value"
            className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
          />
        )}
      </td>
      
      {/* Date */}
      <td className="px-3 py-2 w-36">
        <input
          type="date"
          value={test.date}
          onChange={(e) => store.updateTest(test.id, 'date', e.target.value)}
          className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
        />
      </td>
      
      {/* Notes */}
      <td className="px-3 py-2">
        <input
          type="text"
          value={test.notes}
          onChange={(e) => store.updateTest(test.id, 'notes', e.target.value)}
          placeholder="Notes"
          className="w-full px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
        />
      </td>
      
      {/* Actions */}
      <td className="px-3 py-2 w-24">
        <div className="flex items-center gap-1">
          {/* File Attachment */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileAttach}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          {test.attachedFile ? (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[9px] rounded">
              <FileText className="w-3 h-3" />
              <button
                onClick={() => store.removeAttachedFile(test.id)}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 rounded"
              title="Attach file"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>
          )}
          
          {/* Delete */}
          <button
            onClick={() => store.removeTest(test.id)}
            className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded"
            title="Remove test"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
});

/** Lab Tests View Component */
export const LabTestsView = observer(() => {
  const store = useLabTestsStore();
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => store.addUploadedFile(file));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => store.addUploadedFile(file));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-zinc-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[14px] font-bold text-zinc-800">Lab Tests</h2>
        </div>
        
        {/* Global Date */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-medium text-zinc-600">Date:</label>
            <input
              type="date"
              value={store.globalDate}
              onChange={(e) => store.setGlobalDate(e.target.value)}
              className="px-2 py-1.5 text-[11px] border border-zinc-200 bg-white focus:outline-none focus:border-blue-400"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={store.applyDateToAll}
              onChange={(e) => store.toggleApplyDateToAll(e.target.checked)}
              className="w-3.5 h-3.5"
            />
            <span className="text-[11px] text-zinc-600">Apply same date to all tests</span>
          </label>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white border border-zinc-200">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="px-3 py-2 text-left text-[10px] font-bold uppercase">Test</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold uppercase">Values</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold uppercase">Date</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold uppercase">Notes</th>
              <th className="px-3 py-2 text-left text-[10px] font-bold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {store.tests.map(test => (
              <TestRow key={test.id} test={test} />
            ))}
          </tbody>
        </table>
        
        {/* Add Test Button */}
        <div className="p-2 border-t border-zinc-100">
          <button
            onClick={() => store.addTest('Custom Test')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Test
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="bg-white border border-zinc-200 p-4">
        <h3 className="text-[12px] font-bold text-zinc-700 mb-3">Direct Upload Reports</h3>
        
        {/* Drop Zone */}
        <div
          ref={dropZoneRef}
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-zinc-200 rounded-lg p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-zinc-400" />
          <p className="text-[12px] text-zinc-500 mb-2">Drag & drop files here or click to browse</p>
          <label className="cursor-pointer">
            <input
              type="file"
              onChange={handleFileSelect}
              multiple
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <span className="px-3 py-1.5 text-[11px] font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100">
              Choose Files
            </span>
          </label>
        </div>
        
        {/* Uploaded Files List */}
        {store.uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {store.uploadedFiles.map(record => (
              <div
                key={record.id}
                className="flex items-center justify-between px-3 py-2 bg-zinc-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-[11px] text-zinc-700">{record.file.name}</span>
                  <span className="text-[9px] text-zinc-400">
                    ({(record.file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => store.removeUploadedFile(record.id)}
                  className="p-1 text-zinc-400 hover:text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
