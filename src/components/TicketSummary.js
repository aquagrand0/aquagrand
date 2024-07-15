import React from "react";

const TicketSummary = React.forwardRef((props, ref) => {
  const { tickets } = props;
  const totalAmount = tickets.reduce((sum, ticket) => sum + ticket.price, 0);
  const totalTickets = tickets.length;
  const currentDate = new Date().toLocaleDateString();

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
      <h2 className="text-2xl font-bold mb-2">Aqua Grand</h2>
      <p className="text-gray-700">Data: {currentDate}</p>
      <p className="text-gray-700">Numri i biletave: {totalTickets}</p>
      <p className="text-gray-700">Cmimi i biletave: {totalAmount} denare</p>
    </div>
  );
});

export default TicketSummary;
