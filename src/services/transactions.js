const SERVER_URL = 'http://localhost';
const PORT = 8080;
const API = 'transactions';


// export async function getWithPageNumber(pageNumber) {
//     try {
//         const response = await fetch(`${SERVER_URL}:${PORT}/${API}/${pageNumber}`);
//         return await response.status === 200 && response.json();
//     } catch(error) {
//         await console.warn(error)
//     }
// }

export async function getWithPageNumber(pageNumber, finishedCb) {
    return await fetch(`${SERVER_URL}:${PORT}/${API}/${pageNumber}`)
        .then((response) => {
            if (response.status >= 400 && response.status < 600) {
                throw new Error("Bad response from server");
            }
            return response.json()
        })
        .then((returnedResponse) => {
            return returnedResponse
        })
        .catch((error) => {
            console.warn(error)
        })
        .finally(() => {
            finishedCb()
        });
}
