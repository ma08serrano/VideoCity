import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import { getCustomers, deleteCustomer } from "../services/fakeCustomerService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "fname", order: "asc" }
  };

  async componentDidMount() {
    this.setState({ customers: getCustomers() });
  }

  handleDelete = async customer => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter(c => c._id !== customer._id);
    this.setState({ customers });

    try {
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This customer has already been deleted.");

      this.setState({ customer: originalCustomers });
    }
    await deleteCustomer(customer._id);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      customers: allCustomers
    } = this.state;

    let filtered = allCustomers;
    filtered = allCustomers.filter(c =>
      c.fname.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { length: count } = this.state.customers;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <React.Fragment>
      {!user && (
        <Link to="/customers/new" className="btn btn-success mb-2 float-right">
          New Customer
      </Link>
      )}
      <p>There are no customers in the database.</p>
    </React.Fragment>

    const { totalCount, data: customers } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          {!user && (
            <Link to="/customers/new" className="btn btn-success mb-2 float-right">
              New Customer
            </Link>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CustomersTable
            customers={customers}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
          <p className="countNum float-right">
            Showing {count} customers in the database.
        </p>
        </div>
      </div>
    );
  }
}

export default Customers;
