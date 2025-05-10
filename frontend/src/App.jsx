// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import './App.css';

// function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div className="home-page">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="nav-title">Obesity Level Prediction</div>
//         <div className="nav-links">
//           <a href="/">Home</a>
//           <a href="#">Profile</a>
//         </div>
//       </nav>

//       {/* About Section */}
//       <div className="about-section">
//         <h1>Welcome to the Obesity Level Predictor</h1>
//         <p>
//           Obesity is a growing concern worldwide, leading to severe health complications such as diabetes, heart diseases, and other chronic illnesses. This website is designed to provide an easy-to-use tool for predicting your obesity level based on scientific factors and machine learning predictions.
//         </p>
//         <p>
//           According to recent statistics, over 1.9 billion adults worldwide are overweight, and 650 million are obese. Early detection and proactive measures can significantly reduce health risks.
//         </p>
//         <button className="check-yours-btn" onClick={() => navigate('/form')}>
//           Check Yours
//         </button>
//       </div>

//       {/* Contact Section */}
//       <footer className="contact-bar">
//         <p>Contact Us: Email - contact@obesityprediction.com | Phone - +1 234 567 890</p>
//       </footer>
//     </div>
//   );
// }

// function FormPage() {
//   const [formData, setFormData] = useState({
//     Gender: '',
//     Age: '',
//     Height: '',
//     Weight: '',
//     familyHistory: '',
//     FAVC: '',
//     FCVC: '',
//     NCP: '',
//     CAEC: '',
//     SMOKE: '',
//     CH2O: '',
//     SCC: '',
//     FAF: '',
//     TUE: '',
//     CALC: '',
//     MTRANS: '',
//   });

//   const [currentPage, setCurrentPage] = useState(0);
//   const progressPercentage = (currentPage + 1) * (100 / 3);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleNext = (e) => {
//     e.preventDefault(); // Prevent form submission
//     if (currentPage < 2) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = (e) => {
//     e.preventDefault(); // Prevent form submission
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitted form:', formData); // Replace with API call
//     window.location.href = '/result?prediction=Overweight'; // Simulated navigation to result
//   };

//   const renderFormPage = () => {
//     switch (currentPage) {
//       case 0:
//         return (
//           <div>
//             <label>
//               Gender:
//               <select name="Gender" value={formData.Gender} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </label>
//             <label>
//               Age:
//               <input type="number" name="Age" value={formData.Age} onChange={handleChange} />
//             </label>
//             <label>
//               Height (cm):
//               <input type="number" name="Height" value={formData.Height} onChange={handleChange} />
//             </label>
//             <label>
//               Weight (kg):
//               <input type="number" name="Weight" value={formData.Weight} onChange={handleChange} />
//             </label>
//           </div>
//         );
//       case 1:
//         return (
//           <div>
//             <label>
//               Family History of Overweight:
//               <select name="familyHistory" value={formData.familyHistory} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//             </label>
//             <label>
//               Frequent High-Calorie Food Consumption (FAVC):
//               <select name="FAVC" value={formData.FAVC} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//             </label>
//             <label>
//               Frequency of Consumption of Vegetables (FCVC) [1-3]:
//               <input type="number" name="FCVC" value={formData.FCVC} onChange={handleChange} />
//             </label>
//             <label>
//               Number of Main Meals (NCP) [1-4]:
//               <input type="number" name="NCP" value={formData.NCP} onChange={handleChange} />
//             </label>
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             <label>
//               Daily Water Intake (CH2O) [Liters/Day]:
//               <input type="number" name="CH2O" value={formData.CH2O} onChange={handleChange} />
//             </label>
//             <label>
//               Calorie Consumption Monitoring (SCC):
//               <select name="SCC" value={formData.SCC} onChange={handleChange}>
//                 <option value="">-- Select --</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//             </label>
//             <label>
//               Physical Activity Frequency (FAF) [Hours/Week]:
//               <input type="number" name="FAF" value={formData.FAF} onChange={handleChange} />
//             </label>
//             <label>
//               Time Using Technology (TUE) [Hours/Day]:
//               <input type="number" name="TUE" value={formData.TUE} onChange={handleChange} />
//             </label>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="form-page">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="nav-title">Obesity Level Prediction</div>
//         <div className="nav-links">
//           <a href="/">Home</a>
//           <a href="#">Profile</a>
//         </div>
//       </nav>

//       {/* Progress Bar */}
//       <div className="progress-bar">
//         <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
//       </div>

//       {/* Form Container */}
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <h2>Step {currentPage + 1} of 3</h2>
//           {renderFormPage()}
//           <div className="form-navigation">
//             {currentPage > 0 && (
//               <button type="button" className="nav-btn" onClick={handlePrevious}>
//                 Previous
//               </button>
//             )}
//             {currentPage < 2 ? (
//               <button type="button" className="nav-btn" onClick={handleNext}>
//                 Next
//               </button>
//             ) : (
//               <button type="submit" className="submit-btn">
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Contact Section */}
//       <footer className="contact-bar">
//         <p>Contact Us: Email - contact@obesityprediction.com | Phone - +1 234 567 890</p>
//       </footer>
//     </div>
//   );
// }

// function ResultPage() {
//   const queryParams = new URLSearchParams(window.location.search);
//   const prediction = queryParams.get('prediction') || 'Normal';

//   return (
//     <div className="result-page">
//       <div className="result-container">
//         {prediction === 'Normal' ? (
//           <div className="celebration">
//             <h1>🎉 Congratulations! 🎉</h1>
//             <p>You are in the Normal weight range.</p>
//           </div>
//         ) : (
//           <div className="precautions">
//             <h1>Your Obesity Level: {prediction}</h1>
//             <p>Please consult a healthcare professional for further advice.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/form" element={<FormPage />} />
//         <Route path="/result" element={<ResultPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-title">Obesity Level Prediction</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#">Profile</a>
        </div>
      </nav>

      {/* About Section */}
      <div className="about-section">
        <h1>Welcome to the Obesity Level Predictor</h1>
        <p>
          Obesity is a growing concern worldwide, leading to severe health complications such as diabetes, heart
          diseases, and other chronic illnesses. This website is designed to provide an easy-to-use tool for predicting
          your obesity level based on scientific factors and machine learning predictions.
        </p>
        <p>
          According to recent statistics, over 1.9 billion adults worldwide are overweight, and 650 million are obese.
          Early detection and proactive measures can significantly reduce health risks.
        </p>
        <button className="check-yours-btn" onClick={() => navigate('/form')}>
          Check Yours
        </button>
      </div>

      {/* Contact Section */}
      <footer className="contact-bar">
        <p>Contact Us: Email - contact@obesityprediction.com | Phone - +1 234 567 890</p>
      </footer>
    </div>
  );
}

function FormPage() {
  const [formData, setFormData] = useState({
    Gender: '',
    Age: '',
    Height: '',
    Weight: '',
    familyHistory: '',
    FAVC: '',
    FCVC: '',
    NCP: '',
    CAEC: '',
    SMOKE: '',
    CH2O: '',
    SCC: '',
    FAF: '',
    TUE: '',
    CALC: '',
    MTRANS: '',
    NObeyesdad: '',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const progressPercentage = (currentPage + 1) * (100 / 3);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear error for the current field
    }));
  };

  const validatePage = () => {
    const pageFields = {
      0: ['Gender', 'Age', 'Height', 'Weight', 'familyHistory'],
      1: ['FAVC', 'FCVC', 'NCP', 'CAEC', 'SMOKE'],
      2: ['CH2O', 'SCC', 'FAF', 'TUE', 'CALC', 'MTRANS'],
    };
    const currentFields = pageFields[currentPage];
    const newErrors = {};
    currentFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validatePage()) {
      if (currentPage < 2) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePage()) {
      console.log('Submitted form:', formData); // Replace with API call
      window.location.href = '/result?prediction=Overweight'; // Simulated navigation to result
    }
  };

  const renderFormPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <div>
            <h2>Page 1 of 3: Basic Information (5 fields)</h2>
            <label>
              Gender:
              <select name="Gender" value={formData.Gender} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.Gender && <p className="error-text">{errors.Gender}</p>}
            </label>
            <label>
              Age:
              <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
              {errors.Age && <p className="error-text">{errors.Age}</p>}
            </label>
            <label>
              Height (cm):
              <input type="number" name="Height" value={formData.Height} onChange={handleChange} required />
              {errors.Height && <p className="error-text">{errors.Height}</p>}
            </label>
            <label>
              Weight (kg):
              <input type="number" name="Weight" value={formData.Weight} onChange={handleChange} required />
              {errors.Weight && <p className="error-text">{errors.Weight}</p>}
            </label>
            <label>
              Family History of Overweight:
              <select name="familyHistory" value={formData.familyHistory} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.familyHistory && <p className="error-text">{errors.familyHistory}</p>}
            </label>
          </div>
        );
      case 1:
        return (
          <div>
            <h2>Page 2 of 3: Lifestyle Information (5 fields)</h2>
            <label>
              Frequent High-Calorie Food Consumption (FAVC):
              <select name="FAVC" value={formData.FAVC} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.FAVC && <p className="error-text">{errors.FAVC}</p>}
            </label>
            <label>
              Frequency of Consumption of Vegetables (FCVC) [1-3]:
              <input type="number" name="FCVC" value={formData.FCVC} onChange={handleChange} required />
              {errors.FCVC && <p className="error-text">{errors.FCVC}</p>}
            </label>
            <label>
              Number of Main Meals (NCP) [1-4]:
              <input type="number" name="NCP" value={formData.NCP} onChange={handleChange} required />
              {errors.NCP && <p className="error-text">{errors.NCP}</p>}
            </label>
            <label>
              Consumption of Food Between Meals (CAEC):
              <select name="CAEC" value={formData.CAEC} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="no">No</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Frequently">Frequently</option>
                <option value="Always">Always</option>
              </select>
              {errors.CAEC && <p className="error-text">{errors.CAEC}</p>}
            </label>
            <label>
              Smoking Status (SMOKE):
              <select name="SMOKE" value={formData.SMOKE} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.SMOKE && <p className="error-text">{errors.SMOKE}</p>}
            </label>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Page 3 of 3: Physical Activity and Habits (6 fields)</h2>
            <label>
              Daily Water Intake (CH2O) [Liters/Day]:
              <input type="number" name="CH2O" value={formData.CH2O} onChange={handleChange} required />
              {errors.CH2O && <p className="error-text">{errors.CH2O}</p>}
            </label>
            <label>
              Calorie Consumption Monitoring (SCC):
              <select name="SCC" value={formData.SCC} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.SCC && <p className="error-text">{errors.SCC}</p>}
            </label>
            <label>
              Physical Activity Frequency (FAF) [Hours/Week]:
              <input type="number" name="FAF" value={formData.FAF} onChange={handleChange} required />
              {errors.FAF && <p className="error-text">{errors.FAF}</p>}
            </label>
            <label>
              Time Using Technology (TUE) [Hours/Day]:
              <input type="number" name="TUE" value={formData.TUE} onChange={handleChange} required />
              {errors.TUE && <p className="error-text">{errors.TUE}</p>}
            </label>
            <label>
              Consumption of Alcohol (CALC):
              <select name="CALC" value={formData.CALC} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="no">No</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Frequently">Frequently</option>
                <option value="Always">Always</option>
              </select>
              {errors.CALC && <p className="error-text">{errors.CALC}</p>}
            </label>
            <label>
              Mode of Transportation (MTRANS):
              <select name="MTRANS" value={formData.MTRANS} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="Walking">Walking</option>
                <option value="Bike">Bike</option>
                <option value="Motorbike">Motorbike</option>
                <option value="Automobile">Automobile</option>
                <option value="Public Transport">Public Transport</option>
              </select>
              {errors.MTRANS && <p className="error-text">{errors.MTRANS}</p>}
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-page">
      <nav className="navbar">
        <div className="nav-title">Obesity Level Prediction</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#">Profile</a>
        </div>
      </nav>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {renderFormPage()}
          <div className="form-navigation">
            {currentPage > 0 && (
              <button type="button" className="nav-btn" onClick={handlePrevious}>
                Previous
              </button>
            )}
            {currentPage < 2 ? (
              <button type="button" className="nav-btn" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="submit-btn">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      <footer className="contact-bar">
        <p>Contact Us: Email - contact@obesityprediction.com | Phone - +1 234 567 890</p>
      </footer>
    </div>
  );
}

function ResultPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const prediction = queryParams.get('prediction') || 'Normal';

  return (
    <div className="result-page">
      <div className="result-container">
        {prediction === 'Normal' ? (
          <div className="celebration">
            <h1>🎉 Congratulations! 🎉</h1>
            <p>You are in the Normal weight range.</p>
          </div>
        ) : (
          <div className="precautions">
            <h1>Your Obesity Level: {prediction}</h1>
            <p>Please consult a healthcare professional for further advice.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import './App.css';

// function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div className="home-page">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="nav-title">Obesity Level Prediction</div>
//         <div className="nav-links">
//           <a href="/">Home</a>
//           <a href="#">Profile</a>
//         </div>
//       </nav>

//       {/* About Section */}
//       <div className="about-section">
//         <h1>Welcome to the Obesity Level Predictor</h1>
//         <p>
//           Obesity is a growing concern worldwide, leading to severe health complications such as diabetes, heart
//           diseases, and other chronic illnesses. This website is designed to provide an easy-to-use tool for predicting
//           your obesity level based on scientific factors and machine learning predictions.
//         </p>
//         <p>
//           According to recent statistics, over 1.9 billion adults worldwide are overweight, and 650 million are obese.
//           Early detection and proactive measures can significantly reduce health risks.
//         </p>
//         <button className="check-yours-btn" onClick={() => navigate('/form')}>
//           Check Yours
//         </button>
//       </div>

//       {/* Contact Section */}
//       <footer className="contact-bar">
//         <p>Contact Us: Email - contact@obesityprediction.com | Phone - +1 234 567 890</p>
//       </footer>
//     </div>
//   );
// }

// function FormPage() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     Gender: '',
//     Age: '',
//     Height: '',
//     Weight: '',
//     familyHistory: '',
//     FAVC: '',
//     FCVC: '',
//     NCP: '',
//     CAEC: '',
//     SMOKE: '',
//     CH2O: '',
//     SCC: '',
//     FAF: '',
//     TUE: '',
//     CALC: '',
//     MTRANS: '',
//   });

//   const [currentPage, setCurrentPage] = useState(0);
//   const progressPercentage = (currentPage + 1) * (100 / 3);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '', // Clear error for the current field
//     }));
//   };

//   const validatePage = () => {
//     const pageFields = {
//       0: ['Gender', 'Age', 'Height', 'Weight', 'familyHistory'],
//       1: ['FAVC', 'FCVC', 'NCP', 'CAEC', 'SMOKE'],
//       2: ['CH2O', 'SCC', 'FAF', 'TUE', 'CALC', 'MTRANS'],
//     };
//     const currentFields = pageFields[currentPage];
//     const newErrors = {};
//     currentFields.forEach((field) => {
//       if (!formData[field]) {
//         newErrors[field] = 'This field is required';
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = (e) => {
//     e.preventDefault();
//     if (validatePage()) {
//       if (currentPage < 2) {
//         setCurrentPage(currentPage + 1);
//       }
//     }
//   };

//   const handlePrevious = (e) => {
//     e.preventDefault();
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validatePage()) {
//       try {
//         // Submit data to the backend
//         const response = await fetch('http://localhost:5000/predict', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         });

//         if (!response.ok) {
//           throw new Error(`Server returned an error: ${response.status}`);
//         }

//         const data = await response.json();
//         if (data.error) {
//           throw new Error(data.error);
//         }

//         // Navigate to result page with prediction
//         navigate(`/result?prediction=${data.prediction}`);
//       } catch (err) {
//         console.error(err);
//         alert('An error occurred while submitting the form. Please try again.');
//       }
//     }
//   };

//   const renderFormPage = () => {
//     switch (currentPage) {
//       case 0:
//         return (
//           <div>
//             <h2>Page 1 of 3: Basic Information (5 fields)</h2>
//             <label>
//               Gender:
//               <select name="Gender" value={formData.Gender} onChange={handleChange} required>
//                 <option value="">-- Select --</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.Gender && <p className="error-text">{errors.Gender}</p>}
//             </label>
//             <label>
//               Age:
//               <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
//               {errors.Age && <p className="error-text">{errors.Age}</p>}
//             </label>
//             <label>
//               Height (cm):
//               <input type="number" name="Height" value={formData.Height} onChange={handleChange} required />
//               {errors.Height && <p className="error-text">{errors.Height}</p>}
//             </label>
//             <label>
//               Weight (kg):
//               <input type="number" name="Weight" value={formData.Weight} onChange={handleChange} required />
//               {errors.Weight && <p className="error-text">{errors.Weight}</p>}
//             </label>
//             <label>
//               Family History of Overweight:
//               <select name="familyHistory" value={formData.familyHistory} onChange={handleChange} required>
//                 <option value="">-- Select --</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//               {errors.familyHistory && <p className="error-text">{errors.familyHistory}</p>}
//             </label>
//           </div>
//         );
//       case 1:
//         return (
//           <div>
//             <h2>Page 2 of 3: Lifestyle Information (5 fields)</h2>
//             <label>
//               Frequent High-Calorie Food Consumption (FAVC):
//               <select name="FAVC" value={formData.FAVC} onChange={handleChange} required>
//                 <option value="">-- Select --</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//               {errors.FAVC && <p className="error-text">{errors.FAVC}</p>}
//             </label>
//             <label>
//               Frequency of Consumption of Vegetables (FCVC) [1-3]:
//               <input type="number" name="FCVC" value={formData.FCVC} onChange={handleChange} required />
//               {errors.FCVC && <p className="error-text">{errors.FCVC}</p>}
//             </label>
//             <label>
//               Number of Main Meals (NCP) [1-4]:
//               <input type="number" name="NCP" value={formData.NCP} onChange={handleChange} required />
//               {errors.NCP && <p className="error-text">{errors.NCP}</p>}
//             </label>
//             <label>
//               Consumption of Food Between Meals (CAEC):
//               <select name="CAEC" value={formData.CAEC} onChange={handleChange} required>
//                 <option value="">-- Select --</option>
//                 <option value="no">No</option>
//                 <option value="Sometimes">Sometimes</option>
//                 <option value="Frequently">Frequently</option>
//                 <option value="Always">Always</option>
//               </select>
//               {errors.CAEC && <p className="error-text">{errors.CAEC}</p>}
//             </label>
//             <label>
//               Smoking Status (SMOKE):
//               <select name="SMOKE" value={formData.SMOKE} onChange={handleChange} required>
//                 <option value="">-- Select --</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//               {errors.SMOKE && <p className="error-text">{errors.SMOKE}</p>}
//             </label>
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             <h2>Page 3 of 3: Physical Activity and Habits (6 fields)</h2>
//             <label>
//               Daily Water Intake (CH2O) [Liters/Day]:
//               <input type="number" name="CH2O" value={formData.CH2O} onChange={handleChange} required />
//               {errors.CH2O && <p className="error-text">{errors.CH2O}</p>}
//             </label>
//             <label>
//               Calorie Consumption Monitoring (SCC):
//               <select name="SCC" value={formData.SCC} onChange={handleChange} required>
//                 <option value="">-- Select --</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//               {errors.SCC && <p className="error-text">{errors.SCC}</p>}
//             </label>
//             <label>
//               Physical Activity Frequency (FAF) [Hours/Week]:
//               <input type="number" name="FAF" value={formData.FAF} onChange={handleChange} required />
//               {errors.FAF && <p className="error-text">{errors.FAF}</p>}
//             </label>
//             <label>
//               Time Using Technology (TUE) [Hours/Day]:
//               <input type="number" name="TUE" value={formData.TUE} onChange={handleChange} required />
//               {errors.TUE && <p className="error-text">{errors.TUE}</p>}
//             </label>
//             <label>
//               Consumption of Alcohol (CALC):
//               <select name="CALC" value={formData.CALC} onChange={handleChange} required>
//                 <option value="">-- Select --</option>
//                 <option value="no">No</option>
//                 <option value="Sometimes">Sometimes</option>
//                 <option value="Frequently">Frequently</option>
//                 <option value="Always">Always</option>
//               </select>
//               {errors.CALC && <p className="error-text">{errors.CALC}</p>}
//             </label>
//             <label>
//               Mode of Transportation (MTRANS):
//               <select name="MTRANS" value={formData.MTRANS} onChange={handleChange} required>
//                 <option value="">-- Select --</option>
//                 <option value="Walking">Walking</option>
//                 <option value="Bike">Bike</option>
//                 <option value="Motorbike">Motorbike</option>
//                 <option value="Automobile">Automobile</option>
//                 <option value="Public Transport">Public Transport</option>
//               </select>
//               {errors.MTRANS && <p className="error-text">{errors.MTRANS}</p>}
//             </label>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="form-page">
//       <nav className="navbar">
//         <div className="nav-title">Obesity Level Prediction</div>
//         <div className="nav-links">
//           <a href="/">Home</a>
//           <a href="#">Profile</a>
//         </div>
//       </nav>
//       <div className="progress-bar">
//         <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
//       </div>
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           {renderFormPage()}
//           <div className="form-navigation">
//             {currentPage > 0 && (
//               <button type="button" className="nav-btn" onClick={handlePrevious}>
//                 Previous
//               </button>
//             )}
//             {currentPage < 2 ? (
//               <button type="button" className="nav-btn" onClick={handleNext}>
//                 Next
//               </button>
//             ) : (
//               <button type="submit" className="submit-btn">
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//       <footer className="contact-bar">
//         <p>Contact Us: Email - contact@obesityprediction.com | Phone - +1 234 567 890</p>
//       </footer>
//     </div>
//   );
// }

// function ResultPage() {
//   const queryParams = new URLSearchParams(window.location.search);
//   const prediction = queryParams.get('prediction') || 'Normal';

//   return (
//     <div className="result-page">
//       <div className="result-container">
//         {prediction === 'Normal' ? (
//           <div className="celebration">
//             <h1>🎉 Congratulations! 🎉</h1>
//             <p>You are in the Normal weight range.</p>
//           </div>
//         ) : (
//           <div className="precautions">
//             <h1>Your Obesity Level: {prediction}</h1>
//             <p>Please consult a healthcare professional for further advice.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/form" element={<FormPage />} />
//         <Route path="/result" element={<ResultPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
