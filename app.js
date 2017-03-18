/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(7);

var _ai = __webpack_require__(9);

var default_speed = 0.8; //pixels per millisecond
var dom_node_id = "#canvas";
var interval = 15;

var store = {
    gun: null,
    target: null,
    painter: null,
    alfred: null,
    summary: null
};

function initializeListeners() {
    $(dom_node_id).on("mousemove", function (e) {
        var dist_x = e.clientX - store.gun.x_pos,
            dist_y = e.clientY - store.gun.y_pos,
            angle = Math.atan(dist_y / dist_x);

        store.gun.angle = angle;
    });

    $(dom_node_id).on("click", function (e) {
        var dist_x = e.clientX - store.gun.x_pos,
            dist_y = e.clientY - store.gun.y_pos;

        var bullet = store.gun.shoot(default_speed);
        store.target.isImpact(bullet, store.gun);
    });

    $(document).on("keydown", function (e) {
        var move = null;
        switch (e.which) {
            case 38:
                move = "UP";
                break;
            case 40:
                move = "DOWN";
                break;
        }

        store.target.setActiveMove(move);

        e.preventDefault();
    });

    $(document).on("keyup", function (e) {
        store.target.setActiveMove(null);
        e.preventDefault();
    });
}

$(document).ready(function () {
    var gun_height = Math.round(window.innerHeight / 2),
        gun = new _core.Gun(0, 30, gun_height, "gun_1");

    store.gun = gun;

    store.target = new _core.Target(window.innerWidth - 60, 30, 20, 60, 90, default_speed);

    store.painter = new _core.Painter(dom_node_id);

    store.alfred = new _ai.Alfred(interval);

    store.summary = new _core.Summary();

    initializeListeners();

    window.setInterval(function () {

        store.painter.draw(store.gun, store.target, store.summary);

        store.summary.update(store.gun, store.target);

        var move = store.alfred.decide(store.gun, store.target);

        store.target.setActiveMove(move);
    }, interval);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
    function Bullet(x_pos, y_pos, angle, speed, timestamp) {
        _classCallCheck(this, Bullet);

        this.angle = angle;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.speed = speed;
        this.timestamp = timestamp;
    }

    _createClass(Bullet, [{
        key: "move",
        value: function move(timestamp) {
            var time_elapsed = timestamp - this.timestamp,
                distance_travelled = time_elapsed * this.speed; //pixels

            this.x_pos += Math.cos(this.angle) * distance_travelled;
            this.y_pos += Math.sin(this.angle) * distance_travelled;

            if (this.y_pos <= 0 || this.y_pos >= window.innerHeight) {
                this.angle = -this.angle;
                this.y_pos += Math.sin(this.angle) * distance_travelled;
            }

            this.timestamp = timestamp;
        }
    }, {
        key: "render",
        value: function render() {
            this.move(new Date().getTime());

            var style = "top:" + this.y_pos + ";left:" + this.x_pos;
            var htmlString = "<div class='bullet' style=" + style + ">&nbsp;</div>";
            return htmlString;
        }
    }]);

    return Bullet;
}();

exports.default = Bullet;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gun = function () {
    function Gun(angle, x_pos, y_pos, id) {
        _classCallCheck(this, Gun);

        this.angle = angle;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.id = id;
        this.bullets = [];
    }

    _createClass(Gun, [{
        key: "filterBullets",
        value: function filterBullets() {
            this.bullets = this.bullets.filter(function (bullet) {
                return bullet.x_pos >= 0 && bullet.x_pos <= window.innerWidth;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var angle_in_deg = this.angle * (180 / Math.PI);
            var style = "top:" + this.y_pos + ";left:" + this.x_pos + ";transform:rotate(" + angle_in_deg + "deg)";
            var htmlString = "<div id=" + this.id + " class='gun' style=" + style + ">&nbsp;</div>";

            this.filterBullets();

            this.bullets.forEach(function (bullet) {
                htmlString += bullet.render();
            });

            return htmlString;
        }
    }, {
        key: "shoot",
        value: function shoot(speed) {
            var bullet = new _.Bullet(this.x_pos + 10, this.y_pos + 6, this.angle, speed, new Date().getTime());

            this.bullets.push(bullet);

            return bullet;
        }
    }]);

    return Gun;
}();

exports.default = Gun;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Painter = function () {
    function Painter(dom_node) {
        _classCallCheck(this, Painter);

        this.dom_node = dom_node;
    }

    _createClass(Painter, [{
        key: "draw",
        value: function draw(gun, target, summary) {

            var elements = "";

            if (summary.active) {

                elements = gun.render();

                elements += target.render();

                elements += summary.render();
            } else {

                elements += summary.render();
            }

            $(this.dom_node).html(elements);
        }
    }]);

    return Painter;
}();

exports.default = Painter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Summary = function () {
	function Summary() {
		_classCallCheck(this, Summary);

		this.score = 0;
		this.start_time = new Date().getTime();
		this.active = true;
		this.end_time = null;
	}

	_createClass(Summary, [{
		key: "update",
		value: function update(gun, target) {
			var target_y1 = target.y_pos,
			    target_y2 = target_y1 + target.height,
			    target_x1 = target.x_pos,
			    target_x2 = target_x1 + target.width;

			gun.bullets.forEach(function (bullet) {

				if (bullet.x_pos >= target_x1 && bullet.x_pos <= target_x2 && bullet.y_pos >= target_y1 && bullet.y_pos <= target_y2) {
					this.score++;
				}
			}, this);

			if (this.score >= 2 && this.active == true) {
				this.active = false;
				this.end_time = new Date().getTime();
			}
		}
	}, {
		key: "getGameDuration",
		value: function getGameDuration() {
			var duration = this.end_time - this.start_time;

			return parseInt(duration / 1000);
		}
	}, {
		key: "render",
		value: function render() {
			var htmlString = "";

			if (this.active) {
				htmlString = "<div class='summary'>" + this.score + "</div>";
			} else {
				htmlString = "<div class='summary'>You won in " + this.getGameDuration() + " seconds!</div>";
			}

			return htmlString;
		}
	}]);

	return Summary;
}();

exports.default = Summary;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Target = function () {
    function Target(x_pos, y_pos, width, height, angle, speed) {
        _classCallCheck(this, Target);

        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.speed = speed;
        this.active_move = {
            move: null,
            timestamp: new Date().getTime()
        };
    }

    _createClass(Target, [{
        key: "setActiveMove",
        value: function setActiveMove(new_move) {
            if (["UP", "DOWN", null].indexOf(new_move) != -1) {
                this.active_move = {
                    move: new_move,
                    timestamp: new Date().getTime()
                };
            }
        }
    }, {
        key: "finalY",
        value: function finalY(bullet, gun, x_pos) {
            var x_dist = x_pos - bullet.x_pos,
                y_dist = x_dist * Math.tan(bullet.angle) + (bullet.y_pos - gun.y_pos),
                max_y = window.innerHeight - gun.y_pos,
                final_y = 0;

            var y_val = y_dist % max_y;

            var divider = Math.floor(Math.abs(y_dist / max_y)) - 1;
            if (divider === -1) final_y = gun.y_pos + y_val;else if (divider % 2 === 0) {
                var angle = divider % 4 === 0 ? bullet.angle : -bullet.angle;
                if (angle < 0) {
                    final_y = Math.abs(y_val);
                } else {
                    final_y = window.innerHeight - Math.abs(y_val);
                }
            } else {
                var angle = (divider - 1) % 4 === 0 ? -bullet.angle : bullet.angle;
                if (angle > 0) final_y = gun.y_pos + Math.abs(y_val);else final_y = gun.y_pos - Math.abs(y_val);
            }

            return final_y;
        }
    }, {
        key: "move",
        value: function move() {

            var timestamp = new Date().getTime(),
                time_elapsed = timestamp - this.active_move.timestamp,
                distance_travelled = time_elapsed * this.speed; //pixels

            var y_pos = this.y_pos;

            switch (this.active_move.move) {
                case "UP":
                    y_pos -= distance_travelled;
                    break;

                case "DOWN":
                    y_pos += distance_travelled;
                    break;

                default:
                    return;
            }

            if (y_pos < 0) y_pos = 0;else if (y_pos + this.height > window.innerHeight) y_pos = window.innerHeight - this.height;

            this.y_pos = y_pos;
            this.active_move.timestamp = timestamp;
        }
    }, {
        key: "isImpact",
        value: function isImpact(bullet, gun) {

            var x_pos = this.x_pos;

            while (x_pos <= this.x_pos + this.width) {

                var final_y = this.finalY(bullet, gun, x_pos);

                var is_impact = final_y >= this.y_pos && final_y <= this.y_pos + this.height;

                if (is_impact) return true;

                x_pos += 1;
            }

            return false;
        }
    }, {
        key: "preferredDirection",
        value: function preferredDirection(bullet, gun) {

            var final_y = this.finalY(bullet, gun, this.x_pos);

            var difference_top = Math.abs(this.y_pos - final_y);
            var difference_bottom = Math.abs(this.y_pos + this.height - final_y);

            if (difference_top > difference_bottom) {
                if (this.y_pos - difference_bottom >= 0) return "UP";else return "DOWN";
            } else {
                if (this.y_pos + this.height + difference_top <= window.innerHeight) return "DOWN";else return "UP";
            }
        }
    }, {
        key: "firstToImpact",
        value: function firstToImpact(gun) {

            var firstToImpact = null,
                impactDistance = null;

            for (var i in gun.bullets) {

                var bullet = gun.bullets[i];

                if (this.isImpact(bullet, gun)) {

                    var dist = this.x_pos - bullet.x_pos;

                    if (impactDistance == null || dist < impactDistance) {

                        firstToImpact = bullet;
                        impactDistance = dist;
                    }
                }
            }

            return firstToImpact;
        }
    }, {
        key: "render",
        value: function render() {

            this.move();

            var style = "width:" + this.width + ";height:" + this.height + ";top:" + this.y_pos + ";left:" + this.x_pos;
            var htmlString = "<div class='target' style=" + style + ">&nbsp;</div>";
            return htmlString;
        }
    }]);

    return Target;
}();

exports.default = Target;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Target = exports.Summary = exports.Painter = exports.Gun = exports.Bullet = undefined;

var _bullet = __webpack_require__(2);

var _bullet2 = _interopRequireDefault(_bullet);

var _gun = __webpack_require__(3);

var _gun2 = _interopRequireDefault(_gun);

var _painter = __webpack_require__(4);

var _painter2 = _interopRequireDefault(_painter);

var _summary = __webpack_require__(5);

var _summary2 = _interopRequireDefault(_summary);

var _target = __webpack_require__(6);

var _target2 = _interopRequireDefault(_target);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Bullet = _bullet2.default;
exports.Gun = _gun2.default;
exports.Painter = _painter2.default;
exports.Summary = _summary2.default;
exports.Target = _target2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alfred = function () {
	function Alfred(interval) {
		_classCallCheck(this, Alfred);

		//initialize brain

		this.interval = interval;
	}

	_createClass(Alfred, [{
		key: "decide",
		value: function decide(gun, target) {

			var impacting_bullet = target.firstToImpact(gun);

			if (impacting_bullet != null) {

				var result = target.preferredDirection(gun, impacting_bullet);

				return result;
			}

			return null;
		}
	}]);

	return Alfred;
}();

exports.default = Alfred;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alfred = undefined;

var _alfred = __webpack_require__(8);

var _alfred2 = _interopRequireDefault(_alfred);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Alfred = _alfred2.default;

/***/ })
/******/ ]);