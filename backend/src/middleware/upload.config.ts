import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export const UPLOADS_ROOT = path.resolve(here, '../uploads');

export const UPLOADS_BASE = path.dirname(UPLOADS_ROOT);