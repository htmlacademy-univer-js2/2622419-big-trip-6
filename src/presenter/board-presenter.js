import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardDestinations = [...this.pointsModel.getDestinations()];

    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      const point = this.boardPoints[i];
      const destination = this.boardDestinations.find((dest) => dest.id === point.destination);

      render(new EventView({point, destination}), this.eventListComponent.getElement());
    }
  }
}
