import db from "../../utils/db.js";

// export const getLoanData = async (req, res, next) => {
//     try {
//         const loanDataFromDb = await db.loan.findMany();

//         const instrumentCounts = {};
//         loanDataFromDb.forEach((loan) => {
//             const instrumentId = loan.musicalInstrumentId;
//             if(instrumentCounts[instrumentId]) {
//                 instrumentCounts[instrumentId]++;
//             } else {
//                 instrumentCounts[instrumentId] = 1;
//             }
//         });

//         const chartData = Object.keys(instrumentCounts).map((instrumentId) => {
//             return{
//                 label: instrumentId,
//                 value: instrumentCounts[instrumentId]
//             }
//         })
//         res.json(chartData);
//     } catch (error) {
//         next(error)
//     }
// }

export const getLoanData = async (req, res, next) => {
    try {
        const loanDataFromDb = await db.loan.findMany({
            include: {
                musicalInstrument: true,
            },
        });

        const instrumentCounts = {};
        loanDataFromDb.forEach((loan) => {
            const instrumentName = loan.musicalInstrument.name;

            if (instrumentCounts[instrumentName]) {
                instrumentCounts[instrumentName]++;
            } else {
                instrumentCounts[instrumentName] = 1;
            }
        });

        const chartData = Object.keys(instrumentCounts).map((instrumentName) => {
            return {
                label: instrumentName,
                value: instrumentCounts[instrumentName]
            };
        });

        res.json(chartData);
    } catch (error) {
        next(error);
    }
};

export const  getUserOrder = async (req, res, next) => {
    
}
