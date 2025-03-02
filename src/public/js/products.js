console.log("Products frontend javascript file");

$(function () {
  $(".product-collection").on("change", () => {
    const selectValue = $(".product-collection").val();
    if (selectValue === "DRINK") {
      $("#product-volume").show();
      $("#product-collection").hide();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });

  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });

  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const productStatus = $(`#${id}.new-product-status`).val();
    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });
      const result = response.data;
      if (result.data) {
        $(".new-product-status").blur();
        alert("Product status updated!");
      } else alert("Product update failed!");
    } catch (err) {
      console.log(err);
      alert("Product update failed!");
    }
  });

  $(".new-product-left-count").on("change", async function (e) {
    const id = e.target.id;
    const productLeftCount = e.target.value; // Get updated value

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productLeftCount: productLeftCount,
      });
      const result = response.data;

      if (result.data) {
        $(".new-product-left-count").blur(); // Remove focus after update
        alert("Product left count updated!");
      } else {
        alert("Product left count update failed!");
      }
    } catch (err) {
      console.log(err);
      alert("Product count update failed!");
    }
  });

  $(".new-product-price").on("change", async function (e) {
    console.log("Event Target ID:", e.target.id);
    const id = e.target.id;
    const productPrice = e.target.value; // Get updated price
    console.log("prdct prc:", productPrice);

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productPrice: productPrice,
      });

      const result = response.data;
      if (result.data) {
        $(".new-product-price").blur(); // Remove focus after update
        alert("Product price updated!");
      } else {
        alert("Product price update failed!");
      }
    } catch (err) {
      console.log(err);
      alert("Product price update failed!");
    }
  });
});

function validateForm() {
  const productName = $(".product-name").val(),
    productStatus = $(".product-status").val(),
    productPrice = $(".product-price").val(),
    productLeftCount = $(".product-left-count").val(),
    productCollection = $(".product-collection").val(),
    productDesc = $(".product-desc").val();

  if (
    productName === "" ||
    productStatus === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === ""
  ) {
    alert("Please insert all details!");
    return false;
  } else {
    return true;
  }
}

function previewFileHandler(input, order) {
  const imgClassName = input.className,
    file = $(`.${imgClassName}`).get(0).files[0],
    fileType = file["type"],
    validImageType = ["image/jpg", "image/jpeg", "image/png"];
  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpeg, jpg, png formats!");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  $(this).siblings(".upload-name").val(filename);
}
