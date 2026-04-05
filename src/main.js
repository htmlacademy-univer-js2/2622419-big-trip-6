import {render} from './framework/render.js'; // ИМПОРТ ИЗ ФРЕЙМВОРКА
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  pointsModel,
});

// Теперь этот render поймет новые компоненты
render(new FilterView(), siteHeaderElement);

boardPresenter.init();
