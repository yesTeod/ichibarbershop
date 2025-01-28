import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listRemovedDate } from "../../../Redux/Actions/RemovedDateActions";
import dayStyles, { beforeToday, busyDay, isSunday, threeMonths } from "./styles";
import BaseCalendar from "../../shared/calendar/BaseCalendar";

export default function Calendar({ value, onChange }) {
    const dispatch = useDispatch();
    const removedDateList = useSelector((state) => state.removedDateList);
    const { loading, error, date } = removedDateList;

    useEffect(() => {
        dispatch(listRemovedDate());
    }, [dispatch]);

    const handleDayClick = (day) => {
        if (!busyDay(day, date?.map((d) => d.removedDate)) && 
            !threeMonths(value) && 
            !isSunday(day) && 
            !beforeToday(day)) {
            onChange(day);
        }
    };

    const getStyles = (day, value) => {
        return dayStyles(day, value, date?.map((d) => d.removedDate));
    };

    return (
        <BaseCalendar
            value={value}
            onChange={onChange}
            dayStyles={getStyles}
            dayClickHandler={handleDayClick}
            loading={loading}
            error={error}
        />
    );
}

//export default calendar;