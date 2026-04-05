import { getRandomPoint, getMockDestinations, getMockOffers } from '../mock/mock.js';

export default class PointsModel {
  // Генерируем 3 случайные точки
  points = Array.from({length: 3}, getRandomPoint);
  destinations = getMockDestinations();
  offers = getMockOffers();

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
