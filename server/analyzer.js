function normalizeItem(item) {

  const obj = {
    id: item.id,
    name: item.name,
  };


  if (item.column_values) {

    item.column_values.forEach((col) => {


      const key =
        (
          col.column?.title ||
          col.id ||
          ""
        ).toLowerCase();



      const value =
        col.text ||
        col.value ||
        "";



      obj[key] = value;



      // detect status column
      if (key.includes("status")) {

        obj.status = value;

      }


    });

  }


  return obj;

}





function prepareBusinessData(data) {


  return {

    deals:
      data.deals?.items_page?.items?.map(normalizeItem)
      || [],


    workOrders:
      data.workOrders?.items_page?.items?.map(normalizeItem)
      || []

  };

}





module.exports = {

  prepareBusinessData

};