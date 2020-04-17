import React from "react";
export default function Button(props) {
  return (
    <div type="button" className="calc-btn" onClick={props.action}>
      {props.symbol}
    </div>
  );
}
