import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Activity {
  text: string;
  timestamp: string;  // ISO string or readable date
}
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  activities: Activity[];
}

interface LeadsState {
  leads: Lead[];
  selectedLeadId: string | null;
}

const isActivity = (value: unknown): value is Activity => {
  if (typeof value !== 'object' || value === null) return false;
  const activity = value as Partial<Activity>;
  return typeof activity.text === 'string' &&
    typeof activity.timestamp === 'string';
};

const isLead = (value: unknown): value is Lead => {
  if (typeof value !== 'object' || value === null) return false;
  const lead = value as Partial<Lead>;
  return typeof lead.id === 'string' &&
    typeof lead.name === 'string' &&
    typeof lead.email === 'string' &&
    typeof lead.phone === 'string' &&
    Array.isArray(lead.activities) &&
    lead.activities.every(isActivity);
};

const loadSavedLeads = (): Lead[] => {
  try {
    if (typeof window === 'undefined') return [];
    const savedLeadsJSON = window.localStorage.getItem('leads');
    if (!savedLeadsJSON) return [];

    const parsed: unknown = JSON.parse(savedLeadsJSON);
    return Array.isArray(parsed) && parsed.every(isLead) ? parsed : [];
  } catch {
    return [];
  }
};

const savedLeads = loadSavedLeads();

const initialState: LeadsState = {
  leads: savedLeads.length > 0 ? savedLeads : [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', activities: [] },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', activities: [] },
  ],
  selectedLeadId: null,
};



const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
  selectLead(state, action: PayloadAction<string>) {
    state.selectedLeadId = action.payload;
  },
  addActivity(state, action: PayloadAction<{ leadId: string; activity: Activity }>) {
  const lead = state.leads.find(l => l.id === action.payload.leadId);
  if (lead) {
    lead.activities.push(action.payload.activity);
  }
}

},
});

export const { selectLead, addActivity } = leadsSlice.actions;
export default leadsSlice.reducer;
