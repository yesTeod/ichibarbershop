import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTimes } from "../../../Redux/Actions/OrderActions";
import BaseHourPicker from "../../shared/calendar/BaseHourPicker";
import buildHours from "./hours";
import { isBusy, beforeHours } from "./stylesHours";

export default function CalendarHours({ value, onChange, selectedService }) {
    const dispatch = useDispatch();
    const orderTimes = useSelector((state) => state.orderTimes);
    const { loading, error, order } = orderTimes;

    React.useEffect(() => {
        dispatch(listTimes());
    }, [dispatch]);

    const handleHourClick = (hour) => {
        if (!isBusy(hour, order?.map((h) => h.serviceTime), 
                   order?.map((s) => s.service), 
                   selectedService) && 
            !beforeHours(hour)) {
            onChange(hour);
        }
    };

    const getStyles = (hour, value) => {
        if (beforeHours(hour)) return 'prevnext-day';
        if (isBusy(hour, order?.map((h) => h.serviceTime), 
                  order?.map((s) => s.service), 
                  selectedService)) {
            return 'passed';
        }
        if (value.isSame(hour, "hour") && 
            value.isSame(hour, "minute") && 
            value.isSame(hour, "second")) {
            return 'selected';
        }
        return 'positive';
    };

    return (
        <BaseHourPicker
            value={value}
            onChange={onChange}
            hourStyles={getStyles}
            hourClickHandler={handleHourClick}
            loading={loading}
            error={error}
            buildHours={buildHours}
        />
    );
}