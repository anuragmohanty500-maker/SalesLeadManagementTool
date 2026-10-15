import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { selectLead } from './store/leadsSlice';
import type { Lead } from './store/leadsSlice';
import styles from './LeadList.module.css';  // Import CSS module

const LeadList: React.FC = () => {
  const leads = useSelector((state: RootState) => state.leads.leads);
  const selectedLeadId = useSelector((state: RootState) => state.leads.selectedLeadId);
  const dispatch = useDispatch();

  const handleSelectLead = (id: string) => {
    dispatch(selectLead(id));
  };

  return (
    <div>
      <h2>Sales Leads</h2>
      <ul>
        {leads.map((lead: Lead) => (
          <li key={lead.id}>
            <button
              type="button"
              className={`${styles.leadItem} ${lead.id === selectedLeadId ? styles.selected : ''}`}
              aria-pressed={lead.id === selectedLeadId}
              onClick={() => handleSelectLead(lead.id)}
            >
              {lead.name} - {lead.email}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadList;
