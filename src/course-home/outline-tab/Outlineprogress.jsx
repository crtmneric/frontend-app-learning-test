import React, { useEffect, useState } from 'react';
import { useModel } from '../../generic/model-store';

// Define your new component
function OutlineProgress({ courseId }) {
    useEffect(() => {
        if (courseId) {
            const response = useModel('progress', courseId);

            console.log("response", response);
            const completionSummary = response.completion_summary;

            const numTotalUnits = completionSummary.complete_count + completionSummary.incomplete_count + completionSummary.locked_count;
            const completePercentage = completionSummary.complete_count ? Number(((completionSummary.complete_count / numTotalUnits) * 100).toFixed(0)) : 0;
            const lockedPercentage = completionSummary.locked_count ? Number(((completionSummary.locked_count / numTotalUnits) * 100).toFixed(0)) : 0;

            console.log("completePercentage", completePercentage);
            console.log("lockedPercentage ", lockedPercentage );
        }

    }, [courseId])




    // Render the component once progressData is available
    return (
        <div>
            {/* <p>Complete Count: {completeCount}</p>
            <p>Incomplete Count: {incompleteCount}</p>
            <p>Locked Count: {lockedCount}</p> */}
            {/* <p>Percentage: {completePercentage}</p> */}
            {/* Add your JSX code here that uses progressData */}
        </div>
    );
}

export default OutlineProgress;





