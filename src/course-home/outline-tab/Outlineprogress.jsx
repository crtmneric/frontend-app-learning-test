import React, { useEffect, useState } from 'react';
import { useModel } from '../../generic/model-store';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

// Define your new component
function OutlineProgress({ courseId }) {
    const [progressData, setProgressData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Define the URL with the actual courseId
                const url = `https://courses-test.pupilica.com/api/course_home/progress/${courseId}`;

                // Make the GET request using an asynchronous function
                const response = await getAuthenticatedHttpClient().get(url);

                // Set the fetched data in state
                setProgressData(response.data.completion_summary);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Call the async function
        fetchData();
    }, [courseId]);


    // Check if completionSummary is defined before accessing its properties
    const completeCount = progressData?.complete_count || 0;
    const incompleteCount = progressData?.incomplete_count || 0;
    const lockedCount = progressData?.locked_count || 0;
    const numTotalUnits = completeCount + incompleteCount + lockedCount;
    const completePercentage = completeCount ? Number(((completeCount / numTotalUnits) * 100).toFixed(0)) : 0;
    const progressBarStyle = {
        width: `${completePercentage}%`,
        height: '10px', // Adjust the height
        background: `linear-gradient(to right, #aaf3a8, #57cc99)`,
        borderRadius: '10px',
        transition: 'width 0.5s ease-in-out',
        position: 'relative',
    };
    const containerStyle = {
        width: `100%`,
        height: '10px', // Adjust the height
        backgroundColor: 'lightgray',
    };
    const labelStyle = {
        fontWeight: 'bold',
    };
    // Render the component once completionSummary is available
    return (
        <div>
            <p style={labelStyle}>Tamamlama Oranı: %{completePercentage}</p>
            {/* Add your JSX code here that uses completionSummary */}
            {/* Render the progress bar */}
            <div style={containerStyle}>
                <div style={progressBarStyle}></div>
            </div>
        </div>
    );
}

export default OutlineProgress;





