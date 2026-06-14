import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import ImportDropzone from "../components/import/ImportDropzone";
import Button from "../components/common/Button";

const CSVImport = () => {
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState([]);
  const [isDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Ready to import");

  const parseCsv = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split(/\r?\n/).filter(Boolean);
      const preview = lines.slice(0, 5).map((line) => line.split(","));
      setRows(preview);
      setStatus("File loaded. Preview ready.");
    };
    reader.readAsText(file);
  }, []);

  const handleSelectFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    parseCsv(file);
  };

  const handleClearFile = () => {
    setFileName("");
    setRows([]);
    setStatus("Ready to import");
    setProgress(0);
  };

  const handleImport = () => {
    if (!fileName) {
      toast.error("Please select a CSV file first.");
      return;
    }
    setStatus("Importing...");
    setProgress(20);
    const timer = setInterval(() => {
      setProgress((value) => {
        const next = value + 25;
        if (next >= 100) {
          clearInterval(timer);
          setStatus("Import complete");
          toast.success("CSV imported successfully.");
          return 100;
        }
        return next;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="CSV Import" subtitle="Upload transaction files for easy data review and import." />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6" glass>
          <ImportDropzone
            isDragging={isDragging}
            onSelectFile={handleSelectFile}
            fileName={fileName}
            onClear={handleClearFile}
          />
          <div className="mt-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
              <p className="text-base font-semibold text-slate-900 dark:text-white">{status}</p>
            </div>
            <Button onClick={handleImport} disabled={!fileName}>
              Start import
            </Button>
          </div>
          {progress > 0 && (
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}
        </Card>

        <Card className="p-6" glass>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preview</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">See the first rows from your CSV import before finalizing.</p>
          <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 bg-white text-left text-sm dark:bg-slate-950 dark:divide-slate-800">
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-slate-500 dark:text-slate-400" colSpan="4">Upload a CSV to preview the first rows.</td>
                  </tr>
                ) : (
                  rows.map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 text-slate-700 dark:text-slate-200">{cell}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CSVImport;
