"use client";

import { useState, useEffect } from "react";
import { scanApi, fixApi } from "./apiService";
import { ScanResults } from "./type";

export default function ResultsPage() {
  const [results, setResults] = useState<ScanResults | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [fixMessages, setFixMessages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const credentialsStr = localStorage.getItem("supabaseCredentials");
    if (!credentialsStr) {
      setError("Missing Supabase credentials.");
      setLoading(false);
      return;
    }
    const credentials = JSON.parse(credentialsStr);

    scanApi(credentials)
      .then((data: ScanResults) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAutoFix = async (issueType: string) => {
    try {
      const data = await fixApi(issueType);
      setFixMessages((prevMessages) => ({
        ...prevMessages,
        [issueType]: `Auto-fix for ${issueType}: ${data.message}`,
      }));
    } catch (err: any) {
      setFixMessages((prevMessages) => ({
        ...prevMessages,
        [issueType]: `Error: ${err.message}`,
      }));
    }
  };

  const renderTable = (headers: string[], data: any) => {
    return (
      <table className="w-full table-auto border-collapse rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-black">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data?.map((item: any, idx: number) => (
            <tr key={idx} className="hover:bg-gray-50">
              {Object.values(item).map((value, i) => (
                <td key={i} className="px-4 py-2 text-black">
                  {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderSection = (
    title: string,
    data: any,
    headers: string[],
    issueType: string
  ) => {
    const match = title.match(/\(([^)]+)\)/);
    const bracketWord = match ? match[1] : null;

    return (
      <div>
        <h2 className="text-xl font-semibold text-center mt-8 mb-5 text-gray-800">
          {title}
        </h2>
        {data && "error" in data ? (
          <p className="text-red-500 text-center">
            Access denied. Only admins are allowed.
          </p>
        ) : (
          <>
            {renderTable(headers, data)}
            <button
              onClick={() => handleAutoFix(issueType)}
              className="mt-6 py-2 px-6 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
            >
              Auto-Fix {bracketWord || title.split(" ")[0]} Issues
            </button>
            {fixMessages[issueType] && (
              <p className="mt-4 text-green-600 font-bold">
                {fixMessages[issueType]}
              </p>
            )}
          </>
        )}
      </div>
    );
  };

  if (loading)
    return <p className="text-center text-lg">Loading scan results...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-[600px] mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Compliance Scan Results
        </h1>
        {results && (
          <p className="text-center text-gray-600 mb-4">
            Scan Timestamp: {results.timestamp}
          </p>
        )}

        {renderSection(
          "MFA Check for Users",
          results?.mfaResults,
          ["User ID", "Email", "MFA Enabled", "Status"],
          "mfa"
        )}
        {renderSection(
          "Row Level Security (RLS) Check for Tables",
          results?.rlsResults,
          ["Table", "RLS Enabled", "Status"],
          "rls"
        )}
        {renderSection(
          "Point in Time Recovery (PITR) Check for Projects",
          results?.pitrResults,
          ["Project", "PITR Enabled", "Status"],
          "pitr"
        )}
      </div>
    </div>
  );
}
