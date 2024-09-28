import React, { useEffect, useState } from "react";
import '../../assets/css/PlannerArea.css';
import { useLocation } from "react-router-dom";


const Planner = () => {
    const location = useLocation(); // Get the location
    const [plans, setPlans] = useState(location.state?.plans || []); // Use passed plans or empty array

    useEffect(() => {
        // If plans are not in state, retrieve from session storage
        if (!location.state?.plans) {
            const fetchedChatId = sessionStorage.getItem('currentChat');
            if(fetchedChatId != null){
                const storedPlans =  sessionStorage.getItem(fetchedChatId);
                if(storedPlans){
                    try{
                        const parsedPlans =  JSON.parse(storedPlans)['fetchedPlans'];
                        setPlans(parsedPlans);
                    }catch(error){
                        console.error(error);
                        
                    }
                }
            }else{
                const storedPlans = sessionStorage.getItem('plans');
                if (storedPlans) {
                    try {
                        const parsedPlans = JSON.parse(storedPlans); // Parse the JSON string
                        setPlans(parsedPlans); // Set the state to the retrieved plans
                    } catch (error) {
                        console.error('Error parsing plans:', error); // Log parsing error
                    }
                }
            }
        }
    }, [location.state]); 

    return (
        <div className="planner-body">
            <div className="planner-content planner-flow">
                <ul className="planner-custom-marker">
                    {plans.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Planner;
