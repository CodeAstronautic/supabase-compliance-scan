// apiService.ts
import axios from "axios";

interface ScanCredentials {
  // Define the credentials structure based on what your API expects
  apiKey: string;
  projectId: string;
}

export const scanApi = async (credentials: ScanCredentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3002/api/scan",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // The response data from the API
  } catch (error: any) {
    // Handle error based on axios's response format
    throw new Error(
      error.response?.data?.error || "Failed to fetch scan results"
    );
  }
};

export const fixApi = async (issueType: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3002/api/fix",
      { issueType },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // The response data from the API
  } catch (error: any) {
    // Handle error based on axios's response format
    throw new Error(error.response?.data?.error || `Error fixing ${issueType}`);
  }
};
