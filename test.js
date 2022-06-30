
async function historyDataFetch() {
    let res = (await fetch('http://localhost:3002/api')).json()
    return res
}

async function bestResultsFetch() {
    let res = (await fetch('http://localhost:3002/best_results')).json()
    return res
}

async function fetchRequests() {

    const fetchHistoryData = await historyDataFetch();
    console.log(fetchHistoryData);
    const fetchbestResults = await bestResultsFetch();
    console.log(fetchbestResults);
}

fetchRequests()