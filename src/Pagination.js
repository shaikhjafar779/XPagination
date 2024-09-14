import React, { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 10;

function PaginationTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      })
      .catch(() => {
        alert('failed to fetch data');
      });
  }, []);

  const handlePrevious = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <h1>Employee Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length ? (
            currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationTable;