import React from "react";
import { isSunday } from "./styles";
import BaseCalendar from "../../shared/calendar/BaseCalendar";

export default function Calendar({ value, onChange }) {
    const handleDayClick = (day) => {
        if (!isSunday(day)) {
            onChange(day);
        }
    };

    const getStyles = (day, value) => {
        if (isSunday(day)) return 'prevnext-day';
        if (value.isSame(day, "day")) return 'selected';
        if (day.isSame(new Date(), "day")) return 'today';
        return '';
    };

    return (
        <BaseCalendar
            value={value}
            onChange={onChange}
            dayStyles={getStyles}
            dayClickHandler={handleDayClick}
        />
    );
}

//export default calendar;