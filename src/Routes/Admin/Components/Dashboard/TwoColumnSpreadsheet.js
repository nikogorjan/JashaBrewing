import React, { useEffect, useState } from "react";

const TwoColumnSpreadsheet = ({ initialData, onDataChange }) => {
  // Add an empty row at the beginning
  const initialRows = initialData.includes(";")
    ? [["", "","",""], ...initialData.split("|").map((row) => row.split(";"))]
    : [["", "","",""]];

  const [data, setData] = useState(initialRows);

  const handleChange = (event, rowIndex, colIndex) => {
    const newValue = event.target.value;
  
    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = newValue;
      return newData;
    });
  };
  
  useEffect(() => {
    // Combine rows with semicolons and update the parent component
    const updatedData = data.slice(1).map((row) => row.join(";")).join("|");
    onDataChange(updatedData);
  }, [data]);

  const handleAddRow = () => {
    setData((prevData) => [...prevData, ["", "","",""]]);
  };

  return (
    <div>
      <table className="spreadsheet">
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  {rowIndex === 0 && colIndex === 0 ? (
                    <p className="checkbox-para">Ponudba</p>
                  ) : rowIndex === 0 && colIndex === 1 ? (
                    <p className="checkbox-para">Cena</p>
                  ) : rowIndex === 0 && colIndex === 2 ? (
                    <p className="checkbox-para">Enote v paketu</p>
                  ): rowIndex === 0 && colIndex === 3 ? (
                    <p className="checkbox-para">Zaloga</p>
                  ):(
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleChange(e, rowIndex, colIndex)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button-click" onClick={handleAddRow}>
        Add Row
      </button>
    </div>
  );
};

export default TwoColumnSpreadsheet;