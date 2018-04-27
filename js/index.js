var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PoemInput = function (_React$Component) {
    _inherits(PoemInput, _React$Component);

    function PoemInput(props) {
        _classCallCheck(this, PoemInput);

        var _this = _possibleConstructorReturn(this, (PoemInput.__proto__ || Object.getPrototypeOf(PoemInput)).call(this, props));

        _this.blankState = { value: '' };

        _this.handleTextInput = _this.handleTextInput.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.state = _this.blankState;
        return _this;
    }

    _createClass(PoemInput, [{
        key: "handleTextInput",
        value: function handleTextInput(event) {
            this.setState({
                value: event.target.value
            });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            event.preventDefault();
            this.props.saveLine(this.state.value);
            this.setState(this.blankState);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { className: "villanelle--input", onSubmit: this.handleSubmit },
                React.createElement(
                    "span",
                    { className: "villanelle--rhyme" },
                    this.props.rhymeScheme
                ),
                React.createElement(
                    "label",
                    { className: "sronly", htmlFor: "villanelleinput" },
                    "Poem Line"
                ),
                React.createElement("input", { className: "villanelle-textbox", type: "text", name: "villanelleinput", id: "villanelleinput", onChange: this.handleTextInput, value: this.state.value, placeholder: this.props.rhymeHint, autoComplete: "none" }),
                React.createElement(
                    "button",
                    { type: "submit" },
                    "Add"
                )
            );
        }
    }]);

    return PoemInput;
}(React.Component);

var PoemLine = function (_React$Component2) {
    _inherits(PoemLine, _React$Component2);

    function PoemLine(props) {
        _classCallCheck(this, PoemLine);

        return _possibleConstructorReturn(this, (PoemLine.__proto__ || Object.getPrototypeOf(PoemLine)).call(this, props));
    }

    _createClass(PoemLine, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "villanelle--line" },
                React.createElement(
                    "span",
                    { className: "villanelle--rhyme" },
                    this.props.rhymeScheme
                ),
                React.createElement(
                    "span",
                    { className: "villanelle--text" },
                    this.props.text
                )
            );
        }
    }]);

    return PoemLine;
}(React.Component);

var Villanelle = function (_React$Component3) {
    _inherits(Villanelle, _React$Component3);

    function Villanelle(props) {
        _classCallCheck(this, Villanelle);

        var _this3 = _possibleConstructorReturn(this, (Villanelle.__proto__ || Object.getPrototypeOf(Villanelle)).call(this, props));

        _this3.scheme = ['A1', 'b', 'A2', 'a', 'b', 'A1', 'a', 'b', 'A2', 'a', 'b', 'A1', 'a', 'b', 'A2', 'a', 'b', 'A1', 'A2'];

        _this3.handlePoemInput = _this3.handlePoemInput.bind(_this3);
        _this3.state = {
            completedLines: []
        };
        return _this3;
    }

    _createClass(Villanelle, [{
        key: "getRefrain",
        value: function getRefrain(refrainNumber) {
            var lines = this.state.completedLines;

            if (refrainNumber === 2 && lines.length >= 3) {
                return lines[2];
            } else if (refrainNumber !== 2 && lines.length >= 1) {
                return lines[0];
            }

            return '';
        }
    }, {
        key: "getRhymeScheme",
        value: function getRhymeScheme(lineNumber) {
            return this.scheme[lineNumber];
        }
    }, {
        key: "getRhymeHint",
        value: function getRhymeHint(lineNumber) {
            var currentScheme = this.getRhymeScheme(lineNumber);
            var hint = "End line with rhyming scheme \"" + currentScheme + "\"";

            if (currentScheme === 'A1') {
                hint = this.getRefrain(1);
                if (!hint.length) {
                    hint = 'Write your first refrain.';
                }
            } else if (currentScheme === 'A2') {
                hint = this.getRefrain(2);
                if (!hint.length) {
                    hint = 'Write your second refrain.';
                }
            }
            return hint;
        }
    }, {
        key: "handlePoemInput",
        value: function handlePoemInput(lineText) {
            var completedLines = this.state.completedLines;
            completedLines.push(lineText);
            this.setState({
                completedLines: completedLines
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var completedLines = this.state.completedLines.map(function (line, index) {
                return React.createElement(PoemLine, { key: "line" + index, rhymeScheme: _this4.getRhymeScheme(index), text: line });
            });
            return React.createElement(
                "div",
                { className: "villanelle" },
                completedLines,
                completedLines.length < this.scheme.length ? React.createElement(PoemInput, {
                    rhymeScheme: this.getRhymeScheme(completedLines.length),
                    rhymeHint: this.getRhymeHint(completedLines.length),
                    saveLine: this.handlePoemInput }) : ''
            );
        }
    }]);

    return Villanelle;
}(React.Component);

ReactDOM.render(React.createElement(Villanelle, null), document.getElementById('app'));