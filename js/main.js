import { setFormDisabled } from './utils/app-state.js';
import { validateAdvertForm } from './utils/validation.js';
import { createMap } from './map/map.js';

setFormDisabled();
createMap();
validateAdvertForm();
