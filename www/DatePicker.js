/**
 * Cordova DatePicker Plugin
 * Copyright (c) Greg Allen 2011
 * MIT Licensed
 *
 * Updated for Cordova 2.1 by Robert (Jamie) Munro
 * Updated to Phonegap 3.0.0 by Jens Krause (www.websector.de)
 */

var exec = require('cordova/exec');
/**
 * Constructor
 */
function DatePicker() {
    this._callback;
}

/**
 * show - true to show the ad, false to hide the ad
 */
DatePicker.prototype.show = function(options, cb) {
    var padDate = function(date) {
      if (date.length == 1) {
        return ("0" + date);
      }
      return date;
    };

    if (options.date) {
        options.date = options.date.getFullYear() + "-" +
                       padDate(options.date.getMonth()+1) + "-" +
                       padDate(options.date.getDate()) +
                       "T" + padDate(options.date.getHours()) + ":" +
                       padDate(options.date.getMinutes()) + ":00Z";
    }
    var defaults = {
        mode : 'datetime',
        date : '',
        allowOldDates : true,
        allowFutureDates : true
    };

    for (var key in defaults) {
        if (typeof options[key] !== "undefined")
            defaults[key] = options[key];
    }
    this._callback = cb;

    exec(null, 
      null, 
      "DatePicker", 
      "show",
      [defaults]
    );
};

DatePicker.prototype._dateSelected = function(date) {
  console.log("_dateSelected " + date);
    var d = new Date(parseFloat(date) * 1000);
    if (this._callback)
        this._callback(d);
}

var datePicker = new DatePicker();
module.exports = datePicker
