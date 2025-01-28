function isSelected(day, value) {
    return value.isSame(day, "day") && day.day() !== 0;
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

export default function dayStyles(day, value) {
    //if (beforeToday(day)) return 'prevnext-day';
    if (isSelected(day, value)) return 'selected';
    if (isToday(day)) return 'today';
    if (isSunday(day)) return 'prevnext-day';
}