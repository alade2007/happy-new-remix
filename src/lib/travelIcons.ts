import { faBed, faCompass, faMapLocationDot, faPlaneDeparture, faUtensils, faTrain, faRoute, faCoins, faGem, faPersonWalking, faPeopleRoof } from "@fortawesome/free-solid-svg-icons";

export const travelIcons = { stay: faBed, tour: faCompass, route: faRoute, flight: faPlaneDeparture, dining: faUtensils, transit: faTrain } as const;
export type TravelIconKind = keyof typeof travelIcons;
export const editorialIcons = { destinations: faMapLocationDot, "travel-tips": faCompass, "food-culture": faUtensils, adventure: faCompass, "budget-travel": faCoins, "luxury-travel": faGem, "solo-travel": faPersonWalking, "family-travel": faPeopleRoof };