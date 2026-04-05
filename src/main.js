import {render} from './render.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';

// Находим места в index.html, куда будем вставлять код
const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

// Отрисовываем фильтры в шапку
render(new FilterView(), siteHeaderElement);

// Создаем презентер и передаем ему контейнер, куда рисовать остальное
const boardPresenter = new BoardPresenter({boardContainer: siteMainElement});
boardPresenter.init();
