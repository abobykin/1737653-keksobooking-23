import { setFormDisabled, setFilterDisabled, setFilterEnabled } from './utils/app-state.js';
import { validateAdvertForm } from './form/validation.js';
import { createMap, showMarkersOnMap } from './map/map.js';
import { getData } from './data/api.js';
import { mapFiltering, showFilteredMarkersOnMap } from './map/filter.js';
import { debounce } from './utils/debounce.js';
import { imgUpload } from './form/file-upload.js';

const RERENDER_DELAY = 500;

setFormDisabled();
setFilterDisabled();
createMap();

getData((adverts) => {
  showMarkersOnMap(adverts);
  setFilterEnabled();
  mapFiltering(debounce(
    () => showFilteredMarkersOnMap(adverts),
    RERENDER_DELAY,
  ));
});

validateAdvertForm();
imgUpload();
