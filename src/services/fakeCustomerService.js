const customers = [
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    fname: "Michael Aldrich",
    lname: "Serrano",
    address: "36 Grovenest Drive"
  }
];

export function getCustomers() {
  return customers;
}

export function getCustomer(id) {
  return customers.find(c => c._id === id);
}

export function saveCustomer(customer) {
  let customerInDb = customers.find(c => c._id === customer._id) || {};
  customerInDb.name = customer.name;
  customerInDb.fname = customer.fname;
  customerInDb.lname = customer.lname;
  customerInDb.address = customer.address;

  if (!customerInDb._id) {
    customerInDb._id = Date.now();
    customers.push(customerInDb);
  }

  return customerInDb;
}

export function deleteCustomer(id) {
  let customerInDb = customers.find(c => c._id === id);
  customers.splice(customers.indexOf(customerInDb), 1);

  return customerInDb;
}
