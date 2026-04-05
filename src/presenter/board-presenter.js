import {render, replace} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #boardPoints = [];
  #boardDestinations = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.getPoints()];
    this.#boardDestinations = [...this.#pointsModel.getDestinations()];

    render(this.#sortComponent, this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardDestinations);
    }
  }

  #renderPoint(point, destinations) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const destination = destinations.find((dest) => dest.id === point.destination);

    const pointComponent = new EventView({
      point,
      destination,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const pointEditComponent = new EventEditView({
      point,
      destination,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollupClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }
}
