const axios = require("axios");

const MONDAY_API = "https://api.monday.com/v2";

const headers = {
  Authorization: process.env.MONDAY_API_KEY,
  "Content-Type": "application/json",
};

async function fetchBoard(boardId) {

  const query = `
  query {
    boards(ids: [${boardId}]) {
      id
      name

      items_page(limit: 500) {
        items {
          id
          name

          column_values {
            id
            text
            value
          }
        }
      }
    }
  }
  `;

  try {

    const response = await axios.post(
      MONDAY_API,
      { query },
      { headers }
    );

    if (response.data.errors) {
      console.log(response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.boards[0];

  } catch (err) {

    console.log("====== MONDAY ERROR ======");
    console.log(err.response?.data || err.message);
    console.log("==========================");

    throw err;

  }

}

async function fetchMondayData() {

  const deals = await fetchBoard(process.env.DEALS_BOARD_ID);

  const workOrders = await fetchBoard(process.env.WORK_ORDERS_BOARD_ID);

  return {
    deals,
    workOrders
  };

}

module.exports = {
  fetchMondayData
};