import { FiUploadCloud } from "react-icons/fi";
import Button from "../common/Button";

const ImportDropzone = ({ isDragging, onSelectFile, fileName, onClear }) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-950/80">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300 mb-5">
      <FiUploadCloud className="h-8 w-8" />
    </div>
    <div className="space-y-3">
      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Drag & drop your CSV file</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">Upload transaction history for import preview and anomaly checks.</p>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <label className="cursor-pointer rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors">
          Select CSV
          <input aria-label="Select CSV file" type="file" accept=".csv" className="hidden" onChange={onSelectFile} />
        </label>
        {fileName && (
          <Button variant="secondary" size="sm" onClick={onClear}>
            Clear file
          </Button>
        )}
      </div>
      {isDragging && <p className="text-sm text-violet-600 dark:text-violet-300">Release to upload your file</p>}
      {fileName && <p className="text-sm text-slate-500 dark:text-slate-400">Selected: {fileName}</p>}
    </div>
  </div>
);

export default ImportDropzone;
