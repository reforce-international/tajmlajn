import React, { useState } from "react";
import "./App.css";
import { DateTime } from "luxon";
import { RangeForm } from "./components/RangeForm";

const DAY_WIDTH = 16;

const createState = (start: string, end: string, accelerationDay: string) => {
  const startDate = DateTime.fromISO(start);
  if (!startDate.isValid) {
    console.error("invalid startDate " + start, startDate);
    return;
  }

  const endDate = DateTime.fromISO(end);
  if (!endDate.isValid) {
    console.error("invalid endDate " + start, endDate);
    return;
  }

  const duration = endDate.diff(startDate, "days");

  const days = Array.from({ length: duration.days }, (_, i) =>
    startDate.plus({ days: i })
  );

  const firstAccelerationDayOffset = days.findIndex(
    (d) => d.weekdayLong === accelerationDay
  );

  if (firstAccelerationDayOffset == null)
    throw new Error(`Could not find a "${accelerationDay}" in 'days' array`);

  const periods = Array.from(
    { length: Math.floor(duration.days / 7) },
    (_, i) => ({
      index: i,
      length: 7,
    })
  );

  return {
    startDate,
    endDate,
    days,
    periods,
    firstAccelerationDayOffset,
  };
};

const DEFAULT_START = "2020-01-01";
const DEFAULT_END = "2020-02-15";
const DEFAULT_ACCELERATION_DAY = "Monday";

interface ProlongedPeriods {
  [date: number]: number;
}

function App() {
  const [baseState, setBaseState] = useState(
    createState(DEFAULT_START, DEFAULT_END, DEFAULT_ACCELERATION_DAY)
  );
  const [prolongedPeriods, setProlongedPeriods] = useState<ProlongedPeriods>(
    {}
  );
  console.log(baseState);

  return (
    <div className="App">
      <header className="App-header">
        <RangeForm
          defaultValues={{
            start: DEFAULT_START,
            end: DEFAULT_END,
            accelerationDay: DEFAULT_ACCELERATION_DAY,
          }}
          onSubmit={({ start, end, accelerationDay }) => {
            setBaseState(() => createState(start, end, accelerationDay));
            setProlongedPeriods({});
          }}
        ></RangeForm>
      </header>
      <div className="timeline">
        {baseState?.days.map((d) => (
          <div
            className={"timeline__unit day day--" + d.weekdayLong.toLowerCase()}
            style={{ width: DAY_WIDTH }}
            key={d.toMillis()}
            title={d.toFormat("yyyy-MM-DD")}
          >
            {d.weekdayShort.slice(0, 1)}
          </div>
        ))}
      </div>
      <div
        className="timeline"
        style={{
          paddingLeft: (baseState?.firstAccelerationDayOffset ?? 0) * DAY_WIDTH,
        }}
      >
        {baseState?.periods.map((d) => (
          <div
            className="timeline__unit period"
            style={{
              width: DAY_WIDTH * (prolongedPeriods[d.index] ?? d.length),
            }}
            key={d.index}
          >
            {(prolongedPeriods[d.index] ?? d.length) > 1 && (
              <button
                onClick={() =>
                  setProlongedPeriods((current) => ({
                    ...current,
                    [d.index]: (current[d.index] ?? d.length) - 1,
                  }))
                }
              >
                -
              </button>
            )}
            {d.index}
            <button
              onClick={() =>
                setProlongedPeriods((current) => ({
                  ...current,
                  [d.index]: (current[d.index] ?? d.length) + 1,
                }))
              }
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
