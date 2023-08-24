import React, { useEffect, useState } from 'react';
import { useModel } from '../../generic/model-store';

// Define your new component
function OutlineProgress({ courseId }) {
    // Initialize state for the completionSummary data
    const [completionSummary, setCompletionSummary] = useState(null);

    // Fetch the completionSummary data when the courseId changes
    useEffect(() => {
        getData();
    }, [courseId]);

    const getData = async () => {
        const data = await useModel('progress', courseId);
        setCompletionSummary(data?.completionSummary);
    }

    // Check if completionSummary is defined before accessing its properties
    const completeCount = completionSummary?.completeCount || 0;
    const incompleteCount = completionSummary?.incompleteCount || 0;
    const lockedCount = completionSummary?.lockedCount || 0;
    const numTotalUnits = completeCount + incompleteCount + lockedCount;
    const completePercentage = completeCount ? Number(((completeCount / numTotalUnits) * 100).toFixed(0)) : 0;

    // Render the component once completionSummary is available
    return (
        <div>
            <p>Complete Count: {completeCount}</p>
            <p>Incomplete Count: {incompleteCount}</p>
            <p>Locked Count: {lockedCount}</p>
            <p>Percentage: {completePercentage}</p>
            {/* Add your JSX code here that uses completionSummary */}
        </div>
    );
}

export default OutlineProgress;





