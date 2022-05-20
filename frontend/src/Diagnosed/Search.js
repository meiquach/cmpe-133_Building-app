import React, { useState, useEffect } from "react";
import { Link, useLocation, Route, Routes, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RecordList from "./RecordList";
import "./diagnosis.css";
import axios from "../api/axios";



/* System states that control states and state transitions*/
const systemStates = ["WaitingForSymptom", "WaitingForDetails", "WaitingForFrequency", "DisplayResult"]

/* Displayed info for asking user*/
const mainSymptoms = ["Fever", "Muscle Pain", "Skin Irritation"]
const mainSymptoms2 = ["Coughing", "Headache", "Stomachache"]
const MEDICATION_URL = "/medications";
const DIAGNOSISED_URL = "/diagnosed";
const specificSymptomsData = {
    "Coughing": {
        "Wet Cough": "Any cough that produces mucus (phlegm). May feel congestion in the chest or back of the throat. Can bring mucus to your mouth",
        "Whooping Cough": "A severe hacking cough that is followed by a high-pitched intake of the breath. Indicates a highly contagious respiratory tract infection.",
        "Dry, Tickling Cough": "Non-productive coughs that do not bring up any phlegm or mucus. A cough that causes a tickling sensation due to irritation in the throat.",
        "Chest Cough": "Cough that causes chest pain or discomfort. Wheezing, shortness of breath, and coughing up green or yellow mucus may also occur.",
        "Post-Viral Cough": "Cough after a viral respiratory infection like bronchitis or the flu. Cough may produce mucus or be non-productive and dry. Sore or irritation in the throat, hoarseness, and frequent throat clearing may also occur.",
        "Bronchitis": "Frequent coughing with thickened, discolored mucus which can also be streaked with blood. Commonly occurs from a cold or other respiratory infections. Fatigue, shortness of breath, a slight fever and chills, and chest discomfort is also common."

    },
    "Headache": {
        "Sinus": "A deep and constant pain in your cheekbones, forehead or bridge of nose. Pain may intensify with head movement or strain. Runny nose, feeling of fullness in ears, fever, or swelling in the face can also occur.",
        "Tension": "A tension-type headache that can include a dull, aching head pain; sensation of tightness across the forehead or the sides to the back of the head; or a tenderness in the scalp, neck, and shoulder muscles.",
        "Migraine": "A headache that causes severe, throbbing pain or a pulsing sensation, usually on one side of the head. Nausea, vomiting, and sensitivity to light and sound may also occur.",
        "Cluster": "A headache occurring in cyclical patterns or cluster periods. Commonly occurs when awoken in the middle of the night with intense pain in or around one eye on a side of the head."

    },
    "Stomachache": {
        "Gastritis": "Inflammation of the lining of the stomach that commonly causes most stomach ulcers. Nausea, vomiting, a feeling of fullness in the upper abdomen, or a burning ache in the upper abdomen may occur.",
        "Peptic Ulcer": "Open sores that develop on the inside lining of the stomach and upper portion of your small intestine. Burning stomach pains, heartburn, and nausea can commonly occur. In the most severe cases, vomiting, feeling faint, appetite changes, and breathing troubles may occur.",
        "Irritable Bowel Syndrome": "A change in bowel habits which can cause abdominal pain, cramping, or bloating that can also be related to changes in the appearances of bowel movements.",
        "Chronic Diarrhoea": "Digestive conditions which mainly result in loose or watery stools. Abdominal cramps, bloating, and nausea also commonly occur",

    },
    "Fever": {
        "Intermittent": "Occurs over the course of the day. Body temperature baseline fluctuates between normal and fever levels.",
        "Remittent": "A fever that comes and goes with a fluctuating temperature, but never falls all the way back to normal body temperature.",
        "Continuous or Sustained": "A prolonged fever with little to no change in temperature over the course of a day.",
        "Hectic": "Identified either as intermittent or a remittent if the temperature range swings widely throughout the day, with ±1.4 C between the highest and lowest temperatures.",
        "Relapsing": "An intermittent fever that spikes after days/weeks of normal body temperatures. Can be associated with animal bites or diseases like malaria."
    },
    "Muscle Pain": {
        "Nociceptive Pain": "Sharp, aching, or throbbing pain often caused by external damages to the body tissue. Commonly occurs in joints, muscles, skin, tendons, and bones.",
        "Inflammatory Pain": "Spontaneous hypersensitivity to pain in response to tissue damage and inflammation.",
        "Neuropathic Pain": "Burning sensation with affected areas often sensitive to the touch. Excruciating pain, pins and needles, and numbness are common symptoms."

    },
    "Skin Irritation": {
        "Eczema": "Sharp, aching, or throbbing pain often caused by external damages to the body tissue. Commonly occurs in joints, muscles, skin, tendons, and bones.",
        "Granuloma Annulare": "Raised rash or bumps in a ring pattern. Commonly affects young adults usually at the hands and feet.",
        "Lichen Planus": "Inflammation, swelling, and irritation on the skin that usually causes a rash that is itchy. Shiny red or purple firm bumps which may itch may be apparent.",
        "Ityriasis Rosea": "A temporary rash of raised red, scaly patches on the body. Some may feel unwell for a few days before they get the rash, with headaches, high temperatures, or joint pain occurring alongside it."

    }

}

const frequencies = ["1-2", "3-5", "7+ days"]
// const systemMessages = ["Advil, Claritin, etc..", 
//                         "Frequency, etc.",
//                          "DisplayResult"]





const Search = () => {

    /* ------------ STATES ------------*/

    const [mainSymptom, setMainSymptom] = useState('')                  // Selected main symptom
    const [specificSymptoms, setSpecificSymptoms] = useState([])        // Array of selected specific symptoms (boolean)
    const [systemState, setSystemState] = useState(0)
    const [frequency, setFrequency] = useState('')
    const [medications, setMedications] = useState([])
    const [popup, setPopup] = useState(false)


    const { auth } = useAuth();

    useEffect(() => {
        console.log("Selected: " + mainSymptom);
    }
        , [mainSymptom])


    /* ------------ HELPER FUNCTIONS FOR SEARCH FUNCTIONALITY ------------ */

    function toggleNext() {
        switch (systemState) {
            case 0:
                /* Unselected main symptom */
                if (mainSymptom === "") {
                    alert("Please select one symptom!");
                    return;
                }

                /* Main symptom has been selected */
                if (specificSymptoms.length === 0)
                    setSpecificSymptoms(new Array(Object.keys(specificSymptomsData[mainSymptom]).length).fill(false))
                break;
            case 2:
                if (frequency === "") {
                    alert("Please select the frequency of your symptoms!")
                    return;
                }
                updateMedications();
                break;

        }


        if (!(systemState === systemStates.length - 1)) {

            setSystemState(previousSystemState => previousSystemState + 1)
        }

    }

    function toggleBack() {
        if (!(systemState === 0)) {
            setSystemState(previousSystemState => previousSystemState - 1)
        }


    }

    async function handleSubmit() {
        console.log("Submitting user information to database")

        // This fetches which boxes are checked and then gets specific symptoms from specificSymptomsData
        const convertedSpecificSymptoms = []
        for (let i = 0; i < specificSymptoms.length; i++) {
            if (specificSymptoms[i] === true) {
                convertedSpecificSymptoms.push(Object.keys(specificSymptomsData[mainSymptom])[i]);
            }
        }

        // This fetches the medication name from each medicationObject
        const tempMedications = []
        for (let i = 0; i < Object.keys(medications).length; i++) {
            tempMedications.push(medications[i].medication)
        }

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newMedication = {
            email: auth.email,
            symptom: mainSymptom,
            specificSymptoms: convertedSpecificSymptoms,
            medications: tempMedications,
        }

        // This will send a post request to update the data in the database.
        const response = await axios.post(
            DIAGNOSISED_URL,
            JSON.stringify(newMedication),
            {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.accessToken}` },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
        setPopup(true)
    }

    async function updateMedications() {
        const response = await axios.get(MEDICATION_URL);

        const records = response.data;             // Result (gets all medicine in database)

        // This fetches which boxes are checked and then gets specific symptoms from specificSymptomsData
        const convertedSpecificSymptoms = []
        for (let i = 0; i < specificSymptoms.length; i++) {
            if (specificSymptoms[i] === true) {

                convertedSpecificSymptoms.push(Object.keys(specificSymptomsData[mainSymptom])[i]);
            }
        }

        // function 
        // Filters out result with entry
        let filteredRecords;

        // Filter out based on selected symptom if no specific Symptom has been chosen
        if (specificSymptoms.includes(true) == false) {
            console.log("Filtering from symptoms")
            filteredRecords = records.filter(function (entry) {
                return entry.symptoms.includes(mainSymptom)
            })

        }
        // Otherwise, filter based on selected specific symptom
        else {
            console.log("Filtering from specificSymptoms")
            console.log(convertedSpecificSymptoms)
            filteredRecords = records.filter(function (entry) {
                return convertedSpecificSymptoms.some(selectedSpecificSymptom => {
                    return entry.specificSymptoms.includes(selectedSpecificSymptom);
                })

            })

        }
        // View: Filters out database

        setMedications(filteredRecords);

    }

    function handleSpecificSymptom(updatedIndex) {
        console.log(updatedIndex)
        console.log("specifics symptoms: " + specificSymptoms)
        // Creates a new array of specific symptoms but with the selected checkbox toggled
        const newSpecificSymptoms = specificSymptoms.map((item, index) =>
            index === updatedIndex ? !item : item
        );

        setSpecificSymptoms(newSpecificSymptoms);
    }

    /* ------------ COMPONENTS SECTION  ------------*/

    /* Next button */
    const Next = (props) => {
        return (
            <button className="next" onClick={toggleNext}> Next </button>
        )
    }

    /* Back button */
    const Back = (props) => {
        return (
            <button className="previous" onClick={toggleBack} > Back </button>
        )
    }


    /* List of radio buttons
    
        PROPS
            1. listObjects: list of objects to be mapped out as a list -> used to display the list of radio buttons unique to each state of this component, etc: WaitingForSymptoms, WaitingForDetails, etc.
    
    */
    const ListOfRadioButtons = (props) => {
        return (
            <div>
                {/* List out a list of radio buttons */}
                {props.listObjects.map(s => (
                    // Wrap in container class and checkmark span for css purposes
                    <label class="container">
                        <input
                            type="radio"
                            name={props.name}
                            value={s}
                            checked={props.stateVariable === s}
                            onChange={props.onChange}
                        />{" "}
                        {s}
                        <span class="checkmark"></span>
                    </label>
                ))}
            </div>
        );
    }

    const ListOfCheckBoxes = (props) => {
        return (
            <div>
                {/* List out a list of radio buttons */}
                {props.listObjects.map(s => (
                    // Wrap in container class and checkmark span for css purposes
                    <label className="container" class="container">
                        <input
                            type="radio"
                            name="mainSymptom"
                            value={s}
                            checked={mainSymptom === s}
                            onChange={e => setMainSymptom(e.currentTarget.value)}
                        />{" "}
                        {s}
                        <span class="checkmark"></span>
                    </label>
                ))}
            </div>
        );
    }

    // function handle
    const Checkbox = (props) => {
        <input type="checkbox" {...props}></input>
    }

    const Submit = (props) => {
        // <button class="submit" onClick= "{handleSubmit()}">Submit</button>
        return (
            <div>
                {/* <Link to = "/">test</Link> */}
                <button
                    class="diagnosis-submit"
                    onClick={() => { handleSubmit() }}>
                    Submit
                </button>
            </div>
        );
    }

    // Displays a column of specific symptoms
    const SpecificSymptomColumn = (props) => {
        const icon = "U+0279C";
        return (
            <div>
                {Object.keys(specificSymptomsData[mainSymptom]).slice(props.start, props.end).map((specificSymptom, index) => {
                    let realIndex = index + props.start;    // Aligns the index with the specificSymptoms array to properly update the selected symptom
                    return (
                        <label class="container"> {specificSymptom} <sub class="i">&#x1F6C8;<span class="itext">{specificSymptomsData[mainSymptom][specificSymptom]}</span></sub>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${realIndex}`}
                                name={specificSymptom}
                                value={specificSymptom}
                                checked={specificSymptoms[realIndex]}
                                onChange={() => handleSpecificSymptom(realIndex)}
                            />
                            <span class="checkmark"></span>
                        </label>
                    );
                })}
            </div>
        );
    }

    // Displays a page of specific symptoms
    const SpecificSymptom = (props) => {

        let specificSymptomsLength = Object.keys(specificSymptomsData[mainSymptom]).length;
        var split = specificSymptomsLength / 2;
        split = Math.ceil(split);

        return (
            <div>
                <div class="box">
                    <SpecificSymptomColumn start={0} end={split} />
                </div>

                <div class="box">
                    <SpecificSymptomColumn start={split} end={specificSymptomsLength} />
                </div>
            </div>

        );
    }


    const SpecificSymptomSurvey = (props) => {
        return (
            <div className="title-symtoms">
                <h3>{mainSymptom}</h3>
                <p> Types Of {mainSymptom}</p>
                <p>(Click on &#x1F6C8; for the descriptions)</p>
                <br></br>
                <div class="dd">
                    <SpecificSymptom />
                </div>
            </div>
        );
    }


    /* State: Renders the current state e.g: WaitingForSymptom,WaitingForDetails,WaitingForFrequency,etc... */
    const State = (props) => {
        switch (props.state) {
            case 0:
                return (

                    <div id="Symptoms" >
                        <p>Welcome to the self-diagnose.</p>
                        <p>(DISCLAIMER: If you experience severe pain or illness, please seek professional guidance immediately)</p>
                        <br></br>
                        <p className="guidance">Please choose from those categories listed below that describe the most symptom you have.</p>
                        <p className="warning">(Choose one main symptom)</p>
                        <br></br>
                        <div className="ss">
                            <div class="box">
                                <ListOfRadioButtons listObjects={mainSymptoms2} name="mainSymptom" stateVariable={mainSymptom} onChange={(e) => setMainSymptom(e.currentTarget.value)} />
                            </div>
                            <div class="box" className="box">
                                <ListOfRadioButtons listObjects={mainSymptoms} name="mainSymptom" stateVariable={mainSymptom} onChange={(e) => setMainSymptom(e.currentTarget.value)} />
                            </div>
                        </div>
                        <div class="N_P">
                            <div class="NP">
                                <Next />
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (

                    <div id="Details" >

                        <SpecificSymptomSurvey />
                        <div id="d7" class="d">
                            <div class="N_P">
                                <div class="NP">
                                    <Back />
                                </div>
                                <div class="NP">
                                    <Next />
                                </div>
                            </div>
                        </div>
                    </div>);
            case 2:
                return (
                    <div id="Frequency">
                        <p>How often do the symptoms appear?</p>
                        <div className="ff">
                            <div className="box">
                                <div id="outter">
                                    <ListOfRadioButtons listObjects={frequencies} name="frequency" stateVariable={frequency} onChange={(e) => setFrequency(e.currentTarget.value)} />
                                </div>
                            </div>
                            <div className="box">

                            </div>
                            <div class="N_P">
                                <div class="NP">
                                    <Back />
                                </div>
                                <div class="NP">
                                    <Next />
                                </div>
                            </div>
                        </div>
                    </div>);
            default:
                return (
                    <div id="Treatment">
                        <Routes>
                            <Route exact path="/" element={<RecordList symptom={mainSymptom} medications={medications} />} />
                        </Routes>

                        <p id="notice">Notice</p>
                        <p>After a week, if the symptom is not getting better.</p>
                        <p>Doctor appointment is highly recommended.</p>
                        <div class="N_P">
                            <div class="NP">
                                {/* <button class="previous" onclick="openPage('Frequency', t3, '#e8e8e8')">Previous</button> */}
                                <Back />
                            </div>
                            <div class="NP">
                                {/* <button class="submit" onclick="Done()">Submit</button> */}
                                <Submit />
                            </div>
                        </div>
                    </div>);
        }
    }

    return (
        <div className="search">
            {popup == false ? (<div>""</div>) : (
                <div className="popup-message" id="popup">
                    <p>Your diagnosis information has been saved successfully</p>
                    <p>Please click OK to return to Homepage</p>
                    <div class="s">
                        <Link to="/" type="button" class="ok-btn">OK</Link>
                    </div>
                </div>)}

            <div className="searchInputs"></div>


            <div class="bottom_nav" >
                <button class="tablink" id="defaultOpen">Symptoms</button>
                <button class="tablink" id="t2">Details</button>
                <button class="tablink" id="t3">Frequency</button>
                <button class="tablink" id="t4">Treatment</button>
            </div>
            <State state={systemState} />
            <br></br>

        </div>
    );

};
export default Search