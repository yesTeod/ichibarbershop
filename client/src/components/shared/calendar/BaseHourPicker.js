import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";

const BaseHourPicker = ({
  value,
  onChange,
  hourStyles,
  hourClickHandler,
  loading,
  error,
  buildHours
}) => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    setHours(buildHours(value));
  }, [value, buildHours]);

  if (loading) return <Loading />;
  if (error) return <Message variant="alert-danger">{error}</Message>;

  return (
    <div className="hour-picker">
      {hours.map((hourGroup, groupIndex) => (
        <div key={`hour-group-${groupIndex}`} className="hours">
          {hourGroup.map(hour => (
            <div 
              key={hour.toString()} 
              className="hour"
              onClick={() => hourClickHandler(hour)}
              role="button"
              tabIndex={0}
            >
              <div className={hourStyles(hour, value)}>
                {hour.format('HH:mm')}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

BaseHourPicker.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  hourStyles: PropTypes.func.isRequired,
  hourClickHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  buildHours: PropTypes.func.isRequired
};

export default BaseHourPicker; 