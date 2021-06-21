import { setFormDisabled, setFormEnabled } from './utils/app-state.js';
import { validateAdvertForm } from './utils/validation.js';

setFormDisabled();
setTimeout(setFormEnabled, 1000);

validateAdvertForm();

