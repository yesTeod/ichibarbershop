import React from "react";
import PropTypes from 'prop-types';

const MonthHeader = ({ value, setValue }) => {
    function currMonth() {
        return value.format("MMMM");
    }

    function currYear() {
        return value.format("YYYY");
    }

    function prevMonth() {
        return value.clone().subtract(1, "month");
    }

    function nextMonth() {
        return value.clone().add(1, "month");
    }

    function thisMonth() {
        return value.isSame(new Date(), "month");
    }

    function threeMonths() {
        const plusThree = 10;
        return value.format("M").toString() === plusThree.toString();
    }

    return (
        <div className="month">
            <div 
                className="arrows prev-mth" 
                onClick={() => !thisMonth() && setValue(prevMonth())}
                role="button"
                tabIndex={0}
            >
                &lt;
            </div>
            <div className="mth">
                {currMonth()} {currYear()}
            </div>
            <div 
                className="arrows next-mth" 
                onClick={() => !threeMonths() && setValue(nextMonth())}
                role="button"
                tabIndex={0}
            >
                &gt;
            </div>
        </div>
    );
};

MonthHeader.propTypes = {
    value: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired
};

export default MonthHeader; 