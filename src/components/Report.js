import React from "react";
import ReactToPrint from "react-to-print";

class Report extends React.Component {
  render() {
    const { tickets } = this.props;
    const totalTickets = tickets.length;
    const totalRevenue = tickets.reduce((sum, ticket) => sum + ticket.price, 0);

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-80 text-center">
        <h2 className="text-2xl font-bold mb-2">Raporti Ditor</h2>
        <p className="text-gray-700">
          Totali i biletave te shitura: {totalTickets}
        </p>
        <p className="text-gray-700">Shuma totale: {totalRevenue} denare</p>
      </div>
    );
  }
}

const PrintableReport = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <Report {...props} />
  </div>
));

const ReportWithPrint = ({ tickets }) => {
  const componentRef = React.useRef();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-80 text-center">
      <ReactToPrint
        trigger={() => (
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mb-4">
            Printo Raportin
          </button>
        )}
        content={() => componentRef.current}
      />
      <PrintableReport ref={componentRef} tickets={tickets} />
    </div>
  );
};

export default ReportWithPrint;
