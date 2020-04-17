import React from "react";
export default function Display(props) {
  let inf = props.display;
  let style;
  console.log(inf);
  if (inf.length > 14) {
    style = { fontSize: "30px" };
  }

  return (
    <div id="calc-display" style={style}>
      {inf.length > 30 ? "ERROR too many digits" : inf}
    </div>
  );
}
