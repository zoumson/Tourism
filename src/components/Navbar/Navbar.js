import React, { useState } from 'react';
import './Navbar.css';
import Select from 'react-select';

export default function Navbar(props) {
  /* Attributes */
  const { setSortingOption } = props;
  /* States */
  const [selectOption, setSelectOption] = useState(null);
  const [normalBtnActive, setNormalBtnActive] = useState(true);
  const [selectBtnActive, setSelectBtnActive] = useState(false);
  /* Function handlers for select  */
  const disableSelectBtn = () => {
    setSelectBtnActive(false);
    setSelectOption(null);
    setNormalBtnActive(true);
    setSortingOption(0);
  };

  const enableSelectBtn = (selectedOption) => {
    setSelectBtnActive(true);
    setSelectOption(selectedOption);
    setNormalBtnActive(false);
    setSortingOption(selectedOption.value);
  };

  /* Component data */
  const data = {
    backgroundColorGlobal: '#efefef',
    selectBtnPlaceholderLabel: '價格',
    normalBtnLabel: '精選評分',
    selectBtnOptions: [
      {
        value: 1,
        label: '價格：低至高',
      },
      {
        value: 2,
        label: '價格：高至低',
      },
    ],
  };
  /* Custom Styling */
  const style = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '60%',
      height: '50px',
      background: 'white',
      margin: '2%',
      marginTop: '50px',
    },
    btnItemContainer: {
      height: '100%',
      width: '150px',
      border: 'none',
    },
    select: {
      /* Remove space between the input and the menu list */
      menu: (styles, state) => ({
        ...styles,
        marginTop: 0,
        border: 'none',
      }),
      /* Remove all padding from the list of options in menu list */
      menuList: (styles, state) => ({
        ...styles,
        paddingTop: 0,
        paddingBottom: 0,
      }),
      /* Handle placeholder styling, not including its value */
      control: (styles, state) => ({
        ...styles,
        backgroundColor: selectBtnActive ? 'gray' : 'white', //Set placeholder background
        height: '100%',
        width: '100%',
        border: 0,
        boxShadow: 'none',
        borderRadius: '0px',
        '&:hover': {
          backgroundColor: selectBtnActive
            ? 'gray'
            : data.backgroundColorGlobal,
        },
      }),
      /* Display for no value selected styling */
      placeholder: (defaultStyles) => {
        return {
          ...defaultStyles,
          color: 'gray',
          fontSize: '17px',
          fontWeight: 'thick',
        };
      },
      /* Display for value selected  value  styling */
      singleValue: (defaultStyles) => {
        return {
          ...defaultStyles,
          color: selectBtnActive ? 'white' : 'gray',
          fontSize: '17px',
          fontWeight: 'thick',
        };
      },
      /* Space for value selected  value or placeholder styling */
      input: (defaultStyles) => {
        return {
          ...defaultStyles,
          opacity: '0',
          zIndex: '1',
        };
      },
      /* Dropdown indicator icon styling */
      dropdownIndicator: (defaultStyles) => {
        return {
          ...defaultStyles,
          color: selectBtnActive ? 'white' : 'gray',
          '&:hover': {
            color: selectBtnActive ? 'white' : 'gray',
          },
        };
      },
      /* Option item styling */
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          color: 'black',
          backgroundColor: 'white',
          fontSize: '17px',
          fontWeight: 'thick',
          '&:hover': {
            backgroundColor: '#efefef',
          },
        };
      },
    },
  };

  return (
    <div>
      <div className="navbar-container" style={style.container}>
        <div className="navbar-item-container" style={style.btnItemContainer}>
          <button
            className={
              normalBtnActive ? 'normal-btn-active' : 'normal-btn-inactive'
            }
            onClick={disableSelectBtn}
          >
            {data.normalBtnLabel}
          </button>
        </div>

        <div className="navbar-item-container" style={style.btnItemContainer}>
          <Select
            value={selectOption}
            styles={style.select}
            className={
              selectBtnActive ? 'select-btn-active' : 'select-btn-inactive'
            }
            placeholder={data.selectBtnPlaceholderLabel}
            options={data.selectBtnOptions}
            onChange={enableSelectBtn}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div>
      </div>
    </div>
  );
}
