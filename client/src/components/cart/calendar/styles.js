import moment from "moment";

function isSelected(day, value) {
    return value.isSame(day, "day") && day.day() !== 0;
}

export function busyDay(day, dayBusy) {
    for (let i = 0; i < dayBusy.length; i++) {
        if (day.isSame(dayBusy[i])) {
            return true;
        }
    }
    return false;
}

export function beforeToday(day) {
    return day.isBefore(new Date(), "day");
}

function isToday(day) {
    return day.isSame(new Date(), "day");
}

export function isSunday(day) {
    return day.day() === 0;
}

export function threeMonths(value) {
    const plusThree = 10;
    return value.format("M").toString() === plusThree.toString()
}

export default function dayStyles(day, value, dayBusy) {
    if (beforeToday(day)) return 'prevnext-day';
    if (isSelected(day, value)) return 'selected';
    if (isToday(day)) return 'today';
    if (isSunday(day)) return 'prevnext-day';
    if (threeMonths(value)) return 'prevnext-day';
    if (busyDay(day, dayBusy)) {
        return 'prevnext-day';
    };
    return '';
}