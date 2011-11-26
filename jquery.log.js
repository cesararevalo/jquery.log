/*!
 * jQuery Plugin: Log - version 0.1
 * https://github.com/cesararevalo/jquery.log
 * Javascript logger.
 *
 * Copyright (c) 2011 Cesar Arevalo <cesar@consultek.us>
 * This library is licensed under MIT license:
 * http://opensource.org/licenses/mit-license.php
 *
 * The logger has four levels, in hierarchical order they are:
 *
 * 1. DEBUG
 * 2. INFO
 * 3. WARNING
 * 4. ERROR
 *
 * The logger can be either enabled or disabled at runtime. The logger
 * is disabled by default and the default level is 'ERROR'.
 *
 * You can initialize the logger settings like this:
 *
 * var level = "DEBUG"; // "INFO", "WARNING", or "ERROR"
 * var enabled = true; // or false
 * $.log.init(level, enabled);
 *
 * You can enable or disable the logger by doing:
 *
 * $.log.settings.enabled = false; //disable
 * $.log.settings.enabled = true; // enable again
 *
 * To change the logger level:
 *
 * $.log.settings.level = "DEBUG";
 * $.log.settings.level = "INFO";
 * $.log.settings.level = "WARNING";
 * $.log.settings.level = "ERROR";
 *
 * You don't need to configure the logger to begin using it. The default log level is ERROR, and you can start using it like this:
 *
 * $.log("my debug message");
 *
 * If you want to specify the level to use for the messsage you can do it as follows:
 *
 * $.log("my debug message", 'DEBUG');
 *
 * Alternatively you can use the specific methods for the different log levels:
 *
 * $.log.debug("my debug message");
 * $.log.info("my info message");
 * $.log.warning("my warning message");
 * $.log.error("my error message");
 *
 * This plugin is compatible with browsers that support a javascript console:
 *
 * - Firefox with firebug: The console is installed with the firebug plugin, will
 *   append the messages to the firebug console.
 * - Chrome: The out-of-the-box chrome browser comes with developer tools, which include
 *   a javascript console.
 *
 * TODO: Support for browsers that do not have a console.
 * TODO: Add support for logging exception objects.
 */
(function ($) {
    $.log = function(message, level) {
	$.log.message(message, level || $.log.settings.defaultLevel);
    };

    $.extend($.log, {
	settings: {
	    /**
	     * Property for enabling logging. By default it is disabled.
	     */
	    enabled: false,
 
	    /**
	     * Different logging levels in hierarchichal order (highest top, lowest bottom):
	     * - "ERROR"
	     * - "WARNING"
	     * - "INFO"
	     * - "DEBUG"
	     */
	    level: "ERROR",

	    /**
	     * Use this level, when none is specified when calling $.log
	     */
	    defaultLevel: "ERROR"
	},

	levels: {
	    DEBUG: {
		weight: 0
	    },
	    INFO: {
		weight: 1
	    },
	    WARNING: {
		weight: 2
	    },
	    ERROR: {
		weight: 3
	    }
	},

	/**
	 * Initialization function for the log object.
	 * The clients should call this function first.
	 */
	init: function(level, enabled) {
            $.log.settings.level = level;
            $.log.settings.enabled = enabled;
	},
 
	/**
	 * Log error statements. Call this function when there is an error.
	 */
	error: function(message) {
            $.log.message(message, "ERROR", 3);
	},
	
	/**
	 * Log warning statements. Call this function when there is a warning.
	 */
	warning: function(message) {
            $.log.message(message, "WARNING", 2);
	},
	
	/**
	 * Log info statements. Call this function when there is information to be displayed.
	 */
	info: function(message) {
            $.log.message(message, "INFO", 1);
	},
	
	/**
	 * Log debug statements. Call this function when you want to debug.
	 */
	debug: function(message) {
            $.log.message(message, "DEBUG", 0);
	},
 
	/**
	 * The function where the real logging happens.
	 */
	message: function(message, level) {
	    var levelWeight = null;

	    if ($.log.levels[level] &&
		  (typeof $.log.levels[level].weight == "number")) {
		levelWeight = $.log.levels[level].weight;
	    }
	    else {
		return;
	    }

            if ($.log.settings.enabled &&
                $.log.levels[$.log.settings.level].weight <= levelWeight) {
		
		message = "[" + level + "] " + message;
		
		if (window.console) {
                    /**
                     * Firefox with Firebug has a window.console object for use as a javascript console.
		     * Also Chrome comes bundled with a javascript console.
                     * This is great for javascript and web development. Long live Firefox and Chrome!
                     */
                    switch (level) {
                    case 'ERROR' : {
                        console.error(message);
                        break;
                    }
                    case 'WARNING' : {
                        console.warn(message);
                        break;
                    }
                    case 'INFO' : {
                        console.info(message);
                        break;
                    }
                    case 'DEBUG' : {
                        console.debug(message);
                        break;
                    }
                    }
		}
		else {
                    /**
		     * TODO: We should have another messaging framework for browsers that do not have a console. Some options:
                     * - Popup.
                     * - Javascript variable that stores the message history.
                     * - Hidden div at the bottom of the page and append the logs there.
                     */
		}
            }
	}
    });
})(jQuery);