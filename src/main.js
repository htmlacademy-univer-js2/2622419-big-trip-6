import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');
const newEventButtonComponent = document.querySelector('.trip-main__event-add-btn'); // Нашли кнопку

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

// Функция, которая сработает, когда мы закроем форму создания (разблокирует кнопку)
const handleNewPointFormClose = () => {
  newEventButtonComponent.disabled = false;
};

const boardPresenter = new BoardPresenter({
  boardContainer: eventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose // Передали колбэк на доску
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  pointsModel
});

// Вешаем слушатель на кнопку New Event
newEventButtonComponent.addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createPoint(); // Создаем точку
  newEventButtonComponent.disabled = true; // Блокируем кнопку, чтобы не наоткрывали 10 форм
});

filterPresenter.init();
boardPresenter.init();
