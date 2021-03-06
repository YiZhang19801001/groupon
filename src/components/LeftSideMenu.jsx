import React from "react";
import { Link } from "react-router-dom";

import { history } from "../history";

import "../css/LeftSideMenu.css";

const LeftSideMenu = () => {
  const getClass = path => {
    if (path === history.location.pathname) {
      return "component-left-side-menu__item active";
    } else {
      return "component-left-side-menu__item";
    }
  };
  return (
    <div className="component-left-side-menu">
      <div className="component-left-side-menu__icon">
        <img src="favicon.ico" alt="" />
      </div>
      <div className="component-left-side-menu__menu">
        <Link
          to={`${process.env.PUBLIC_URL}/orders`}
          className={getClass("/orders")}
        >
          <i className="material-icons">assignment</i>
          订单管理
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}/products`}
          className={getClass("/products")}
        >
          <i className="material-icons">fastfood</i>
          商品管理
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}/shops`}
          className={getClass("/shops")}
        >
          <i className="material-icons">store_mall_directory</i>
          店面管理
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}/charts`}
          className={getClass("/charts")}
        >
          <i className="material-icons">insert_chart_outlined</i>
          经营分析
        </Link>
      </div>
    </div>
  );
};

export default LeftSideMenu;
