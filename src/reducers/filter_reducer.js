import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload.target.value };
  }

  if (action.type === SORT_PRODUCTS) {
    const { filteredProducts, sort } = state;
    let tempProducts = [];

    switch (sort) {
      case "nameAtoZ": {
        tempProducts = filteredProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      }

      case "nameZtoA": {
        tempProducts = filteredProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
      }

      case "priceLowest": {
        tempProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      }

      case "priceHighest": {
        tempProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      }

      default: {
        tempProducts = [...filteredProducts];
      }
    }

    return { ...state, filteredProducts: tempProducts };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
