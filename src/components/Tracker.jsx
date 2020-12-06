import React from "react";

const Tracker = () => {

  return (
    <div className="tracker">
      <input
        placeholder='Enter tracker name'
        type="text"
      />
      <button>Create</button>
      <div>
        Timer
      </div>
    </div>
  )
};


export default Tracker;