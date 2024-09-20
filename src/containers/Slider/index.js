import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = React.useMemo(
    () =>
      Array.isArray(data?.focus)
        ? [...data.focus].sort(
            (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
          )
        : [],
    [data]
  );

  const nextCard = useCallback(() => {
    if (byDateDesc.length > 0) {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }
  }, [byDateDesc]);

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [index, nextCard]);

  if (byDateDesc.length === 0) {
    return null;
  }

  return (
    <div className="SlideCardList" style={{ overflow: "hidden" }}>
      {byDateDesc.map((event, idx) => (
        <div key={`slide-${event.id || idx}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <RadioButtons
        count={byDateDesc.length}
        activeIndex={index}
        onChange={setIndex}
      />
    </div>
  );
};

const RadioButtons = ({ count, activeIndex, onChange }) => (
  <div className="SlideCard__paginationContainer">
    <div className="SlideCard__pagination">
      {Array.from({ length: count }, (_, i) => (
        <input
          key={`radio-${i}`}
          type="radio"
          name="radio-button"
          checked={activeIndex === i}
          onChange={() => onChange(i)}
        />
      ))}
    </div>
  </div>
);

RadioButtons.propTypes = {
  count: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
