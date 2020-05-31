import React, { useRef, useEffect } from "react";

export default function List(props) {
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, props.list.length);
  }, [props.list]);

  useEffect(() => {
    if (itemsRef.current.length && props.index >= 0) {
      itemsRef.current[props.index].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
  }, [props.index]);

  return (
    <div className="list" onMouseMove={() => props.updatePointerClass()}>
      {props.list.map((item, i) => (
        <div
          key={item.id}
          className={`item ${i === props.index ? "active" : ""} ${
            props.isMouseEvent === false ? "pointer-events-none" : ""
          }`}
          ref={(el) => (itemsRef.current[i] = el)}
          onMouseOver={(e) => props.updateIndex(i, e)}
        >
          <div className="item__id">{item.id}</div>
          <div className="item__name">{item.name}</div>
          <div className="item__address">{item.address}</div>
          <div className="item__pincode">{item.pincode}</div>
          <div className="item__container">
            {item.items.map((item) => (
              <div key={item} className="item__container__child">{`${item}`}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
