export const validateEmail = (email) => {
  var regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export const validateName = (name) => {
  // Regular expression to check if the name starts with a letter and can contain spaces
  const regex = /^[A-Za-z][A-Za-z\s]*$/;
  return regex.test(name);
};

export const validateFullName = (name) => {
  const regex = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/;
  return regex.test(String(name).toLowerCase());
};

export const getStorageItem = async (key) => {
  console.log('getStorage', key);
  try {
    let item = await localStorage.getItem(key);
    return item ? JSON.parse(item) : item;
  } catch (e) {
    console.log('Error in getting key -->', e);
    return null;
  }
};

export const setStorageItem = async (key, value) => {
  try {
    let item = await localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.log('Error in setting key -->', e);
    return null;
  }
};

export const routes = [
  {
    //Dashboard in now Partners
    id: 1,
    name: 'Dashboard',
    route: 'dashboard',
  },
  //Coupons is
  {
    id: 3,
    name: 'Coupons',
    route: 'coupons',
  },
  {
    id: 2,
    name: 'Customers',
    route: 'customers',
  },
  {
    id: 4,
    name: 'Articles',
    route: 'createarticle',
  },
  {
    id: 5,
    name: 'Partners',
    route: 'createpartner',
  },
];

export const productNameArr = [
  {
    label: 'Fluent Fast (Monthly)',
    id: 0,
    price: 29,
  },
  {
    label: 'Fluent Mastery (Monthly)',
    id: 1,
    price: 69,
  },
  {
    label: 'Fluent Fast (Yearly)',
    id: 2,
    price: 309,
  },
  {
    label: 'Fluent Mastery (Yearly)',
    id: 3,
    price: 745,
  },
];

export const typeOfCoupon = [
  {
    label: 'Coupon',
    id: 1,
  },
  {
    label: 'Voucher',
    id: 2,
  },
];
