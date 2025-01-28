import React from "react";
import BaseHourPicker from "../../shared/calendar/BaseHourPicker";
import buildHours from "./hours";
import { isBusy, selectedOrder } from "./stylesHours";

export default function CalendarHours({ 
    value, 
    onChange, 
    onOrder, 
    selectedService, 
    props 
}) {
    const { loading, error, orders } = props;
    const serviceTimeList = props[2]?.map(h => h.serviceTime) || [];
    const serviceList = props[2]?.map(s => s.service) || [];

    const handleHourClick = (hour) => {
        const order = selectedOrder(value, hour, props[2]);
        onOrder(order);
        onChange(hour);
    };

    const getStyles = (hour, value) => {
        const isSelected = value.isSame(hour, "hour") && 
                         value.isSame(hour, "minute") && 
                         value.isSame(hour, "second");

        if (isSelected) return 'selected';
        if (isBusy(hour, serviceTimeList, serviceList, selectedService)) {
            return 'passed';
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