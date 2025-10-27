import React, { useState } from "react";

const Cgpa_Calculator = () => {
  const [subjects, setSubjects] = useState([{ name: "", grade: "" }]);
  const [cgpa, setCgpa] = useState(null);

  const gradePoint = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    D: 1.0,
    F: 0.0,
  };

  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = field === "grade" ? value.toUpperCase() : value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", grade: "" }]);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const calculateCGPA = () => {
    const totalPoints = subjects.reduce((acc, subj) => acc + (gradePoint[subj.grade] ?? 0), 0);
    const calculated = totalPoints / subjects.length;
    setCgpa(calculated.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex flex-col items-center p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-700 text-center">
        CGPA Calculator
      </h1>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {subjects.map((subj, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              type="text"
              placeholder="Subject Name"
              value={subj.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="flex-1 border border-gray-400 p-2 rounded text-center w-full sm:w-auto"
            />
            <input
              type="text"
              placeholder="Grade (A, B+...)"
              value={subj.grade}
              onChange={(e) => handleChange(index, "grade", e.target.value)}
              className="w-full sm:w-24 border border-gray-400 p-2 rounded text-center"
            />
            {subjects.length > 1 && (
              <button
                onClick={() => removeSubject(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto mt-2 sm:mt-0"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full max-w-md">
        <button
          onClick={addSubject}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
        >
          + Add Subject
        </button>
        <button
          onClick={calculateCGPA}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Calculate CGPA
        </button>
      </div>

      {cgpa !== null && (
        <p className="mt-6 text-xl sm:text-2xl font-semibold text-purple-700 text-center">
          Your CGPA: {cgpa}
        </p>
      )}
    </div>
  );
};

export default Cgpa_Calculator;
