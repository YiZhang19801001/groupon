import { combineReducers } from "redux";
import { actionTypes } from "../actions";
import { reducer as formReducer } from "redux-form";
import newProductReducer from "./newProductReducer";
import selectedShopReducer from "./selectedShopReducer";

const productsReducer = (products = [], action) => {
  if (action.type === actionTypes.getProducts) {
    return action.payload;
  }
  return products;
};

const productReducer = (product = {}, action) => {
  if (action.type === actionTypes.getProduct) {
    return action.payload;
  }
  if (action.type === actionTypes.setProductImage) {
    return { ...product, image: action.payload };
  }
  return product;
};

const appSettingReducer = (appSetting = {}, action) => {
  if (action.type === actionTypes.initApp) {
    return action.payload;
  }
  return appSetting;
};

const shopsReducer = (shops = [], action) => {
  if (action.type === actionTypes.getShops) {
    return action.payload;
  }

  return shops;
};

const ordersReducer = (orders = [], action) => {
  if (action.type === actionTypes.getOrders) {
    if (action.payload.data) {
      return action.payload.data;
    }

    return action.payload;
  } else if (action.type === actionTypes.updateOrder) {
    return action.payload.orders.data;
  }
  return orders;
};

const selectedOrderReducer = (selectedOrder = { order_items: [] }, action) => {
  if (action.type === actionTypes.selectOrder) {
    return action.payload;
  } else if (action.type === actionTypes.updateOrder) {
    return action.payload.order;
  }
  return selectedOrder;
};
const optionsReducer = (options = [], action) => {
  if (action.type === actionTypes.fetchOptions) {
    return action.payload;
  }

  return options;
};
const avaliableCategoriesReducer = (avaliableCategories = [], action) => {
  if (action.type === actionTypes.fetchAvaliableCategories) {
    return action.payload;
  }
  return avaliableCategories;
};

const reportSummaryReducer = (reportSummary = {}, action) => {
  if (action.type === actionTypes.fetchSummary) {
    return action.payload;
  } else if (
    action.type === actionTypes.setEndDate ||
    action.type === actionTypes.setStartDate
  ) {
    return action.payload.reports;
  }
  return reportSummary;
};
const selectedCategoryReducer = (selectedCategory = {}, action) => {
  if (action.type === actionTypes.selectCategory) {
    return action.payload;
  } else if (action.type === actionTypes.setSelectedCategoryImage) {
    return { ...selectedCategory, image: action.payload };
  }
  return selectedCategory;
};

const selectedOptionReducer = (selectedOption = { values: [] }, action) => {
  if (action.type === actionTypes.selectOption) {
    return action.payload;
  }
  return selectedOption;
};

const paginationParamsReducer = (paginationParams = {}, action) => {
  if (action.type === actionTypes.getOrders) {
    return action.payload;
  } else if (action.type === actionTypes.updateOrder) {
    return action.payload.orders;
  }
  return paginationParams;
};
const startDateReducer = (startDate = new Date(), action) => {
  if (action.type === actionTypes.setStartDate) {
    return action.payload.date;
  }
  return startDate;
};
const endDateReducer = (endDate = new Date(), action) => {
  if (action.type === actionTypes.setEndDate) {
    return action.payload.date;
  }
  return endDate;
};
const reportDetailsReducer = (reportDetails = [], action) => {
  if (action.type === actionTypes.fetchReportDetails) {
    return action.payload;
  } else if (
    action.type === actionTypes.setEndDate ||
    action.type === actionTypes.setStartDate
  ) {
    return action.payload.report;
  }
  return reportDetails;
};
const reportCategoryReducer = (report_category = "", action) => {
  if (action.type === actionTypes.setReportCategory) {
    return action.payload;
  }
  return report_category;
};
const ordersByStoreReducer = (ordersByStore = [], action) => {
  if (action.type === actionTypes.fetchOrdersByStore) {
    return action.payload;
  }

  return ordersByStore;
};

const toggleModalReducer = (modalStatus = false, action) => {
  if (action.type === actionTypes.hideModal) {
    return false;
  } else if (action.type === actionTypes.showModal) {
    return true;
  }

  return modalStatus;
};
const userListReducer = (userList = [], action) => {
  if (action.type === actionTypes.fetchUsers) {
    return action.payload;
  }
  return userList;
};

export default combineReducers({
  userList: userListReducer,
  products: productsReducer,
  form: formReducer,
  product: productReducer,
  appSetting: appSettingReducer,
  shops: shopsReducer,
  orders: ordersReducer,
  selectedOrder: selectedOrderReducer,
  options: optionsReducer,
  avaliableCategories: avaliableCategoriesReducer,
  newProduct: newProductReducer,
  selectedShop: selectedShopReducer,
  reportSummary: reportSummaryReducer,
  selectedCategory: selectedCategoryReducer,
  selectedOption: selectedOptionReducer,
  paginationParams: paginationParamsReducer,
  startDate: startDateReducer,
  endDate: endDateReducer,
  reportDetails: reportDetailsReducer,
  report_category: reportCategoryReducer,
  ordersByStore: ordersByStoreReducer,
  modalStatus: toggleModalReducer
});
