export default function objectify(jsonData) {
  let extractedData = [];
  let obj = {};

  if (
    jsonData.name === 'cities' &&
    jsonData.children &&
    jsonData.children[3] &&
    jsonData.children[3].name === 'list' &&
    jsonData.children[3].children.length > 0
  ) {
    for (
      let i = 0;
      jsonData.children[3].children && i < jsonData.children[3].children.length;
      i++
    ) {
      for (
        let j = 0;
        jsonData.children[3].children[i].children &&
        j < jsonData.children[3].children[i].children.length;
        j++
      ) {
        switch (jsonData.children[3].children[i].children[j].name) {
          case 'city':
            obj.id = jsonData.children[3].children[i].children[j].attributes.id;
            obj.name =
              jsonData.children[3].children[i].children[j].attributes.name;
            for (
              let k = 0;
              jsonData.children[3].children[i].children[j].children &&
              k < jsonData.children[3].children[i].children[j].children.length;
              k++
            ) {
              if (jsonData.children[3].children[i].children[j].children[k]) {
                if (k === 0) {
                  obj.lon =
                    jsonData.children[3].children[i].children[j].children[
                      k
                    ].attributes.lon;
                  obj.lat =
                    jsonData.children[3].children[i].children[j].children[
                      k
                    ].attributes.lat;
                }
                if (k === 1) {
                  obj.country =
                    jsonData.children[3].children[i].children[j].children[
                      k
                    ].value;
                }
                if (k === 2) {
                  obj.rise =
                    jsonData.children[3].children[i].children[j].children[
                      k
                    ].attributes.rise;
                  obj.set =
                    jsonData.children[3].children[i].children[j].children[
                      k
                    ].attributes.set;
                }
              }
            }
            break;
          case 'temperature':
            obj.max =
              jsonData.children[3].children[i].children[j].attributes.max;
            obj.min =
              jsonData.children[3].children[i].children[j].attributes.min;
            obj.temp =
              jsonData.children[3].children[i].children[j].attributes.value;
            break;
          case 'feels_like':
            obj.feelsLike =
              jsonData.children[3].children[i].children[j].attributes.value;
            break;
          case 'humidity':
            obj.humidity =
              jsonData.children[3].children[i].children[j].attributes.value;
            break;
          case 'pressure':
            obj.pressure =
              jsonData.children[3].children[i].children[j].attributes.value;
            break;
          case 'wind':
            for (
              let k = 0;
              jsonData.children[3].children[i].children[j].children &&
              k < jsonData.children[3].children[i].children[j].children.length;
              k++
            ) {
              if (jsonData.children[3].children[i].children[j].children[k]) {
                if (k === 0) {
                  obj.windCondition =
                    jsonData.children[3].children[i].children[j].children[
                      k
                    ].attributes.name;
                  obj.speed =
                    jsonData.children[3].children[i].children[j].children[
                      k
                    ].attributes.value;
                }
                if (k === 1) {
                  obj.directionDesc =
                    jsonData.children[3].children[i].children[j].children[
                      k
                    ].attributes.name;
                  obj.code =
                    jsonData.children[3].children[i].children[j].children[k]
                      .attributes.code +
                    ' ' +
                    jsonData.children[3].children[i].children[j].children[k]
                      .attributes.value;
                }
              }
            }
            break;
          case 'clouds':
            obj.clouds =
              jsonData.children[3].children[i].children[j].attributes.value;
            obj.cloudCondition =
              jsonData.children[3].children[i].children[j].attributes.name;
            break;
          case 'weather':
            obj.weatherIcon =
              jsonData.children[3].children[i].children[j].attributes.icon;
            obj.weatherCondition =
              jsonData.children[3].children[i].children[j].attributes.value;
            break;
          case 'lastupdate':
            obj.lastupdateUNIX =
              jsonData.children[3].children[i].children[j].attributes.unix;
            obj.lastupdateTime =
              jsonData.children[3].children[i].children[j].attributes.value;
            break;
          default:
            break;
        }
      }
      extractedData.push(obj);
      obj = {};
    }
  }
  return extractedData;
}
