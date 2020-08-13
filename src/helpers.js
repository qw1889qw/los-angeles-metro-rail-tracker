// map route numbers to names
const routeMap = {
  '801': 'A',
  '802': 'B',
  '803': 'C',
  '804': 'L',
  '805': 'D',
  '806': 'E'
};

export const fetchVehicleLocations = setFunc => {
  // API returns XML
  // have to set current time pretty far in the past or the NextBus API will give strange output
  const currentTime = new Date().getTime() - 60000;
  Promise.all([
    fetch(
      `http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=lametro-rail&r=801&t=${currentTime}`
    ),
    fetch(
      `http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=lametro-rail&r=802&t=${currentTime}`
    ),
    fetch(
      `http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=lametro-rail&r=803&t=${currentTime}`
    ),
    fetch(
      `http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=lametro-rail&r=804&t=${currentTime}`
    ),
    fetch(
      `http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=lametro-rail&r=805&t=${currentTime}`
    ),
    fetch(
      `http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=lametro-rail&r=806&t=${currentTime}`
    )
  ])
    .then(([res801, res802, res803, res804, res805, res806]) =>
      Promise.all([
        res801.text(),
        res802.text(),
        res803.text(),
        res804.text(),
        res805.text(),
        res806.text()
      ])
    )
    .then(([text801, text802, text803, text804, text805, text806]) =>
      Promise.all([
        new DOMParser().parseFromString(text801, 'text/xml'),
        new DOMParser().parseFromString(text802, 'text/xml'),
        new DOMParser().parseFromString(text803, 'text/xml'),
        new DOMParser().parseFromString(text804, 'text/xml'),
        new DOMParser().parseFromString(text805, 'text/xml'),
        new DOMParser().parseFromString(text806, 'text/xml')
      ])
    )
    .then(([data801, data802, data803, data804, data805, data806]) => {
      const [
        blueVehicles,
        redVehicles,
        greenVehicles,
        goldVehicles,
        purpleVehicles,
        expoVehicles
      ] = [
        data801.getElementsByTagName('vehicle'),
        data802.getElementsByTagName('vehicle'),
        data803.getElementsByTagName('vehicle'),
        data804.getElementsByTagName('vehicle'),
        data805.getElementsByTagName('vehicle'),
        data806.getElementsByTagName('vehicle')
      ];
      const allVehicles = [
        blueVehicles,
        redVehicles,
        greenVehicles,
        goldVehicles,
        purpleVehicles,
        expoVehicles
      ];
      const newLocations = [];
      allVehicles.forEach(vehicleGroup => {
        for (const vehicle of vehicleGroup) {
          const route = vehicle.getAttribute('routeTag');
          const lat = vehicle.getAttribute('lat');
          const lon = vehicle.getAttribute('lon');
          // sometimes the API will return a vehicle w/ lat & lon set to 0.0 which is meaningless
          // also might get a vehicle w/o a routeTag which is also meaningless
          if (route && lat !== '0.0' && lon !== '0.0') {
            newLocations.push({
              route: routeMap[route],
              lat,
              lon
            });
          }
        }
      });
      setFunc(newLocations);
    });
};
