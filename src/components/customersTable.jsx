import React from "react";

const CustomersTable = props => {
  const { customers, onDelete, onSort } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr key={customer._id}>
            <td onClick={() => onSort("fname")}>{customer.fname}</td>
            <td onClick={() => onSort("lname")}>{customer.lname}</td>
            <td onClick={() => onSort("address")}>{customer.address}</td>
            <td>
              <button
                onClick={() => onDelete(customer)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomersTable;
