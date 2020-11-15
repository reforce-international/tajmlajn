import React, { useState } from "react";
import "./App.css";
import { DateTime } from "luxon";
import { RangeForm } from "./components/RangeForm";

const DAY_WIDTH = 24;

const createState = (start: string, end: string) => {
  const startDate = DateTime.fromISO(start);
  if (!startDate.isValid) return;

  const endDate = DateTime.fromISO(end);
  if (!endDate.isValid) return;

  const duration = endDate.diff(startDate, "days");

  return {
    startDate,
    endDate,
    days: Array.from({ length: duration.days }, (_, i) =>
      startDate.plus({ days: i })
    ),
  };
};

const defaultStart = "2020-01-01";
const defaultEnd = "2020-02-15";

function App() {
  const [baseState, setBaseState] = useState(
    createState(defaultStart, defaultEnd)
  );
  console.log(baseState);

  return (
    <div className="App">
      <header className="App-header">
        <RangeForm
          defaultValues={{ start: defaultStart, end: defaultEnd }}
          onSubmit={({ start, end }) => {
            console.log("submit", { start, end });

            return setBaseState(() => createState(start, end));
          }}
        ></RangeForm>
      </header>
      <div className="timeline">
        {baseState?.days.map((d) => (
          <div
            className="day"
            style={{ width: DAY_WIDTH }}
            key={d.toMillis()}
            title={d.toFormat("yyyy-MM-DD, EEEEE")}
          >
            {d.weekdayShort.slice(0, 1)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
