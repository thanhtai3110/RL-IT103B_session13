
const ticket = {
    passengerName: "Nguyen Thanh Tai",
    ticketCode: "VN001",
    ticketClass: "ECONOMY",
    freeWeight: 20,
    memberLevel: "TITAN"
};

const baggageList = [
    {
        baggageName: "Vali",
        weight: 15,
        type: "NORMAL"
    },
    {
        baggageName: "Tui dung do",
        weight: 10,
        type: "NORMAL"
    },
    {
        baggageName: "Gay golf",
        weight: 8,
        type: "BULKY"
    },
    {
        baggageName: "Long thu cung",
        weight: 5,
        type: "PET"
    },
    {
        baggageName: "Thung do de vo",
        weight: 2,
        type: "FRAGILE"
    }
];

// Ham tinh phu phi hanh ly
function calculateBaggageSurcharge(ticket, baggageList) {
    let totalWeight = 0;
    let overweightFee = 0;
    let specialFee = 0;
    let freeWeight = ticket.freeWeight;

    // Hoi vien Titan tro len duoc tang them 10 kg
    if (
        ticket.memberLevel === "TITAN" ||
        ticket.memberLevel === "GOLD" ||
        ticket.memberLevel === "DIAMOND"
    ) {
        freeWeight = freeWeight + 10;
    }

    // Tinh tong trong luong va phi dich vu dac biet
    for (let i = 0; i < baggageList.length; i++) {
        totalWeight = totalWeight + baggageList[i].weight;

        if (baggageList[i].type === "BULKY") {
            specialFee = specialFee + 200000;
        } else if (baggageList[i].type === "PET") {
            specialFee = specialFee + 500000;
        }
    }

    // Tinh phi hanh ly qua cuoc
    let excessWeight = totalWeight - freeWeight;

    if (excessWeight > 0) {
        if (excessWeight <= 5) {
            overweightFee = excessWeight * 60000;
        } else {
            overweightFee = 5 * 60000;
            overweightFee = overweightFee + (excessWeight - 5) * 80000;
        }
    }

    let totalFee = overweightFee + specialFee;

    return {
        totalWeight: totalWeight,
        freeWeight: freeWeight,
        excessWeight: excessWeight > 0 ? excessWeight : 0,
        overweightFee: overweightFee,
        specialFee: specialFee,
        totalFee: totalFee
    };
}

// Ham dinh dang tien Viet Nam
function formatMoney(amount) {
    return amount.toLocaleString("vi-VN") + " VND";
}

// Ham in bien lai
function printReceipt(ticket, baggageList, result) {
    console.log("==================================================");
    console.log("           BIEN LAI PHU THU HANH LY");
    console.log("==================================================");
    console.log(`Hanh khach       : ${ticket.passengerName}`);
    console.log(`Ma ve            : ${ticket.ticketCode}`);
    console.log(`Hang ve          : ${ticket.ticketClass}`);
    console.log("--------------------------------------------------");
    console.log("CHI TIET HANH LY");

    for (let i = 0; i < baggageList.length; i++) {
        console.log(
            `${String(i + 1).padEnd(3)} ${baggageList[i].baggageName.padEnd(22)} ${String(baggageList[i].weight).padStart(3)} kg`
        );
    }

    console.log("--------------------------------------------------");
    console.log(`Tong trong luong : ${result.totalWeight} kg`);
    console.log(`Mien cuoc        : ${result.freeWeight} kg`);
    console.log(`Vuot cuoc        : ${result.excessWeight} kg`);
    console.log(`Phi qua cuoc     : ${formatMoney(result.overweightFee)}`);
    console.log(`Phi dich vu      : ${formatMoney(result.specialFee)}`);
    console.log("--------------------------------------------------");
    console.log(`TONG THANH TOAN  : ${formatMoney(result.totalFee)}`);
    console.log("==================================================");
}

// Chuong trinh chinh
const result = calculateBaggageSurcharge(ticket, baggageList);
printReceipt(ticket, baggageList, result);
