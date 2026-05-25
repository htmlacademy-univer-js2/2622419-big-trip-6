import {remove, render, RenderPosition} from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import {UserAction, UpdateType, BLANK_POINT} from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EventEditView({
      point: BLANK_POINT, // Передаем пустую точку
      destinations: destinations,
      offers: offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onRollupClick: this.#handleDeleteClick // Стрелочка вверх работает как отмена
    });

    // Рисуем форму в самом начале списка
    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy(); // Разблокируем кнопку New Event

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      // Временно генерируем случайный ID, пока нет сервера
      {...point, id: crypto.randomUUID()}
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
