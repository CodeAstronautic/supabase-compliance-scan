// types.ts

export interface MFAResult {
  id: string;
  email: string;
  mfaEnabled: boolean;
  status: string;
}

export interface TableResult {
  table: string;
  rlsEnabled: boolean;
  status: string;
}

export interface ProjectResult {
  project: string;
  pitrEnabled: boolean;
  status: string;
}

export interface ScanResults {
  timestamp: string;
  mfaResults: MFAResult[] | { error: string; details?: string };
  rlsResults: TableResult[];
  pitrResults: ProjectResult[];
}
