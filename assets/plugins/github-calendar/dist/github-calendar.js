"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function (e) {
    if ("object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).GitHubCalendar = e()
    }
}(function () {
    return function e(t, r, n) {
        function a(u, s) {
            if (!r[u]) {
                if (!t[u]) {
                    var i = "function" == typeof require && require;
                    if (!s && i) return i(u, !0);
                    if (o) return o(u, !0);
                    var c = new Error("Cannot find module '" + u + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var l = r[u] = {
                    exports: {}
                };
                t[u][0].call(l.exports, function (e) {
                    var r = t[u][1][e];
                    return a(r || e)
                }, l, l.exports, e, t, r, n)
            }
            return r[u].exports
        }
        for (var o = "function" == typeof require && require, u = 0; u < n.length; u++) a(n[u]);
        return a
    }({
        1: [function (e, t, r) {
            var n = e("github-calendar-parser"),
                a = e("elly"),
                o = e("add-subtract-date"),
                u = e("formatoid");
            t.exports = function (e, t, r) {
                e = a(e), (r = r || {}).summary_text = r.summary_text || '<span id="resumo-github">Resumo dos pull requests, issues abertas e commits realizadas por <a href="https://github.com/' + t + '" target="blank">@' + t + "</a>", !1 === r.global_stats && (e.style.minHeight = "175px"), r.proxy = r.proxy || function (e) {
                    return "https://urlreq.appspot.com/req?method=GET&url=" + e
                };
                return function s() {
                    return fetch(r.proxy("https://github.com/" + t)).then(function (e) {
                        return e.text()
                    }).then(function (t) {
                   
                        var i = document.createElement("div");
                        i.innerHTML = t;
                        var c = i.querySelector(".js-contribution-graph");
                        if (c.querySelector(".float-left.text-gray").innerHTML = r.summary_text, c.querySelector("include-fragment")) setTimeout(s, 500);
                        else {
                            if (!0 === r.responsive) {
                                var l = c.querySelector("svg.js-calendar-graph-svg"),
                                    d = l.getAttribute("width"),
                                    f = l.getAttribute("height");
                                l.removeAttribute("height"), l.setAttribute("width", "100%"), l.setAttribute("viewBox", "0 0 " + d + " " + f)
                            }
                            if (!1 !== r.global_stats) {
                                var p = n(a("svg", c).outerHTML),
                                    b = p.current_streak ? u(p.current_streak_range[0], "D MMMM ") + " – " + u(p.current_streak_range[1], "D MMMM") : p.last_contributed ? "Última contribuição em " + u(p.last_contributed, "D MMMM ") + "." : "Rock - Hard Place",
                                    m = p.longest_streak ? u(p.longest_streak_range[0], "D MMMM ") + " – " + u(p.longest_streak_range[1], "D MMMM") : p.last_contributed ? "Última contribuição em " + u(p.last_contributed, "D MMMM") + "." : "Rock - Hard Place",
                                    g = a("<div>", {
                                        class: "contrib-column table-column",
                                        html: '<span class="text-muted">Contribuições no último ano</span>\n <span class="contrib-number">total ' + p.last_year + '</span>\n <span class="text-muted">' + u(o.subtract(new Date, 1, "year"), "MMM D, YYYY") + " – " + u(new Date, "MMM D, YYYY") + "</span>"
                                    }),
                                    h = a("<div>", {
                                        class: "contrib-column table-column",
                                        html: '<span class="text-muted">Max. contribuições consecutivas</span>\n <span class="contrib-number">' + p.longest_streak + ' dias</span>\n  <span class="text-muted">' + m + "</span>"
                                    }),
                                    y = a("<div>", {
                                        class: "contrib-column table-column",
                                        html: '<span class="text-muted">contribuições consecutivas</span>\n <span class="contrib-number">' + p.current_streak + ' dias</span>\n <span class="text-muted">' + b + "</span>"
                                    });
                                c.appendChild(g), c.appendChild(h), c.appendChild(y)
                            }
                            e.innerHTML = c.innerHTML

                            var text = $("h2.f4.text-normal.mb-2").text();
                            $("h2.f4.text-normal.mb-2").text(text.match(/\d+/g).map(Number)[0] + " contribuições no último ano");
                            $("h2.f4.text-normal.mb-2").show();
                           
                        }
                    }).catch(function (e) {
                        return console.error(e)
                    })
                }()
            }
        }, {
            "add-subtract-date": 2,
            elly: 4,
            formatoid: 6,
            "github-calendar-parser": 8
        }],
        2: [function (e, t, r) {
            function n(e) {
                return function t(r, n, a) {
                    switch (n *= e, a) {
                        case "years":
                        case "year":
                            r.setFullYear(r.getFullYear() + n);
                            break;
                        case "months":
                        case "month":
                            r.setMonth(r.getMonth() + n);
                            break;
                        case "weeks":
                        case "week":
                            return t(r, 7 * n, "days");
                        case "days":
                        case "day":
                            r.setDate(r.getDate() + n);
                            break;
                        case "hours":
                        case "hour":
                            r.setHours(r.getHours() + n);
                            break;
                        case "minutes":
                        case "minute":
                            r.setMinutes(r.getMinutes() + n);
                            break;
                        case "seconds":
                        case "second":
                            r.setSeconds(r.getSeconds() + n);
                            break;
                        case "milliseconds":
                        case "millisecond":
                            r.setMilliseconds(r.getMilliseconds() + n);
                            break;
                        default:
                            throw new Error("Invalid range: " + a)
                    }
                    return r
                }
            }
            t.exports = {
                add: n(1),
                subtract: n(-1)
            }
        }, {}],
        3: [function (e, t, r) {
            t.exports.en = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"], t.exports.en.abbr = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"], t.exports.en.short = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"], t.exports.fr = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], t.exports.fr.abbr = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"], t.exports.fr.short = ["di", "lu", "ma", "me", "je", "ve", "sa"], t.exports.es = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"], t.exports.es.abbr = ["dom", "lun", "mar", "mir", "jue", "vie", "sab"], t.exports.es.short = ["do", "lu", "ma", "mi", "ju", "vi", "sa"], t.exports.it = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"], t.exports.it.abbr = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"], t.exports.it.short = ["D", "L", "Ma", "Me", "G", "V", "S"], t.exports = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], t.exports.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], t.exports.short = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        }, {}],
        4: [function (e, t, r) {
            function n(e, t) {
                return "string" == typeof e ? "<" === e.charAt(0) ? (e = document.createElement(e.slice(1, -1)), a(t || {}, function (t, r) {
                    switch (r) {
                        case "text":
                            return void (e.textContent = t);
                        case "html":
                            return void (e.innerHTML = t)
                    }
                    e.setAttribute(r, t)
                }), e) : (t = t || document).querySelector(e) : e
            }
            var a = e("iterate-object"),
                o = e("sliced");
            n.$$ = function (e, t) {
                return "string" == typeof e ? (t = t || document, o(t.querySelectorAll(e))) : [e]
            }, t.exports = n
        }, {
            "iterate-object": 9,
            sliced: 13
        }],
        5: [function (e, t, r) {
            t.exports = function (e, t, r) {
                t = t || 2, r = r || "0";
                var n = t - (e = e.toString()).length;
                return (n <= 0 ? "" : r.repeat(n)) + e
            }
        }, {}],
        6: [function (e, t, r) {
            var n = e("months"),
                a = e("days"),
                o = e("fillo"),
                u = {
                    YYYY: function (e, t) {
                        return t ? e.getUTCFullYear() : e.getFullYear()
                    },
                    YY: function (e, t) {
                        return u.YYYY(e, t) % 100
                    },
                    MMMM: function (e, t) {
                        return t ? n[e.getUTCMonth()] : n[e.getMonth()]
                    },
                    MMM: function (e, t) {
                        return t ? n.abbr[e.getUTCMonth()] : n.abbr[e.getMonth()]
                    },
                    MM: function (e, t) {
                        return o(t ? e.getUTCMonth() + 1 : e.getMonth() + 1)
                    },
                    M: function (e, t) {
                        return t ? e.getUTCMonth() + 1 : e.getMonth() + 1
                    },
                    dddd: function (e, t) {
                        return a[u.d(e, t)]
                    },
                    ddd: function (e, t) {
                        return a.abbr[u.d(e, t)]
                    },
                    dd: function (e, t) {
                        return a.short[u.d(e, t)]
                    },
                    d: function (e, t) {
                        return t ? e.getUTCDay() : e.getDay()
                    },
                    DD: function (e, t) {
                        return o(u.D(e, t))
                    },
                    D: function (e, t) {
                        return t ? e.getUTCDate() : e.getDate()
                    },
                    A: function (e, t) {
                        return u.a(e, t).toUpperCase()
                    },
                    a: function (e, t) {
                        return u.H(e, t) >= 12 ? "pm" : "am"
                    },
                    hh: function (e, t) {
                        return o(u.h(e, t))
                    },
                    h: function (e, t) {
                        return u.H(e, t) % 12 || 12
                    },
                    HH: function (e, t) {
                        return o(u.H(e, t))
                    },
                    H: function (e, t) {
                        return t ? e.getUTCHours() : e.getHours()
                    },
                    mm: function (e, t) {
                        return o(u.m(e, t))
                    },
                    m: function (e, t) {
                        return t ? e.getUTCMinutes() : e.getMinutes()
                    },
                    ss: function (e, t) {
                        return o(u.s(e, t))
                    },
                    s: function (e, t) {
                        return t ? e.getUTCSeconds() : e.getSeconds()
                    },
                    S: function (e, t) {
                        return Math.round(u.s(e, t) / 60 * 10)
                    },
                    SS: function (e, t) {
                        return o(u.s(e, t) / 60 * 100)
                    },
                    SSS: function (e, t) {
                        return o(u.s(e, t) / 60 * 1e3, 3)
                    },
                    Z: function (e) {
                        var t = -e.getTimezoneOffset();
                        return (t >= 0 ? "+" : "-") + o(parseInt(t / 60)) + ":" + o(t % 60)
                    },
                    ZZ: function (e) {
                        var t = -e.getTimezoneOffset();
                        return (t >= 0 ? "+" : "-") + o(parseInt(t / 60)) + o(t % 60)
                    }
                },
                s = new (0, e("parse-it").Parser)(u);
            t.exports = function (e, t) {
                return s.run(t, [e, e._useUTC])
            }
        }, {
            days: 3,
            fillo: 5,
            months: 10,
            "parse-it": 11
        }],
        7: [function (e, t, r) {
            t.exports = ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"]
        }, {}],
        8: [function (e, t, r) {
            var n = e("github-calendar-legend");
            t.exports = function (e) {
                var t = {
                    last_year: 0,
                    longest_streak: -1,
                    longest_streak_range: [],
                    current_streak: 0,
                    current_streak_range: [],
                    weeks: [],
                    days: [],
                    last_contributed: null
                },
                    r = [],
                    a = function () {
                        t.current_streak > t.longest_streak && (t.longest_streak = t.current_streak, t.longest_streak_range[0] = t.current_streak_range[0], t.longest_streak_range[1] = t.current_streak_range[1])
                    };
                return e.split("\n").slice(2).map(function (e) {
                    return e.trim()
                }).forEach(function (e) {
                    if (e.startsWith("<g transform")) return r.length && t.weeks.push(r) && (r = []);
                    var o = e.match(/fill="(#[a-z0-9]+)"/),
                        u = e.match(/data-date="([0-9\-]+)"/),
                        s = e.match(/data-count="([0-9]+)"/);
                    if (o = o && o[1], u = u && u[1], s = s && +s[1], o) {
                        var i = {
                            fill: o,
                            date: new Date(u),
                            count: s,
                            level: n.indexOf(o)
                        };
                        0 === t.current_streak && (t.current_streak_range[0] = i.date), i.count ? (++t.current_streak, t.last_year += i.count, t.last_contributed = i.date, t.current_streak_range[1] = i.date) : (a(), t.current_streak = 0), r.push(i), t.days.push(i)
                    }
                }), a(), t
            }
        }, {
            "github-calendar-legend": 7
        }],
        9: [function (e, t, r) {
            t.exports = function (e, t) {
                var r = 0,
                    n = [];
                if (Array.isArray(e))
                    for (; r < e.length && !1 !== t(e[r], r, e); ++r);
                else if ("object" === (void 0 === e ? "undefined" : _typeof(e)) && null !== e)
                    for (n = Object.keys(e); r < n.length && !1 !== t(e[n[r]], n[r], e); ++r);
            }
        }, {}],
        10: [function (e, t, r) {
            $(".f4").replaceWith(" ");
            t.exports = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], t.exports.abbr = ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Aug", "Set", "Out", "Nov", "Dez"], t.exports.it = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], t.exports.abbr.it = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"], t.exports.de = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], t.exports.abbr.de = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
        }, {}],
        11: [function (e, t, r) {
            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function a(e, t, r) {
                return new s(t).run(e, r)
            }
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, r, n) {
                    return r && e(t.prototype, r), n && e(t, n), t
                }
            }(),
                u = e("regex-escape"),
                s = function () {
                    function e(t) {
                        n(this, e), this.obj = t || {}, this.re = new RegExp("^(" + Object.keys(t).map(u).join("|") + ")")
                    }
                    return o(e, [{
                        key: "run",
                        value: function (e, t) {
                            var r = "";
                            t = t || [];
                            do {
                                var n = e.match(this.re),
                                    a = n && n[1],
                                    o = a || e.charAt(0);
                                if (a) {
                                    var u = this.obj[a];
                                    "function" == typeof u && (u = u.apply(this, t)), r += u
                                } else r += o;
                                e = e.substring(o.length)
                            } while (e);
                            return r
                        }
                    }]), e
                }();
            a.Parser = s, t.exports = a
        }, {
            "regex-escape": 12
        }],
        12: [function (e, t, r) {
            function n(e) {
                return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            }
            n.proto = function () {
                return RegExp.escape = n, n
            }, t.exports = n
        }, {}],
        13: [function (e, t, r) {
            t.exports = function (e, t, r) {
                var n = [],
                    a = e.length;
                if (0 === a) return n;
                var o = t < 0 ? Math.max(0, t + a) : t || 0;
                for (void 0 !== r && (a = r < 0 ? r + a : r); a-- > o;) n[a - o] = e[a];
                return n
            }
        }, {}]
    }, {}, [1])(1)
});