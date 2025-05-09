console.log("Orders frontend javascript file");

$(function () {
  $(".order-status").on("change", function (e) {
    const id = e.target.id,
      orderStatus = $(`#${id}.order-status`).val();
    axios
      .post("/admin/order/update", {
        orderId: id,
        orderStatus: orderStatus,
      })
      .then((response) => {
        const result = response.data;
        if (result.data) {
          $(".order-status").blur();
          alert("Order is updated!");
        } else alert("Order update failed!");
      })
      .catch((err) => {
        console.log(err);
        alert("Order update failed!");
      });
  });
});
