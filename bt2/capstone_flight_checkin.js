
const tickets = [
    {
        pnr: "VN001",
        passengerName: "Nguyen Van An",
        flightCode: "VN220",
        seat: "12A",
        ticketClass: "ECONOMY",
        baggageWeight: 25,
        baggageFee: 0,
        status: "BOOKED"
    },
    {
        pnr: "VN002",
        passengerName: "Tran Thi Binh",
        flightCode: "VN250",
        seat: "2B",
        ticketClass: "BUSINESS",
        baggageWeight: 20,
        baggageFee: 0,
        status: "BOOKED"
    },
    {
        pnr: "VN003",
        passengerName: "Le Minh Chau",
        flightCode: "VN300",
        seat: "15C",
        ticketClass: "ECONOMY",
        baggageWeight: 18,
        baggageFee: 0,
        status: "BOOKED"
    }
];

// Tim ve theo ma PNR
function findTicketByPnr(pnr) {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].pnr === pnr) {
            return tickets[i];
        }
    }

    return null;
}

// Tinh phi hanh ly qua can
function calculateExcessBaggageFee(ticket, weight) {
    let freeWeight = 20;

    if (ticket.ticketClass === "BUSINESS") {
        freeWeight = 30;
    }

    if (weight > freeWeight) {
        return (weight - freeWeight) * 50000;
    }

    return 0;
}

// Hien thi danh sach ve
function listTickets() {
    console.log("========== DANH SACH VE MAY BAY ==========");

    console.table(tickets.map(function(ticket) {
        return {
            PNR: ticket.pnr,
            "Hanh khach": ticket.passengerName,
            "Chuyen bay": ticket.flightCode,
            "Ghe": ticket.seat,
            "Hang ve": ticket.ticketClass,
            "Hanh ly (kg)": ticket.baggageWeight,
            "Phi qua can": ticket.baggageFee,
            "Trang thai": ticket.status
        };
    }));
}

// Hien thi the len may bay
function displayBoardingPass(ticket) {
    console.log("========== BOARDING PASS ==========");
    console.log("Ma dat cho:", ticket.pnr);
    console.log("Hanh khach:", ticket.passengerName);
    console.log("Chuyen bay:", ticket.flightCode);
    console.log("So ghe:", ticket.seat);
    console.log("Hang ve:", ticket.ticketClass);
    console.log("Hanh ly:", ticket.baggageWeight, "kg");
    console.log("Phi qua can:", ticket.baggageFee, "VND");
    console.log("Trang thai:", ticket.status);
    console.log("===================================");
}

// Thuc hien check-in
function checkIn() {
    let pnr = prompt("Nhap ma dat cho PNR:");
    
    if (pnr === null) {
        return;
    }

    pnr = pnr.trim().toUpperCase();

    if (pnr === "") {
        console.log("Ma PNR khong duoc de trong!");
        return;
    }

    const ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ticket.status !== "BOOKED") {
        console.log("Ve khong o trang thai BOOKED, khong the check-in!");
        return;
    }

    let inputWeight = prompt("Nhap can nang hanh ly (kg):");

    if (inputWeight === null || inputWeight.trim() === "") {
        console.log("Da huy thao tac check-in!");
        return;
    }

    let weight = Number(inputWeight);

    if (isNaN(weight) || weight < 0) {
        console.log("Can nang phai la so khong am!");
        return;
    }

    ticket.baggageWeight = weight;
    ticket.baggageFee = calculateExcessBaggageFee(ticket, weight);
    ticket.status = "CHECKED_IN";

    console.log("Check-in thanh cong!");
    console.log("Phi hanh ly qua can:", ticket.baggageFee, "VND");

    displayBoardingPass(ticket);
}

// Tra cuu ve theo PNR hoac ten hanh khach
function searchTicket() {
    let keyword = prompt("Nhap ma PNR hoac ten hanh khach:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Du lieu tra cuu khong hop le!");
        return;
    }

    keyword = keyword.trim().toUpperCase();

    let found = false;

    for (let i = 0; i < tickets.length; i++) {
        if (
            tickets[i].pnr === keyword ||
            tickets[i].passengerName.toUpperCase().includes(keyword)
        ) {
            console.log("Thong tin ve:");
            console.table([tickets[i]]);
            found = true;
        }
    }

    if (found === false) {
        console.log("Khong tim thay ve phu hop!");
    }
}

// Huy ve
function cancelTicket() {
    let pnr = prompt("Nhap ma PNR can huy:");

    if (pnr === null) {
        return;
    }

    pnr = pnr.trim().toUpperCase();

    if (pnr === "") {
        console.log("Ma PNR khong duoc de trong!");
        return;
    }

    const ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ticket.status === "CANCELLED") {
        console.log("Ve nay da duoc huy truoc do!");
        return;
    }

    ticket.status = "CANCELLED";

    console.log("Huy ve thanh cong!");
    console.log("Ma PNR:", ticket.pnr);
    console.log("Hanh khach:", ticket.passengerName);
    console.log("Trang thai moi:", ticket.status);
}

// Hien thi menu
function displayMenu() {
    console.log("========================================");
    console.log("     HE THONG QUAN LY VE MAY BAY");
    console.log("========================================");
    console.log("1. Hien thi danh sach ve");
    console.log("2. Check-in va tinh phi hanh ly");
    console.log("3. Tra cuu ve");
    console.log("4. Huy ve");
    console.log("5. Thoat chuong trinh");
    console.log("========================================");
}

// Ham dieu phoi chuong trinh
function main() {
    let menuChoice;

    do {
        displayMenu();

        menuChoice = prompt("Nhap lua chon cua ban (1-5):");

        if (menuChoice === null) {
            menuChoice = "5";
        }

        switch (menuChoice.trim()) {
            case "1":
                listTickets();
                break;

            case "2":
                checkIn();
                break;

            case "3":
                searchTicket();
                break;

            case "4":
                cancelTicket();
                break;

            case "5":
                console.log("Ket thuc ca lam viec!");
                break;

            default:
                console.log("Lua chon khong hop le! Vui long nhap tu 1 den 5.");
        }
    } while (menuChoice.trim() !== "5");
}

// Khoi chay chuong trinh
main();
