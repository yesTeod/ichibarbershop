export default function buildHours(value) {
    const startHour = value.clone().hours(9).minute(0).second(0);
    const endHour = value.clone().hours(18).minute(0).second(0);
    const hour = startHour.clone().subtract(0, "hour");

    const satEndHours = value.clone().hours(13).minute(0).second(0);

    const hoursArr = [];
    if (value.day() === 6) {
        while (hour.isBefore(satEndHours, "hour")) {
            hoursArr.push(
                Array(8).fill(0).map(() => hour.add(30, "minute").clone())
            );
        }
    }
    else {
        while (hour.isBefore(endHour, "hour")) {
            hoursArr.push(
                Array(18).fill(0).map(() => hour.add(30, "minute").clone())
            );
        }
        hoursArr[0].splice(6, 2);
    }
    return hoursArr;
}