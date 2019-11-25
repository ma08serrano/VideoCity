import React, { Component } from "react";
import { toast } from "react-toastify";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import { getCustomers, deleteCustomer } from "../services/fakeCustomerService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "fname", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getCustomers();
    console.log(data);
    this.setState({ data });
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
      customer: allCustomers
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { length: count } = this.state.customers;
    const { pageSize, currentPage, customers: allCustomers } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no customers in the database.</p>;

    const customers = paginate(allCustomers, currentPage, pageSize);

    return (
      <div className="row">
        <CustomersTable
          customers={customers}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
        <p className="countNum float-right">
          Showing {count} customers in the database.
        </p>
      </div>
    );
  }
}

export default Customers;
