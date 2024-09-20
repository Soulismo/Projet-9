import React, { useState, useMemo } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];
    return data.events
      .filter((event) => type === null || event.type === type)
      .filter((event, index) => {
        const startIndex = (currentPage - 1) * PER_PAGE;
        const endIndex = startIndex + PER_PAGE;
        return index >= startIndex && index < endIndex;
      });
  }, [data, type, currentPage]);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = Math.ceil((data?.events?.length || 0) / PER_PAGE);
  const typeList = useMemo(() => {
    if (!data?.events) return new Set();
    return new Set(data.events.map((event) => event.type));
  }, [data]);

  if (error) return <div>Une erreur est survenue</div>;
  if (!data) return <div>Chargement...</div>;

  return (
    <>
      <h3 className="SelectTitle">Catégories</h3>
      <Select
        selection={Array.from(typeList)}
        onChange={(value) => (value ? changeType(value) : changeType(null))}
      />
      <div id="events" className="ListContainer">
        {filteredEvents.map((event) => (
          <Modal key={event.id} Content={<ModalEvent event={event} />}>
            {({ setIsOpened }) => (
              <EventCard
                onClick={() => setIsOpened(true)}
                imageSrc={event.cover}
                title={event.title}
                date={new Date(event.date)}
                label={event.type}
              />
            )}
          </Modal>
        ))}
      </div>
      <div className="Pagination">
        {[...Array(pageNumber)].map((_, n) => (
          <button
            key={`page-${n + 1}`}
            onClick={() => setCurrentPage(n + 1)}
            className={currentPage === n + 1 ? "active" : ""}
            type="button"
          >
            {n + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default EventList;
