import React, { useState, useEffect, useRef, useCallback } from "react";
import List from "./List.js";
import { list } from "../mock.js";
import { filterByKey } from "./utils.js";

export default function Searchbar() {
  const [value, setValue] = useState("");
  const [index, setIndex] = useState(-1);
  const [isMouseEvent, setMouseEvent] = useState(true);
  const inputRef = useRef(null);
  const [filteredList, setFilteredList] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const updatePointerClass = () => {
    setMouseEvent(true);
  };

  const focusOnList = (e) => {
    if (!value) return;
    setMouseEvent(false);
    if (index === filteredList.length - 1 && e.key === "ArrowDown") {
      setIndex(-1);
      return;
    }
    if (index === -1 && e.key === "ArrowUp") {
      setIndex(filteredList.length - 1);
      return;
    }
    if (e.key === "ArrowDown" && index < filteredList.length) {
      setIndex((index) => index + 1);
    } else if (index > -1 && e.key === "ArrowUp") {
      setIndex((index) => index - 1);
    }
  };

  const updateIndex = (index, event) => {
    setMouseEvent(true);
    setIndex(index);
  };

  const filterList = useCallback(() => {
    let array = list.filter((item) => {
      return (
        filterByKey(item.items, value) ||
        filterByKey(item.name, value) ||
        filterByKey(item.id, value) ||
        filterByKey(item.address, value) ||
        filterByKey(item.pincode, value)
      );
    });
    setFilteredList(array);
  }, [value]);

  const handleBlur = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    filterList();
  }, [value, filterList]);

  return (
    <div className="searchbar">
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={focusOnList}
        ref={inputRef}
        onBlur={handleBlur}
        placeholder="Search by ID, name, address..."
        className="input"
      />
      {value && (
        <List
          list={filteredList}
          index={index}
          updateIndex={updateIndex}
          isMouseEvent={isMouseEvent}
          updatePointerClass={updatePointerClass}
        />
      )}
    </div>
  );
}
