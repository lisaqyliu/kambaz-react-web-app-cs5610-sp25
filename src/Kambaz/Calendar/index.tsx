import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const locales = {
    'en-US': enUS
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface Event {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description?: string;
}

export default function Calendar() {
    const [events, setEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [newEvent, setNewEvent] = useState<Partial<Event>>({
        title: '',
        start: new Date(),
        end: new Date(),
        description: ''
    });
    
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === "FACULTY";

    const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
        if (isFaculty) {
            setNewEvent({
                title: '',
                start,
                end,
                description: ''
            });
            setSelectedEvent(null);
            setShowModal(true);
        }
    };

    const handleSelectEvent = (event: Event) => {
        setSelectedEvent(event);
        setNewEvent(event);
        setShowModal(true);
    };

    const handleSave = () => {
        if (!newEvent.title || !newEvent.start || !newEvent.end) return;

        if (selectedEvent) {
            // Update existing event
            setEvents(events.map(event => 
                event.id === selectedEvent.id 
                    ? { ...newEvent, id: selectedEvent.id } as Event
                    : event
            ));
        } else {
            // Add new event
            setEvents([...events, { ...newEvent, id: Date.now().toString() } as Event]);
        }
        
        handleClose();
    };

    const handleDelete = () => {
        if (selectedEvent) {
            setEvents(events.filter(event => event.id !== selectedEvent.id));
        }
        handleClose();
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedEvent(null);
        setNewEvent({
            title: '',
            start: new Date(),
            end: new Date(),
            description: ''
        });
    };

    return (
        <div className="p-4">
            <h2 className="mb-4">Calendar</h2>
            <div style={{ height: '80vh' }}>
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable={isFaculty}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    views={['month', 'week', 'day', 'agenda']}
                    defaultView='month'
                />
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedEvent ? 'Edit Event' : 'Add New Event'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Event Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event title"
                                value={newEvent.title || ''}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                readOnly={!isFaculty}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={newEvent.start ? format(newEvent.start, "yyyy-MM-dd'T'HH:mm") : ''}
                                onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                                readOnly={!isFaculty}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={newEvent.end ? format(newEvent.end, "yyyy-MM-dd'T'HH:mm") : ''}
                                onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                                readOnly={!isFaculty}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter event description"
                                value={newEvent.description || ''}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                readOnly={!isFaculty}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {isFaculty && (
                        <>
                            {selectedEvent && (
                                <Button variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            )}
                            <Button variant="primary" onClick={handleSave}>
                                {selectedEvent ? 'Update' : 'Add'} Event
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
} 