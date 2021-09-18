let resultContainer = document.querySelector(".resultContainer");

function run() {
  document.querySelector("#addressBtn").onclick = () => {
    let splitType = document.querySelector(
      'input[name="splitType"]:checked'
    ).value;
    resultContainer.textContent = "";
    let latLongTextBox = document.querySelector("#latlong").value;

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
}
run();
