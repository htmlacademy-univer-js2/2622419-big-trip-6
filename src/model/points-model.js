import Observable from '../framework/observable.js';
import {getRandomPoint, getMockDestinations, getMockOffers} from '../mock/mock.js';

const POINT_COUNT = 5;

// Наследуемся от Observable
export default class PointsModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #destinations = getMockDestinations();
  #offers = getMockOffers();

  // Превращаем старые методы getPoints() в геттеры (теперь обращаемся к ним как this.pointsModel.points)
  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  // Метод обновления точки (когда нажали Save в форме редактирования)
  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    // Оповещаем презентеры, что данные изменились
    this._notify(updateType, update);
  }

  // Метод добавления новой точки
  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  // Метод удаления точки (когда нажали Delete)
  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
