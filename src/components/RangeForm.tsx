import { Info } from "luxon";
import React from "react";
import { useForm } from "react-hook-form";

type DateRange = { start: string; end: string; accelerationDay: string };

interface RangeFormProp {
  defaultValues: DateRange;
  onSubmit: (data: DateRange) => void;
}

export const RangeForm = ({ onSubmit, defaultValues }: RangeFormProp) => {
  const { register, handleSubmit } = useForm<DateRange>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="RangeForm">
      <div className="RangeForm__fields">
        <label htmlFor="start">Start Date: </label>
        <input type="text" id="start" name="start" ref={register} />
      </div>
      <div className="RangeForm__fields">
        <label htmlFor="end">End Date: </label>
        <input type="text" id="end" name="end" ref={register} />
      </div>
      <div className="RangeForm__fields">
        <label htmlFor="accelerationDay">Acc. day: </label>
        <select id="accelerationDay" name="accelerationDay" ref={register}>
          {WEEK_DAYS.map((wd) => (
            <option value={wd} key={wd}>
              {wd}
            </option>
          ))}
        </select>
      </div>
      <div className="RangeForm__fields">
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

const WEEK_DAYS = Info.weekdays();
