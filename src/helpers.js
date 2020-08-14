// for when "scroll to map"/"go to top" buttons clicked
export const smoothScroll = ref => {
  ref.current.scrollIntoView({
    behavior: 'smooth'
  });
};

// map route numbers to names (not exported but used by fetchVehicleLocations)
const routeMap = {
  '801': 'A',
  '802': 'B',
  '803': 'C',
  '804': 'L',
  '805': 'D',
  '806': 'E'
};

export const fetchVehicleLocations = setFunc => {
  fetch(`https://api.metro.net/agencies/lametro-rail/vehicles/`)
    .then(res => res.json())
    .then(json => {
      const newLocations = [];
      const vehicles = json.items;
      for (const vehicle of vehicles) {
        newLocations.push({
          route: routeMap[vehicle.route_id],
          lat: vehicle.latitude,
          lon: vehicle.longitude,
          direction: vehicle.run_id ? vehicle.run_id[4] : null,
          vehicleId: vehicle.id
        });
      }
      setFunc(newLocations);
    });
};

// getting destination station from direction
export const getDestination = (direction, dest0, dest1) => {
  switch (direction) {
    case '0':
      return dest0;
    case '1':
      return dest1;
    default:
      return 'unknown destination';
  }
};
