import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { setLastAccessedReport, getLastAccessedReport } from '../utils/localStorageUtils';

const Reports = () => {
  const navigate = useNavigate();
  const [currentReport, setCurrentReport] = useState(null);

  useEffect(() => {
    const lastReport = getLastAccessedReport();
    if (lastReport) {
      setCurrentReport(lastReport);
    }
  }, []);

  const reports = [
    { id: 1, name: 'Vendor Performance Report' },
    { id: 2, name: 'Drug Consumption Trends' },
    { id: 3, name: 'Inventory Status Report' },
  ];

  const handleReportClick = (reportId) => {
    setCurrentReport(reportId);
    setLastAccessedReport(reportId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {reports.map((report) => (
            <Button
              key={report.id}
              onClick={() => handleReportClick(report.id)}
              className={`text-left p-4 ${currentReport === report.id ? 'bg-blue-600' : 'bg-blue-500'} hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors`}
            >
              {report.name}
            </Button>
          ))}
        </div>
        {currentReport && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {reports.find(r => r.id === currentReport)?.name}
            </h2>
            <p className="text-gray-700">
              This is where you would display the content of the {reports.find(r => r.id === currentReport)?.name.toLowerCase()}.
            </p>
          </div>
        )}
        <Button onClick={() => navigate('/dashboard')} className="mt-8 bg-pink-500 hover:bg-pink-600 text-white">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Reports;