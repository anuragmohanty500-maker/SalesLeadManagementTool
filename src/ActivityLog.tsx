import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { addActivity } from './store/leadsSlice';
import type { Activity } from './store/leadsSlice';
import styles from './ActivityLog.module.css';

const EMPTY_ACTIVITIES: Activity[] = [];

const ActivityLog: React.FC = () => {
  const dispatch = useDispatch();
  const selectedLeadId = useSelector((state: RootState) => state.leads.selectedLeadId);
  const activities = useSelector((state: RootState) => {
    const lead = state.leads.leads.find(l => l.id === selectedLeadId);
    return lead?.activities ?? EMPTY_ACTIVITIES;
  });

  const [newActivityText, setNewActivityText] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleAddActivity = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedLeadId) return;

    const text = newActivityText.trim();

    if (!text) {
      setValidationError('Please enter an activity.');
      return;
    }

    const activity = {
      text,
      timestamp: new Date().toISOString(),
    };
    dispatch(addActivity({ leadId: selectedLeadId, activity }));
    setNewActivityText('');
    setValidationError('');
  };

  if (!selectedLeadId) {
    return <div className={styles.emptyMessage}>Please select a lead to see activities.</div>;
  }

  return (
    <section className={styles.activityLog} aria-labelledby="activity-log-heading">
      <h3 id="activity-log-heading" className={styles.heading}>Activity Log</h3>
      <ul className={styles.list}>
        {activities.map((a, index) => (
          <li className={styles.listItem} key={`${a.timestamp}-${index}`}>
            [{new Date(a.timestamp).toLocaleString()}] {a.text}
          </li>
        ))}
      </ul>
      <form className={styles.form} onSubmit={handleAddActivity}>
        <label className={styles.label} htmlFor="activity-input">Follow-up activity</label>
        <input
          className={styles.input}
          id="activity-input"
          type="text"
          value={newActivityText}
          onChange={(event) => {
            setNewActivityText(event.target.value);
            if (validationError) setValidationError('');
          }}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? 'activity-error' : undefined}
        />
        <button className={styles.button} type="submit">Add Activity</button>
        {validationError && (
          <p className={styles.error} id="activity-error" role="alert">{validationError}</p>
        )}
      </form>
    </section>
  );
};

export default ActivityLog;
