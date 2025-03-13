import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
      {time.getHours().toString().padStart(2, "0")}:
      {time.getMinutes().toString().padStart(2, "0")}:
      {time.getSeconds().toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
