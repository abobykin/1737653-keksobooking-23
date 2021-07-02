import { setFormDisabled, setFilterDisabled } from './utils/app-state.js';
import { validateAdvertForm } from './form/validation.js';
import { createMap } from './map/map.js';
import { getData } from './data/api.js';

setFormDisabled();
setFilterDisabled();
createMap();
getData();
validateAdvertForm();
