import React from "react";

import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import "../css/EditForm.css";
import { fetchOptions, removeOptionsFromNewProduct } from "../actions";
import ProductFormCategorySelector from "./ProductFormCategorySelector";
import AddOptionToNewProductForm from "./AddOptionToNewProductForm";
class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productOptions: [],
      isShowAddOptionForm: false,
      isShowAddCategoryForm: false,
      image: "",
      fileName: ""
    };
  }

  onChange = e => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;

    this.props.setSelectProductImage(URL.createObjectURL(files[0]));
    this.setState({
      fileName: files[0].name
    });
    this.createImage(files[0]);
  };
  createImage = file => {
    let reader = new FileReader();
    reader.onload = e => {
      this.setState({
        image: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  renderImage = () => {
    if (this.props.image === "") {
      return null;
    }
    return (
      <div className="component-category-form__upload-image__img-container">
        <img
          src={this.props.image}
          className="component-category-form__upload-image__img"
          alt=""
        />
      </div>
    );
  };

  // How To:: Upload image / files in React.js
  getFileName = () => {
    if (this.state.image === "") {
      return <span>请选择图片</span>;
    }
    return <span>{this.state.fileName}</span>;
  };
  componentDidMount() {
    this.props.fetchOptions();
  }
  /**
   * render input JSX from redux form field
   * @param {Object} {input,placeholder,meta}
   * @returns {JSX}
   */
  renderInput = ({ input, placeholder, meta }) => {
    return (
      <div className="form-field">
        <input
          type="text"
          {...input}
          className="form-input"
          placeholder={placeholder}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * render form validation errors
   *
   */
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="form-error-message">{error}</div>;
    }
  };

  removeProductOptions = e => {
    const option_id = e.target.dataset.optionId;
    this.props.removeOptionsFromNewProduct(option_id);
  };

  renderOptionsJSX = () => {
    if (this.props.newProduct.options) {
      return this.props.newProduct.options.map(option => {
        return (
          <div
            key={`newProductOption${option.option_id}`}
            className="component-edit-form__options"
          >
            <div>
              <span className="component-edit-form__options__name">
                {option.option_name}:{" "}
              </span>
              {this.renderOptionValues(option)}
            </div>
            <div
              onClick={this.removeProductOptions}
              data-option-id={option.option_id}
              className="component-edit-form__options_remove-button"
            >
              <i data-option-id={option.option_id} className="material-icons">
                remove_circle_outline
              </i>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  renderOptionValues = option => {
    return option.values.map(value => {
      return (
        <span
          className="component-edit-form__options__value-name"
          key={`newProductOptionValue${value.option_value_id}`}
        >
          {value.option_value_name}
        </span>
      );
    });
  };
  onSubmit = () => {
    this.props.onSubmit(this.state.image);
  };
  toggleAddOptionToNewProductForm = () => {
    this.setState({ isShowAddOptionForm: !this.state.isShowAddOptionForm });
  };
  render() {
    return (
      <div className="component-edit-form">
        <div className="component-edit-form__header">
          <ProductFormCategorySelector />
        </div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="edit-form"
        >
          <div className="component-edit-form__subtitle">
            商品名称请分别填写中英文
          </div>
          <Field
            name="chinese_name"
            component={this.renderInput}
            placeholder="中文名"
          />
          <Field
            name="english_name"
            component={this.renderInput}
            placeholder="英文名"
          />
          <div className="component-edit-form__subtitle">
            商品单价保留小数点后2位.
            <span style={{ color: "red" }}>
              当配置规格后该商品价格只起展示作用
            </span>
          </div>
          <div className="component-edit-form__button-group">
            <label className="component-edit-form__button-group__wrapper">
              <Field
                name="price"
                component={this.renderInput}
                placeholder="单价,例如 12.80"
                className="component-edit-form__button-group__input"
              />
              <span className="component-edit-form__button-group__label">
                澳元
              </span>
            </label>
          </div>
          <div className="component-edit-form__subtitle">
            商品排序.
            <span style={{ color: "red" }}>必须为整数</span>
          </div>
          <div className="component-edit-form__button-group">
            <label className="component-edit-form__button-group__wrapper">
              <Field
                disable
                name="sort_order"
                component={this.renderInput}
                className="component-edit-form__button-group__input"
                placeholder="商品显示优先级,如1,2..."
              />
              <span className="component-edit-form__button-group__extra-label">
                <i className="material-icons">add</i>
              </span>
              <span className="component-edit-form__button-group__label">
                <i className="material-icons">remove</i>
              </span>
            </label>
          </div>
          <div className="component-edit-form__subtitle">
            商品库存.
            <span style={{ color: "red" }}>必须为整数</span>
          </div>
          <div className="component-edit-form__button-group">
            <label className="component-edit-form__button-group__wrapper">
              <Field
                name="quantity"
                component={this.renderInput}
                className="component-edit-form__button-group__input"
                placeholder="商品库存数量"
              />
            </label>
          </div>
          <div className="component-edit-form__subtitle">
            团购最大值.
            <span style={{ color: "red" }}>必须为整数</span>
          </div>
          <div className="component-edit-form__button-group">
            <Field
              name="stock_status_id"
              component={this.renderInput}
              placeholder="设置MaxNumber"
            />
          </div>
          <div className="component-edit-form__upload-image_container">
            <label className="component-edit-form__upload-image_label">
              <input
                type="file"
                onChange={this.onChange}
                className="component-edit-form__upload-image_input"
              />
              <i className="material-icons">attachment</i>
              {this.getFileName()}
            </label>
            {this.renderImage()}
          </div>
          <hr />
          <div className="component-edit-form__subtitle">
            <span>添加产品规格.</span>
            <span style={{ color: "red" }}>可不填.</span>
            <div
              onClick={this.toggleAddOptionToNewProductForm}
              className="component-eidt-form__subtitle__button"
            >
              <span>添加新规格</span>
            </div>
          </div>
          <div className="component-edit-form__button-group">
            {this.renderOptionsJSX()}
          </div>
          {this.state.isShowAddOptionForm ? (
            <AddOptionToNewProductForm
              toggleAddOptionToNewProductForm={
                this.toggleAddOptionToNewProductForm
              }
            />
          ) : null}
          <div className="component-edit-form__button-wrapper">
            <button className="component-edit-form__submit-button">
              确认保存
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.chinese_name) {
    errors.chinese_name = "您需要提供一个有效的中文名";
  }
  if (!formValues.english_name) {
    errors.english_name = "你需要提供一个有效的英文名";
  }
  if (!formValues.price) {
    errors.price = "你需要提供一个有效的价格";
  }
  if (isNaN(formValues.price)) {
    errors.price = "价格必须为数字";
  }
  if (!formValues.quantity) {
    errors.quantity = "请提供一个库存数量值";
  } else if (
    Number(formValues.quantity) === NaN ||
    Number(formValues.quantity) < 0 ||
    !Number.isInteger(Number(formValues.quantity))
  ) {
    errors.quantity = "库存数量必须为正整数";
  }
  if (!formValues.stock_status_id) {
    errors.stock_status_id = "请提供一个库存数量值";
  } else if (
    Number(formValues.stock_status_id) === NaN ||
    Number(formValues.stock_status_id) < 0 ||
    !Number.isInteger(Number(formValues.stock_status_id))
  ) {
    errors.stock_status_id = "库存数量必须为正整数";
  }
  return errors;
};

const mapStateToProps = ({ options, newProduct }) => {
  return {
    options,
    newProduct
  };
};

const formWrapper = reduxForm({
  form: "productForm",
  validate,
  enableReinitialize: true
})(EditForm);

export default connect(
  mapStateToProps,
  { fetchOptions, removeOptionsFromNewProduct }
)(formWrapper);
