
const tickets = [
    {
        pnr: "VN001",
        customerName: "Nguyen Van An",
        flight: "VN220",
        seat: "12A",
        ticketClass: "ECONOMY",
        baggageWeight: 25,
        status: "BOOKED",
        baggageFee: 0
    },
    {
        pnr: "VN002",
        customerName: "Tran Thi Binh",
        flight: "VN310",
        seat: "02B",
        ticketClass: "BUSINESS",
        baggageWeight: 20,
        status: "BOOKED",
        baggageFee: 0
    },
    {
        pnr: "VN003",
        customerName: "Le Minh Chau",
        flight: "VN450",
        seat: "15C",
        ticketClass: "ECONOMY",
        baggageWeight: 18,
        status: "BOOKED",
        baggageFee: 0
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

    if (tickets.length === 0) {
        console.log("Chua co ve nao.");
        return;
    }

    for (let i = 0; i < tickets.length; i++) {
        console.log(
            "PNR: " + tickets[i].pnr +
            " | Khach: " + tickets[i].customerName +
            " | Chuyen bay: " + tickets[i].flight +
            " | Ghe: " + tickets[i].seat +
            " | Hang: " + tickets[i].ticketClass +
            " | Trang thai: " + tickets[i].status
        );
    }
}

// Hien thi the len may bay
function displayBoardingPass(ticket) {
    console.log("========== BOARDING PASS ==========");
    console.log("Ma PNR: " + ticket.pnr);
    console.log("Hanh khach: " + ticket.customerName);
    console.log("Chuyen bay: " + ticket.flight);
    console.log("So ghe: " + ticket.seat);
    console.log("Hang ve: " + ticket.ticketClass);
    console.log("Hanh ly: " + ticket.baggageWeight + " kg");
    console.log("Phi hanh ly: " + ticket.baggageFee + " VND");
    console.log("Trang thai: " + ticket.status);
    console.log("===================================");
}

// Lam thu tuc check-in
function checkIn() {
    let pnr = prompt("Nhap ma PNR:");

    if (pnr === null) {
        return;
    }

    pnr = pnr.trim().toUpperCase();

    if (pnr === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    let ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve.");
        return;
    }

    if (ticket.status !== "BOOKED") {
        console.log("Ve khong the check-in. Trang thai: " + ticket.status);
        return;
    }

    let weightInput = prompt("Nhap can nang hanh ly (kg):");

    if (weightInput === null || weightInput.trim() === "") {
        console.log("Da huy thao tac check-in.");
        return;
    }

    let weight = Number(weightInput);

    if (isNaN(weight) || weight < 0) {
        console.log("Can nang khong hop le.");
        return;
    }

    ticket.baggageWeight = weight;
    ticket.baggageFee = calculateExcessBaggageFee(ticket, weight);
    ticket.status = "CHECKED_IN";

    console.log("Check-in thanh cong!");
    console.log("Phi hanh ly qua can: " + ticket.baggageFee + " VND");

    displayBoardingPass(ticket);
}

// Tra cuu ve theo PNR hoac ten khach
function searchTicket() {
    let keyword = prompt("Nhap ma PNR hoac ten khach hang:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Tu khoa khong hop le.");
        return;
    }

    keyword = keyword.trim().toUpperCase();

    let found = false;

    for (let i = 0; i < tickets.length; i++) {
        if (
            tickets[i].pnr.toUpperCase() === keyword ||
            tickets[i].customerName.toUpperCase().includes(keyword)
        ) {
            console.log(tickets[i]);
            found = true;
        }
    }

    if (found === false) {
        console.log("Khong tim thay ve.");
    }
}

// Huy ve
function cancelTicket() {
    let pnr = prompt("Nhap ma PNR can huy:");

    if (pnr === null || pnr.trim() === "") {
        console.log("Ma PNR khong hop le.");
        return;
    }

    pnr = pnr.trim().toUpperCase();

    let ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve.");
        return;
    }

    if (ticket.status !== "BOOKED") {
        console.log("Chi co the huy ve dang BOOKED.");
        return;
    }

    ticket.status = "CANCELLED";

    console.log("Huy ve thanh cong: " + ticket.pnr);
}

// Hien thi menu
function showMenu() {
    console.log("======================================");
    console.log(" QUAN LY VE MAY BAY & HANH LY");
    console.log("======================================");
    console.log("1. Hien thi danh sach ve");
    console.log("2. Check-in va tinh phi hanh ly");
    console.log("3. Tra cuu ve");
    console.log("4. Huy ve");
    console.log("5. Thoat chuong trinh");
    console.log("======================================");
}

// Ham main dieu phoi chuong trinh
function main() {
    let menuChoice;

    do {
        showMenu();

        menuChoice = prompt("Nhap lua chon (1-5):");

        if (menuChoice === null) {
            break;
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
                console.log("Ket thuc ca lam viec.");
                break;

            default:
                console.log("Lua chon khong hop le. Vui long nhap tu 1 den 5.");
        }
    } while (menuChoice.trim() !== "5");

    console.log("Da thoat chuong trinh.");
}

main();
