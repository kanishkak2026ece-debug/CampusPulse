function registerEvent(eventName, eventDate, venue) {

    let confirmationID =
        "CP" + Date.now().toString().slice(-6);

    // Save registration
    let ticket = {
        event: eventName,
        date: eventDate,
        venue: venue,
        id: confirmationID
    };

    localStorage.setItem(
        "campusTicket",
        JSON.stringify(ticket)
    );

    // Display digital ticket
    document.getElementById("ticket").innerHTML = `
        <div class="ticket">
            <h2>CampusPulse</h2>
            <h3>DIGITAL ENTRY PASS</h3>

            <h2>${eventName}</h2>

            <p><b>Date:</b> ${eventDate}</p>
            <p><b>Venue:</b> ${venue}</p>
            <p><b>Ticket ID:</b> ${confirmationID}</p>

            <h3>Registration Successful!</h3>
        </div>
    `;
}

// Display saved ticket when page is reopened
window.onload = function() {

    let savedTicket =
        localStorage.getItem("campusTicket");

    if (savedTicket) {
        let ticket = JSON.parse(savedTicket);

        document.getElementById("ticket").innerHTML = `
            <div class="ticket">
                <h2>CampusPulse</h2>
                <h3>DIGITAL ENTRY PASS</h3>
                <h2>${ticket.event}</h2>
                <p><b>Date:</b> ${ticket.date}</p>
                <p><b>Venue:</b> ${ticket.venue}</p>
                <p><b>Ticket ID:</b> ${ticket.id}</p>
                <h3>Registration Successful!</h3>
            </div>
        `;
    }
};
function addEvent(event) {
    event.preventDefault();

    let newEvent = {
        name: document.getElementById("eventName").value,
        date: document.getElementById("eventDate").value,
        venue: document.getElementById("eventVenue").value,
        description: document.getElementById("eventDescription").value
    };

    let savedEvents = JSON.parse(
        localStorage.getItem("campusEvents") || "[]"
    );

    savedEvents.push(newEvent);

    localStorage.setItem(
        "campusEvents",
        JSON.stringify(savedEvents)
    );

    createEventCard(newEvent);

    document.querySelector(".admin-form form").reset();

    alert("Event saved successfully!");
}

// Create an event card
function createEventCard(eventDetails) {

    let card = document.createElement("div");
    card.className = "event";

    let heading = document.createElement("h3");
    heading.textContent = eventDetails.name;

    let date = document.createElement("p");
    date.textContent = "Date: " + eventDetails.date;

    let venue = document.createElement("p");
    venue.textContent = "Venue: " + eventDetails.venue;

    let description = document.createElement("p");
    description.textContent = eventDetails.description;

    let button = document.createElement("button");
    button.textContent = "Register Now";

    button.onclick = function () {
        registerEvent(
            eventDetails.name,
            eventDetails.date,
            eventDetails.venue
        );
    };

    card.appendChild(heading);
    card.appendChild(date);
    card.appendChild(venue);
    card.appendChild(description);
    card.appendChild(button);

    document.getElementById("newEvents").appendChild(card);
}


// Display saved events after refreshing
window.addEventListener("DOMContentLoaded", function () {

    let savedEvents = JSON.parse(
        localStorage.getItem("campusEvents") || "[]"
    );

    savedEvents.forEach(function (eventDetails) {
        createEventCard(eventDetails);
    });

});