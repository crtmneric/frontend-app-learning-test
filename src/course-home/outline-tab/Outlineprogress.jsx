import React, { useEffect, useState } from 'react';
import { useModel } from '../../generic/model-store';

// Define your new component
function OutlineProgress({ courseId }) {
  // Initialize state for the completionSummary data
  const [completionSummary, setCompletionSummary] = useState(null);

  // Fetch the completionSummary data when the courseId changes
  useEffect(() => {
    // Use the useModel hook to fetch completionSummary based on the courseId
    const fetchData = async () => {
      try {
        const data = await useModel('progress', courseId);
        setCompletionSummary(data.completionSummary);
      } catch (error) {
        console.error('Error fetching completionSummary:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [courseId]);

  // Check if completionSummary is defined before accessing its properties
  const completeCount = completionSummary?.completeCount || 0;
  const incompleteCount = completionSummary?.incompleteCount || 0;
  const lockedCount = completionSummary?.lockedCount || 0;

  // Render the component once completionSummary is available
  return (
    <div>
      <p>Complete Count: {completeCount}</p>
      <p>Incomplete Count: {incompleteCount}</p>
      <p>Locked Count: {lockedCount}</p>
      {/* Add your JSX code here that uses completionSummary */}
    </div>
  );
}

export default OutlineProgress;





