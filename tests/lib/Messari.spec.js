//Modules
const fs = require('fs');
const mocha = require('mocha');
const chai = require('chai');
var should = chai.should();

const Messari = require('../../lib/Messari');

const shared = require('../shared');

describe('Messari', function () {
    beforeEach(function (done) {
        this.MessariClient = new Messari();

        done();
    });

    describe('markets', function () {

        describe('all', function () {
            beforeEach(function (done) {
                this.MessariClient.markets.all().then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });
    });

    describe('assets', function () {
        describe('all', function () {
            beforeEach(function (done) {
                this.MessariClient.assets.all().then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();

            describe('metrics', function () {
                beforeEach(function (done) {
                    this.MessariClient.assets.all({
                        metrics: true
                    }).then((data) => {
                        this.data = data;
                        done();
                    });
                });

                shared.shouldBeAValidRequest();
            });

            describe('profiles', function () {
                beforeEach(function (done) {
                    this.MessariClient.assets.all({
                        profiles: true
                    }).then((data) => {
                        this.data = data;
                        done();
                    });
                });

                shared.shouldBeAValidRequest();
            });
        });

        describe('fetchProfile', function () {
            beforeEach(function (done) {
                this.MessariClient.assets.fetchProfile("btc").then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('fetchMetrics', function () {
            beforeEach(function (done) {
                this.MessariClient.assets.fetchMetrics("btc").then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });
    });

    describe('news', function () {
        describe('all', function () {
            beforeEach(function (done) {
                this.MessariClient.news.all().then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });

        describe('fetchBySymbol', function () {
            beforeEach(function (done) {
                this.MessariClient.news.fetchBySymbol("btc").then((data) => {
                    this.data = data;
                    done();
                });
            });

            shared.shouldBeAValidRequest();
        });
    });

});
