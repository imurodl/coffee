console.log("Signup frontend javascript file");

$(function () {
  $("#confirmPassword").on("keyup", function () {
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();
    if (password != confirmPassword)
      $("#CheckPasswordMatch")
        .html("Password does not match !")
        .css("color", "red");
    else
      $("#CheckPasswordMatch").html("Password match !").css("color", "green");
  });
});

/*
$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0],
        fileType = uploadFile["type"],
        validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg, png formats!");
      } else {
        if (uploadFile) {
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }
        filename = $(this)[0].files[0].name;
      }
      $(this).siblings(".upload-name").val(filename);
    }
  });
});

function validateSignupForm() {
  const memberNick = $(".member-nick").val(),
    memberPhone = $(".member-phone").val(),
    memberPassword = $(".member-password").val(),
    confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("password differs, please check!");
    return false;
  }

  const memberImage = $(".member-image").get(0)?.files[0]?.name
    ? $(".member-image").get(0).files[0].name
    : null;
  if (!memberImage) {
    alert("Please insert restaurant image!");
    return false;
  }
}
  */
