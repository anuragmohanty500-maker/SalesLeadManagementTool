import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import type { Lead } from './store/leadsSlice';
import styles from './LeadDetails.module.css';

const LeadDetails: React.FC = () => {
  const selectedLeadId = useSelector((state: RootState) => state.leads.selectedLeadId);
  const lead = useSelector((state: RootState) =>
    state.leads.leads.find((l: Lead) => l.id === selectedLeadId)
  );

  if (!lead) {
    return <div>Please select a lead to see details.</div>;
  }

  return (
    <div className={styles.leadDetails}>
      <h2 className={styles.heading}>Lead Details</h2>
      <p className={styles.field}><strong>Name:</strong> {lead.name}</p>
      <p className={styles.field}><strong>Email:</strong> {lead.email}</p>
      <p className={styles.field}><strong>Phone:</strong> {lead.phone}</p>
    </div>
  );
};

export default LeadDetails;
