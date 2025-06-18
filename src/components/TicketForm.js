import React, { useState } from "react";

const TicketForm = ({ addTickets }) => {
  const [tickets, setTickets] = useState([]);

  const handleAddTicket = (price) => {
    const timestamp = new Date().toLocaleString();
    setTickets([...tickets, { price, timestamp }]);
  };

  const handleRemoveTicket = (index) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  const handleSellTickets = () => {
    addTickets(tickets);
    setTickets([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-80">
      <h2 className="text-xl font-bold mb-4">Biletat per Pishine</h2>
      <div className="mb-4">
        <button
          onClick={() => handleAddTicket(150)}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mb-2"
        >
          150 denare
        </button>
        <button
          onClick={() => handleAddTicket(250)}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          250 denare
        </button>
      </div>
      {tickets.length > 0 && (
        <>
          <div className="bg-gray-100 p-4 rounded mb-4">
            <h3 className="font-bold mb-2">Biletat e selektuara</h3>
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-gray-700"
              >
                <p>Cmimi: {ticket.price} denare</p>
                <button
                  onClick={() => handleRemoveTicket(index)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                >
                  Fshije
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleSellTickets}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700"
          >
            Printo bileten
          </button>
        </>
      )}
    </div>
  );
};

export default TicketForm;
