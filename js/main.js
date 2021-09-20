let resultContainer = document.querySelector(".resultContainer");
function determineSplitType(textbox) {
  if (/[,]/.test(textbox)) {
    return ",";
  }
  if (/[ ]/.test(textbox)) {
    return " ";
  }
  if (/[\t]/.test(textbox)) {
    return "\t";
  }
}
document.querySelector("#addressBtn").onclick = () => {
  let latLongTextBox = document.querySelector("#latlong").value;
  let splitType = determineSplitType(latLongTextBox);
  resultContainer.textContent = "";

  let latLongArr = latLongTextBox.split("\n");
  latLongArr.forEach((latlong, index) => {
    let latlongArr = latlong.split(splitType);
    let latitude = latlongArr[0].trim();
    let longitude = latlongArr[1].trim();
    $.getJSON(
      "https://nominatim.openstreetmap.org/reverse",
      {
        lat: latitude,
        lon: longitude,
        format: "json",
      },
      function (result) {
        console.log(result);
        let address = document.createElement("div");
        address.textContent = `[${latitude}${splitType} ${longitude}] ${result.display_name}`;
        resultContainer.appendChild(address);
      }
    );
  });
};
