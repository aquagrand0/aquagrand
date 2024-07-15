import React from "react";

const Ticket = React.forwardRef((props, ref) => {
  const { ticket, ticketsSold } = props;

  return (
    <div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-md mb-6 w-80 text-center"
    >
      <img
        src={`${process.env.PUBLIC_URL}/aquaaaa.png`}
        alt="Logo"
        className="mx-auto mb-4"
        style={{ width: "50px" }}
      />
      <h2 className="text-2xl font-bold mb-2">Ticket for Pool</h2>
      <p className="text-gray-700">Cmimi: {ticket.price} denars</p>
      <p className="text-gray-700">Biletat e blera: {ticketsSold}</p>
      <p className="text-gray-700">Data: {ticket.timestamp}</p>
    </div>
  );
});

export default Ticket;
