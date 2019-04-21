/**
 * @description The base url for the Messari API
 * @kind constant
 */
const BASE = 'https://data.messari.io/api/';

/**
 * @description The host of the Messari API
 * @kind constant
 */
const HOST = 'data.messari.io';

/**
 * @description The current version for the Messari API
 * @kind constant
 */
const API_VERSION = '1';

/**
 * @description The Messari URI according to base and current version
 * @kind constant
 */
const URI = `${BASE}v${API_VERSION}`;

/**
 * @description The current accepted methods for Messari API calls
 * @kind constant
 */
const ACCEPTED_METHODS = [
    'GET',
];

//

module.exports = {
    BASE,
    HOST,
    API_VERSION,
    URI,
    ACCEPTED_METHODS,
};
