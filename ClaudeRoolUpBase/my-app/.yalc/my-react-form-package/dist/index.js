'use strict';

var React = require('react');
var reactHookForm = require('react-hook-form');
var material = require('@mui/material');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var MyForm = function () {
    var _a, _b, _c;
    var _d = reactHookForm.useForm(), register = _d.register, handleSubmit = _d.handleSubmit, errors = _d.formState.errors;
    var onSubmit = function (data) {
        console.log(data);
    };
    return (React.createElement(material.Box, { component: "form", onSubmit: handleSubmit(onSubmit), sx: { maxWidth: 400 } },
        React.createElement(material.TextField, __assign({ fullWidth: true, margin: "normal", label: "First Name" }, register("firstName", { required: "First name is required" }), { error: !!errors.firstName, helperText: (_a = errors.firstName) === null || _a === void 0 ? void 0 : _a.message })),
        React.createElement(material.TextField, __assign({ fullWidth: true, margin: "normal", label: "Last Name" }, register("lastName", { required: "Last name is required" }), { error: !!errors.lastName, helperText: (_b = errors.lastName) === null || _b === void 0 ? void 0 : _b.message })),
        React.createElement(material.TextField, __assign({ fullWidth: true, margin: "normal", label: "Email" }, register("email", {
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
        }), { error: !!errors.email, helperText: (_c = errors.email) === null || _c === void 0 ? void 0 : _c.message })),
        React.createElement(material.Button, { type: "submit", variant: "contained", sx: { mt: 2 } }, "Submit")));
};

exports.MyForm = MyForm;
