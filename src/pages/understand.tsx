import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid' 
import { useState } from 'react'
import interactionPlugin from "@fullcalendar/interaction";
import Available from '../addavailability';


export function Calender() {
//   const [event,setevent]=useState(
//       [
//   {id:227, title: 'Meeting', start: new Date() ,end: new Date() }
// ]
//   )
const [event,setevent]=useState([])
  const [isModalOpen, setModalOpen] = useState(false);
// const handledateselect=(selectInfo:any)=>{
//   const tittle=prompt("enter meeting tittle")
//   if(tittle){
//     setevent([...event,{id:event.length+1,title:tittle,start:selectInfo.startStr,end:selectInfo.endStr}])
//   }

// }
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
  // return (
  //   <div>
  //     <h1>My Availability</h1>
  //     <FullCalendar
  //       plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
  //       initialView='timeGridWeek'
  //       weekends={false}
  //       events={event}
  //       eventContent={renderEventContent}
  //       selectable={true}
  //       select={handledateselect}
  //       height="80vh"
  //       handleToolbar={{left: "prev,next today",
  //         center: "title",
  //         right: "dayGridMonth,timeGridWeek,timeGridDay",}}
  //     />
  //   </div>
  // )
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Availability</h1>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add Slot
        </button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        height="80vh"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addSlot}
      />
    </div>
  );

}

// a custom render function
// function renderEventContent(eventInfo:any) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   )
// }
