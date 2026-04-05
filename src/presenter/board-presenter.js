import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    // Отрисовываем сортировку
    render(this.sortComponent, this.boardContainer);
    // Отрисовываем контейнер для списка (ul)
    render(this.eventListComponent, this.boardContainer);

    // Отрисовываем форму редактирования (1 шт, первая в списке)
    render(new EventEditView(), this.eventListComponent.getElement());

    // Отрисовываем 3 точки маршрута
    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  }
}
