import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useModel } from '../../generic/model-store';

// Define your new component
function OutlineProgress() {
    
    const {
        courseId,
    } = useSelector(state => state.courseHome);

    const {
        completionSummary: {
            completeCount,
            incompleteCount,
            lockedCount,
        },
    } = useModel('progress', courseId);

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





