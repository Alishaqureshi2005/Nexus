import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import SignatureCanvas from "react-signature-canvas";

// Required for PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentChamber = () => {
  const [file, setFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<any>(null);
  const [status, setStatus] = useState("Draft");

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const clearSignature = () => {
    signature?.clear();
  };

  const applySignature = () => {
    alert("Signature applied (mock)!");
    setStatus("Signed");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Document Chamber</h1>

      {/* Upload Section */}
      <div className="mb-6">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4"
        />
      </div>

      {/* Preview Section */}
      {file && (
        <div className="border p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Document Preview:</h2>
          <Document file={file}>
            <Page pageNumber={1} width={500} />
          </Document>
        </div>
      )}

      {/* Signature Section */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">Add Signature:</h2>
        <SignatureCanvas
          penColor="blue"
          ref={(ref) => setSignature(ref)}
          canvasProps={{
            className: "border w-[500px] h-[150px]",
          }}
        />
        <div className="flex gap-4 mt-2">
          <button
            onClick={clearSignature}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
          <button
            onClick={applySignature}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Status Section */}
      <div className="mt-6">
        <h2 className="font-bold">Status: {status}</h2>
        <select
          className="border rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Draft</option>
          <option>In Review</option>
          <option>Signed</option>
        </select>
      </div>
    </div>
  );
};

export default DocumentChamber;