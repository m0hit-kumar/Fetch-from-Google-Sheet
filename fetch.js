const sheetId = "1RnLw2telCXMWA26DbH1OXOQpsqvr8QSIH1qUsQU5ADM";
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = "user-data";
const query = encodeURIComponent("Select *");
const url = `${base}&sheet=${sheetName}&tq=${query}`;
console.log("jsonData");

const data = [];
document.addEventListener("DOMContentLoaded", init);
function init() {
  fetch(url)
    .then((res) => res.text())
    .then((rep) => {
      //   console.log(rep);
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      console.log(jsonData);
      let data = [];
      object = jsonData.table.rows;
      for (const [key, value] of Object.entries(object)) {
        // console.log(key, value["c"][0]["v"]);
        data.push(value["c"][0]["v"]);
      }

      console.log(data);
      let place_regx = /([A-Z])\w+/g;
      let time_regx = /[0-9][0-9][:][0-9][0-9][" "][AP][M]/g;
      let old_regx = /["{"][" "]([0-9][0-9])[" "]["}"]/g;
      let new_regx = /["["][" "]([0-9][0-9])[" "]["]"]/g;
      let remove_bra = /[{}]|[[]]/g;
      let place = [],
        time = [],
        old_data = [];
      new_data = [];
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i].match(place_rex));
        place.push(data[i].match(place_regx).slice(0, -1).join(" "));
        time.push(data[i].match(time_regx)[0]);
        // console.log(data[i].match(old_regx));
        console.log(data[i].match(new_regx));

        if (data[i].match(old_regx) == null) {
          old_data.push("-");
        } else {
          // console.log(data[i].match(old_regx)[0].replace(remove_bra, ""));
          old_data.push(
            data[i]
              .match(old_regx)[0]
              .replace(remove_bra, "")
              .replaceAll(" ", "")
          );
        }
        if (data[i].match(new_regx) == null) {
          new_data.push(["-"]);
        } else {
          new_data.push(data[i].match(new_regx));
        }
      }
      console.log(place);
      console.log(time);
      console.log(old_data);
      console.log(new_data);

      // old__new_data.forEach((item) => {
      //   console.log(item);
      // });
    });
}
