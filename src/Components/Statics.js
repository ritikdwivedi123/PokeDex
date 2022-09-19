import React from "react";
import "./style.css";

export default function statics({ data, modal }) {
  console.log(data);
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <div className="modalBackground">
            <div className="modalContainer">
              <div className="closeBtn">
                <button
                  onClick={() => {
                    modal(false);
                  }}
                >
                  X
                </button>
              </div>
              <div className="name">
                <h1>Name: {data.name}</h1>
              </div>
              <div className="img">
                <img
                  src={data.sprites.front_default}
                  style={{ width: "200px" }}
                  alt=""
                />
              </div>
              <div className="statInfo">
                {data.stats.map((poke) => {
                  return (
                    <>
                      <table>
                        <tr>
                          <th>{poke.stat.name}</th>
                          <th>: {poke.base_stat}</th>
                        </tr>
                        <tr></tr>
                      </table>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
