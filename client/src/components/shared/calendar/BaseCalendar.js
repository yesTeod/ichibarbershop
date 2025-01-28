import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import buildCalendar from "./build";
import MonthHeader from "./MonthHeader";

const BaseCalendar = ({ 
  value, 
  onChange, 
  dayStyles, 
  dayClickHandler,
  loading,
  error,
  renderHeader = true,
  children 
}) => {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  if (loading) return <Loading />;
  if (error) return <Message variant="alert-danger">{error}</Message>;

  return (
    <div className="dates">
      {renderHeader && <MonthHeader value={value} setValue={onChange} />}
      <div className="dayname">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {calendar.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="days">
            {week.map(day => (
              <div 
                key={day.toString()} 
                className="day" 
                onClick={() => dayClickHandler(day)}
                role="button"
                tabIndex={0}
              >
                <div className={dayStyles(day, value)}>
                  {day.format("D")}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

BaseCalendar.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  dayStyles: PropTypes.func.isRequired,
  dayClickHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  renderHeader: PropTypes.bool,
  children: PropTypes.node
};

export default BaseCalendar; 