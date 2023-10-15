import '@testing-library/jest-dom';
import { randomUUID } from 'crypto';

window.crypto.randomUUID = randomUUID;
