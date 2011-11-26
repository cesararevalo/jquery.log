# jQuery Plugin: Log - version 0.1

jQuery plugin for browser log messaging. It has the capability of attaching hierarchichal levels to log messages. And it can be enabled or disabled at runtime, thus preventing unnecessary logging or the ability to "debug" code after deployment.


## Configuration

The logger has four levels, in hierarchical order they are:

1. DEBUG
2. INFO
3. WARNING
4. ERROR

The logger can be either enabled or disabled at runtime. The logger is disabled by default and the default level is 'ERROR'.

You can initialize the logger settings like this:

```javascript
var level = "DEBUG"; // "DEBUG", "INFO", "WARNING", or "ERROR"
 var enabled = true; // true (enabled) or false (disabled)
 $.log.init(level, enabled);
```

You can enable or disable the logger by doing:

```javascript
$.log.settings.enabled = false; //disable
$.log.settings.enabled = true; // enable again
```

To change the logger level:

```javascript
$.log.settings.level = "DEBUG";
$.log.settings.level = "INFO";
$.log.settings.level = "WARNING";
$.log.settings.level = "ERROR";
```


## Usage

To start using the logger, you can do so like this:

```javascript
$.log("my debug message");
```

In this case the logger will use the default log level of ERROR. You are encouraged to configure the logger level, even though it is not required.

You may specify the level to use for the messsage you want to log. You can do it as follows:

```javascript
$.log("my debug message", 'DEBUG');
```

Alternatively you can use the specific methods for the different log levels:

```javascript
$.log.debug("my debug message");
$.log.info("my info message");
$.log.warning("my warning message");
$.log.error("my error message");
```


## Compatibility

Firefox: Requires Firebug's console
Chrome: Supported in ALL versions
IE: Not supported


## License

Copyright (c) 2011 Cesar Arevalo <cesar@consultek.us>
This library is licensed under the MIT license:
http://opensource.org/licenses/mit-license.php