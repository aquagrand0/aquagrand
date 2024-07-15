import React, { useState, useEffect, useRef } from "react";
import TicketForm from "./components/TicketForm";
import TicketSummary from "./components/TicketSummary";
import ReportWithPrint from "./components/Report";
import Login from "./components/Login";
import ReactToPrint from "react-to-print";
import "./index.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [latestTickets, setLatestTickets] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const summaryRef = useRef();
  const printTriggerRef = useRef();

  // Load tickets from localStorage on initial render
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets"));
    if (savedTickets) {
      setTickets(savedTickets);
    }
  }, []);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const addTickets = (newTickets) => {
    setTickets([...tickets, ...newTickets]);
    setLatestTickets(newTickets);
    setTimeout(() => {
      if (printTriggerRef.current) {
        printTriggerRef.current.click();
      }
    }, 500);
  };

  const handleLogin = (authenticated) => {
    setIsAuthenticated(authenticated);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Function to reset localStorage with confirmation alert
  const resetLocalStorageWithConfirmation = () => {
    if (window.confirm("A je i sigurt per fshirjen e raportit ditor?")) {
      localStorage.clear();
      setTickets([]);
    }
  };

  // Function to reset localStorage automatically at 11 PM
  const resetLocalStorage = () => {
    console.log("Resetting localStorage at 11 PM");
    localStorage.clear();
    setTickets([]);
  };

  // Function to calculate the time remaining until the next 11 PM
  const getTimeUntilNextReset = () => {
    const now = new Date();
    const nextReset = new Date();

    nextReset.setHours(23, 0, 0, 0); // Set time to 11:00 PM today

    if (now.getHours() >= 23) {
      nextReset.setDate(nextReset.getDate() + 1); // Schedule for next day if the time has passed today
    }

    return nextReset.getTime() - now.getTime();
  };

  // Schedule the reset at 11 PM
  useEffect(() => {
    const timeUntilNextReset = getTimeUntilNextReset();
    const timeoutId = setTimeout(() => {
      resetLocalStorage();

      // Schedule the reset every 24 hours after the first reset
      setInterval(resetLocalStorage, 24 * 60 * 60 * 1000);
    }, timeUntilNextReset);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold my-6">Aqua Grand</h1>
      <TicketForm addTickets={addTickets} />
      {latestTickets.length > 0 && (
        <div style={{ display: "none" }}>
          <ReactToPrint
            trigger={() => (
              <button ref={printTriggerRef}>Print this out!</button>
            )}
            content={() => summaryRef.current}
          />
          <div ref={summaryRef}>
            <TicketSummary tickets={latestTickets} />
          </div>
        </div>
      )}
      <button
        onClick={() => setShowLogin(true)}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-6"
      >
        Admin
      </button>
      {showLogin && !isAuthenticated && <Login onLogin={handleLogin} />}
      {isAuthenticated && (
        <>
          <ReportWithPrint tickets={tickets} />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700 mt-6"
          >
            Logout
          </button>
          <button
            onClick={resetLocalStorageWithConfirmation}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700 mt-6"
          >
            Reset Data
          </button>
        </>
      )}
    </div>
  );
};

export default App;
