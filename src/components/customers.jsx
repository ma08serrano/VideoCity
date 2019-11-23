import React, { Component } from "react";
import CustomersTable from "./customersTable";

class Customers extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <CustomersTable />
        </div>
      </div>
    );
  }
}

export default Customers;
