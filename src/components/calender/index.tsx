import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Available from "../addavailability";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // ✅ Step 6: Meeting Requests mock data
  const [meetingRequests, setMeetingRequests] = useState([
    { id: 1, title: "Project Sync with Investor", status: "Pending" },
    { id: 2, title: "Business Strategy Review", status: "Pending" },
  ]);

  // Accept a meeting → adds it to the calendar
  const acceptRequest = (id: number) => {
    const request = meetingRequests.find((req) => req.id === id);
    if (!request) return;

    // Add to calendar as a confirmed event
    setEvents([
      ...events,
      {
        id: String(events.length + 1),
        title: request.title,
        start: new Date().toISOString().slice(0, 10) + "T10:00:00",
        end: new Date().toISOString().slice(0, 10) + "T11:00:00",
      },
    ]);

    // Update request status
    setMeetingRequests(
      meetingRequests.map((req) =>
        req.id === id ? { ...req, status: "Accepted" } : req
      )
    );
  };

  // Decline a meeting → just update status
  const declineRequest = (id: number) => {
    setMeetingRequests(
      meetingRequests.map((req) =>
        req.id === id ? { ...req, status: "Declined" } : req
      )
    );
  };

  // Add availability slot manually
  const addSlot = (slot: any) => {
    setEvents([
      ...events,
      {
        id: String(events.length + 1),
        title: "Available Slot",
        start: slot.start,
        end: slot.end,
      },
    ]);
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Availability</h1>
        <button
          className="bg-blue-400 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add Slot
        </button>
      </div>

      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        height="70vh"
      />

      {/* Add Slot Modal */}
      <Available
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addSlot}
      />

      {/* ✅ Step 6: Meeting Requests Section */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Meeting Requests</h2>
        <ul>
          {meetingRequests.map((req) => (
            <li
              key={req.id}
              className="flex justify-between items-center border p-3 mb-2 rounded-lg shadow-sm"
            >
              <span>
                {req.title} - <strong>{req.status}</strong>
              </span>
              {req.status === "Pending" && (
                <div className="space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => acceptRequest(req.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => declineRequest(req.id)}
                  >
                    Decline
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;