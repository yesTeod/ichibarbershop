import moment from "moment";

function isSelected(hour, value) {
    return value.isSame(hour, "hour") && value.isSame(hour, "minute") && value.isSame(hour, "second");
}

export function isBusy(hour, hourBusy, serviceId, selectedService) {
    if (selectedService === "635ffcd2643f25bfc574f51d" || selectedService === "635ffcd2643f25bfc574f51f") {
        for (let i = hourBusy.length; i >= 0; i--) {
            hourBusy.push(moment(hourBusy[i]).clone().subtract(30, 'minutes'));
        }
        if (hour.day() !== 6) {
            hourBusy.push(hour.clone().hour(12).minute(0));
        }
    }
    for (let i = 0; i < serviceId.length; i++) {
        if (serviceId[i] === "635ffcd2643f25bfc574f51d" || serviceId[i] === "635ffcd2643f25bfc574f51f") {
            hourBusy.push(moment(hourBusy[i]).clone().add(30, 'minutes'));
        }
    }
    for (let i = 0; i < hourBusy.length; i++) {
        if (hour.isSame(hourBusy[i])) {
            return true;
        }
    }
    return false;
}

export function beforeHours(hour) {
    return hour.clone().subtract(3, 'hour').isBefore(new Date(), "hour") && hour.clone().subtract(2, "hour").isBefore(new Date(), "minutes");
}

export default function hourStyles(hour, value, hourBusy, serviceId, selectedService) {
    if (beforeHours(hour)) return 'prevnext-day';
    if (isBusy(hour, hourBusy, serviceId, selectedService)) {
        return 'passed';
    }
    if (isSelected(hour, value)) return 'selected';
    return 'positive';
}