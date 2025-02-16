
import { useState } from 'react';
import { Table } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Download, Upload } from "lucide-react";
import { motion } from "framer-motion";

// Sample data - this would come from your C++ backend
const sampleCSVData = {
  headers: ['Timestamp', 'Operation', 'Status', 'Duration (ms)', 'Memory Usage (MB)', 'Thread ID'],
  rows: [
    ['2024-03-14 15:30:22', 'Vector Encryption', 'Success', '245', '128.5', 'thread-001'],
    ['2024-03-14 15:30:23', 'Matrix Multiplication', 'Success', '189', '256.2', 'thread-002'],
    ['2024-03-14 15:30:24', 'Homomorphic Addition', 'Success', '56', '164.8', 'thread-003'],
    ['2024-03-14 15:30:25', 'Key Generation', 'Success', '789', '512.1', 'thread-001'],
    ['2024-03-14 15:30:26', 'Data Serialization', 'Success', '123', '96.4', 'thread-004'],
  ]
};

const CSVViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data] = useState(sampleCSVData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm mt-6"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 text-[#0066CC]">
            <Upload className="w-5 h-5" />
            <span className="font-medium">View Raw Data</span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-[#0066CC]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#0066CC]" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-[#0066CC]">Backend Processing Data</CardTitle>
              <button
                className="flex items-center gap-2 text-[#0066CC] hover:text-[#0052CC] transition-colors"
                onClick={() => {
                  // Download functionality would go here
                  console.log('Downloading CSV...');
                }}
              >
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {data.headers.map((header, index) => (
                        <th
                          key={index}
                          className="text-left p-3 bg-gray-50 border-b border-gray-200 text-gray-600 font-medium"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="p-3 text-gray-700"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

export default CSVViewer;
