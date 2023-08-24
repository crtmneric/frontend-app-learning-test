import React, { useEffect, useState } from 'react';
import { useModel } from '../../generic/model-store';

// Define your new component
function OutlineProgress({ courseId }) {
    const [progressData, setProgressData] = useState(null);

    useEffect(() => {
        // Define the URL with the actual courseId
        const url = `https://courses-test.pupilica.com/api/course_home/progress/${courseId}`;

        // Make the GET request
        fetch(url)
            .then((response) => {
                // Check if the response is successful (status code 200)
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                // Parse the response as JSON
                return response.json();
            })
            .then((data) => {
                // Set the fetched data in state
                setProgressData(data.completion_summary);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [courseId]);


    // Check if progressData is defined before accessing its properties
    const completeCount = progressData?.completeCount || 0;
    const incompleteCount = progressData?.incompleteCount || 0;
    const lockedCount = progressData?.lockedCount || 0;
    const numTotalUnits = completeCount + incompleteCount + lockedCount;
    const completePercentage = completeCount ? Number(((completeCount / numTotalUnits) * 100).toFixed(0)) : 0;

    // Render the component once progressData is available
    return (
        <div>
            <p>Complete Count: {completeCount}</p>
            <p>Incomplete Count: {incompleteCount}</p>
            <p>Locked Count: {lockedCount}</p>
            <p>Percentage: {completePercentage}</p>
            {/* Add your JSX code here that uses progressData */}
        </div>
    );
}

export default OutlineProgress;





