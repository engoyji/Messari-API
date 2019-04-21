'use strict';

//Modules
const https = require('https');
const querystring = require('querystring');

//Helpers
const Utils = require('./helpers/utilities');
const Constants = require('./helpers/constants');
const ReturnObject = require('./helpers/ReturnObject');

/**
 * @class Messari
 * @author Mark Miscavage <markmiscavage@protonmail.com>
 * @description A Node.js wrapper for the Messari API with no dependencies. For more information, visit: https://messari.io/api
 * @example
 *     const Messari = require('messari-api');
 *     const MessariClient = new Messari();
 * @public
 * @version 1.0.0
 * @license MIT
 * @kind class
 */
class Messari {

    /**
     * @description Calls related to markets
     */
    get markets() {
        const pathPrefix = 'markets';

        return {

            /**
             * @description Get the list of all exchanges and pairs that the Messari API supports
             * @function markets.all()
             * @async
             * @returns {ReturnObject}
             */
            all: async() => {
                const method = 'GET';
                let path = `/${pathPrefix}`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },
        };
    };

    /**
     * @description Calls related to assets
     */
    get assets() {
        const pathPrefix = 'assets';

        return {

            /**
             * @description Get the list of all crypto assets that the Messari API supports.
             * @function assets.all()
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {boolean} params.metrics -  Filter results to those with metrics (quantitative)
             * @param {boolean} params.profiles - Filter results to those with profiles (qualitative)
             * @returns {ReturnObject}
             */
            all: async(params={}) => {
                const method = 'GET';
                let path = `/${pathPrefix}`;

                //If params exist, transform into query strings as required by the Messari API
                if (Utils.isObject(params)) {
                    if (params["metrics"] !== undefined) {
                        params["with-metrics"] = params["metrics"];
                        delete params["metrics"];
                    }

                    if (params["profiles"] !== undefined) {
                        params["with-profiles"] = params["profiles"];
                        delete params["profiles"];
                    }
                }

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get fundamental information by asset symbol
             * @function assets.fetchProfile()
             * @async
             * @param {string} assetSymbol - (Required) The asset symbol (can be obtained from assets.all()) eg. btc
             * @returns {ReturnObject}
             */
            fetchProfile: async(assetSymbol) => {
                //Must have exchangeId
                if (!Utils.isString(assetSymbol) || Utils.isStringEmpty(assetSymbol)) Utils._WARN_('Invalid parameter', 'assetSymbol must be of type: String and greater than 0 characters.');

                const method = 'GET';
                let path = `/${pathPrefix}/${assetSymbol}/profile`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get quantitative metrics by asset symbol.
             * @function assets.fetchMetrics()
             * @async
             * @param {string} assetSymbol - (Required) The asset symbol (can be obtained from assets.all()) eg. btc
             * @returns {ReturnObject}
             */
            fetchMetrics: async(assetSymbol) => {
                //Must have exchangeId
                if (!Utils.isString(assetSymbol) || Utils.isStringEmpty(assetSymbol)) Utils._WARN_('Invalid parameter', 'assetSymbol must be of type: String and greater than 0 characters.');

                const method = 'GET';
                let path = `/${pathPrefix}/${assetSymbol}/metrics`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },
        };
    };

    /**
     * @description Calls related to news
     */
    get news() {
        const pathPrefix = 'news';

        return {

            /**
             * @description Get the latest 50 curated articles of news and analysis for all assets
             * @function news.all()
             * @async
             * @returns {ReturnObject}
             */
            all: async() => {
                const method = 'GET';
                let path = `/${pathPrefix}`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get the latest 50 curated articles of news and analysis by asset symbol
             * @function news.fetchBySymbol()
             * @async
             * @param {string} assetSymbol - (Required) The asset symbol (can be obtained from assets.all()) eg. btc
             * @returns {ReturnObject}
             */
            fetchBySymbol: async(assetSymbol) => {
                const method = 'GET';
                let path = `/${pathPrefix}/${assetSymbol}`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },
        };
    };

    /**
     * @description Build options for https.request
     * @function _buildRequestOptions
     * @protected
     * @param {string} path - Relative path for API
     * @param {object} params - Object representing query strings for url parameters
     * @returns {Object} - {path, method, host, port} Options for request
     */
    _buildRequestOptions(method, path, params) {
        //Transform to uppercase
        method = method.toUpperCase();

        //Stringify object params if exist
        if (Utils.isObject(params)) params = querystring.stringify(params);
        else params = undefined;

        //Make relative path
        //Check if has params, append accordingly
        if (params == undefined) path = `/api/v${Constants.API_VERSION}${path}`;
        else path = `/api/v${Constants.API_VERSION}${path}?${params}`;

        //Create options
        let options = {
            path,
            method,
            host: Constants.HOST,
            port: 443,
        };

        //Return options
        return options;
    };

    /**
     * @description Perform https request
     * @function _request
     * @protected
     * @param {object} options - https.request options (from _buildRequestOptions())
     * @returns {Promise} Body of https request data results
     */
    _request(options) {
        return new Promise((resolve, reject) => {
            //Perform request
            let req = https.request(options, (res) => {
                let body = [];

                //Set body on data
                res.on('data', (chunk) => {
                    body.push(chunk);
                });

                //On end, end the Promise
                res.on('end', () => {
                    try {
                        body = Buffer.concat(body);
                        body = body.toString();

                        //Check if page is returned instead of JSON
                        if (body.startsWith('<!DOCTYPE html>')) Utils._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');

                        //Attempt to parse
                        body = JSON.parse(body);
                    }
                    catch (error) {
                        reject(error);
                    };

                    //Create return object
                    resolve(
                        ReturnObject(
                            !(res.statusCode < 200 || res.statusCode >= 300),
                            res.statusMessage,
                            res.statusCode,
                            body,
                        )
                    );
                });
            });

            //On error, reject the Promise
            req.on('error', (error) => reject(error));

            //End request
            req.end();
        });
    };
};

//Set Constants
Messari.API_VERSION = Constants.API_VERSION;
Messari.ACCEPTED_METHODS = Constants.ACCEPTED_METHODS;

//

module.exports = exports = Messari;
