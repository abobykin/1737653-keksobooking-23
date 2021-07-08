import { setFormDisabled, setFilterDisabled, setFilterEnabled } from './utils/app-state.js';
import { validateAdvertForm } from './form/validation.js';
import { createMap, showMarkersOnMap } from './map/map.js';
import { getData } from './data/api.js';
import { mapFiltering } from './map/filter.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;

setFormDisabled();
setFilterDisabled();
createMap();

getData((adverts) => {
  showMarkersOnMap(adverts);
  setFilterEnabled();
  mapFiltering(debounce(
    () => showMarkersOnMap(adverts),
    RERENDER_DELAY,
  ));
});

validateAdvertForm();
