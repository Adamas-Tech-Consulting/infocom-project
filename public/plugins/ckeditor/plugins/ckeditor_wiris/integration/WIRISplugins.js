/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/dompurify/dist/purify.js":
/*!***************************************************!*\
  !*** ../../node_modules/dompurify/dist/purify.js ***!
  \***************************************************/
/***/ (function(module) {

/*! @license DOMPurify 2.4.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.4.5/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var hasOwnProperty = Object.hasOwnProperty,
      setPrototypeOf = Object.setPrototypeOf,
      isFrozen = Object.isFrozen,
      getPrototypeOf = Object.getPrototypeOf,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var freeze = Object.freeze,
      seal = Object.seal,
      create = Object.create; // eslint-disable-line import/no-mutable-exports

  var _ref = typeof Reflect !== 'undefined' && Reflect,
      apply = _ref.apply,
      construct = _ref.construct;

  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }

  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }

  if (!construct) {
    construct = function construct(Func, args) {
      return _construct(Func, _toConsumableArray(args));
    };
  }

  var arrayForEach = unapply(Array.prototype.forEach);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);
  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringToString = unapply(String.prototype.toString);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);
  var regExpTest = unapply(RegExp.prototype.test);
  var typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return apply(func, thisArg, args);
    };
  }
  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return construct(func, args);
    };
  }
  /* Add properties to a lookup table */

  function addToSet(set, array, transformCaseFunc) {
    transformCaseFunc = transformCaseFunc ? transformCaseFunc : stringToLowerCase;

    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }

    var l = array.length;

    while (l--) {
      var element = array[l];

      if (typeof element === 'string') {
        var lcElement = transformCaseFunc(element);

        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }

          element = lcElement;
        }
      }

      set[element] = true;
    }

    return set;
  }
  /* Shallow clone an object */

  function clone(object) {
    var newObject = create(null);
    var property;

    for (property in object) {
      if (apply(hasOwnProperty, object, [property]) === true) {
        newObject[property] = object[property];
      }
    }

    return newObject;
  }
  /* IE10 doesn't support __lookupGetter__ so lets'
   * simulate it. It also automatically checks
   * if the prop is function or getter and behaves
   * accordingly. */

  function lookupGetter(object, prop) {
    while (object !== null) {
      var desc = getOwnPropertyDescriptor(object, prop);

      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }

        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }

      object = getPrototypeOf(object);
    }

    function fallbackValue(element) {
      console.warn('fallback value for', element);
      return null;
    }

    return fallbackValue;
  }

  var html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']); // SVG

  var svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
  var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']); // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.

  var svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
  var mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']); // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.

  var mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
  var text = freeze(['#text']);

  var html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
  var svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  var mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode

  var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  var TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape

  var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape

  var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );
  var DOCTYPE_NAME = seal(/^html$/i);

  var getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };
  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {Document} document The document object (to determine policy name suffix)
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported).
   */


  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
    if (_typeof(trustedTypes) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    } // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.


    var suffix = null;
    var ATTR_NAME = 'data-tt-policy-suffix';

    if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
      suffix = document.currentScript.getAttribute(ATTR_NAME);
    }

    var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML: function createHTML(html) {
          return html;
        },
        createScriptURL: function createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };

  function createDOMPurify() {
    var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

    var DOMPurify = function DOMPurify(root) {
      return createDOMPurify(root);
    };
    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */


    DOMPurify.version = '2.4.5';
    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */

    DOMPurify.removed = [];

    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }

    var originalDocument = window.document;
    var document = window.document;
    var DocumentFragment = window.DocumentFragment,
        HTMLTemplateElement = window.HTMLTemplateElement,
        Node = window.Node,
        Element = window.Element,
        NodeFilter = window.NodeFilter,
        _window$NamedNodeMap = window.NamedNodeMap,
        NamedNodeMap = _window$NamedNodeMap === void 0 ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
        HTMLFormElement = window.HTMLFormElement,
        DOMParser = window.DOMParser,
        trustedTypes = window.trustedTypes;
    var ElementPrototype = Element.prototype;
    var cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    var getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    var getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    var getParentNode = lookupGetter(ElementPrototype, 'parentNode'); // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.

    if (typeof HTMLTemplateElement === 'function') {
      var template = document.createElement('template');

      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }

    var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);

    var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';
    var _document = document,
        implementation = _document.implementation,
        createNodeIterator = _document.createNodeIterator,
        createDocumentFragment = _document.createDocumentFragment,
        getElementsByTagName = _document.getElementsByTagName;
    var importNode = originalDocument.importNode;
    var documentMode = {};

    try {
      documentMode = clone(document).documentMode ? document.documentMode : {};
    } catch (_) {}

    var hooks = {};
    /**
     * Expose whether this browser supports running the full DOMPurify.
     */

    DOMPurify.isSupported = typeof getParentNode === 'function' && implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;
    var MUSTACHE_EXPR$1 = MUSTACHE_EXPR,
        ERB_EXPR$1 = ERB_EXPR,
        TMPLIT_EXPR$1 = TMPLIT_EXPR,
        DATA_ATTR$1 = DATA_ATTR,
        ARIA_ATTR$1 = ARIA_ATTR,
        IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA,
        ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
    var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */

    var ALLOWED_TAGS = null;
    var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text)));
    /* Allowed attribute names */

    var ALLOWED_ATTR = null;
    var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
    /*
     * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */

    var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

    var FORBID_TAGS = null;
    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

    var FORBID_ATTR = null;
    /* Decide if ARIA attributes are okay */

    var ALLOW_ARIA_ATTR = true;
    /* Decide if custom data attributes are okay */

    var ALLOW_DATA_ATTR = true;
    /* Decide if unknown protocols are okay */

    var ALLOW_UNKNOWN_PROTOCOLS = false;
    /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */

    var ALLOW_SELF_CLOSE_IN_ATTR = true;
    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */

    var SAFE_FOR_TEMPLATES = false;
    /* Decide if document with <html>... should be returned */

    var WHOLE_DOCUMENT = false;
    /* Track whether config is already set on this instance of DOMPurify. */

    var SET_CONFIG = false;
    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */

    var FORCE_BODY = false;
    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */

    var RETURN_DOM = false;
    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */

    var RETURN_DOM_FRAGMENT = false;
    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */

    var RETURN_TRUSTED_TYPE = false;
    /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */

    var SANITIZE_DOM = true;
    /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */

    var SANITIZE_NAMED_PROPS = false;
    var SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
    /* Keep element content when removing element? */

    var KEEP_CONTENT = true;
    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */

    var IN_PLACE = false;
    /* Allow usage of profiles like html, svg and mathMl */

    var USE_PROFILES = {};
    /* Tags to ignore content of when KEEP_CONTENT is true */

    var FORBID_CONTENTS = null;
    var DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
    /* Tags that are safe for data: URIs */

    var DATA_URI_TAGS = null;
    var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
    /* Attributes safe for values like "javascript:" */

    var URI_SAFE_ATTRIBUTES = null;
    var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
    var MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */

    var NAMESPACE = HTML_NAMESPACE;
    var IS_EMPTY_INPUT = false;
    /* Allowed XHTML+XML namespaces */

    var ALLOWED_NAMESPACES = null;
    var DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
    /* Parsing of strict XHTML documents */

    var PARSER_MEDIA_TYPE;
    var SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
    var DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
    var transformCaseFunc;
    /* Keep a reference to config to pass to hooks */

    var CONFIG = null;
    /* Ideally, do not touch anything below this line */

    /* ______________________________________________ */

    var formElement = document.createElement('form');

    var isRegexOrFunction = function isRegexOrFunction(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity


    var _parseConfig = function _parseConfig(cfg) {
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      /* Shield configuration object from tampering */


      if (!cfg || _typeof(cfg) !== 'object') {
        cfg = {};
      }
      /* Shield configuration object from prototype pollution */


      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE; // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.

      transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
      /* Set configuration parameters */

      ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = 'ALLOWED_NAMESPACES' in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR, // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS, // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true

      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true

      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false

      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true

      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false

      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false

      RETURN_DOM = cfg.RETURN_DOM || false; // Default false

      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false

      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false

      FORCE_BODY = cfg.FORCE_BODY || false; // Default false

      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true

      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false

      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

      IN_PLACE = cfg.IN_PLACE || false; // Default false

      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }

      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }

      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      /* Parse profile info */


      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, _toConsumableArray(text));
        ALLOWED_ATTR = [];

        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }

        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      /* Merge configuration parameters */


      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }

        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }

      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }

        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }

      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }

      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }

        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      /* Add #text in case KEEP_CONTENT is set to true */


      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }
      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */


      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }
      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */


      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      } // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.


      if (freeze) {
        freeze(cfg);
      }

      CONFIG = cfg;
    };

    var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
    var HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']); // Certain elements are allowed in both SVG and HTML
    // namespace. We need to specify them explicitly
    // so that they don't get erroneously deleted from
    // HTML namespace.

    var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */

    var ALL_SVG_TAGS = addToSet({}, svg$1);
    addToSet(ALL_SVG_TAGS, svgFilters);
    addToSet(ALL_SVG_TAGS, svgDisallowed);
    var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
    addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
    /**
     *
     *
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */

    var _checkValidNamespace = function _checkValidNamespace(element) {
      var parent = getParentNode(element); // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.

      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: 'template'
        };
      }

      var tagName = stringToLowerCase(element.tagName);
      var parentTagName = stringToLowerCase(parent.tagName);

      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }

      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        } // The only way to switch from MathML to SVG is via`
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.


        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        } // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.


        return Boolean(ALL_SVG_TAGS[tagName]);
      }

      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        } // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points


        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        } // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.


        return Boolean(ALL_MATHML_TAGS[tagName]);
      }

      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        } // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace


        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      } // For XHTML and XML documents that support custom namespaces


      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      } // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
      // Return false just in case.


      return false;
    };
    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */


    var _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });

      try {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        node.parentNode.removeChild(node);
      } catch (_) {
        try {
          node.outerHTML = emptyHTML;
        } catch (_) {
          node.remove();
        }
      }
    };
    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */


    var _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }

      node.removeAttribute(name); // We void attribute values for unremovable "is"" attributes

      if (name === 'is' && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {}
        } else {
          try {
            node.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };
    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */


    var _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      var doc;
      var leadingWhitespace;

      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        var matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }

      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
        // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
      }

      var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */

      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {}
      }
      /* Use createHTMLDocument in case DOMParser is not available */


      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);

        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_) {// Syntax error if dirtyPayload is invalid xml
        }
      }

      var body = doc.body || doc.documentElement;

      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      /* Work on whole document or just its body */


      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      }

      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    /**
     * _createIterator
     *
     * @param  {Document} root document/fragment to create iterator for
     * @return {Iterator} iterator instance
     */


    var _createIterator = function _createIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
    };
    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */


    var _isClobbered = function _isClobbered(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function' || typeof elm.hasChildNodes !== 'function');
    };
    /**
     * _isNode
     *
     * @param  {Node} obj object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */


    var _isNode = function _isNode(object) {
      return _typeof(Node) === 'object' ? object instanceof Node : object && _typeof(object) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
    };
    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */


    var _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }

      arrayForEach(hooks[entryPoint], function (hook) {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };
    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */


    var _sanitizeElements = function _sanitizeElements(currentNode) {
      var content;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeElements', currentNode, null);
      /* Check if element is clobbered or can clobber */


      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Check if tagname contains Unicode */


      if (regExpTest(/[\u0080-\uFFFF]/, currentNode.nodeName)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Now let's check the element's type and name */


      var tagName = transformCaseFunc(currentNode.nodeName);
      /* Execute a hook if present */

      _executeHook('uponSanitizeElement', currentNode, {
        tagName: tagName,
        allowedTags: ALLOWED_TAGS
      });
      /* Detect mXSS attempts abusing namespace confusion */


      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Mitigate a problem with templates inside select */


      if (tagName === 'select' && regExpTest(/<template/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Remove element if anything forbids its presence */


      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Check if we have a custom element to handle */
        if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
        }
        /* Keep content except for bad-listed elements */


        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          var parentNode = getParentNode(currentNode) || currentNode.parentNode;
          var childNodes = getChildNodes(currentNode) || currentNode.childNodes;

          if (childNodes && parentNode) {
            var childCount = childNodes.length;

            for (var i = childCount - 1; i >= 0; --i) {
              parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
            }
          }
        }

        _forceRemove(currentNode);

        return true;
      }
      /* Check whether element has a valid namespace */


      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }

      if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Sanitize element content to be template-safe */


      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        content = stringReplace(content, MUSTACHE_EXPR$1, ' ');
        content = stringReplace(content, ERB_EXPR$1, ' ');
        content = stringReplace(content, TMPLIT_EXPR$1, ' ');

        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeElements', currentNode, null);

      return false;
    };
    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity


    var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }
      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */


      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if ( // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
          return false;
        }
        /* Check value is safe. First, is attr inert? If so, is safe */

      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if (!value) ; else {
        return false;
      }

      return true;
    };
    /**
     * _basicCustomElementCheck
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     * @param {string} tagName name of the tag of the node to sanitize
     */


    var _basicCustomElementTest = function _basicCustomElementTest(tagName) {
      return tagName.indexOf('-') > 0;
    };
    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */


    var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      var attr;
      var value;
      var lcName;
      var l;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeAttributes', currentNode, null);

      var attributes = currentNode.attributes;
      /* Check if we have attributes; if not we might have a text node */

      if (!attributes) {
        return;
      }

      var hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      l = attributes.length;
      /* Go backwards over all attributes; safely remove bad ones */

      while (l--) {
        attr = attributes[l];
        var _attr = attr,
            name = _attr.name,
            namespaceURI = _attr.namespaceURI;
        value = name === 'value' ? attr.value : stringTrim(attr.value);
        lcName = transformCaseFunc(name);
        /* Execute a hook if present */

        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set

        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);

        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */

        if (hookEvent.forceKeepAttr) {
          continue;
        }
        /* Remove attribute */


        _removeAttribute(name, currentNode);
        /* Did the hooks approve of the attribute? */


        if (!hookEvent.keepAttr) {
          continue;
        }
        /* Work around a security issue in jQuery 3.0 */


        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);

          continue;
        }
        /* Sanitize attribute content to be template-safe */


        if (SAFE_FOR_TEMPLATES) {
          value = stringReplace(value, MUSTACHE_EXPR$1, ' ');
          value = stringReplace(value, ERB_EXPR$1, ' ');
          value = stringReplace(value, TMPLIT_EXPR$1, ' ');
        }
        /* Is `value` valid for this attribute? */


        var lcTag = transformCaseFunc(currentNode.nodeName);

        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }
        /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */


        if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
          // Remove the attribute with this value
          _removeAttribute(name, currentNode); // Prefix the value and later re-create the attribute with the sanitized value


          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        /* Handle attributes that require Trusted Types */


        if (trustedTypesPolicy && _typeof(trustedTypes) === 'object' && typeof trustedTypes.getAttributeType === 'function') {
          if (namespaceURI) ; else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case 'TrustedHTML':
                value = trustedTypesPolicy.createHTML(value);
                break;

              case 'TrustedScriptURL':
                value = trustedTypesPolicy.createScriptURL(value);
                break;
            }
          }
        }
        /* Handle invalid data-* attribute set by try-catching it */


        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }

          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeAttributes', currentNode, null);
    };
    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */


    var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      var shadowNode;

      var shadowIterator = _createIterator(fragment);
      /* Execute a hook if present */


      _executeHook('beforeSanitizeShadowDOM', fragment, null);

      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);
        /* Sanitize tags and elements */


        if (_sanitizeElements(shadowNode)) {
          continue;
        }
        /* Deep shadow DOM detected */


        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(shadowNode);
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };
    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} configuration object
     */
    // eslint-disable-next-line complexity


    DOMPurify.sanitize = function (dirty) {
      var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var body;
      var importedNode;
      var currentNode;
      var oldNode;
      var returnNode;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */

      IS_EMPTY_INPUT = !dirty;

      if (IS_EMPTY_INPUT) {
        dirty = '<!-->';
      }
      /* Stringify, in case dirty is an object */


      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        // eslint-disable-next-line no-negated-condition
        if (typeof dirty.toString !== 'function') {
          throw typeErrorCreate('toString is not a function');
        } else {
          dirty = dirty.toString();

          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        }
      }
      /* Check we can run. Otherwise fall back or ignore */


      if (!DOMPurify.isSupported) {
        if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
          if (typeof dirty === 'string') {
            return window.toStaticHTML(dirty);
          }

          if (_isNode(dirty)) {
            return window.toStaticHTML(dirty.outerHTML);
          }
        }

        return dirty;
      }
      /* Assign config vars */


      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      /* Clean up removed elements */


      DOMPurify.removed = [];
      /* Check if dirty is correctly typed for IN_PLACE */

      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }

      if (IN_PLACE) {
        /* Do some early pre-sanitization to avoid unsafe root nodes */
        if (dirty.nodeName) {
          var tagName = transformCaseFunc(dirty.nodeName);

          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
          }
        }
      } else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);

        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        /* Initialize the document to work on */


        body = _initDocument(dirty);
        /* Check we have a DOM node from the data */

        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
        }
      }
      /* Remove first element node (ours) if FORCE_BODY is set */


      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      /* Get node iterator */


      var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
      /* Now start iterating over the created document */


      while (currentNode = nodeIterator.nextNode()) {
        /* Fix IE's strange behavior with manipulated textNodes #89 */
        if (currentNode.nodeType === 3 && currentNode === oldNode) {
          continue;
        }
        /* Sanitize tags and elements */


        if (_sanitizeElements(currentNode)) {
          continue;
        }
        /* Shadow DOM detected, sanitize it */


        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(currentNode);

        oldNode = currentNode;
      }

      oldNode = null;
      /* If we sanitized `dirty` in-place, return it. */

      if (IN_PLACE) {
        return dirty;
      }
      /* Return sanitized string or DOM */


      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);

          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }

        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmod) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }

        return returnNode;
      }

      var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      /* Serialize doctype if allowed */

      if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
      }
      /* Sanitize final string template-safe */


      if (SAFE_FOR_TEMPLATES) {
        serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, ' ');
        serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, ' ');
        serializedHTML = stringReplace(serializedHTML, TMPLIT_EXPR$1, ' ');
      }

      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */


    DOMPurify.setConfig = function (cfg) {
      _parseConfig(cfg);

      SET_CONFIG = true;
    };
    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */


    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };
    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {string} tag Tag name of containing element.
     * @param  {string} attr Attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */


    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }

      var lcTag = transformCaseFunc(tag);
      var lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */


    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }

      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };
    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     * @return {Function} removed(popped) hook
     */


    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };
    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */


    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };
    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     *
     */


    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };

    return DOMPurify;
  }

  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/accessibility.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/accessibility.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Accessibility)
/* harmony export */ });
/* harmony import */ var _textcache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./textcache */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/textcache.js");
/* harmony import */ var _serviceprovider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serviceprovider */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/serviceprovider.js");
/* harmony import */ var _mathml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mathml */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/mathml.js");
/* harmony import */ var _stringmanager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stringmanager */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/stringmanager.js");





/**
 * @classdesc
 * This class represents MathType accessible class. Converts MathML to accessible text and manages
 * the associated client-side cache.
 */
class Accessibility {
  /**
  * Static property.
  * Accessibility cache, each entry contains a MathML and its correspondent accessibility text.
  * @type {TextCache}
  */
  static get cache() {
    return Accessibility._cache;
  }

  /**
   * Static property setter.
   * Set accessibility cache.
   * @param {TextCahe} value - The property value.
   * @ignore
   */
  static set cache(value) {
    Accessibility._cache = value;
  }

  /**
   * Converts MathML strings to its accessible text representation.
   * @param {String} mathML - MathML to be converted to accessible text.
   * @param {String} [language] - Language of the accessible text. 'en' by default.
   * @param {Array.<String>} [data] - Parameters to send to mathml2accessible service.
   * @return {String} Accessibility text.
   */
  static mathMLToAccessible(mathML, language, data) {
    if (typeof (language) === 'undefined') {
      language = 'en';
    }
    // Check MathML class. If the class is chemistry,
    // we add chemistry to data to force accessibility service
    // to load chemistry grammar.
    if (_mathml__WEBPACK_IMPORTED_MODULE_2__["default"].containClass(mathML, 'wrs_chemistry')) {
      data.mode = 'chemistry';
    }
    // Ignore accesibility styles
    data.ignoreStyles = true;
    let accessibleText = '';

    if (Accessibility.cache.get(mathML)) {
      accessibleText = Accessibility.cache.get(mathML);
    } else {
      data.service = 'mathml2accessible';
      data.lang = language;
      const accessibleJsonResponse = JSON.parse(_serviceprovider__WEBPACK_IMPORTED_MODULE_1__["default"].getService('service', data));
      if (accessibleJsonResponse.status !== 'error') {
        accessibleText = accessibleJsonResponse.result.text;
        Accessibility.cache.populate(mathML, accessibleText);
      } else {
        accessibleText = _stringmanager__WEBPACK_IMPORTED_MODULE_3__["default"].get('error_convert_accessibility');
      }
    }

    return accessibleText;
  }
}

/**
 * Contains an instance of TextCache class to manage the JavaScript accessible cache.
 * Each entry of the cache object contains the MathML and it's correspondent accessibility text.
 * @private
 * @type {TextCache}
 */
Accessibility._cache = new _textcache__WEBPACK_IMPORTED_MODULE_0__["default"]();


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/configuration.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/configuration.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Configuration)
/* harmony export */ });
/**
 * This class represents the configuration class.
 * Usually used to retrieve configuration properties generated in the backend into the frontend.
 */
class Configuration {
  /**
   * Adds a properties object to {@link Configuration.properties}.
   * @param {Object} properties - properties to append to current properties.
   */
  static addConfiguration(properties) {
    Object.assign(Configuration.properties, properties);
  }

  /**
  * Static property.
  * The configuration properties object.
  * @private
  * @type {Object}
  */
  static get properties() {
    return Configuration._properties;
  }

  /**
   * Static property setter.
   * Set configuration properties.
   * @param {Object} value - The property value.
   * @ignore
   */
  static set properties(value) {
    Configuration._properties = value;
  }

  /**
   * Returns the value of a property key.
   * @param {String} key - Property key
   * @returns {String} Property value
   */
  static get(key) {
    if (!Object.prototype.hasOwnProperty.call(Configuration.properties, key)) {
      // Backwards compatibility.
      if (Object.prototype.hasOwnProperty.call(Configuration.properties, '_wrs_conf_')) {
        return Configuration.properties[`_wrs_conf_${key}`];
      }
      return false;
    }
    return Configuration.properties[key];
  }

  /**
   * Adds a new property to Configuration class.
   * @param {String} key - Property key.
   * @param {Object} value - Property value.
   */
  static set(key, value) {
    Configuration.properties[key] = value;
  }

  /**
   * Updates a property object value with new values.
   * @param {String} key - The property key to be updated.
   * @param {Object} propertyValue - Object containing the new values.
   */
  static update(key, propertyValue) {
    if (!Configuration.get(key)) {
      Configuration.set(key, propertyValue);
    } else {
      const updateProperty = Object.assign(Configuration.get(key), propertyValue);
      Configuration.set(key, updateProperty);
    }
  }
}

/**
 * Static properties object. Stores all configuration properties.
 * Needed to attribute accessors.
 * @private
 * @type {Object}
 */
Configuration._properties = {};


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/constants.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/constants.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Constants)
/* harmony export */ });
/**
 * This class represents all the constants needed in a MathType integration among different classes.
 * If a constant should be used across different classes should be defined using attribute
 * accessors.
 */
class Constants {
  /**
   * Safe XML entities.
   * @type {Object}
   */
  static get safeXmlCharactersEntities() {
    return {
      tagOpener: '&laquo;',
      tagCloser: '&raquo;',
      doubleQuote: '&uml;',
      realDoubleQuote: '&quot;',
    };
  }

  /**
   * Blackboard invalid safe characters.
   * @type {Object}
   */
  static get safeBadBlackboardCharacters() {
    return {
      ltElement: '«mo»<«/mo»',
      gtElement: '«mo»>«/mo»',
      ampElement: '«mo»&«/mo»',
    };
  }

  /**
   * Blackboard valid safe characters.
   * @type{Object}
   */
  static get safeGoodBlackboardCharacters() {
    return {
      ltElement: '«mo»§lt;«/mo»',
      gtElement: '«mo»§gt;«/mo»',
      ampElement: '«mo»§amp;«/mo»',
    };
  }

  /**
   * Standard XML special characters.
   * @type {Object}
   */
  static get xmlCharacters() {
    return {
      id: 'xmlCharacters',
      tagOpener: '<', // Hex: \x3C.
      tagCloser: '>', // Hex: \x3E.
      doubleQuote: '"', // Hex: \x22.
      ampersand: '&', // Hex: \x26.
      quote: '\'', // Hex: \x27.
    };
  }

  /**
  * Safe XML special characters. This characters are used instead the standard
  * the standard to parse the  MathML if safeXML save mode is enable. Each XML
  * special character have a UTF-8 representation.
  * @type {Object}
  */
  static get safeXmlCharacters() {
    return {
      id: 'safeXmlCharacters',
      tagOpener: '«', // Hex: \xAB.
      tagCloser: '»', // Hex: \xBB.
      doubleQuote: '¨', // Hex: \xA8.
      ampersand: '§', // Hex: \xA7.
      quote: '`', // Hex: \x60.
      realDoubleQuote: '¨',
    };
  }
}


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/image.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/image.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Image)
/* harmony export */ });
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuration */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/configuration.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/util.js");



/**
 * @classdesc
 * This class represents MathType Image class. Contains all the logic related
 * to MathType images manipulation.
 * All MathType images are generated using the appropriate MathType
 * integration service: showimage or createimage.
 *
 * There are two available image formats:
 * - svg (default)
 * - png
 *
 * There are two formats for the image src attribute:
 * - A data-uri scheme containing the URL-encoded SVG or a PNG's base64.
 * - A link to the showimage service.
 */
class Image {
  /**
   * Removes data attributes from an image.
   * @param {HTMLImageElement} img - Image where remove data attributes.
   */
  static removeImgDataAttributes(img) {
    const attributesToRemove = [];
    const { attributes } = img;

    Object.keys(attributes).forEach((key) => {
      const attribute = attributes[key];
      if (attribute !== undefined && attribute.name !== undefined && attribute.name.indexOf('data-') === 0) {
        // Is preferred keep an array and remove after the search
        // because when attribute is removed the array of attributes
        // is modified.
        attributesToRemove.push(attribute.name);
      }
    });

    attributesToRemove.forEach((attribute) => {
      img.removeAttribute(attribute);
    });
  }

  /**
   * @static
   * Clones all MathType image attributes from a HTMLImageElement to another.
   * @param {HTMLImageElement} originImg - The original image.
   * @param {HTMLImageElement} destImg - The destination image.
   */
  static clone(originImg, destImg) {
    const customEditorAttributeName = _configuration__WEBPACK_IMPORTED_MODULE_0__["default"].get('imageCustomEditorName');
    if (!originImg.hasAttribute(customEditorAttributeName)) {
      destImg.removeAttribute(customEditorAttributeName);
    }

    const mathmlAttributeName = _configuration__WEBPACK_IMPORTED_MODULE_0__["default"].get('imageMathmlAttribute');
    const imgAttributes = [
      mathmlAttributeName,
      customEditorAttributeName,
      'alt',
      'height',
      'width',
      'style',
      'src',
      'role',
    ];

    imgAttributes.forEach((iterator) => {
      const originAttribute = originImg.getAttribute(iterator);
      if (originAttribute) {
        destImg.setAttribute(iterator, originAttribute);
      }
    });
  }

  /**
  * Calculates the metrics of a MathType image given the the service response and the image format.
  * @param {HTMLImageElement} img - The HTMLImageElement.
  * @param {String} uri - The URI generated by the image service: can be a data URI scheme or a URL.
  * @param {Boolean} jsonResponse - True the response of the image service is a
  * JSON object. False otherwise.
  */
  static setImgSize(img, uri, jsonResponse) {
    let ar;
    let base64String;
    let bytes;
    let svgString;
    if (jsonResponse) {
      // Cleaning data:image/png;base64.
      if (_configuration__WEBPACK_IMPORTED_MODULE_0__["default"].get('imageFormat') === 'svg') {
        // SVG format.
        // If SVG is encoded in base64 we need to convert the base64 bytes into a SVG string.
        if (_configuration__WEBPACK_IMPORTED_MODULE_0__["default"].get('saveMode') !== 'base64') {
          ar = Image.getMetricsFromSvgString(uri);
        } else {
          base64String = img.src.substr(img.src.indexOf('base64,') + 7, img.src.length);
          svgString = '';
          bytes = _util__WEBPACK_IMPORTED_MODULE_1__["default"].b64ToByteArray(base64String, base64String.length);
          for (let i = 0; i < bytes.length; i += 1) {
            svgString += String.fromCharCode(bytes[i]);
          }
          ar = Image.getMetricsFromSvgString(svgString);
        }
        // PNG format: we store all metrics information in the first 88 bytes.
      } else {
        base64String = img.src.substr(img.src.indexOf('base64,') + 7, img.src.length);
        bytes = _util__WEBPACK_IMPORTED_MODULE_1__["default"].b64ToByteArray(base64String, 88);
        ar = Image.getMetricsFromBytes(bytes);
      }
      // Backwards compatibility: we store the metrics into createimage response.
    } else {
      ar = _util__WEBPACK_IMPORTED_MODULE_1__["default"].urlToAssArray(uri);
    }
    let width = ar.cw;
    if (!width) {
      return;
    }
    let height = ar.ch;
    let baseline = ar.cb;
    const { dpi } = ar;
    if (dpi) {
      width = width * 96 / dpi;
      height = height * 96 / dpi;
      baseline = baseline * 96 / dpi;
    }
    img.width = width;
    img.height = height;
    img.style.verticalAlign = `-${height - baseline}px`;
  }

  /**
   * Calculates the metrics of an image which has been resized. Is used to restore the original
   * metrics of a resized image.
   * @param {HTMLImageElement } img - The resized HTMLImageElement.
   */
  static fixAfterResize(img) {
    img.removeAttribute('style');
    img.removeAttribute('width');
    img.removeAttribute('height');
    // In order to avoid resize with max-width css property.
    img.style.maxWidth = 'none';
    if (img.src.indexOf('data:image') !== -1) {
      if (_configuration__WEBPACK_IMPORTED_MODULE_0__["default"].get('imageFormat') === 'svg') {
        // ...data:image/svg+xml;charset=utf8, = 32.
        const svg = decodeURIComponent(img.src.substring(32, img.src.length));
        Image.setImgSize(img, svg, true);
      } else {
        // ...data:image/png;base64, == 22.
        const base64 = img.src.substring(22, img.src.length);
        Image.setImgSize(img, base64, true);
      }
    } else {
      Image.setImgSize(img, img.src);
    }
  }

  /**
   * Returns the metrics (height, width and baseline) contained in a SVG image generated
   * by the MathType image service. This image contains as an extra custom attribute:
   * the baseline (wrs:baseline).
   * @param {String} svgString - The SVG image.
   * @return {Array} - The image metrics.
   */
  static getMetricsFromSvgString(svgString) {
    let first = svgString.indexOf('height="');
    let last = svgString.indexOf('"', first + 8, svgString.length);
    const height = svgString.substring(first + 8, last);

    first = svgString.indexOf('width="');
    last = svgString.indexOf('"', first + 7, svgString.length);
    const width = svgString.substring(first + 7, last);

    first = svgString.indexOf('wrs:baseline="');
    last = svgString.indexOf('"', first + 14, svgString.length);
    const baseline = svgString.substring(first + 14, last);

    if (typeof width !== 'undefined') {
      const arr = [];
      arr.cw = width;
      arr.ch = height;
      if (typeof baseline !== 'undefined') {
        arr.cb = baseline;
      }
      return arr;
    }
    return [];
  }

  /**
   * Returns the metrics (width, height, baseline and dpi) contained in a PNG byte array.
   * @param  {Array.<Bytes>} bytes - png byte array.
   * @return {Array} The png metrics.
   */
  static getMetricsFromBytes(bytes) {
    _util__WEBPACK_IMPORTED_MODULE_1__["default"].readBytes(bytes, 0, 8);
    let width;
    let height;
    let typ;
    let baseline;
    let dpi;
    while (bytes.length >= 4) {
      typ = _util__WEBPACK_IMPORTED_MODULE_1__["default"].readInt32(bytes);
      if (typ === 0x49484452) {
        width = _util__WEBPACK_IMPORTED_MODULE_1__["default"].readInt32(bytes);
        height = _util__WEBPACK_IMPORTED_MODULE_1__["default"].readInt32(bytes);
        // Read 5 bytes.
        _util__WEBPACK_IMPORTED_MODULE_1__["default"].readInt32(bytes);
        _util__WEBPACK_IMPORTED_MODULE_1__["default"].readByte(bytes);
      } else if (typ === 0x62615345) { // Baseline: 'baSE'.
        baseline = _util__WEBPACK_IMPORTED_MODULE_1__["default"].readInt32(bytes);
      } else if (typ === 0x70485973) { // Dpis: 'pHYs'.
        dpi = _util__WEBPACK_IMPORTED_MODULE_1__["default"].readInt32(bytes);
        dpi = (Math.round(dpi / 39.37));
        _util__WEBPACK_IMPORTED_MODULE_1__["default"].readInt32(bytes);
        _util__WEBPACK_IMPORTED_MODULE_1__["default"].readByte(bytes);
      }
      _util__WEBPACK_IMPORTED_MODULE_1__["default"].readInt32(bytes);
    }

    if (typeof width !== 'undefined') {
      const arr = [];
      arr.cw = width;
      arr.ch = height;
      arr.dpi = dpi;
      if (baseline) {
        arr.cb = baseline;
      }

      return arr;
    }
    return [];
  }
}


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/latex.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/latex.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Latex)
/* harmony export */ });
/* harmony import */ var _textcache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./textcache */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/textcache.js");
/* harmony import */ var _mathml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mathml */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/mathml.js");
/* harmony import */ var _serviceprovider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serviceprovider */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/serviceprovider.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/util.js");






/**
 * @classdesc
 * This class represents a LaTeX parser. Manages the services which allows to convert
 * LaTeX into MathML and MathML into LaTeX.
 */
class Latex {
  /**
   * Static property.
   * Return latex cache.
   * @private
   * @type {Cache}
   */
  static get cache() {
    return Latex._cache;
  }

  /**
   * Static property setter.
   * Set latex cache.
   * @param {Cache} value - The property value.
   * @ignore
  */
  static set cache(value) {
    Latex._cache = value;
  }

  /**
   * Converts MathML to LaTeX by calling mathml2latex service. For text services
   * we call a text service with the param mathml2latex.
   * @param {String} mathml - MathML String.
   * @return {String} LaTeX string generated by the MathML argument.
   */
  static getLatexFromMathML(mathml) {
    const mathmlWithoutSemantics = _mathml__WEBPACK_IMPORTED_MODULE_1__["default"].removeSemantics(mathml);
    /**
     * @type {TextCache}
     */
    const { cache } = Latex;

    const data = {
      service: 'mathml2latex',
      mml: mathmlWithoutSemantics,
    };

    const jsonResponse = JSON.parse(_serviceprovider__WEBPACK_IMPORTED_MODULE_2__["default"].getService('service', data));

    // TODO: Error handling.
    let latex = '';

    if (jsonResponse.status === 'ok') {
      latex = jsonResponse.result.text;
      const latexHtmlEntitiesEncoded = _util__WEBPACK_IMPORTED_MODULE_4__["default"].htmlEntities(latex);
      // Inserting LaTeX semantics.
      const mathmlWithSemantics = _mathml__WEBPACK_IMPORTED_MODULE_1__["default"].addAnnotation(mathml, latexHtmlEntitiesEncoded, 'LaTeX');
      cache.populate(latex, mathmlWithSemantics);
    }

    return latex;
  }

  /**
   * Converts LaTeX to MathML by calling latex2mathml service. For text services
   * we call a text service with the param latex2mathml.
   * @param {String} latex - String containing a LaTeX formula.
   * @param {Boolean} includeLatexOnSemantics
   * - If true LaTeX would me included into MathML semantics.
   * @return {String} MathML string generated by the LaTeX argument.
   */
  static getMathMLFromLatex(latex, includeLatexOnSemantics) {
    /**
     * @type {TextCache}
     */
    const latexCache = Latex.cache;

    if (Latex.cache.get(latex)) {
      return Latex.cache.get(latex);
    }
    const data = {
      service: 'latex2mathml',
      latex,
    };

    if (includeLatexOnSemantics) {
      data.saveLatex = '';
    }

    const jsonResponse = JSON.parse(_serviceprovider__WEBPACK_IMPORTED_MODULE_2__["default"].getService('service', data));

    let output;
    if (jsonResponse.status === 'ok') {
      let mathml = jsonResponse.result.text;
      mathml = mathml.split('\r').join('').split('\n').join(' ');

      // Populate LatexCache.
      if (mathml.indexOf('semantics') === -1 && mathml.indexOf('annotation') === -1) {
        const content = _util__WEBPACK_IMPORTED_MODULE_4__["default"].htmlEntities(latex);
        mathml = _mathml__WEBPACK_IMPORTED_MODULE_1__["default"].addAnnotation(mathml, content, 'LaTeX');
        output = mathml;
      } else {
        output = mathml;
      }
      if (!latexCache.get(latex)) {
        latexCache.populate(latex, mathml);
      }
    } else {
      output = `$$${latex}$$`;
    }
    return output;
  }

  /**
   * Converts all occurrences of MathML code to LaTeX.
   * The MathML code should containing <annotation encoding="LaTeX"/> to be converted.
   * @param {String} content - A string containing MathML valid code.
   * @param {Object} characters - An object containing special characters.
   * @return {String} A string containing all MathML annotated occurrences
   * replaced by the corresponding LaTeX code.
   */
  static parseMathmlToLatex(content, characters) {
    let output = '';
    const mathTagBegin = `${characters.tagOpener}math`;
    const mathTagEnd = `${characters.tagOpener}/math${characters.tagCloser}`;
    const openTarget = `${characters.tagOpener}annotation encoding=${characters.doubleQuote}LaTeX${characters.doubleQuote}${characters.tagCloser}`;
    const closeTarget = `${characters.tagOpener}/annotation${characters.tagCloser}`;
    let start = content.indexOf(mathTagBegin);
    let end = 0;
    let mathml;
    let startAnnotation;
    let closeAnnotation;

    while (start !== -1) {
      output += content.substring(end, start);
      end = content.indexOf(mathTagEnd, start);

      if (end === -1) {
        end = content.length - 1;
      } else {
        end += mathTagEnd.length;
      }

      mathml = content.substring(start, end);

      startAnnotation = mathml.indexOf(openTarget);
      if (startAnnotation !== -1) {
        startAnnotation += openTarget.length;
        closeAnnotation = mathml.indexOf(closeTarget);
        let latex = mathml.substring(startAnnotation, closeAnnotation);
        if (characters === _constants__WEBPACK_IMPORTED_MODULE_3__["default"].safeXmlCharacters) {
          latex = _mathml__WEBPACK_IMPORTED_MODULE_1__["default"].safeXmlDecode(latex);
        }
        output += `$$${latex}$$`;
        // Populate latex into cache.

        Latex.cache.populate(latex, mathml);
      } else {
        output += mathml;
      }
      start = content.indexOf(mathTagBegin, end);
    }

    output += content.substring(end, content.length);
    return output;
  }

  /**
   * Extracts the latex of a determined position in a text.
   * @param {Node} textNode - textNode to extract the LaTeX
   * @param {Number} caretPosition - Starting position to find LaTeX.
   * @param {Object} latexTags - Optional parameter representing tags between latex is inserted.
   * It has the 'open' attribute for the open tag and the 'close' attribute for the close tag.
   * "$$" by default.
   * @return {Object} An object with 3 keys: 'latex', 'start' and 'end'. Null if latex is not found.
   * @static
   */
  static getLatexFromTextNode(textNode, caretPosition, latexTags) {
    // TODO: Set LaTeX Tags as Core variable. Fix the call to this function (third argument).
    // Tags used for LaTeX formulas.
    const defaultLatexTags = {
      open: '$$',
      close: '$$',
    };
    // latexTags is an optional parameter. If is not set, use default latexTags.
    if (typeof latexTags === 'undefined' || latexTags == null) {
      latexTags = defaultLatexTags;
    }
    // Looking for the first textNode.
    let startNode = textNode;

    while (startNode.previousSibling && startNode.previousSibling.nodeType === 3) { // TEXT_NODE.
      startNode = startNode.previousSibling;
    }

    /**
     * Returns the next latex position and node from a specific node and position.
     * @param {Node} currentNode - Node where searching latex.
     * @param {Number} currentPosition - Current position inside the currentNode.
     * @param {Object} latexTagsToUse - Tags used at latex beginning and latex final.
     * "$$" by default.
     * @param {Boolean} tag - Tag containing the current search.
     * @returns {Object} Object containing the current node and the position.
     */
    function getNextLatexPosition(currentNode, currentPosition, tag) {
      let position = currentNode.nodeValue.indexOf(tag, currentPosition);

      while (position === -1) {
        currentNode = currentNode.nextSibling;

        if (!currentNode) { // TEXT_NODE.
          return null; // Not found.
        }

        position = currentNode.nodeValue ? currentNode.nodeValue.indexOf(latexTags.close) : -1;
      }

      return {
        node: currentNode,
        position,
      };
    }

    /**
     * Determines if a node is previous, or not, to a second one.
     * @param {Node} node - Start node.
     * @param {Number} position - Start node position.
     * @param {Node} endNode - End node.
     * @param {Number} endPosition - End node position.
     * @returns {Boolean} True if the starting node is previous thant the en node. false otherwise.
     */
    function isPrevious(node, position, endNode, endPosition) {
      if (node === endNode) {
        return (position <= endPosition);
      }
      while (node && node !== endNode) {
        node = node.nextSibling;
      }

      return (node === endNode);
    }

    let start;
    let end = {
      node: startNode,
      position: 0,
    };
    // Is supposed that open and close tags has the same length.
    const tagLength = latexTags.open.length;
    do {
      start = getNextLatexPosition(end.node, end.position, latexTags.open);

      if (start == null || isPrevious(textNode, caretPosition, start.node, start.position)) {
        return null;
      }

      end = getNextLatexPosition(start.node, start.position + tagLength, latexTags.close);

      if (end == null) {
        return null;
      }

      end.position += tagLength;
    } while (isPrevious(end.node, end.position, textNode, caretPosition));

    // Isolating latex.
    let latex;

    if (start.node === end.node) {
      latex = start.node.nodeValue.substring(start.position + tagLength, end.position - tagLength);
    } else {
      const index = start.position + tagLength;
      latex = start.node.nodeValue.substring(index, start.node.nodeValue.length);
      let currentNode = start.node;

      do {
        currentNode = currentNode.nextSibling;
        if (currentNode === end.node) {
          latex += end.node.nodeValue.substring(0, end.position - tagLength);
        } else {
          latex += currentNode.nodeValue ? currentNode.nodeValue : '';
        }
      } while (currentNode !== end.node);
    }

    return {
      latex,
      startNode: start.node,
      startPosition: start.position,
      endNode: end.node,
      endPosition: end.position,
    };
  }
}

/**
 * Text cache. Stores all processed LaTeX strings and it's correspondent MathML string.
 * @type {Cache}
 * @static
 */
Latex._cache = new _textcache__WEBPACK_IMPORTED_MODULE_0__["default"]();


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/listeners.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/listeners.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Listeners)
/* harmony export */ });
/**
 * This object represents a custom listener.
 * @typedef {Object} Listener
 * @property {String} Listener.eventName - The listener name.
 * @property {Function} Listener.callback - The listener callback function.
 */

class Listeners {
  /**
   * @classdesc
   * This class represents a custom listeners manager.
   * @constructs
   */
  constructor() {
    /**
     * Array containing all custom listeners.
     * @type {Object[]}
     */
    this.listeners = [];
  }

  /**
   * Add a listener to Listener class.
   * @param {Object} listener - A listener object.
   */
  add(listener) {
    this.listeners.push(listener);
  }

  /**
   * Fires MathType event listeners
   * @param {String} eventName - event name
   * @param {Event} event - event object.
   * @return {boolean} false if event has been prevented. true otherwise.
   */
  fire(eventName, event) {
    for (let i = 0; i < this.listeners.length && !event.cancelled; i += 1) {
      if (this.listeners[i].eventName === eventName) {
        // Calling listener.
        this.listeners[i].callback(event);
      }
    }
    return event.defaultPrevented;
  }

  /**
   * Creates a new listener object.
   * @param {string} eventName - Event name.
   * @param {Object} callback - Callback function.
   * @returns {object} the listener object.
   */
  static newListener(eventName, callback) {
    const listener = {};
    listener.eventName = eventName;
    listener.callback = callback;
    return listener;
  }
}


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/mathml.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/mathml.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MathML)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/util.js");



/**
 * @classdesc
 * This class represents a class to manage MathML objects.
 */
class MathML {
  /**
   * Checks if the mathml at position i is inside an HTML attribute or not.
   * @param {string} content - a string containing MathML code.
   * @param {number} i -  search index.
   * @return {boolean} true if is inside an HTML attribute. false otherwise.
   */
  static isMathmlInAttribute(content, i) {
    // Regex =
    // '^[\'"][\\s]*=[\\s]*[\\w-]+([\\s]*("[^"]*"|\'[^\']*\')[\\s]*
    // =[\\s]*[\\w-]+[\\s]*)*[\\s]+gmi<';
    const mathAtt = '[\'"][\\s]*=[\\s]*[\\w-]+'; // "=att OR '=att
    const attContent = '"[^"]*"|\'[^\']*\''; // "blabla" OR 'blabla'
    const att = `[\\s]*(${attContent})[\\s]*=[\\s]*[\\w-]+[\\s]*`; // "blabla"=att OR 'blabla'=att
    const atts = `('${att}')*`; // "blabla"=att1 "blabla"=att2
    const regex = `^${mathAtt}${atts}[\\s]+gmi<`; // "=att "blabla"=att1 "blabla"=att2 gmi< .
    const expression = new RegExp(regex);

    const actualContent = content.substring(0, i);
    const reversed = actualContent.split('').reverse().join('');
    const exists = expression.test(reversed);

    return exists;
  }

  /**
   * Decodes an encoded MathML with standard XML tags.
   * We use these entities because IE doesn't support html entities
   * on its attributes sometimes. Yes, sometimes.
   * @param {string} input - string to be decoded.
   * @return {string} decoded string.
   */
  static safeXmlDecode(input) {
    let { tagOpener } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharactersEntities;
    let { tagCloser } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharactersEntities;
    let { doubleQuote } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharactersEntities;
    let { realDoubleQuote } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharactersEntities;
    // Decoding entities.
    input = input.split(tagOpener).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters.tagOpener);
    input = input.split(tagCloser).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters.tagCloser);
    input = input.split(doubleQuote).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters.doubleQuote);
    // Added to fix problem due to import from 1.9.x.
    input = input.split(realDoubleQuote).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters.realDoubleQuote);

    // Blackboard.
    const { ltElement } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeBadBlackboardCharacters;
    const { gtElement } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeBadBlackboardCharacters;
    const { ampElement } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeBadBlackboardCharacters;
    if ('_wrs_blackboard' in window && window._wrs_blackboard) {
      input = input.split(ltElement).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeGoodBlackboardCharacters.ltElement);
      input = input.split(gtElement).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeGoodBlackboardCharacters.gtElement);
      input = input.split(ampElement).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeGoodBlackboardCharacters.ampElement);
    }

    ({ tagOpener } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters);
    ({ tagCloser } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters);
    ({ doubleQuote } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters);
    ({ realDoubleQuote } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters);
    const { ampersand } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters;
    const { quote } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters;

    // Decoding characters.
    input = input.split(tagOpener).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters.tagOpener);
    input = input.split(tagCloser).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters.tagCloser);
    input = input.split(doubleQuote).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters.doubleQuote);
    input = input.split(ampersand).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters.ampersand);
    input = input.split(quote).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters.quote);

    // We are replacing $ by & when its part of an entity for retrocompatibility.
    // Now, the standard is replace § by &.
    let returnValue = '';
    let currentEntity = null;

    for (let i = 0; i < input.length; i += 1) {
      const character = input.charAt(i);
      if (currentEntity == null) {
        if (character === '$') {
          currentEntity = '';
        } else {
          returnValue += character;
        }
      } else if (character === ';') {
        returnValue += `&${currentEntity}`;
        currentEntity = null;
      } else if (character.match(/([a-zA-Z0-9#._-] | '-')/)) { // Character is part of an entity.
        currentEntity += character;
      } else {
        returnValue += `$${currentEntity}`; // Is not an entity.
        currentEntity = null;
        i -= 1; // Parse again the current character.
      }
    }

    return returnValue;
  }

  /**
   * Encodes a MathML with standard XML tags to a MMathML encoded with safe XML tags.
   * We use these entities because IE doesn't support html entities on its attributes sometimes.
   * @param {string} input - input string to be encoded
   * @returns {string} encoded string.
   */
  static safeXmlEncode(input) {
    const { tagOpener } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters;
    const { tagCloser } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters;
    const { doubleQuote } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters;
    const { ampersand } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters;
    const { quote } = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters;

    input = input.split(tagOpener).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters.tagOpener);
    input = input.split(tagCloser).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters.tagCloser);
    input = input.split(doubleQuote).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters.doubleQuote);
    input = input.split(ampersand).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters.ampersand);
    input = input.split(quote).join(_constants__WEBPACK_IMPORTED_MODULE_0__["default"].safeXmlCharacters.quote);

    return input;
  }

  /**
   * Converts special symbols (> 128) to entities and replaces all textual
   * entities by its number entities.
   * @param {string} mathml - MathML string containing - or not - special symbols
   * @returns {string} MathML with all textual entities replaced.
   */
  static mathMLEntities(mathml) {
    let toReturn = '';

    for (let i = 0; i < mathml.length; i += 1) {
      const character = mathml.charAt(i);

      // Parsing > 128 characters.
      if (mathml.codePointAt(i) > 128) {
        toReturn += `&#${mathml.codePointAt(i)};`;
        // For UTF-32 characters we need to move the index one position.
        if (mathml.codePointAt(i) > 0xffff) {
          i += 1;
        }
      } else if (character === '&') {
        const end = mathml.indexOf(';', i + 1);
        if (end >= 0) {
          const container = document.createElement('span');
          container.innerHTML = mathml.substring(i, end + 1);
          toReturn += `&#${_util__WEBPACK_IMPORTED_MODULE_1__["default"].fixedCharCodeAt((container.textContent || container.innerText), 0)};`;
          i = end;
        } else {
          toReturn += character;
        }
      } else {
        toReturn += character;
      }
    }

    return toReturn;
  }

  /**
   * Add a custom editor name with the prefix wrs_ to a MathML class attribute.
   * @param {string} mathml - a MathML string created with a custom editor, like chemistry.
   * @param {string} customEditor - custom editor name.
   * @returns {string} MathML string with his class containing the editor toolbar string.
   */
  static addCustomEditorClassAttribute(mathml, customEditor) {
    let toReturn = '';

    const start = mathml.indexOf('<math');
    if (start === 0) {
      const end = mathml.indexOf('>');
      if (mathml.indexOf('class') === -1) {
        // Adding custom editor type.
        toReturn = `${mathml.substr(start, end)} class="wrs_${customEditor}">`;
        toReturn += mathml.substr(end + 1, mathml.length);
        return toReturn;
      }
    }
    return mathml;
  }

  /**
   * Remove a custom editor name from the MathML class attribute.
   * @param {string} mathml - a MathML string.
   * @param {string} customEditor - custom editor name.
   * @returns {string} The input MathML without customEditor name in his class.
   */
  static removeCustomEditorClassAttribute(mathml, customEditor) {
    // Discard MathML without the specified class.
    if (mathml.indexOf('class') === -1 || mathml.indexOf(`wrs_${customEditor}`) === -1) {
      return mathml;
    }

    // Trivial case: class attribute value equal to editor name. Then
    // class attribute is removed.
    // First try to remove it with a space before if there is one
    // Otherwise without the space
    if (mathml.indexOf(` class="wrs_${customEditor}"`) !== -1) {
      return mathml.replace(` class="wrs_${customEditor}"`, '');
    } else if (mathml.indexOf(`class="wrs_${customEditor}"`) !== -1) {
      return mathml.replace(`class="wrs_${customEditor}"`, '');
    }

    // Non Trivial case: class attribute contains editor name.
    return mathml.replace(`wrs_${customEditor}`, '');
  }

  /**
   * Adds annotation tag in MathML element.
   * @param {String} mathml - valid MathML.
   * @param {String} content - value to put inside annotation tag.
   * @param {String} annotationEncoding - annotation encoding.
   * @returns {String} - 'mathml' with an annotation that contains
   * 'content' and encoding 'encoding'.
   */
  static addAnnotation(mathml, content, annotationEncoding) {
    // If contains annotation, also contains semantics tag.
    const containsAnnotation = mathml.indexOf('<annotation');

    let mathmlWithAnnotation = '';
    if (containsAnnotation !== -1) {
      const closeSemanticsIndex = mathml.indexOf('</semantics>');
      mathmlWithAnnotation = `${mathml.substring(0, closeSemanticsIndex)}<annotation encoding="${annotationEncoding}">${content}</annotation>${mathml.substring(closeSemanticsIndex)}`;
    } else if (MathML.isEmpty(mathml)) {
      const endIndexInline = mathml.indexOf('/>');
      const endIndexNonInline = mathml.indexOf('>');
      const endIndex = endIndexNonInline === endIndexInline ? endIndexInline : endIndexNonInline;
      mathmlWithAnnotation = `${mathml.substring(0, endIndex)}><semantics><annotation encoding="${annotationEncoding}">${content}</annotation></semantics></math>`;
    } else {
      const beginMathMLContent = mathml.indexOf('>') + 1;
      const endMathmlContent = mathml.lastIndexOf('</math>');
      const mathmlContent = mathml.substring(beginMathMLContent, endMathmlContent);
      mathmlWithAnnotation = `${mathml.substring(0, beginMathMLContent)}<semantics><mrow>${mathmlContent}</mrow><annotation encoding="${annotationEncoding}">${content}</annotation></semantics></math>`; // eslint-disable-line max-len
    }

    return mathmlWithAnnotation;
  }

  /**
   * Removes specific annotation tag in MathML element.
   * In case of remove the unique annotation, also is removed semantics tag.
   * @param {String} mathml - valid MathML.
   * @param {String} annotationEncoding - annotation encoding to remove.
   * @returns {String} - 'mathml' without the annotation encoding specified.
   */
  static removeAnnotation(mathml, annotationEncoding) {
    let mathmlWithoutAnnotation = mathml;
    const openAnnotationTag = `<annotation encoding="${annotationEncoding}">`;
    const closeAnnotationTag = '</annotation>';
    const startAnnotationIndex = mathml.indexOf(openAnnotationTag);
    if (startAnnotationIndex !== -1) {
      let differentAnnotationFound = false;
      let differentAnnotationIndex = mathml.indexOf('<annotation');
      while (differentAnnotationIndex !== -1) {
        if (differentAnnotationIndex !== startAnnotationIndex) {
          differentAnnotationFound = true;
        }
        differentAnnotationIndex = mathml.indexOf('<annotation', differentAnnotationIndex + 1);
      }

      if (differentAnnotationFound) {
        const closeIndex = mathml.indexOf(closeAnnotationTag, startAnnotationIndex);
        const endAnnotationIndex = closeIndex + closeAnnotationTag.length;
        const startIndex = mathml.substring(0, startAnnotationIndex);
        mathmlWithoutAnnotation = startIndex + mathml.substring(endAnnotationIndex);
      } else {
        mathmlWithoutAnnotation = MathML.removeSemantics(mathml);
      }
    }

    return mathmlWithoutAnnotation;
  }

  /**
   * Removes semantics tag to mathml.
   * @param {string} mathml - MathML string.
   * @returns {string} - 'mathml' without semantics tag.
   */
  static removeSemantics(mathml) {
    const mathTagEnd = '</math>';
    const openSemantics = '<semantics>';
    const openAnnotation = '<annotation';

    let mathmlWithoutSemantics = mathml;
    const startSemantics = mathml.indexOf(openSemantics);
    if (startSemantics !== -1) {
      const startAnnotation = mathml.indexOf(openAnnotation, startSemantics + openSemantics.length);
      if (startAnnotation !== -1) {
        mathmlWithoutSemantics = mathml.substring(0, startSemantics)
        + mathml.substring(startSemantics + openSemantics.length, startAnnotation) + mathTagEnd;
      }
    }

    return mathmlWithoutSemantics;
  }

  /**
   * Transforms all xml mathml ocurrences that contain semantics to the same
   * xml mathml ocurrences without semantics.
   * @param {string} text - string that can contain xml mathml ocurrences.
   * @param {Constants} [characters] - Constant object containing xmlCharacters
   * or safeXmlCharacters relation.
   * xmlCharacters by default.
   * @returns {string} - 'text' with all xml mathml ocurrences without annotation tag.
   */
  static removeSemanticsOcurrences(text, characters = _constants__WEBPACK_IMPORTED_MODULE_0__["default"].xmlCharacters) {
    const mathTagStart = `${characters.tagOpener}math`;
    const mathTagEnd = `${characters.tagOpener}/math${characters.tagCloser}`;
    const mathTagEndline = `/${characters.tagCloser}`;
    const { tagCloser } = characters;
    const semanticsTagStart = `${characters.tagOpener}semantics${characters.tagCloser}`;
    const annotationTagStart = `${characters.tagOpener}annotation encoding=`;

    let output = '';
    let start = text.indexOf(mathTagStart);
    let end = 0;
    while (start !== -1) {
      output += text.substring(end, start);

      // MathML can be written as '<math></math>' or '<math />'.
      const mathTagEndIndex = text.indexOf(mathTagEnd, start);
      const mathTagEndlineIndex = text.indexOf(mathTagEndline, start);
      const firstTagCloser = text.indexOf(tagCloser, start);
      if (mathTagEndIndex !== -1) {
        end = mathTagEndIndex;
      } else if (mathTagEndlineIndex === firstTagCloser - 1) {
        end = mathTagEndlineIndex;
      }

      const semanticsIndex = text.indexOf(semanticsTagStart, start);
      if (semanticsIndex !== -1) {
        const mmlTagStart = text.substring(start, semanticsIndex);
        const annotationIndex = text.indexOf(annotationTagStart, start);
        if (annotationIndex !== -1) {
          const startIndex = semanticsIndex + semanticsTagStart.length;
          const mmlContent = text.substring(startIndex, annotationIndex);
          output += mmlTagStart + mmlContent + mathTagEnd;
          start = text.indexOf(mathTagStart, start + mathTagStart.length);
          end += mathTagEnd.length;
        } else {
          end = start;
          start = text.indexOf(mathTagStart, start + mathTagStart.length);
        }
      } else {
        end = start;
        start = text.indexOf(mathTagStart, start + mathTagStart.length);
      }
    }

    output += text.substring(end, text.length);
    return output;
  }

  /**
   * Returns true if a MathML contains a certain class.
   * @param {string} mathML - input MathML.
   * @param {string} className - className.
   * @returns {boolean} true if the input MathML contains the input class.
   * false otherwise.
   * @static
   */
  static containClass(mathML, className) {
    const classIndex = mathML.indexOf('class');
    if (classIndex === -1) {
      return false;
    }
    const classTagEndIndex = mathML.indexOf('>', classIndex);
    const classTag = mathML.substring(classIndex, classTagEndIndex);
    if (classTag.indexOf(className) !== -1) {
      return true;
    }
    return false;
  }

  /**
   * Returns true if mathml is empty. Otherwise, false.
   * @param {string} mathml - valid MathML with standard XML tags.
   * @returns {boolean} - true if mathml is empty. Otherwise, false.
   */
  static isEmpty(mathml) {
    // MathML can have the shape <math></math> or '<math />'.
    const closeTag = '>';
    const closeTagInline = '/>';
    const firstCloseTagIndex = mathml.indexOf(closeTag);
    const firstCloseTagInlineIndex = mathml.indexOf(closeTagInline);
    let empty = false;
    // MathML is always empty in the second shape.
    if (firstCloseTagInlineIndex !== -1) {
      if (firstCloseTagInlineIndex === firstCloseTagIndex - 1) {
        empty = true;
      }
    }

    // MathML is always empty in the first shape when there aren't elements
    // between math tags.
    if (!empty) {
      const mathTagEndRegex = new RegExp('</(.+:)?math>');
      const mathTagEndArray = mathTagEndRegex.exec(mathml);
      if (mathTagEndArray) {
        empty = firstCloseTagIndex + 1 === mathTagEndArray.index;
      }
    }

    return empty;
  }

  /**
   * Encodes html entities inside properties.
   * @param {String} mathml - valid MathML with standard XML tags.
   * @returns {String} - 'mathml' with property entities encoded.
   */
  static encodeProperties(mathml) {
    // Search all the properties.
    const regex = /\w+=".*?"/g;
    // Encode html entities.
    const replacer = (match) => {
      // It has the shape:
      // <math propertyOne="somethingOne"><children propertyTwo="somethingTwo"></children></math>.
      const quoteIndex = match.indexOf('"');
      const propertyValue = match.substring(quoteIndex + 1, match.length - 1);
      const propertyValueEncoded = _util__WEBPACK_IMPORTED_MODULE_1__["default"].htmlEntities(propertyValue);
      const matchEncoded = `${match.substring(0, quoteIndex + 1)}${propertyValueEncoded}"`;
      return matchEncoded;
    };

    const mathmlEncoded = mathml.replace(regex, replacer);
    return mathmlEncoded;
  }
}


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/md5.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/md5.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable */
var md5;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (md5);

(function () {
  var HxOverrides = function () { }
  HxOverrides.__name__ = true;
  HxOverrides.dateStr = function (date) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
  }
  HxOverrides.strDate = function (s) {
    switch (s.length) {
      case 8:
        var k = s.split(":");
        var d = new Date();
        d.setTime(0);
        d.setUTCHours(k[0]);
        d.setUTCMinutes(k[1]);
        d.setUTCSeconds(k[2]);
        return d;
      case 10:
        var k = s.split("-");
        return new Date(k[0], k[1] - 1, k[2], 0, 0, 0);
      case 19:
        var k = s.split(" ");
        var y = k[0].split("-");
        var t = k[1].split(":");
        return new Date(y[0], y[1] - 1, y[2], t[0], t[1], t[2]);
      default:
        throw "Invalid date format : " + s;
    }
  }
  HxOverrides.cca = function (s, index) {
    var x = s.charCodeAt(index);
    if (x != x) return undefined;
    return x;
  }
  HxOverrides.substr = function (s, pos, len) {
    if (pos != null && pos != 0 && len != null && len < 0) return "";
    if (len == null) len = s.length;
    if (pos < 0) {
      pos = s.length + pos;
      if (pos < 0) pos = 0;
    } else if (len < 0) len = s.length + len - pos;
    return s.substr(pos, len);
  }
  HxOverrides.remove = function (a, obj) {
    var i = 0;
    var l = a.length;
    while (i < l) {
      if (a[i] == obj) {
        a.splice(i, 1);
        return true;
      }
      i++;
    }
    return false;
  }
  HxOverrides.iter = function (a) {
    return {
      cur: 0, arr: a, hasNext: function () {
        return this.cur < this.arr.length;
      }, next: function () {
        return this.arr[this.cur++];
      }
    };
  }
  var IntIter = function (min, max) {
    this.min = min;
    this.max = max;
  };
  IntIter.__name__ = true;
  IntIter.prototype = {
    next: function () {
      return this.min++;
    }
    , hasNext: function () {
      return this.min < this.max;
    }
    , __class__: IntIter
  }
  var Std = function () { }
  Std.__name__ = true;
  Std["is"] = function (v, t) {
    return js.Boot.__instanceof(v, t);
  }
  Std.string = function (s) {
    return js.Boot.__string_rec(s, "");
  }
  Std["int"] = function (x) {
    return x | 0;
  }
  Std.parseInt = function (x) {
    var v = parseInt(x, 10);
    if (v == 0 && (HxOverrides.cca(x, 1) == 120 || HxOverrides.cca(x, 1) == 88)) v = parseInt(x);
    if (isNaN(v)) return null;
    return v;
  }
  Std.parseFloat = function (x) {
    return parseFloat(x);
  }
  Std.random = function (x) {
    return Math.floor(Math.random() * x);
  }
  var com = com || {}
  if (!com.wiris) com.wiris = {}
  if (!com.wiris.js) com.wiris.js = {}
  com.wiris.js.JsPluginTools = function () {
    this.tryReady();
  };
  com.wiris.js.JsPluginTools.__name__ = true;
  com.wiris.js.JsPluginTools.main = function () {
    var ev;
    ev = com.wiris.js.JsPluginTools.getInstance();
    haxe.Timer.delay($bind(ev, ev.tryReady), 100);
  }
  com.wiris.js.JsPluginTools.getInstance = function () {
    if (com.wiris.js.JsPluginTools.instance == null) com.wiris.js.JsPluginTools.instance = new com.wiris.js.JsPluginTools();
    return com.wiris.js.JsPluginTools.instance;
  }
  com.wiris.js.JsPluginTools.bypassEncapsulation = function () {
    if (window.com == null) window.com = {};
    if (window.com.wiris == null) window.com.wiris = {};
    if (window.com.wiris.js == null) window.com.wiris.js = {};
    if (window.com.wiris.js.JsPluginTools == null) window.com.wiris.js.JsPluginTools = com.wiris.js.JsPluginTools.getInstance();
  }
  com.wiris.js.JsPluginTools.prototype = {
    md5encode: function (content) {
      return haxe.Md5.encode(content);
    }
    , doLoad: function () {
      this.ready = true;
      com.wiris.js.JsPluginTools.instance = this;
      com.wiris.js.JsPluginTools.bypassEncapsulation();
    }
    , tryReady: function () {
      this.ready = false;
      if (js.Lib.document.readyState) {
        this.doLoad();
        this.ready = true;
      }
      if (!this.ready) haxe.Timer.delay($bind(this, this.tryReady), 100);
    }
    , __class__: com.wiris.js.JsPluginTools
  }
  var haxe = haxe || {}
  haxe.Log = function () { }
  haxe.Log.__name__ = true;
  haxe.Log.trace = function (v, infos) {
    js.Boot.__trace(v, infos);
  }
  haxe.Log.clear = function () {
    js.Boot.__clear_trace();
  }
  haxe.Md5 = function () {
  };
  haxe.Md5.__name__ = true;
  haxe.Md5.encode = function (s) {
    return new haxe.Md5().doEncode(s);
  }
  haxe.Md5.prototype = {
    doEncode: function (str) {
      var x = this.str2blks(str);
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      var step;
      var i = 0;
      while (i < x.length) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        step = 0;
        a = this.ff(a, b, c, d, x[i], 7, -680876936);
        d = this.ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = this.ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = this.ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = this.ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = this.ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = this.ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = this.ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = this.ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = this.ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = this.ff(c, d, a, b, x[i + 10], 17, -42063);
        b = this.ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = this.ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = this.ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = this.ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = this.ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = this.gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = this.gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = this.gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = this.gg(b, c, d, a, x[i], 20, -373897302);
        a = this.gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = this.gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = this.gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = this.gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = this.gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = this.gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = this.gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = this.gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = this.gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = this.gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = this.gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = this.gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = this.hh(a, b, c, d, x[i + 5], 4, -378558);
        d = this.hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = this.hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = this.hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = this.hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = this.hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = this.hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = this.hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = this.hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = this.hh(d, a, b, c, x[i], 11, -358537222);
        c = this.hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = this.hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = this.hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = this.hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = this.hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = this.hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = this.ii(a, b, c, d, x[i], 6, -198630844);
        d = this.ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = this.ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = this.ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = this.ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = this.ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = this.ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = this.ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = this.ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = this.ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = this.ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = this.ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = this.ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = this.ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = this.ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = this.ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = this.addme(a, olda);
        b = this.addme(b, oldb);
        c = this.addme(c, oldc);
        d = this.addme(d, oldd);
        i += 16;
      }
      return this.rhex(a) + this.rhex(b) + this.rhex(c) + this.rhex(d);
    }
    , ii: function (a, b, c, d, x, s, t) {
      return this.cmn(this.bitXOR(c, this.bitOR(b, ~d)), a, b, x, s, t);
    }
    , hh: function (a, b, c, d, x, s, t) {
      return this.cmn(this.bitXOR(this.bitXOR(b, c), d), a, b, x, s, t);
    }
    , gg: function (a, b, c, d, x, s, t) {
      return this.cmn(this.bitOR(this.bitAND(b, d), this.bitAND(c, ~d)), a, b, x, s, t);
    }
    , ff: function (a, b, c, d, x, s, t) {
      return this.cmn(this.bitOR(this.bitAND(b, c), this.bitAND(~b, d)), a, b, x, s, t);
    }
    , cmn: function (q, a, b, x, s, t) {
      return this.addme(this.rol(this.addme(this.addme(a, q), this.addme(x, t)), s), b);
    }
    , rol: function (num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    , str2blks: function (str) {
      var nblk = (str.length + 8 >> 6) + 1;
      var blks = new Array();
      var _g1 = 0, _g = nblk * 16;
      while (_g1 < _g) {
        var i = _g1++;
        blks[i] = 0;
      }
      var i = 0;
      while (i < str.length) {
        blks[i >> 2] |= HxOverrides.cca(str, i) << (str.length * 8 + i) % 4 * 8;
        i++;
      }
      blks[i >> 2] |= 128 << (str.length * 8 + i) % 4 * 8;
      var l = str.length * 8;
      var k = nblk * 16 - 2;
      blks[k] = l & 255;
      blks[k] |= (l >>> 8 & 255) << 8;
      blks[k] |= (l >>> 16 & 255) << 16;
      blks[k] |= (l >>> 24 & 255) << 24;
      return blks;
    }
    , rhex: function (num) {
      var str = "";
      var hex_chr = "0123456789abcdef";
      var _g = 0;
      while (_g < 4) {
        var j = _g++;
        str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
      }
      return str;
    }
    , addme: function (x, y) {
      var lsw = (x & 65535) + (y & 65535);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    }
    , bitAND: function (a, b) {
      var lsb = a & 1 & (b & 1);
      var msb31 = a >>> 1 & b >>> 1;
      return msb31 << 1 | lsb;
    }
    , bitXOR: function (a, b) {
      var lsb = a & 1 ^ b & 1;
      var msb31 = a >>> 1 ^ b >>> 1;
      return msb31 << 1 | lsb;
    }
    , bitOR: function (a, b) {
      var lsb = a & 1 | b & 1;
      var msb31 = a >>> 1 | b >>> 1;
      return msb31 << 1 | lsb;
    }
    , __class__: haxe.Md5
  }
  haxe.Timer = function (time_ms) {
    var me = this;
    this.id = window.setInterval(function () {
      me.run();
    }, time_ms);
  };
  haxe.Timer.__name__ = true;
  haxe.Timer.delay = function (f, time_ms) {
    var t = new haxe.Timer(time_ms);
    t.run = function () {
      t.stop();
      f();
    };
    return t;
  }
  haxe.Timer.measure = function (f, pos) {
    var t0 = haxe.Timer.stamp();
    var r = f();
    haxe.Log.trace(haxe.Timer.stamp() - t0 + "s", pos);
    return r;
  }
  haxe.Timer.stamp = function () {
    return new Date().getTime() / 1000;
  }
  haxe.Timer.prototype = {
    run: function () {
    }
    , stop: function () {
      if (this.id == null) return;
      window.clearInterval(this.id);
      this.id = null;
    }
    , __class__: haxe.Timer
  }
  var js = js || {}
  js.Boot = function () { }
  js.Boot.__name__ = true;
  js.Boot.__unhtml = function (s) {
    return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
  }
  js.Boot.__trace = function (v, i) {
    var msg = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
    msg += js.Boot.__string_rec(v, "");
    var d;
    if (typeof (document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if (typeof (console) != "undefined" && console.log != null) console.log(msg);
  }
  js.Boot.__clear_trace = function () {
    var d = document.getElementById("haxe:trace");
    if (d != null) d.innerHTML = "";
  }
  js.Boot.isClass = function (o) {
    return o.__name__;
  }
  js.Boot.isEnum = function (e) {
    return e.__ename__;
  }
  js.Boot.getClass = function (o) {
    return o.__class__;
  }
  js.Boot.__string_rec = function (o, s) {
    if (o == null) return "null";
    if (s.length >= 5) return "<...>";
    var t = typeof (o);
    if (t == "function" && (o.__name__ || o.__ename__)) t = "object";
    switch (t) {
      case "object":
        if (o instanceof Array) {
          if (o.__enum__) {
            if (o.length == 2) return o[0];
            var str = o[0] + "(";
            s += "\t";
            var _g1 = 2, _g = o.length;
            while (_g1 < _g) {
              var i = _g1++;
              if (i != 2) str += "," + js.Boot.__string_rec(o[i], s); else str += js.Boot.__string_rec(o[i], s);
            }
            return str + ")";
          }
          var l = o.length;
          var i;
          var str = "[";
          s += "\t";
          var _g = 0;
          while (_g < l) {
            var i1 = _g++;
            str += (i1 > 0 ? "," : "") + js.Boot.__string_rec(o[i1], s);
          }
          str += "]";
          return str;
        }
        var tostr;
        try {
          tostr = o.toString;
        } catch (e) {
          return "???";
        }
        if (tostr != null && tostr != Object.toString) {
          var s2 = o.toString();
          if (s2 != "[object Object]") return s2;
        }
        var k = null;
        var str = "{\n";
        s += "\t";
        var hasp = o.hasOwnProperty != null;
        for (var k in o) {
          ;
          if (hasp && !o.hasOwnProperty(k)) {
            continue;
          }
          if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
            continue;
          }
          if (str.length != 2) str += ", \n";
          str += s + k + " : " + js.Boot.__string_rec(o[k], s);
        }
        s = s.substring(1);
        str += "\n" + s + "}";
        return str;
      case "function":
        return "<function>";
      case "string":
        return o;
      default:
        return String(o);
    }
  }
  js.Boot.__interfLoop = function (cc, cl) {
    if (cc == null) return false;
    if (cc == cl) return true;
    var intf = cc.__interfaces__;
    if (intf != null) {
      var _g1 = 0, _g = intf.length;
      while (_g1 < _g) {
        var i = _g1++;
        var i1 = intf[i];
        if (i1 == cl || js.Boot.__interfLoop(i1, cl)) return true;
      }
    }
    return js.Boot.__interfLoop(cc.__super__, cl);
  }
  js.Boot.__instanceof = function (o, cl) {
    try {
      if (o instanceof cl) {
        if (cl == Array) return o.__enum__ == null;
        return true;
      }
      if (js.Boot.__interfLoop(o.__class__, cl)) return true;
    } catch (e) {
      if (cl == null) return false;
    }
    switch (cl) {
      case Int:
        return Math.ceil(o % 2147483648.0) === o;
      case Float:
        return typeof (o) == "number";
      case Bool:
        return o === true || o === false;
      case String:
        return typeof (o) == "string";
      case Dynamic:
        return true;
      default:
        if (o == null) return false;
        if (cl == Class && o.__name__ != null) return true; else null;
        if (cl == Enum && o.__ename__ != null) return true; else null;
        return o.__enum__ == cl;
    }
  }
  js.Boot.__cast = function (o, t) {
    if (js.Boot.__instanceof(o, t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
  }
  js.Lib = function () { }
  js.Lib.__name__ = true;
  js.Lib.debug = function () {
    debugger;
  }
  js.Lib.alert = function (v) {
    alert(js.Boot.__string_rec(v, ""));
  }
  js.Lib.eval = function (code) {
    return eval(code);
  }
  js.Lib.setErrorHandler = function (f) {
    js.Lib.onerror = f;
  }
  var $_;
  function $bind(o, m) { var f = function () { return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
  if (Array.prototype.indexOf) HxOverrides.remove = function (a, o) {
    var i = a.indexOf(o);
    if (i == -1) return false;
    a.splice(i, 1);
    return true;
  }; else null;
  Math.__name__ = ["Math"];
  Math.NaN = Number.NaN;
  Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
  Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
  Math.isFinite = function (i) {
    return isFinite(i);
  };
  Math.isNaN = function (i) {
    return isNaN(i);
  };
  String.prototype.__class__ = String;
  String.__name__ = true;
  Array.prototype.__class__ = Array;
  Array.__name__ = true;
  Date.prototype.__class__ = Date;
  Date.__name__ = ["Date"];
  var Int = { __name__: ["Int"] };
  var Dynamic = { __name__: ["Dynamic"] };
  var Float = Number;
  Float.__name__ = ["Float"];
  var Bool = Boolean;
  Bool.__ename__ = ["Bool"];
  var Class = { __name__: ["Class"] };
  var Enum = {};
  var Void = { __ename__: ["Void"] };
  if (typeof document != "undefined") js.Lib.document = document;
  if (typeof window != "undefined") {
    js.Lib.window = window;
    js.Lib.window.onerror = function (msg, url, line) {
      var f = js.Lib.onerror;
      if (f == null) return false;
      return f(msg, [url + ":" + line]);
    };
  }
  com.wiris.js.JsPluginTools.main();
  delete Array.prototype.__class__;
}());


(function () {
  var HxOverrides = function () { }
  HxOverrides.__name__ = true;
  HxOverrides.dateStr = function (date) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
  }
  HxOverrides.strDate = function (s) {
    switch (s.length) {
      case 8:
        var k = s.split(":");
        var d = new Date();
        d.setTime(0);
        d.setUTCHours(k[0]);
        d.setUTCMinutes(k[1]);
        d.setUTCSeconds(k[2]);
        return d;
      case 10:
        var k = s.split("-");
        return new Date(k[0], k[1] - 1, k[2], 0, 0, 0);
      case 19:
        var k = s.split(" ");
        var y = k[0].split("-");
        var t = k[1].split(":");
        return new Date(y[0], y[1] - 1, y[2], t[0], t[1], t[2]);
      default:
        throw "Invalid date format : " + s;
    }
  }
  HxOverrides.cca = function (s, index) {
    var x = s.charCodeAt(index);
    if (x != x) return undefined;
    return x;
  }
  HxOverrides.substr = function (s, pos, len) {
    if (pos != null && pos != 0 && len != null && len < 0) return "";
    if (len == null) len = s.length;
    if (pos < 0) {
      pos = s.length + pos;
      if (pos < 0) pos = 0;
    } else if (len < 0) len = s.length + len - pos;
    return s.substr(pos, len);
  }
  HxOverrides.remove = function (a, obj) {
    var i = 0;
    var l = a.length;
    while (i < l) {
      if (a[i] == obj) {
        a.splice(i, 1);
        return true;
      }
      i++;
    }
    return false;
  }
  HxOverrides.iter = function (a) {
    return {
      cur: 0, arr: a, hasNext: function () {
        return this.cur < this.arr.length;
      }, next: function () {
        return this.arr[this.cur++];
      }
    };
  }
  var IntIter = function (min, max) {
    this.min = min;
    this.max = max;
  };
  IntIter.__name__ = true;
  IntIter.prototype = {
    next: function () {
      return this.min++;
    }
    , hasNext: function () {
      return this.min < this.max;
    }
    , __class__: IntIter
  }
  var Std = function () { }
  Std.__name__ = true;
  Std["is"] = function (v, t) {
    return js.Boot.__instanceof(v, t);
  }
  Std.string = function (s) {
    return js.Boot.__string_rec(s, "");
  }
  Std["int"] = function (x) {
    return x | 0;
  }
  Std.parseInt = function (x) {
    var v = parseInt(x, 10);
    if (v == 0 && (HxOverrides.cca(x, 1) == 120 || HxOverrides.cca(x, 1) == 88)) v = parseInt(x);
    if (isNaN(v)) return null;
    return v;
  }
  Std.parseFloat = function (x) {
    return parseFloat(x);
  }
  Std.random = function (x) {
    return Math.floor(Math.random() * x);
  }
  var com = com || {}
  if (!com.wiris) com.wiris = {}
  if (!com.wiris.js) com.wiris.js = {}
  com.wiris.js.JsPluginTools = function () {
    this.tryReady();
  };
  com.wiris.js.JsPluginTools.__name__ = true;
  com.wiris.js.JsPluginTools.main = function () {
    var ev;
    ev = com.wiris.js.JsPluginTools.getInstance();
    haxe.Timer.delay($bind(ev, ev.tryReady), 100);
  }
  com.wiris.js.JsPluginTools.getInstance = function () {
    if (com.wiris.js.JsPluginTools.instance == null) com.wiris.js.JsPluginTools.instance = new com.wiris.js.JsPluginTools();
    return com.wiris.js.JsPluginTools.instance;
  }
  com.wiris.js.JsPluginTools.bypassEncapsulation = function () {
    if (window.com == null) window.com = {};
    if (window.com.wiris == null) window.com.wiris = {};
    if (window.com.wiris.js == null) window.com.wiris.js = {};
    if (window.com.wiris.js.JsPluginTools == null) window.com.wiris.js.JsPluginTools = com.wiris.js.JsPluginTools.getInstance();
  }
  com.wiris.js.JsPluginTools.prototype = {
    md5encode: function (content) {
      return haxe.Md5.encode(content);
    }
    , doLoad: function () {
      this.ready = true;
      com.wiris.js.JsPluginTools.instance = this;
      com.wiris.js.JsPluginTools.bypassEncapsulation();
    }
    , tryReady: function () {
      this.ready = false;
      if (js.Lib.document.readyState) {
        this.doLoad();
        this.ready = true;
      }
      if (!this.ready) haxe.Timer.delay($bind(this, this.tryReady), 100);
    }
    , __class__: com.wiris.js.JsPluginTools
  }
  var haxe = haxe || {}
  haxe.Log = function () { }
  haxe.Log.__name__ = true;
  haxe.Log.trace = function (v, infos) {
    js.Boot.__trace(v, infos);
  }
  haxe.Log.clear = function () {
    js.Boot.__clear_trace();
  }
  haxe.Md5 = function () {
  };
  haxe.Md5.__name__ = true;
  haxe.Md5.encode = function (s) {
    return new haxe.Md5().doEncode(s);
  }
  haxe.Md5.prototype = {
    doEncode: function (str) {
      var x = this.str2blks(str);
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      var step;
      var i = 0;
      while (i < x.length) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        step = 0;
        a = this.ff(a, b, c, d, x[i], 7, -680876936);
        d = this.ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = this.ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = this.ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = this.ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = this.ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = this.ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = this.ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = this.ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = this.ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = this.ff(c, d, a, b, x[i + 10], 17, -42063);
        b = this.ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = this.ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = this.ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = this.ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = this.ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = this.gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = this.gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = this.gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = this.gg(b, c, d, a, x[i], 20, -373897302);
        a = this.gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = this.gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = this.gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = this.gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = this.gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = this.gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = this.gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = this.gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = this.gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = this.gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = this.gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = this.gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = this.hh(a, b, c, d, x[i + 5], 4, -378558);
        d = this.hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = this.hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = this.hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = this.hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = this.hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = this.hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = this.hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = this.hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = this.hh(d, a, b, c, x[i], 11, -358537222);
        c = this.hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = this.hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = this.hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = this.hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = this.hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = this.hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = this.ii(a, b, c, d, x[i], 6, -198630844);
        d = this.ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = this.ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = this.ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = this.ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = this.ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = this.ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = this.ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = this.ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = this.ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = this.ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = this.ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = this.ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = this.ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = this.ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = this.ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = this.addme(a, olda);
        b = this.addme(b, oldb);
        c = this.addme(c, oldc);
        d = this.addme(d, oldd);
        i += 16;
      }
      return this.rhex(a) + this.rhex(b) + this.rhex(c) + this.rhex(d);
    }
    , ii: function (a, b, c, d, x, s, t) {
      return this.cmn(this.bitXOR(c, this.bitOR(b, ~d)), a, b, x, s, t);
    }
    , hh: function (a, b, c, d, x, s, t) {
      return this.cmn(this.bitXOR(this.bitXOR(b, c), d), a, b, x, s, t);
    }
    , gg: function (a, b, c, d, x, s, t) {
      return this.cmn(this.bitOR(this.bitAND(b, d), this.bitAND(c, ~d)), a, b, x, s, t);
    }
    , ff: function (a, b, c, d, x, s, t) {
      return this.cmn(this.bitOR(this.bitAND(b, c), this.bitAND(~b, d)), a, b, x, s, t);
    }
    , cmn: function (q, a, b, x, s, t) {
      return this.addme(this.rol(this.addme(this.addme(a, q), this.addme(x, t)), s), b);
    }
    , rol: function (num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    , str2blks: function (str) {
      var nblk = (str.length + 8 >> 6) + 1;
      var blks = new Array();
      var _g1 = 0, _g = nblk * 16;
      while (_g1 < _g) {
        var i = _g1++;
        blks[i] = 0;
      }
      var i = 0;
      while (i < str.length) {
        blks[i >> 2] |= HxOverrides.cca(str, i) << (str.length * 8 + i) % 4 * 8;
        i++;
      }
      blks[i >> 2] |= 128 << (str.length * 8 + i) % 4 * 8;
      var l = str.length * 8;
      var k = nblk * 16 - 2;
      blks[k] = l & 255;
      blks[k] |= (l >>> 8 & 255) << 8;
      blks[k] |= (l >>> 16 & 255) << 16;
      blks[k] |= (l >>> 24 & 255) << 24;
      return blks;
    }
    , rhex: function (num) {
      var str = "";
      var hex_chr = "0123456789abcdef";
      var _g = 0;
      while (_g < 4) {
        var j = _g++;
        str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
      }
      return str;
    }
    , addme: function (x, y) {
      var lsw = (x & 65535) + (y & 65535);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    }
    , bitAND: function (a, b) {
      var lsb = a & 1 & (b & 1);
      var msb31 = a >>> 1 & b >>> 1;
      return msb31 << 1 | lsb;
    }
    , bitXOR: function (a, b) {
      var lsb = a & 1 ^ b & 1;
      var msb31 = a >>> 1 ^ b >>> 1;
      return msb31 << 1 | lsb;
    }
    , bitOR: function (a, b) {
      var lsb = a & 1 | b & 1;
      var msb31 = a >>> 1 | b >>> 1;
      return msb31 << 1 | lsb;
    }
    , __class__: haxe.Md5
  }
  haxe.Timer = function (time_ms) {
    var me = this;
    this.id = window.setInterval(function () {
      me.run();
    }, time_ms);
  };
  haxe.Timer.__name__ = true;
  haxe.Timer.delay = function (f, time_ms) {
    var t = new haxe.Timer(time_ms);
    t.run = function () {
      t.stop();
      f();
    };
    return t;
  }
  haxe.Timer.measure = function (f, pos) {
    var t0 = haxe.Timer.stamp();
    var r = f();
    haxe.Log.trace(haxe.Timer.stamp() - t0 + "s", pos);
    return r;
  }
  haxe.Timer.stamp = function () {
    return new Date().getTime() / 1000;
  }
  haxe.Timer.prototype = {
    run: function () {
    }
    , stop: function () {
      if (this.id == null) return;
      window.clearInterval(this.id);
      this.id = null;
    }
    , __class__: haxe.Timer
  }
  var js = js || {}
  js.Boot = function () { }
  js.Boot.__name__ = true;
  js.Boot.__unhtml = function (s) {
    return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
  }
  js.Boot.__trace = function (v, i) {
    var msg = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
    msg += js.Boot.__string_rec(v, "");
    var d;
    if (typeof (document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if (typeof (console) != "undefined" && console.log != null) console.log(msg);
  }
  js.Boot.__clear_trace = function () {
    var d = document.getElementById("haxe:trace");
    if (d != null) d.innerHTML = "";
  }
  js.Boot.isClass = function (o) {
    return o.__name__;
  }
  js.Boot.isEnum = function (e) {
    return e.__ename__;
  }
  js.Boot.getClass = function (o) {
    return o.__class__;
  }
  js.Boot.__string_rec = function (o, s) {
    if (o == null) return "null";
    if (s.length >= 5) return "<...>";
    var t = typeof (o);
    if (t == "function" && (o.__name__ || o.__ename__)) t = "object";
    switch (t) {
      case "object":
        if (o instanceof Array) {
          if (o.__enum__) {
            if (o.length == 2) return o[0];
            var str = o[0] + "(";
            s += "\t";
            var _g1 = 2, _g = o.length;
            while (_g1 < _g) {
              var i = _g1++;
              if (i != 2) str += "," + js.Boot.__string_rec(o[i], s); else str += js.Boot.__string_rec(o[i], s);
            }
            return str + ")";
          }
          var l = o.length;
          var i;
          var str = "[";
          s += "\t";
          var _g = 0;
          while (_g < l) {
            var i1 = _g++;
            str += (i1 > 0 ? "," : "") + js.Boot.__string_rec(o[i1], s);
          }
          str += "]";
          return str;
        }
        var tostr;
        try {
          tostr = o.toString;
        } catch (e) {
          return "???";
        }
        if (tostr != null && tostr != Object.toString) {
          var s2 = o.toString();
          if (s2 != "[object Object]") return s2;
        }
        var k = null;
        var str = "{\n";
        s += "\t";
        var hasp = o.hasOwnProperty != null;
        for (var k in o) {
          ;
          if (hasp && !o.hasOwnProperty(k)) {
            continue;
          }
          if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
            continue;
          }
          if (str.length != 2) str += ", \n";
          str += s + k + " : " + js.Boot.__string_rec(o[k], s);
        }
        s = s.substring(1);
        str += "\n" + s + "}";
        return str;
      case "function":
        return "<function>";
      case "string":
        return o;
      default:
        return String(o);
    }
  }
  js.Boot.__interfLoop = function (cc, cl) {
    if (cc == null) return false;
    if (cc == cl) return true;
    var intf = cc.__interfaces__;
    if (intf != null) {
      var _g1 = 0, _g = intf.length;
      while (_g1 < _g) {
        var i = _g1++;
        var i1 = intf[i];
        if (i1 == cl || js.Boot.__interfLoop(i1, cl)) return true;
      }
    }
    return js.Boot.__interfLoop(cc.__super__, cl);
  }
  js.Boot.__instanceof = function (o, cl) {
    try {
      if (o instanceof cl) {
        if (cl == Array) return o.__enum__ == null;
        return true;
      }
      if (js.Boot.__interfLoop(o.__class__, cl)) return true;
    } catch (e) {
      if (cl == null) return false;
    }
    switch (cl) {
      case Int:
        return Math.ceil(o % 2147483648.0) === o;
      case Float:
        return typeof (o) == "number";
      case Bool:
        return o === true || o === false;
      case String:
        return typeof (o) == "string";
      case Dynamic:
        return true;
      default:
        if (o == null) return false;
        if (cl == Class && o.__name__ != null) return true; else null;
        if (cl == Enum && o.__ename__ != null) return true; else null;
        return o.__enum__ == cl;
    }
  }
  js.Boot.__cast = function (o, t) {
    if (js.Boot.__instanceof(o, t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
  }
  js.Lib = function () { }
  js.Lib.__name__ = true;
  js.Lib.debug = function () {
    debugger;
  }
  js.Lib.alert = function (v) {
    alert(js.Boot.__string_rec(v, ""));
  }
  js.Lib.eval = function (code) {
    return eval(code);
  }
  js.Lib.setErrorHandler = function (f) {
    js.Lib.onerror = f;
  }
  var $_;
  function $bind(o, m) { var f = function () { return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
  if (Array.prototype.indexOf) HxOverrides.remove = function (a, o) {
    var i = a.indexOf(o);
    if (i == -1) return false;
    a.splice(i, 1);
    return true;
  }; else null;
  Math.__name__ = ["Math"];
  Math.NaN = Number.NaN;
  Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
  Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
  Math.isFinite = function (i) {
    return isFinite(i);
  };
  Math.isNaN = function (i) {
    return isNaN(i);
  };
  String.prototype.__class__ = String;
  String.__name__ = true;
  Array.prototype.__class__ = Array;
  Array.__name__ = true;
  Date.prototype.__class__ = Date;
  Date.__name__ = ["Date"];
  var Int = { __name__: ["Int"] };
  var Dynamic = { __name__: ["Dynamic"] };
  var Float = Number;
  Float.__name__ = ["Float"];
  var Bool = Boolean;
  Bool.__ename__ = ["Bool"];
  var Class = { __name__: ["Class"] };
  var Enum = {};
  var Void = { __ename__: ["Void"] };
  if (typeof document != "undefined") js.Lib.document = document;
  if (typeof window != "undefined") {
    js.Lib.window = window;
    js.Lib.window.onerror = function (msg, url, line) {
      var f = js.Lib.onerror;
      if (f == null) return false;
      return f(msg, [url + ":" + line]);
    };
  }
  com.wiris.js.JsPluginTools.main();
}());
delete Array.prototype.__class__;
// @codingStandardsIgnoreEnd


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/parser.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/parser.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Parser)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/util.js");
/* harmony import */ var _latex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./latex */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/latex.js");
/* harmony import */ var _mathml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mathml */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/mathml.js");
/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/image.js");
/* harmony import */ var _accessibility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accessibility */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/accessibility.js");
/* harmony import */ var _serviceprovider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./serviceprovider */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/serviceprovider.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./configuration */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/configuration.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/constants.js");
/* harmony import */ var _md5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./md5 */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/md5.js");








// eslint-disable-next-line no-unused-vars


/**
 * @classdesc
 * This class represent a MahML parser. Converts MathML into formulas depending on the
 * image format (SVG, PNG, base64) and the save mode (XML, safeXML, Image) configured
 * in the backend.
 */
class Parser {
  /**
   * Converts a MathML string to an img element.
   * @param {Document} creator - Document object to call createElement method.
   * @param {string} mathml - MathML code
   * @param {Object[]} wirisProperties - object containing WIRIS custom properties
   * @param {language} language - custom language for accessibility.
   * @returns {HTMLImageElement} the formula image corresponding to initial MathML string.
   * @static
   */
  static mathmlToImgObject(creator, mathml, wirisProperties, language) {
    const imgObject = creator.createElement('img');
    imgObject.align = 'middle';
    imgObject.style.maxWidth = 'none';
    let data = wirisProperties || {};

    // Take into account the backend config
    const wirisEditorProperties = _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get("editorParameters");
    data = { ...wirisEditorProperties, ...data };

    data.mml = mathml;
    data.lang = language;
    // Request metrics of the generated image.
    data.metrics = 'true';
    data.centerbaseline = 'false';

    // Full base64 method (edit & save).
    if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'base64' && _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('base64savemode') === 'default') {
      data.base64 = true;
    }

    // Render js params: _wrs_int_wirisProperties contains some js render params.
    // Since MathML can support render params, js params should be send only to editor.

    imgObject.className = _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageClassName');

    if (mathml.indexOf('class="') !== -1) {
      // We check here if the MathML has been created from a customEditor (such chemistry)
      // to add custom editor name attribute to img object (if necessary).
      let mathmlSubstring = mathml.substring(mathml.indexOf('class="') + 'class="'.length, mathml.length);
      mathmlSubstring = mathmlSubstring.substring(0, mathmlSubstring.indexOf('"'));
      mathmlSubstring = mathmlSubstring.substring(4, mathmlSubstring.length);
      imgObject.setAttribute(_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageCustomEditorName'), mathmlSubstring);
    }

    // Performance enabled.
    if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('wirisPluginPerformance') && (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'xml' || _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'safeXml')) {
      let result = JSON.parse(Parser.createShowImageSrc(data, language));
      if (result.status === 'warning') {
        // POST call.
        // if the mathml is malformed, this function will throw an exception.
        try {
          result = JSON.parse(_serviceprovider__WEBPACK_IMPORTED_MODULE_5__["default"].getService('showimage', data));
        } catch (e) {
          return null;
        }
      }
      ({ result } = result);
      if (result.format === 'png') {
        imgObject.src = `data:image/png;base64,${result.content}`;
      } else {
        imgObject.src = `data:image/svg+xml;charset=utf8,${_util__WEBPACK_IMPORTED_MODULE_0__["default"].urlEncode(result.content)}`;
      }
      imgObject.setAttribute(_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageMathmlAttribute'), _mathml__WEBPACK_IMPORTED_MODULE_2__["default"].safeXmlEncode(mathml));
      _image__WEBPACK_IMPORTED_MODULE_3__["default"].setImgSize(imgObject, result.content, true);

      if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('enableAccessibility')) {
        if (typeof result.alt === 'undefined') {
          imgObject.alt = _accessibility__WEBPACK_IMPORTED_MODULE_4__["default"].mathMLToAccessible(mathml, language, data);
        } else {
          imgObject.alt = result.alt;
        }
      }
    } else {
      const result = Parser.createImageSrc(mathml, data);
      imgObject.setAttribute(_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageMathmlAttribute'), _mathml__WEBPACK_IMPORTED_MODULE_2__["default"].safeXmlEncode(mathml));
      imgObject.src = result;
      _image__WEBPACK_IMPORTED_MODULE_3__["default"].setImgSize(imgObject, result, _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'base64' && _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('base64savemode') === 'default');
      if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('enableAccessibility')) {
        imgObject.alt = _accessibility__WEBPACK_IMPORTED_MODULE_4__["default"].mathMLToAccessible(mathml, language, data);
      }
    }

    if (typeof Parser.observer !== 'undefined') {
      Parser.observer.observe(imgObject);
    }

    // Role math https://www.w3.org/TR/wai-aria/roles#math.
    imgObject.setAttribute('role', 'math');
    return imgObject;
  }

  /**
   * Returns the source to showimage service by calling createimage service. The
   * output of the createimage service is a URL path pointing to showimage service.
   * This method is called when performance is disabled.
   * @param {string} mathml - MathML code.
   * @param {Object[]} data - data object containing service parameters.
   * @returns {string} the showimage path.
   */
  static createImageSrc(mathml, data) {
    // Full base64 method (edit & save).
    if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'base64' && _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('base64savemode') === 'default') {
      data.base64 = true;
    }

    let result = _serviceprovider__WEBPACK_IMPORTED_MODULE_5__["default"].getService('createimage', data);

    if (result.indexOf('@BASE@') !== -1) {
      // Replacing '@BASE@' with the base URL of createimage.
      const baseParts = _serviceprovider__WEBPACK_IMPORTED_MODULE_5__["default"].getServicePath('createimage').split('/');
      baseParts.pop();
      result = result.split('@BASE@').join(baseParts.join('/'));
    }

    return result;
  }

  /**
   * Parses initial HTML code. If the HTML contains data generated by WIRIS,
   * this data would be converted as following:
   * <pre>
   * MathML code: Image containing the corresponding MathML formulas.
   * MathML code with LaTeX annotation : LaTeX string.
   * </pre>
   * @param {string} code - HTML code containing MathML data.
   * @param {string} language - language to create image alt text.
   * @returns {string} HTML code with the original MathML converted into LaTeX and images.
   */
  static initParse(code, language) {
    /* Note: The code inside this function has been inverted.
    If you invert again the code then you cannot use correctly LaTeX
    in Moodle.
    */
    code = Parser.initParseSaveMode(code, language);
    return Parser.initParseEditMode(code);
  }

  /**
   * Parses initial HTML code depending on the save mode. Transforms all MathML
   * occurrences for it's correspondent image or LaTeX.
   * @param {string} code - HTML code to be parsed
   * @param {string} language - language to create image alt text.
   * @returns {string} HTML code parsed.
   */
  static initParseSaveMode(code, language) {
    if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode')) {
      // Converting XML to tags.
      code = _latex__WEBPACK_IMPORTED_MODULE_1__["default"].parseMathmlToLatex(code, _constants__WEBPACK_IMPORTED_MODULE_7__["default"].safeXmlCharacters);
      code = _latex__WEBPACK_IMPORTED_MODULE_1__["default"].parseMathmlToLatex(code, _constants__WEBPACK_IMPORTED_MODULE_7__["default"].xmlCharacters);
      code = Parser.parseMathmlToImg(code, _constants__WEBPACK_IMPORTED_MODULE_7__["default"].safeXmlCharacters, language);
      code = Parser.parseMathmlToImg(code, _constants__WEBPACK_IMPORTED_MODULE_7__["default"].xmlCharacters, language);
      if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'base64' && _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('base64savemode') === 'image') {
        code = Parser.codeImgTransform(code, 'base642showimage');
      }
    }
    return code;
  }

  /**
   * Parses initial HTML code depending on the edit mode.
   * If 'latex' parseMode is enabled all MathML containing an annotation with encoding='LaTeX' will
   * be converted into a LaTeX string instead of an image.
   * @param {string} code - HTML code containing MathML.
   * @returns {string} parsed HTML code.
   */
  static initParseEditMode(code) {
    if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('parseModes').indexOf('latex') !== -1) {
      const imgList = _util__WEBPACK_IMPORTED_MODULE_0__["default"].getElementsByNameFromString(code, 'img', true);
      const token = 'encoding="LaTeX">';
      // While replacing images with latex, the indexes of the found images changes
      // respecting the original code, so this carry is needed.
      let carry = 0;

      for (let i = 0; i < imgList.length; i += 1) {
        const imgCode = code.substring(imgList[i].start + carry, imgList[i].end + carry);

        if (imgCode.indexOf(` class="${_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageClassName')}"`) !== -1) {
          let mathmlStartToken = ` ${_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageMathmlAttribute')}="`;
          let mathmlStart = imgCode.indexOf(mathmlStartToken);

          if (mathmlStart === -1) {
            mathmlStartToken = ' alt="';
            mathmlStart = imgCode.indexOf(mathmlStartToken);
          }

          if (mathmlStart !== -1) {
            mathmlStart += mathmlStartToken.length;
            const mathmlEnd = imgCode.indexOf('"', mathmlStart);
            const mathml = _util__WEBPACK_IMPORTED_MODULE_0__["default"].htmlSanitize(_mathml__WEBPACK_IMPORTED_MODULE_2__["default"].safeXmlDecode(imgCode.substring(mathmlStart, mathmlEnd)));
            let latexStartPosition = mathml.indexOf(token);

            if (latexStartPosition !== -1) {
              latexStartPosition += token.length;
              const latexEndPosition = mathml.indexOf('</annotation>', latexStartPosition);
              const latex = mathml.substring(latexStartPosition, latexEndPosition);

              const replaceText = `$$${_util__WEBPACK_IMPORTED_MODULE_0__["default"].htmlEntitiesDecode(latex)}$$`;
              const start = code.substring(0, imgList[i].start + carry);
              const end = code.substring(imgList[i].end + carry);
              code = start + replaceText + end;
              carry += replaceText.length - (imgList[i].end - imgList[i].start);
            }
          }
        }
      }
    }

    return code;
  }

  /**
   * Parses end HTML code. The end HTML code is HTML code with embedded images
   * or LaTeX formulas created with MathType. <br>
   * By default this method converts the formula images and LaTeX strings in MathML. <br>
   * If image mode is enabled the images will not be converted into MathML. For further information see {@link https://docs.wiris.com/mathtype/en/mathtype-integrations/mathtype-web-interface-features/full-mathml-mode---wirisplugins-js.html}.
   * @param {string} code - HTML to be parsed
   * @returns {string} the HTML code parsed.
   */
  static endParse(code) {
    // Transform LaTeX ocurrences to MathML elements.
    const codeEndParsedEditMode = Parser.endParseEditMode(code);
    // Transform img elements to MathML elements.
    const codeEndParseSaveMode = Parser.endParseSaveMode(codeEndParsedEditMode);
    return codeEndParseSaveMode;
  }

  /**
   * Parses end HTML code depending on the edit mode.
   * - LaTeX is an enabled parse mode, all LaTeX occurrences will be converted into MathML.
   * @param {string} code - HTML code to be parsed.
   * @returns {string} HTML code parsed.
   */
  static endParseEditMode(code) {
    // Converting LaTeX to images.
    if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('parseModes').indexOf('latex') !== -1) {
      let output = '';
      let endPosition = 0;
      let startPosition = code.indexOf('$$');
      while (startPosition !== -1) {
        output += code.substring(endPosition, startPosition);
        endPosition = code.indexOf('$$', startPosition + 2);

        if (endPosition !== -1) {
          // Before, it was a condition here to execute the next codelines
          // 'latex.indexOf('<') == -1'.
          // We don't know why it was used, but seems to have a conflict with
          // latex formulas that contains '<'.
          const latex = code.substring(startPosition + 2, endPosition);
          const decodedLatex = _util__WEBPACK_IMPORTED_MODULE_0__["default"].htmlEntitiesDecode(latex);
          let mathml = _util__WEBPACK_IMPORTED_MODULE_0__["default"].htmlSanitize(_latex__WEBPACK_IMPORTED_MODULE_1__["default"].getMathMLFromLatex(decodedLatex, true));
          if (!_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveHandTraces')) {
            // Remove hand traces.
            mathml = _mathml__WEBPACK_IMPORTED_MODULE_2__["default"].removeAnnotation(mathml, 'application/json');
          }
          output += mathml;
          endPosition += 2;
        } else {
          output += '$$';
          endPosition = startPosition + 2;
        }

        startPosition = code.indexOf('$$', endPosition);
      }

      output += code.substring(endPosition, code.length);
      code = output;
    }

    return code;
  }

  /**
   * Parses end HTML code depending on the save mode. Converts all
   * images into the element determined by the save mode:
   * - xml: Parses images formulas into MathML.
   * - safeXml: Parses images formulas into safeMAthML
   * - base64: Parses images into base64 images.
   * - image: Parse images into images (no parsing)
   * @param {string} code - HTML code to be parsed
   * @returns {string} HTML code parsed.
   */
  static endParseSaveMode(code) {
    if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode')) {
      if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'safeXml') {
        code = Parser.codeImgTransform(code, 'img2mathml');
      } else if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'xml') {
        code = Parser.codeImgTransform(code, 'img2mathml');
      } else if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'base64' && _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('base64savemode') === 'image') {
        code = Parser.codeImgTransform(code, 'img264');
      }
    }

    return code;
  }


  /**
   * Auxiliar function that builds the data object to send to the showimage endpoint
   * @param {Object[]} data - object containing showimage service parameters.
   * @param {string} language - string containing the language of the formula.
   * @returns {Object} JSON object with the data to send to showimage.
   */
  static createShowImageSrcData(data, language) {
    const dataMd5 = {};
    const renderParams = ['mml', 'color', 'centerbaseline', 'zoom', 'dpi', 'fontSize', 'fontFamily', 'defaultStretchy', 'backgroundColor', 'format'];
    renderParams.forEach((param) => {
      if (typeof data[param] !== 'undefined') {
        dataMd5[param] = data[param];
      }
    });
    // Data variables to get.
    const dataObject = {};
    Object.keys(data).forEach((key) => {
      // We don't need mathml in this request we try to get cached.
      // Only need the formula md5 calculated before.
      if (key !== 'mml') {
        dataObject[key] = data[key];
      }
    });

    dataObject.formula = com.wiris.js.JsPluginTools.md5encode(_util__WEBPACK_IMPORTED_MODULE_0__["default"].propertiesToString(dataMd5));
    dataObject.lang = (typeof language === 'undefined') ? 'en' : language;
    dataObject.version = _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('version');

    return dataObject;
  }

  /**
   * Returns the result to call showimage service with the formula md5 as parameter.
   *  The result could be:
   * - {'status' : warning'} : The image associated to the MathML md5 is not in cache.
   * - {'status' : 'ok' ...} : The image associated to the MathML md5 is in cache.
   * @param {Object[]} data - object containing showimage service parameters.
   * @param {string} language - string containing the language of the formula.
   * @returns {Object} JSON object containing showimage response.
   */
  static createShowImageSrc(data, language) {
    const dataObject = this.createShowImageSrcData(data, language);
    const result = _serviceprovider__WEBPACK_IMPORTED_MODULE_5__["default"].getService('showimage', _util__WEBPACK_IMPORTED_MODULE_0__["default"].httpBuildQuery(dataObject), true);
    return result;
  }

  /**
   * Transform html img tags inside a html code to mathml, base64 img tags (i.e with base64 on src)
   * or showimage img tags (i.e with showimage.php on src)
   * @param  {string} code - HTML code
   * @param  {string} mode - base642showimage or img2mathml or img264 transform.
   * @returns {string} html - code transformed.
   */
  static codeImgTransform(code, mode) {
    let output = '';
    let endPosition = 0;
    const pattern = /<img/gi;
    const patternLength = pattern.source.length;

    while (pattern.test(code)) {
      const startPosition = pattern.lastIndex - patternLength;
      output += code.substring(endPosition, startPosition);

      let i = startPosition + 1;

      while (i < code.length && endPosition <= startPosition) {
        const character = code.charAt(i);

        if (character === '"' || character === '\'') {
          const characterNextPosition = code.indexOf(character, i + 1);

          if (characterNextPosition === -1) {
            i = code.length; // End while.
          } else {
            i = characterNextPosition;
          }
        } else if (character === '>') {
          endPosition = i + 1;
        }

        i += 1;
      }

      if (endPosition < startPosition) { // The img tag is stripped.
        output += code.substring(startPosition, code.length);
        return output;
      }
      let imgCode = code.substring(startPosition, endPosition);
      const imgObject = _util__WEBPACK_IMPORTED_MODULE_0__["default"].createObject(imgCode);
      let xmlCode = imgObject.getAttribute(_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageMathmlAttribute'));
      let convertToXml;
      let convertToSafeXml;

      if (mode === 'base642showimage') {
        if (xmlCode == null) {
          xmlCode = imgObject.getAttribute('alt');
        }
        xmlCode = _mathml__WEBPACK_IMPORTED_MODULE_2__["default"].safeXmlDecode(xmlCode);
        imgCode = Parser.mathmlToImgObject(document, xmlCode, null, null);
        output += _util__WEBPACK_IMPORTED_MODULE_0__["default"].createObjectCode(imgCode);
      } else if (mode === 'img2mathml') {
        if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode')) {
          if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'safeXml') {
            convertToXml = true;
            convertToSafeXml = true;
          } else if (_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('saveMode') === 'xml') {
            convertToXml = true;
            convertToSafeXml = false;
          }
        }
        output += _util__WEBPACK_IMPORTED_MODULE_0__["default"].getWIRISImageOutput(imgCode, convertToXml, convertToSafeXml);
      } else if (mode === 'img264') {
        if (xmlCode === null) {
          xmlCode = imgObject.getAttribute('alt');
        }
        xmlCode = _mathml__WEBPACK_IMPORTED_MODULE_2__["default"].safeXmlDecode(xmlCode);

        const properties = {};
        properties.base64 = 'true';
        imgCode = Parser.mathmlToImgObject(document, xmlCode, properties, null);
        // Metrics.
        _image__WEBPACK_IMPORTED_MODULE_3__["default"].setImgSize(imgCode, imgCode.src, true);
        output += _util__WEBPACK_IMPORTED_MODULE_0__["default"].createObjectCode(imgCode);
      }
    }
    output += code.substring(endPosition, code.length);
    return output;
  }

  /**
   * Converts all occurrences of MathML to the corresponding image.
   * @param {string} content - string with valid MathML code.
   * The MathML code doesn't contain semantics.
   * @param {Constants} characters - Constant object containing xmlCharacters
   * or safeXmlCharacters relation.
   * @param {string} language - a valid language code
   * in order to generate formula accessibility.
   * @returns {string} The input string with all the MathML
   * occurrences replaced by the corresponding image.
   */
  static parseMathmlToImg(content, characters, language) {
    let output = '';
    const mathTagBegin = `${characters.tagOpener}math`;
    const mathTagEnd = `${characters.tagOpener}/math${characters.tagCloser}`;
    let start = content.indexOf(mathTagBegin);
    let end = 0;

    while (start !== -1) {
      output += content.substring(end, start);
      // Avoid WIRIS images to be parsed.
      const imageMathmlAtrribute = content.indexOf(_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageMathmlAttribute'));
      end = content.indexOf(mathTagEnd, start);

      if (end === -1) {
        end = content.length - 1;
      } else if (imageMathmlAtrribute !== -1) {
        // First close tag of img attribute
        // If a mathmlAttribute exists should be inside a img tag.
        end += content.indexOf('/>', start);
      } else {
        end += mathTagEnd.length;
      }

      if (!_mathml__WEBPACK_IMPORTED_MODULE_2__["default"].isMathmlInAttribute(content, start) && imageMathmlAtrribute === -1) {
        let mathml = content.substring(start, end);
        mathml = (characters.id === _constants__WEBPACK_IMPORTED_MODULE_7__["default"].safeXmlCharacters.id)
          ? _mathml__WEBPACK_IMPORTED_MODULE_2__["default"].safeXmlDecode(mathml)
          : _mathml__WEBPACK_IMPORTED_MODULE_2__["default"].mathMLEntities(mathml);
        output += _util__WEBPACK_IMPORTED_MODULE_0__["default"].createObjectCode(Parser.mathmlToImgObject(document, mathml, null, language));
      } else {
        output += content.substring(start, end);
      }

      start = content.indexOf(mathTagBegin, end);
    }

    output += content.substring(end, content.length);
    return output;
  }
}

// Mutation observers to avoid wiris image formulas class be removed.
if (typeof MutationObserver !== 'undefined') {
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.oldValue === _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageClassName')
        && mutation.attributeName === 'class'
        && mutation.target.className.indexOf(_configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageClassName')) === -1) {
        mutation.target.className = _configuration__WEBPACK_IMPORTED_MODULE_6__["default"].get('imageClassName');
      }
    });
  });

  Parser.observer = Object.create(mutationObserver);
  Parser.observer.Config = { attributes: true, attributeOldValue: true };
  // We use own default config.
  Parser.observer.observe = function (target) {
    Object.getPrototypeOf(this).observe(target, this.Config);
  };
}


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/serviceprovider.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/serviceprovider.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ServiceProvider)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/util.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listeners */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/listeners.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuration */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/configuration.js");




/**
 * @typedef {Object} ServiceProviderProperties
 * @property {String} URI - Service URI.
 * @property {String} server - Service server language.
 */

/**
 * @classdesc
 * Class representing a serviceProvider. A serviceProvider is a class containing
 * an arbitrary number of services with the correspondent path.
 */
class ServiceProvider {
  /**
   * Returns Service Provider listeners.
   * @type {Listeners}
   */
  static get listeners() {
    return ServiceProvider._listeners;
  }

  /**
   * Adds a {@link Listener} instance to {@link ServiceProvider} class.
   * @param {Listener} listener - Instance of {@link Listener}.
   */
  static addListener(listener) {
    ServiceProvider.listeners.add(listener);
  }

  /**
   * Fires events in Service Provider.
   * @param {String} eventName - Event name.
   * @param {Event} event - Event object.
   */
  static fireEvent(eventName, event) {
    ServiceProvider.listeners.fire(eventName, event);
  }

  /**
   * Service parameters.
   * @type {ServiceProviderProperties}
   *
   */
  static get parameters() {
    return ServiceProvider._parameters;
  }

  /**
   * Service parameters.
   * @private
   * @type {ServiceProviderProperties}
   */
  static set parameters(parameters) {
    ServiceProvider._parameters = parameters;
  }

  /**
   * Static property.
   * Return service provider paths.
   * @private
   * @type {String}
   */
  static get servicePaths() {
    return ServiceProvider._servicePaths;
  }

  /**
   * Static property setter.
   * Set service paths.
   * @param {String} value - The property value.
   * @ignore
   */
  static set servicePaths(value) {
    ServiceProvider._servicePaths = value;
  }

  /**
   * Adds a new service to the ServiceProvider.
   * @param {String} service - Service name.
   * @param {String} path - Service path.
   * @static
   */
  static setServicePath(service, path) {
    ServiceProvider.servicePaths[service] = path;
  }

  /**
   * Returns the service path for a certain service.
   * @param {String} serviceName - Service name.
   * @returns {String} The service path.
   * @static
   */
  static getServicePath(serviceName) {
    return ServiceProvider.servicePaths[serviceName];
  }

  /**
   * Static property.
   * Service provider integration path.
   * @type {String}
   */
  static get integrationPath() {
    return ServiceProvider._integrationPath;
  }

  /**
   * Static property setter.
   * Set service provider integration path.
   * @param {String} value - The property value.
   * @ignore
   */
  static set integrationPath(value) {
    ServiceProvider._integrationPath = value;
  }

  /**
   * Returns the server URL in the form protocol://serverName:serverPort.
   * @return {String} The client side server path.
   */
  static getServerURL() {
    const url = window.location.href;
    const arr = url.split('/');
    const result = `${arr[0]}//${arr[2]}`;
    return result;
  }

  /**
   * Inits {@link this} class. Uses {@link this.integrationPath} as
   * base path to generate all backend services paths.
   * @param {Object} parameters - Function parameters.
   * @param {String} parameters.integrationPath - Service path.
   */
  static init(parameters) {
    ServiceProvider.parameters = parameters;
    // Services path (tech dependant).
    let configurationURI = ServiceProvider.createServiceURI('configurationjs');
    let createImageURI = ServiceProvider.createServiceURI('createimage');
    let showImageURI = ServiceProvider.createServiceURI('showimage');
    let getMathMLURI = ServiceProvider.createServiceURI('getmathml');
    let serviceURI = ServiceProvider.createServiceURI('service');

    // Some backend integrations (like Java o Ruby) have an absolute backend path,
    // for example: /app/service. For them we calculate the absolute URL path, i.e
    // protocol://domain:port/app/service
    if (ServiceProvider.parameters.URI.indexOf('/') === 0) {
      const serverPath = ServiceProvider.getServerURL();
      configurationURI = serverPath + configurationURI;
      showImageURI = serverPath + showImageURI;
      createImageURI = serverPath + createImageURI;
      getMathMLURI = serverPath + getMathMLURI;
      serviceURI = serverPath + serviceURI;
    }

    ServiceProvider.setServicePath('configurationjs', configurationURI);
    ServiceProvider.setServicePath('showimage', showImageURI);
    ServiceProvider.setServicePath('createimage', createImageURI);
    ServiceProvider.setServicePath('service', serviceURI);
    ServiceProvider.setServicePath('getmathml', getMathMLURI);
    ServiceProvider.setServicePath('configurationjs', configurationURI);

    ServiceProvider.listeners.fire('onInit', {});
  }

  /**
   * Gets the content from an URL.
   * @param {String} url - Target URL.
   * @param {Object} [postVariables] - Object containing post variables.
   * null if a GET query should be done.
   * @returns {String} Content of the target URL.
   * @private
   * @static
   */
  static getUrl(url, postVariables) {
    const currentPath = window.location.toString().substr(0, window.location.toString().lastIndexOf('/') + 1);
    const httpRequest = _util__WEBPACK_IMPORTED_MODULE_0__["default"].createHttpRequest();

    if (httpRequest) {
      if (typeof postVariables === 'undefined' || typeof postVariables === 'undefined') {
        httpRequest.open('GET', url, false);
      } else if (url.substr(0, 1) === '/' || url.substr(0, 7) === 'http://' || url.substr(0, 8) === 'https://') {
        httpRequest.open('POST', url, false);
      } else {
        httpRequest.open('POST', currentPath + url, false);
      }

      let header = _configuration__WEBPACK_IMPORTED_MODULE_2__["default"].get('customHeaders');
      if (header) {
        header = header.toString()
        header.split(",")
          .map(element => element.trim().split('='))
          .forEach(([key, val]) => httpRequest.setRequestHeader(key, val));
      }

      if (typeof postVariables !== 'undefined' && postVariables) {
        httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        httpRequest.send(_util__WEBPACK_IMPORTED_MODULE_0__["default"].httpBuildQuery(postVariables));
      } else {
        httpRequest.send(null);
      }
   
      return httpRequest.responseText;
    }
    return '';
  }

  /**
   * Returns the response text of a certain service.
   * @param {String} service - Service name.
   * @param {String} postVariables - Post variables.
   * @param {Boolean} get - True if the request is GET instead of POST. false otherwise.
   * @returns {String} Service response text.
   */
  static getService(service, postVariables, get) {
    let response;
    if (get === true) {
      const getVariables = postVariables ? `?${postVariables}` : '';
      const serviceUrl = `${ServiceProvider.getServicePath(service)}${getVariables}`;
      response = ServiceProvider.getUrl(serviceUrl);
    } else {
      const serviceUrl = ServiceProvider.getServicePath(service);
      response = ServiceProvider.getUrl(serviceUrl, postVariables);
    }
    return response;
  }

  /**
   * Returns the server language of a certain service. The possible values
   * are: php, aspx, java and ruby.
   * This method has backward compatibility purposes.
   * @param {String} service - The configuration service.
   * @returns {String} - The server technology associated with the configuration service.
   */
  static getServerLanguageFromService(service) {
    if (service.indexOf('.php') !== -1) {
      return 'php';
    }
    if (service.indexOf('.aspx') !== -1) {
      return 'aspx';
    }
    if (service.indexOf('wirispluginengine') !== -1) {
      return 'ruby';
    }
    return 'java';
  }

  /**
   * Returns the URI associated with a certain service.
   * @param {String} service - The service name.
   * @return {String} The service path.
   */
  static createServiceURI(service) {
    const extension = ServiceProvider.serverExtension();
    return _util__WEBPACK_IMPORTED_MODULE_0__["default"].concatenateUrl(ServiceProvider.parameters.URI, service) + extension;
  }

  static serverExtension() {
    if (ServiceProvider.parameters.server.indexOf('php') !== -1) {
      return '.php';
    }
    if (ServiceProvider.parameters.server.indexOf('aspx') !== -1) {
      return '.aspx';
    }
    return '';
  }
}

/**
 * @property {String} service - The service name.
 * @property {String} path - The service path.
 * @static
 */
ServiceProvider._servicePaths = {};

/**
 * The integration path. Contains the path of the configuration service.
 * Used to define the path for all services.
 * @type {String}
 * @private
 */
ServiceProvider._integrationPath = '';

/**
 * ServiceProvider static listeners.
 * @type {Listeners}
 * @private
 */
ServiceProvider._listeners = new _listeners__WEBPACK_IMPORTED_MODULE_1__["default"]();

/**
 * Service provider parameters.
 * @type {ServiceProviderParameters}
 */
ServiceProvider._parameters = {};


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/stringmanager.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/stringmanager.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StringManager)
/* harmony export */ });
/* harmony import */ var _lang_strings_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lang/strings.json */ "./node_modules/@wiris/mathtype-html-integration-devkit/lang/strings.json");

/**
 * This class represents a string manager. It's used to load localized strings.
 */
class StringManager {
  constructor() {
    throw new Error('Static class StringManager can not be instantiated.');
  }

  /**
   * Returns the associated value of certain string key. If the associated value
   * doesn't exits returns the original key.
   * @param {string} key - string key
   * @param {string} lang - DEFAULT = null. Specify the language to translate the string
   * @returns {string} correspondent value. If doesn't exists original key.
   */
  static get(key, lang) {

    // Default language definition
    let {language} = this;

    // If parameter language, use it
    if (lang) {
      language = lang;
    }

    // Cut down on strings. e.g. en_US -> en
    if (language && language.length > 2) {
      language = language.slice(0, 2);
    }

    // Check if we support the language
    if (!this.strings.hasOwnProperty(language)) { // eslint-disable-line no-prototype-builtins
      console.warn(`Unknown language ${language} set in StringManager.`);
      language = 'en';
    }

    // Check if the key is supported in the given language
    if (!this.strings[language].hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
      console.warn(`Unknown key ${key} for language ${language} in StringManager.`);
      return key;
    }

    return this.strings[language][key];
  }
}

/**
 * Dictionary of dictionaries:
 * Key: language code
 * Value: Key: id of the string
 *        Value: translation of the string
 */
StringManager.strings = _lang_strings_json__WEBPACK_IMPORTED_MODULE_0__;

/**
 * Language of the translations; English by default
 */
StringManager.language = 'en';


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/textcache.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/textcache.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextCache)
/* harmony export */ });
class TextCache {
  /**
   * @classdesc
   * This class represent a client-side text cache class. Contains pairs of
   * strings (key/value) which can be retrieved in any moment. Usually used
   * to store AJAX responses for text services like mathml2latex
   * (c.f {@link Latex} class) or mathml2accessible (c.f {@link Accessibility} class).
   * @constructs
   */
  constructor() {
    /**
     * Cache array property storing the cache entries.
     * @type {Array.<String>}
     */
    this.cache = [];
  }

  /**
   * This method populates a key/value pair into the {@link this.cache} property.
   * @param {String} key - Cache key, usually the service string parameter.
   * @param {String} value - Cache value, usually the service response.
   */
  populate(key, value) {
    this.cache[key] = value;
  }

  /**
   * Returns the cache value associated to certain cache key.
   * @param {String} key - Cache key, usually the service string parameter.
   * @return {String} value - Cache value, if exists. False otherwise.
   */
  get(key) {
    if (Object.prototype.hasOwnProperty.call(this.cache, key)) {
      return this.cache[key];
    }
    return false;
  }
}


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/src/util.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/src/util.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dompurify */ "../../node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mathml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mathml */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/mathml.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuration */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/configuration.js");
/* harmony import */ var _latex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./latex */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/latex.js");
/* harmony import */ var _stringmanager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stringmanager */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/stringmanager.js");
/* eslint-disable no-bitwise */






/**
 * This class represents an utility class.
 */
class Util {
  /**
   * Fires an event in a target.
   * @param {EventTarget} eventTarget - target where event should be fired.
   * @param {string} eventName event to fire.
   * @static
   */
  static fireEvent(eventTarget, eventName) {
    if (document.createEvent) {
      const eventObject = document.createEvent('HTMLEvents');
      eventObject.initEvent(eventName, true, true);
      return !eventTarget.dispatchEvent(eventObject);
    }

    const eventObject = document.createEventObject();
    return eventTarget.fireEvent(`on${eventName}`, eventObject);
  }

  /**
   * Cross-browser addEventListener/attachEvent function.
   * @param {EventTarget} eventTarget - target to add the event.
   * @param {string} eventName - specifies the type of event.
   * @param {Function} callBackFunction - callback function.
   * @static
   */
  static addEvent(eventTarget, eventName, callBackFunction) {
    if (eventTarget.addEventListener) {
      eventTarget.addEventListener(eventName, callBackFunction, true);
    } else if (eventTarget.attachEvent) {
      // Backwards compatibility.
      eventTarget.attachEvent(`on${eventName}`, callBackFunction);
    }
  }

  /**
   * Cross-browser removeEventListener/detachEvent function.
   * @param {EventTarget} eventTarget - target to add the event.
   * @param {string} eventName - specifies the type of event.
   * @param {Function} callBackFunction - function to remove from the event target.
   * @static
   */
  static removeEvent(eventTarget, eventName, callBackFunction) {
    if (eventTarget.removeEventListener) {
      eventTarget.removeEventListener(eventName, callBackFunction, true);
    } else if (eventTarget.detachEvent) {
      eventTarget.detachEvent(`on${eventName}`, callBackFunction);
    }
  }

  /**
   * Adds the a callback function, for a certain event target, to the following event types:
   * - dblclick
   * - mousedown
   * - mouseup
   * @param {EventTarget} eventTarget - event target.
   * @param {Function} doubleClickHandler - function to run when on dblclick event.
   * @param {Function} mousedownHandler - function to run when on mousedown event.
   * @param {Function} mouseupHandler - function to run when on mouseup event.
   * @static
   */
  static addElementEvents(eventTarget, doubleClickHandler, mousedownHandler, mouseupHandler) {
    if (doubleClickHandler) {
      this.callbackDblclick = (event) => {
        const realEvent = (event) || window.event;
        const element = realEvent.srcElement ? realEvent.srcElement : realEvent.target;
        doubleClickHandler(element, realEvent);
      };

      Util.addEvent(eventTarget, 'dblclick', this.callbackDblclick);
    }

    if (mousedownHandler) {
      this.callbackMousedown = (event) => {
        const realEvent = (event) || window.event;
        const element = realEvent.srcElement ? realEvent.srcElement : realEvent.target;
        mousedownHandler(element, realEvent);
      };

      Util.addEvent(eventTarget, 'mousedown', this.callbackMousedown);
    }

    if (mouseupHandler) {
      this.callbackMouseup = (event) => {
        const realEvent = (event) || window.event;
        const element = realEvent.srcElement ? realEvent.srcElement : realEvent.target;
        mouseupHandler(element, realEvent);
      };
      // Chrome doesn't trigger this event for eventTarget if we release the mouse button
      // while the mouse is outside the editor text field.
      // This is a workaround: we trigger the event independently of where the mouse
      // is when we release its button.
      Util.addEvent(document, 'mouseup', this.callbackMouseup);
      Util.addEvent(eventTarget, 'mouseup', this.callbackMouseup);
    }
  }

  /**
   * Remove all callback function, for a certain event target, to the following event types:
   * - dblclick
   * - mousedown
   * - mouseup
   * @param {EventTarget} eventTarget - event target.
   * @static
   */
  static removeElementEvents(eventTarget) {
    Util.removeEvent(eventTarget, 'dblclick', this.callbackDblclick);
    Util.removeEvent(eventTarget, 'mousedown', this.callbackMousedown);
    Util.removeEvent(document, 'mouseup', this.callbackMouseup);
    Util.removeEvent(eventTarget, 'mouseup', this.callbackMouseup);
  }

  /**
   * Adds a class name to a HTMLElement.
   * @param {HTMLElement} element - the HTML element.
   * @param {string} className - the class name.
   * @static
   */
  static addClass(element, className) {
    if (!Util.containsClass(element, className)) {
      element.className += ` ${className}`;
    }
  }

  /**
   * Checks if a HTMLElement contains a certain class.
   * @param {HTMLElement} element - the HTML element.
   * @param {string} className - the className.
   * @returns {boolean} true if the HTMLElement contains the class name. false otherwise.
   * @static
   */
  static containsClass(element, className) {
    if (element == null || !('className' in element)) {
      return false;
    }

    const currentClasses = element.className.split(' ');

    for (let i = currentClasses.length - 1; i >= 0; i -= 1) {
      if (currentClasses[i] === className) {
        return true;
      }
    }

    return false;
  }

  /**
   * Remove a certain class for a HTMLElement.
   * @param {HTMLElement} element - the HTML element.
   * @param {string} className - the class name.
   * @static
   */
  static removeClass(element, className) {
    let newClassName = '';
    const classes = element.className.split(' ');

    for (let i = 0; i < classes.length; i += 1) {
      if (classes[i] !== className) {
        newClassName += `${classes[i]} `;
      }
    }
    element.className = newClassName.trim();
  }

  /**
   * Converts old xml initial text attribute (with «») to the correct one(with §lt;§gt;). It's
   * used to parse old applets.
   * @param {string} text - string containing safeXml characters
   * @returns {string} a string with safeXml characters parsed.
   * @static
   */
  static convertOldXmlinitialtextAttribute(text) {
    // Used to fix a bug with Cas imported from Moodle 1.9 to Moodle 2.x.
    // This could be removed in future.
    const val = 'value=';

    const xitpos = text.indexOf('xmlinitialtext');
    const valpos = text.indexOf(val, xitpos);
    const quote = text.charAt(valpos + val.length);
    const startquote = valpos + val.length + 1;
    const endquote = text.indexOf(quote, startquote);

    const value = text.substring(startquote, endquote);

    let newvalue = value.split('«').join('§lt;');
    newvalue = newvalue.split('»').join('§gt;');
    newvalue = newvalue.split('&').join('§');
    newvalue = newvalue.split('¨').join('§quot;');

    text = text.split(value).join(newvalue);
    return text;
  }

  /**
   * Cross-browser solution for creating new elements.
   * @param {string} tagName - tag name of the wished element.
   * @param {Object} attributes - an object where each key is a wished
   * attribute name and each value is its value.
   * @param {Object} [creator] - if supplied, this function will use
   * the "createElement" method from this param. Otherwise
   * document will be used as creator.
   * @returns {Element} The DOM element with the specified attributes assigned.
   * @static
   */
  static createElement(tagName, attributes, creator) {
    if (attributes === undefined) {
      attributes = {};
    }

    if (creator === undefined) {
      creator = document;
    }

    let element;

    /*
    * Internet Explorer fix:
    * If you create a new object dynamically, you can't set a non-standard attribute.
    * For example, you can't set the "src" attribute on an "applet" object.
    * Other browsers will throw an exception and will run the standard code.
    */
    try {
      let html = `<${tagName}`;

      Object.keys(attributes).forEach((attributeName) => {
        html += ` ${attributeName}="${Util.htmlEntities(attributes[attributeName])}"`;
      });
      html += '>';
      element = creator.createElement(html);
    } catch (e) {
      element = creator.createElement(tagName);
      Object.keys(attributes).forEach((attributeName) => {
        element.setAttribute(attributeName, attributes[attributeName]);
      });
    }
    return element;
  }

  /**
   * Creates new HTML from it's HTML code as string.
   * @param {string} objectCode - html code
   * @returns {Element} the HTML element.
   * @static
   */
  static createObject(objectCode, creator) {
    if (creator === undefined) {
      creator = document;
    }

    // Internet Explorer can't include "param" tag when is setting an innerHTML property.
    objectCode = objectCode.split('<applet ').join('<span wirisObject="WirisApplet" ').split('<APPLET ').join('<span wirisObject="WirisApplet" '); // It is a 'span' because 'span' objects can contain 'br' nodes.
    objectCode = objectCode.split('</applet>').join('</span>').split('</APPLET>').join('</span>');

    objectCode = objectCode.split('<param ').join('<br wirisObject="WirisParam" ').split('<PARAM ').join('<br wirisObject="WirisParam" '); // It is a 'br' because 'br' can't contain nodes.
    objectCode = objectCode.split('</param>').join('</br>').split('</PARAM>').join('</br>');

    const container = Util.createElement('div', {}, creator);
    container.innerHTML = objectCode;

    function recursiveParamsFix(object) {
      if (object.getAttribute && object.getAttribute('wirisObject') === 'WirisParam') {
        const attributesParsed = {};

        for (let i = 0; i < object.attributes.length; i += 1) {
          if (object.attributes[i].nodeValue !== null) {
            attributesParsed[object.attributes[i].nodeName] = object.attributes[i].nodeValue;
          }
        }

        const param = Util.createElement('param', attributesParsed, creator);

        // IE fix.
        if (param.NAME) {
          param.name = param.NAME;
          param.value = param.VALUE;
        }

        param.removeAttribute('wirisObject');
        object.parentNode.replaceChild(param, object);
      } else if (object.getAttribute && object.getAttribute('wirisObject') === 'WirisApplet') {
        const attributesParsed = {};

        for (let i = 0; i < object.attributes.length; i += 1) {
          if (object.attributes[i].nodeValue !== null) {
            attributesParsed[object.attributes[i].nodeName] = object.attributes[i].nodeValue;
          }
        }

        const applet = Util.createElement('applet', attributesParsed, creator);
        applet.removeAttribute('wirisObject');

        for (let i = 0; i < object.childNodes.length; i += 1) {
          recursiveParamsFix(object.childNodes[i]);

          if (object.childNodes[i].nodeName.toLowerCase() === 'param') {
            applet.appendChild(object.childNodes[i]);
            i -= 1; // When we insert the object child into the applet, object loses one child.
          }
        }

        object.parentNode.replaceChild(applet, object);
      } else {
        for (let i = 0; i < object.childNodes.length; i += 1) {
          recursiveParamsFix(object.childNodes[i]);
        }
      }
    }

    recursiveParamsFix(container);
    return container.firstChild;
  }

  /**
   * Converts an Element to its HTML code.
   * @param {Element} element - entry element.
   * @return {string} the HTML code of the input element.
   * @static
   */
  static createObjectCode(element) {
    // In case that the image was not created, the object can be null or undefined.
    if (typeof element === 'undefined' || element === null) {
      return null;
    }

    if (element.nodeType === 1) { // ELEMENT_NODE.
      let output = `<${element.tagName}`;

      for (let i = 0; i < element.attributes.length; i += 1) {
        if (element.attributes[i].specified) {
          output += ` ${element.attributes[i].name}="${Util.htmlEntities(element.attributes[i].value)}"`;
        }
      }

      if (element.childNodes.length > 0) {
        output += '>';

        for (let i = 0; i < element.childNodes.length; i += 1) {
          output += Util.createObject(element.childNodes[i]);
        }

        output += `</${element.tagName}>`;
      } else if (element.nodeName === 'DIV' || element.nodeName === 'SCRIPT') {
        output += `></${element.tagName}>`;
      } else {
        output += '/>';
      }

      return output;
    }

    if (element.nodeType === 3) { // TEXT_NODE.
      return Util.htmlEntities(element.nodeValue);
    }

    return '';
  }

  /**
   * Concatenates two URL paths.
   * @param {string} path1 - first URL path
   * @param {string} path2 - second URL path
   * @returns {string} new URL.
   */
  static concatenateUrl(path1, path2) {
    let separator = '';
    if ((path1.indexOf('/') !== path1.length) && (path2.indexOf('/') !== 0)) {
      separator = '/';
    }
    return (path1 + separator + path2).replace(/([^:]\/)\/+/g, '$1');
  }

  /**
   * Parses a text and replaces all HTML special characters by their correspondent entities.
   * @param {string} input - text to be parsed.
   * @returns {string} the input text with all their special characters replaced by their entities.
   * @static
   */
  static htmlEntities(input) {
    return input.split('&').join('&amp;').split('<').join('&lt;')
      .split('>')
      .join('&gt;')
      .split('"')
      .join('&quot;');
  }

  /**
   * Sanitize HTML to prevent XSS injections.
   * @param {string} html - html to be sanitize.
   * @returns {string} html sanitized.
   * @static
   */
  static htmlSanitize(html) {
    let annotationRegex = /\<annotation.+\<\/annotation\>/
    // Get all the annotation content including the tags.
    let annotation = html.match(annotationRegex);
    // Sanitize html code without removing the <semantics> and <annotation> tags.
    html = dompurify__WEBPACK_IMPORTED_MODULE_0___default().sanitize(html, { ADD_TAGS: ['semantics', 'annotation'], ALLOWED_ATTR: ['linebreak']});
    // Readd old annotation content.
    return html.replace(annotationRegex, annotation);
  }

  /**
   * Parses a text and replaces all the HTML entities by their characters.
   * @param {string} input - text to be parsed
   * @returns {string} the input text with all their entities replaced by characters.
   * @static
   */
  static htmlEntitiesDecode(input) {
    // Textarea element decodes when inner html is set.
    const textarea = document.createElement('textarea');
    textarea.innerHTML = input;
    return textarea.value;
  }

  /**
   * Returns a cross-browser http request.
   * @return {object} httpRequest request object.
   * @returns {XMLHttpRequest|ActiveXObject} the proper request object.
   */
  static createHttpRequest() {
    const currentPath = window.location.toString().substr(0, window.location.toString().lastIndexOf('/') + 1);
    if (currentPath.substr(0, 7) === 'file://') {
      throw _stringmanager__WEBPACK_IMPORTED_MODULE_4__["default"].get('exception_cross_site');
    }

    if (typeof XMLHttpRequest !== 'undefined') {
      return new XMLHttpRequest();
    }

    try {
      return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        return new ActiveXObject('Microsoft.XMLHTTP');
      } catch (oc) {
        return null;
      }
    }
  }

  /**
   * Converts a hash to a HTTP query.
   * @param {Object[]} properties - a key/value object.
   * @returns {string} a HTTP query containing all the key value pairs with
   * all the special characters replaced by their entities.
   * @static
   */
  static httpBuildQuery(properties) {
    let result = '';

    Object.keys(properties).forEach((i) => {
      if (properties[i] != null) {
        result += `${Util.urlEncode(i)}=${Util.urlEncode(properties[i])}&`;
      }
    });

    // Deleting last '&' empty character.
    if (result.substring(result.length - 1) === '&') {
      result = result.substring(0, result.length - 1);
    }

    return result;
  }

  /**
   * Convert a hash to string sorting keys to get a deterministic output
   * @param {Object[]} hash - a key/value object.
   * @returns {string} a string with the form key1=value1...keyn=valuen
   * @static
   */
  static propertiesToString(hash) {
    // 1. Sort keys. We sort the keys because we want a deterministic output.
    const keys = [];
    Object.keys(hash).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(hash, key)) {
        keys.push(key);
      }
    });

    const n = keys.length;
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        const s1 = keys[i];
        const s2 = keys[j];
        if (Util.compareStrings(s1, s2) > 0) {
          // Swap.
          keys[i] = s2;
          keys[j] = s1;
        }
      }
    }

    // 2. Generate output.
    let output = '';
    for (let i = 0; i < n; i += 1) {
      const key = keys[i];
      output += key;
      output += '=';
      let value = hash[key];
      value = value.replace('\\', '\\\\');
      value = value.replace('\n', '\\n');
      value = value.replace('\r', '\\r');
      value = value.replace('\t', '\\t');

      output += value;
      output += '\n';
    }
    return output;
  }

  /**
   * Compare two strings using charCodeAt method
   * @param {string} a - first string to compare.
   * @param {string} b - second string to compare.
   * @returns {number} the difference between a and b
   * @static
   */
  static compareStrings(a, b) {
    let i;
    const an = a.length;
    const bn = b.length;
    const n = (an > bn) ? bn : an;
    for (i = 0; i < n; i += 1) {
      const c = Util.fixedCharCodeAt(a, i) - Util.fixedCharCodeAt(b, i);
      if (c !== 0) {
        return c;
      }
    }
    return a.length - b.length;
  }

  /**
   * Fix charCodeAt() JavaScript function to handle non-Basic-Multilingual-Plane characters.
   * @param {string} string - input string
   * @param {number} idx - an integer greater than or equal to 0
   * and less than the length of the string
   * @returns {number} an integer representing the UTF-16 code of the string at the given index.
   * @static
   */
  static fixedCharCodeAt(string, idx) {
    idx = idx || 0;
    const code = string.charCodeAt(idx);
    let hi;
    let low;

    /* High surrogate (could change last hex to 0xDB7F to treat high
    private surrogates as single characters) */

    if (code >= 0xD800 && code <= 0xDBFF) {
      hi = code;
      low = string.charCodeAt(idx + 1);
      if (Number.isNaN(low)) {
        throw _stringmanager__WEBPACK_IMPORTED_MODULE_4__["default"].get('exception_high_surrogate');
      }
      return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }

    if (code >= 0xDC00 && code <= 0xDFFF) { // Low surrogate.
      /* We return false to allow loops to skip this iteration since should have
      already handled high surrogate above in the previous iteration. */
      return false;
    }
    return code;
  }

  /**
   * Returns an URL with it's query params converted into array.
   * @param {string} url - input URL.
   * @returns {Object[]} an array containing all URL query params.
   * @static
   */
  static urlToAssArray(url) {
    let i;
    i = url.indexOf('?');
    if (i > 0) {
      const query = url.substring(i + 1);
      const ss = query.split('&');
      const h = {};
      for (i = 0; i < ss.length; i += 1) {
        const s = ss[i];
        const kv = s.split('=');
        if (kv.length > 1) {
          h[kv[0]] = decodeURIComponent(kv[1].replace(/\+/g, ' '));
        }
      }
      return h;
    }
    return {};
  }

  /**
   * Returns an encoded URL by replacing each instance of certain characters by
   * one, two, three or four escape sequences using encodeURIComponent method.
   * !'()* . will not be encoded.
   *
   * @param {string} clearString - URL string to be encoded
   * @returns {string} URL with it's special characters replaced.
   * @static
   */
  static urlEncode(clearString) {
    let output = '';
    // Method encodeURIComponent doesn't encode !'()*~ .
    output = encodeURIComponent(clearString);
    return output;
  }

  // TODO: To parser?
  /**
   * Converts the HTML of a image into the output code that WIRIS must return.
   * By default returns the MathML stored on data-mahml attribute (if imgCode is a formula)
   * or the Wiriscas attribute of a WIRIS applet.
   * @param {string} imgCode - the html code from a formula or a CAS image.
   * @param {boolean} convertToXml - true if the image should be converted to XML.
   * @param {boolean} convertToSafeXml - true if the image should be converted to safeXML.
   * @returns {string} the XML or safeXML of a WIRIS image.
   * @static
   */
  static getWIRISImageOutput(imgCode, convertToXml, convertToSafeXml) {
    const imgObject = Util.createObject(imgCode);
    if (imgObject) {
      if (imgObject.className === _configuration__WEBPACK_IMPORTED_MODULE_2__["default"].get('imageClassName') || imgObject.getAttribute(_configuration__WEBPACK_IMPORTED_MODULE_2__["default"].get('imageMathmlAttribute'))) {
        if (!convertToXml) {
          return imgCode;
        }

        const dataMathML = imgObject.getAttribute(_configuration__WEBPACK_IMPORTED_MODULE_2__["default"].get('imageMathmlAttribute'));
        // To handle annotations, first we need the MathML in XML.
        let mathML = _mathml__WEBPACK_IMPORTED_MODULE_1__["default"].safeXmlDecode(dataMathML);

        if (!_configuration__WEBPACK_IMPORTED_MODULE_2__["default"].get('saveHandTraces')) {
          mathML = _mathml__WEBPACK_IMPORTED_MODULE_1__["default"].removeAnnotation(mathML, 'application/json');
        }

        if (mathML == null) {
          mathML = imgObject.getAttribute('alt');
        }

        if (convertToSafeXml) {
          const safeMathML = _mathml__WEBPACK_IMPORTED_MODULE_1__["default"].safeXmlEncode(mathML);
          return safeMathML;
        }

        return mathML;
      }
    }
    return imgCode;
  }

  /**
   * Gets the node length in characters.
   * @param {Node} node - HTML node.
   * @returns {number} node length.
   * @static
   */
  static getNodeLength(node) {
    const staticNodeLengths = {
      IMG: 1,
      BR: 1,
    };

    if (node.nodeType === 3) { // TEXT_NODE.
      return node.nodeValue.length;
    }

    if (node.nodeType === 1) { // ELEMENT_NODE.
      let length = staticNodeLengths[node.nodeName.toUpperCase()];

      if (length === undefined) {
        length = 0;
      }

      for (let i = 0; i < node.childNodes.length; i += 1) {
        length += Util.getNodeLength(node.childNodes[i]);
      }
      return length;
    }
    return 0;
  }

  /**
   * Gets a selected node or text from an editable HTMLElement.
   * If the caret is on a text node, concatenates it with all the previous and next text nodes.
   * @param {HTMLElement} target - the editable HTMLElement.
   * @param {boolean} isIframe  - specifies if the target is an iframe or not
   * @param {boolean} forceGetSelection - if true, ignores IE system to get
   * the current selection and uses window.getSelection()
   * @returns {object} an object with the 'node' key set if the item is an
   * element or the keys 'node' and 'caretPosition' if the element is text.
   * @static
   */
  static getSelectedItem(target, isIframe, forceGetSelection) {
    let windowTarget;

    if (isIframe) {
      windowTarget = target.contentWindow;
      windowTarget.focus();
    } else {
      windowTarget = window;
      target.focus();
    }

    if (document.selection && !forceGetSelection) {
      const range = windowTarget.document.selection.createRange();

      if (range.parentElement) {
        if (range.htmlText.length > 0) {
          if (range.text.length === 0) {
            return Util.getSelectedItem(target, isIframe, true);
          }

          return null;
        }

        windowTarget.document.execCommand('InsertImage', false, '#');
        let temporalObject = range.parentElement();

        if (temporalObject.nodeName.toUpperCase() !== 'IMG') {
          // IE9 fix: parentElement() does not return the IMG node,
          // returns the parent DIV node. In IE < 9, pasteHTML does not work well.
          range.pasteHTML('<span id="wrs_openEditorWindow_temporalObject"></span>');
          temporalObject = windowTarget.document.getElementById('wrs_openEditorWindow_temporalObject');
        }

        let node;
        let caretPosition;

        if (temporalObject.nextSibling && temporalObject.nextSibling.nodeType === 3) { // TEXT_NODE.
          node = temporalObject.nextSibling;
          caretPosition = 0;
        } else if (temporalObject.previousSibling
          && temporalObject.previousSibling.nodeType === 3) {
          node = temporalObject.previousSibling;
          caretPosition = node.nodeValue.length;
        } else {
          node = windowTarget.document.createTextNode('');
          temporalObject.parentNode.insertBefore(node, temporalObject);
          caretPosition = 0;
        }

        temporalObject.parentNode.removeChild(temporalObject);

        return {
          node,
          caretPosition,
        };
      }

      if (range.length > 1) {
        return null;
      }

      return {
        node: range.item(0),
      };
    }

    if (windowTarget.getSelection) {
      let range;
      const selection = windowTarget.getSelection();

      try {
        range = selection.getRangeAt(0);
      } catch (e) {
        range = windowTarget.document.createRange();
      }

      const node = range.startContainer;

      if (node.nodeType === 3) { // TEXT_NODE.
        return {
          node,
          caretPosition: range.startOffset,
        };
      }

      if (node !== range.endContainer) {
        return null;
      }

      if (node.nodeType === 1) { // ELEMENT_NODE.
        const position = range.startOffset;

        if (node.childNodes[position]) {
          return {
            node: node.childNodes[position],
          };
        }
      }
    }

    return null;
  }

  /**
   * Returns null if there isn't any item or if it is malformed.
   * Otherwise returns an object containing the node with the MathML image
   * and the cursor position inside the textarea.
   * @param {HTMLTextAreaElement} textarea - textarea element.
   * @returns {Object} An object containing the node, the index of the
   * beginning  of the selected text, caret position and the start and end position of the
   * text node.
   * @static
   */
  static getSelectedItemOnTextarea(textarea) {
    const textNode = document.createTextNode(textarea.value);
    const textNodeValues = _latex__WEBPACK_IMPORTED_MODULE_3__["default"].getLatexFromTextNode(textNode, textarea.selectionStart);
    if (textNodeValues === null) {
      return null;
    }

    return {
      node: textNode,
      caretPosition: textarea.selectionStart,
      startPosition: textNodeValues.startPosition,
      endPosition: textNodeValues.endPosition,
    };
  }

  /**
   * Looks for elements that match the given name in a HTML code string.
   * Important: this function is very concrete for WIRIS code.
   * It takes as preconditions lots of behaviors that are not the general case.
   * @param {string} code -  HTML code.
   * @param {string} name - element name.
   * @param {boolean} autoClosed - true if the elements are autoClosed.
   * @return {Object[]} an object containing all HTML elements of code matching the name argument.
   * @static
   */
  static getElementsByNameFromString(code, name, autoClosed) {
    const elements = [];
    code = code.toLowerCase();
    name = name.toLowerCase();
    let start = code.indexOf(`<${name} `);

    while (start !== -1) { // Look for nodes.
      let endString;

      if (autoClosed) {
        endString = '>';
      } else {
        endString = `</${name}>`;
      }

      let end = code.indexOf(endString, start);

      if (end !== -1) {
        end += endString.length;
        elements.push({
          start,
          end,
        });
      } else {
        end = start + 1;
      }

      start = code.indexOf(`<${name} `, end);
    }

    return elements;
  }

  /**
   * Returns the numeric value of a base64 character.
   * @param  {string} character - base64 character.
   * @returns {number} base64 character numeric value.
   * @static
   */
  static decode64(character) {
    const PLUS = '+'.charCodeAt(0);
    const SLASH = '/'.charCodeAt(0);
    const NUMBER = '0'.charCodeAt(0);
    const LOWER = 'a'.charCodeAt(0);
    const UPPER = 'A'.charCodeAt(0);
    const PLUS_URL_SAFE = '-'.charCodeAt(0);
    const SLASH_URL_SAFE = '_'.charCodeAt(0);
    const code = character.charCodeAt(0);

    if (code === PLUS || code === PLUS_URL_SAFE) {
      return 62; // Char '+'.
    }
    if (code === SLASH || code === SLASH_URL_SAFE) {
      return 63; // Char '/'.
    }
    if (code < NUMBER) {
      return -1; // No match.
    }
    if (code < NUMBER + 10) {
      return code - NUMBER + 26 + 26;
    }
    if (code < UPPER + 26) {
      return code - UPPER;
    }
    if (code < LOWER + 26) {
      return code - LOWER + 26;
    }

    return null;
  }

  /**
   * Converts a base64 string to a array of bytes.
   * @param {string} b64String - base64 string.
   * @param {number} length - dimension of byte array (by default whole string).
   * @return {Object[]} the resultant byte array.
   * @static
   */
  static b64ToByteArray(b64String, length) {
    let tmp;

    if (b64String.length % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4'); // Tipped base64. Length is fixed.
    }

    const arr = [];

    let l;
    let placeHolders;
    if (!length) { // All b64String string.
      if (b64String.charAt(b64String.length - 2) === '=') {
        placeHolders = 2;
      } else if (b64String.charAt(b64String.length - 1) === '=') {
        placeHolders = 1;
      } else {
        placeHolders = 0;
      }
      l = placeHolders > 0 ? b64String.length - 4 : b64String.length;
    } else {
      l = length;
    }

    let i;
    for (i = 0; i < l; i += 4) {
      // Ignoring code checker standards (bitewise operators).
      // See https://tracker.moodle.org/browse/CONTRIB-5862 for further information.
      // @codingStandardsIgnoreStart
      // eslint-disable-next-line max-len
      tmp = (Util.decode64(b64String.charAt(i)) << 18) | (Util.decode64(b64String.charAt(i + 1)) << 12) | (Util.decode64(b64String.charAt(i + 2)) << 6) | Util.decode64(b64String.charAt(i + 3));

      arr.push((tmp >> 16) & 0xFF);
      arr.push((tmp >> 8) & 0xFF);
      arr.push(tmp & 0xFF);
      // @codingStandardsIgnoreEnd
    }

    if (placeHolders) {
      if (placeHolders === 2) {
        // Ignoring code checker standards (bitewise operators).
        // @codingStandardsIgnoreStart
        // eslint-disable-next-line max-len
        tmp = (Util.decode64(b64String.charAt(i)) << 2) | (Util.decode64(b64String.charAt(i + 1)) >> 4);
        arr.push(tmp & 0xFF);
      } else if (placeHolders === 1) {
        // eslint-disable-next-line max-len
        tmp = (Util.decode64(b64String.charAt(i)) << 10) | (Util.decode64(b64String.charAt(i + 1)) << 4) | (Util.decode64(b64String.charAt(i + 2)) >> 2);
        arr.push((tmp >> 8) & 0xFF);
        arr.push(tmp & 0xFF);
        // @codingStandardsIgnoreEnd
      }
    }
    return arr;
  }

  /**
   * Returns the first 32-bit signed integer from a byte array.
   * @param {Object[]} bytes - array of bytes.
   * @returns {number} the 32-bit signed integer.
   * @static
   */
  static readInt32(bytes) {
    if (bytes.length < 4) {
      return false;
    }
    const int32 = bytes.splice(0, 4);
    // @codingStandardsIgnoreStart¡
    return (int32[0] << 24 | int32[1] << 16 | int32[2] << 8 | int32[3] << 0);
    // @codingStandardsIgnoreEnd
  }

  /**
   * Read the first byte from a byte array.
   * @param {Object} bytes - input byte array.
   * @returns {number} first byte of the byte array.
   * @static
   */
  static readByte(bytes) {
    // @codingStandardsIgnoreStart
    return bytes.shift() << 0;
    // @codingStandardsIgnoreEnd
  }

  /**
   * Read an arbitrary number of bytes, from a fixed position on a byte array.
   * @param  {Object[]} bytes - byte array.
   * @param  {number} pos - start position.
   * @param  {number} len - number of bytes to read.
   * @returns {Object[]} the byte array.
   * @static
   */
  static readBytes(bytes, pos, len) {
    return bytes.splice(pos, len);
  }

  /**
   * Inserts or modifies formulas or CAS on a textarea.
   * @param {HTMLTextAreaElement} textarea - textarea target.
   * @param {string} text - text to add in the textarea. For example, to add the link to the image,
   * call this function as (textarea, Parser.createImageSrc(mathml));
   * @static
   */
  static updateTextArea(textarea, text) {
    if (textarea && text) {
      textarea.focus();

      if (textarea.selectionStart != null) {
        const { selectionEnd } = textarea;
        const selectionStart = textarea.value.substring(0, textarea.selectionStart);
        const selectionEndSub = textarea.value.substring(selectionEnd, textarea.value.length);
        textarea.value = selectionStart + text + selectionEndSub;
        textarea.selectionEnd = selectionEnd + text.length;
      } else {
        const selection = document.selection.createRange();
        selection.text = text;
      }
    }
  }

  /**
   * Modifies existing formula on a textarea.
   * @param {HTMLTextAreaElement} textarea - text area target.
   * @param {string} text - text to add in the textarea. For example, if you want to add the link
   * to the image,you can call this function as
   * Util.updateTextarea(textarea, Parser.createImageSrc(mathml));
   * @param {number} start - beginning index from textarea where it needs to be replaced by text.
   * @param {number} end - ending index from textarea where it needs to be replaced by text
   * @static
   */
  static updateExistingTextOnTextarea(textarea, text, start, end) {
    textarea.focus();
    const textareaStart = textarea.value.substring(0, start);
    textarea.value = textareaStart + text + textarea.value.substring(end, textarea.value.length);
    textarea.selectionEnd = start + text.length;
  }

  /**
   * Add a parameter with it's correspondent value to an URL (GET).
   * @param {string} path - URL path
   * @param {string} parameter - parameter
   * @param {string} value - value
   * @static
   */
  static addArgument(path, parameter, value) {
    let sep;
    if (path.indexOf('?') > 0) {
      sep = '&';
    } else {
      sep = '?';
    }
    return `${path + sep + parameter}=${value}`;
  }
}


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var properties_1 = __webpack_require__(/*! ./properties */ "./src/properties.ts");
var latex_1 = __webpack_require__(/*! ./latex */ "./src/latex.ts");
var mathml_1 = __webpack_require__(/*! ./mathml */ "./src/mathml.ts");
main(window);
function main(w) {
    return __awaiter(this, void 0, void 0, function () {
        var document, start;
        var _this = this;
        return __generator(this, function (_a) {
            w.viewer = {
                Properties: properties_1.Properties,
            };
            document = w.document;
            properties_1.Properties.render = function () { return __awaiter(_this, void 0, void 0, function () {
                var element;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            element = document.querySelector(properties_1.Properties.element);
                            if (!element) return [3, 3];
                            return [4, (0, latex_1.renderLatex)(element)];
                        case 1:
                            _a.sent();
                            return [4, (0, mathml_1.renderMathML)(element)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            }); };
            start = function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    properties_1.Properties.render();
                    new MutationObserver(function (mutationList, observer) { return __awaiter(_this, void 0, void 0, function () {
                        var mutationList_1, mutationList_1_1, mutation, _a, _b, node, e_1_1, e_2_1;
                        var e_2, _c, e_1, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    _e.trys.push([0, 11, 12, 13]);
                                    mutationList_1 = __values(mutationList), mutationList_1_1 = mutationList_1.next();
                                    _e.label = 1;
                                case 1:
                                    if (!!mutationList_1_1.done) return [3, 10];
                                    mutation = mutationList_1_1.value;
                                    _e.label = 2;
                                case 2:
                                    _e.trys.push([2, 7, 8, 9]);
                                    _a = (e_1 = void 0, __values(mutation.addedNodes)), _b = _a.next();
                                    _e.label = 3;
                                case 3:
                                    if (!!_b.done) return [3, 6];
                                    node = _b.value;
                                    if (!(node instanceof HTMLElement)) return [3, 5];
                                    return [4, properties_1.Properties.render()];
                                case 4:
                                    _e.sent();
                                    _e.label = 5;
                                case 5:
                                    _b = _a.next();
                                    return [3, 3];
                                case 6: return [3, 9];
                                case 7:
                                    e_1_1 = _e.sent();
                                    e_1 = { error: e_1_1 };
                                    return [3, 9];
                                case 8:
                                    try {
                                        if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                    return [7];
                                case 9:
                                    mutationList_1_1 = mutationList_1.next();
                                    return [3, 1];
                                case 10: return [3, 13];
                                case 11:
                                    e_2_1 = _e.sent();
                                    e_2 = { error: e_2_1 };
                                    return [3, 13];
                                case 12:
                                    try {
                                        if (mutationList_1_1 && !mutationList_1_1.done && (_c = mutationList_1.return)) _c.call(mutationList_1);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                    return [7];
                                case 13: return [2];
                            }
                        });
                    }); })
                        .observe(document, {
                        attributes: true,
                        childList: true,
                        subtree: true,
                    });
                    return [2];
                });
            }); };
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", start);
            }
            else {
                start();
            }
            document.dispatchEvent(new Event('viewerLoaded'));
            return [2];
        });
    });
}


/***/ }),

/***/ "./src/latex.ts":
/*!**********************!*\
  !*** ./src/latex.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderLatex = void 0;
var services_1 = __webpack_require__(/*! ./services */ "./src/services.ts");
var properties_1 = __webpack_require__(/*! ./properties */ "./src/properties.ts");
function renderLatex(root) {
    return __awaiter(this, void 0, void 0, function () {
        var latexNodes, latexNodes_1, latexNodes_1_1, latexNode, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (properties_1.Properties.viewer !== 'image') {
                        return [2];
                    }
                    latexNodes = findLatexTextNodes(root);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    latexNodes_1 = __values(latexNodes), latexNodes_1_1 = latexNodes_1.next();
                    _b.label = 2;
                case 2:
                    if (!!latexNodes_1_1.done) return [3, 5];
                    latexNode = latexNodes_1_1.value;
                    return [4, replaceLatexInTextNode(latexNode)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    latexNodes_1_1 = latexNodes_1.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (latexNodes_1_1 && !latexNodes_1_1.done && (_a = latexNodes_1.return)) _a.call(latexNodes_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 8: return [2];
            }
        });
    });
}
exports.renderLatex = renderLatex;
function replaceLatexInTextNode(node) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var textContent, pos, nextLatexPosition, leftText, leftTextNode, latex, response, fragment, text, textNode;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    textContent = node.textContent || '';
                    pos = 0;
                    _e.label = 1;
                case 1:
                    if (!(pos < textContent.length)) return [3, 5];
                    nextLatexPosition = getNextLatexPos(pos, textContent);
                    if (!nextLatexPosition) return [3, 3];
                    leftText = textContent.substring(pos, nextLatexPosition.start);
                    leftTextNode = document.createTextNode(leftText);
                    (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(leftTextNode, node);
                    node.nodeValue = node.nodeValue.substring(pos, nextLatexPosition.start);
                    latex = textContent.substring(nextLatexPosition.start + '$$'.length, nextLatexPosition.end);
                    return [4, (0, services_1.latexToMathml)(latex, properties_1.Properties.editorServicesRoot, properties_1.Properties.editorServicesExtension)];
                case 2:
                    response = _e.sent();
                    fragment = document.createRange().createContextualFragment(response.text);
                    (_b = node.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(fragment, node);
                    node.nodeValue = node.nodeValue.substring(nextLatexPosition.start, nextLatexPosition.end);
                    pos = nextLatexPosition.end + '$$'.length;
                    return [3, 4];
                case 3:
                    text = textContent.substring(pos);
                    textNode = document.createTextNode(text);
                    (_c = node.parentNode) === null || _c === void 0 ? void 0 : _c.insertBefore(textNode, node);
                    node.nodeValue = '';
                    pos = textContent.length;
                    _e.label = 4;
                case 4: return [3, 1];
                case 5:
                    (_d = node.parentNode) === null || _d === void 0 ? void 0 : _d.removeChild(node);
                    return [2];
            }
        });
    });
}
function findLatexTextNodes(root) {
    var nodeIterator = document.createNodeIterator(root, NodeFilter.SHOW_TEXT, function (node) { return /(\$\$)(.*)(\$\$)/.test(node.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; });
    var latexNodes = [];
    var currentNode;
    while (currentNode = nodeIterator.nextNode()) {
        latexNodes.push(currentNode);
    }
    return latexNodes;
}
function getNextLatexPos(pos, text) {
    var firstLatexTags = text.indexOf('$$', pos);
    var secondLatexTags = firstLatexTags == -1 ? -1 : text.indexOf('$$', firstLatexTags + '$$'.length);
    return firstLatexTags != -1 && secondLatexTags != -1 ? { 'start': firstLatexTags, 'end': secondLatexTags } : null;
}


/***/ }),

/***/ "./src/mathml.ts":
/*!***********************!*\
  !*** ./src/mathml.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderMathML = void 0;
var properties_1 = __webpack_require__(/*! ./properties */ "./src/properties.ts");
var services_1 = __webpack_require__(/*! ./services */ "./src/services.ts");
function renderMathML(root) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, _c, mathElement, mml, result, url, img, e_1_1;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (properties_1.Properties.viewer !== 'image') {
                        return [2];
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 11, 12, 13]);
                    _b = __values(__spreadArray([], __read(root.getElementsByTagName('math')), false)), _c = _b.next();
                    _e.label = 2;
                case 2:
                    if (!!_c.done) return [3, 10];
                    mathElement = _c.value;
                    mml = mathElement.outerHTML;
                    result = void 0;
                    if (!(properties_1.Properties.wirispluginperformance === 'true')) return [3, 4];
                    return [4, (0, services_1.showImage)(mml, properties_1.Properties.lang, properties_1.Properties.editorServicesRoot, properties_1.Properties.editorServicesExtension)];
                case 3:
                    result = _e.sent();
                    return [3, 7];
                case 4: return [4, (0, services_1.createImage)(mml, properties_1.Properties.lang, properties_1.Properties.editorServicesRoot, properties_1.Properties.editorServicesExtension)];
                case 5:
                    url = _e.sent();
                    url = url.replace('pluginsapp', 'plugins/app');
                    return [4, (0, services_1.processJsonResponse)(fetch(url))];
                case 6:
                    result = _e.sent();
                    _e.label = 7;
                case 7: return [4, setImageProperties(result, mml, properties_1.Properties.wiriseditormathmlattribute)];
                case 8:
                    img = _e.sent();
                    (_a = mathElement.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(img, mathElement);
                    _e.label = 9;
                case 9:
                    _c = _b.next();
                    return [3, 2];
                case 10: return [3, 13];
                case 11:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 13];
                case 12:
                    try {
                        if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 13: return [2];
            }
        });
    });
}
exports.renderMathML = renderMathML;
;
function setImageProperties(data, mml, wiriseditormathmlattribute) {
    return __awaiter(this, void 0, void 0, function () {
        var img, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    img = document.createElement('img');
                    img.src = "data:image/svg+xml;charset=utf8,".concat(encodeURIComponent(data.content));
                    img.setAttribute(wiriseditormathmlattribute, mml);
                    img.setAttribute('class', 'Wirisformula');
                    img.setAttribute('role', 'math');
                    if (+data.height > 0) {
                        img.style.verticalAlign = "-" + (+data.height - +data.baseline) + "px";
                        img.height = +data.height;
                        img.width = +data.width;
                    }
                    return [4, (0, services_1.mathml2accessible)(mml, properties_1.Properties.lang, properties_1.Properties.editorServicesRoot, properties_1.Properties.editorServicesExtension)];
                case 1:
                    text = (_a.sent()).text;
                    img.alt = text;
                    return [2, img];
            }
        });
    });
}


/***/ }),

/***/ "./src/properties.ts":
/*!***************************!*\
  !*** ./src/properties.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Properties = void 0;
var services_1 = __webpack_require__(/*! ./services */ "./src/services.ts");
var defaultValues = {
    editorServicesRoot: 'https://www.wiris.net/demo/plugins/app/',
    editorServicesExtension: '',
    backendConfig: {
        wirispluginperformance: 'true',
        wiriseditormathmlattribute: 'data-mathml'
    },
    dpi: 96,
    element: 'body',
    lang: 'en',
    viewer: 'none',
    zoom: 1,
};
var Properties = (function () {
    function Properties() {
    }
    Properties.waitForBackend = function () {
        while (!this.backendObtained)
            ;
    };
    Properties.init = function (config) {
        Properties.config = __assign(__assign({}, defaultValues), config);
    };
    Object.defineProperty(Properties, "editorServicesRoot", {
        get: function () {
            return this.config.editorServicesRoot ||
                defaultValues.editorServicesRoot;
        },
        set: function (editorServicesRoot) {
            this.config.editorServicesRoot = editorServicesRoot;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties, "editorServicesExtension", {
        get: function () {
            return this.config.editorServicesExtension ||
                defaultValues.editorServicesExtension;
        },
        set: function (editorServicesExtension) {
            this.config.editorServicesExtension = editorServicesExtension;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties, "lang", {
        get: function () {
            var configLang = (this.config.lang === 'inherit') ? null : this.config.lang;
            return configLang ||
                document.getElementsByTagName('html')[0].lang ||
                navigator.language ||
                defaultValues.lang;
        },
        set: function (lang) {
            this.config.lang = lang;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties, "viewer", {
        get: function () {
            return this.config.viewer ||
                defaultValues.viewer;
        },
        set: function (viewer) {
            this.config.viewer = viewer;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties, "dpi", {
        get: function () {
            return this.config.dpi ||
                defaultValues.dpi;
        },
        set: function (dpi) {
            this.config.dpi = dpi;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties, "zoom", {
        get: function () {
            return this.config.zoom ||
                defaultValues.zoom;
        },
        set: function (zoom) {
            this.config.zoom = zoom;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties, "element", {
        get: function () {
            return this.config.element ||
                defaultValues.element;
        },
        set: function (element) {
            this.config.element = element;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties, "wirispluginperformance", {
        get: function () {
            this.waitForBackend();
            return this.config.backendConfig.wirispluginperformance ||
                defaultValues.backendConfig.wirispluginperformance;
        },
        set: function (wirispluginperformance) {
            this.config.backendConfig.wirispluginperformance = wirispluginperformance;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Properties, "wiriseditormathmlattribute", {
        get: function () {
            this.waitForBackend();
            return this.config.backendConfig.wiriseditormathmlattribute ||
                defaultValues.backendConfig.wiriseditormathmlattribute;
        },
        set: function (wiriseditormathmlattribute) {
            this.config.backendConfig.wiriseditormathmlattribute = wiriseditormathmlattribute;
            this.render();
        },
        enumerable: false,
        configurable: true
    });
    var _a;
    _a = Properties;
    Properties.render = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(_a, function (_b) {
        return [2];
    }); }); };
    Properties.backendObtained = false;
    Properties.config = defaultValues;
    (function () {
        var pluginName = 'WIRISplugins.js';
        var script = document.querySelector("script[src*=\"".concat(pluginName, "\"]"));
        if (!!script) {
            var pluginNamePosition = script.src.lastIndexOf(pluginName);
            var params = script.src.substring(pluginNamePosition + pluginName.length);
            var urlParams = new URLSearchParams(params);
            if (urlParams.get('dpi') !== null && urlParams.get('dpi') !== undefined) {
                _a.config.dpi = +urlParams.get('dpi');
            }
            if (urlParams.get('element') !== null && urlParams.get('element') !== undefined) {
                _a.config.element = urlParams.get('element');
            }
            if (urlParams.get('lang') !== null && urlParams.get('lang') !== undefined) {
                _a.config.lang = urlParams.get('lang');
            }
            if (urlParams.get('viewer') !== null && urlParams.get('viewer') !== undefined) {
                _a.config.viewer = urlParams.get('viewer');
            }
            if (urlParams.get('zoom') !== null && urlParams.get('zoom') !== undefined) {
                _a.config.zoom = +urlParams.get('zoom');
            }
        }
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var _b, e_1;
            return __generator(_a, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, 3, 4]);
                        _b = this.config;
                        return [4, (0, services_1.configurationJson)(['wirispluginperformance', 'wiriseditormathmlattribute'], Properties.editorServicesRoot, Properties.editorServicesExtension)];
                    case 1:
                        _b.backendConfig = _c.sent();
                        return [3, 4];
                    case 2:
                        e_1 = _c.sent();
                        if (e_1 instanceof services_1.StatusError) {
                            console.error(e_1);
                        }
                        else {
                            throw e_1;
                        }
                        return [3, 4];
                    case 3:
                        this.backendObtained = true;
                        return [7];
                    case 4: return [2];
                }
            });
        }); })();
    })();
    return Properties;
}());
exports.Properties = Properties;


/***/ }),

/***/ "./src/services.ts":
/*!*************************!*\
  !*** ./src/services.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configurationJson = exports.latexToMathml = exports.createImage = exports.showImage = exports.mathml2accessible = exports.callService = exports.processJsonResponse = exports.StatusError = void 0;
var parser_1 = __importDefault(__webpack_require__(/*! @wiris/mathtype-html-integration-devkit/src/parser */ "./node_modules/@wiris/mathtype-html-integration-devkit/src/parser.js"));
var MethodType;
(function (MethodType) {
    MethodType["Post"] = "POST";
    MethodType["Get"] = "GET";
})(MethodType || (MethodType = {}));
var StatusError = (function (_super) {
    __extends(StatusError, _super);
    function StatusError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, StatusError.prototype);
        return _this;
    }
    return StatusError;
}(Error));
exports.StatusError = StatusError;
function processJsonResponse(response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, status_1, result, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4, response];
                case 1: return [4, (_b.sent()).json()];
                case 2:
                    _a = _b.sent(), status_1 = _a.status, result = _a.result;
                    if (status_1 !== 'ok') {
                        throw new StatusError('Service responded with a non-ok status');
                    }
                    return [2, result];
                case 3:
                    e_1 = _b.sent();
                    throw e_1;
                case 4: return [2];
            }
        });
    });
}
exports.processJsonResponse = processJsonResponse;
function callService(query, serviceName, method, serverURL, extension) {
    return __awaiter(this, void 0, void 0, function () {
        var url, init, _a, _b, _c, key, value;
        var e_2, _d;
        return __generator(this, function (_e) {
            try {
                url = new URL(serviceName + extension, serverURL);
                init = {
                    method: method,
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                    },
                };
                if (method === MethodType.Get) {
                    try {
                        for (_a = __values(Object.entries(query)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            _c = __read(_b.value, 2), key = _c[0], value = _c[1];
                            url.searchParams.set(key, value);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                else {
                    init.body = new URLSearchParams(__assign({}, query));
                }
                return [2, fetch(url.toString(), init)];
            }
            catch (e) {
                throw e;
            }
            return [2];
        });
    });
}
exports.callService = callService;
function mathml2accessible(mml, lang, url, extension) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            params = {
                'service': 'mathml2accessible',
                'mml': mml,
                'metrics': 'true',
                'centerbaseline': 'false',
                'lang': lang,
                'ignoreStyles': 'true',
            };
            response = callService(params, 'service', MethodType.Post, url, extension);
            return [2, processJsonResponse(response)];
        });
    });
}
exports.mathml2accessible = mathml2accessible;
function showImage(mml, lang, url, extension) {
    return __awaiter(this, void 0, void 0, function () {
        var params, getParams, getResponse, e_3, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        'mml': mml,
                        'metrics': 'true',
                        'centerbaseline': 'false',
                        'lang': lang,
                    };
                    getParams = parser_1.default.createShowImageSrcData({ mml: mml }, lang);
                    getResponse = callService(getParams, 'showimage', MethodType.Get, url, extension);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, processJsonResponse(getResponse)];
                case 2: return [2, _a.sent()];
                case 3:
                    e_3 = _a.sent();
                    if (e_3 instanceof StatusError) {
                    }
                    else {
                        throw e_3;
                    }
                    return [3, 4];
                case 4:
                    response = callService(params, 'showimage', MethodType.Post, url, extension);
                    return [2, processJsonResponse(response)];
            }
        });
    });
}
exports.showImage = showImage;
;
function createImage(mml, lang, url, extension) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        'mml': mml,
                        'metrics': 'true',
                        'centerbaseline': 'false',
                        'lang': lang,
                    };
                    response = callService(params, 'createimage', MethodType.Get, url, extension);
                    return [4, response];
                case 1: return [2, (_a.sent()).text()];
            }
        });
    });
}
exports.createImage = createImage;
;
function latexToMathml(latex, url, extension) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            params = {
                'service': 'latex2mathml',
                'latex': latex,
            };
            response = callService(params, 'service', MethodType.Post, url, extension);
            return [2, processJsonResponse(response)];
        });
    });
}
exports.latexToMathml = latexToMathml;
function configurationJson(variablekeys, url, extension) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            params = {
                'variablekeys': variablekeys.join(','),
            };
            response = callService(params, 'configurationjson', MethodType.Get, url, extension);
            return [2, processJsonResponse(response)];
        });
    });
}
exports.configurationJson = configurationJson;


/***/ }),

/***/ "./node_modules/@wiris/mathtype-html-integration-devkit/lang/strings.json":
/*!********************************************************************************!*\
  !*** ./node_modules/@wiris/mathtype-html-integration-devkit/lang/strings.json ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"ar":{"latex":"LaTeX","cancel":"إلغاء","accept":"إدراج","manual":"الدليل","insert_math":"إدراج صيغة رياضية - MathType","insert_chem":"إدراج صيغة كيميائية - ChemType","minimize":"تصغير","maximize":"تكبير","fullscreen":"ملء الشاشة","exit_fullscreen":"الخروج من ملء الشاشة","close":"إغلاق","mathtype":"MathType","title_modalwindow":"نافذة MathType مشروطة","close_modal_warning":"هل تريد المغادرة بالتأكيد؟ ستُفقد التغييرات التي أجريتها.","latex_name_label":"صيغة Latex","browser_no_compatible":"المستعرض غير متوافق مع تقنية AJAX. الرجاء استخدام أحدث إصدار من Mozilla Firefox.","error_convert_accessibility":"حدث خطأ أثناء التحويل من MathML إلى نص قابل للاستخدام.","exception_cross_site":"البرمجة النصية للمواقع المشتركة مسموح بها لـ HTTP فقط.","exception_high_surrogate":"المركّب المرتفع غير متبوع بمركّب منخفض في fixedCharCodeAt()‎","exception_string_length":"سلسلة غير صالحة. يجب أن يكون الطول من مضاعفات العدد 4","exception_key_nonobject":"Object.keys مستدعاة على غير كائن","exception_null_or_undefined":" هذا فارغ أو غير محدد","exception_not_function":" ليست دالة","exception_invalid_date_format":"تنسيق تاريخ غير صالح: ","exception_casting":"لا يمكن الصياغة ","exception_casting_to":" إلى "},"ca":{"latex":"LaTeX","cancel":"Cancel·lar","accept":"Inserir","manual":"Manual","insert_math":"Inserir fórmula matemàtica - MathType","insert_chem":"Inserir fórmula química - ChemType","minimize":"Minimitza","maximize":"Maximitza","fullscreen":"Pantalla completa","exit_fullscreen":"Sortir de la pantalla complera","close":"Tanca","mathtype":"MathType","title_modalwindow":" Finestra modal de MathType","close_modal_warning":"N\'estàs segur que vols sortir? Es perdran els canvis que has fet.","latex_name_label":"Fórmula en Latex","browser_no_compatible":"El teu navegador no és compatible amb AJAX. Si us plau, usa la darrera versió de Mozilla Firefox.","error_convert_accessibility":"Error en convertir de MathML a text accessible.","exception_cross_site":"Els scripts de llocs creuats només estan permesos per HTTP.","exception_high_surrogate":"Subrogat alt no seguit de subrogat baix a fixedCharCodeAt()","exception_string_length":"Cadena invàlida. La longitud ha de ser un múltiple de 4","exception_key_nonobject":"Object.keys anomenat a non-object","exception_null_or_undefined":" això és null o no definit","exception_not_function":" no és una funció","exception_invalid_date_format":"Format de data invàlid : ","exception_casting":"No es pot emetre ","exception_casting_to":" a "},"cs":{"latex":"LaTeX","cancel":"Storno","accept":"Vložit","manual":"Příručka","insert_math":"Vložit matematický vzorec - MathType","insert_chem":"Vložení chemického vzorce – ChemType","minimize":"Minimalizovat","maximize":"Maximalizovat","fullscreen":"Celá obrazovka","exit_fullscreen":"Opustit režim celé obrazovky","close":"Zavřít","mathtype":"MathType","title_modalwindow":"Modální okno MathType","close_modal_warning":"Opravdu chcete okno zavřít? Provedené změny budou ztraceny.","latex_name_label":"Vzorec v LaTeXu","browser_no_compatible":"Váš prohlížeč nepodporuje technologii AJAX. Použijte nejnovější verzi prohlížeče Mozilla Firefox.","error_convert_accessibility":"Při převodu kódu MathML na čitelný text došlo k chybě.","exception_cross_site":"Skriptování mezi více servery je povoleno jen v HTTP.","exception_high_surrogate":"Ve funkci fixedCharCodeAt() nenásleduje po první části kódu znaku druhá část","exception_string_length":"Neplatný řetězec. Délka musí být násobkem 4.","exception_key_nonobject":"Funkce Object.keys byla použita pro prvek, který není objektem","exception_null_or_undefined":" hodnota je null nebo není definovaná","exception_not_function":" není funkce","exception_invalid_date_format":"Neplatný formát data: ","exception_casting":"Nelze přetypovat ","exception_casting_to":" na "},"da":{"latex":"LaTeX","cancel":"Annuller","accept":"Indsæt","manual":"Brugervejledning","insert_math":"Indsæt matematisk formel - MathType","insert_chem":"Indsæt en kemisk formel - ChemType","minimize":"Minimer","maximize":"Maksimer","fullscreen":"Fuld skærm","exit_fullscreen":"Afslut Fuld skærm","close":"Luk","mathtype":"MathType","title_modalwindow":"MathType-modalvindue","close_modal_warning":"Er du sikker på, du vil lukke? Dine ændringer går tabt.","latex_name_label":"LaTex-formel","browser_no_compatible":"Din browser er ikke kompatibel med AJAX-teknologi. Brug den nyeste version af Mozilla Firefox.","error_convert_accessibility":"Fejl under konvertering fra MathML til tilgængelig tekst.","exception_cross_site":"Scripts på tværs af websteder er kun tilladt for HTTP.","exception_high_surrogate":"Et højt erstatningstegn er ikke fulgt af et lavt erstatningstegn i fixedCharCodeAt()","exception_string_length":"Ugyldig streng. Længden skal være et multiplum af 4","exception_key_nonobject":"Object.keys kaldet ved ikke-objekt","exception_null_or_undefined":" dette er nul eller ikke defineret","exception_not_function":" er ikke en funktion","exception_invalid_date_format":"Ugyldigt datoformat: ","exception_casting":"Kan ikke beregne ","exception_casting_to":" til "},"de":{"latex":"LaTeX","cancel":"Abbrechen","accept":"Einfügen","manual":"Handbuch","insert_math":"Mathematische Formel einfügen - MathType","insert_chem":"Eine chemische Formel einfügen – ChemType","minimize":"Verkleinern","maximize":"Vergrößern","fullscreen":"Vollbild","exit_fullscreen":"Vollbild schließen","close":"Schließen","mathtype":"MathType","title_modalwindow":"Modales MathType-Fenster","close_modal_warning":"Bist du sicher, dass du das Programm verlassen willst? Alle vorgenommenen Änderungen gehen damit verloren.","latex_name_label":"Latex-Formel","browser_no_compatible":"Dein Browser ist nicht mit der AJAX-Technologie kompatibel. Verwende bitte die neueste Version von Mozilla Firefox.","error_convert_accessibility":"Fehler beim Konvertieren von MathML in barrierefreien Text.","exception_cross_site":"Cross-Site-Scripting ist nur bei HTTP zulässig.","exception_high_surrogate":"Hoher Ersatz bei bei festerZeichenkodierungbei() nicht von niedrigem Ersatz befolgt.","exception_string_length":"Ungültige Zeichenfolge. Länge muss ein Vielfaches von 4 sein.","exception_key_nonobject":"Object.keys wurde für ein Nicht-Objekt aufgerufen.","exception_null_or_undefined":" Das ist Null oder nicht definiert.","exception_not_function":" ist keine Funktion","exception_invalid_date_format":"Ungültiges Datumsformat: ","exception_casting":"Umwandlung nicht möglich ","exception_casting_to":" zu "},"el":{"latex":"LaTeX","cancel":"Άκυρο","accept":"Εισαγωγή","manual":"Χειροκίνητα","insert_math":"Εισαγωγή μαθηματικού τύπου - MathType","insert_chem":"Εισαγωγή χημικού τύπου - ChemType","minimize":"Ελαχιστοποίηση","maximize":"Μεγιστοποίηση","fullscreen":"Πλήρης οθόνη","exit_fullscreen":"Έξοδος από πλήρη οθόνη","close":"Κλείσιμο","mathtype":"MathType","title_modalwindow":"Τροπικό παράθυρο MathType","close_modal_warning":"Επιθυμείτε σίγουρα αποχώρηση; Θα χαθούν οι αλλαγές που έχετε κάνει.","latex_name_label":"Τύπος LaTeX","browser_no_compatible":"Το πρόγραμμα περιήγησής σας δεν είναι συμβατό με την τεχνολογία AJAX. Χρησιμοποιήστε την πιο πρόσφατη έκδοση του Mozilla Firefox.","error_convert_accessibility":"Σφάλμα κατά τη μετατροπή από MathML σε προσβάσιμο κείμενο.","exception_cross_site":"Το XSS (Cross site scripting) επιτρέπεται μόνο για HTTP.","exception_high_surrogate":"Το υψηλό υποκατάστατο δεν ακολουθείται από χαμηλό υποκατάστατο στο fixedCharCodeAt()","exception_string_length":"Μη έγκυρη συμβολοσειρά. Το μήκος πρέπει να είναι πολλαπλάσιο του 4","exception_key_nonobject":"Έγινε κλήση του Object.keys σε μη αντικείμενο","exception_null_or_undefined":" αυτό είναι μηδενικό ή δεν έχει οριστεί","exception_not_function":" δεν είναι συνάρτηση","exception_invalid_date_format":"Μη έγκυρη μορφή ημερομηνίας: ","exception_casting":"Δεν είναι δυνατή η μετατροπή ","exception_casting_to":" σε "},"en":{"latex":"LaTeX","cancel":"Cancel","accept":"Insert","manual":"Manual","insert_math":"Insert a math equation - MathType","insert_chem":"Insert a chemistry formula - ChemType","minimize":"Minimize","maximize":"Maximize","fullscreen":"Full-screen","exit_fullscreen":"Exit full-screen","close":"Close","mathtype":"MathType","title_modalwindow":"MathType modal window","close_modal_warning":"Are you sure you want to leave? The changes you made will be lost.","latex_name_label":"Latex Formula","browser_no_compatible":"Your browser is not compatible with AJAX technology. Please, use the latest version of Mozilla Firefox.","error_convert_accessibility":"Error converting from MathML to accessible text.","exception_cross_site":"Cross site scripting is only allowed for HTTP.","exception_high_surrogate":"High surrogate not followed by low surrogate in fixedCharCodeAt()","exception_string_length":"Invalid string. Length must be a multiple of 4","exception_key_nonobject":"Object.keys called on non-object","exception_null_or_undefined":" this is null or not defined","exception_not_function":" is not a function","exception_invalid_date_format":"Invalid date format : ","exception_casting":"Cannot cast ","exception_casting_to":" to "},"es":{"latex":"LaTeX","cancel":"Cancelar","accept":"Insertar","manual":"Manual","insert_math":"Insertar fórmula matemática - MathType","insert_chem":"Insertar fórmula química - ChemType","minimize":"Minimizar","maximize":"Maximizar","fullscreen":"Pantalla completa","exit_fullscreen":"Salir de pantalla completa","close":"Cerrar","mathtype":"MathType","title_modalwindow":"Ventana modal de MathType","close_modal_warning":"Seguro que quieres cerrar? Los cambios que has hecho se perderán","latex_name_label":"Formula en Latex","browser_no_compatible":"Tu navegador no es complatible con AJAX. Por favor, usa la última version de Mozilla Firefox.","error_convert_accessibility":"Error conviertiendo una fórmula MathML a texto accesible.","exception_cross_site":"Cross site scripting solo está permitido para HTTP.","exception_high_surrogate":"Subrogado alto no seguido por subrogado bajo en fixedCharCodeAt()","exception_string_length":"Cadena no válida. La longitud debe ser múltiplo de 4","exception_key_nonobject":"Object.keys called on non-object","exception_null_or_undefined":" esto es null o no definido","exception_not_function":" no es una función","exception_invalid_date_format":"Formato de fecha inválido: ","exception_casting":"No se puede emitir","exception_casting_to":" a "},"et":{"latex":"LaTeX","cancel":"Loobu","accept":"Lisa","manual":"Käsiraamat","insert_math":"Lisa matemaatiline valem – WIRIS","insert_chem":"Lisa keemiline valem – ChemType","minimize":"Minimeeri","maximize":"Maksimeeri","fullscreen":"Täiskuva","exit_fullscreen":"Välju täiskuvalt","close":"Sule","mathtype":"MathType","title_modalwindow":"MathType\'i modaalaken","close_modal_warning":"Kas soovite kindlasti lahkuda? Tehtud muudatused lähevad kaduma.","latex_name_label":"Latexi valem","browser_no_compatible":"Teie brauser ei ühildu AJAXi tehnoloogiaga. Palun kasutage Mozilla Firefoxi uusimat versiooni.","error_convert_accessibility":"Tõrge teisendamisel MathML-ist muudetavaks tekstiks.","exception_cross_site":"Ristskriptimine on lubatud ainult HTTP kasutamisel.","exception_high_surrogate":"Funktsioonis fixedCharCodeAt() ei järgne kõrgemale asendusliikmele madalam asendusliige.","exception_string_length":"Vigane string. Pikkus peab olema 4 kordne.","exception_key_nonobject":"Protseduur Object.keys kutsuti mitteobjekti korral.","exception_null_or_undefined":" see on null või määramata","exception_not_function":" ei ole funktsioon","exception_invalid_date_format":"Sobimatu kuupäeva kuju: ","exception_casting":"Esitamine ei õnnestu ","exception_casting_to":" – "},"eu":{"latex":"LaTeX","cancel":"Ezeztatu","accept":"Txertatu","manual":"Gida","insert_math":"Txertatu matematikako formula - MathType","insert_chem":"Txertatu formula kimiko bat - ChemType","minimize":"Ikonotu","maximize":"Maximizatu","fullscreen":"Pantaila osoa","exit_fullscreen":"Irten pantaila osotik","close":"Itxi","mathtype":"MathType","title_modalwindow":"MathType leiho modala","close_modal_warning":"Ziur irten nahi duzula? Egiten dituzun aldaketak galdu egingo dira.","latex_name_label":"LaTex Formula","browser_no_compatible":"Zure arakatzailea ez da bateragarria AJAX teknologiarekin. Erabili Mozilla Firefoxen azken bertsioa.","error_convert_accessibility":"Errorea MathMLtik testu irisgarrira bihurtzean.","exception_cross_site":"Gune arteko scriptak HTTPrako soilik onartzen dira.","exception_high_surrogate":"Ordezko baxuak ez dio ordezko altuari jarraitzen, hemen: fixedCharCodeAt()","exception_string_length":"Kate baliogabea. Luzerak 4ren multiploa izan behar du","exception_key_nonobject":"Object.keys deitu zaio objektua ez den zerbaiti","exception_null_or_undefined":" nulua edo definitu gabea da","exception_not_function":" ez da funtzio bat","exception_invalid_date_format":"Data-formatu baliogabea : ","exception_casting":"Ezin da igorri ","exception_casting_to":" honi "},"fi":{"latex":"LaTeX","cancel":"Peruuta","accept":"Lisää","manual":"Manual","insert_math":"Liitä matemaattinen kaava - MathType","insert_chem":"Lisää kemian kaava - ChemType","minimize":"Pienennä","maximize":"Suurenna","fullscreen":"Koko ruutu","exit_fullscreen":"Poistu koko ruudun tilasta","close":"Sulje","mathtype":"MathType","title_modalwindow":"MathTypen modaalinen ikkuna","close_modal_warning":"Oletko varma, että haluat poistua? Menetät tekemäsi muutokset.","latex_name_label":"Latex-kaava","browser_no_compatible":"Selaimesi ei tue AJAX-tekniikkaa. Ole hyvä ja käytä uusinta Firefox-versiota.","error_convert_accessibility":"Virhe muunnettaessa MathML:stä tekstiksi.","exception_cross_site":"Cross site scripting sallitaan vain HTTP:llä.","exception_high_surrogate":"fixedCharCodeAt(): yläsijaismerkkiä ei seurannut alasijaismerkki","exception_string_length":"Epäkelpo merkkijono. Pituuden on oltava 4:n kerrannainen","exception_key_nonobject":"Object.keys kutsui muuta kuin oliota","exception_null_or_undefined":" tämä on null tai ei määritelty","exception_not_function":" ei ole funktio","exception_invalid_date_format":"Virheellinen päivämäärämuoto : ","exception_casting":"Ei voida muuntaa tyyppiä ","exception_casting_to":" tyyppiin "},"fr":{"latex":"LaTeX","cancel":"Annuler","accept":"Insérer","manual":"Manuel","insert_math":"Insérer une formule mathématique - MathType","insert_chem":"Insérer une formule chimique - ChemType","minimize":"Minimiser","maximize":"Maximiser","fullscreen":"Plein écran","exit_fullscreen":"Quitter le plein écran","close":"Fermer","mathtype":"MathType","title_modalwindow":"Fenêtre modale MathType","close_modal_warning":"Confirmez-vous vouloir fermer ? Les changements effectués seront perdus.","latex_name_label":"Formule LaTeX","browser_no_compatible":"Votre navigateur n’est pas compatible avec la technologie AJAX. Veuillez utiliser la dernière version de Mozilla Firefox.","error_convert_accessibility":"Une erreur de conversion du format MathML en texte accessible est survenue.","exception_cross_site":"Le cross-site scripting n’est autorisé que pour HTTP.","exception_high_surrogate":"Substitut élevé non suivi d’un substitut inférieur dans fixedCharCodeAt()","exception_string_length":"Chaîne non valide. Longueur limitée aux multiples de 4","exception_key_nonobject":"Object.keys appelé sur un non-objet","exception_null_or_undefined":" nul ou non défini","exception_not_function":" n’est pas une fonction","exception_invalid_date_format":"Format de date non valide : ","exception_casting":"Impossible de convertir ","exception_casting_to":" sur "},"gl":{"latex":"LaTeX","cancel":"Cancelar","accept":"Inserir","manual":"Manual","insert_math":"Inserir unha fórmula matemática - MathType","insert_chem":"Inserir unha fórmula química - ChemType","minimize":"Minimizar","maximize":"Maximizar","fullscreen":"Pantalla completa","exit_fullscreen":"Saír da pantalla completa","close":"Pechar","mathtype":"MathType","title_modalwindow":"Ventá modal de MathType","close_modal_warning":"Seguro que quere saír? Perderanse os cambios realizados.","latex_name_label":"Fórmula Latex","browser_no_compatible":"O seu explorador non é compatible coa tecnoloxía AJAX. Use a versión máis recente de Mozilla Firefox.","error_convert_accessibility":"Erro ao converter de MathML a texto accesible.","exception_cross_site":"Os scripts de sitios só se permiten para HTTP.","exception_high_surrogate":"Suplente superior non seguido por suplente inferior en fixedCharCodeAt()","exception_string_length":"Cadea non válida. A lonxitude debe ser un múltiplo de 4","exception_key_nonobject":"Claves de obxecto chamadas en non obxecto","exception_null_or_undefined":" nulo ou non definido","exception_not_function":" non é unha función","exception_invalid_date_format":"Formato de data non válido: ","exception_casting":"Non se pode converter ","exception_casting_to":" a "},"he":{"latex":"LaTeX","cancel":"ביטול","accept":"עדכון","manual":"ידני","insert_math":"הוספת נוסחה מתמטית - MathType","insert_chem":"הוספת כתיבה כימית - ChemType","minimize":"מזערי","maximize":"מרבי","fullscreen":"מסך מלא","exit_fullscreen":"יציאה ממצב מסך מלא","close":"סגירה","mathtype":"MathType","title_modalwindow":"חלון מודאלי של MathType","close_modal_warning":"האם לצאת? שינויים אשר בוצעו ימחקו.","latex_name_label":"נוסחת Latex","browser_no_compatible":"הדפדפן שלך אינו תואם לטכנולוגיית AJAX. יש להשתמש בגרסה העדכנית ביותר של Mozilla Firefox.","error_convert_accessibility":"שגיאה בהמרה מ-MathML לטקסט נגיש.","exception_cross_site":"סקריפטינג חוצה-אתרים מורשה עבור HTTP בלבד.","exception_high_surrogate":"ערך ממלא מקום גבוה אינו מופיע אחרי ערך ממלא מקום נמוך ב-fixedCharCodeAt()‎","exception_string_length":"מחרוזת לא חוקית. האורך חייב להיות כפולה של 4","exception_key_nonobject":"בוצעה קריאה אל Object.keys ברכיב שאינו אובייקט","exception_null_or_undefined":" הוא Null או לא מוגדר","exception_not_function":"איננה פונקציה","exception_invalid_date_format":"תסדיר תאריך אינו תקין : ","exception_casting":"לא ניתן להמיר ","exception_casting_to":" ל "},"hr":{"latex":"LaTeX","cancel":"Poništi","accept":"Umetni","manual":"Priručnik","insert_math":"Umetnite matematičku formulu - MathType","insert_chem":"Umetnite kemijsku formulu - ChemType","minimize":"Minimiziraj","maximize":"Maksimiziraj","fullscreen":"Cijeli zaslon","exit_fullscreen":"Izlaz iz prikaza na cijelom zaslonu","close":"Zatvori","mathtype":"MathType","title_modalwindow":"MathType modalni prozor","close_modal_warning":"Sigurno želite zatvoriti? Izgubit će se unesene promjene.","latex_name_label":"Latex formula","browser_no_compatible":"Vaš preglednik nije kompatibilan s AJAX tehnologijom. Upotrijebite najnoviju verziju Mozilla Firefoxa.","error_convert_accessibility":"Pogreška konverzije iz MathML-a u dostupni tekst.","exception_cross_site":"Skriptiranje na različitim web-mjestima dopušteno je samo za HTTP.","exception_high_surrogate":"Iza visoke zamjene ne slijedi niska zamjena u fixedCharCodeAt()","exception_string_length":"Nevažeći niz. Duljina mora biti višekratnik broja 4","exception_key_nonobject":"Object.keys pozvano na ne-objekt","exception_null_or_undefined":" ovo je nula ili nije definirano","exception_not_function":" nije funkcija","exception_invalid_date_format":"Nevažeći format datuma : ","exception_casting":"Ne može se poslati ","exception_casting_to":" na "},"hu":{"latex":"LaTeX","cancel":"Mégsem","accept":"Beszúrás","manual":"Kézikönyv","insert_math":"Matematikai képlet beszúrása - MathType","insert_chem":"Kémiai képet beillesztése - ChemType","minimize":"Kis méret","maximize":"Nagy méret","fullscreen":"Teljes képernyő","exit_fullscreen":"Teljes képernyő elhagyása","close":"Bezárás","mathtype":"MathType","title_modalwindow":"MathType modális ablak","close_modal_warning":"Biztosan kilép? A módosítások el fognak veszni.","latex_name_label":"Latex képlet","browser_no_compatible":"A böngészője nem kompatibilis az AJAX technológiával. Használja a Mozilla Firefox legújabb verzióját.","error_convert_accessibility":"Hiba lépett fel a MathML szöveggé történő konvertálása során.","exception_cross_site":"Az oldalak közti scriptelés csak HTTP esetén engedélyezett.","exception_high_surrogate":"A magas helyettesítő karaktert nem alacsony helyettesítő karakter követi a fixedCharCodeAt() esetében","exception_string_length":"Érvénytelen karakterlánc. A hossznak a 4 többszörösének kell lennie","exception_key_nonobject":"Az Object.keys egy nem objektumra került meghívásra","exception_null_or_undefined":" null vagy nem definiált","exception_not_function":" nem függvény","exception_invalid_date_format":"Érvénytelen dátumformátum: ","exception_casting":"Nem alkalmazható ","exception_casting_to":" erre "},"id":{"latex":"LaTeX","cancel":"Membatalkan","accept":"Masukkan","manual":"Manual","insert_math":"Masukkan rumus matematika - MathType","insert_chem":"Masukkan rumus kimia - ChemType","minimize":"Minikan","maximize":"Perbesar","fullscreen":"Layar penuh","exit_fullscreen":"Keluar layar penuh","close":"Tutup","mathtype":"MathType","title_modalwindow":"Jendela modal MathType","close_modal_warning":"Anda yakin ingin keluar? Anda akan kehilangan perubahan yang Anda buat.","latex_name_label":"Rumus Latex","browser_no_compatible":"Penjelajah Anda tidak kompatibel dengan teknologi AJAX. Harap gunakan Mozilla Firefox versi terbaru.","error_convert_accessibility":"Kesalahan konversi dari MathML menjadi teks yang dapat diakses.","exception_cross_site":"Skrip lintas situs hanya diizinkan untuk HTTP.","exception_high_surrogate":"Pengganti tinggi tidak diikuti oleh pengganti rendah di fixedCharCodeAt()","exception_string_length":"String tidak valid. Panjang harus kelipatan 4","exception_key_nonobject":"Object.keys meminta nonobjek","exception_null_or_undefined":" ini tidak berlaku atau tidak didefinisikan","exception_not_function":" bukan sebuah fungsi","exception_invalid_date_format":"Format tanggal tidak valid : ","exception_casting":"Tidak dapat mentransmisikan ","exception_casting_to":" untuk "},"it":{"latex":"LaTeX","cancel":"Annulla","accept":"Inserisci","manual":"Manuale","insert_math":"Inserisci una formula matematica - MathType","insert_chem":"Inserisci una formula chimica - ChemType","minimize":"Riduci a icona","maximize":"Ingrandisci","fullscreen":"Schermo intero","exit_fullscreen":"Esci da schermo intero","close":"Chiudi","mathtype":"MathType","title_modalwindow":"Finestra modale di MathType","close_modal_warning":"Confermi di voler uscire? Le modifiche effettuate andranno perse.","latex_name_label":"Formula LaTeX","browser_no_compatible":"Il tuo browser non è compatibile con la tecnologia AJAX. Utilizza la versione più recente di Mozilla Firefox.","error_convert_accessibility":"Errore durante la conversione da MathML in testo accessibile.","exception_cross_site":"Lo scripting tra siti è consentito solo per HTTP.","exception_high_surrogate":"Surrogato alto non seguito da surrogato basso in fixedCharCodeAt()","exception_string_length":"Stringa non valida. La lunghezza deve essere un multiplo di 4","exception_key_nonobject":"Metodo Object.keys richiamato in un elemento non oggetto","exception_null_or_undefined":" questo è un valore null o non definito","exception_not_function":" non è una funzione","exception_invalid_date_format":"Formato di data non valido: ","exception_casting":"Impossibile eseguire il cast ","exception_casting_to":" a "},"ja":{"latex":"LaTeX","cancel":"キャンセル","accept":"挿入","manual":"マニュアル","insert_math":"数式を挿入 - MathType","insert_chem":"化学式を挿入 - ChemType","minimize":"最小化","maximize":"最大化","fullscreen":"全画面表示","exit_fullscreen":"全画面表示を解除","close":"閉じる","mathtype":"MathType","title_modalwindow":"MathType モードウィンドウ","close_modal_warning":"このページから移動してもよろしいですか？変更内容は失われます。","latex_name_label":"LaTeX 数式","browser_no_compatible":"お使いのブラウザは、AJAX 技術と互換性がありません。Mozilla Firefox の最新バージョンをご使用ください。","error_convert_accessibility":"MathML からアクセシブルなテキストへの変換中にエラーが発生しました。","exception_cross_site":"クロスサイトスクリプティングは、HTTP のみに許可されています。","exception_high_surrogate":"fixedCharCodeAt（）で上位サロゲートの後に下位サロゲートがありません","exception_string_length":"無効な文字列です。長さは4の倍数である必要があります","exception_key_nonobject":"Object.keys が非オブジェクトで呼び出されました","exception_null_or_undefined":" null であるか、定義されていません","exception_not_function":" は関数ではありません","exception_invalid_date_format":"無効な日付形式: ","exception_casting":"次にキャスト ","exception_casting_to":" できません "},"ko":{"latex":"LaTeX","cancel":"취소","accept":"삽입","manual":"설명서","insert_math":"수학 공식 삽입 - MathType","insert_chem":"화학 공식 입력하기 - ChemType","minimize":"최소화","maximize":"최대화","fullscreen":"전체 화면","exit_fullscreen":"전체 화면 나가기","close":"닫기","mathtype":"MathType","title_modalwindow":"MathType 모달 창","close_modal_warning":"정말로 나가시겠습니까? 변경 사항이 손실됩니다.","latex_name_label":"Latex 공식","browser_no_compatible":"사용자의 브라우저는 AJAX 기술과 호환되지 않습니다. Mozilla Firefox 최신 버전을 사용하십시오.","error_convert_accessibility":"MathML로부터 접근 가능한 텍스트로 오류 변환.","exception_cross_site":"사이트 교차 스크립팅은 HTTP 환경에서만 사용할 수 있습니다.","exception_high_surrogate":"fixedCharCodeAt()에서는 상위 서러게이트 뒤에 하위 서러게이트가 붙지 않습니다","exception_string_length":"유효하지 않은 스트링입니다. 길이는 4의 배수여야 합니다","exception_key_nonobject":"Object.keys가 non-object를 요청하였습니다","exception_null_or_undefined":" Null값이거나 정의되지 않았습니다","exception_not_function":" 함수가 아닙니다","exception_invalid_date_format":"유효하지 않은 날짜 포맷 : ","exception_casting":"캐스팅할 수 없습니다 ","exception_casting_to":" (으)로 "},"nl":{"latex":"LaTeX","cancel":"Annuleren","insert_chem":"Een scheikundige formule invoegen - ChemType","minimize":"Minimaliseer","maximize":"Maximaliseer","fullscreen":"Schermvullend","exit_fullscreen":"Verlaat volledig scherm","close":"Sluit","mathtype":"MathType","title_modalwindow":"Modaal venster MathType","close_modal_warning":"Weet je zeker dat je de app wilt sluiten? De gemaakte wijzigingen gaan verloren.","latex_name_label":"LaTeX-formule","browser_no_compatible":"Je browser is niet compatibel met AJAX-technologie. Gebruik de meest recente versie van Mozilla Firefox.","error_convert_accessibility":"Fout bij conversie van MathML naar toegankelijke tekst.","exception_cross_site":"Cross-site scripting is alleen toegestaan voor HTTP.","exception_high_surrogate":"Hoog surrogaat niet gevolgd door laag surrogaat in fixedCharCodeAt()","exception_string_length":"Ongeldige tekenreeks. Lengte moet een veelvoud van 4 zijn","exception_key_nonobject":"Object.keys opgeroepen voor niet-object","exception_null_or_undefined":" dit is nul of niet gedefinieerd","exception_not_function":" is geen functie","exception_invalid_date_format":"Ongeldige datumnotatie: ","exception_casting":"Kan niet weergeven ","exception_casting_to":" op "},"no":{"latex":"LaTeX","cancel":"Avbryt","accept":"Set inn","manual":"Håndbok","insert_math":"Sett inn matematikkformel - MathType","insert_chem":"Set inn ein kjemisk formel – ChemType","minimize":"Minimer","maximize":"Maksimer","fullscreen":"Fullskjerm","exit_fullscreen":"Avslutt fullskjerm","close":"Lukk","mathtype":"MathType","title_modalwindow":"Modalt MathType-vindu","close_modal_warning":"Er du sikker på at du vil gå ut? Endringane du har gjort, vil gå tapt.","latex_name_label":"LaTeX-formel","browser_no_compatible":"Nettlesaren er ikkje kompatibel med AJAX-teknologien. Bruk den nyaste versjonen av Mozilla Firefox.","error_convert_accessibility":"Feil under konvertering frå MathML til tilgjengeleg tekst.","exception_cross_site":"Skripting på tvers av nettstadar er bere tillaten med HTTP.","exception_high_surrogate":"Høgt surrogat er ikkje etterfølgt av lågt surrogat i fixedCharCodeAt()","exception_string_length":"Ugyldig streng. Lengda må vera deleleg på 4","exception_key_nonobject":"Object.keys kalla på eit ikkje-objekt","exception_null_or_undefined":" dette er null eller ikkje definert","exception_not_function":" er ikkje ein funksjon","exception_invalid_date_format":"Ugyldig datoformat: ","exception_casting":"Kan ikkje bruka casting ","exception_casting_to":" til "},"nb":{"latex":"LaTeX","cancel":"Avbryt","accept":"Insert","manual":"Håndbok","insert_math":"Sett inn matematikkformel - MathType","insert_chem":"Sett inn en kjemisk formel – ChemType","minimize":"Minimer","maximize":"Maksimer","fullscreen":"Fullskjerm","exit_fullscreen":"Avslutt fullskjerm","close":"Lukk","mathtype":"MathType","title_modalwindow":"Modalt MathType-vindu","close_modal_warning":"Er du sikker på at du vil gå ut? Endringene du har gjort, vil gå tapt.","latex_name_label":"LaTeX-formel","browser_no_compatible":"Nettleseren er ikke kompatibel med AJAX-teknologien. Bruk den nyeste versjonen av Mozilla Firefox.","error_convert_accessibility":"Feil under konvertering fra MathML til tilgjengelig tekst.","exception_cross_site":"Skripting på tvers av nettsteder er bare tillatt med HTTP.","exception_high_surrogate":"Høyt surrogat etterfølges ikke av lavt surrogat i fixedCharCodeAt()","exception_string_length":"Ugyldig streng. Lengden må være delelig på 4","exception_key_nonobject":"Object.keys kalte på et ikke-objekt","exception_null_or_undefined":" dette er null eller ikke definert","exception_not_function":" er ikke en funksjon","exception_invalid_date_format":"Ugyldig datoformat: ","exception_casting":"Kan ikke bruke casting ","exception_casting_to":" til "},"nn":{"latex":"LaTeX","cancel":"Avbryt","accept":"Set inn","manual":"Håndbok","insert_math":"Sett inn matematikkformel - MathType","insert_chem":"Set inn ein kjemisk formel – ChemType","minimize":"Minimer","maximize":"Maksimer","fullscreen":"Fullskjerm","exit_fullscreen":"Avslutt fullskjerm","close":"Lukk","mathtype":"MathType","title_modalwindow":"Modalt MathType-vindu","close_modal_warning":"Er du sikker på at du vil gå ut? Endringane du har gjort, vil gå tapt.","latex_name_label":"LaTeX-formel","browser_no_compatible":"Nettlesaren er ikkje kompatibel med AJAX-teknologien. Bruk den nyaste versjonen av Mozilla Firefox.","error_convert_accessibility":"Feil under konvertering frå MathML til tilgjengeleg tekst.","exception_cross_site":"Skripting på tvers av nettstadar er bere tillaten med HTTP.","exception_high_surrogate":"Høgt surrogat er ikkje etterfølgt av lågt surrogat i fixedCharCodeAt()","exception_string_length":"Ugyldig streng. Lengda må vera deleleg på 4","exception_key_nonobject":"Object.keys kalla på eit ikkje-objekt","exception_null_or_undefined":" dette er null eller ikkje definert","exception_not_function":" er ikkje ein funksjon","exception_invalid_date_format":"Ugyldig datoformat: ","exception_casting":"Kan ikkje bruka casting ","exception_casting_to":" til "},"pl":{"latex":"LaTeX","cancel":"Anuluj","accept":"Wstaw","manual":"Instrukcja","insert_math":"Wstaw formułę matematyczną - MathType","insert_chem":"Wstaw wzór chemiczny — ChemType","minimize":"Minimalizuj","maximize":"Maksymalizuj","fullscreen":"Pełny ekran","exit_fullscreen":"Opuść tryb pełnoekranowy","close":"Zamknij","mathtype":"MathType","title_modalwindow":"Okno modalne MathType","close_modal_warning":"Czy na pewno chcesz zamknąć? Wprowadzone zmiany zostaną utracone.","latex_name_label":"Wzór Latex","browser_no_compatible":"Twoja przeglądarka jest niezgodna z technologią AJAX Użyj najnowszej wersji Mozilla Firefox.","error_convert_accessibility":"Błąd podczas konwertowania z formatu MathML na dostępny tekst.","exception_cross_site":"Krzyżowanie skryptów witryny jest dozwolone tylko dla HTTP.","exception_high_surrogate":"Brak niskiego surogatu po wysokim surogacie w fixedCharCodeAt()","exception_string_length":"Niewłaściwy ciąg znaków. Długość musi być wielokrotnością liczby 4.","exception_key_nonobject":"Argumentem wywołanej funkcji Object.key nie jest obiekt.","exception_null_or_undefined":" jest zerowy lub niezdefiniowany","exception_not_function":" nie jest funkcją","exception_invalid_date_format":"Nieprawidłowy format daty: ","exception_casting":"Nie można rzutować ","exception_casting_to":" na "},"pt":{"latex":"LaTeX","cancel":"Cancelar","accept":"Inserir","manual":"Manual","insert_math":"Inserir fórmula matemática - MathType","insert_chem":"Inserir uma fórmula química - ChemType","minimize":"Minimizar","maximize":"Maximizar","fullscreen":"Ecrã completo","exit_fullscreen":"Sair do ecrã completo","close":"Fechar","mathtype":"MathType","title_modalwindow":"Janela modal do MathType","close_modal_warning":"Pretende sair? As alterações efetuadas serão perdidas.","latex_name_label":"Fórmula Latex","browser_no_compatible":"O seu navegador não é compatível com a tecnologia AJAX. Utilize a versão mais recente do Mozilla Firefox.","error_convert_accessibility":"Erro ao converter de MathML para texto acessível.","exception_cross_site":"O processamento de scripts em vários sites só é permitido para HTTP.","exception_high_surrogate":"Substituto alto não seguido por um substituto baixo em fixedCharCodeAt()","exception_string_length":"Cadeia inválida. O comprimento tem de ser um múltiplo de 4","exception_key_nonobject":"Object.keys chamou um não-objeto","exception_null_or_undefined":" é nulo ou não está definido","exception_not_function":" não é uma função","exception_invalid_date_format":"Formato de data inválido: ","exception_casting":"Não é possível adicionar ","exception_casting_to":" até "},"pt_br":{"latex":"LaTeX","cancel":"Cancelar","accept":"Inserir","manual":"Manual","insert_math":"Inserir fórmula matemática - MathType","insert_chem":"Insira uma fórmula química - ChemType","minimize":"Minimizar","maximize":"Maximizar","fullscreen":"Tela cheia","exit_fullscreen":"Sair de tela cheia","close":"Fechar","mathtype":"MathType","title_modalwindow":"Janela modal do MathType","close_modal_warning":"Tem certeza de que deseja sair? Todas as alterações serão perdidas.","latex_name_label":"Fórmula LaTeX","browser_no_compatible":"O navegador não é compatível com a tecnologia AJAX. Use a versão mais recente do Mozilla Firefox.","error_convert_accessibility":"Erro ao converter de MathML para texto acessível.","exception_cross_site":"O uso de scripts entre sites só é permitido para HTTP.","exception_high_surrogate":"High surrogate não seguido de low surrogate em fixedCharCodeAt()","exception_string_length":"String inválida. O comprimento deve ser um múltiplo de 4","exception_key_nonobject":"Object.keys chamados em não objeto","exception_null_or_undefined":" isto é nulo ou não definido","exception_not_function":" não é uma função","exception_invalid_date_format":"Formato de data inválido: ","exception_casting":"Não é possível transmitir ","exception_casting_to":" para "},"ro":{"latex":"LaTeX","cancel":"Anulare","accept":"Inserați","manual":"Ghid","insert_math":"Inserați o formulă matematică - MathType","insert_chem":"Inserați o formulă chimică - ChemType","minimize":"Minimizați","maximize":"Maximizați","fullscreen":"Afișați pe tot ecranul","exit_fullscreen":"Opriți afișarea pe tot ecranul","close":"Închideți","mathtype":"MathType","title_modalwindow":"Fereastră modală MathType","close_modal_warning":"Sigur doriți să ieșiți? Modificările realizate se vor pierde.","latex_name_label":"Formulă Latex","browser_no_compatible":"Browserul dvs. nu este compatibil cu tehnologia AJAX. Utilizați cea mai recentă versiune de Mozilla Firefox.","error_convert_accessibility":"Eroare la convertirea din MathML în text accesibil.","exception_cross_site":"Scriptarea între site‑uri este permisă doar pentru HTTP.","exception_high_surrogate":"Surogatul superior nu este urmat de un surogat inferior în fixedCharCodeAt()","exception_string_length":"Șir nevalid. Lungimea trebuie să fie multiplu de 4","exception_key_nonobject":"Object.keys a apelat un non-obiect","exception_null_or_undefined":" este null sau nu este definit","exception_not_function":" nu este funcție","exception_invalid_date_format":"Format de dată nevalid: ","exception_casting":"nu se poate difuza ","exception_casting_to":" către "},"ru":{"latex":"LaTeX","cancel":"отмена","accept":"Вставка","manual":"вручную","insert_math":"Вставить математическую формулу: WIRIS","insert_chem":"Вставить химическую формулу — ChemType","minimize":"Свернуть","maximize":"Развернуть","fullscreen":"На весь экран","exit_fullscreen":"Выйти из полноэкранного режима","close":"Закрыть","mathtype":"MathType","title_modalwindow":"Режимное окно MathType","close_modal_warning":"Вы уверены, что хотите выйти? Все внесенные изменения будут утрачены.","latex_name_label":"Формула Latex","browser_no_compatible":"Ваш браузер несовместим с технологией AJAX. Используйте последнюю версию Mozilla Firefox.","error_convert_accessibility":"При преобразовании формулы в текст допустимого формата произошла ошибка.","exception_cross_site":"Межсайтовые сценарии доступны только для HTTP.","exception_high_surrogate":"Младший символ-заместитель не сопровождает старший символ-заместитель в исправленном методе CharCodeAt()","exception_string_length":"Недопустимая строка. Длинна должна быть кратной 4.","exception_key_nonobject":"Метод Object.keys вызван не для объекта","exception_null_or_undefined":" значение пустое или не определено","exception_not_function":" не функция","exception_invalid_date_format":"Недопустимый формат даты: ","exception_casting":"Не удается привести ","exception_casting_to":" к "},"sv":{"latex":"LaTeX","cancel":"Avbryt","accept":"Infoga","manual":"Bruksanvisning","insert_math":"Infoga matematisk formel - MathType","insert_chem":"Infoga en kemiformel – ChemType","minimize":"Minimera","maximize":"Maximera","fullscreen":"Helskärm","exit_fullscreen":"Stäng helskärm","close":"Stäng","mathtype":"MathType","title_modalwindow":"MathType modulfönster","close_modal_warning":"Vill du avsluta? Inga ändringar kommer att sparas.","latex_name_label":"Latex-formel","browser_no_compatible":"Din webbläsare är inte kompatibel med AJAX-teknik. Använd den senaste versionen av Mozilla Firefox.","error_convert_accessibility":"Det uppstod ett fel vid konvertering från MathML till åtkomlig text.","exception_cross_site":"Skriptkörning över flera sajter är endast tillåtet för HTTP.","exception_high_surrogate":"Hög surrogat följs inte av låg surrogat i fixedCharCodeAt()","exception_string_length":"Ogiltig sträng. Längden måste vara en multipel av 4","exception_key_nonobject":"Object.keys anropade icke-objekt","exception_null_or_undefined":" det är null eller inte definierat","exception_not_function":" är inte en funktion","exception_invalid_date_format":"Ogiltigt datumformat: ","exception_casting":"Går inte att konvertera ","exception_casting_to":" till "},"tr":{"latex":"LaTeX","cancel":"Vazgeç","accept":"Ekle","manual":"Kılavuz","insert_math":"Matematik formülü ekle - MathType","insert_chem":"Kimya formülü ekleyin - ChemType","minimize":"Simge Durumuna Küçült","maximize":"Ekranı Kapla","fullscreen":"Tam Ekran","exit_fullscreen":"Tam Ekrandan Çık","close":"Kapat","mathtype":"MathType","title_modalwindow":"MathType kalıcı penceresi","close_modal_warning":"Çıkmak istediğinizden emin misiniz? Yaptığınız değişiklikler kaybolacak.","latex_name_label":"Latex Formülü","browser_no_compatible":"Tarayıcınız AJAX teknolojisiyle uyumlu değil. Lütfen en güncel Mozilla Firefox sürümünü kullanın.","error_convert_accessibility":"MathML biçiminden erişilebilir metne dönüştürme hatası.","exception_cross_site":"Siteler arası komut dosyası yazma işlemine yalnızca HTTP için izin verilir.","exception_high_surrogate":"fixedCharCodeAt() fonksiyonunda üst vekilin ardından alt vekil gelmiyor","exception_string_length":"Geçersiz dizgi. Uzunluk, 4\'ün katlarından biri olmalıdır","exception_key_nonobject":"Nesne olmayan öğe üzerinde Object.keys çağrıldı","exception_null_or_undefined":" bu değer boş veya tanımlanmamış","exception_not_function":" bir fonksiyon değil","exception_invalid_date_format":"Geçersiz tarih biçimi: ","exception_casting":"Tür dönüştürülemiyor ","exception_casting_to":" hedef: "},"zh":{"latex":"LaTeX","cancel":"取消","accept":"插入","manual":"手册","insert_math":"插入数学公式 - MathType","insert_chem":"插入化学分子式 - ChemType","minimize":"最小化","maximize":"最大化","fullscreen":"全屏幕","exit_fullscreen":"退出全屏幕","close":"关闭","mathtype":"MathType","title_modalwindow":"MathType 模式窗口","close_modal_warning":"您确定要离开吗？您所做的修改将丢失。","latex_name_label":"Latex 分子式","browser_no_compatible":"您的浏览器不兼容 AJAX 技术。请使用最新版 Mozilla Firefox。","error_convert_accessibility":"将 MathML 转换为可访问文本时出错。","exception_cross_site":"仅 HTTP 允许跨站脚本。","exception_high_surrogate":"fixedCharCodeAt() 中的高位代理之后未跟随低位代理","exception_string_length":"无效字符串。长度必须是 4 的倍数","exception_key_nonobject":"非对象调用了 Object.keys","exception_null_or_undefined":" 该值为空或未定义","exception_not_function":" 不是一个函数","exception_invalid_date_format":"无效日期格式： ","exception_casting":"无法转换 ","exception_casting_to":" 为 "},"":{}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsU0FBUztBQUN6Qjs7O0FBR0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx3QkFBd0Isd0JBQXdCO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpSkFBaUo7QUFDako7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVELDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixzQkFBc0IsOENBQThDLGFBQWEsY0FBYztBQUN4SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FBQyxRQUFRLENBQUMsRUFBQzs7O0NBQ3RDO0FBUEQsOENBT0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ3ZMRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0B3aXJpcy9tYXRodHlwZS12aWV3ZXIvLi4vLi4vbm9kZV9tb2R1bGVzL2RvbXB1cmlmeS9kaXN0L3B1cmlmeS5qcyIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyLy4vbm9kZV9tb2R1bGVzL0B3aXJpcy9tYXRodHlwZS1odG1sLWludGVncmF0aW9uLWRldmtpdC9zcmMvYWNjZXNzaWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyLy4vbm9kZV9tb2R1bGVzL0B3aXJpcy9tYXRodHlwZS1odG1sLWludGVncmF0aW9uLWRldmtpdC9zcmMvY29uZmlndXJhdGlvbi5qcyIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyLy4vbm9kZV9tb2R1bGVzL0B3aXJpcy9tYXRodHlwZS1odG1sLWludGVncmF0aW9uLWRldmtpdC9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL0B3aXJpcy9tYXRodHlwZS12aWV3ZXIvLi9ub2RlX21vZHVsZXMvQHdpcmlzL21hdGh0eXBlLWh0bWwtaW50ZWdyYXRpb24tZGV2a2l0L3NyYy9pbWFnZS5qcyIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyLy4vbm9kZV9tb2R1bGVzL0B3aXJpcy9tYXRodHlwZS1odG1sLWludGVncmF0aW9uLWRldmtpdC9zcmMvbGF0ZXguanMiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci8uL25vZGVfbW9kdWxlcy9Ad2lyaXMvbWF0aHR5cGUtaHRtbC1pbnRlZ3JhdGlvbi1kZXZraXQvc3JjL2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyLy4vbm9kZV9tb2R1bGVzL0B3aXJpcy9tYXRodHlwZS1odG1sLWludGVncmF0aW9uLWRldmtpdC9zcmMvbWF0aG1sLmpzIiwid2VicGFjazovL0B3aXJpcy9tYXRodHlwZS12aWV3ZXIvLi9ub2RlX21vZHVsZXMvQHdpcmlzL21hdGh0eXBlLWh0bWwtaW50ZWdyYXRpb24tZGV2a2l0L3NyYy9tZDUuanMiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci8uL25vZGVfbW9kdWxlcy9Ad2lyaXMvbWF0aHR5cGUtaHRtbC1pbnRlZ3JhdGlvbi1kZXZraXQvc3JjL3BhcnNlci5qcyIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyLy4vbm9kZV9tb2R1bGVzL0B3aXJpcy9tYXRodHlwZS1odG1sLWludGVncmF0aW9uLWRldmtpdC9zcmMvc2VydmljZXByb3ZpZGVyLmpzIiwid2VicGFjazovL0B3aXJpcy9tYXRodHlwZS12aWV3ZXIvLi9ub2RlX21vZHVsZXMvQHdpcmlzL21hdGh0eXBlLWh0bWwtaW50ZWdyYXRpb24tZGV2a2l0L3NyYy9zdHJpbmdtYW5hZ2VyLmpzIiwid2VicGFjazovL0B3aXJpcy9tYXRodHlwZS12aWV3ZXIvLi9ub2RlX21vZHVsZXMvQHdpcmlzL21hdGh0eXBlLWh0bWwtaW50ZWdyYXRpb24tZGV2a2l0L3NyYy90ZXh0Y2FjaGUuanMiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci8uL25vZGVfbW9kdWxlcy9Ad2lyaXMvbWF0aHR5cGUtaHRtbC1pbnRlZ3JhdGlvbi1kZXZraXQvc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci8uL3NyYy9sYXRleC50cyIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyLy4vc3JjL21hdGhtbC50cyIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyLy4vc3JjL3Byb3BlcnRpZXMudHMiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci8uL3NyYy9zZXJ2aWNlcy50cyIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0B3aXJpcy9tYXRodHlwZS12aWV3ZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0B3aXJpcy9tYXRodHlwZS12aWV3ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Ad2lyaXMvbWF0aHR5cGUtdmlld2VyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQHdpcmlzL21hdGh0eXBlLXZpZXdlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEBsaWNlbnNlIERPTVB1cmlmeSAyLjQuNSB8IChjKSBDdXJlNTMgYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyB8IFJlbGVhc2VkIHVuZGVyIHRoZSBBcGFjaGUgbGljZW5zZSAyLjAgYW5kIE1vemlsbGEgUHVibGljIExpY2Vuc2UgMi4wIHwgZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2Jsb2IvMi40LjUvTElDRU5TRSAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gICAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9LCBfdHlwZW9mKG9iaik7XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgICAgby5fX3Byb3RvX18gPSBwO1xuICAgICAgcmV0dXJuIG87XG4gICAgfTtcblxuICAgIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG4gIH1cblxuICBmdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7XG5cbiAgICB0cnkge1xuICAgICAgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgIGlmIChfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHtcbiAgICAgIF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdDtcbiAgICB9IGVsc2Uge1xuICAgICAgX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgICAgICB2YXIgYSA9IFtudWxsXTtcbiAgICAgICAgYS5wdXNoLmFwcGx5KGEsIGFyZ3MpO1xuICAgICAgICB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7XG4gICAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgICAgICBpZiAoQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICAgIHJldHVybiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5KGFycikgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgX25vbkl0ZXJhYmxlU3ByZWFkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KGFycik7XG4gIH1cblxuICBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgICBpZiAoIW8pIHJldHVybjtcbiAgICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICAgIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICAgIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gICAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbiAgfVxuXG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgIHNldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mLFxuICAgICAgaXNGcm96ZW4gPSBPYmplY3QuaXNGcm96ZW4sXG4gICAgICBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gIHZhciBmcmVlemUgPSBPYmplY3QuZnJlZXplLFxuICAgICAgc2VhbCA9IE9iamVjdC5zZWFsLFxuICAgICAgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG5cbiAgdmFyIF9yZWYgPSB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgUmVmbGVjdCxcbiAgICAgIGFwcGx5ID0gX3JlZi5hcHBseSxcbiAgICAgIGNvbnN0cnVjdCA9IF9yZWYuY29uc3RydWN0O1xuXG4gIGlmICghYXBwbHkpIHtcbiAgICBhcHBseSA9IGZ1bmN0aW9uIGFwcGx5KGZ1biwgdGhpc1ZhbHVlLCBhcmdzKSB7XG4gICAgICByZXR1cm4gZnVuLmFwcGx5KHRoaXNWYWx1ZSwgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghZnJlZXplKSB7XG4gICAgZnJlZXplID0gZnVuY3Rpb24gZnJlZXplKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cblxuICBpZiAoIXNlYWwpIHtcbiAgICBzZWFsID0gZnVuY3Rpb24gc2VhbCh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFjb25zdHJ1Y3QpIHtcbiAgICBjb25zdHJ1Y3QgPSBmdW5jdGlvbiBjb25zdHJ1Y3QoRnVuYywgYXJncykge1xuICAgICAgcmV0dXJuIF9jb25zdHJ1Y3QoRnVuYywgX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGFycmF5Rm9yRWFjaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpO1xuICB2YXIgYXJyYXlQb3AgPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wb3ApO1xuICB2YXIgYXJyYXlQdXNoID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gIHZhciBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG4gIHZhciBzdHJpbmdUb1N0cmluZyA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyk7XG4gIHZhciBzdHJpbmdNYXRjaCA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5tYXRjaCk7XG4gIHZhciBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuICB2YXIgc3RyaW5nSW5kZXhPZiA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mKTtcbiAgdmFyIHN0cmluZ1RyaW0gPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudHJpbSk7XG4gIHZhciByZWdFeHBUZXN0ID0gdW5hcHBseShSZWdFeHAucHJvdG90eXBlLnRlc3QpO1xuICB2YXIgdHlwZUVycm9yQ3JlYXRlID0gdW5jb25zdHJ1Y3QoVHlwZUVycm9yKTtcbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncyk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB1bmNvbnN0cnVjdChmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb25zdHJ1Y3QoZnVuYywgYXJncyk7XG4gICAgfTtcbiAgfVxuICAvKiBBZGQgcHJvcGVydGllcyB0byBhIGxvb2t1cCB0YWJsZSAqL1xuXG4gIGZ1bmN0aW9uIGFkZFRvU2V0KHNldCwgYXJyYXksIHRyYW5zZm9ybUNhc2VGdW5jKSB7XG4gICAgdHJhbnNmb3JtQ2FzZUZ1bmMgPSB0cmFuc2Zvcm1DYXNlRnVuYyA/IHRyYW5zZm9ybUNhc2VGdW5jIDogc3RyaW5nVG9Mb3dlckNhc2U7XG5cbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxuICAgICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgICAgLy8gUHJldmVudCBwcm90b3R5cGUgc2V0dGVycyBmcm9tIGludGVyY2VwdGluZyBzZXQgYXMgYSB0aGlzIHZhbHVlLlxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcbiAgICB9XG5cbiAgICB2YXIgbCA9IGFycmF5Lmxlbmd0aDtcblxuICAgIHdoaWxlIChsLS0pIHtcbiAgICAgIHZhciBlbGVtZW50ID0gYXJyYXlbbF07XG5cbiAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGxjRWxlbWVudCA9IHRyYW5zZm9ybUNhc2VGdW5jKGVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgICBpZiAoIWlzRnJvemVuKGFycmF5KSkge1xuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbWVudCA9IGxjRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRbZWxlbWVudF0gPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBzZXQ7XG4gIH1cbiAgLyogU2hhbGxvdyBjbG9uZSBhbiBvYmplY3QgKi9cblxuICBmdW5jdGlvbiBjbG9uZShvYmplY3QpIHtcbiAgICB2YXIgbmV3T2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuICAgIHZhciBwcm9wZXJ0eTtcblxuICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAoYXBwbHkoaGFzT3duUHJvcGVydHksIG9iamVjdCwgW3Byb3BlcnR5XSkgPT09IHRydWUpIHtcbiAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuICAvKiBJRTEwIGRvZXNuJ3Qgc3VwcG9ydCBfX2xvb2t1cEdldHRlcl9fIHNvIGxldHMnXG4gICAqIHNpbXVsYXRlIGl0LiBJdCBhbHNvIGF1dG9tYXRpY2FsbHkgY2hlY2tzXG4gICAqIGlmIHRoZSBwcm9wIGlzIGZ1bmN0aW9uIG9yIGdldHRlciBhbmQgYmVoYXZlc1xuICAgKiBhY2NvcmRpbmdseS4gKi9cblxuICBmdW5jdGlvbiBsb29rdXBHZXR0ZXIob2JqZWN0LCBwcm9wKSB7XG4gICAgd2hpbGUgKG9iamVjdCAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRlc2MgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wKTtcblxuICAgICAgaWYgKGRlc2MpIHtcbiAgICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHVuYXBwbHkoZGVzYy5nZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkZXNjLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHVuYXBwbHkoZGVzYy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYWxsYmFja1ZhbHVlKGVsZW1lbnQpIHtcbiAgICAgIGNvbnNvbGUud2FybignZmFsbGJhY2sgdmFsdWUgZm9yJywgZWxlbWVudCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcbiAgfVxuXG4gIHZhciBodG1sJDEgPSBmcmVlemUoWydhJywgJ2FiYnInLCAnYWNyb255bScsICdhZGRyZXNzJywgJ2FyZWEnLCAnYXJ0aWNsZScsICdhc2lkZScsICdhdWRpbycsICdiJywgJ2JkaScsICdiZG8nLCAnYmlnJywgJ2JsaW5rJywgJ2Jsb2NrcXVvdGUnLCAnYm9keScsICdicicsICdidXR0b24nLCAnY2FudmFzJywgJ2NhcHRpb24nLCAnY2VudGVyJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnY29udGVudCcsICdkYXRhJywgJ2RhdGFsaXN0JywgJ2RkJywgJ2RlY29yYXRvcicsICdkZWwnLCAnZGV0YWlscycsICdkZm4nLCAnZGlhbG9nJywgJ2RpcicsICdkaXYnLCAnZGwnLCAnZHQnLCAnZWxlbWVudCcsICdlbScsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb250JywgJ2Zvb3RlcicsICdmb3JtJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWQnLCAnaGVhZGVyJywgJ2hncm91cCcsICdocicsICdodG1sJywgJ2knLCAnaW1nJywgJ2lucHV0JywgJ2lucycsICdrYmQnLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ21haW4nLCAnbWFwJywgJ21hcmsnLCAnbWFycXVlZScsICdtZW51JywgJ21lbnVpdGVtJywgJ21ldGVyJywgJ25hdicsICdub2JyJywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NoYWRvdycsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhY2VyJywgJ3NwYW4nLCAnc3RyaWtlJywgJ3N0cm9uZycsICdzdHlsZScsICdzdWInLCAnc3VtbWFyeScsICdzdXAnLCAndGFibGUnLCAndGJvZHknLCAndGQnLCAndGVtcGxhdGUnLCAndGV4dGFyZWEnLCAndGZvb3QnLCAndGgnLCAndGhlYWQnLCAndGltZScsICd0cicsICd0cmFjaycsICd0dCcsICd1JywgJ3VsJywgJ3ZhcicsICd2aWRlbycsICd3YnInXSk7IC8vIFNWR1xuXG4gIHZhciBzdmckMSA9IGZyZWV6ZShbJ3N2ZycsICdhJywgJ2FsdGdseXBoJywgJ2FsdGdseXBoZGVmJywgJ2FsdGdseXBoaXRlbScsICdhbmltYXRlY29sb3InLCAnYW5pbWF0ZW1vdGlvbicsICdhbmltYXRldHJhbnNmb3JtJywgJ2NpcmNsZScsICdjbGlwcGF0aCcsICdkZWZzJywgJ2Rlc2MnLCAnZWxsaXBzZScsICdmaWx0ZXInLCAnZm9udCcsICdnJywgJ2dseXBoJywgJ2dseXBocmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLCAnbGluZWFyZ3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWV0YWRhdGEnLCAnbXBhdGgnLCAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsZ3JhZGllbnQnLCAncmVjdCcsICdzdG9wJywgJ3N0eWxlJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0cGF0aCcsICd0aXRsZScsICd0cmVmJywgJ3RzcGFuJywgJ3ZpZXcnLCAndmtlcm4nXSk7XG4gIHZhciBzdmdGaWx0ZXJzID0gZnJlZXplKFsnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JywgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLCAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsICdmZURpc3BsYWNlbWVudE1hcCcsICdmZURpc3RhbnRMaWdodCcsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJywgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJywgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnXSk7IC8vIExpc3Qgb2YgU1ZHIGVsZW1lbnRzIHRoYXQgYXJlIGRpc2FsbG93ZWQgYnkgZGVmYXVsdC5cbiAgLy8gV2Ugc3RpbGwgbmVlZCB0byBrbm93IHRoZW0gc28gdGhhdCB3ZSBjYW4gZG8gbmFtZXNwYWNlXG4gIC8vIGNoZWNrcyBwcm9wZXJseSBpbiBjYXNlIG9uZSB3YW50cyB0byBhZGQgdGhlbSB0b1xuICAvLyBhbGxvdy1saXN0LlxuXG4gIHZhciBzdmdEaXNhbGxvd2VkID0gZnJlZXplKFsnYW5pbWF0ZScsICdjb2xvci1wcm9maWxlJywgJ2N1cnNvcicsICdkaXNjYXJkJywgJ2ZlZHJvcHNoYWRvdycsICdmb250LWZhY2UnLCAnZm9udC1mYWNlLWZvcm1hdCcsICdmb250LWZhY2UtbmFtZScsICdmb250LWZhY2Utc3JjJywgJ2ZvbnQtZmFjZS11cmknLCAnZm9yZWlnbm9iamVjdCcsICdoYXRjaCcsICdoYXRjaHBhdGgnLCAnbWVzaCcsICdtZXNoZ3JhZGllbnQnLCAnbWVzaHBhdGNoJywgJ21lc2hyb3cnLCAnbWlzc2luZy1nbHlwaCcsICdzY3JpcHQnLCAnc2V0JywgJ3NvbGlkY29sb3InLCAndW5rbm93bicsICd1c2UnXSk7XG4gIHZhciBtYXRoTWwkMSA9IGZyZWV6ZShbJ21hdGgnLCAnbWVuY2xvc2UnLCAnbWVycm9yJywgJ21mZW5jZWQnLCAnbWZyYWMnLCAnbWdseXBoJywgJ21pJywgJ21sYWJlbGVkdHInLCAnbW11bHRpc2NyaXB0cycsICdtbicsICdtbycsICdtb3ZlcicsICdtcGFkZGVkJywgJ21waGFudG9tJywgJ21yb290JywgJ21yb3cnLCAnbXMnLCAnbXNwYWNlJywgJ21zcXJ0JywgJ21zdHlsZScsICdtc3ViJywgJ21zdXAnLCAnbXN1YnN1cCcsICdtdGFibGUnLCAnbXRkJywgJ210ZXh0JywgJ210cicsICdtdW5kZXInLCAnbXVuZGVyb3ZlciddKTsgLy8gU2ltaWxhcmx5IHRvIFNWRywgd2Ugd2FudCB0byBrbm93IGFsbCBNYXRoTUwgZWxlbWVudHMsXG4gIC8vIGV2ZW4gdGhvc2UgdGhhdCB3ZSBkaXNhbGxvdyBieSBkZWZhdWx0LlxuXG4gIHZhciBtYXRoTWxEaXNhbGxvd2VkID0gZnJlZXplKFsnbWFjdGlvbicsICdtYWxpZ25ncm91cCcsICdtYWxpZ25tYXJrJywgJ21sb25nZGl2JywgJ21zY2FycmllcycsICdtc2NhcnJ5JywgJ21zZ3JvdXAnLCAnbXN0YWNrJywgJ21zbGluZScsICdtc3JvdycsICdzZW1hbnRpY3MnLCAnYW5ub3RhdGlvbicsICdhbm5vdGF0aW9uLXhtbCcsICdtcHJlc2NyaXB0cycsICdub25lJ10pO1xuICB2YXIgdGV4dCA9IGZyZWV6ZShbJyN0ZXh0J10pO1xuXG4gIHZhciBodG1sID0gZnJlZXplKFsnYWNjZXB0JywgJ2FjdGlvbicsICdhbGlnbicsICdhbHQnLCAnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9waWN0dXJlaW5waWN0dXJlJywgJ2F1dG9wbGF5JywgJ2JhY2tncm91bmQnLCAnYmdjb2xvcicsICdib3JkZXInLCAnY2FwdHVyZScsICdjZWxscGFkZGluZycsICdjZWxsc3BhY2luZycsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3MnLCAnY2xlYXInLCAnY29sb3InLCAnY29scycsICdjb2xzcGFuJywgJ2NvbnRyb2xzJywgJ2NvbnRyb2xzbGlzdCcsICdjb29yZHMnLCAnY3Jvc3NvcmlnaW4nLCAnZGF0ZXRpbWUnLCAnZGVjb2RpbmcnLCAnZGVmYXVsdCcsICdkaXInLCAnZGlzYWJsZWQnLCAnZGlzYWJsZXBpY3R1cmVpbnBpY3R1cmUnLCAnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsICdlbmN0eXBlJywgJ2VudGVya2V5aGludCcsICdmYWNlJywgJ2ZvcicsICdoZWFkZXJzJywgJ2hlaWdodCcsICdoaWRkZW4nLCAnaGlnaCcsICdocmVmJywgJ2hyZWZsYW5nJywgJ2lkJywgJ2lucHV0bW9kZScsICdpbnRlZ3JpdHknLCAnaXNtYXAnLCAna2luZCcsICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9hZGluZycsICdsb29wJywgJ2xvdycsICdtYXgnLCAnbWF4bGVuZ3RoJywgJ21lZGlhJywgJ21ldGhvZCcsICdtaW4nLCAnbWlubGVuZ3RoJywgJ211bHRpcGxlJywgJ211dGVkJywgJ25hbWUnLCAnbm9uY2UnLCAnbm9zaGFkZScsICdub3ZhbGlkYXRlJywgJ25vd3JhcCcsICdvcGVuJywgJ29wdGltdW0nLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdwbGF5c2lubGluZScsICdwb3N0ZXInLCAncHJlbG9hZCcsICdwdWJkYXRlJywgJ3JhZGlvZ3JvdXAnLCAncmVhZG9ubHknLCAncmVsJywgJ3JlcXVpcmVkJywgJ3JldicsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd3MnLCAncm93c3BhbicsICdzcGVsbGNoZWNrJywgJ3Njb3BlJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcmNsYW5nJywgJ3N0YXJ0JywgJ3NyYycsICdzcmNzZXQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JywgJ3RhYmluZGV4JywgJ3RpdGxlJywgJ3RyYW5zbGF0ZScsICd0eXBlJywgJ3VzZW1hcCcsICd2YWxpZ24nLCAndmFsdWUnLCAnd2lkdGgnLCAneG1sbnMnLCAnc2xvdCddKTtcbiAgdmFyIHN2ZyA9IGZyZWV6ZShbJ2FjY2VudC1oZWlnaHQnLCAnYWNjdW11bGF0ZScsICdhZGRpdGl2ZScsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYXNjZW50JywgJ2F0dHJpYnV0ZW5hbWUnLCAnYXR0cmlidXRldHlwZScsICdhemltdXRoJywgJ2Jhc2VmcmVxdWVuY3knLCAnYmFzZWxpbmUtc2hpZnQnLCAnYmVnaW4nLCAnYmlhcycsICdieScsICdjbGFzcycsICdjbGlwJywgJ2NsaXBwYXRodW5pdHMnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvcicsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdjeCcsICdjeScsICdkJywgJ2R4JywgJ2R5JywgJ2RpZmZ1c2Vjb25zdGFudCcsICdkaXJlY3Rpb24nLCAnZGlzcGxheScsICdkaXZpc29yJywgJ2R1cicsICdlZGdlbW9kZScsICdlbGV2YXRpb24nLCAnZW5kJywgJ2ZpbGwnLCAnZmlsbC1vcGFjaXR5JywgJ2ZpbGwtcnVsZScsICdmaWx0ZXInLCAnZmlsdGVydW5pdHMnLCAnZmxvb2QtY29sb3InLCAnZmxvb2Qtb3BhY2l0eScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZngnLCAnZnknLCAnZzEnLCAnZzInLCAnZ2x5cGgtbmFtZScsICdnbHlwaHJlZicsICdncmFkaWVudHVuaXRzJywgJ2dyYWRpZW50dHJhbnNmb3JtJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2ltYWdlLXJlbmRlcmluZycsICdpbicsICdpbjInLCAnaycsICdrMScsICdrMicsICdrMycsICdrNCcsICdrZXJuaW5nJywgJ2tleXBvaW50cycsICdrZXlzcGxpbmVzJywgJ2tleXRpbWVzJywgJ2xhbmcnLCAnbGVuZ3RoYWRqdXN0JywgJ2xldHRlci1zcGFjaW5nJywgJ2tlcm5lbG1hdHJpeCcsICdrZXJuZWx1bml0bGVuZ3RoJywgJ2xpZ2h0aW5nLWNvbG9yJywgJ2xvY2FsJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnLCAnbWFya2VyaGVpZ2h0JywgJ21hcmtlcnVuaXRzJywgJ21hcmtlcndpZHRoJywgJ21hc2tjb250ZW50dW5pdHMnLCAnbWFza3VuaXRzJywgJ21heCcsICdtYXNrJywgJ21lZGlhJywgJ21ldGhvZCcsICdtb2RlJywgJ21pbicsICduYW1lJywgJ251bW9jdGF2ZXMnLCAnb2Zmc2V0JywgJ29wZXJhdG9yJywgJ29wYWNpdHknLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdwYWludC1vcmRlcicsICdwYXRoJywgJ3BhdGhsZW5ndGgnLCAncGF0dGVybmNvbnRlbnR1bml0cycsICdwYXR0ZXJudHJhbnNmb3JtJywgJ3BhdHRlcm51bml0cycsICdwb2ludHMnLCAncHJlc2VydmVhbHBoYScsICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJywgJ3ByaW1pdGl2ZXVuaXRzJywgJ3InLCAncngnLCAncnknLCAncmFkaXVzJywgJ3JlZngnLCAncmVmeScsICdyZXBlYXRjb3VudCcsICdyZXBlYXRkdXInLCAncmVzdGFydCcsICdyZXN1bHQnLCAncm90YXRlJywgJ3NjYWxlJywgJ3NlZWQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3NwZWN1bGFyY29uc3RhbnQnLCAnc3BlY3VsYXJleHBvbmVudCcsICdzcHJlYWRtZXRob2QnLCAnc3RhcnRvZmZzZXQnLCAnc3RkZGV2aWF0aW9uJywgJ3N0aXRjaHRpbGVzJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZScsICdzdHJva2Utd2lkdGgnLCAnc3R5bGUnLCAnc3VyZmFjZXNjYWxlJywgJ3N5c3RlbWxhbmd1YWdlJywgJ3RhYmluZGV4JywgJ3RhcmdldHgnLCAndGFyZ2V0eScsICd0cmFuc2Zvcm0nLCAndHJhbnNmb3JtLW9yaWdpbicsICd0ZXh0LWFuY2hvcicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1yZW5kZXJpbmcnLCAndGV4dGxlbmd0aCcsICd0eXBlJywgJ3UxJywgJ3UyJywgJ3VuaWNvZGUnLCAndmFsdWVzJywgJ3ZpZXdib3gnLCAndmlzaWJpbGl0eScsICd2ZXJzaW9uJywgJ3ZlcnQtYWR2LXknLCAndmVydC1vcmlnaW4teCcsICd2ZXJ0LW9yaWdpbi15JywgJ3dpZHRoJywgJ3dvcmQtc3BhY2luZycsICd3cmFwJywgJ3dyaXRpbmctbW9kZScsICd4Y2hhbm5lbHNlbGVjdG9yJywgJ3ljaGFubmVsc2VsZWN0b3InLCAneCcsICd4MScsICd4MicsICd4bWxucycsICd5JywgJ3kxJywgJ3kyJywgJ3onLCAnem9vbWFuZHBhbiddKTtcbiAgdmFyIG1hdGhNbCA9IGZyZWV6ZShbJ2FjY2VudCcsICdhY2NlbnR1bmRlcicsICdhbGlnbicsICdiZXZlbGxlZCcsICdjbG9zZScsICdjb2x1bW5zYWxpZ24nLCAnY29sdW1ubGluZXMnLCAnY29sdW1uc3BhbicsICdkZW5vbWFsaWduJywgJ2RlcHRoJywgJ2RpcicsICdkaXNwbGF5JywgJ2Rpc3BsYXlzdHlsZScsICdlbmNvZGluZycsICdmZW5jZScsICdmcmFtZScsICdoZWlnaHQnLCAnaHJlZicsICdpZCcsICdsYXJnZW9wJywgJ2xlbmd0aCcsICdsaW5ldGhpY2tuZXNzJywgJ2xzcGFjZScsICdscXVvdGUnLCAnbWF0aGJhY2tncm91bmQnLCAnbWF0aGNvbG9yJywgJ21hdGhzaXplJywgJ21hdGh2YXJpYW50JywgJ21heHNpemUnLCAnbWluc2l6ZScsICdtb3ZhYmxlbGltaXRzJywgJ25vdGF0aW9uJywgJ251bWFsaWduJywgJ29wZW4nLCAncm93YWxpZ24nLCAncm93bGluZXMnLCAncm93c3BhY2luZycsICdyb3dzcGFuJywgJ3JzcGFjZScsICdycXVvdGUnLCAnc2NyaXB0bGV2ZWwnLCAnc2NyaXB0bWluc2l6ZScsICdzY3JpcHRzaXplbXVsdGlwbGllcicsICdzZWxlY3Rpb24nLCAnc2VwYXJhdG9yJywgJ3NlcGFyYXRvcnMnLCAnc3RyZXRjaHknLCAnc3Vic2NyaXB0c2hpZnQnLCAnc3Vwc2NyaXB0c2hpZnQnLCAnc3ltbWV0cmljJywgJ3ZvZmZzZXQnLCAnd2lkdGgnLCAneG1sbnMnXSk7XG4gIHZhciB4bWwgPSBmcmVlemUoWyd4bGluazpocmVmJywgJ3htbDppZCcsICd4bGluazp0aXRsZScsICd4bWw6c3BhY2UnLCAneG1sbnM6eGxpbmsnXSk7XG5cbiAgdmFyIE1VU1RBQ0hFX0VYUFIgPSBzZWFsKC9cXHtcXHtbXFx3XFxXXSp8W1xcd1xcV10qXFx9XFx9L2dtKTsgLy8gU3BlY2lmeSB0ZW1wbGF0ZSBkZXRlY3Rpb24gcmVnZXggZm9yIFNBRkVfRk9SX1RFTVBMQVRFUyBtb2RlXG5cbiAgdmFyIEVSQl9FWFBSID0gc2VhbCgvPCVbXFx3XFxXXSp8W1xcd1xcV10qJT4vZ20pO1xuICB2YXIgVE1QTElUX0VYUFIgPSBzZWFsKC9cXCR7W1xcd1xcV10qfS9nbSk7XG4gIHZhciBEQVRBX0FUVFIgPSBzZWFsKC9eZGF0YS1bXFwtXFx3LlxcdTAwQjctXFx1RkZGRl0vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuXG4gIHZhciBBUklBX0FUVFIgPSBzZWFsKC9eYXJpYS1bXFwtXFx3XSskLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcblxuICB2YXIgSVNfQUxMT1dFRF9VUkkgPSBzZWFsKC9eKD86KD86KD86ZnxodCl0cHM/fG1haWx0b3x0ZWx8Y2FsbHRvfGNpZHx4bXBwKTp8W15hLXpdfFthLXorLlxcLV0rKD86W15hLXorLlxcLTpdfCQpKS9pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgKTtcbiAgdmFyIElTX1NDUklQVF9PUl9EQVRBID0gc2VhbCgvXig/OlxcdytzY3JpcHR8ZGF0YSk6L2kpO1xuICB2YXIgQVRUUl9XSElURVNQQUNFID0gc2VhbCgvW1xcdTAwMDAtXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDAtXFx1MjAyOVxcdTIwNUZcXHUzMDAwXS9nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxuICApO1xuICB2YXIgRE9DVFlQRV9OQU1FID0gc2VhbCgvXmh0bWwkL2kpO1xuXG4gIHZhciBnZXRHbG9iYWwgPSBmdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdztcbiAgfTtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuby1vcCBwb2xpY3kgZm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBEb24ndCBleHBvcnQgdGhpcyBmdW5jdGlvbiBvdXRzaWRlIHRoaXMgbW9kdWxlIVxuICAgKiBAcGFyYW0gez9UcnVzdGVkVHlwZVBvbGljeUZhY3Rvcnl9IHRydXN0ZWRUeXBlcyBUaGUgcG9saWN5IGZhY3RvcnkuXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY3VtZW50IFRoZSBkb2N1bWVudCBvYmplY3QgKHRvIGRldGVybWluZSBwb2xpY3kgbmFtZSBzdWZmaXgpXG4gICAqIEByZXR1cm4gez9UcnVzdGVkVHlwZVBvbGljeX0gVGhlIHBvbGljeSBjcmVhdGVkIChvciBudWxsLCBpZiBUcnVzdGVkIFR5cGVzXG4gICAqIGFyZSBub3Qgc3VwcG9ydGVkKS5cbiAgICovXG5cblxuICB2YXIgX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSA9IGZ1bmN0aW9uIF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBkb2N1bWVudCkge1xuICAgIGlmIChfdHlwZW9mKHRydXN0ZWRUeXBlcykgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IC8vIEFsbG93IHRoZSBjYWxsZXJzIHRvIGNvbnRyb2wgdGhlIHVuaXF1ZSBwb2xpY3kgbmFtZVxuICAgIC8vIGJ5IGFkZGluZyBhIGRhdGEtdHQtcG9saWN5LXN1ZmZpeCB0byB0aGUgc2NyaXB0IGVsZW1lbnQgd2l0aCB0aGUgRE9NUHVyaWZ5LlxuICAgIC8vIFBvbGljeSBjcmVhdGlvbiB3aXRoIGR1cGxpY2F0ZSBuYW1lcyB0aHJvd3MgaW4gVHJ1c3RlZCBUeXBlcy5cblxuXG4gICAgdmFyIHN1ZmZpeCA9IG51bGw7XG4gICAgdmFyIEFUVFJfTkFNRSA9ICdkYXRhLXR0LXBvbGljeS1zdWZmaXgnO1xuXG4gICAgaWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC5oYXNBdHRyaWJ1dGUoQVRUUl9OQU1FKSkge1xuICAgICAgc3VmZml4ID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoQVRUUl9OQU1FKTtcbiAgICB9XG5cbiAgICB2YXIgcG9saWN5TmFtZSA9ICdkb21wdXJpZnknICsgKHN1ZmZpeCA/ICcjJyArIHN1ZmZpeCA6ICcnKTtcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeShwb2xpY3lOYW1lLCB7XG4gICAgICAgIGNyZWF0ZUhUTUw6IGZ1bmN0aW9uIGNyZWF0ZUhUTUwoaHRtbCkge1xuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVTY3JpcHRVUkw6IGZ1bmN0aW9uIGNyZWF0ZVNjcmlwdFVSTChzY3JpcHRVcmwpIHtcbiAgICAgICAgICByZXR1cm4gc2NyaXB0VXJsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICAvLyBQb2xpY3kgY3JlYXRpb24gZmFpbGVkIChtb3N0IGxpa2VseSBhbm90aGVyIERPTVB1cmlmeSBzY3JpcHQgaGFzXG4gICAgICAvLyBhbHJlYWR5IHJ1bikuIFNraXAgY3JlYXRpbmcgdGhlIHBvbGljeSwgYXMgdGhpcyB3aWxsIG9ubHkgY2F1c2UgZXJyb3JzXG4gICAgICAvLyBpZiBUVCBhcmUgZW5mb3JjZWQuXG4gICAgICBjb25zb2xlLndhcm4oJ1RydXN0ZWRUeXBlcyBwb2xpY3kgJyArIHBvbGljeU5hbWUgKyAnIGNvdWxkIG5vdCBiZSBjcmVhdGVkLicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZURPTVB1cmlmeSgpIHtcbiAgICB2YXIgd2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBnZXRHbG9iYWwoKTtcblxuICAgIHZhciBET01QdXJpZnkgPSBmdW5jdGlvbiBET01QdXJpZnkocm9vdCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZURPTVB1cmlmeShyb290KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFZlcnNpb24gbGFiZWwsIGV4cG9zZWQgZm9yIGVhc2llciBjaGVja3NcbiAgICAgKiBpZiBET01QdXJpZnkgaXMgdXAgdG8gZGF0ZSBvciBub3RcbiAgICAgKi9cblxuXG4gICAgRE9NUHVyaWZ5LnZlcnNpb24gPSAnMi40LjUnO1xuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGVsZW1lbnRzIHRoYXQgRE9NUHVyaWZ5IHJlbW92ZWQgZHVyaW5nIHNhbml0YXRpb24uXG4gICAgICogRW1wdHkgaWYgbm90aGluZyB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cblxuICAgIERPTVB1cmlmeS5yZW1vdmVkID0gW107XG5cbiAgICBpZiAoIXdpbmRvdyB8fCAhd2luZG93LmRvY3VtZW50IHx8IHdpbmRvdy5kb2N1bWVudC5ub2RlVHlwZSAhPT0gOSkge1xuICAgICAgLy8gTm90IHJ1bm5pbmcgaW4gYSBicm93c2VyLCBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIHBhc3MgeW91ciBvd24gV2luZG93XG4gICAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBET01QdXJpZnk7XG4gICAgfVxuXG4gICAgdmFyIG9yaWdpbmFsRG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgdmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuICAgIHZhciBEb2N1bWVudEZyYWdtZW50ID0gd2luZG93LkRvY3VtZW50RnJhZ21lbnQsXG4gICAgICAgIEhUTUxUZW1wbGF0ZUVsZW1lbnQgPSB3aW5kb3cuSFRNTFRlbXBsYXRlRWxlbWVudCxcbiAgICAgICAgTm9kZSA9IHdpbmRvdy5Ob2RlLFxuICAgICAgICBFbGVtZW50ID0gd2luZG93LkVsZW1lbnQsXG4gICAgICAgIE5vZGVGaWx0ZXIgPSB3aW5kb3cuTm9kZUZpbHRlcixcbiAgICAgICAgX3dpbmRvdyROYW1lZE5vZGVNYXAgPSB3aW5kb3cuTmFtZWROb2RlTWFwLFxuICAgICAgICBOYW1lZE5vZGVNYXAgPSBfd2luZG93JE5hbWVkTm9kZU1hcCA9PT0gdm9pZCAwID8gd2luZG93Lk5hbWVkTm9kZU1hcCB8fCB3aW5kb3cuTW96TmFtZWRBdHRyTWFwIDogX3dpbmRvdyROYW1lZE5vZGVNYXAsXG4gICAgICAgIEhUTUxGb3JtRWxlbWVudCA9IHdpbmRvdy5IVE1MRm9ybUVsZW1lbnQsXG4gICAgICAgIERPTVBhcnNlciA9IHdpbmRvdy5ET01QYXJzZXIsXG4gICAgICAgIHRydXN0ZWRUeXBlcyA9IHdpbmRvdy50cnVzdGVkVHlwZXM7XG4gICAgdmFyIEVsZW1lbnRQcm90b3R5cGUgPSBFbGVtZW50LnByb3RvdHlwZTtcbiAgICB2YXIgY2xvbmVOb2RlID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdjbG9uZU5vZGUnKTtcbiAgICB2YXIgZ2V0TmV4dFNpYmxpbmcgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ25leHRTaWJsaW5nJyk7XG4gICAgdmFyIGdldENoaWxkTm9kZXMgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ2NoaWxkTm9kZXMnKTtcbiAgICB2YXIgZ2V0UGFyZW50Tm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAncGFyZW50Tm9kZScpOyAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcbiAgICAvLyBuZXcgZG9jdW1lbnQgY3JlYXRlZCB2aWEgY3JlYXRlSFRNTERvY3VtZW50LiBBcyBwZXIgdGhlIHNwZWNcbiAgICAvLyAoaHR0cDovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3JlYXRpbmctYW5kLXBhc3NpbmctcmVnaXN0cmllcylcbiAgICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxuICAgIC8vIGRvY3VtZW50LCBzbyB3ZSB1c2UgdGhhdCBhcyBvdXIgcGFyZW50IGRvY3VtZW50IHRvIGVuc3VyZSBub3RoaW5nXG4gICAgLy8gaXMgaW5oZXJpdGVkLlxuXG4gICAgaWYgKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuXG4gICAgICBpZiAodGVtcGxhdGUuY29udGVudCAmJiB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHRydXN0ZWRUeXBlc1BvbGljeSA9IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBvcmlnaW5hbERvY3VtZW50KTtcblxuICAgIHZhciBlbXB0eUhUTUwgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJykgOiAnJztcbiAgICB2YXIgX2RvY3VtZW50ID0gZG9jdW1lbnQsXG4gICAgICAgIGltcGxlbWVudGF0aW9uID0gX2RvY3VtZW50LmltcGxlbWVudGF0aW9uLFxuICAgICAgICBjcmVhdGVOb2RlSXRlcmF0b3IgPSBfZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgICAgICBjcmVhdGVEb2N1bWVudEZyYWdtZW50ID0gX2RvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQsXG4gICAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lID0gX2RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lO1xuICAgIHZhciBpbXBvcnROb2RlID0gb3JpZ2luYWxEb2N1bWVudC5pbXBvcnROb2RlO1xuICAgIHZhciBkb2N1bWVudE1vZGUgPSB7fTtcblxuICAgIHRyeSB7XG4gICAgICBkb2N1bWVudE1vZGUgPSBjbG9uZShkb2N1bWVudCkuZG9jdW1lbnRNb2RlID8gZG9jdW1lbnQuZG9jdW1lbnRNb2RlIDoge307XG4gICAgfSBjYXRjaCAoXykge31cblxuICAgIHZhciBob29rcyA9IHt9O1xuICAgIC8qKlxuICAgICAqIEV4cG9zZSB3aGV0aGVyIHRoaXMgYnJvd3NlciBzdXBwb3J0cyBydW5uaW5nIHRoZSBmdWxsIERPTVB1cmlmeS5cbiAgICAgKi9cblxuICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IHR5cGVvZiBnZXRQYXJlbnROb2RlID09PSAnZnVuY3Rpb24nICYmIGltcGxlbWVudGF0aW9uICYmIHR5cGVvZiBpbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50TW9kZSAhPT0gOTtcbiAgICB2YXIgTVVTVEFDSEVfRVhQUiQxID0gTVVTVEFDSEVfRVhQUixcbiAgICAgICAgRVJCX0VYUFIkMSA9IEVSQl9FWFBSLFxuICAgICAgICBUTVBMSVRfRVhQUiQxID0gVE1QTElUX0VYUFIsXG4gICAgICAgIERBVEFfQVRUUiQxID0gREFUQV9BVFRSLFxuICAgICAgICBBUklBX0FUVFIkMSA9IEFSSUFfQVRUUixcbiAgICAgICAgSVNfU0NSSVBUX09SX0RBVEEkMSA9IElTX1NDUklQVF9PUl9EQVRBLFxuICAgICAgICBBVFRSX1dISVRFU1BBQ0UkMSA9IEFUVFJfV0hJVEVTUEFDRTtcbiAgICB2YXIgSVNfQUxMT1dFRF9VUkkkMSA9IElTX0FMTE9XRURfVVJJO1xuICAgIC8qKlxuICAgICAqIFdlIGNvbnNpZGVyIHRoZSBlbGVtZW50cyBhbmQgYXR0cmlidXRlcyBiZWxvdyB0byBiZSBzYWZlLiBJZGVhbGx5XG4gICAgICogZG9uJ3QgYWRkIGFueSBuZXcgb25lcyBidXQgZmVlbCBmcmVlIHRvIHJlbW92ZSB1bndhbnRlZCBvbmVzLlxuICAgICAqL1xuXG4gICAgLyogYWxsb3dlZCBlbGVtZW50IG5hbWVzICovXG5cbiAgICB2YXIgQUxMT1dFRF9UQUdTID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9BTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShodG1sJDEpLCBfdG9Db25zdW1hYmxlQXJyYXkoc3ZnJDEpLCBfdG9Db25zdW1hYmxlQXJyYXkoc3ZnRmlsdGVycyksIF90b0NvbnN1bWFibGVBcnJheShtYXRoTWwkMSksIF90b0NvbnN1bWFibGVBcnJheSh0ZXh0KSkpO1xuICAgIC8qIEFsbG93ZWQgYXR0cmlidXRlIG5hbWVzICovXG5cbiAgICB2YXIgQUxMT1dFRF9BVFRSID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9BTExPV0VEX0FUVFIgPSBhZGRUb1NldCh7fSwgW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShodG1sKSwgX3RvQ29uc3VtYWJsZUFycmF5KHN2ZyksIF90b0NvbnN1bWFibGVBcnJheShtYXRoTWwpLCBfdG9Db25zdW1hYmxlQXJyYXkoeG1sKSkpO1xuICAgIC8qXG4gICAgICogQ29uZmlndXJlIGhvdyBET01QVXJpZnkgc2hvdWxkIGhhbmRsZSBjdXN0b20gZWxlbWVudHMgYW5kIHRoZWlyIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyBjdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzLlxuICAgICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IHRhZ05hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgY3VzdG9tIGVsZW1lbnRzKVxuICAgICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IGF0dHJpYnV0ZU5hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgYXR0cmlidXRlcyBub3Qgb24gdGhlIGFsbG93IGxpc3QpXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBhbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgYWxsb3cgY3VzdG9tIGVsZW1lbnRzIGRlcml2ZWQgZnJvbSBidWlsdC1pbnMgaWYgdGhleSBwYXNzIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjay4gRGVmYXVsdDogYGZhbHNlYC5cbiAgICAgKi9cblxuICAgIHZhciBDVVNUT01fRUxFTUVOVF9IQU5ETElORyA9IE9iamVjdC5zZWFsKE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgICAgdGFnTmFtZUNoZWNrOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSxcbiAgICAgIGF0dHJpYnV0ZU5hbWVDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBhbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfVxuICAgIH0pKTtcbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuXG4gICAgdmFyIEZPUkJJRF9UQUdTID0gbnVsbDtcbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiBhdHRyaWJ1dGVzIChvdmVycmlkZXMgQUxMT1dFRF9BVFRSL0FERF9BVFRSKSAqL1xuXG4gICAgdmFyIEZPUkJJRF9BVFRSID0gbnVsbDtcbiAgICAvKiBEZWNpZGUgaWYgQVJJQSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG5cbiAgICB2YXIgQUxMT1dfQVJJQV9BVFRSID0gdHJ1ZTtcbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuXG4gICAgdmFyIEFMTE9XX0RBVEFfQVRUUiA9IHRydWU7XG4gICAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG5cbiAgICB2YXIgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBmYWxzZTtcbiAgICAvKiBEZWNpZGUgaWYgc2VsZi1jbG9zaW5nIHRhZ3MgaW4gYXR0cmlidXRlcyBhcmUgYWxsb3dlZC5cbiAgICAgKiBVc3VhbGx5IHJlbW92ZWQgZHVlIHRvIGEgbVhTUyBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG5cbiAgICB2YXIgQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSID0gdHJ1ZTtcbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cblxuICAgIHZhciBTQUZFX0ZPUl9URU1QTEFURVMgPSBmYWxzZTtcbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG5cbiAgICB2YXIgV0hPTEVfRE9DVU1FTlQgPSBmYWxzZTtcbiAgICAvKiBUcmFjayB3aGV0aGVyIGNvbmZpZyBpcyBhbHJlYWR5IHNldCBvbiB0aGlzIGluc3RhbmNlIG9mIERPTVB1cmlmeS4gKi9cblxuICAgIHZhciBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAgICogZG9jdW1lbnQuYm9keS4gQnkgZGVmYXVsdCwgYnJvd3NlcnMgbWlnaHQgbW92ZSB0aGVtIHRvIGRvY3VtZW50LmhlYWQgKi9cblxuICAgIHZhciBGT1JDRV9CT0RZID0gZmFsc2U7XG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG5cbiAgICB2YXIgUkVUVVJOX0RPTSA9IGZhbHNlO1xuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgRG9jdW1lbnRGcmFnbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cblxuICAgIHZhciBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gZmFsc2U7XG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXG4gICAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuXG4gICAgdmFyIFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBmYWxzZTtcbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzP1xuICAgICAqIFRoaXMgc2FuaXRpemVzIG1hcmt1cHMgbmFtZWQgd2l0aCBjb2xsaWRpbmcsIGNsb2JiZXJhYmxlIGJ1aWx0LWluIERPTSBBUElzLlxuICAgICAqL1xuXG4gICAgdmFyIFNBTklUSVpFX0RPTSA9IHRydWU7XG4gICAgLyogQWNoaWV2ZSBmdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gYnkgaXNvbGF0aW5nIHRoZSBuYW1lc3BhY2Ugb2YgbmFtZWRcbiAgICAgKiBwcm9wZXJ0aWVzIGFuZCBKUyB2YXJpYWJsZXMsIG1pdGlnYXRpbmcgYXR0YWNrcyB0aGF0IGFidXNlIHRoZSBIVE1ML0RPTSBzcGVjIHJ1bGVzLlxuICAgICAqXG4gICAgICogSFRNTC9ET00gc3BlYyBydWxlcyB0aGF0IGVuYWJsZSBET00gQ2xvYmJlcmluZzpcbiAgICAgKiAgIC0gTmFtZWQgQWNjZXNzIG9uIFdpbmRvdyAowqc3LjMuMylcbiAgICAgKiAgIC0gRE9NIFRyZWUgQWNjZXNzb3JzICjCpzMuMS41KVxuICAgICAqICAgLSBGb3JtIEVsZW1lbnQgUGFyZW50LUNoaWxkIFJlbGF0aW9ucyAowqc0LjEwLjMpXG4gICAgICogICAtIElmcmFtZSBzcmNkb2MgLyBOZXN0ZWQgV2luZG93UHJveGllcyAowqc0LjguNSlcbiAgICAgKiAgIC0gSFRNTENvbGxlY3Rpb24gKMKnNC4yLjEwLjIpXG4gICAgICpcbiAgICAgKiBOYW1lc3BhY2UgaXNvbGF0aW9uIGlzIGltcGxlbWVudGVkIGJ5IHByZWZpeGluZyBgaWRgIGFuZCBgbmFtZWAgYXR0cmlidXRlc1xuICAgICAqIHdpdGggYSBjb25zdGFudCBzdHJpbmcsIGkuZS4sIGB1c2VyLWNvbnRlbnQtYFxuICAgICAqL1xuXG4gICAgdmFyIFNBTklUSVpFX05BTUVEX1BST1BTID0gZmFsc2U7XG4gICAgdmFyIFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCA9ICd1c2VyLWNvbnRlbnQtJztcbiAgICAvKiBLZWVwIGVsZW1lbnQgY29udGVudCB3aGVuIHJlbW92aW5nIGVsZW1lbnQ/ICovXG5cbiAgICB2YXIgS0VFUF9DT05URU5UID0gdHJ1ZTtcbiAgICAvKiBJZiBhIGBOb2RlYCBpcyBwYXNzZWQgdG8gc2FuaXRpemUoKSwgdGhlbiBwZXJmb3JtcyBzYW5pdGl6YXRpb24gaW4tcGxhY2UgaW5zdGVhZFxuICAgICAqIG9mIGltcG9ydGluZyBpdCBpbnRvIGEgbmV3IERvY3VtZW50IGFuZCByZXR1cm5pbmcgYSBzYW5pdGl6ZWQgY29weSAqL1xuXG4gICAgdmFyIElOX1BMQUNFID0gZmFsc2U7XG4gICAgLyogQWxsb3cgdXNhZ2Ugb2YgcHJvZmlsZXMgbGlrZSBodG1sLCBzdmcgYW5kIG1hdGhNbCAqL1xuXG4gICAgdmFyIFVTRV9QUk9GSUxFUyA9IHt9O1xuICAgIC8qIFRhZ3MgdG8gaWdub3JlIGNvbnRlbnQgb2Ygd2hlbiBLRUVQX0NPTlRFTlQgaXMgdHJ1ZSAqL1xuXG4gICAgdmFyIEZPUkJJRF9DT05URU5UUyA9IG51bGw7XG4gICAgdmFyIERFRkFVTFRfRk9SQklEX0NPTlRFTlRTID0gYWRkVG9TZXQoe30sIFsnYW5ub3RhdGlvbi14bWwnLCAnYXVkaW8nLCAnY29sZ3JvdXAnLCAnZGVzYycsICdmb3JlaWdub2JqZWN0JywgJ2hlYWQnLCAnaWZyYW1lJywgJ21hdGgnLCAnbWknLCAnbW4nLCAnbW8nLCAnbXMnLCAnbXRleHQnLCAnbm9lbWJlZCcsICdub2ZyYW1lcycsICdub3NjcmlwdCcsICdwbGFpbnRleHQnLCAnc2NyaXB0JywgJ3N0eWxlJywgJ3N2ZycsICd0ZW1wbGF0ZScsICd0aGVhZCcsICd0aXRsZScsICd2aWRlbycsICd4bXAnXSk7XG4gICAgLyogVGFncyB0aGF0IGFyZSBzYWZlIGZvciBkYXRhOiBVUklzICovXG5cbiAgICB2YXIgREFUQV9VUklfVEFHUyA9IG51bGw7XG4gICAgdmFyIERFRkFVTFRfREFUQV9VUklfVEFHUyA9IGFkZFRvU2V0KHt9LCBbJ2F1ZGlvJywgJ3ZpZGVvJywgJ2ltZycsICdzb3VyY2UnLCAnaW1hZ2UnLCAndHJhY2snXSk7XG4gICAgLyogQXR0cmlidXRlcyBzYWZlIGZvciB2YWx1ZXMgbGlrZSBcImphdmFzY3JpcHQ6XCIgKi9cblxuICAgIHZhciBVUklfU0FGRV9BVFRSSUJVVEVTID0gbnVsbDtcbiAgICB2YXIgREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTID0gYWRkVG9TZXQoe30sIFsnYWx0JywgJ2NsYXNzJywgJ2ZvcicsICdpZCcsICdsYWJlbCcsICduYW1lJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncm9sZScsICdzdW1tYXJ5JywgJ3RpdGxlJywgJ3ZhbHVlJywgJ3N0eWxlJywgJ3htbG5zJ10pO1xuICAgIHZhciBNQVRITUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnO1xuICAgIHZhciBTVkdfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICB2YXIgSFRNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG4gICAgLyogRG9jdW1lbnQgbmFtZXNwYWNlICovXG5cbiAgICB2YXIgTkFNRVNQQUNFID0gSFRNTF9OQU1FU1BBQ0U7XG4gICAgdmFyIElTX0VNUFRZX0lOUFVUID0gZmFsc2U7XG4gICAgLyogQWxsb3dlZCBYSFRNTCtYTUwgbmFtZXNwYWNlcyAqL1xuXG4gICAgdmFyIEFMTE9XRURfTkFNRVNQQUNFUyA9IG51bGw7XG4gICAgdmFyIERFRkFVTFRfQUxMT1dFRF9OQU1FU1BBQ0VTID0gYWRkVG9TZXQoe30sIFtNQVRITUxfTkFNRVNQQUNFLCBTVkdfTkFNRVNQQUNFLCBIVE1MX05BTUVTUEFDRV0sIHN0cmluZ1RvU3RyaW5nKTtcbiAgICAvKiBQYXJzaW5nIG9mIHN0cmljdCBYSFRNTCBkb2N1bWVudHMgKi9cblxuICAgIHZhciBQQVJTRVJfTUVESUFfVFlQRTtcbiAgICB2YXIgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUyA9IFsnYXBwbGljYXRpb24veGh0bWwreG1sJywgJ3RleHQvaHRtbCddO1xuICAgIHZhciBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFID0gJ3RleHQvaHRtbCc7XG4gICAgdmFyIHRyYW5zZm9ybUNhc2VGdW5jO1xuICAgIC8qIEtlZXAgYSByZWZlcmVuY2UgdG8gY29uZmlnIHRvIHBhc3MgdG8gaG9va3MgKi9cblxuICAgIHZhciBDT05GSUcgPSBudWxsO1xuICAgIC8qIElkZWFsbHksIGRvIG5vdCB0b3VjaCBhbnl0aGluZyBiZWxvdyB0aGlzIGxpbmUgKi9cblxuICAgIC8qIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18gKi9cblxuICAgIHZhciBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblxuICAgIHZhciBpc1JlZ2V4T3JGdW5jdGlvbiA9IGZ1bmN0aW9uIGlzUmVnZXhPckZ1bmN0aW9uKHRlc3RWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRlc3RWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCB0ZXN0VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIF9wYXJzZUNvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjZmcgb3B0aW9uYWwgY29uZmlnIGxpdGVyYWxcbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuXG5cbiAgICB2YXIgX3BhcnNlQ29uZmlnID0gZnVuY3Rpb24gX3BhcnNlQ29uZmlnKGNmZykge1xuICAgICAgaWYgKENPTkZJRyAmJiBDT05GSUcgPT09IGNmZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSB0YW1wZXJpbmcgKi9cblxuXG4gICAgICBpZiAoIWNmZyB8fCBfdHlwZW9mKGNmZykgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNmZyA9IHt9O1xuICAgICAgfVxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gcHJvdG90eXBlIHBvbGx1dGlvbiAqL1xuXG5cbiAgICAgIGNmZyA9IGNsb25lKGNmZyk7XG4gICAgICBQQVJTRVJfTUVESUFfVFlQRSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1pbmNsdWRlc1xuICAgICAgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUy5pbmRleE9mKGNmZy5QQVJTRVJfTUVESUFfVFlQRSkgPT09IC0xID8gUEFSU0VSX01FRElBX1RZUEUgPSBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFIDogUEFSU0VSX01FRElBX1RZUEUgPSBjZmcuUEFSU0VSX01FRElBX1RZUEU7IC8vIEhUTUwgdGFncyBhbmQgYXR0cmlidXRlcyBhcmUgbm90IGNhc2Utc2Vuc2l0aXZlLCBjb252ZXJ0aW5nIHRvIGxvd2VyY2FzZS4gS2VlcGluZyBYSFRNTCBhcyBpcy5cblxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgPyBzdHJpbmdUb1N0cmluZyA6IHN0cmluZ1RvTG93ZXJDYXNlO1xuICAgICAgLyogU2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuXG4gICAgICBBTExPV0VEX1RBR1MgPSAnQUxMT1dFRF9UQUdTJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX1RBR1M7XG4gICAgICBBTExPV0VEX0FUVFIgPSAnQUxMT1dFRF9BVFRSJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX0FUVFI7XG4gICAgICBBTExPV0VEX05BTUVTUEFDRVMgPSAnQUxMT1dFRF9OQU1FU1BBQ0VTJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfTkFNRVNQQUNFUywgc3RyaW5nVG9TdHJpbmcpIDogREVGQVVMVF9BTExPV0VEX05BTUVTUEFDRVM7XG4gICAgICBVUklfU0FGRV9BVFRSSUJVVEVTID0gJ0FERF9VUklfU0FGRV9BVFRSJyBpbiBjZmcgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVMpLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgY2ZnLkFERF9VUklfU0FGRV9BVFRSLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIDogREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTO1xuICAgICAgREFUQV9VUklfVEFHUyA9ICdBRERfREFUQV9VUklfVEFHUycgaW4gY2ZnID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9EQVRBX1VSSV9UQUdTKSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIGNmZy5BRERfREFUQV9VUklfVEFHUywgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICApIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICA6IERFRkFVTFRfREFUQV9VUklfVEFHUztcbiAgICAgIEZPUkJJRF9DT05URU5UUyA9ICdGT1JCSURfQ09OVEVOVFMnIGluIGNmZyA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0ZPUkJJRF9DT05URU5UUztcbiAgICAgIEZPUkJJRF9UQUdTID0gJ0ZPUkJJRF9UQUdTJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiB7fTtcbiAgICAgIEZPUkJJRF9BVFRSID0gJ0ZPUkJJRF9BVFRSJyBpbiBjZmcgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiB7fTtcbiAgICAgIFVTRV9QUk9GSUxFUyA9ICdVU0VfUFJPRklMRVMnIGluIGNmZyA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcbiAgICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcblxuICAgICAgQUxMT1dfREFUQV9BVFRSID0gY2ZnLkFMTE9XX0RBVEFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuXG4gICAgICBBTExPV19VTktOT1dOX1BST1RPQ09MUyA9IGNmZy5BTExPV19VTktOT1dOX1BST1RPQ09MUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuXG4gICAgICBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSBjZmcuQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG5cbiAgICAgIFNBRkVfRk9SX1RFTVBMQVRFUyA9IGNmZy5TQUZFX0ZPUl9URU1QTEFURVMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcblxuICAgICAgV0hPTEVfRE9DVU1FTlQgPSBjZmcuV0hPTEVfRE9DVU1FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcblxuICAgICAgUkVUVVJOX0RPTSA9IGNmZy5SRVRVUk5fRE9NIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG5cbiAgICAgIFJFVFVSTl9ET01fRlJBR01FTlQgPSBjZmcuUkVUVVJOX0RPTV9GUkFHTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuXG4gICAgICBSRVRVUk5fVFJVU1RFRF9UWVBFID0gY2ZnLlJFVFVSTl9UUlVTVEVEX1RZUEUgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcblxuICAgICAgRk9SQ0VfQk9EWSA9IGNmZy5GT1JDRV9CT0RZIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG5cbiAgICAgIFNBTklUSVpFX0RPTSA9IGNmZy5TQU5JVElaRV9ET00gIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcblxuICAgICAgU0FOSVRJWkVfTkFNRURfUFJPUFMgPSBjZmcuU0FOSVRJWkVfTkFNRURfUFJPUFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcblxuICAgICAgS0VFUF9DT05URU5UID0gY2ZnLktFRVBfQ09OVEVOVCAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuXG4gICAgICBJTl9QTEFDRSA9IGNmZy5JTl9QTEFDRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuXG4gICAgICBJU19BTExPV0VEX1VSSSQxID0gY2ZnLkFMTE9XRURfVVJJX1JFR0VYUCB8fCBJU19BTExPV0VEX1VSSSQxO1xuICAgICAgTkFNRVNQQUNFID0gY2ZnLk5BTUVTUEFDRSB8fCBIVE1MX05BTUVTUEFDRTtcbiAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HIHx8IHt9O1xuXG4gICAgICBpZiAoY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HICYmIGlzUmVnZXhPckZ1bmN0aW9uKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2spKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2s7XG4gICAgICB9XG5cbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgaXNSZWdleE9yRnVuY3Rpb24oY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaykpIHtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaztcbiAgICAgIH1cblxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiB0eXBlb2YgY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM7XG4gICAgICB9XG5cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgQUxMT1dfREFUQV9BVFRSID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgIFJFVFVSTl9ET00gPSB0cnVlO1xuICAgICAgfVxuICAgICAgLyogUGFyc2UgcHJvZmlsZSBpbmZvICovXG5cblxuICAgICAgaWYgKFVTRV9QUk9GSUxFUykge1xuICAgICAgICBBTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgX3RvQ29uc3VtYWJsZUFycmF5KHRleHQpKTtcbiAgICAgICAgQUxMT1dFRF9BVFRSID0gW107XG5cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5odG1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBodG1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgaHRtbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2Z0ZpbHRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2Z0ZpbHRlcnMpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLm1hdGhNbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgbWF0aE1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgbWF0aE1sKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8qIE1lcmdlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuXG5cbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICBBTExPV0VEX1RBR1MgPSBjbG9uZShBTExPV0VEX1RBR1MpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBjZmcuQUREX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNmZy5BRERfQVRUUikge1xuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSID09PSBERUZBVUxUX0FMTE9XRURfQVRUUikge1xuICAgICAgICAgIEFMTE9XRURfQVRUUiA9IGNsb25lKEFMTE9XRURfQVRUUik7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGNmZy5BRERfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ZnLkFERF9VUklfU0FGRV9BVFRSKSB7XG4gICAgICAgIGFkZFRvU2V0KFVSSV9TQUZFX0FUVFJJQlVURVMsIGNmZy5BRERfVVJJX1NBRkVfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ZnLkZPUkJJRF9DT05URU5UUykge1xuICAgICAgICBpZiAoRk9SQklEX0NPTlRFTlRTID09PSBERUZBVUxUX0ZPUkJJRF9DT05URU5UUykge1xuICAgICAgICAgIEZPUkJJRF9DT05URU5UUyA9IGNsb25lKEZPUkJJRF9DT05URU5UUyk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRUb1NldChGT1JCSURfQ09OVEVOVFMsIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIC8qIEFkZCAjdGV4dCBpbiBjYXNlIEtFRVBfQ09OVEVOVCBpcyBzZXQgdG8gdHJ1ZSAqL1xuXG5cbiAgICAgIGlmIChLRUVQX0NPTlRFTlQpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTWycjdGV4dCddID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8qIEFkZCBodG1sLCBoZWFkIGFuZCBib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIFdIT0xFX0RPQ1VNRU5UIGlzIHRydWUgKi9cblxuXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ2h0bWwnLCAnaGVhZCcsICdib2R5J10pO1xuICAgICAgfVxuICAgICAgLyogQWRkIHRib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIHRhYmxlcyBhcmUgcGVybWl0dGVkLCBzZWUgIzI4NiwgIzM2NSAqL1xuXG5cbiAgICAgIGlmIChBTExPV0VEX1RBR1MudGFibGUpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ3Rib2R5J10pO1xuICAgICAgICBkZWxldGUgRk9SQklEX1RBR1MudGJvZHk7XG4gICAgICB9IC8vIFByZXZlbnQgZnVydGhlciBtYW5pcHVsYXRpb24gb2YgY29uZmlndXJhdGlvbi5cbiAgICAgIC8vIE5vdCBhdmFpbGFibGUgaW4gSUU4LCBTYWZhcmkgNSwgZXRjLlxuXG5cbiAgICAgIGlmIChmcmVlemUpIHtcbiAgICAgICAgZnJlZXplKGNmZyk7XG4gICAgICB9XG5cbiAgICAgIENPTkZJRyA9IGNmZztcbiAgICB9O1xuXG4gICAgdmFyIE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ21pJywgJ21vJywgJ21uJywgJ21zJywgJ210ZXh0J10pO1xuICAgIHZhciBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ2ZvcmVpZ25vYmplY3QnLCAnZGVzYycsICd0aXRsZScsICdhbm5vdGF0aW9uLXhtbCddKTsgLy8gQ2VydGFpbiBlbGVtZW50cyBhcmUgYWxsb3dlZCBpbiBib3RoIFNWRyBhbmQgSFRNTFxuICAgIC8vIG5hbWVzcGFjZS4gV2UgbmVlZCB0byBzcGVjaWZ5IHRoZW0gZXhwbGljaXRseVxuICAgIC8vIHNvIHRoYXQgdGhleSBkb24ndCBnZXQgZXJyb25lb3VzbHkgZGVsZXRlZCBmcm9tXG4gICAgLy8gSFRNTCBuYW1lc3BhY2UuXG5cbiAgICB2YXIgQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UUyA9IGFkZFRvU2V0KHt9LCBbJ3RpdGxlJywgJ3N0eWxlJywgJ2ZvbnQnLCAnYScsICdzY3JpcHQnXSk7XG4gICAgLyogS2VlcCB0cmFjayBvZiBhbGwgcG9zc2libGUgU1ZHIGFuZCBNYXRoTUwgdGFnc1xuICAgICAqIHNvIHRoYXQgd2UgY2FuIHBlcmZvcm0gdGhlIG5hbWVzcGFjZSBjaGVja3NcbiAgICAgKiBjb3JyZWN0bHkuICovXG5cbiAgICB2YXIgQUxMX1NWR19UQUdTID0gYWRkVG9TZXQoe30sIHN2ZyQxKTtcbiAgICBhZGRUb1NldChBTExfU1ZHX1RBR1MsIHN2Z0ZpbHRlcnMpO1xuICAgIGFkZFRvU2V0KEFMTF9TVkdfVEFHUywgc3ZnRGlzYWxsb3dlZCk7XG4gICAgdmFyIEFMTF9NQVRITUxfVEFHUyA9IGFkZFRvU2V0KHt9LCBtYXRoTWwkMSk7XG4gICAgYWRkVG9TZXQoQUxMX01BVEhNTF9UQUdTLCBtYXRoTWxEaXNhbGxvd2VkKTtcbiAgICAvKipcbiAgICAgKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBhIERPTSBlbGVtZW50IHdob3NlIG5hbWVzcGFjZSBpcyBiZWluZyBjaGVja2VkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCBoYXMgYVxuICAgICAqICBuYW1lc3BhY2UgdGhhdCBhIHNwZWMtY29tcGxpYW50IHBhcnNlciB3b3VsZCBuZXZlclxuICAgICAqICByZXR1cm4uIFJldHVybiB0cnVlIG90aGVyd2lzZS5cbiAgICAgKi9cblxuICAgIHZhciBfY2hlY2tWYWxpZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIF9jaGVja1ZhbGlkTmFtZXNwYWNlKGVsZW1lbnQpIHtcbiAgICAgIHZhciBwYXJlbnQgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpOyAvLyBJbiBKU0RPTSwgaWYgd2UncmUgaW5zaWRlIHNoYWRvdyBET00sIHRoZW4gcGFyZW50Tm9kZVxuICAgICAgLy8gY2FuIGJlIG51bGwuIFdlIGp1c3Qgc2ltdWxhdGUgcGFyZW50IGluIHRoaXMgY2FzZS5cblxuICAgICAgaWYgKCFwYXJlbnQgfHwgIXBhcmVudC50YWdOYW1lKSB7XG4gICAgICAgIHBhcmVudCA9IHtcbiAgICAgICAgICBuYW1lc3BhY2VVUkk6IE5BTUVTUEFDRSxcbiAgICAgICAgICB0YWdOYW1lOiAndGVtcGxhdGUnXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHZhciB0YWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoZWxlbWVudC50YWdOYW1lKTtcbiAgICAgIHZhciBwYXJlbnRUYWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UocGFyZW50LnRhZ05hbWUpO1xuXG4gICAgICBpZiAoIUFMTE9XRURfTkFNRVNQQUNFU1tlbGVtZW50Lm5hbWVzcGFjZVVSSV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIFNWR1xuICAgICAgICAvLyBpcyB2aWEgPHN2Zz4uIElmIGl0IGhhcHBlbnMgdmlhIGFueSBvdGhlciB0YWcsIHRoZW5cbiAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGtpbGxlZC5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdzdmcnO1xuICAgICAgICB9IC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBNYXRoTUwgdG8gU1ZHIGlzIHZpYWBcbiAgICAgICAgLy8gc3ZnIGlmIHBhcmVudCBpcyBlaXRoZXIgPGFubm90YXRpb24teG1sPiBvciBNYXRoTUxcbiAgICAgICAgLy8gdGV4dCBpbnRlZ3JhdGlvbiBwb2ludHMuXG5cblxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnc3ZnJyAmJiAocGFyZW50VGFnTmFtZSA9PT0gJ2Fubm90YXRpb24teG1sJyB8fCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pO1xuICAgICAgICB9IC8vIFdlIG9ubHkgYWxsb3cgZWxlbWVudHMgdGhhdCBhcmUgZGVmaW5lZCBpbiBTVkdcbiAgICAgICAgLy8gc3BlYy4gQWxsIG90aGVycyBhcmUgZGlzYWxsb3dlZCBpbiBTVkcgbmFtZXNwYWNlLlxuXG5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX1NWR19UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBIVE1MIG5hbWVzcGFjZSB0byBNYXRoTUxcbiAgICAgICAgLy8gaXMgdmlhIDxtYXRoPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxuICAgICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ21hdGgnO1xuICAgICAgICB9IC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBTVkcgdG8gTWF0aE1MIGlzIHZpYVxuICAgICAgICAvLyA8bWF0aD4gYW5kIEhUTUwgaW50ZWdyYXRpb24gcG9pbnRzXG5cblxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCcgJiYgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV07XG4gICAgICAgIH0gLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIE1hdGhNTFxuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIE1hdGhNTCBuYW1lc3BhY2UuXG5cblxuICAgICAgICByZXR1cm4gQm9vbGVhbihBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBTVkcgdG8gSFRNTCBpcyB2aWFcbiAgICAgICAgLy8gSFRNTCBpbnRlZ3JhdGlvbiBwb2ludHMsIGFuZCBmcm9tIE1hdGhNTCB0byBIVE1MXG4gICAgICAgIC8vIGlzIHZpYSBNYXRoTUwgdGV4dCBpbnRlZ3JhdGlvbiBwb2ludHNcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UgJiYgIUhUTUxfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UgJiYgIU1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSAvLyBXZSBkaXNhbGxvdyB0YWdzIHRoYXQgYXJlIHNwZWNpZmljIGZvciBNYXRoTUxcbiAgICAgICAgLy8gb3IgU1ZHIGFuZCBzaG91bGQgbmV2ZXIgYXBwZWFyIGluIEhUTUwgbmFtZXNwYWNlXG5cblxuICAgICAgICByZXR1cm4gIUFMTF9NQVRITUxfVEFHU1t0YWdOYW1lXSAmJiAoQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UU1t0YWdOYW1lXSB8fCAhQUxMX1NWR19UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH0gLy8gRm9yIFhIVE1MIGFuZCBYTUwgZG9jdW1lbnRzIHRoYXQgc3VwcG9ydCBjdXN0b20gbmFtZXNwYWNlc1xuXG5cbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gLy8gVGhlIGNvZGUgc2hvdWxkIG5ldmVyIHJlYWNoIHRoaXMgcGxhY2UgKHRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgdGhlIGVsZW1lbnQgc29tZWhvdyBnb3QgbmFtZXNwYWNlIHRoYXQgaXMgbm90XG4gICAgICAvLyBIVE1MLCBTVkcsIE1hdGhNTCBvciBhbGxvd2VkIHZpYSBBTExPV0VEX05BTUVTUEFDRVMpLlxuICAgICAgLy8gUmV0dXJuIGZhbHNlIGp1c3QgaW4gY2FzZS5cblxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBfZm9yY2VSZW1vdmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuXG5cbiAgICB2YXIgX2ZvcmNlUmVtb3ZlID0gZnVuY3Rpb24gX2ZvcmNlUmVtb3ZlKG5vZGUpIHtcbiAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICBlbGVtZW50OiBub2RlXG4gICAgICB9KTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLXJlbW92ZVxuICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbm9kZS5vdXRlckhUTUwgPSBlbXB0eUhUTUw7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBfcmVtb3ZlQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgYW4gQXR0cmlidXRlIG5hbWVcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIG5vZGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbm9kZS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpLFxuICAgICAgICAgIGZyb206IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbnVsbCxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgLy8gV2Ugdm9pZCBhdHRyaWJ1dGUgdmFsdWVzIGZvciB1bnJlbW92YWJsZSBcImlzXCJcIiBhdHRyaWJ1dGVzXG5cbiAgICAgIGlmIChuYW1lID09PSAnaXMnICYmICFBTExPV0VEX0FUVFJbbmFtZV0pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET00gfHwgUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBfZm9yY2VSZW1vdmUobm9kZSk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIF9pbml0RG9jdW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZGlydHkgYSBzdHJpbmcgb2YgZGlydHkgbWFya3VwXG4gICAgICogQHJldHVybiB7RG9jdW1lbnR9IGEgRE9NLCBmaWxsZWQgd2l0aCB0aGUgZGlydHkgbWFya3VwXG4gICAgICovXG5cblxuICAgIHZhciBfaW5pdERvY3VtZW50ID0gZnVuY3Rpb24gX2luaXREb2N1bWVudChkaXJ0eSkge1xuICAgICAgLyogQ3JlYXRlIGEgSFRNTCBkb2N1bWVudCAqL1xuICAgICAgdmFyIGRvYztcbiAgICAgIHZhciBsZWFkaW5nV2hpdGVzcGFjZTtcblxuICAgICAgaWYgKEZPUkNFX0JPRFkpIHtcbiAgICAgICAgZGlydHkgPSAnPHJlbW92ZT48L3JlbW92ZT4nICsgZGlydHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBJZiBGT1JDRV9CT0RZIGlzbid0IHVzZWQsIGxlYWRpbmcgd2hpdGVzcGFjZSBuZWVkcyB0byBiZSBwcmVzZXJ2ZWQgbWFudWFsbHkgKi9cbiAgICAgICAgdmFyIG1hdGNoZXMgPSBzdHJpbmdNYXRjaChkaXJ0eSwgL15bXFxyXFxuXFx0IF0rLyk7XG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzBdO1xuICAgICAgfVxuXG4gICAgICBpZiAoUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmIE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gUm9vdCBvZiBYSFRNTCBkb2MgbXVzdCBjb250YWluIHhtbG5zIGRlY2xhcmF0aW9uIChzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3hodG1sMS9ub3JtYXRpdmUuaHRtbCNzdHJpY3QpXG4gICAgICAgIGRpcnR5ID0gJzxodG1sIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPjxoZWFkPjwvaGVhZD48Ym9keT4nICsgZGlydHkgKyAnPC9ib2R5PjwvaHRtbD4nO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGlydHlQYXlsb2FkID0gdHJ1c3RlZFR5cGVzUG9saWN5ID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoZGlydHkpIDogZGlydHk7XG4gICAgICAvKlxuICAgICAgICogVXNlIHRoZSBET01QYXJzZXIgQVBJIGJ5IGRlZmF1bHQsIGZhbGxiYWNrIGxhdGVyIGlmIG5lZWRzIGJlXG4gICAgICAgKiBET01QYXJzZXIgbm90IHdvcmsgZm9yIHN2ZyB3aGVuIGhhcyBtdWx0aXBsZSByb290IGVsZW1lbnQuXG4gICAgICAgKi9cblxuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRpcnR5UGF5bG9hZCwgUEFSU0VSX01FRElBX1RZUEUpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuICAgICAgLyogVXNlIGNyZWF0ZUhUTUxEb2N1bWVudCBpbiBjYXNlIERPTVBhcnNlciBpcyBub3QgYXZhaWxhYmxlICovXG5cblxuICAgICAgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZG9jID0gaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQoTkFNRVNQQUNFLCAndGVtcGxhdGUnLCBudWxsKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MID0gSVNfRU1QVFlfSU5QVVQgPyBlbXB0eUhUTUwgOiBkaXJ0eVBheWxvYWQ7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHsvLyBTeW50YXggZXJyb3IgaWYgZGlydHlQYXlsb2FkIGlzIGludmFsaWQgeG1sXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGJvZHkgPSBkb2MuYm9keSB8fCBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgICBpZiAoZGlydHkgJiYgbGVhZGluZ1doaXRlc3BhY2UpIHtcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGVhZGluZ1doaXRlc3BhY2UpLCBib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG4gICAgICAvKiBXb3JrIG9uIHdob2xlIGRvY3VtZW50IG9yIGp1c3QgaXRzIGJvZHkgKi9cblxuXG4gICAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICByZXR1cm4gZ2V0RWxlbWVudHNCeVRhZ05hbWUuY2FsbChkb2MsIFdIT0xFX0RPQ1VNRU5UID8gJ2h0bWwnIDogJ2JvZHknKVswXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFdIT0xFX0RPQ1VNRU5UID8gZG9jLmRvY3VtZW50RWxlbWVudCA6IGJvZHk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBfY3JlYXRlSXRlcmF0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50fSByb290IGRvY3VtZW50L2ZyYWdtZW50IHRvIGNyZWF0ZSBpdGVyYXRvciBmb3JcbiAgICAgKiBAcmV0dXJuIHtJdGVyYXRvcn0gaXRlcmF0b3IgaW5zdGFuY2VcbiAgICAgKi9cblxuXG4gICAgdmFyIF9jcmVhdGVJdGVyYXRvciA9IGZ1bmN0aW9uIF9jcmVhdGVJdGVyYXRvcihyb290KSB7XG4gICAgICByZXR1cm4gY3JlYXRlTm9kZUl0ZXJhdG9yLmNhbGwocm9vdC5vd25lckRvY3VtZW50IHx8IHJvb3QsIHJvb3QsIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIG51bGwsIGZhbHNlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIF9pc0Nsb2JiZXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gZWxtIGVsZW1lbnQgdG8gY2hlY2sgZm9yIGNsb2JiZXJpbmcgYXR0YWNrc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgY2xvYmJlcmVkLCBmYWxzZSBpZiBzYWZlXG4gICAgICovXG5cblxuICAgIHZhciBfaXNDbG9iYmVyZWQgPSBmdW5jdGlvbiBfaXNDbG9iYmVyZWQoZWxtKSB7XG4gICAgICByZXR1cm4gZWxtIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50ICYmICh0eXBlb2YgZWxtLm5vZGVOYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnJlbW92ZUNoaWxkICE9PSAnZnVuY3Rpb24nIHx8ICEoZWxtLmF0dHJpYnV0ZXMgaW5zdGFuY2VvZiBOYW1lZE5vZGVNYXApIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uc2V0QXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0ubmFtZXNwYWNlVVJJICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLmluc2VydEJlZm9yZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLmhhc0NoaWxkTm9kZXMgIT09ICdmdW5jdGlvbicpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogX2lzTm9kZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gb2JqIG9iamVjdCB0byBjaGVjayB3aGV0aGVyIGl0J3MgYSBET00gbm9kZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaXMgb2JqZWN0IGlzIGEgRE9NIG5vZGVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9pc05vZGUgPSBmdW5jdGlvbiBfaXNOb2RlKG9iamVjdCkge1xuICAgICAgcmV0dXJuIF90eXBlb2YoTm9kZSkgPT09ICdvYmplY3QnID8gb2JqZWN0IGluc3RhbmNlb2YgTm9kZSA6IG9iamVjdCAmJiBfdHlwZW9mKG9iamVjdCkgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmplY3Qubm9kZVR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBvYmplY3Qubm9kZU5hbWUgPT09ICdzdHJpbmcnO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogX2V4ZWN1dGVIb29rXG4gICAgICogRXhlY3V0ZSB1c2VyIGNvbmZpZ3VyYWJsZSBob29rc1xuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50ICBOYW1lIG9mIHRoZSBob29rJ3MgZW50cnkgcG9pbnRcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSBub2RlIHRvIHdvcmsgb24gd2l0aCB0aGUgaG9va1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBhZGRpdGlvbmFsIGhvb2sgcGFyYW1ldGVyc1xuICAgICAqL1xuXG5cbiAgICB2YXIgX2V4ZWN1dGVIb29rID0gZnVuY3Rpb24gX2V4ZWN1dGVIb29rKGVudHJ5UG9pbnQsIGN1cnJlbnROb2RlLCBkYXRhKSB7XG4gICAgICBpZiAoIWhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXJyYXlGb3JFYWNoKGhvb2tzW2VudHJ5UG9pbnRdLCBmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplRWxlbWVudHNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgdGV4dENvbnRlbnRcbiAgICAgKiBAcHJvdGVjdCByZW1vdmVDaGlsZFxuICAgICAqXG4gICAgICogQHBhcmFtICAge05vZGV9IGN1cnJlbnROb2RlIHRvIGNoZWNrIGZvciBwZXJtaXNzaW9uIHRvIGV4aXN0XG4gICAgICogQHJldHVybiAge0Jvb2xlYW59IHRydWUgaWYgbm9kZSB3YXMga2lsbGVkLCBmYWxzZSBpZiBsZWZ0IGFsaXZlXG4gICAgICovXG5cblxuICAgIHZhciBfc2FuaXRpemVFbGVtZW50cyA9IGZ1bmN0aW9uIF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSB7XG4gICAgICB2YXIgY29udGVudDtcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cblxuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZUVsZW1lbnRzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cblxuXG4gICAgICBpZiAoX2lzQ2xvYmJlcmVkKGN1cnJlbnROb2RlKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgLyogQ2hlY2sgaWYgdGFnbmFtZSBjb250YWlucyBVbmljb2RlICovXG5cblxuICAgICAgaWYgKHJlZ0V4cFRlc3QoL1tcXHUwMDgwLVxcdUZGRkZdLywgY3VycmVudE5vZGUubm9kZU5hbWUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICAvKiBOb3cgbGV0J3MgY2hlY2sgdGhlIGVsZW1lbnQncyB0eXBlIGFuZCBuYW1lICovXG5cblxuICAgICAgdmFyIHRhZ05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhjdXJyZW50Tm9kZS5ub2RlTmFtZSk7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG5cbiAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplRWxlbWVudCcsIGN1cnJlbnROb2RlLCB7XG4gICAgICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgICAgIGFsbG93ZWRUYWdzOiBBTExPV0VEX1RBR1NcbiAgICAgIH0pO1xuICAgICAgLyogRGV0ZWN0IG1YU1MgYXR0ZW1wdHMgYWJ1c2luZyBuYW1lc3BhY2UgY29uZnVzaW9uICovXG5cblxuICAgICAgaWYgKGN1cnJlbnROb2RlLmhhc0NoaWxkTm9kZXMoKSAmJiAhX2lzTm9kZShjdXJyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkgJiYgKCFfaXNOb2RlKGN1cnJlbnROb2RlLmNvbnRlbnQpIHx8ICFfaXNOb2RlKGN1cnJlbnROb2RlLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQpKSAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8qIE1pdGlnYXRlIGEgcHJvYmxlbSB3aXRoIHRlbXBsYXRlcyBpbnNpZGUgc2VsZWN0ICovXG5cblxuICAgICAgaWYgKHRhZ05hbWUgPT09ICdzZWxlY3QnICYmIHJlZ0V4cFRlc3QoLzx0ZW1wbGF0ZS9pLCBjdXJyZW50Tm9kZS5pbm5lckhUTUwpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICAvKiBSZW1vdmUgZWxlbWVudCBpZiBhbnl0aGluZyBmb3JiaWRzIGl0cyBwcmVzZW5jZSAqL1xuXG5cbiAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XG4gICAgICAgIC8qIENoZWNrIGlmIHdlIGhhdmUgYSBjdXN0b20gZWxlbWVudCB0byBoYW5kbGUgKi9cbiAgICAgICAgaWYgKCFGT1JCSURfVEFHU1t0YWdOYW1lXSAmJiBfYmFzaWNDdXN0b21FbGVtZW50VGVzdCh0YWdOYW1lKSkge1xuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHRhZ05hbWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh0YWdOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qIEtlZXAgY29udGVudCBleGNlcHQgZm9yIGJhZC1saXN0ZWQgZWxlbWVudHMgKi9cblxuXG4gICAgICAgIGlmIChLRUVQX0NPTlRFTlQgJiYgIUZPUkJJRF9DT05URU5UU1t0YWdOYW1lXSkge1xuICAgICAgICAgIHZhciBwYXJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShjdXJyZW50Tm9kZSkgfHwgY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICB2YXIgY2hpbGROb2RlcyA9IGdldENoaWxkTm9kZXMoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLmNoaWxkTm9kZXM7XG5cbiAgICAgICAgICBpZiAoY2hpbGROb2RlcyAmJiBwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRDb3VudCA9IGNoaWxkTm9kZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gY2hpbGRDb3VudCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lTm9kZShjaGlsZE5vZGVzW2ldLCB0cnVlKSwgZ2V0TmV4dFNpYmxpbmcoY3VycmVudE5vZGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgLyogQ2hlY2sgd2hldGhlciBlbGVtZW50IGhhcyBhIHZhbGlkIG5hbWVzcGFjZSAqL1xuXG5cbiAgICAgIGlmIChjdXJyZW50Tm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgIV9jaGVja1ZhbGlkTmFtZXNwYWNlKGN1cnJlbnROb2RlKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHRhZ05hbWUgPT09ICdub3NjcmlwdCcgfHwgdGFnTmFtZSA9PT0gJ25vZW1iZWQnKSAmJiByZWdFeHBUZXN0KC88XFwvbm8oc2NyaXB0fGVtYmVkKS9pLCBjdXJyZW50Tm9kZS5pbm5lckhUTUwpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICAvKiBTYW5pdGl6ZSBlbGVtZW50IGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuXG5cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLyogR2V0IHRoZSBlbGVtZW50J3MgdGV4dCBjb250ZW50ICovXG4gICAgICAgIGNvbnRlbnQgPSBjdXJyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICAgICAgY29udGVudCA9IHN0cmluZ1JlcGxhY2UoY29udGVudCwgTVVTVEFDSEVfRVhQUiQxLCAnICcpO1xuICAgICAgICBjb250ZW50ID0gc3RyaW5nUmVwbGFjZShjb250ZW50LCBFUkJfRVhQUiQxLCAnICcpO1xuICAgICAgICBjb250ZW50ID0gc3RyaW5nUmVwbGFjZShjb250ZW50LCBUTVBMSVRfRVhQUiQxLCAnICcpO1xuXG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS50ZXh0Q29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgICAgZWxlbWVudDogY3VycmVudE5vZGUuY2xvbmVOb2RlKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cblxuXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogX2lzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNUYWcgTG93ZXJjYXNlIHRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjTmFtZSBMb3dlcmNhc2UgYXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuXG5cbiAgICB2YXIgX2lzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkge1xuICAgICAgLyogTWFrZSBzdXJlIGF0dHJpYnV0ZSBjYW5ub3QgY2xvYmJlciAqL1xuICAgICAgaWYgKFNBTklUSVpFX0RPTSAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSAmJiAodmFsdWUgaW4gZG9jdW1lbnQgfHwgdmFsdWUgaW4gZm9ybUVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8qIEFsbG93IHZhbGlkIGRhdGEtKiBhdHRyaWJ1dGVzOiBBdCBsZWFzdCBvbmUgY2hhcmFjdGVyIGFmdGVyIFwiLVwiXG4gICAgICAgICAgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2RvbS5odG1sI2VtYmVkZGluZy1jdXN0b20tbm9uLXZpc2libGUtZGF0YS13aXRoLXRoZS1kYXRhLSotYXR0cmlidXRlcylcbiAgICAgICAgICBYTUwtY29tcGF0aWJsZSAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCN4bWwtY29tcGF0aWJsZSBhbmQgaHR0cDovL3d3dy53My5vcmcvVFIveG1sLyNkMGU4MDQpXG4gICAgICAgICAgV2UgZG9uJ3QgbmVlZCB0byBjaGVjayB0aGUgdmFsdWU7IGl0J3MgYWx3YXlzIFVSSSBzYWZlLiAqL1xuXG5cbiAgICAgIGlmIChBTExPV19EQVRBX0FUVFIgJiYgIUZPUkJJRF9BVFRSW2xjTmFtZV0gJiYgcmVnRXhwVGVzdChEQVRBX0FUVFIkMSwgbGNOYW1lKSkgOyBlbHNlIGlmIChBTExPV19BUklBX0FUVFIgJiYgcmVnRXhwVGVzdChBUklBX0FUVFIkMSwgbGNOYW1lKSkgOyBlbHNlIGlmICghQUxMT1dFRF9BVFRSW2xjTmFtZV0gfHwgRk9SQklEX0FUVFJbbGNOYW1lXSkge1xuICAgICAgICBpZiAoIC8vIEZpcnN0IGNvbmRpdGlvbiBkb2VzIGEgdmVyeSBiYXNpYyBjaGVjayBpZiBhKSBpdCdzIGJhc2ljYWxseSBhIHZhbGlkIGN1c3RvbSBlbGVtZW50IHRhZ25hbWUgQU5EXG4gICAgICAgIC8vIGIpIGlmIHRoZSB0YWdOYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrXG4gICAgICAgIC8vIGFuZCBjKSBpZiB0aGUgYXR0cmlidXRlIG5hbWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2tcbiAgICAgICAgX2Jhc2ljQ3VzdG9tRWxlbWVudFRlc3QobGNUYWcpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIGxjVGFnKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sobGNUYWcpKSAmJiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrLCBsY05hbWUpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayhsY05hbWUpKSB8fCAvLyBBbHRlcm5hdGl2ZSwgc2Vjb25kIGNvbmRpdGlvbiBjaGVja3MgaWYgaXQncyBhbiBgaXNgLWF0dHJpYnV0ZSwgQU5EXG4gICAgICAgIC8vIHRoZSB2YWx1ZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICBsY05hbWUgPT09ICdpcycgJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHZhbHVlKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodmFsdWUpKSkgOyBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXG5cbiAgICAgIH0gZWxzZSBpZiAoVVJJX1NBRkVfQVRUUklCVVRFU1tsY05hbWVdKSA7IGVsc2UgaWYgKHJlZ0V4cFRlc3QoSVNfQUxMT1dFRF9VUkkkMSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFJDEsICcnKSkpIDsgZWxzZSBpZiAoKGxjTmFtZSA9PT0gJ3NyYycgfHwgbGNOYW1lID09PSAneGxpbms6aHJlZicgfHwgbGNOYW1lID09PSAnaHJlZicpICYmIGxjVGFnICE9PSAnc2NyaXB0JyAmJiBzdHJpbmdJbmRleE9mKHZhbHVlLCAnZGF0YTonKSA9PT0gMCAmJiBEQVRBX1VSSV9UQUdTW2xjVGFnXSkgOyBlbHNlIGlmIChBTExPV19VTktOT1dOX1BST1RPQ09MUyAmJiAhcmVnRXhwVGVzdChJU19TQ1JJUFRfT1JfREFUQSQxLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UkMSwgJycpKSkgOyBlbHNlIGlmICghdmFsdWUpIDsgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBfYmFzaWNDdXN0b21FbGVtZW50Q2hlY2tcbiAgICAgKiBjaGVja3MgaWYgYXQgbGVhc3Qgb25lIGRhc2ggaXMgaW5jbHVkZWQgaW4gdGFnTmFtZSwgYW5kIGl0J3Mgbm90IHRoZSBmaXJzdCBjaGFyXG4gICAgICogZm9yIG1vcmUgc29waGlzdGljYXRlZCBjaGVja2luZyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy92YWxpZGF0ZS1lbGVtZW50LW5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBuYW1lIG9mIHRoZSB0YWcgb2YgdGhlIG5vZGUgdG8gc2FuaXRpemVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9iYXNpY0N1c3RvbUVsZW1lbnRUZXN0ID0gZnVuY3Rpb24gX2Jhc2ljQ3VzdG9tRWxlbWVudFRlc3QodGFnTmFtZSkge1xuICAgICAgcmV0dXJuIHRhZ05hbWUuaW5kZXhPZignLScpID4gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZUF0dHJpYnV0ZXNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0IGF0dHJpYnV0ZXNcbiAgICAgKiBAcHJvdGVjdCBub2RlTmFtZVxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUF0dHJpYnV0ZVxuICAgICAqIEBwcm90ZWN0IHNldEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gc2FuaXRpemVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9zYW5pdGl6ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKSB7XG4gICAgICB2YXIgYXR0cjtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhciBsY05hbWU7XG4gICAgICB2YXIgbDtcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cblxuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZUF0dHJpYnV0ZXMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG5cbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gY3VycmVudE5vZGUuYXR0cmlidXRlcztcbiAgICAgIC8qIENoZWNrIGlmIHdlIGhhdmUgYXR0cmlidXRlczsgaWYgbm90IHdlIG1pZ2h0IGhhdmUgYSB0ZXh0IG5vZGUgKi9cblxuICAgICAgaWYgKCFhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGhvb2tFdmVudCA9IHtcbiAgICAgICAgYXR0ck5hbWU6ICcnLFxuICAgICAgICBhdHRyVmFsdWU6ICcnLFxuICAgICAgICBrZWVwQXR0cjogdHJ1ZSxcbiAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXM6IEFMTE9XRURfQVRUUlxuICAgICAgfTtcbiAgICAgIGwgPSBhdHRyaWJ1dGVzLmxlbmd0aDtcbiAgICAgIC8qIEdvIGJhY2t3YXJkcyBvdmVyIGFsbCBhdHRyaWJ1dGVzOyBzYWZlbHkgcmVtb3ZlIGJhZCBvbmVzICovXG5cbiAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgYXR0ciA9IGF0dHJpYnV0ZXNbbF07XG4gICAgICAgIHZhciBfYXR0ciA9IGF0dHIsXG4gICAgICAgICAgICBuYW1lID0gX2F0dHIubmFtZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZVVSSSA9IF9hdHRyLm5hbWVzcGFjZVVSSTtcbiAgICAgICAgdmFsdWUgPSBuYW1lID09PSAndmFsdWUnID8gYXR0ci52YWx1ZSA6IHN0cmluZ1RyaW0oYXR0ci52YWx1ZSk7XG4gICAgICAgIGxjTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKG5hbWUpO1xuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG5cbiAgICAgICAgaG9va0V2ZW50LmF0dHJOYW1lID0gbGNOYW1lO1xuICAgICAgICBob29rRXZlbnQuYXR0clZhbHVlID0gdmFsdWU7XG4gICAgICAgIGhvb2tFdmVudC5rZWVwQXR0ciA9IHRydWU7XG4gICAgICAgIGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyID0gdW5kZWZpbmVkOyAvLyBBbGxvd3MgZGV2ZWxvcGVycyB0byBzZWUgdGhpcyBpcyBhIHByb3BlcnR5IHRoZXkgY2FuIHNldFxuXG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplQXR0cmlidXRlJywgY3VycmVudE5vZGUsIGhvb2tFdmVudCk7XG5cbiAgICAgICAgdmFsdWUgPSBob29rRXZlbnQuYXR0clZhbHVlO1xuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cblxuICAgICAgICBpZiAoaG9va0V2ZW50LmZvcmNlS2VlcEF0dHIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBSZW1vdmUgYXR0cmlidXRlICovXG5cblxuICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXG5cblxuICAgICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qIFdvcmsgYXJvdW5kIGEgc2VjdXJpdHkgaXNzdWUgaW4galF1ZXJ5IDMuMCAqL1xuXG5cbiAgICAgICAgaWYgKCFBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgJiYgcmVnRXhwVGVzdCgvXFwvPi9pLCB2YWx1ZSkpIHtcbiAgICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcblxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qIFNhbml0aXplIGF0dHJpYnV0ZSBjb250ZW50IHRvIGJlIHRlbXBsYXRlLXNhZmUgKi9cblxuXG4gICAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgICB2YWx1ZSA9IHN0cmluZ1JlcGxhY2UodmFsdWUsIE1VU1RBQ0hFX0VYUFIkMSwgJyAnKTtcbiAgICAgICAgICB2YWx1ZSA9IHN0cmluZ1JlcGxhY2UodmFsdWUsIEVSQl9FWFBSJDEsICcgJyk7XG4gICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBUTVBMSVRfRVhQUiQxLCAnICcpO1xuICAgICAgICB9XG4gICAgICAgIC8qIElzIGB2YWx1ZWAgdmFsaWQgZm9yIHRoaXMgYXR0cmlidXRlPyAqL1xuXG5cbiAgICAgICAgdmFyIGxjVGFnID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgICAgIGlmICghX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogRnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIHZpYSBuYW1lc3BhY2UgaXNvbGF0aW9uLFxuICAgICAgICAgKiBQcmVmaXggaWQgYW5kIG5hbWUgYXR0cmlidXRlcyB3aXRoIGB1c2VyLWNvbnRlbnQtYFxuICAgICAgICAgKi9cblxuXG4gICAgICAgIGlmIChTQU5JVElaRV9OQU1FRF9QUk9QUyAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSkge1xuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhpcyB2YWx1ZVxuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpOyAvLyBQcmVmaXggdGhlIHZhbHVlIGFuZCBsYXRlciByZS1jcmVhdGUgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBzYW5pdGl6ZWQgdmFsdWVcblxuXG4gICAgICAgICAgdmFsdWUgPSBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggKyB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBIYW5kbGUgYXR0cmlidXRlcyB0aGF0IHJlcXVpcmUgVHJ1c3RlZCBUeXBlcyAqL1xuXG5cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAmJiBfdHlwZW9mKHRydXN0ZWRUeXBlcykgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIDsgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRydXN0ZWRUeXBlcy5nZXRBdHRyaWJ1dGVUeXBlKGxjVGFnLCBsY05hbWUpKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ1RydXN0ZWRIVE1MJzpcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkU2NyaXB0VVJMJzpcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVTY3JpcHRVUkwodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKiBIYW5kbGUgaW52YWxpZCBkYXRhLSogYXR0cmlidXRlIHNldCBieSB0cnktY2F0Y2hpbmcgaXQgKi9cblxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVVJJLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIEZhbGxiYWNrIHRvIHNldEF0dHJpYnV0ZSgpIGZvciBicm93c2VyLXVucmVjb2duaXplZCBuYW1lc3BhY2VzIGUuZy4gXCJ4LXNjaGVtYVwiLiAqL1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhcnJheVBvcChET01QdXJpZnkucmVtb3ZlZCk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICB9XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG5cblxuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZVNoYWRvd0RPTVxuICAgICAqXG4gICAgICogQHBhcmFtICB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ21lbnQgdG8gaXRlcmF0ZSBvdmVyIHJlY3Vyc2l2ZWx5XG4gICAgICovXG5cblxuICAgIHZhciBfc2FuaXRpemVTaGFkb3dET00gPSBmdW5jdGlvbiBfc2FuaXRpemVTaGFkb3dET00oZnJhZ21lbnQpIHtcbiAgICAgIHZhciBzaGFkb3dOb2RlO1xuXG4gICAgICB2YXIgc2hhZG93SXRlcmF0b3IgPSBfY3JlYXRlSXRlcmF0b3IoZnJhZ21lbnQpO1xuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuXG5cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG5cbiAgICAgIHdoaWxlIChzaGFkb3dOb2RlID0gc2hhZG93SXRlcmF0b3IubmV4dE5vZGUoKSkge1xuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplU2hhZG93Tm9kZScsIHNoYWRvd05vZGUsIG51bGwpO1xuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuXG5cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKHNoYWRvd05vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogRGVlcCBzaGFkb3cgRE9NIGRldGVjdGVkICovXG5cblxuICAgICAgICBpZiAoc2hhZG93Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShzaGFkb3dOb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuXG5cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhzaGFkb3dOb2RlKTtcbiAgICAgIH1cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cblxuXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTYW5pdGl6ZVxuICAgICAqIFB1YmxpYyBtZXRob2QgcHJvdmlkaW5nIGNvcmUgc2FuaXRhdGlvbiBmdW5jdGlvbmFsaXR5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOb2RlfSBkaXJ0eSBzdHJpbmcgb3IgRE9NIG5vZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuXG5cbiAgICBET01QdXJpZnkuc2FuaXRpemUgPSBmdW5jdGlvbiAoZGlydHkpIHtcbiAgICAgIHZhciBjZmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgdmFyIGJvZHk7XG4gICAgICB2YXIgaW1wb3J0ZWROb2RlO1xuICAgICAgdmFyIGN1cnJlbnROb2RlO1xuICAgICAgdmFyIG9sZE5vZGU7XG4gICAgICB2YXIgcmV0dXJuTm9kZTtcbiAgICAgIC8qIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgc3RyaW5nIHRvIHNhbml0aXplLlxuICAgICAgICBETyBOT1QgcmV0dXJuIGVhcmx5LCBhcyB0aGlzIHdpbGwgcmV0dXJuIHRoZSB3cm9uZyB0eXBlIGlmXG4gICAgICAgIHRoZSB1c2VyIGhhcyByZXF1ZXN0ZWQgYSBET00gb2JqZWN0IHJhdGhlciB0aGFuIGEgc3RyaW5nICovXG5cbiAgICAgIElTX0VNUFRZX0lOUFVUID0gIWRpcnR5O1xuXG4gICAgICBpZiAoSVNfRU1QVFlfSU5QVVQpIHtcbiAgICAgICAgZGlydHkgPSAnPCEtLT4nO1xuICAgICAgfVxuICAgICAgLyogU3RyaW5naWZ5LCBpbiBjYXNlIGRpcnR5IGlzIGFuIG9iamVjdCAqL1xuXG5cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnICYmICFfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVnYXRlZC1jb25kaXRpb25cbiAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgndG9TdHJpbmcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXJ0eSA9IGRpcnR5LnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdkaXJ0eSBpcyBub3QgYSBzdHJpbmcsIGFib3J0aW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvKiBDaGVjayB3ZSBjYW4gcnVuLiBPdGhlcndpc2UgZmFsbCBiYWNrIG9yIGlnbm9yZSAqL1xuXG5cbiAgICAgIGlmICghRE9NUHVyaWZ5LmlzU3VwcG9ydGVkKSB7XG4gICAgICAgIGlmIChfdHlwZW9mKHdpbmRvdy50b1N0YXRpY0hUTUwpID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygd2luZG93LnRvU3RhdGljSFRNTCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZGlydHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnRvU3RhdGljSFRNTChkaXJ0eSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9pc05vZGUoZGlydHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnRvU3RhdGljSFRNTChkaXJ0eS5vdXRlckhUTUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICAgIH1cbiAgICAgIC8qIEFzc2lnbiBjb25maWcgdmFycyAqL1xuXG5cbiAgICAgIGlmICghU0VUX0NPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIH1cbiAgICAgIC8qIENsZWFuIHVwIHJlbW92ZWQgZWxlbWVudHMgKi9cblxuXG4gICAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuICAgICAgLyogQ2hlY2sgaWYgZGlydHkgaXMgY29ycmVjdGx5IHR5cGVkIGZvciBJTl9QTEFDRSAqL1xuXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBJTl9QTEFDRSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoSU5fUExBQ0UpIHtcbiAgICAgICAgLyogRG8gc29tZSBlYXJseSBwcmUtc2FuaXRpemF0aW9uIHRvIGF2b2lkIHVuc2FmZSByb290IG5vZGVzICovXG4gICAgICAgIGlmIChkaXJ0eS5ub2RlTmFtZSkge1xuICAgICAgICAgIHZhciB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZGlydHkubm9kZU5hbWUpO1xuXG4gICAgICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcbiAgICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgncm9vdCBub2RlIGlzIGZvcmJpZGRlbiBhbmQgY2Fubm90IGJlIHNhbml0aXplZCBpbi1wbGFjZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkaXJ0eSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgLyogSWYgZGlydHkgaXMgYSBET00gZWxlbWVudCwgYXBwZW5kIHRvIGFuIGVtcHR5IGRvY3VtZW50IHRvIGF2b2lkXG4gICAgICAgICAgIGVsZW1lbnRzIGJlaW5nIHN0cmlwcGVkIGJ5IHRoZSBwYXJzZXIgKi9cbiAgICAgICAgYm9keSA9IF9pbml0RG9jdW1lbnQoJzwhLS0tLT4nKTtcbiAgICAgICAgaW1wb3J0ZWROb2RlID0gYm9keS5vd25lckRvY3VtZW50LmltcG9ydE5vZGUoZGlydHksIHRydWUpO1xuXG4gICAgICAgIGlmIChpbXBvcnRlZE5vZGUubm9kZVR5cGUgPT09IDEgJiYgaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAvKiBOb2RlIGlzIGFscmVhZHkgYSBib2R5LCB1c2UgYXMgaXMgKi9cbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChpbXBvcnRlZE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBFeGl0IGRpcmVjdGx5IGlmIHdlIGhhdmUgbm90aGluZyB0byBkbyAqL1xuICAgICAgICBpZiAoIVJFVFVSTl9ET00gJiYgIVNBRkVfRk9SX1RFTVBMQVRFUyAmJiAhV0hPTEVfRE9DVU1FTlQgJiYgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICAgIGRpcnR5LmluZGV4T2YoJzwnKSA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgICAgfVxuICAgICAgICAvKiBJbml0aWFsaXplIHRoZSBkb2N1bWVudCB0byB3b3JrIG9uICovXG5cblxuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudChkaXJ0eSk7XG4gICAgICAgIC8qIENoZWNrIHdlIGhhdmUgYSBET00gbm9kZSBmcm9tIHRoZSBkYXRhICovXG5cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogUkVUVVJOX1RSVVNURURfVFlQRSA/IGVtcHR5SFRNTCA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvKiBSZW1vdmUgZmlyc3QgZWxlbWVudCBub2RlIChvdXJzKSBpZiBGT1JDRV9CT0RZIGlzIHNldCAqL1xuXG5cbiAgICAgIGlmIChib2R5ICYmIEZPUkNFX0JPRFkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuXG5cbiAgICAgIHZhciBub2RlSXRlcmF0b3IgPSBfY3JlYXRlSXRlcmF0b3IoSU5fUExBQ0UgPyBkaXJ0eSA6IGJvZHkpO1xuICAgICAgLyogTm93IHN0YXJ0IGl0ZXJhdGluZyBvdmVyIHRoZSBjcmVhdGVkIGRvY3VtZW50ICovXG5cblxuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogRml4IElFJ3Mgc3RyYW5nZSBiZWhhdmlvciB3aXRoIG1hbmlwdWxhdGVkIHRleHROb2RlcyAjODkgKi9cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzICYmIGN1cnJlbnROb2RlID09PSBvbGROb2RlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cblxuXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBTaGFkb3cgRE9NIGRldGVjdGVkLCBzYW5pdGl6ZSBpdCAqL1xuXG5cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKGN1cnJlbnROb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuXG5cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgb2xkTm9kZSA9IGN1cnJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICBvbGROb2RlID0gbnVsbDtcbiAgICAgIC8qIElmIHdlIHNhbml0aXplZCBgZGlydHlgIGluLXBsYWNlLCByZXR1cm4gaXQuICovXG5cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG4gICAgICAvKiBSZXR1cm4gc2FuaXRpemVkIHN0cmluZyBvciBET00gKi9cblxuXG4gICAgICBpZiAoUkVUVVJOX0RPTSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBjcmVhdGVEb2N1bWVudEZyYWdtZW50LmNhbGwoYm9keS5vd25lckRvY3VtZW50KTtcblxuICAgICAgICAgIHdoaWxlIChib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcbiAgICAgICAgICAgIHJldHVybk5vZGUuYXBwZW5kQ2hpbGQoYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGJvZHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3QgfHwgQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3Rtb2QpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgQWRvcHROb2RlKCkgaXMgbm90IHVzZWQgYmVjYXVzZSBpbnRlcm5hbCBzdGF0ZSBpcyBub3QgcmVzZXRcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxuICAgICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgICAgVGhlIHN0YXRlIHRoYXQgaXMgY2xvbmVkIGJ5IGltcG9ydE5vZGUoKSBpcyBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cbiAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybk5vZGUgPSBpbXBvcnROb2RlLmNhbGwob3JpZ2luYWxEb2N1bWVudCwgcmV0dXJuTm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuTm9kZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlcmlhbGl6ZWRIVE1MID0gV0hPTEVfRE9DVU1FTlQgPyBib2R5Lm91dGVySFRNTCA6IGJvZHkuaW5uZXJIVE1MO1xuICAgICAgLyogU2VyaWFsaXplIGRvY3R5cGUgaWYgYWxsb3dlZCAqL1xuXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQgJiYgQUxMT1dFRF9UQUdTWychZG9jdHlwZSddICYmIGJvZHkub3duZXJEb2N1bWVudCAmJiBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZSAmJiBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lICYmIHJlZ0V4cFRlc3QoRE9DVFlQRV9OQU1FLCBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lKSkge1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9ICc8IURPQ1RZUEUgJyArIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgKyAnPlxcbicgKyBzZXJpYWxpemVkSFRNTDtcbiAgICAgIH1cbiAgICAgIC8qIFNhbml0aXplIGZpbmFsIHN0cmluZyB0ZW1wbGF0ZS1zYWZlICovXG5cblxuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIE1VU1RBQ0hFX0VYUFIkMSwgJyAnKTtcbiAgICAgICAgc2VyaWFsaXplZEhUTUwgPSBzdHJpbmdSZXBsYWNlKHNlcmlhbGl6ZWRIVE1MLCBFUkJfRVhQUiQxLCAnICcpO1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIFRNUExJVF9FWFBSJDEsICcgJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHNlcmlhbGl6ZWRIVE1MKSA6IHNlcmlhbGl6ZWRIVE1MO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBzZXQgdGhlIGNvbmZpZ3VyYXRpb24gb25jZVxuICAgICAqIHNldENvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuXG5cbiAgICBET01QdXJpZnkuc2V0Q29uZmlnID0gZnVuY3Rpb24gKGNmZykge1xuICAgICAgX3BhcnNlQ29uZmlnKGNmZyk7XG5cbiAgICAgIFNFVF9DT05GSUcgPSB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgdGhlIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBjbGVhckNvbmZpZ1xuICAgICAqXG4gICAgICovXG5cblxuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIENPTkZJRyA9IG51bGw7XG4gICAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNoZWNrIGlmIGFuIGF0dHJpYnV0ZSB2YWx1ZSBpcyB2YWxpZC5cbiAgICAgKiBVc2VzIGxhc3Qgc2V0IGNvbmZpZywgaWYgYW55LiBPdGhlcndpc2UsIHVzZXMgY29uZmlnIGRlZmF1bHRzLlxuICAgICAqIGlzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdGFnIFRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGF0dHIgQXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQuIE90aGVyd2lzZSwgcmV0dXJucyBmYWxzZS5cbiAgICAgKi9cblxuXG4gICAgRE9NUHVyaWZ5LmlzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAodGFnLCBhdHRyLCB2YWx1ZSkge1xuICAgICAgLyogSW5pdGlhbGl6ZSBzaGFyZWQgY29uZmlnIHZhcnMgaWYgbmVjZXNzYXJ5LiAqL1xuICAgICAgaWYgKCFDT05GSUcpIHtcbiAgICAgICAgX3BhcnNlQ29uZmlnKHt9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxjVGFnID0gdHJhbnNmb3JtQ2FzZUZ1bmModGFnKTtcbiAgICAgIHZhciBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhhdHRyKTtcbiAgICAgIHJldHVybiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byBhZGQgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gYWRkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va0Z1bmN0aW9uIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKi9cblxuXG4gICAgRE9NUHVyaWZ5LmFkZEhvb2sgPSBmdW5jdGlvbiAoZW50cnlQb2ludCwgaG9va0Z1bmN0aW9uKSB7XG4gICAgICBpZiAodHlwZW9mIGhvb2tGdW5jdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gaG9va3NbZW50cnlQb2ludF0gfHwgW107XG4gICAgICBhcnJheVB1c2goaG9va3NbZW50cnlQb2ludF0sIGhvb2tGdW5jdGlvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYSBET01QdXJpZnkgaG9vayBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICAgKiAocG9wcyBpdCBmcm9tIHRoZSBzdGFjayBvZiBob29rcyBpZiBtb3JlIGFyZSBwcmVzZW50KVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSByZW1vdmVkKHBvcHBlZCkgaG9va1xuICAgICAqL1xuXG5cbiAgICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuIGFycmF5UG9wKGhvb2tzW2VudHJ5UG9pbnRdKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZUhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rcyBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2tzIHRvIHJlbW92ZVxuICAgICAqL1xuXG5cbiAgICBET01QdXJpZnkucmVtb3ZlSG9va3MgPSBmdW5jdGlvbiAoZW50cnlQb2ludCkge1xuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gW107XG4gICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVBbGxIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3NcbiAgICAgKlxuICAgICAqL1xuXG5cbiAgICBET01QdXJpZnkucmVtb3ZlQWxsSG9va3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBob29rcyA9IHt9O1xuICAgIH07XG5cbiAgICByZXR1cm4gRE9NUHVyaWZ5O1xuICB9XG5cbiAgdmFyIHB1cmlmeSA9IGNyZWF0ZURPTVB1cmlmeSgpO1xuXG4gIHJldHVybiBwdXJpZnk7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1cmlmeS5qcy5tYXBcbiIsImltcG9ydCBUZXh0Q2FjaGUgZnJvbSAnLi90ZXh0Y2FjaGUnO1xuaW1wb3J0IFNlcnZpY2VQcm92aWRlciBmcm9tICcuL3NlcnZpY2Vwcm92aWRlcic7XG5pbXBvcnQgTWF0aE1MIGZyb20gJy4vbWF0aG1sJztcbmltcG9ydCBTdHJpbmdNYW5hZ2VyIGZyb20gJy4vc3RyaW5nbWFuYWdlcic7XG5cbi8qKlxuICogQGNsYXNzZGVzY1xuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIE1hdGhUeXBlIGFjY2Vzc2libGUgY2xhc3MuIENvbnZlcnRzIE1hdGhNTCB0byBhY2Nlc3NpYmxlIHRleHQgYW5kIG1hbmFnZXNcbiAqIHRoZSBhc3NvY2lhdGVkIGNsaWVudC1zaWRlIGNhY2hlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2Nlc3NpYmlsaXR5IHtcbiAgLyoqXG4gICogU3RhdGljIHByb3BlcnR5LlxuICAqIEFjY2Vzc2liaWxpdHkgY2FjaGUsIGVhY2ggZW50cnkgY29udGFpbnMgYSBNYXRoTUwgYW5kIGl0cyBjb3JyZXNwb25kZW50IGFjY2Vzc2liaWxpdHkgdGV4dC5cbiAgKiBAdHlwZSB7VGV4dENhY2hlfVxuICAqL1xuICBzdGF0aWMgZ2V0IGNhY2hlKCkge1xuICAgIHJldHVybiBBY2Nlc3NpYmlsaXR5Ll9jYWNoZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgcHJvcGVydHkgc2V0dGVyLlxuICAgKiBTZXQgYWNjZXNzaWJpbGl0eSBjYWNoZS5cbiAgICogQHBhcmFtIHtUZXh0Q2FoZX0gdmFsdWUgLSBUaGUgcHJvcGVydHkgdmFsdWUuXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIHN0YXRpYyBzZXQgY2FjaGUodmFsdWUpIHtcbiAgICBBY2Nlc3NpYmlsaXR5Ll9jYWNoZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIE1hdGhNTCBzdHJpbmdzIHRvIGl0cyBhY2Nlc3NpYmxlIHRleHQgcmVwcmVzZW50YXRpb24uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXRoTUwgLSBNYXRoTUwgdG8gYmUgY29udmVydGVkIHRvIGFjY2Vzc2libGUgdGV4dC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtsYW5ndWFnZV0gLSBMYW5ndWFnZSBvZiB0aGUgYWNjZXNzaWJsZSB0ZXh0LiAnZW4nIGJ5IGRlZmF1bHQuXG4gICAqIEBwYXJhbSB7QXJyYXkuPFN0cmluZz59IFtkYXRhXSAtIFBhcmFtZXRlcnMgdG8gc2VuZCB0byBtYXRobWwyYWNjZXNzaWJsZSBzZXJ2aWNlLlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IEFjY2Vzc2liaWxpdHkgdGV4dC5cbiAgICovXG4gIHN0YXRpYyBtYXRoTUxUb0FjY2Vzc2libGUobWF0aE1MLCBsYW5ndWFnZSwgZGF0YSkge1xuICAgIGlmICh0eXBlb2YgKGxhbmd1YWdlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGxhbmd1YWdlID0gJ2VuJztcbiAgICB9XG4gICAgLy8gQ2hlY2sgTWF0aE1MIGNsYXNzLiBJZiB0aGUgY2xhc3MgaXMgY2hlbWlzdHJ5LFxuICAgIC8vIHdlIGFkZCBjaGVtaXN0cnkgdG8gZGF0YSB0byBmb3JjZSBhY2Nlc3NpYmlsaXR5IHNlcnZpY2VcbiAgICAvLyB0byBsb2FkIGNoZW1pc3RyeSBncmFtbWFyLlxuICAgIGlmIChNYXRoTUwuY29udGFpbkNsYXNzKG1hdGhNTCwgJ3dyc19jaGVtaXN0cnknKSkge1xuICAgICAgZGF0YS5tb2RlID0gJ2NoZW1pc3RyeSc7XG4gICAgfVxuICAgIC8vIElnbm9yZSBhY2Nlc2liaWxpdHkgc3R5bGVzXG4gICAgZGF0YS5pZ25vcmVTdHlsZXMgPSB0cnVlO1xuICAgIGxldCBhY2Nlc3NpYmxlVGV4dCA9ICcnO1xuXG4gICAgaWYgKEFjY2Vzc2liaWxpdHkuY2FjaGUuZ2V0KG1hdGhNTCkpIHtcbiAgICAgIGFjY2Vzc2libGVUZXh0ID0gQWNjZXNzaWJpbGl0eS5jYWNoZS5nZXQobWF0aE1MKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5zZXJ2aWNlID0gJ21hdGhtbDJhY2Nlc3NpYmxlJztcbiAgICAgIGRhdGEubGFuZyA9IGxhbmd1YWdlO1xuICAgICAgY29uc3QgYWNjZXNzaWJsZUpzb25SZXNwb25zZSA9IEpTT04ucGFyc2UoU2VydmljZVByb3ZpZGVyLmdldFNlcnZpY2UoJ3NlcnZpY2UnLCBkYXRhKSk7XG4gICAgICBpZiAoYWNjZXNzaWJsZUpzb25SZXNwb25zZS5zdGF0dXMgIT09ICdlcnJvcicpIHtcbiAgICAgICAgYWNjZXNzaWJsZVRleHQgPSBhY2Nlc3NpYmxlSnNvblJlc3BvbnNlLnJlc3VsdC50ZXh0O1xuICAgICAgICBBY2Nlc3NpYmlsaXR5LmNhY2hlLnBvcHVsYXRlKG1hdGhNTCwgYWNjZXNzaWJsZVRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjZXNzaWJsZVRleHQgPSBTdHJpbmdNYW5hZ2VyLmdldCgnZXJyb3JfY29udmVydF9hY2Nlc3NpYmlsaXR5Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY2Vzc2libGVUZXh0O1xuICB9XG59XG5cbi8qKlxuICogQ29udGFpbnMgYW4gaW5zdGFuY2Ugb2YgVGV4dENhY2hlIGNsYXNzIHRvIG1hbmFnZSB0aGUgSmF2YVNjcmlwdCBhY2Nlc3NpYmxlIGNhY2hlLlxuICogRWFjaCBlbnRyeSBvZiB0aGUgY2FjaGUgb2JqZWN0IGNvbnRhaW5zIHRoZSBNYXRoTUwgYW5kIGl0J3MgY29ycmVzcG9uZGVudCBhY2Nlc3NpYmlsaXR5IHRleHQuXG4gKiBAcHJpdmF0ZVxuICogQHR5cGUge1RleHRDYWNoZX1cbiAqL1xuQWNjZXNzaWJpbGl0eS5fY2FjaGUgPSBuZXcgVGV4dENhY2hlKCk7XG4iLCIvKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyB0aGUgY29uZmlndXJhdGlvbiBjbGFzcy5cbiAqIFVzdWFsbHkgdXNlZCB0byByZXRyaWV2ZSBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgZ2VuZXJhdGVkIGluIHRoZSBiYWNrZW5kIGludG8gdGhlIGZyb250ZW5kLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maWd1cmF0aW9uIHtcbiAgLyoqXG4gICAqIEFkZHMgYSBwcm9wZXJ0aWVzIG9iamVjdCB0byB7QGxpbmsgQ29uZmlndXJhdGlvbi5wcm9wZXJ0aWVzfS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgLSBwcm9wZXJ0aWVzIHRvIGFwcGVuZCB0byBjdXJyZW50IHByb3BlcnRpZXMuXG4gICAqL1xuICBzdGF0aWMgYWRkQ29uZmlndXJhdGlvbihwcm9wZXJ0aWVzKSB7XG4gICAgT2JqZWN0LmFzc2lnbihDb25maWd1cmF0aW9uLnByb3BlcnRpZXMsIHByb3BlcnRpZXMpO1xuICB9XG5cbiAgLyoqXG4gICogU3RhdGljIHByb3BlcnR5LlxuICAqIFRoZSBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgb2JqZWN0LlxuICAqIEBwcml2YXRlXG4gICogQHR5cGUge09iamVjdH1cbiAgKi9cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiBDb25maWd1cmF0aW9uLl9wcm9wZXJ0aWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBwcm9wZXJ0eSBzZXR0ZXIuXG4gICAqIFNldCBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSAtIFRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAgICogQGlnbm9yZVxuICAgKi9cbiAgc3RhdGljIHNldCBwcm9wZXJ0aWVzKHZhbHVlKSB7XG4gICAgQ29uZmlndXJhdGlvbi5fcHJvcGVydGllcyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgcHJvcGVydHkga2V5LlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gUHJvcGVydHkga2V5XG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFByb3BlcnR5IHZhbHVlXG4gICAqL1xuICBzdGF0aWMgZ2V0KGtleSkge1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKENvbmZpZ3VyYXRpb24ucHJvcGVydGllcywga2V5KSkge1xuICAgICAgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKENvbmZpZ3VyYXRpb24ucHJvcGVydGllcywgJ193cnNfY29uZl8nKSkge1xuICAgICAgICByZXR1cm4gQ29uZmlndXJhdGlvbi5wcm9wZXJ0aWVzW2Bfd3JzX2NvbmZfJHtrZXl9YF07XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBDb25maWd1cmF0aW9uLnByb3BlcnRpZXNba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IHByb3BlcnR5IHRvIENvbmZpZ3VyYXRpb24gY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSBQcm9wZXJ0eSBrZXkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSAtIFByb3BlcnR5IHZhbHVlLlxuICAgKi9cbiAgc3RhdGljIHNldChrZXksIHZhbHVlKSB7XG4gICAgQ29uZmlndXJhdGlvbi5wcm9wZXJ0aWVzW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGEgcHJvcGVydHkgb2JqZWN0IHZhbHVlIHdpdGggbmV3IHZhbHVlcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIFRoZSBwcm9wZXJ0eSBrZXkgdG8gYmUgdXBkYXRlZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnR5VmFsdWUgLSBPYmplY3QgY29udGFpbmluZyB0aGUgbmV3IHZhbHVlcy5cbiAgICovXG4gIHN0YXRpYyB1cGRhdGUoa2V5LCBwcm9wZXJ0eVZhbHVlKSB7XG4gICAgaWYgKCFDb25maWd1cmF0aW9uLmdldChrZXkpKSB7XG4gICAgICBDb25maWd1cmF0aW9uLnNldChrZXksIHByb3BlcnR5VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cGRhdGVQcm9wZXJ0eSA9IE9iamVjdC5hc3NpZ24oQ29uZmlndXJhdGlvbi5nZXQoa2V5KSwgcHJvcGVydHlWYWx1ZSk7XG4gICAgICBDb25maWd1cmF0aW9uLnNldChrZXksIHVwZGF0ZVByb3BlcnR5KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTdGF0aWMgcHJvcGVydGllcyBvYmplY3QuIFN0b3JlcyBhbGwgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzLlxuICogTmVlZGVkIHRvIGF0dHJpYnV0ZSBhY2Nlc3NvcnMuXG4gKiBAcHJpdmF0ZVxuICogQHR5cGUge09iamVjdH1cbiAqL1xuQ29uZmlndXJhdGlvbi5fcHJvcGVydGllcyA9IHt9O1xuIiwiLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYWxsIHRoZSBjb25zdGFudHMgbmVlZGVkIGluIGEgTWF0aFR5cGUgaW50ZWdyYXRpb24gYW1vbmcgZGlmZmVyZW50IGNsYXNzZXMuXG4gKiBJZiBhIGNvbnN0YW50IHNob3VsZCBiZSB1c2VkIGFjcm9zcyBkaWZmZXJlbnQgY2xhc3NlcyBzaG91bGQgYmUgZGVmaW5lZCB1c2luZyBhdHRyaWJ1dGVcbiAqIGFjY2Vzc29ycy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3RhbnRzIHtcbiAgLyoqXG4gICAqIFNhZmUgWE1MIGVudGl0aWVzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgc3RhdGljIGdldCBzYWZlWG1sQ2hhcmFjdGVyc0VudGl0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0YWdPcGVuZXI6ICcmbGFxdW87JyxcbiAgICAgIHRhZ0Nsb3NlcjogJyZyYXF1bzsnLFxuICAgICAgZG91YmxlUXVvdGU6ICcmdW1sOycsXG4gICAgICByZWFsRG91YmxlUXVvdGU6ICcmcXVvdDsnLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQmxhY2tib2FyZCBpbnZhbGlkIHNhZmUgY2hhcmFjdGVycy5cbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgc2FmZUJhZEJsYWNrYm9hcmRDaGFyYWN0ZXJzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsdEVsZW1lbnQ6ICfCq21vwrs8wqsvbW/CuycsXG4gICAgICBndEVsZW1lbnQ6ICfCq21vwrs+wqsvbW/CuycsXG4gICAgICBhbXBFbGVtZW50OiAnwqttb8K7JsKrL21vwrsnLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQmxhY2tib2FyZCB2YWxpZCBzYWZlIGNoYXJhY3RlcnMuXG4gICAqIEB0eXBle09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBnZXQgc2FmZUdvb2RCbGFja2JvYXJkQ2hhcmFjdGVycygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbHRFbGVtZW50OiAnwqttb8K7wqdsdDvCqy9tb8K7JyxcbiAgICAgIGd0RWxlbWVudDogJ8KrbW/Cu8KnZ3Q7wqsvbW/CuycsXG4gICAgICBhbXBFbGVtZW50OiAnwqttb8K7wqdhbXA7wqsvbW/CuycsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFuZGFyZCBYTUwgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgc3RhdGljIGdldCB4bWxDaGFyYWN0ZXJzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ3htbENoYXJhY3RlcnMnLFxuICAgICAgdGFnT3BlbmVyOiAnPCcsIC8vIEhleDogXFx4M0MuXG4gICAgICB0YWdDbG9zZXI6ICc+JywgLy8gSGV4OiBcXHgzRS5cbiAgICAgIGRvdWJsZVF1b3RlOiAnXCInLCAvLyBIZXg6IFxceDIyLlxuICAgICAgYW1wZXJzYW5kOiAnJicsIC8vIEhleDogXFx4MjYuXG4gICAgICBxdW90ZTogJ1xcJycsIC8vIEhleDogXFx4MjcuXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAqIFNhZmUgWE1MIHNwZWNpYWwgY2hhcmFjdGVycy4gVGhpcyBjaGFyYWN0ZXJzIGFyZSB1c2VkIGluc3RlYWQgdGhlIHN0YW5kYXJkXG4gICogdGhlIHN0YW5kYXJkIHRvIHBhcnNlIHRoZSAgTWF0aE1MIGlmIHNhZmVYTUwgc2F2ZSBtb2RlIGlzIGVuYWJsZS4gRWFjaCBYTUxcbiAgKiBzcGVjaWFsIGNoYXJhY3RlciBoYXZlIGEgVVRGLTggcmVwcmVzZW50YXRpb24uXG4gICogQHR5cGUge09iamVjdH1cbiAgKi9cbiAgc3RhdGljIGdldCBzYWZlWG1sQ2hhcmFjdGVycygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6ICdzYWZlWG1sQ2hhcmFjdGVycycsXG4gICAgICB0YWdPcGVuZXI6ICfCqycsIC8vIEhleDogXFx4QUIuXG4gICAgICB0YWdDbG9zZXI6ICfCuycsIC8vIEhleDogXFx4QkIuXG4gICAgICBkb3VibGVRdW90ZTogJ8KoJywgLy8gSGV4OiBcXHhBOC5cbiAgICAgIGFtcGVyc2FuZDogJ8KnJywgLy8gSGV4OiBcXHhBNy5cbiAgICAgIHF1b3RlOiAnYCcsIC8vIEhleDogXFx4NjAuXG4gICAgICByZWFsRG91YmxlUXVvdGU6ICfCqCcsXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi9jb25maWd1cmF0aW9uJztcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQGNsYXNzZGVzY1xuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIE1hdGhUeXBlIEltYWdlIGNsYXNzLiBDb250YWlucyBhbGwgdGhlIGxvZ2ljIHJlbGF0ZWRcbiAqIHRvIE1hdGhUeXBlIGltYWdlcyBtYW5pcHVsYXRpb24uXG4gKiBBbGwgTWF0aFR5cGUgaW1hZ2VzIGFyZSBnZW5lcmF0ZWQgdXNpbmcgdGhlIGFwcHJvcHJpYXRlIE1hdGhUeXBlXG4gKiBpbnRlZ3JhdGlvbiBzZXJ2aWNlOiBzaG93aW1hZ2Ugb3IgY3JlYXRlaW1hZ2UuXG4gKlxuICogVGhlcmUgYXJlIHR3byBhdmFpbGFibGUgaW1hZ2UgZm9ybWF0czpcbiAqIC0gc3ZnIChkZWZhdWx0KVxuICogLSBwbmdcbiAqXG4gKiBUaGVyZSBhcmUgdHdvIGZvcm1hdHMgZm9yIHRoZSBpbWFnZSBzcmMgYXR0cmlidXRlOlxuICogLSBBIGRhdGEtdXJpIHNjaGVtZSBjb250YWluaW5nIHRoZSBVUkwtZW5jb2RlZCBTVkcgb3IgYSBQTkcncyBiYXNlNjQuXG4gKiAtIEEgbGluayB0byB0aGUgc2hvd2ltYWdlIHNlcnZpY2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlIHtcbiAgLyoqXG4gICAqIFJlbW92ZXMgZGF0YSBhdHRyaWJ1dGVzIGZyb20gYW4gaW1hZ2UuXG4gICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gaW1nIC0gSW1hZ2Ugd2hlcmUgcmVtb3ZlIGRhdGEgYXR0cmlidXRlcy5cbiAgICovXG4gIHN0YXRpYyByZW1vdmVJbWdEYXRhQXR0cmlidXRlcyhpbWcpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzVG9SZW1vdmUgPSBbXTtcbiAgICBjb25zdCB7IGF0dHJpYnV0ZXMgfSA9IGltZztcblxuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgYXR0cmlidXRlID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgaWYgKGF0dHJpYnV0ZSAhPT0gdW5kZWZpbmVkICYmIGF0dHJpYnV0ZS5uYW1lICE9PSB1bmRlZmluZWQgJiYgYXR0cmlidXRlLm5hbWUuaW5kZXhPZignZGF0YS0nKSA9PT0gMCkge1xuICAgICAgICAvLyBJcyBwcmVmZXJyZWQga2VlcCBhbiBhcnJheSBhbmQgcmVtb3ZlIGFmdGVyIHRoZSBzZWFyY2hcbiAgICAgICAgLy8gYmVjYXVzZSB3aGVuIGF0dHJpYnV0ZSBpcyByZW1vdmVkIHRoZSBhcnJheSBvZiBhdHRyaWJ1dGVzXG4gICAgICAgIC8vIGlzIG1vZGlmaWVkLlxuICAgICAgICBhdHRyaWJ1dGVzVG9SZW1vdmUucHVzaChhdHRyaWJ1dGUubmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhdHRyaWJ1dGVzVG9SZW1vdmUuZm9yRWFjaCgoYXR0cmlidXRlKSA9PiB7XG4gICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHN0YXRpY1xuICAgKiBDbG9uZXMgYWxsIE1hdGhUeXBlIGltYWdlIGF0dHJpYnV0ZXMgZnJvbSBhIEhUTUxJbWFnZUVsZW1lbnQgdG8gYW5vdGhlci5cbiAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBvcmlnaW5JbWcgLSBUaGUgb3JpZ2luYWwgaW1hZ2UuXG4gICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gZGVzdEltZyAtIFRoZSBkZXN0aW5hdGlvbiBpbWFnZS5cbiAgICovXG4gIHN0YXRpYyBjbG9uZShvcmlnaW5JbWcsIGRlc3RJbWcpIHtcbiAgICBjb25zdCBjdXN0b21FZGl0b3JBdHRyaWJ1dGVOYW1lID0gQ29uZmlndXJhdGlvbi5nZXQoJ2ltYWdlQ3VzdG9tRWRpdG9yTmFtZScpO1xuICAgIGlmICghb3JpZ2luSW1nLmhhc0F0dHJpYnV0ZShjdXN0b21FZGl0b3JBdHRyaWJ1dGVOYW1lKSkge1xuICAgICAgZGVzdEltZy5yZW1vdmVBdHRyaWJ1dGUoY3VzdG9tRWRpdG9yQXR0cmlidXRlTmFtZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0aG1sQXR0cmlidXRlTmFtZSA9IENvbmZpZ3VyYXRpb24uZ2V0KCdpbWFnZU1hdGhtbEF0dHJpYnV0ZScpO1xuICAgIGNvbnN0IGltZ0F0dHJpYnV0ZXMgPSBbXG4gICAgICBtYXRobWxBdHRyaWJ1dGVOYW1lLFxuICAgICAgY3VzdG9tRWRpdG9yQXR0cmlidXRlTmFtZSxcbiAgICAgICdhbHQnLFxuICAgICAgJ2hlaWdodCcsXG4gICAgICAnd2lkdGgnLFxuICAgICAgJ3N0eWxlJyxcbiAgICAgICdzcmMnLFxuICAgICAgJ3JvbGUnLFxuICAgIF07XG5cbiAgICBpbWdBdHRyaWJ1dGVzLmZvckVhY2goKGl0ZXJhdG9yKSA9PiB7XG4gICAgICBjb25zdCBvcmlnaW5BdHRyaWJ1dGUgPSBvcmlnaW5JbWcuZ2V0QXR0cmlidXRlKGl0ZXJhdG9yKTtcbiAgICAgIGlmIChvcmlnaW5BdHRyaWJ1dGUpIHtcbiAgICAgICAgZGVzdEltZy5zZXRBdHRyaWJ1dGUoaXRlcmF0b3IsIG9yaWdpbkF0dHJpYnV0ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBDYWxjdWxhdGVzIHRoZSBtZXRyaWNzIG9mIGEgTWF0aFR5cGUgaW1hZ2UgZ2l2ZW4gdGhlIHRoZSBzZXJ2aWNlIHJlc3BvbnNlIGFuZCB0aGUgaW1hZ2UgZm9ybWF0LlxuICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudH0gaW1nIC0gVGhlIEhUTUxJbWFnZUVsZW1lbnQuXG4gICogQHBhcmFtIHtTdHJpbmd9IHVyaSAtIFRoZSBVUkkgZ2VuZXJhdGVkIGJ5IHRoZSBpbWFnZSBzZXJ2aWNlOiBjYW4gYmUgYSBkYXRhIFVSSSBzY2hlbWUgb3IgYSBVUkwuXG4gICogQHBhcmFtIHtCb29sZWFufSBqc29uUmVzcG9uc2UgLSBUcnVlIHRoZSByZXNwb25zZSBvZiB0aGUgaW1hZ2Ugc2VydmljZSBpcyBhXG4gICogSlNPTiBvYmplY3QuIEZhbHNlIG90aGVyd2lzZS5cbiAgKi9cbiAgc3RhdGljIHNldEltZ1NpemUoaW1nLCB1cmksIGpzb25SZXNwb25zZSkge1xuICAgIGxldCBhcjtcbiAgICBsZXQgYmFzZTY0U3RyaW5nO1xuICAgIGxldCBieXRlcztcbiAgICBsZXQgc3ZnU3RyaW5nO1xuICAgIGlmIChqc29uUmVzcG9uc2UpIHtcbiAgICAgIC8vIENsZWFuaW5nIGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NC5cbiAgICAgIGlmIChDb25maWd1cmF0aW9uLmdldCgnaW1hZ2VGb3JtYXQnKSA9PT0gJ3N2ZycpIHtcbiAgICAgICAgLy8gU1ZHIGZvcm1hdC5cbiAgICAgICAgLy8gSWYgU1ZHIGlzIGVuY29kZWQgaW4gYmFzZTY0IHdlIG5lZWQgdG8gY29udmVydCB0aGUgYmFzZTY0IGJ5dGVzIGludG8gYSBTVkcgc3RyaW5nLlxuICAgICAgICBpZiAoQ29uZmlndXJhdGlvbi5nZXQoJ3NhdmVNb2RlJykgIT09ICdiYXNlNjQnKSB7XG4gICAgICAgICAgYXIgPSBJbWFnZS5nZXRNZXRyaWNzRnJvbVN2Z1N0cmluZyh1cmkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJhc2U2NFN0cmluZyA9IGltZy5zcmMuc3Vic3RyKGltZy5zcmMuaW5kZXhPZignYmFzZTY0LCcpICsgNywgaW1nLnNyYy5sZW5ndGgpO1xuICAgICAgICAgIHN2Z1N0cmluZyA9ICcnO1xuICAgICAgICAgIGJ5dGVzID0gVXRpbC5iNjRUb0J5dGVBcnJheShiYXNlNjRTdHJpbmcsIGJhc2U2NFN0cmluZy5sZW5ndGgpO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHN2Z1N0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXIgPSBJbWFnZS5nZXRNZXRyaWNzRnJvbVN2Z1N0cmluZyhzdmdTdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBORyBmb3JtYXQ6IHdlIHN0b3JlIGFsbCBtZXRyaWNzIGluZm9ybWF0aW9uIGluIHRoZSBmaXJzdCA4OCBieXRlcy5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhc2U2NFN0cmluZyA9IGltZy5zcmMuc3Vic3RyKGltZy5zcmMuaW5kZXhPZignYmFzZTY0LCcpICsgNywgaW1nLnNyYy5sZW5ndGgpO1xuICAgICAgICBieXRlcyA9IFV0aWwuYjY0VG9CeXRlQXJyYXkoYmFzZTY0U3RyaW5nLCA4OCk7XG4gICAgICAgIGFyID0gSW1hZ2UuZ2V0TWV0cmljc0Zyb21CeXRlcyhieXRlcyk7XG4gICAgICB9XG4gICAgICAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eTogd2Ugc3RvcmUgdGhlIG1ldHJpY3MgaW50byBjcmVhdGVpbWFnZSByZXNwb25zZS5cbiAgICB9IGVsc2Uge1xuICAgICAgYXIgPSBVdGlsLnVybFRvQXNzQXJyYXkodXJpKTtcbiAgICB9XG4gICAgbGV0IHdpZHRoID0gYXIuY3c7XG4gICAgaWYgKCF3aWR0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaGVpZ2h0ID0gYXIuY2g7XG4gICAgbGV0IGJhc2VsaW5lID0gYXIuY2I7XG4gICAgY29uc3QgeyBkcGkgfSA9IGFyO1xuICAgIGlmIChkcGkpIHtcbiAgICAgIHdpZHRoID0gd2lkdGggKiA5NiAvIGRwaTtcbiAgICAgIGhlaWdodCA9IGhlaWdodCAqIDk2IC8gZHBpO1xuICAgICAgYmFzZWxpbmUgPSBiYXNlbGluZSAqIDk2IC8gZHBpO1xuICAgIH1cbiAgICBpbWcud2lkdGggPSB3aWR0aDtcbiAgICBpbWcuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGltZy5zdHlsZS52ZXJ0aWNhbEFsaWduID0gYC0ke2hlaWdodCAtIGJhc2VsaW5lfXB4YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBtZXRyaWNzIG9mIGFuIGltYWdlIHdoaWNoIGhhcyBiZWVuIHJlc2l6ZWQuIElzIHVzZWQgdG8gcmVzdG9yZSB0aGUgb3JpZ2luYWxcbiAgICogbWV0cmljcyBvZiBhIHJlc2l6ZWQgaW1hZ2UuXG4gICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudCB9IGltZyAtIFRoZSByZXNpemVkIEhUTUxJbWFnZUVsZW1lbnQuXG4gICAqL1xuICBzdGF0aWMgZml4QWZ0ZXJSZXNpemUoaW1nKSB7XG4gICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICBpbWcucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpO1xuICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2hlaWdodCcpO1xuICAgIC8vIEluIG9yZGVyIHRvIGF2b2lkIHJlc2l6ZSB3aXRoIG1heC13aWR0aCBjc3MgcHJvcGVydHkuXG4gICAgaW1nLnN0eWxlLm1heFdpZHRoID0gJ25vbmUnO1xuICAgIGlmIChpbWcuc3JjLmluZGV4T2YoJ2RhdGE6aW1hZ2UnKSAhPT0gLTEpIHtcbiAgICAgIGlmIChDb25maWd1cmF0aW9uLmdldCgnaW1hZ2VGb3JtYXQnKSA9PT0gJ3N2ZycpIHtcbiAgICAgICAgLy8gLi4uZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmOCwgPSAzMi5cbiAgICAgICAgY29uc3Qgc3ZnID0gZGVjb2RlVVJJQ29tcG9uZW50KGltZy5zcmMuc3Vic3RyaW5nKDMyLCBpbWcuc3JjLmxlbmd0aCkpO1xuICAgICAgICBJbWFnZS5zZXRJbWdTaXplKGltZywgc3ZnLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIC4uLmRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwgPT0gMjIuXG4gICAgICAgIGNvbnN0IGJhc2U2NCA9IGltZy5zcmMuc3Vic3RyaW5nKDIyLCBpbWcuc3JjLmxlbmd0aCk7XG4gICAgICAgIEltYWdlLnNldEltZ1NpemUoaW1nLCBiYXNlNjQsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBJbWFnZS5zZXRJbWdTaXplKGltZywgaW1nLnNyYyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG1ldHJpY3MgKGhlaWdodCwgd2lkdGggYW5kIGJhc2VsaW5lKSBjb250YWluZWQgaW4gYSBTVkcgaW1hZ2UgZ2VuZXJhdGVkXG4gICAqIGJ5IHRoZSBNYXRoVHlwZSBpbWFnZSBzZXJ2aWNlLiBUaGlzIGltYWdlIGNvbnRhaW5zIGFzIGFuIGV4dHJhIGN1c3RvbSBhdHRyaWJ1dGU6XG4gICAqIHRoZSBiYXNlbGluZSAod3JzOmJhc2VsaW5lKS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN2Z1N0cmluZyAtIFRoZSBTVkcgaW1hZ2UuXG4gICAqIEByZXR1cm4ge0FycmF5fSAtIFRoZSBpbWFnZSBtZXRyaWNzLlxuICAgKi9cbiAgc3RhdGljIGdldE1ldHJpY3NGcm9tU3ZnU3RyaW5nKHN2Z1N0cmluZykge1xuICAgIGxldCBmaXJzdCA9IHN2Z1N0cmluZy5pbmRleE9mKCdoZWlnaHQ9XCInKTtcbiAgICBsZXQgbGFzdCA9IHN2Z1N0cmluZy5pbmRleE9mKCdcIicsIGZpcnN0ICsgOCwgc3ZnU3RyaW5nLmxlbmd0aCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gc3ZnU3RyaW5nLnN1YnN0cmluZyhmaXJzdCArIDgsIGxhc3QpO1xuXG4gICAgZmlyc3QgPSBzdmdTdHJpbmcuaW5kZXhPZignd2lkdGg9XCInKTtcbiAgICBsYXN0ID0gc3ZnU3RyaW5nLmluZGV4T2YoJ1wiJywgZmlyc3QgKyA3LCBzdmdTdHJpbmcubGVuZ3RoKTtcbiAgICBjb25zdCB3aWR0aCA9IHN2Z1N0cmluZy5zdWJzdHJpbmcoZmlyc3QgKyA3LCBsYXN0KTtcblxuICAgIGZpcnN0ID0gc3ZnU3RyaW5nLmluZGV4T2YoJ3dyczpiYXNlbGluZT1cIicpO1xuICAgIGxhc3QgPSBzdmdTdHJpbmcuaW5kZXhPZignXCInLCBmaXJzdCArIDE0LCBzdmdTdHJpbmcubGVuZ3RoKTtcbiAgICBjb25zdCBiYXNlbGluZSA9IHN2Z1N0cmluZy5zdWJzdHJpbmcoZmlyc3QgKyAxNCwgbGFzdCk7XG5cbiAgICBpZiAodHlwZW9mIHdpZHRoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICBhcnIuY3cgPSB3aWR0aDtcbiAgICAgIGFyci5jaCA9IGhlaWdodDtcbiAgICAgIGlmICh0eXBlb2YgYmFzZWxpbmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGFyci5jYiA9IGJhc2VsaW5lO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG1ldHJpY3MgKHdpZHRoLCBoZWlnaHQsIGJhc2VsaW5lIGFuZCBkcGkpIGNvbnRhaW5lZCBpbiBhIFBORyBieXRlIGFycmF5LlxuICAgKiBAcGFyYW0gIHtBcnJheS48Qnl0ZXM+fSBieXRlcyAtIHBuZyBieXRlIGFycmF5LlxuICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIHBuZyBtZXRyaWNzLlxuICAgKi9cbiAgc3RhdGljIGdldE1ldHJpY3NGcm9tQnl0ZXMoYnl0ZXMpIHtcbiAgICBVdGlsLnJlYWRCeXRlcyhieXRlcywgMCwgOCk7XG4gICAgbGV0IHdpZHRoO1xuICAgIGxldCBoZWlnaHQ7XG4gICAgbGV0IHR5cDtcbiAgICBsZXQgYmFzZWxpbmU7XG4gICAgbGV0IGRwaTtcbiAgICB3aGlsZSAoYnl0ZXMubGVuZ3RoID49IDQpIHtcbiAgICAgIHR5cCA9IFV0aWwucmVhZEludDMyKGJ5dGVzKTtcbiAgICAgIGlmICh0eXAgPT09IDB4NDk0ODQ0NTIpIHtcbiAgICAgICAgd2lkdGggPSBVdGlsLnJlYWRJbnQzMihieXRlcyk7XG4gICAgICAgIGhlaWdodCA9IFV0aWwucmVhZEludDMyKGJ5dGVzKTtcbiAgICAgICAgLy8gUmVhZCA1IGJ5dGVzLlxuICAgICAgICBVdGlsLnJlYWRJbnQzMihieXRlcyk7XG4gICAgICAgIFV0aWwucmVhZEJ5dGUoYnl0ZXMpO1xuICAgICAgfSBlbHNlIGlmICh0eXAgPT09IDB4NjI2MTUzNDUpIHsgLy8gQmFzZWxpbmU6ICdiYVNFJy5cbiAgICAgICAgYmFzZWxpbmUgPSBVdGlsLnJlYWRJbnQzMihieXRlcyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cCA9PT0gMHg3MDQ4NTk3MykgeyAvLyBEcGlzOiAncEhZcycuXG4gICAgICAgIGRwaSA9IFV0aWwucmVhZEludDMyKGJ5dGVzKTtcbiAgICAgICAgZHBpID0gKE1hdGgucm91bmQoZHBpIC8gMzkuMzcpKTtcbiAgICAgICAgVXRpbC5yZWFkSW50MzIoYnl0ZXMpO1xuICAgICAgICBVdGlsLnJlYWRCeXRlKGJ5dGVzKTtcbiAgICAgIH1cbiAgICAgIFV0aWwucmVhZEludDMyKGJ5dGVzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHdpZHRoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICBhcnIuY3cgPSB3aWR0aDtcbiAgICAgIGFyci5jaCA9IGhlaWdodDtcbiAgICAgIGFyci5kcGkgPSBkcGk7XG4gICAgICBpZiAoYmFzZWxpbmUpIHtcbiAgICAgICAgYXJyLmNiID0gYmFzZWxpbmU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIiwiaW1wb3J0IFRleHRDYWNoZSBmcm9tICcuL3RleHRjYWNoZSc7XG5pbXBvcnQgTWF0aE1MIGZyb20gJy4vbWF0aG1sJztcbmltcG9ydCBTZXJ2aWNlUHJvdmlkZXIgZnJvbSAnLi9zZXJ2aWNlcHJvdmlkZXInO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEBjbGFzc2Rlc2NcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIExhVGVYIHBhcnNlci4gTWFuYWdlcyB0aGUgc2VydmljZXMgd2hpY2ggYWxsb3dzIHRvIGNvbnZlcnRcbiAqIExhVGVYIGludG8gTWF0aE1MIGFuZCBNYXRoTUwgaW50byBMYVRlWC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF0ZXgge1xuICAvKipcbiAgICogU3RhdGljIHByb3BlcnR5LlxuICAgKiBSZXR1cm4gbGF0ZXggY2FjaGUuXG4gICAqIEBwcml2YXRlXG4gICAqIEB0eXBlIHtDYWNoZX1cbiAgICovXG4gIHN0YXRpYyBnZXQgY2FjaGUoKSB7XG4gICAgcmV0dXJuIExhdGV4Ll9jYWNoZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgcHJvcGVydHkgc2V0dGVyLlxuICAgKiBTZXQgbGF0ZXggY2FjaGUuXG4gICAqIEBwYXJhbSB7Q2FjaGV9IHZhbHVlIC0gVGhlIHByb3BlcnR5IHZhbHVlLlxuICAgKiBAaWdub3JlXG4gICovXG4gIHN0YXRpYyBzZXQgY2FjaGUodmFsdWUpIHtcbiAgICBMYXRleC5fY2FjaGUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBNYXRoTUwgdG8gTGFUZVggYnkgY2FsbGluZyBtYXRobWwybGF0ZXggc2VydmljZS4gRm9yIHRleHQgc2VydmljZXNcbiAgICogd2UgY2FsbCBhIHRleHQgc2VydmljZSB3aXRoIHRoZSBwYXJhbSBtYXRobWwybGF0ZXguXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXRobWwgLSBNYXRoTUwgU3RyaW5nLlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IExhVGVYIHN0cmluZyBnZW5lcmF0ZWQgYnkgdGhlIE1hdGhNTCBhcmd1bWVudC5cbiAgICovXG4gIHN0YXRpYyBnZXRMYXRleEZyb21NYXRoTUwobWF0aG1sKSB7XG4gICAgY29uc3QgbWF0aG1sV2l0aG91dFNlbWFudGljcyA9IE1hdGhNTC5yZW1vdmVTZW1hbnRpY3MobWF0aG1sKTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7VGV4dENhY2hlfVxuICAgICAqL1xuICAgIGNvbnN0IHsgY2FjaGUgfSA9IExhdGV4O1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHNlcnZpY2U6ICdtYXRobWwybGF0ZXgnLFxuICAgICAgbW1sOiBtYXRobWxXaXRob3V0U2VtYW50aWNzLFxuICAgIH07XG5cbiAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBKU09OLnBhcnNlKFNlcnZpY2VQcm92aWRlci5nZXRTZXJ2aWNlKCdzZXJ2aWNlJywgZGF0YSkpO1xuXG4gICAgLy8gVE9ETzogRXJyb3IgaGFuZGxpbmcuXG4gICAgbGV0IGxhdGV4ID0gJyc7XG5cbiAgICBpZiAoanNvblJlc3BvbnNlLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgbGF0ZXggPSBqc29uUmVzcG9uc2UucmVzdWx0LnRleHQ7XG4gICAgICBjb25zdCBsYXRleEh0bWxFbnRpdGllc0VuY29kZWQgPSBVdGlsLmh0bWxFbnRpdGllcyhsYXRleCk7XG4gICAgICAvLyBJbnNlcnRpbmcgTGFUZVggc2VtYW50aWNzLlxuICAgICAgY29uc3QgbWF0aG1sV2l0aFNlbWFudGljcyA9IE1hdGhNTC5hZGRBbm5vdGF0aW9uKG1hdGhtbCwgbGF0ZXhIdG1sRW50aXRpZXNFbmNvZGVkLCAnTGFUZVgnKTtcbiAgICAgIGNhY2hlLnBvcHVsYXRlKGxhdGV4LCBtYXRobWxXaXRoU2VtYW50aWNzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGF0ZXg7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgTGFUZVggdG8gTWF0aE1MIGJ5IGNhbGxpbmcgbGF0ZXgybWF0aG1sIHNlcnZpY2UuIEZvciB0ZXh0IHNlcnZpY2VzXG4gICAqIHdlIGNhbGwgYSB0ZXh0IHNlcnZpY2Ugd2l0aCB0aGUgcGFyYW0gbGF0ZXgybWF0aG1sLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbGF0ZXggLSBTdHJpbmcgY29udGFpbmluZyBhIExhVGVYIGZvcm11bGEuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5jbHVkZUxhdGV4T25TZW1hbnRpY3NcbiAgICogLSBJZiB0cnVlIExhVGVYIHdvdWxkIG1lIGluY2x1ZGVkIGludG8gTWF0aE1MIHNlbWFudGljcy5cbiAgICogQHJldHVybiB7U3RyaW5nfSBNYXRoTUwgc3RyaW5nIGdlbmVyYXRlZCBieSB0aGUgTGFUZVggYXJndW1lbnQuXG4gICAqL1xuICBzdGF0aWMgZ2V0TWF0aE1MRnJvbUxhdGV4KGxhdGV4LCBpbmNsdWRlTGF0ZXhPblNlbWFudGljcykge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtUZXh0Q2FjaGV9XG4gICAgICovXG4gICAgY29uc3QgbGF0ZXhDYWNoZSA9IExhdGV4LmNhY2hlO1xuXG4gICAgaWYgKExhdGV4LmNhY2hlLmdldChsYXRleCkpIHtcbiAgICAgIHJldHVybiBMYXRleC5jYWNoZS5nZXQobGF0ZXgpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgc2VydmljZTogJ2xhdGV4Mm1hdGhtbCcsXG4gICAgICBsYXRleCxcbiAgICB9O1xuXG4gICAgaWYgKGluY2x1ZGVMYXRleE9uU2VtYW50aWNzKSB7XG4gICAgICBkYXRhLnNhdmVMYXRleCA9ICcnO1xuICAgIH1cblxuICAgIGNvbnN0IGpzb25SZXNwb25zZSA9IEpTT04ucGFyc2UoU2VydmljZVByb3ZpZGVyLmdldFNlcnZpY2UoJ3NlcnZpY2UnLCBkYXRhKSk7XG5cbiAgICBsZXQgb3V0cHV0O1xuICAgIGlmIChqc29uUmVzcG9uc2Uuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICBsZXQgbWF0aG1sID0ganNvblJlc3BvbnNlLnJlc3VsdC50ZXh0O1xuICAgICAgbWF0aG1sID0gbWF0aG1sLnNwbGl0KCdcXHInKS5qb2luKCcnKS5zcGxpdCgnXFxuJykuam9pbignICcpO1xuXG4gICAgICAvLyBQb3B1bGF0ZSBMYXRleENhY2hlLlxuICAgICAgaWYgKG1hdGhtbC5pbmRleE9mKCdzZW1hbnRpY3MnKSA9PT0gLTEgJiYgbWF0aG1sLmluZGV4T2YoJ2Fubm90YXRpb24nKSA9PT0gLTEpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IFV0aWwuaHRtbEVudGl0aWVzKGxhdGV4KTtcbiAgICAgICAgbWF0aG1sID0gTWF0aE1MLmFkZEFubm90YXRpb24obWF0aG1sLCBjb250ZW50LCAnTGFUZVgnKTtcbiAgICAgICAgb3V0cHV0ID0gbWF0aG1sO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ID0gbWF0aG1sO1xuICAgICAgfVxuICAgICAgaWYgKCFsYXRleENhY2hlLmdldChsYXRleCkpIHtcbiAgICAgICAgbGF0ZXhDYWNoZS5wb3B1bGF0ZShsYXRleCwgbWF0aG1sKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0ID0gYCQkJHtsYXRleH0kJGA7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYWxsIG9jY3VycmVuY2VzIG9mIE1hdGhNTCBjb2RlIHRvIExhVGVYLlxuICAgKiBUaGUgTWF0aE1MIGNvZGUgc2hvdWxkIGNvbnRhaW5pbmcgPGFubm90YXRpb24gZW5jb2Rpbmc9XCJMYVRlWFwiLz4gdG8gYmUgY29udmVydGVkLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29udGVudCAtIEEgc3RyaW5nIGNvbnRhaW5pbmcgTWF0aE1MIHZhbGlkIGNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjaGFyYWN0ZXJzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IEEgc3RyaW5nIGNvbnRhaW5pbmcgYWxsIE1hdGhNTCBhbm5vdGF0ZWQgb2NjdXJyZW5jZXNcbiAgICogcmVwbGFjZWQgYnkgdGhlIGNvcnJlc3BvbmRpbmcgTGFUZVggY29kZS5cbiAgICovXG4gIHN0YXRpYyBwYXJzZU1hdGhtbFRvTGF0ZXgoY29udGVudCwgY2hhcmFjdGVycykge1xuICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICBjb25zdCBtYXRoVGFnQmVnaW4gPSBgJHtjaGFyYWN0ZXJzLnRhZ09wZW5lcn1tYXRoYDtcbiAgICBjb25zdCBtYXRoVGFnRW5kID0gYCR7Y2hhcmFjdGVycy50YWdPcGVuZXJ9L21hdGgke2NoYXJhY3RlcnMudGFnQ2xvc2VyfWA7XG4gICAgY29uc3Qgb3BlblRhcmdldCA9IGAke2NoYXJhY3RlcnMudGFnT3BlbmVyfWFubm90YXRpb24gZW5jb2Rpbmc9JHtjaGFyYWN0ZXJzLmRvdWJsZVF1b3RlfUxhVGVYJHtjaGFyYWN0ZXJzLmRvdWJsZVF1b3RlfSR7Y2hhcmFjdGVycy50YWdDbG9zZXJ9YDtcbiAgICBjb25zdCBjbG9zZVRhcmdldCA9IGAke2NoYXJhY3RlcnMudGFnT3BlbmVyfS9hbm5vdGF0aW9uJHtjaGFyYWN0ZXJzLnRhZ0Nsb3Nlcn1gO1xuICAgIGxldCBzdGFydCA9IGNvbnRlbnQuaW5kZXhPZihtYXRoVGFnQmVnaW4pO1xuICAgIGxldCBlbmQgPSAwO1xuICAgIGxldCBtYXRobWw7XG4gICAgbGV0IHN0YXJ0QW5ub3RhdGlvbjtcbiAgICBsZXQgY2xvc2VBbm5vdGF0aW9uO1xuXG4gICAgd2hpbGUgKHN0YXJ0ICE9PSAtMSkge1xuICAgICAgb3V0cHV0ICs9IGNvbnRlbnQuc3Vic3RyaW5nKGVuZCwgc3RhcnQpO1xuICAgICAgZW5kID0gY29udGVudC5pbmRleE9mKG1hdGhUYWdFbmQsIHN0YXJ0KTtcblxuICAgICAgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAgICAgZW5kID0gY29udGVudC5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kICs9IG1hdGhUYWdFbmQubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBtYXRobWwgPSBjb250ZW50LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcblxuICAgICAgc3RhcnRBbm5vdGF0aW9uID0gbWF0aG1sLmluZGV4T2Yob3BlblRhcmdldCk7XG4gICAgICBpZiAoc3RhcnRBbm5vdGF0aW9uICE9PSAtMSkge1xuICAgICAgICBzdGFydEFubm90YXRpb24gKz0gb3BlblRhcmdldC5sZW5ndGg7XG4gICAgICAgIGNsb3NlQW5ub3RhdGlvbiA9IG1hdGhtbC5pbmRleE9mKGNsb3NlVGFyZ2V0KTtcbiAgICAgICAgbGV0IGxhdGV4ID0gbWF0aG1sLnN1YnN0cmluZyhzdGFydEFubm90YXRpb24sIGNsb3NlQW5ub3RhdGlvbik7XG4gICAgICAgIGlmIChjaGFyYWN0ZXJzID09PSBDb25zdGFudHMuc2FmZVhtbENoYXJhY3RlcnMpIHtcbiAgICAgICAgICBsYXRleCA9IE1hdGhNTC5zYWZlWG1sRGVjb2RlKGxhdGV4KTtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQgKz0gYCQkJHtsYXRleH0kJGA7XG4gICAgICAgIC8vIFBvcHVsYXRlIGxhdGV4IGludG8gY2FjaGUuXG5cbiAgICAgICAgTGF0ZXguY2FjaGUucG9wdWxhdGUobGF0ZXgsIG1hdGhtbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQgKz0gbWF0aG1sO1xuICAgICAgfVxuICAgICAgc3RhcnQgPSBjb250ZW50LmluZGV4T2YobWF0aFRhZ0JlZ2luLCBlbmQpO1xuICAgIH1cblxuICAgIG91dHB1dCArPSBjb250ZW50LnN1YnN0cmluZyhlbmQsIGNvbnRlbnQubGVuZ3RoKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIHRoZSBsYXRleCBvZiBhIGRldGVybWluZWQgcG9zaXRpb24gaW4gYSB0ZXh0LlxuICAgKiBAcGFyYW0ge05vZGV9IHRleHROb2RlIC0gdGV4dE5vZGUgdG8gZXh0cmFjdCB0aGUgTGFUZVhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNhcmV0UG9zaXRpb24gLSBTdGFydGluZyBwb3NpdGlvbiB0byBmaW5kIExhVGVYLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbGF0ZXhUYWdzIC0gT3B0aW9uYWwgcGFyYW1ldGVyIHJlcHJlc2VudGluZyB0YWdzIGJldHdlZW4gbGF0ZXggaXMgaW5zZXJ0ZWQuXG4gICAqIEl0IGhhcyB0aGUgJ29wZW4nIGF0dHJpYnV0ZSBmb3IgdGhlIG9wZW4gdGFnIGFuZCB0aGUgJ2Nsb3NlJyBhdHRyaWJ1dGUgZm9yIHRoZSBjbG9zZSB0YWcuXG4gICAqIFwiJCRcIiBieSBkZWZhdWx0LlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIDMga2V5czogJ2xhdGV4JywgJ3N0YXJ0JyBhbmQgJ2VuZCcuIE51bGwgaWYgbGF0ZXggaXMgbm90IGZvdW5kLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgZ2V0TGF0ZXhGcm9tVGV4dE5vZGUodGV4dE5vZGUsIGNhcmV0UG9zaXRpb24sIGxhdGV4VGFncykge1xuICAgIC8vIFRPRE86IFNldCBMYVRlWCBUYWdzIGFzIENvcmUgdmFyaWFibGUuIEZpeCB0aGUgY2FsbCB0byB0aGlzIGZ1bmN0aW9uICh0aGlyZCBhcmd1bWVudCkuXG4gICAgLy8gVGFncyB1c2VkIGZvciBMYVRlWCBmb3JtdWxhcy5cbiAgICBjb25zdCBkZWZhdWx0TGF0ZXhUYWdzID0ge1xuICAgICAgb3BlbjogJyQkJyxcbiAgICAgIGNsb3NlOiAnJCQnLFxuICAgIH07XG4gICAgLy8gbGF0ZXhUYWdzIGlzIGFuIG9wdGlvbmFsIHBhcmFtZXRlci4gSWYgaXMgbm90IHNldCwgdXNlIGRlZmF1bHQgbGF0ZXhUYWdzLlxuICAgIGlmICh0eXBlb2YgbGF0ZXhUYWdzID09PSAndW5kZWZpbmVkJyB8fCBsYXRleFRhZ3MgPT0gbnVsbCkge1xuICAgICAgbGF0ZXhUYWdzID0gZGVmYXVsdExhdGV4VGFncztcbiAgICB9XG4gICAgLy8gTG9va2luZyBmb3IgdGhlIGZpcnN0IHRleHROb2RlLlxuICAgIGxldCBzdGFydE5vZGUgPSB0ZXh0Tm9kZTtcblxuICAgIHdoaWxlIChzdGFydE5vZGUucHJldmlvdXNTaWJsaW5nICYmIHN0YXJ0Tm9kZS5wcmV2aW91c1NpYmxpbmcubm9kZVR5cGUgPT09IDMpIHsgLy8gVEVYVF9OT0RFLlxuICAgICAgc3RhcnROb2RlID0gc3RhcnROb2RlLnByZXZpb3VzU2libGluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuZXh0IGxhdGV4IHBvc2l0aW9uIGFuZCBub2RlIGZyb20gYSBzcGVjaWZpYyBub2RlIGFuZCBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnROb2RlIC0gTm9kZSB3aGVyZSBzZWFyY2hpbmcgbGF0ZXguXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGN1cnJlbnRQb3NpdGlvbiAtIEN1cnJlbnQgcG9zaXRpb24gaW5zaWRlIHRoZSBjdXJyZW50Tm9kZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbGF0ZXhUYWdzVG9Vc2UgLSBUYWdzIHVzZWQgYXQgbGF0ZXggYmVnaW5uaW5nIGFuZCBsYXRleCBmaW5hbC5cbiAgICAgKiBcIiQkXCIgYnkgZGVmYXVsdC5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHRhZyAtIFRhZyBjb250YWluaW5nIHRoZSBjdXJyZW50IHNlYXJjaC5cbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgY3VycmVudCBub2RlIGFuZCB0aGUgcG9zaXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TmV4dExhdGV4UG9zaXRpb24oY3VycmVudE5vZGUsIGN1cnJlbnRQb3NpdGlvbiwgdGFnKSB7XG4gICAgICBsZXQgcG9zaXRpb24gPSBjdXJyZW50Tm9kZS5ub2RlVmFsdWUuaW5kZXhPZih0YWcsIGN1cnJlbnRQb3NpdGlvbik7XG5cbiAgICAgIHdoaWxlIChwb3NpdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0U2libGluZztcblxuICAgICAgICBpZiAoIWN1cnJlbnROb2RlKSB7IC8vIFRFWFRfTk9ERS5cbiAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gTm90IGZvdW5kLlxuICAgICAgICB9XG5cbiAgICAgICAgcG9zaXRpb24gPSBjdXJyZW50Tm9kZS5ub2RlVmFsdWUgPyBjdXJyZW50Tm9kZS5ub2RlVmFsdWUuaW5kZXhPZihsYXRleFRhZ3MuY2xvc2UpIDogLTE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5vZGU6IGN1cnJlbnROb2RlLFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIG5vZGUgaXMgcHJldmlvdXMsIG9yIG5vdCwgdG8gYSBzZWNvbmQgb25lLlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFN0YXJ0IG5vZGUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBvc2l0aW9uIC0gU3RhcnQgbm9kZSBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGVuZE5vZGUgLSBFbmQgbm9kZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZW5kUG9zaXRpb24gLSBFbmQgbm9kZSBwb3NpdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3RhcnRpbmcgbm9kZSBpcyBwcmV2aW91cyB0aGFudCB0aGUgZW4gbm9kZS4gZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzUHJldmlvdXMobm9kZSwgcG9zaXRpb24sIGVuZE5vZGUsIGVuZFBvc2l0aW9uKSB7XG4gICAgICBpZiAobm9kZSA9PT0gZW5kTm9kZSkge1xuICAgICAgICByZXR1cm4gKHBvc2l0aW9uIDw9IGVuZFBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChub2RlICYmIG5vZGUgIT09IGVuZE5vZGUpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAobm9kZSA9PT0gZW5kTm9kZSk7XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0O1xuICAgIGxldCBlbmQgPSB7XG4gICAgICBub2RlOiBzdGFydE5vZGUsXG4gICAgICBwb3NpdGlvbjogMCxcbiAgICB9O1xuICAgIC8vIElzIHN1cHBvc2VkIHRoYXQgb3BlbiBhbmQgY2xvc2UgdGFncyBoYXMgdGhlIHNhbWUgbGVuZ3RoLlxuICAgIGNvbnN0IHRhZ0xlbmd0aCA9IGxhdGV4VGFncy5vcGVuLmxlbmd0aDtcbiAgICBkbyB7XG4gICAgICBzdGFydCA9IGdldE5leHRMYXRleFBvc2l0aW9uKGVuZC5ub2RlLCBlbmQucG9zaXRpb24sIGxhdGV4VGFncy5vcGVuKTtcblxuICAgICAgaWYgKHN0YXJ0ID09IG51bGwgfHwgaXNQcmV2aW91cyh0ZXh0Tm9kZSwgY2FyZXRQb3NpdGlvbiwgc3RhcnQubm9kZSwgc3RhcnQucG9zaXRpb24pKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBlbmQgPSBnZXROZXh0TGF0ZXhQb3NpdGlvbihzdGFydC5ub2RlLCBzdGFydC5wb3NpdGlvbiArIHRhZ0xlbmd0aCwgbGF0ZXhUYWdzLmNsb3NlKTtcblxuICAgICAgaWYgKGVuZCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBlbmQucG9zaXRpb24gKz0gdGFnTGVuZ3RoO1xuICAgIH0gd2hpbGUgKGlzUHJldmlvdXMoZW5kLm5vZGUsIGVuZC5wb3NpdGlvbiwgdGV4dE5vZGUsIGNhcmV0UG9zaXRpb24pKTtcblxuICAgIC8vIElzb2xhdGluZyBsYXRleC5cbiAgICBsZXQgbGF0ZXg7XG5cbiAgICBpZiAoc3RhcnQubm9kZSA9PT0gZW5kLm5vZGUpIHtcbiAgICAgIGxhdGV4ID0gc3RhcnQubm9kZS5ub2RlVmFsdWUuc3Vic3RyaW5nKHN0YXJ0LnBvc2l0aW9uICsgdGFnTGVuZ3RoLCBlbmQucG9zaXRpb24gLSB0YWdMZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IHN0YXJ0LnBvc2l0aW9uICsgdGFnTGVuZ3RoO1xuICAgICAgbGF0ZXggPSBzdGFydC5ub2RlLm5vZGVWYWx1ZS5zdWJzdHJpbmcoaW5kZXgsIHN0YXJ0Lm5vZGUubm9kZVZhbHVlLmxlbmd0aCk7XG4gICAgICBsZXQgY3VycmVudE5vZGUgPSBzdGFydC5ub2RlO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gZW5kLm5vZGUpIHtcbiAgICAgICAgICBsYXRleCArPSBlbmQubm9kZS5ub2RlVmFsdWUuc3Vic3RyaW5nKDAsIGVuZC5wb3NpdGlvbiAtIHRhZ0xlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGF0ZXggKz0gY3VycmVudE5vZGUubm9kZVZhbHVlID8gY3VycmVudE5vZGUubm9kZVZhbHVlIDogJyc7XG4gICAgICAgIH1cbiAgICAgIH0gd2hpbGUgKGN1cnJlbnROb2RlICE9PSBlbmQubm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxhdGV4LFxuICAgICAgc3RhcnROb2RlOiBzdGFydC5ub2RlLFxuICAgICAgc3RhcnRQb3NpdGlvbjogc3RhcnQucG9zaXRpb24sXG4gICAgICBlbmROb2RlOiBlbmQubm9kZSxcbiAgICAgIGVuZFBvc2l0aW9uOiBlbmQucG9zaXRpb24sXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIFRleHQgY2FjaGUuIFN0b3JlcyBhbGwgcHJvY2Vzc2VkIExhVGVYIHN0cmluZ3MgYW5kIGl0J3MgY29ycmVzcG9uZGVudCBNYXRoTUwgc3RyaW5nLlxuICogQHR5cGUge0NhY2hlfVxuICogQHN0YXRpY1xuICovXG5MYXRleC5fY2FjaGUgPSBuZXcgVGV4dENhY2hlKCk7XG4iLCIvKipcbiAqIFRoaXMgb2JqZWN0IHJlcHJlc2VudHMgYSBjdXN0b20gbGlzdGVuZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMaXN0ZW5lclxuICogQHByb3BlcnR5IHtTdHJpbmd9IExpc3RlbmVyLmV2ZW50TmFtZSAtIFRoZSBsaXN0ZW5lciBuYW1lLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gTGlzdGVuZXIuY2FsbGJhY2sgLSBUaGUgbGlzdGVuZXIgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuZXJzIHtcbiAgLyoqXG4gICAqIEBjbGFzc2Rlc2NcbiAgICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgY3VzdG9tIGxpc3RlbmVycyBtYW5hZ2VyLlxuICAgKiBAY29uc3RydWN0c1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqXG4gICAgICogQXJyYXkgY29udGFpbmluZyBhbGwgY3VzdG9tIGxpc3RlbmVycy5cbiAgICAgKiBAdHlwZSB7T2JqZWN0W119XG4gICAgICovXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBsaXN0ZW5lciB0byBMaXN0ZW5lciBjbGFzcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmVyIC0gQSBsaXN0ZW5lciBvYmplY3QuXG4gICAqL1xuICBhZGQobGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBNYXRoVHlwZSBldmVudCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSAtIGV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBldmVudCBvYmplY3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlIGlmIGV2ZW50IGhhcyBiZWVuIHByZXZlbnRlZC4gdHJ1ZSBvdGhlcndpc2UuXG4gICAqL1xuICBmaXJlKGV2ZW50TmFtZSwgZXZlbnQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdGVuZXJzLmxlbmd0aCAmJiAhZXZlbnQuY2FuY2VsbGVkOyBpICs9IDEpIHtcbiAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tpXS5ldmVudE5hbWUgPT09IGV2ZW50TmFtZSkge1xuICAgICAgICAvLyBDYWxsaW5nIGxpc3RlbmVyLlxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tpXS5jYWxsYmFjayhldmVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldmVudC5kZWZhdWx0UHJldmVudGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgbGlzdGVuZXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gRXZlbnQgbmFtZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IHRoZSBsaXN0ZW5lciBvYmplY3QuXG4gICAqL1xuICBzdGF0aWMgbmV3TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGxpc3RlbmVyID0ge307XG4gICAgbGlzdGVuZXIuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgIGxpc3RlbmVyLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9XG59XG4iLCJpbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQGNsYXNzZGVzY1xuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgY2xhc3MgdG8gbWFuYWdlIE1hdGhNTCBvYmplY3RzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRoTUwge1xuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBtYXRobWwgYXQgcG9zaXRpb24gaSBpcyBpbnNpZGUgYW4gSFRNTCBhdHRyaWJ1dGUgb3Igbm90LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIGEgc3RyaW5nIGNvbnRhaW5pbmcgTWF0aE1MIGNvZGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpIC0gIHNlYXJjaCBpbmRleC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBpcyBpbnNpZGUgYW4gSFRNTCBhdHRyaWJ1dGUuIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIHN0YXRpYyBpc01hdGhtbEluQXR0cmlidXRlKGNvbnRlbnQsIGkpIHtcbiAgICAvLyBSZWdleCA9XG4gICAgLy8gJ15bXFwnXCJdW1xcXFxzXSo9W1xcXFxzXSpbXFxcXHctXSsoW1xcXFxzXSooXCJbXlwiXSpcInxcXCdbXlxcJ10qXFwnKVtcXFxcc10qXG4gICAgLy8gPVtcXFxcc10qW1xcXFx3LV0rW1xcXFxzXSopKltcXFxcc10rZ21pPCc7XG4gICAgY29uc3QgbWF0aEF0dCA9ICdbXFwnXCJdW1xcXFxzXSo9W1xcXFxzXSpbXFxcXHctXSsnOyAvLyBcIj1hdHQgT1IgJz1hdHRcbiAgICBjb25zdCBhdHRDb250ZW50ID0gJ1wiW15cIl0qXCJ8XFwnW15cXCddKlxcJyc7IC8vIFwiYmxhYmxhXCIgT1IgJ2JsYWJsYSdcbiAgICBjb25zdCBhdHQgPSBgW1xcXFxzXSooJHthdHRDb250ZW50fSlbXFxcXHNdKj1bXFxcXHNdKltcXFxcdy1dK1tcXFxcc10qYDsgLy8gXCJibGFibGFcIj1hdHQgT1IgJ2JsYWJsYSc9YXR0XG4gICAgY29uc3QgYXR0cyA9IGAoJyR7YXR0fScpKmA7IC8vIFwiYmxhYmxhXCI9YXR0MSBcImJsYWJsYVwiPWF0dDJcbiAgICBjb25zdCByZWdleCA9IGBeJHttYXRoQXR0fSR7YXR0c31bXFxcXHNdK2dtaTxgOyAvLyBcIj1hdHQgXCJibGFibGFcIj1hdHQxIFwiYmxhYmxhXCI9YXR0MiBnbWk8IC5cbiAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFJlZ0V4cChyZWdleCk7XG5cbiAgICBjb25zdCBhY3R1YWxDb250ZW50ID0gY29udGVudC5zdWJzdHJpbmcoMCwgaSk7XG4gICAgY29uc3QgcmV2ZXJzZWQgPSBhY3R1YWxDb250ZW50LnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG4gICAgY29uc3QgZXhpc3RzID0gZXhwcmVzc2lvbi50ZXN0KHJldmVyc2VkKTtcblxuICAgIHJldHVybiBleGlzdHM7XG4gIH1cblxuICAvKipcbiAgICogRGVjb2RlcyBhbiBlbmNvZGVkIE1hdGhNTCB3aXRoIHN0YW5kYXJkIFhNTCB0YWdzLlxuICAgKiBXZSB1c2UgdGhlc2UgZW50aXRpZXMgYmVjYXVzZSBJRSBkb2Vzbid0IHN1cHBvcnQgaHRtbCBlbnRpdGllc1xuICAgKiBvbiBpdHMgYXR0cmlidXRlcyBzb21ldGltZXMuIFllcywgc29tZXRpbWVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgLSBzdHJpbmcgdG8gYmUgZGVjb2RlZC5cbiAgICogQHJldHVybiB7c3RyaW5nfSBkZWNvZGVkIHN0cmluZy5cbiAgICovXG4gIHN0YXRpYyBzYWZlWG1sRGVjb2RlKGlucHV0KSB7XG4gICAgbGV0IHsgdGFnT3BlbmVyIH0gPSBDb25zdGFudHMuc2FmZVhtbENoYXJhY3RlcnNFbnRpdGllcztcbiAgICBsZXQgeyB0YWdDbG9zZXIgfSA9IENvbnN0YW50cy5zYWZlWG1sQ2hhcmFjdGVyc0VudGl0aWVzO1xuICAgIGxldCB7IGRvdWJsZVF1b3RlIH0gPSBDb25zdGFudHMuc2FmZVhtbENoYXJhY3RlcnNFbnRpdGllcztcbiAgICBsZXQgeyByZWFsRG91YmxlUXVvdGUgfSA9IENvbnN0YW50cy5zYWZlWG1sQ2hhcmFjdGVyc0VudGl0aWVzO1xuICAgIC8vIERlY29kaW5nIGVudGl0aWVzLlxuICAgIGlucHV0ID0gaW5wdXQuc3BsaXQodGFnT3BlbmVyKS5qb2luKENvbnN0YW50cy5zYWZlWG1sQ2hhcmFjdGVycy50YWdPcGVuZXIpO1xuICAgIGlucHV0ID0gaW5wdXQuc3BsaXQodGFnQ2xvc2VyKS5qb2luKENvbnN0YW50cy5zYWZlWG1sQ2hhcmFjdGVycy50YWdDbG9zZXIpO1xuICAgIGlucHV0ID0gaW5wdXQuc3BsaXQoZG91YmxlUXVvdGUpLmpvaW4oQ29uc3RhbnRzLnNhZmVYbWxDaGFyYWN0ZXJzLmRvdWJsZVF1b3RlKTtcbiAgICAvLyBBZGRlZCB0byBmaXggcHJvYmxlbSBkdWUgdG8gaW1wb3J0IGZyb20gMS45LnguXG4gICAgaW5wdXQgPSBpbnB1dC5zcGxpdChyZWFsRG91YmxlUXVvdGUpLmpvaW4oQ29uc3RhbnRzLnNhZmVYbWxDaGFyYWN0ZXJzLnJlYWxEb3VibGVRdW90ZSk7XG5cbiAgICAvLyBCbGFja2JvYXJkLlxuICAgIGNvbnN0IHsgbHRFbGVtZW50IH0gPSBDb25zdGFudHMuc2FmZUJhZEJsYWNrYm9hcmRDaGFyYWN0ZXJzO1xuICAgIGNvbnN0IHsgZ3RFbGVtZW50IH0gPSBDb25zdGFudHMuc2FmZUJhZEJsYWNrYm9hcmRDaGFyYWN0ZXJzO1xuICAgIGNvbnN0IHsgYW1wRWxlbWVudCB9ID0gQ29uc3RhbnRzLnNhZmVCYWRCbGFja2JvYXJkQ2hhcmFjdGVycztcbiAgICBpZiAoJ193cnNfYmxhY2tib2FyZCcgaW4gd2luZG93ICYmIHdpbmRvdy5fd3JzX2JsYWNrYm9hcmQpIHtcbiAgICAgIGlucHV0ID0gaW5wdXQuc3BsaXQobHRFbGVtZW50KS5qb2luKENvbnN0YW50cy5zYWZlR29vZEJsYWNrYm9hcmRDaGFyYWN0ZXJzLmx0RWxlbWVudCk7XG4gICAgICBpbnB1dCA9IGlucHV0LnNwbGl0KGd0RWxlbWVudCkuam9pbihDb25zdGFudHMuc2FmZUdvb2RCbGFja2JvYXJkQ2hhcmFjdGVycy5ndEVsZW1lbnQpO1xuICAgICAgaW5wdXQgPSBpbnB1dC5zcGxpdChhbXBFbGVtZW50KS5qb2luKENvbnN0YW50cy5zYWZlR29vZEJsYWNrYm9hcmRDaGFyYWN0ZXJzLmFtcEVsZW1lbnQpO1xuICAgIH1cblxuICAgICh7IHRhZ09wZW5lciB9ID0gQ29uc3RhbnRzLnNhZmVYbWxDaGFyYWN0ZXJzKTtcbiAgICAoeyB0YWdDbG9zZXIgfSA9IENvbnN0YW50cy5zYWZlWG1sQ2hhcmFjdGVycyk7XG4gICAgKHsgZG91YmxlUXVvdGUgfSA9IENvbnN0YW50cy5zYWZlWG1sQ2hhcmFjdGVycyk7XG4gICAgKHsgcmVhbERvdWJsZVF1b3RlIH0gPSBDb25zdGFudHMuc2FmZVhtbENoYXJhY3RlcnMpO1xuICAgIGNvbnN0IHsgYW1wZXJzYW5kIH0gPSBDb25zdGFudHMuc2FmZVhtbENoYXJhY3RlcnM7XG4gICAgY29uc3QgeyBxdW90ZSB9ID0gQ29uc3RhbnRzLnNhZmVYbWxDaGFyYWN0ZXJzO1xuXG4gICAgLy8gRGVjb2RpbmcgY2hhcmFjdGVycy5cbiAgICBpbnB1dCA9IGlucHV0LnNwbGl0KHRhZ09wZW5lcikuam9pbihDb25zdGFudHMueG1sQ2hhcmFjdGVycy50YWdPcGVuZXIpO1xuICAgIGlucHV0ID0gaW5wdXQuc3BsaXQodGFnQ2xvc2VyKS5qb2luKENvbnN0YW50cy54bWxDaGFyYWN0ZXJzLnRhZ0Nsb3Nlcik7XG4gICAgaW5wdXQgPSBpbnB1dC5zcGxpdChkb3VibGVRdW90ZSkuam9pbihDb25zdGFudHMueG1sQ2hhcmFjdGVycy5kb3VibGVRdW90ZSk7XG4gICAgaW5wdXQgPSBpbnB1dC5zcGxpdChhbXBlcnNhbmQpLmpvaW4oQ29uc3RhbnRzLnhtbENoYXJhY3RlcnMuYW1wZXJzYW5kKTtcbiAgICBpbnB1dCA9IGlucHV0LnNwbGl0KHF1b3RlKS5qb2luKENvbnN0YW50cy54bWxDaGFyYWN0ZXJzLnF1b3RlKTtcblxuICAgIC8vIFdlIGFyZSByZXBsYWNpbmcgJCBieSAmIHdoZW4gaXRzIHBhcnQgb2YgYW4gZW50aXR5IGZvciByZXRyb2NvbXBhdGliaWxpdHkuXG4gICAgLy8gTm93LCB0aGUgc3RhbmRhcmQgaXMgcmVwbGFjZSDCpyBieSAmLlxuICAgIGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuICAgIGxldCBjdXJyZW50RW50aXR5ID0gbnVsbDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNoYXJhY3RlciA9IGlucHV0LmNoYXJBdChpKTtcbiAgICAgIGlmIChjdXJyZW50RW50aXR5ID09IG51bGwpIHtcbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PT0gJyQnKSB7XG4gICAgICAgICAgY3VycmVudEVudGl0eSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVyblZhbHVlICs9IGNoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPT09ICc7Jykge1xuICAgICAgICByZXR1cm5WYWx1ZSArPSBgJiR7Y3VycmVudEVudGl0eX1gO1xuICAgICAgICBjdXJyZW50RW50aXR5ID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyLm1hdGNoKC8oW2EtekEtWjAtOSMuXy1dIHwgJy0nKS8pKSB7IC8vIENoYXJhY3RlciBpcyBwYXJ0IG9mIGFuIGVudGl0eS5cbiAgICAgICAgY3VycmVudEVudGl0eSArPSBjaGFyYWN0ZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm5WYWx1ZSArPSBgJCR7Y3VycmVudEVudGl0eX1gOyAvLyBJcyBub3QgYW4gZW50aXR5LlxuICAgICAgICBjdXJyZW50RW50aXR5ID0gbnVsbDtcbiAgICAgICAgaSAtPSAxOyAvLyBQYXJzZSBhZ2FpbiB0aGUgY3VycmVudCBjaGFyYWN0ZXIuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuY29kZXMgYSBNYXRoTUwgd2l0aCBzdGFuZGFyZCBYTUwgdGFncyB0byBhIE1NYXRoTUwgZW5jb2RlZCB3aXRoIHNhZmUgWE1MIHRhZ3MuXG4gICAqIFdlIHVzZSB0aGVzZSBlbnRpdGllcyBiZWNhdXNlIElFIGRvZXNuJ3Qgc3VwcG9ydCBodG1sIGVudGl0aWVzIG9uIGl0cyBhdHRyaWJ1dGVzIHNvbWV0aW1lcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IC0gaW5wdXQgc3RyaW5nIHRvIGJlIGVuY29kZWRcbiAgICogQHJldHVybnMge3N0cmluZ30gZW5jb2RlZCBzdHJpbmcuXG4gICAqL1xuICBzdGF0aWMgc2FmZVhtbEVuY29kZShpbnB1dCkge1xuICAgIGNvbnN0IHsgdGFnT3BlbmVyIH0gPSBDb25zdGFudHMueG1sQ2hhcmFjdGVycztcbiAgICBjb25zdCB7IHRhZ0Nsb3NlciB9ID0gQ29uc3RhbnRzLnhtbENoYXJhY3RlcnM7XG4gICAgY29uc3QgeyBkb3VibGVRdW90ZSB9ID0gQ29uc3RhbnRzLnhtbENoYXJhY3RlcnM7XG4gICAgY29uc3QgeyBhbXBlcnNhbmQgfSA9IENvbnN0YW50cy54bWxDaGFyYWN0ZXJzO1xuICAgIGNvbnN0IHsgcXVvdGUgfSA9IENvbnN0YW50cy54bWxDaGFyYWN0ZXJzO1xuXG4gICAgaW5wdXQgPSBpbnB1dC5zcGxpdCh0YWdPcGVuZXIpLmpvaW4oQ29uc3RhbnRzLnNhZmVYbWxDaGFyYWN0ZXJzLnRhZ09wZW5lcik7XG4gICAgaW5wdXQgPSBpbnB1dC5zcGxpdCh0YWdDbG9zZXIpLmpvaW4oQ29uc3RhbnRzLnNhZmVYbWxDaGFyYWN0ZXJzLnRhZ0Nsb3Nlcik7XG4gICAgaW5wdXQgPSBpbnB1dC5zcGxpdChkb3VibGVRdW90ZSkuam9pbihDb25zdGFudHMuc2FmZVhtbENoYXJhY3RlcnMuZG91YmxlUXVvdGUpO1xuICAgIGlucHV0ID0gaW5wdXQuc3BsaXQoYW1wZXJzYW5kKS5qb2luKENvbnN0YW50cy5zYWZlWG1sQ2hhcmFjdGVycy5hbXBlcnNhbmQpO1xuICAgIGlucHV0ID0gaW5wdXQuc3BsaXQocXVvdGUpLmpvaW4oQ29uc3RhbnRzLnNhZmVYbWxDaGFyYWN0ZXJzLnF1b3RlKTtcblxuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBzcGVjaWFsIHN5bWJvbHMgKD4gMTI4KSB0byBlbnRpdGllcyBhbmQgcmVwbGFjZXMgYWxsIHRleHR1YWxcbiAgICogZW50aXRpZXMgYnkgaXRzIG51bWJlciBlbnRpdGllcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGhtbCAtIE1hdGhNTCBzdHJpbmcgY29udGFpbmluZyAtIG9yIG5vdCAtIHNwZWNpYWwgc3ltYm9sc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBNYXRoTUwgd2l0aCBhbGwgdGV4dHVhbCBlbnRpdGllcyByZXBsYWNlZC5cbiAgICovXG4gIHN0YXRpYyBtYXRoTUxFbnRpdGllcyhtYXRobWwpIHtcbiAgICBsZXQgdG9SZXR1cm4gPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0aG1sLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjaGFyYWN0ZXIgPSBtYXRobWwuY2hhckF0KGkpO1xuXG4gICAgICAvLyBQYXJzaW5nID4gMTI4IGNoYXJhY3RlcnMuXG4gICAgICBpZiAobWF0aG1sLmNvZGVQb2ludEF0KGkpID4gMTI4KSB7XG4gICAgICAgIHRvUmV0dXJuICs9IGAmIyR7bWF0aG1sLmNvZGVQb2ludEF0KGkpfTtgO1xuICAgICAgICAvLyBGb3IgVVRGLTMyIGNoYXJhY3RlcnMgd2UgbmVlZCB0byBtb3ZlIHRoZSBpbmRleCBvbmUgcG9zaXRpb24uXG4gICAgICAgIGlmIChtYXRobWwuY29kZVBvaW50QXQoaSkgPiAweGZmZmYpIHtcbiAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAnJicpIHtcbiAgICAgICAgY29uc3QgZW5kID0gbWF0aG1sLmluZGV4T2YoJzsnLCBpICsgMSk7XG4gICAgICAgIGlmIChlbmQgPj0gMCkge1xuICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gbWF0aG1sLnN1YnN0cmluZyhpLCBlbmQgKyAxKTtcbiAgICAgICAgICB0b1JldHVybiArPSBgJiMke1V0aWwuZml4ZWRDaGFyQ29kZUF0KChjb250YWluZXIudGV4dENvbnRlbnQgfHwgY29udGFpbmVyLmlubmVyVGV4dCksIDApfTtgO1xuICAgICAgICAgIGkgPSBlbmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9SZXR1cm4gKz0gY2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b1JldHVybiArPSBjaGFyYWN0ZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGN1c3RvbSBlZGl0b3IgbmFtZSB3aXRoIHRoZSBwcmVmaXggd3JzXyB0byBhIE1hdGhNTCBjbGFzcyBhdHRyaWJ1dGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXRobWwgLSBhIE1hdGhNTCBzdHJpbmcgY3JlYXRlZCB3aXRoIGEgY3VzdG9tIGVkaXRvciwgbGlrZSBjaGVtaXN0cnkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjdXN0b21FZGl0b3IgLSBjdXN0b20gZWRpdG9yIG5hbWUuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IE1hdGhNTCBzdHJpbmcgd2l0aCBoaXMgY2xhc3MgY29udGFpbmluZyB0aGUgZWRpdG9yIHRvb2xiYXIgc3RyaW5nLlxuICAgKi9cbiAgc3RhdGljIGFkZEN1c3RvbUVkaXRvckNsYXNzQXR0cmlidXRlKG1hdGhtbCwgY3VzdG9tRWRpdG9yKSB7XG4gICAgbGV0IHRvUmV0dXJuID0gJyc7XG5cbiAgICBjb25zdCBzdGFydCA9IG1hdGhtbC5pbmRleE9mKCc8bWF0aCcpO1xuICAgIGlmIChzdGFydCA9PT0gMCkge1xuICAgICAgY29uc3QgZW5kID0gbWF0aG1sLmluZGV4T2YoJz4nKTtcbiAgICAgIGlmIChtYXRobWwuaW5kZXhPZignY2xhc3MnKSA9PT0gLTEpIHtcbiAgICAgICAgLy8gQWRkaW5nIGN1c3RvbSBlZGl0b3IgdHlwZS5cbiAgICAgICAgdG9SZXR1cm4gPSBgJHttYXRobWwuc3Vic3RyKHN0YXJ0LCBlbmQpfSBjbGFzcz1cIndyc18ke2N1c3RvbUVkaXRvcn1cIj5gO1xuICAgICAgICB0b1JldHVybiArPSBtYXRobWwuc3Vic3RyKGVuZCArIDEsIG1hdGhtbC5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRobWw7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgY3VzdG9tIGVkaXRvciBuYW1lIGZyb20gdGhlIE1hdGhNTCBjbGFzcyBhdHRyaWJ1dGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXRobWwgLSBhIE1hdGhNTCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjdXN0b21FZGl0b3IgLSBjdXN0b20gZWRpdG9yIG5hbWUuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBpbnB1dCBNYXRoTUwgd2l0aG91dCBjdXN0b21FZGl0b3IgbmFtZSBpbiBoaXMgY2xhc3MuXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlQ3VzdG9tRWRpdG9yQ2xhc3NBdHRyaWJ1dGUobWF0aG1sLCBjdXN0b21FZGl0b3IpIHtcbiAgICAvLyBEaXNjYXJkIE1hdGhNTCB3aXRob3V0IHRoZSBzcGVjaWZpZWQgY2xhc3MuXG4gICAgaWYgKG1hdGhtbC5pbmRleE9mKCdjbGFzcycpID09PSAtMSB8fCBtYXRobWwuaW5kZXhPZihgd3JzXyR7Y3VzdG9tRWRpdG9yfWApID09PSAtMSkge1xuICAgICAgcmV0dXJuIG1hdGhtbDtcbiAgICB9XG5cbiAgICAvLyBUcml2aWFsIGNhc2U6IGNsYXNzIGF0dHJpYnV0ZSB2YWx1ZSBlcXVhbCB0byBlZGl0b3IgbmFtZS4gVGhlblxuICAgIC8vIGNsYXNzIGF0dHJpYnV0ZSBpcyByZW1vdmVkLlxuICAgIC8vIEZpcnN0IHRyeSB0byByZW1vdmUgaXQgd2l0aCBhIHNwYWNlIGJlZm9yZSBpZiB0aGVyZSBpcyBvbmVcbiAgICAvLyBPdGhlcndpc2Ugd2l0aG91dCB0aGUgc3BhY2VcbiAgICBpZiAobWF0aG1sLmluZGV4T2YoYCBjbGFzcz1cIndyc18ke2N1c3RvbUVkaXRvcn1cImApICE9PSAtMSkge1xuICAgICAgcmV0dXJuIG1hdGhtbC5yZXBsYWNlKGAgY2xhc3M9XCJ3cnNfJHtjdXN0b21FZGl0b3J9XCJgLCAnJyk7XG4gICAgfSBlbHNlIGlmIChtYXRobWwuaW5kZXhPZihgY2xhc3M9XCJ3cnNfJHtjdXN0b21FZGl0b3J9XCJgKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBtYXRobWwucmVwbGFjZShgY2xhc3M9XCJ3cnNfJHtjdXN0b21FZGl0b3J9XCJgLCAnJyk7XG4gICAgfVxuXG4gICAgLy8gTm9uIFRyaXZpYWwgY2FzZTogY2xhc3MgYXR0cmlidXRlIGNvbnRhaW5zIGVkaXRvciBuYW1lLlxuICAgIHJldHVybiBtYXRobWwucmVwbGFjZShgd3JzXyR7Y3VzdG9tRWRpdG9yfWAsICcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFubm90YXRpb24gdGFnIGluIE1hdGhNTCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWF0aG1sIC0gdmFsaWQgTWF0aE1MLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29udGVudCAtIHZhbHVlIHRvIHB1dCBpbnNpZGUgYW5ub3RhdGlvbiB0YWcuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhbm5vdGF0aW9uRW5jb2RpbmcgLSBhbm5vdGF0aW9uIGVuY29kaW5nLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSAtICdtYXRobWwnIHdpdGggYW4gYW5ub3RhdGlvbiB0aGF0IGNvbnRhaW5zXG4gICAqICdjb250ZW50JyBhbmQgZW5jb2RpbmcgJ2VuY29kaW5nJy5cbiAgICovXG4gIHN0YXRpYyBhZGRBbm5vdGF0aW9uKG1hdGhtbCwgY29udGVudCwgYW5ub3RhdGlvbkVuY29kaW5nKSB7XG4gICAgLy8gSWYgY29udGFpbnMgYW5ub3RhdGlvbiwgYWxzbyBjb250YWlucyBzZW1hbnRpY3MgdGFnLlxuICAgIGNvbnN0IGNvbnRhaW5zQW5ub3RhdGlvbiA9IG1hdGhtbC5pbmRleE9mKCc8YW5ub3RhdGlvbicpO1xuXG4gICAgbGV0IG1hdGhtbFdpdGhBbm5vdGF0aW9uID0gJyc7XG4gICAgaWYgKGNvbnRhaW5zQW5ub3RhdGlvbiAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IGNsb3NlU2VtYW50aWNzSW5kZXggPSBtYXRobWwuaW5kZXhPZignPC9zZW1hbnRpY3M+Jyk7XG4gICAgICBtYXRobWxXaXRoQW5ub3RhdGlvbiA9IGAke21hdGhtbC5zdWJzdHJpbmcoMCwgY2xvc2VTZW1hbnRpY3NJbmRleCl9PGFubm90YXRpb24gZW5jb2Rpbmc9XCIke2Fubm90YXRpb25FbmNvZGluZ31cIj4ke2NvbnRlbnR9PC9hbm5vdGF0aW9uPiR7bWF0aG1sLnN1YnN0cmluZyhjbG9zZVNlbWFudGljc0luZGV4KX1gO1xuICAgIH0gZWxzZSBpZiAoTWF0aE1MLmlzRW1wdHkobWF0aG1sKSkge1xuICAgICAgY29uc3QgZW5kSW5kZXhJbmxpbmUgPSBtYXRobWwuaW5kZXhPZignLz4nKTtcbiAgICAgIGNvbnN0IGVuZEluZGV4Tm9uSW5saW5lID0gbWF0aG1sLmluZGV4T2YoJz4nKTtcbiAgICAgIGNvbnN0IGVuZEluZGV4ID0gZW5kSW5kZXhOb25JbmxpbmUgPT09IGVuZEluZGV4SW5saW5lID8gZW5kSW5kZXhJbmxpbmUgOiBlbmRJbmRleE5vbklubGluZTtcbiAgICAgIG1hdGhtbFdpdGhBbm5vdGF0aW9uID0gYCR7bWF0aG1sLnN1YnN0cmluZygwLCBlbmRJbmRleCl9PjxzZW1hbnRpY3M+PGFubm90YXRpb24gZW5jb2Rpbmc9XCIke2Fubm90YXRpb25FbmNvZGluZ31cIj4ke2NvbnRlbnR9PC9hbm5vdGF0aW9uPjwvc2VtYW50aWNzPjwvbWF0aD5gO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiZWdpbk1hdGhNTENvbnRlbnQgPSBtYXRobWwuaW5kZXhPZignPicpICsgMTtcbiAgICAgIGNvbnN0IGVuZE1hdGhtbENvbnRlbnQgPSBtYXRobWwubGFzdEluZGV4T2YoJzwvbWF0aD4nKTtcbiAgICAgIGNvbnN0IG1hdGhtbENvbnRlbnQgPSBtYXRobWwuc3Vic3RyaW5nKGJlZ2luTWF0aE1MQ29udGVudCwgZW5kTWF0aG1sQ29udGVudCk7XG4gICAgICBtYXRobWxXaXRoQW5ub3RhdGlvbiA9IGAke21hdGhtbC5zdWJzdHJpbmcoMCwgYmVnaW5NYXRoTUxDb250ZW50KX08c2VtYW50aWNzPjxtcm93PiR7bWF0aG1sQ29udGVudH08L21yb3c+PGFubm90YXRpb24gZW5jb2Rpbmc9XCIke2Fubm90YXRpb25FbmNvZGluZ31cIj4ke2NvbnRlbnR9PC9hbm5vdGF0aW9uPjwvc2VtYW50aWNzPjwvbWF0aD5gOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0aG1sV2l0aEFubm90YXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBzcGVjaWZpYyBhbm5vdGF0aW9uIHRhZyBpbiBNYXRoTUwgZWxlbWVudC5cbiAgICogSW4gY2FzZSBvZiByZW1vdmUgdGhlIHVuaXF1ZSBhbm5vdGF0aW9uLCBhbHNvIGlzIHJlbW92ZWQgc2VtYW50aWNzIHRhZy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1hdGhtbCAtIHZhbGlkIE1hdGhNTC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGFubm90YXRpb25FbmNvZGluZyAtIGFubm90YXRpb24gZW5jb2RpbmcgdG8gcmVtb3ZlLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSAtICdtYXRobWwnIHdpdGhvdXQgdGhlIGFubm90YXRpb24gZW5jb2Rpbmcgc3BlY2lmaWVkLlxuICAgKi9cbiAgc3RhdGljIHJlbW92ZUFubm90YXRpb24obWF0aG1sLCBhbm5vdGF0aW9uRW5jb2RpbmcpIHtcbiAgICBsZXQgbWF0aG1sV2l0aG91dEFubm90YXRpb24gPSBtYXRobWw7XG4gICAgY29uc3Qgb3BlbkFubm90YXRpb25UYWcgPSBgPGFubm90YXRpb24gZW5jb2Rpbmc9XCIke2Fubm90YXRpb25FbmNvZGluZ31cIj5gO1xuICAgIGNvbnN0IGNsb3NlQW5ub3RhdGlvblRhZyA9ICc8L2Fubm90YXRpb24+JztcbiAgICBjb25zdCBzdGFydEFubm90YXRpb25JbmRleCA9IG1hdGhtbC5pbmRleE9mKG9wZW5Bbm5vdGF0aW9uVGFnKTtcbiAgICBpZiAoc3RhcnRBbm5vdGF0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICBsZXQgZGlmZmVyZW50QW5ub3RhdGlvbkZvdW5kID0gZmFsc2U7XG4gICAgICBsZXQgZGlmZmVyZW50QW5ub3RhdGlvbkluZGV4ID0gbWF0aG1sLmluZGV4T2YoJzxhbm5vdGF0aW9uJyk7XG4gICAgICB3aGlsZSAoZGlmZmVyZW50QW5ub3RhdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICBpZiAoZGlmZmVyZW50QW5ub3RhdGlvbkluZGV4ICE9PSBzdGFydEFubm90YXRpb25JbmRleCkge1xuICAgICAgICAgIGRpZmZlcmVudEFubm90YXRpb25Gb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZGlmZmVyZW50QW5ub3RhdGlvbkluZGV4ID0gbWF0aG1sLmluZGV4T2YoJzxhbm5vdGF0aW9uJywgZGlmZmVyZW50QW5ub3RhdGlvbkluZGV4ICsgMSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkaWZmZXJlbnRBbm5vdGF0aW9uRm91bmQpIHtcbiAgICAgICAgY29uc3QgY2xvc2VJbmRleCA9IG1hdGhtbC5pbmRleE9mKGNsb3NlQW5ub3RhdGlvblRhZywgc3RhcnRBbm5vdGF0aW9uSW5kZXgpO1xuICAgICAgICBjb25zdCBlbmRBbm5vdGF0aW9uSW5kZXggPSBjbG9zZUluZGV4ICsgY2xvc2VBbm5vdGF0aW9uVGFnLmxlbmd0aDtcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IG1hdGhtbC5zdWJzdHJpbmcoMCwgc3RhcnRBbm5vdGF0aW9uSW5kZXgpO1xuICAgICAgICBtYXRobWxXaXRob3V0QW5ub3RhdGlvbiA9IHN0YXJ0SW5kZXggKyBtYXRobWwuc3Vic3RyaW5nKGVuZEFubm90YXRpb25JbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXRobWxXaXRob3V0QW5ub3RhdGlvbiA9IE1hdGhNTC5yZW1vdmVTZW1hbnRpY3MobWF0aG1sKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0aG1sV2l0aG91dEFubm90YXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBzZW1hbnRpY3MgdGFnIHRvIG1hdGhtbC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGhtbCAtIE1hdGhNTCBzdHJpbmcuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gJ21hdGhtbCcgd2l0aG91dCBzZW1hbnRpY3MgdGFnLlxuICAgKi9cbiAgc3RhdGljIHJlbW92ZVNlbWFudGljcyhtYXRobWwpIHtcbiAgICBjb25zdCBtYXRoVGFnRW5kID0gJzwvbWF0aD4nO1xuICAgIGNvbnN0IG9wZW5TZW1hbnRpY3MgPSAnPHNlbWFudGljcz4nO1xuICAgIGNvbnN0IG9wZW5Bbm5vdGF0aW9uID0gJzxhbm5vdGF0aW9uJztcblxuICAgIGxldCBtYXRobWxXaXRob3V0U2VtYW50aWNzID0gbWF0aG1sO1xuICAgIGNvbnN0IHN0YXJ0U2VtYW50aWNzID0gbWF0aG1sLmluZGV4T2Yob3BlblNlbWFudGljcyk7XG4gICAgaWYgKHN0YXJ0U2VtYW50aWNzICE9PSAtMSkge1xuICAgICAgY29uc3Qgc3RhcnRBbm5vdGF0aW9uID0gbWF0aG1sLmluZGV4T2Yob3BlbkFubm90YXRpb24sIHN0YXJ0U2VtYW50aWNzICsgb3BlblNlbWFudGljcy5sZW5ndGgpO1xuICAgICAgaWYgKHN0YXJ0QW5ub3RhdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgbWF0aG1sV2l0aG91dFNlbWFudGljcyA9IG1hdGhtbC5zdWJzdHJpbmcoMCwgc3RhcnRTZW1hbnRpY3MpXG4gICAgICAgICsgbWF0aG1sLnN1YnN0cmluZyhzdGFydFNlbWFudGljcyArIG9wZW5TZW1hbnRpY3MubGVuZ3RoLCBzdGFydEFubm90YXRpb24pICsgbWF0aFRhZ0VuZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0aG1sV2l0aG91dFNlbWFudGljcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIGFsbCB4bWwgbWF0aG1sIG9jdXJyZW5jZXMgdGhhdCBjb250YWluIHNlbWFudGljcyB0byB0aGUgc2FtZVxuICAgKiB4bWwgbWF0aG1sIG9jdXJyZW5jZXMgd2l0aG91dCBzZW1hbnRpY3MuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gc3RyaW5nIHRoYXQgY2FuIGNvbnRhaW4geG1sIG1hdGhtbCBvY3VycmVuY2VzLlxuICAgKiBAcGFyYW0ge0NvbnN0YW50c30gW2NoYXJhY3RlcnNdIC0gQ29uc3RhbnQgb2JqZWN0IGNvbnRhaW5pbmcgeG1sQ2hhcmFjdGVyc1xuICAgKiBvciBzYWZlWG1sQ2hhcmFjdGVycyByZWxhdGlvbi5cbiAgICogeG1sQ2hhcmFjdGVycyBieSBkZWZhdWx0LlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtICd0ZXh0JyB3aXRoIGFsbCB4bWwgbWF0aG1sIG9jdXJyZW5jZXMgd2l0aG91dCBhbm5vdGF0aW9uIHRhZy5cbiAgICovXG4gIHN0YXRpYyByZW1vdmVTZW1hbnRpY3NPY3VycmVuY2VzKHRleHQsIGNoYXJhY3RlcnMgPSBDb25zdGFudHMueG1sQ2hhcmFjdGVycykge1xuICAgIGNvbnN0IG1hdGhUYWdTdGFydCA9IGAke2NoYXJhY3RlcnMudGFnT3BlbmVyfW1hdGhgO1xuICAgIGNvbnN0IG1hdGhUYWdFbmQgPSBgJHtjaGFyYWN0ZXJzLnRhZ09wZW5lcn0vbWF0aCR7Y2hhcmFjdGVycy50YWdDbG9zZXJ9YDtcbiAgICBjb25zdCBtYXRoVGFnRW5kbGluZSA9IGAvJHtjaGFyYWN0ZXJzLnRhZ0Nsb3Nlcn1gO1xuICAgIGNvbnN0IHsgdGFnQ2xvc2VyIH0gPSBjaGFyYWN0ZXJzO1xuICAgIGNvbnN0IHNlbWFudGljc1RhZ1N0YXJ0ID0gYCR7Y2hhcmFjdGVycy50YWdPcGVuZXJ9c2VtYW50aWNzJHtjaGFyYWN0ZXJzLnRhZ0Nsb3Nlcn1gO1xuICAgIGNvbnN0IGFubm90YXRpb25UYWdTdGFydCA9IGAke2NoYXJhY3RlcnMudGFnT3BlbmVyfWFubm90YXRpb24gZW5jb2Rpbmc9YDtcblxuICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICBsZXQgc3RhcnQgPSB0ZXh0LmluZGV4T2YobWF0aFRhZ1N0YXJ0KTtcbiAgICBsZXQgZW5kID0gMDtcbiAgICB3aGlsZSAoc3RhcnQgIT09IC0xKSB7XG4gICAgICBvdXRwdXQgKz0gdGV4dC5zdWJzdHJpbmcoZW5kLCBzdGFydCk7XG5cbiAgICAgIC8vIE1hdGhNTCBjYW4gYmUgd3JpdHRlbiBhcyAnPG1hdGg+PC9tYXRoPicgb3IgJzxtYXRoIC8+Jy5cbiAgICAgIGNvbnN0IG1hdGhUYWdFbmRJbmRleCA9IHRleHQuaW5kZXhPZihtYXRoVGFnRW5kLCBzdGFydCk7XG4gICAgICBjb25zdCBtYXRoVGFnRW5kbGluZUluZGV4ID0gdGV4dC5pbmRleE9mKG1hdGhUYWdFbmRsaW5lLCBzdGFydCk7XG4gICAgICBjb25zdCBmaXJzdFRhZ0Nsb3NlciA9IHRleHQuaW5kZXhPZih0YWdDbG9zZXIsIHN0YXJ0KTtcbiAgICAgIGlmIChtYXRoVGFnRW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgIGVuZCA9IG1hdGhUYWdFbmRJbmRleDtcbiAgICAgIH0gZWxzZSBpZiAobWF0aFRhZ0VuZGxpbmVJbmRleCA9PT0gZmlyc3RUYWdDbG9zZXIgLSAxKSB7XG4gICAgICAgIGVuZCA9IG1hdGhUYWdFbmRsaW5lSW5kZXg7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlbWFudGljc0luZGV4ID0gdGV4dC5pbmRleE9mKHNlbWFudGljc1RhZ1N0YXJ0LCBzdGFydCk7XG4gICAgICBpZiAoc2VtYW50aWNzSW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IG1tbFRhZ1N0YXJ0ID0gdGV4dC5zdWJzdHJpbmcoc3RhcnQsIHNlbWFudGljc0luZGV4KTtcbiAgICAgICAgY29uc3QgYW5ub3RhdGlvbkluZGV4ID0gdGV4dC5pbmRleE9mKGFubm90YXRpb25UYWdTdGFydCwgc3RhcnQpO1xuICAgICAgICBpZiAoYW5ub3RhdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBzZW1hbnRpY3NJbmRleCArIHNlbWFudGljc1RhZ1N0YXJ0Lmxlbmd0aDtcbiAgICAgICAgICBjb25zdCBtbWxDb250ZW50ID0gdGV4dC5zdWJzdHJpbmcoc3RhcnRJbmRleCwgYW5ub3RhdGlvbkluZGV4KTtcbiAgICAgICAgICBvdXRwdXQgKz0gbW1sVGFnU3RhcnQgKyBtbWxDb250ZW50ICsgbWF0aFRhZ0VuZDtcbiAgICAgICAgICBzdGFydCA9IHRleHQuaW5kZXhPZihtYXRoVGFnU3RhcnQsIHN0YXJ0ICsgbWF0aFRhZ1N0YXJ0Lmxlbmd0aCk7XG4gICAgICAgICAgZW5kICs9IG1hdGhUYWdFbmQubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgICAgIHN0YXJ0ID0gdGV4dC5pbmRleE9mKG1hdGhUYWdTdGFydCwgc3RhcnQgKyBtYXRoVGFnU3RhcnQubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gdGV4dC5pbmRleE9mKG1hdGhUYWdTdGFydCwgc3RhcnQgKyBtYXRoVGFnU3RhcnQubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvdXRwdXQgKz0gdGV4dC5zdWJzdHJpbmcoZW5kLCB0ZXh0Lmxlbmd0aCk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYSBNYXRoTUwgY29udGFpbnMgYSBjZXJ0YWluIGNsYXNzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWF0aE1MIC0gaW5wdXQgTWF0aE1MLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIC0gY2xhc3NOYW1lLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgaW5wdXQgTWF0aE1MIGNvbnRhaW5zIHRoZSBpbnB1dCBjbGFzcy5cbiAgICogZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgY29udGFpbkNsYXNzKG1hdGhNTCwgY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgY2xhc3NJbmRleCA9IG1hdGhNTC5pbmRleE9mKCdjbGFzcycpO1xuICAgIGlmIChjbGFzc0luZGV4ID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBjbGFzc1RhZ0VuZEluZGV4ID0gbWF0aE1MLmluZGV4T2YoJz4nLCBjbGFzc0luZGV4KTtcbiAgICBjb25zdCBjbGFzc1RhZyA9IG1hdGhNTC5zdWJzdHJpbmcoY2xhc3NJbmRleCwgY2xhc3NUYWdFbmRJbmRleCk7XG4gICAgaWYgKGNsYXNzVGFnLmluZGV4T2YoY2xhc3NOYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIG1hdGhtbCBpcyBlbXB0eS4gT3RoZXJ3aXNlLCBmYWxzZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGhtbCAtIHZhbGlkIE1hdGhNTCB3aXRoIHN0YW5kYXJkIFhNTCB0YWdzLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSB0cnVlIGlmIG1hdGhtbCBpcyBlbXB0eS4gT3RoZXJ3aXNlLCBmYWxzZS5cbiAgICovXG4gIHN0YXRpYyBpc0VtcHR5KG1hdGhtbCkge1xuICAgIC8vIE1hdGhNTCBjYW4gaGF2ZSB0aGUgc2hhcGUgPG1hdGg+PC9tYXRoPiBvciAnPG1hdGggLz4nLlxuICAgIGNvbnN0IGNsb3NlVGFnID0gJz4nO1xuICAgIGNvbnN0IGNsb3NlVGFnSW5saW5lID0gJy8+JztcbiAgICBjb25zdCBmaXJzdENsb3NlVGFnSW5kZXggPSBtYXRobWwuaW5kZXhPZihjbG9zZVRhZyk7XG4gICAgY29uc3QgZmlyc3RDbG9zZVRhZ0lubGluZUluZGV4ID0gbWF0aG1sLmluZGV4T2YoY2xvc2VUYWdJbmxpbmUpO1xuICAgIGxldCBlbXB0eSA9IGZhbHNlO1xuICAgIC8vIE1hdGhNTCBpcyBhbHdheXMgZW1wdHkgaW4gdGhlIHNlY29uZCBzaGFwZS5cbiAgICBpZiAoZmlyc3RDbG9zZVRhZ0lubGluZUluZGV4ICE9PSAtMSkge1xuICAgICAgaWYgKGZpcnN0Q2xvc2VUYWdJbmxpbmVJbmRleCA9PT0gZmlyc3RDbG9zZVRhZ0luZGV4IC0gMSkge1xuICAgICAgICBlbXB0eSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWF0aE1MIGlzIGFsd2F5cyBlbXB0eSBpbiB0aGUgZmlyc3Qgc2hhcGUgd2hlbiB0aGVyZSBhcmVuJ3QgZWxlbWVudHNcbiAgICAvLyBiZXR3ZWVuIG1hdGggdGFncy5cbiAgICBpZiAoIWVtcHR5KSB7XG4gICAgICBjb25zdCBtYXRoVGFnRW5kUmVnZXggPSBuZXcgUmVnRXhwKCc8LyguKzopP21hdGg+Jyk7XG4gICAgICBjb25zdCBtYXRoVGFnRW5kQXJyYXkgPSBtYXRoVGFnRW5kUmVnZXguZXhlYyhtYXRobWwpO1xuICAgICAgaWYgKG1hdGhUYWdFbmRBcnJheSkge1xuICAgICAgICBlbXB0eSA9IGZpcnN0Q2xvc2VUYWdJbmRleCArIDEgPT09IG1hdGhUYWdFbmRBcnJheS5pbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICAvKipcbiAgICogRW5jb2RlcyBodG1sIGVudGl0aWVzIGluc2lkZSBwcm9wZXJ0aWVzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWF0aG1sIC0gdmFsaWQgTWF0aE1MIHdpdGggc3RhbmRhcmQgWE1MIHRhZ3MuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IC0gJ21hdGhtbCcgd2l0aCBwcm9wZXJ0eSBlbnRpdGllcyBlbmNvZGVkLlxuICAgKi9cbiAgc3RhdGljIGVuY29kZVByb3BlcnRpZXMobWF0aG1sKSB7XG4gICAgLy8gU2VhcmNoIGFsbCB0aGUgcHJvcGVydGllcy5cbiAgICBjb25zdCByZWdleCA9IC9cXHcrPVwiLio/XCIvZztcbiAgICAvLyBFbmNvZGUgaHRtbCBlbnRpdGllcy5cbiAgICBjb25zdCByZXBsYWNlciA9IChtYXRjaCkgPT4ge1xuICAgICAgLy8gSXQgaGFzIHRoZSBzaGFwZTpcbiAgICAgIC8vIDxtYXRoIHByb3BlcnR5T25lPVwic29tZXRoaW5nT25lXCI+PGNoaWxkcmVuIHByb3BlcnR5VHdvPVwic29tZXRoaW5nVHdvXCI+PC9jaGlsZHJlbj48L21hdGg+LlxuICAgICAgY29uc3QgcXVvdGVJbmRleCA9IG1hdGNoLmluZGV4T2YoJ1wiJyk7XG4gICAgICBjb25zdCBwcm9wZXJ0eVZhbHVlID0gbWF0Y2guc3Vic3RyaW5nKHF1b3RlSW5kZXggKyAxLCBtYXRjaC5sZW5ndGggLSAxKTtcbiAgICAgIGNvbnN0IHByb3BlcnR5VmFsdWVFbmNvZGVkID0gVXRpbC5odG1sRW50aXRpZXMocHJvcGVydHlWYWx1ZSk7XG4gICAgICBjb25zdCBtYXRjaEVuY29kZWQgPSBgJHttYXRjaC5zdWJzdHJpbmcoMCwgcXVvdGVJbmRleCArIDEpfSR7cHJvcGVydHlWYWx1ZUVuY29kZWR9XCJgO1xuICAgICAgcmV0dXJuIG1hdGNoRW5jb2RlZDtcbiAgICB9O1xuXG4gICAgY29uc3QgbWF0aG1sRW5jb2RlZCA9IG1hdGhtbC5yZXBsYWNlKHJlZ2V4LCByZXBsYWNlcik7XG4gICAgcmV0dXJuIG1hdGhtbEVuY29kZWQ7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG52YXIgbWQ1O1xuZXhwb3J0IGRlZmF1bHQgbWQ1O1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgSHhPdmVycmlkZXMgPSBmdW5jdGlvbiAoKSB7IH1cbiAgSHhPdmVycmlkZXMuX19uYW1lX18gPSB0cnVlO1xuICBIeE92ZXJyaWRlcy5kYXRlU3RyID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICB2YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgdmFyIGQgPSBkYXRlLmdldERhdGUoKTtcbiAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICB2YXIgbWkgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICB2YXIgcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIChtIDwgMTAgPyBcIjBcIiArIG0gOiBcIlwiICsgbSkgKyBcIi1cIiArIChkIDwgMTAgPyBcIjBcIiArIGQgOiBcIlwiICsgZCkgKyBcIiBcIiArIChoIDwgMTAgPyBcIjBcIiArIGggOiBcIlwiICsgaCkgKyBcIjpcIiArIChtaSA8IDEwID8gXCIwXCIgKyBtaSA6IFwiXCIgKyBtaSkgKyBcIjpcIiArIChzIDwgMTAgPyBcIjBcIiArIHMgOiBcIlwiICsgcyk7XG4gIH1cbiAgSHhPdmVycmlkZXMuc3RyRGF0ZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgc3dpdGNoIChzLmxlbmd0aCkge1xuICAgICAgY2FzZSA4OlxuICAgICAgICB2YXIgayA9IHMuc3BsaXQoXCI6XCIpO1xuICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGQuc2V0VGltZSgwKTtcbiAgICAgICAgZC5zZXRVVENIb3VycyhrWzBdKTtcbiAgICAgICAgZC5zZXRVVENNaW51dGVzKGtbMV0pO1xuICAgICAgICBkLnNldFVUQ1NlY29uZHMoa1syXSk7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgY2FzZSAxMDpcbiAgICAgICAgdmFyIGsgPSBzLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGtbMF0sIGtbMV0gLSAxLCBrWzJdLCAwLCAwLCAwKTtcbiAgICAgIGNhc2UgMTk6XG4gICAgICAgIHZhciBrID0gcy5zcGxpdChcIiBcIik7XG4gICAgICAgIHZhciB5ID0ga1swXS5zcGxpdChcIi1cIik7XG4gICAgICAgIHZhciB0ID0ga1sxXS5zcGxpdChcIjpcIik7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh5WzBdLCB5WzFdIC0gMSwgeVsyXSwgdFswXSwgdFsxXSwgdFsyXSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBcIkludmFsaWQgZGF0ZSBmb3JtYXQgOiBcIiArIHM7XG4gICAgfVxuICB9XG4gIEh4T3ZlcnJpZGVzLmNjYSA9IGZ1bmN0aW9uIChzLCBpbmRleCkge1xuICAgIHZhciB4ID0gcy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICBpZiAoeCAhPSB4KSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiB4O1xuICB9XG4gIEh4T3ZlcnJpZGVzLnN1YnN0ciA9IGZ1bmN0aW9uIChzLCBwb3MsIGxlbikge1xuICAgIGlmIChwb3MgIT0gbnVsbCAmJiBwb3MgIT0gMCAmJiBsZW4gIT0gbnVsbCAmJiBsZW4gPCAwKSByZXR1cm4gXCJcIjtcbiAgICBpZiAobGVuID09IG51bGwpIGxlbiA9IHMubGVuZ3RoO1xuICAgIGlmIChwb3MgPCAwKSB7XG4gICAgICBwb3MgPSBzLmxlbmd0aCArIHBvcztcbiAgICAgIGlmIChwb3MgPCAwKSBwb3MgPSAwO1xuICAgIH0gZWxzZSBpZiAobGVuIDwgMCkgbGVuID0gcy5sZW5ndGggKyBsZW4gLSBwb3M7XG4gICAgcmV0dXJuIHMuc3Vic3RyKHBvcywgbGVuKTtcbiAgfVxuICBIeE92ZXJyaWRlcy5yZW1vdmUgPSBmdW5jdGlvbiAoYSwgb2JqKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsID0gYS5sZW5ndGg7XG4gICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICBpZiAoYVtpXSA9PSBvYmopIHtcbiAgICAgICAgYS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgSHhPdmVycmlkZXMuaXRlciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cjogMCwgYXJyOiBhLCBoYXNOZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1ciA8IHRoaXMuYXJyLmxlbmd0aDtcbiAgICAgIH0sIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyW3RoaXMuY3VyKytdO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgdmFyIEludEl0ZXIgPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgfTtcbiAgSW50SXRlci5fX25hbWVfXyA9IHRydWU7XG4gIEludEl0ZXIucHJvdG90eXBlID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pbisrO1xuICAgIH1cbiAgICAsIGhhc05leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pbiA8IHRoaXMubWF4O1xuICAgIH1cbiAgICAsIF9fY2xhc3NfXzogSW50SXRlclxuICB9XG4gIHZhciBTdGQgPSBmdW5jdGlvbiAoKSB7IH1cbiAgU3RkLl9fbmFtZV9fID0gdHJ1ZTtcbiAgU3RkW1wiaXNcIl0gPSBmdW5jdGlvbiAodiwgdCkge1xuICAgIHJldHVybiBqcy5Cb290Ll9faW5zdGFuY2VvZih2LCB0KTtcbiAgfVxuICBTdGQuc3RyaW5nID0gZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4ganMuQm9vdC5fX3N0cmluZ19yZWMocywgXCJcIik7XG4gIH1cbiAgU3RkW1wiaW50XCJdID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4geCB8IDA7XG4gIH1cbiAgU3RkLnBhcnNlSW50ID0gZnVuY3Rpb24gKHgpIHtcbiAgICB2YXIgdiA9IHBhcnNlSW50KHgsIDEwKTtcbiAgICBpZiAodiA9PSAwICYmIChIeE92ZXJyaWRlcy5jY2EoeCwgMSkgPT0gMTIwIHx8IEh4T3ZlcnJpZGVzLmNjYSh4LCAxKSA9PSA4OCkpIHYgPSBwYXJzZUludCh4KTtcbiAgICBpZiAoaXNOYU4odikpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB2O1xuICB9XG4gIFN0ZC5wYXJzZUZsb2F0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh4KTtcbiAgfVxuICBTdGQucmFuZG9tID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogeCk7XG4gIH1cbiAgdmFyIGNvbSA9IGNvbSB8fCB7fVxuICBpZiAoIWNvbS53aXJpcykgY29tLndpcmlzID0ge31cbiAgaWYgKCFjb20ud2lyaXMuanMpIGNvbS53aXJpcy5qcyA9IHt9XG4gIGNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudHJ5UmVhZHkoKTtcbiAgfTtcbiAgY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMuX19uYW1lX18gPSB0cnVlO1xuICBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scy5tYWluID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBldjtcbiAgICBldiA9IGNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzLmdldEluc3RhbmNlKCk7XG4gICAgaGF4ZS5UaW1lci5kZWxheSgkYmluZChldiwgZXYudHJ5UmVhZHkpLCAxMDApO1xuICB9XG4gIGNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scy5pbnN0YW5jZSA9PSBudWxsKSBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scy5pbnN0YW5jZSA9IG5ldyBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scygpO1xuICAgIHJldHVybiBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scy5pbnN0YW5jZTtcbiAgfVxuICBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scy5ieXBhc3NFbmNhcHN1bGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh3aW5kb3cuY29tID09IG51bGwpIHdpbmRvdy5jb20gPSB7fTtcbiAgICBpZiAod2luZG93LmNvbS53aXJpcyA9PSBudWxsKSB3aW5kb3cuY29tLndpcmlzID0ge307XG4gICAgaWYgKHdpbmRvdy5jb20ud2lyaXMuanMgPT0gbnVsbCkgd2luZG93LmNvbS53aXJpcy5qcyA9IHt9O1xuICAgIGlmICh3aW5kb3cuY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMgPT0gbnVsbCkgd2luZG93LmNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzID0gY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuICBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scy5wcm90b3R5cGUgPSB7XG4gICAgbWQ1ZW5jb2RlOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgcmV0dXJuIGhheGUuTWQ1LmVuY29kZShjb250ZW50KTtcbiAgICB9XG4gICAgLCBkb0xvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMuaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMuYnlwYXNzRW5jYXBzdWxhdGlvbigpO1xuICAgIH1cbiAgICAsIHRyeVJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICBpZiAoanMuTGliLmRvY3VtZW50LnJlYWR5U3RhdGUpIHtcbiAgICAgICAgdGhpcy5kb0xvYWQoKTtcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucmVhZHkpIGhheGUuVGltZXIuZGVsYXkoJGJpbmQodGhpcywgdGhpcy50cnlSZWFkeSksIDEwMCk7XG4gICAgfVxuICAgICwgX19jbGFzc19fOiBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29sc1xuICB9XG4gIHZhciBoYXhlID0gaGF4ZSB8fCB7fVxuICBoYXhlLkxvZyA9IGZ1bmN0aW9uICgpIHsgfVxuICBoYXhlLkxvZy5fX25hbWVfXyA9IHRydWU7XG4gIGhheGUuTG9nLnRyYWNlID0gZnVuY3Rpb24gKHYsIGluZm9zKSB7XG4gICAganMuQm9vdC5fX3RyYWNlKHYsIGluZm9zKTtcbiAgfVxuICBoYXhlLkxvZy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICBqcy5Cb290Ll9fY2xlYXJfdHJhY2UoKTtcbiAgfVxuICBoYXhlLk1kNSA9IGZ1bmN0aW9uICgpIHtcbiAgfTtcbiAgaGF4ZS5NZDUuX19uYW1lX18gPSB0cnVlO1xuICBoYXhlLk1kNS5lbmNvZGUgPSBmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBuZXcgaGF4ZS5NZDUoKS5kb0VuY29kZShzKTtcbiAgfVxuICBoYXhlLk1kNS5wcm90b3R5cGUgPSB7XG4gICAgZG9FbmNvZGU6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgIHZhciB4ID0gdGhpcy5zdHIyYmxrcyhzdHIpO1xuICAgICAgdmFyIGEgPSAxNzMyNTg0MTkzO1xuICAgICAgdmFyIGIgPSAtMjcxNzMzODc5O1xuICAgICAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgICAgIHZhciBkID0gMjcxNzMzODc4O1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB3aGlsZSAoaSA8IHgubGVuZ3RoKSB7XG4gICAgICAgIHZhciBvbGRhID0gYTtcbiAgICAgICAgdmFyIG9sZGIgPSBiO1xuICAgICAgICB2YXIgb2xkYyA9IGM7XG4gICAgICAgIHZhciBvbGRkID0gZDtcbiAgICAgICAgc3RlcCA9IDA7XG4gICAgICAgIGEgPSB0aGlzLmZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpO1xuICAgICAgICBkID0gdGhpcy5mZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xuICAgICAgICBjID0gdGhpcy5mZihjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTcsIDYwNjEwNTgxOSk7XG4gICAgICAgIGIgPSB0aGlzLmZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xuICAgICAgICBhID0gdGhpcy5mZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5Nyk7XG4gICAgICAgIGQgPSB0aGlzLmZmKGQsIGEsIGIsIGMsIHhbaSArIDVdLCAxMiwgMTIwMDA4MDQyNik7XG4gICAgICAgIGMgPSB0aGlzLmZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xuICAgICAgICBiID0gdGhpcy5mZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4Myk7XG4gICAgICAgIGEgPSB0aGlzLmZmKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA3LCAxNzcwMDM1NDE2KTtcbiAgICAgICAgZCA9IHRoaXMuZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XG4gICAgICAgIGMgPSB0aGlzLmZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2Myk7XG4gICAgICAgIGIgPSB0aGlzLmZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKTtcbiAgICAgICAgYSA9IHRoaXMuZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKTtcbiAgICAgICAgZCA9IHRoaXMuZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKTtcbiAgICAgICAgYyA9IHRoaXMuZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApO1xuICAgICAgICBiID0gdGhpcy5mZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KTtcbiAgICAgICAgYSA9IHRoaXMuZ2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApO1xuICAgICAgICBkID0gdGhpcy5nZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpO1xuICAgICAgICBjID0gdGhpcy5nZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCA2NDM3MTc3MTMpO1xuICAgICAgICBiID0gdGhpcy5nZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMik7XG4gICAgICAgIGEgPSB0aGlzLmdnKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA1LCAtNzAxNTU4NjkxKTtcbiAgICAgICAgZCA9IHRoaXMuZ2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCA5LCAzODAxNjA4Myk7XG4gICAgICAgIGMgPSB0aGlzLmdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xuICAgICAgICBiID0gdGhpcy5nZyhiLCBjLCBkLCBhLCB4W2kgKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xuICAgICAgICBhID0gdGhpcy5nZyhhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNSwgNTY4NDQ2NDM4KTtcbiAgICAgICAgZCA9IHRoaXMuZ2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MCk7XG4gICAgICAgIGMgPSB0aGlzLmdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XG4gICAgICAgIGIgPSB0aGlzLmdnKGIsIGMsIGQsIGEsIHhbaSArIDhdLCAyMCwgMTE2MzUzMTUwMSk7XG4gICAgICAgIGEgPSB0aGlzLmdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xuICAgICAgICBkID0gdGhpcy5nZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KTtcbiAgICAgICAgYyA9IHRoaXMuZ2coYywgZCwgYSwgYiwgeFtpICsgN10sIDE0LCAxNzM1MzI4NDczKTtcbiAgICAgICAgYiA9IHRoaXMuZ2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xuICAgICAgICBhID0gdGhpcy5oaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OCk7XG4gICAgICAgIGQgPSB0aGlzLmhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xuICAgICAgICBjID0gdGhpcy5oaChjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE2LCAxODM5MDMwNTYyKTtcbiAgICAgICAgYiA9IHRoaXMuaGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KTtcbiAgICAgICAgYSA9IHRoaXMuaGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKTtcbiAgICAgICAgZCA9IHRoaXMuaGgoZCwgYSwgYiwgYywgeFtpICsgNF0sIDExLCAxMjcyODkzMzUzKTtcbiAgICAgICAgYyA9IHRoaXMuaGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKTtcbiAgICAgICAgYiA9IHRoaXMuaGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xuICAgICAgICBhID0gdGhpcy5oaChhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDQsIDY4MTI3OTE3NCk7XG4gICAgICAgIGQgPSB0aGlzLmhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKTtcbiAgICAgICAgYyA9IHRoaXMuaGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KTtcbiAgICAgICAgYiA9IHRoaXMuaGgoYiwgYywgZCwgYSwgeFtpICsgNl0sIDIzLCA3NjAyOTE4OSk7XG4gICAgICAgIGEgPSB0aGlzLmhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KTtcbiAgICAgICAgZCA9IHRoaXMuaGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSk7XG4gICAgICAgIGMgPSB0aGlzLmhoKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTYsIDUzMDc0MjUyMCk7XG4gICAgICAgIGIgPSB0aGlzLmhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSk7XG4gICAgICAgIGEgPSB0aGlzLmlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpO1xuICAgICAgICBkID0gdGhpcy5paShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpO1xuICAgICAgICBjID0gdGhpcy5paShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XG4gICAgICAgIGIgPSB0aGlzLmlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KTtcbiAgICAgICAgYSA9IHRoaXMuaWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKTtcbiAgICAgICAgZCA9IHRoaXMuaWkoZCwgYSwgYiwgYywgeFtpICsgM10sIDEwLCAtMTg5NDk4NjYwNik7XG4gICAgICAgIGMgPSB0aGlzLmlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKTtcbiAgICAgICAgYiA9IHRoaXMuaWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XG4gICAgICAgIGEgPSB0aGlzLmlpKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA2LCAxODczMzEzMzU5KTtcbiAgICAgICAgZCA9IHRoaXMuaWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KTtcbiAgICAgICAgYyA9IHRoaXMuaWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XG4gICAgICAgIGIgPSB0aGlzLmlpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsIDEzMDkxNTE2NDkpO1xuICAgICAgICBhID0gdGhpcy5paShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MCk7XG4gICAgICAgIGQgPSB0aGlzLmlpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KTtcbiAgICAgICAgYyA9IHRoaXMuaWkoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE1LCA3MTg3ODcyNTkpO1xuICAgICAgICBiID0gdGhpcy5paShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xuICAgICAgICBhID0gdGhpcy5hZGRtZShhLCBvbGRhKTtcbiAgICAgICAgYiA9IHRoaXMuYWRkbWUoYiwgb2xkYik7XG4gICAgICAgIGMgPSB0aGlzLmFkZG1lKGMsIG9sZGMpO1xuICAgICAgICBkID0gdGhpcy5hZGRtZShkLCBvbGRkKTtcbiAgICAgICAgaSArPSAxNjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJoZXgoYSkgKyB0aGlzLnJoZXgoYikgKyB0aGlzLnJoZXgoYykgKyB0aGlzLnJoZXgoZCk7XG4gICAgfVxuICAgICwgaWk6IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICByZXR1cm4gdGhpcy5jbW4odGhpcy5iaXRYT1IoYywgdGhpcy5iaXRPUihiLCB+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgLCBoaDogZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNtbih0aGlzLmJpdFhPUih0aGlzLmJpdFhPUihiLCBjKSwgZCksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICAsIGdnOiBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgcmV0dXJuIHRoaXMuY21uKHRoaXMuYml0T1IodGhpcy5iaXRBTkQoYiwgZCksIHRoaXMuYml0QU5EKGMsIH5kKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICAsIGZmOiBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgcmV0dXJuIHRoaXMuY21uKHRoaXMuYml0T1IodGhpcy5iaXRBTkQoYiwgYyksIHRoaXMuYml0QU5EKH5iLCBkKSksIGEsIGIsIHgsIHMsIHQpO1xuICAgIH1cbiAgICAsIGNtbjogZnVuY3Rpb24gKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZG1lKHRoaXMucm9sKHRoaXMuYWRkbWUodGhpcy5hZGRtZShhLCBxKSwgdGhpcy5hZGRtZSh4LCB0KSksIHMpLCBiKTtcbiAgICB9XG4gICAgLCByb2w6IGZ1bmN0aW9uIChudW0sIGNudCkge1xuICAgICAgcmV0dXJuIG51bSA8PCBjbnQgfCBudW0gPj4+IDMyIC0gY250O1xuICAgIH1cbiAgICAsIHN0cjJibGtzOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICB2YXIgbmJsayA9IChzdHIubGVuZ3RoICsgOCA+PiA2KSArIDE7XG4gICAgICB2YXIgYmxrcyA9IG5ldyBBcnJheSgpO1xuICAgICAgdmFyIF9nMSA9IDAsIF9nID0gbmJsayAqIDE2O1xuICAgICAgd2hpbGUgKF9nMSA8IF9nKSB7XG4gICAgICAgIHZhciBpID0gX2cxKys7XG4gICAgICAgIGJsa3NbaV0gPSAwO1xuICAgICAgfVxuICAgICAgdmFyIGkgPSAwO1xuICAgICAgd2hpbGUgKGkgPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgIGJsa3NbaSA+PiAyXSB8PSBIeE92ZXJyaWRlcy5jY2Eoc3RyLCBpKSA8PCAoc3RyLmxlbmd0aCAqIDggKyBpKSAlIDQgKiA4O1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgICBibGtzW2kgPj4gMl0gfD0gMTI4IDw8IChzdHIubGVuZ3RoICogOCArIGkpICUgNCAqIDg7XG4gICAgICB2YXIgbCA9IHN0ci5sZW5ndGggKiA4O1xuICAgICAgdmFyIGsgPSBuYmxrICogMTYgLSAyO1xuICAgICAgYmxrc1trXSA9IGwgJiAyNTU7XG4gICAgICBibGtzW2tdIHw9IChsID4+PiA4ICYgMjU1KSA8PCA4O1xuICAgICAgYmxrc1trXSB8PSAobCA+Pj4gMTYgJiAyNTUpIDw8IDE2O1xuICAgICAgYmxrc1trXSB8PSAobCA+Pj4gMjQgJiAyNTUpIDw8IDI0O1xuICAgICAgcmV0dXJuIGJsa3M7XG4gICAgfVxuICAgICwgcmhleDogZnVuY3Rpb24gKG51bSkge1xuICAgICAgdmFyIHN0ciA9IFwiXCI7XG4gICAgICB2YXIgaGV4X2NociA9IFwiMDEyMzQ1Njc4OWFiY2RlZlwiO1xuICAgICAgdmFyIF9nID0gMDtcbiAgICAgIHdoaWxlIChfZyA8IDQpIHtcbiAgICAgICAgdmFyIGogPSBfZysrO1xuICAgICAgICBzdHIgKz0gaGV4X2Noci5jaGFyQXQobnVtID4+IGogKiA4ICsgNCAmIDE1KSArIGhleF9jaHIuY2hhckF0KG51bSA+PiBqICogOCAmIDE1KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgICwgYWRkbWU6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICB2YXIgbHN3ID0gKHggJiA2NTUzNSkgKyAoeSAmIDY1NTM1KTtcbiAgICAgIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgICAgIHJldHVybiBtc3cgPDwgMTYgfCBsc3cgJiA2NTUzNTtcbiAgICB9XG4gICAgLCBiaXRBTkQ6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICB2YXIgbHNiID0gYSAmIDEgJiAoYiAmIDEpO1xuICAgICAgdmFyIG1zYjMxID0gYSA+Pj4gMSAmIGIgPj4+IDE7XG4gICAgICByZXR1cm4gbXNiMzEgPDwgMSB8IGxzYjtcbiAgICB9XG4gICAgLCBiaXRYT1I6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICB2YXIgbHNiID0gYSAmIDEgXiBiICYgMTtcbiAgICAgIHZhciBtc2IzMSA9IGEgPj4+IDEgXiBiID4+PiAxO1xuICAgICAgcmV0dXJuIG1zYjMxIDw8IDEgfCBsc2I7XG4gICAgfVxuICAgICwgYml0T1I6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICB2YXIgbHNiID0gYSAmIDEgfCBiICYgMTtcbiAgICAgIHZhciBtc2IzMSA9IGEgPj4+IDEgfCBiID4+PiAxO1xuICAgICAgcmV0dXJuIG1zYjMxIDw8IDEgfCBsc2I7XG4gICAgfVxuICAgICwgX19jbGFzc19fOiBoYXhlLk1kNVxuICB9XG4gIGhheGUuVGltZXIgPSBmdW5jdGlvbiAodGltZV9tcykge1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgdGhpcy5pZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBtZS5ydW4oKTtcbiAgICB9LCB0aW1lX21zKTtcbiAgfTtcbiAgaGF4ZS5UaW1lci5fX25hbWVfXyA9IHRydWU7XG4gIGhheGUuVGltZXIuZGVsYXkgPSBmdW5jdGlvbiAoZiwgdGltZV9tcykge1xuICAgIHZhciB0ID0gbmV3IGhheGUuVGltZXIodGltZV9tcyk7XG4gICAgdC5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0LnN0b3AoKTtcbiAgICAgIGYoKTtcbiAgICB9O1xuICAgIHJldHVybiB0O1xuICB9XG4gIGhheGUuVGltZXIubWVhc3VyZSA9IGZ1bmN0aW9uIChmLCBwb3MpIHtcbiAgICB2YXIgdDAgPSBoYXhlLlRpbWVyLnN0YW1wKCk7XG4gICAgdmFyIHIgPSBmKCk7XG4gICAgaGF4ZS5Mb2cudHJhY2UoaGF4ZS5UaW1lci5zdGFtcCgpIC0gdDAgKyBcInNcIiwgcG9zKTtcbiAgICByZXR1cm4gcjtcbiAgfVxuICBoYXhlLlRpbWVyLnN0YW1wID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XG4gIH1cbiAgaGF4ZS5UaW1lci5wcm90b3R5cGUgPSB7XG4gICAgcnVuOiBmdW5jdGlvbiAoKSB7XG4gICAgfVxuICAgICwgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuaWQgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pZCk7XG4gICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB9XG4gICAgLCBfX2NsYXNzX186IGhheGUuVGltZXJcbiAgfVxuICB2YXIganMgPSBqcyB8fCB7fVxuICBqcy5Cb290ID0gZnVuY3Rpb24gKCkgeyB9XG4gIGpzLkJvb3QuX19uYW1lX18gPSB0cnVlO1xuICBqcy5Cb290Ll9fdW5odG1sID0gZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gcy5zcGxpdChcIiZcIikuam9pbihcIiZhbXA7XCIpLnNwbGl0KFwiPFwiKS5qb2luKFwiJmx0O1wiKS5zcGxpdChcIj5cIikuam9pbihcIiZndDtcIik7XG4gIH1cbiAganMuQm9vdC5fX3RyYWNlID0gZnVuY3Rpb24gKHYsIGkpIHtcbiAgICB2YXIgbXNnID0gaSAhPSBudWxsID8gaS5maWxlTmFtZSArIFwiOlwiICsgaS5saW5lTnVtYmVyICsgXCI6IFwiIDogXCJcIjtcbiAgICBtc2cgKz0ganMuQm9vdC5fX3N0cmluZ19yZWModiwgXCJcIik7XG4gICAgdmFyIGQ7XG4gICAgaWYgKHR5cGVvZiAoZG9jdW1lbnQpICE9IFwidW5kZWZpbmVkXCIgJiYgKGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhheGU6dHJhY2VcIikpICE9IG51bGwpIGQuaW5uZXJIVE1MICs9IGpzLkJvb3QuX191bmh0bWwobXNnKSArIFwiPGJyLz5cIjsgZWxzZSBpZiAodHlwZW9mIChjb25zb2xlKSAhPSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUubG9nICE9IG51bGwpIGNvbnNvbGUubG9nKG1zZyk7XG4gIH1cbiAganMuQm9vdC5fX2NsZWFyX3RyYWNlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoYXhlOnRyYWNlXCIpO1xuICAgIGlmIChkICE9IG51bGwpIGQuaW5uZXJIVE1MID0gXCJcIjtcbiAgfVxuICBqcy5Cb290LmlzQ2xhc3MgPSBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiBvLl9fbmFtZV9fO1xuICB9XG4gIGpzLkJvb3QuaXNFbnVtID0gZnVuY3Rpb24gKGUpIHtcbiAgICByZXR1cm4gZS5fX2VuYW1lX187XG4gIH1cbiAganMuQm9vdC5nZXRDbGFzcyA9IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG8uX19jbGFzc19fO1xuICB9XG4gIGpzLkJvb3QuX19zdHJpbmdfcmVjID0gZnVuY3Rpb24gKG8sIHMpIHtcbiAgICBpZiAobyA9PSBudWxsKSByZXR1cm4gXCJudWxsXCI7XG4gICAgaWYgKHMubGVuZ3RoID49IDUpIHJldHVybiBcIjwuLi4+XCI7XG4gICAgdmFyIHQgPSB0eXBlb2YgKG8pO1xuICAgIGlmICh0ID09IFwiZnVuY3Rpb25cIiAmJiAoby5fX25hbWVfXyB8fCBvLl9fZW5hbWVfXykpIHQgPSBcIm9iamVjdFwiO1xuICAgIHN3aXRjaCAodCkge1xuICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICBpZiAobyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgaWYgKG8uX19lbnVtX18pIHtcbiAgICAgICAgICAgIGlmIChvLmxlbmd0aCA9PSAyKSByZXR1cm4gb1swXTtcbiAgICAgICAgICAgIHZhciBzdHIgPSBvWzBdICsgXCIoXCI7XG4gICAgICAgICAgICBzICs9IFwiXFx0XCI7XG4gICAgICAgICAgICB2YXIgX2cxID0gMiwgX2cgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChfZzEgPCBfZykge1xuICAgICAgICAgICAgICB2YXIgaSA9IF9nMSsrO1xuICAgICAgICAgICAgICBpZiAoaSAhPSAyKSBzdHIgKz0gXCIsXCIgKyBqcy5Cb290Ll9fc3RyaW5nX3JlYyhvW2ldLCBzKTsgZWxzZSBzdHIgKz0ganMuQm9vdC5fX3N0cmluZ19yZWMob1tpXSwgcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyICsgXCIpXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBsID0gby5sZW5ndGg7XG4gICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgdmFyIHN0ciA9IFwiW1wiO1xuICAgICAgICAgIHMgKz0gXCJcXHRcIjtcbiAgICAgICAgICB2YXIgX2cgPSAwO1xuICAgICAgICAgIHdoaWxlIChfZyA8IGwpIHtcbiAgICAgICAgICAgIHZhciBpMSA9IF9nKys7XG4gICAgICAgICAgICBzdHIgKz0gKGkxID4gMCA/IFwiLFwiIDogXCJcIikgKyBqcy5Cb290Ll9fc3RyaW5nX3JlYyhvW2kxXSwgcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0ciArPSBcIl1cIjtcbiAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3N0cjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0b3N0ciA9IG8udG9TdHJpbmc7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gXCI/Pz9cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9zdHIgIT0gbnVsbCAmJiB0b3N0ciAhPSBPYmplY3QudG9TdHJpbmcpIHtcbiAgICAgICAgICB2YXIgczIgPSBvLnRvU3RyaW5nKCk7XG4gICAgICAgICAgaWYgKHMyICE9IFwiW29iamVjdCBPYmplY3RdXCIpIHJldHVybiBzMjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgayA9IG51bGw7XG4gICAgICAgIHZhciBzdHIgPSBcIntcXG5cIjtcbiAgICAgICAgcyArPSBcIlxcdFwiO1xuICAgICAgICB2YXIgaGFzcCA9IG8uaGFzT3duUHJvcGVydHkgIT0gbnVsbDtcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKSB7XG4gICAgICAgICAgO1xuICAgICAgICAgIGlmIChoYXNwICYmICFvLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGsgPT0gXCJwcm90b3R5cGVcIiB8fCBrID09IFwiX19jbGFzc19fXCIgfHwgayA9PSBcIl9fc3VwZXJfX1wiIHx8IGsgPT0gXCJfX2ludGVyZmFjZXNfX1wiIHx8IGsgPT0gXCJfX3Byb3BlcnRpZXNfX1wiKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN0ci5sZW5ndGggIT0gMikgc3RyICs9IFwiLCBcXG5cIjtcbiAgICAgICAgICBzdHIgKz0gcyArIGsgKyBcIiA6IFwiICsganMuQm9vdC5fX3N0cmluZ19yZWMob1trXSwgcyk7XG4gICAgICAgIH1cbiAgICAgICAgcyA9IHMuc3Vic3RyaW5nKDEpO1xuICAgICAgICBzdHIgKz0gXCJcXG5cIiArIHMgKyBcIn1cIjtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICByZXR1cm4gXCI8ZnVuY3Rpb24+XCI7XG4gICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhvKTtcbiAgICB9XG4gIH1cbiAganMuQm9vdC5fX2ludGVyZkxvb3AgPSBmdW5jdGlvbiAoY2MsIGNsKSB7XG4gICAgaWYgKGNjID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoY2MgPT0gY2wpIHJldHVybiB0cnVlO1xuICAgIHZhciBpbnRmID0gY2MuX19pbnRlcmZhY2VzX187XG4gICAgaWYgKGludGYgIT0gbnVsbCkge1xuICAgICAgdmFyIF9nMSA9IDAsIF9nID0gaW50Zi5sZW5ndGg7XG4gICAgICB3aGlsZSAoX2cxIDwgX2cpIHtcbiAgICAgICAgdmFyIGkgPSBfZzErKztcbiAgICAgICAgdmFyIGkxID0gaW50ZltpXTtcbiAgICAgICAgaWYgKGkxID09IGNsIHx8IGpzLkJvb3QuX19pbnRlcmZMb29wKGkxLCBjbCkpIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ganMuQm9vdC5fX2ludGVyZkxvb3AoY2MuX19zdXBlcl9fLCBjbCk7XG4gIH1cbiAganMuQm9vdC5fX2luc3RhbmNlb2YgPSBmdW5jdGlvbiAobywgY2wpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKG8gaW5zdGFuY2VvZiBjbCkge1xuICAgICAgICBpZiAoY2wgPT0gQXJyYXkpIHJldHVybiBvLl9fZW51bV9fID09IG51bGw7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGpzLkJvb3QuX19pbnRlcmZMb29wKG8uX19jbGFzc19fLCBjbCkpIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChjbCA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHN3aXRjaCAoY2wpIHtcbiAgICAgIGNhc2UgSW50OlxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG8gJSAyMTQ3NDgzNjQ4LjApID09PSBvO1xuICAgICAgY2FzZSBGbG9hdDpcbiAgICAgICAgcmV0dXJuIHR5cGVvZiAobykgPT0gXCJudW1iZXJcIjtcbiAgICAgIGNhc2UgQm9vbDpcbiAgICAgICAgcmV0dXJuIG8gPT09IHRydWUgfHwgbyA9PT0gZmFsc2U7XG4gICAgICBjYXNlIFN0cmluZzpcbiAgICAgICAgcmV0dXJuIHR5cGVvZiAobykgPT0gXCJzdHJpbmdcIjtcbiAgICAgIGNhc2UgRHluYW1pYzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobyA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChjbCA9PSBDbGFzcyAmJiBvLl9fbmFtZV9fICE9IG51bGwpIHJldHVybiB0cnVlOyBlbHNlIG51bGw7XG4gICAgICAgIGlmIChjbCA9PSBFbnVtICYmIG8uX19lbmFtZV9fICE9IG51bGwpIHJldHVybiB0cnVlOyBlbHNlIG51bGw7XG4gICAgICAgIHJldHVybiBvLl9fZW51bV9fID09IGNsO1xuICAgIH1cbiAgfVxuICBqcy5Cb290Ll9fY2FzdCA9IGZ1bmN0aW9uIChvLCB0KSB7XG4gICAgaWYgKGpzLkJvb3QuX19pbnN0YW5jZW9mKG8sIHQpKSByZXR1cm4gbzsgZWxzZSB0aHJvdyBcIkNhbm5vdCBjYXN0IFwiICsgU3RkLnN0cmluZyhvKSArIFwiIHRvIFwiICsgU3RkLnN0cmluZyh0KTtcbiAgfVxuICBqcy5MaWIgPSBmdW5jdGlvbiAoKSB7IH1cbiAganMuTGliLl9fbmFtZV9fID0gdHJ1ZTtcbiAganMuTGliLmRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgIGRlYnVnZ2VyO1xuICB9XG4gIGpzLkxpYi5hbGVydCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgYWxlcnQoanMuQm9vdC5fX3N0cmluZ19yZWModiwgXCJcIikpO1xuICB9XG4gIGpzLkxpYi5ldmFsID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICByZXR1cm4gZXZhbChjb2RlKTtcbiAgfVxuICBqcy5MaWIuc2V0RXJyb3JIYW5kbGVyID0gZnVuY3Rpb24gKGYpIHtcbiAgICBqcy5MaWIub25lcnJvciA9IGY7XG4gIH1cbiAgdmFyICRfO1xuICBmdW5jdGlvbiAkYmluZChvLCBtKSB7IHZhciBmID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZi5tZXRob2QuYXBwbHkoZi5zY29wZSwgYXJndW1lbnRzKTsgfTsgZi5zY29wZSA9IG87IGYubWV0aG9kID0gbTsgcmV0dXJuIGY7IH07XG4gIGlmIChBcnJheS5wcm90b3R5cGUuaW5kZXhPZikgSHhPdmVycmlkZXMucmVtb3ZlID0gZnVuY3Rpb24gKGEsIG8pIHtcbiAgICB2YXIgaSA9IGEuaW5kZXhPZihvKTtcbiAgICBpZiAoaSA9PSAtMSkgcmV0dXJuIGZhbHNlO1xuICAgIGEuc3BsaWNlKGksIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9OyBlbHNlIG51bGw7XG4gIE1hdGguX19uYW1lX18gPSBbXCJNYXRoXCJdO1xuICBNYXRoLk5hTiA9IE51bWJlci5OYU47XG4gIE1hdGguTkVHQVRJVkVfSU5GSU5JVFkgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG4gIE1hdGguUE9TSVRJVkVfSU5GSU5JVFkgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gIE1hdGguaXNGaW5pdGUgPSBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBpc0Zpbml0ZShpKTtcbiAgfTtcbiAgTWF0aC5pc05hTiA9IGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGlzTmFOKGkpO1xuICB9O1xuICBTdHJpbmcucHJvdG90eXBlLl9fY2xhc3NfXyA9IFN0cmluZztcbiAgU3RyaW5nLl9fbmFtZV9fID0gdHJ1ZTtcbiAgQXJyYXkucHJvdG90eXBlLl9fY2xhc3NfXyA9IEFycmF5O1xuICBBcnJheS5fX25hbWVfXyA9IHRydWU7XG4gIERhdGUucHJvdG90eXBlLl9fY2xhc3NfXyA9IERhdGU7XG4gIERhdGUuX19uYW1lX18gPSBbXCJEYXRlXCJdO1xuICB2YXIgSW50ID0geyBfX25hbWVfXzogW1wiSW50XCJdIH07XG4gIHZhciBEeW5hbWljID0geyBfX25hbWVfXzogW1wiRHluYW1pY1wiXSB9O1xuICB2YXIgRmxvYXQgPSBOdW1iZXI7XG4gIEZsb2F0Ll9fbmFtZV9fID0gW1wiRmxvYXRcIl07XG4gIHZhciBCb29sID0gQm9vbGVhbjtcbiAgQm9vbC5fX2VuYW1lX18gPSBbXCJCb29sXCJdO1xuICB2YXIgQ2xhc3MgPSB7IF9fbmFtZV9fOiBbXCJDbGFzc1wiXSB9O1xuICB2YXIgRW51bSA9IHt9O1xuICB2YXIgVm9pZCA9IHsgX19lbmFtZV9fOiBbXCJWb2lkXCJdIH07XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT0gXCJ1bmRlZmluZWRcIikganMuTGliLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICBqcy5MaWIud2luZG93ID0gd2luZG93O1xuICAgIGpzLkxpYi53aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uIChtc2csIHVybCwgbGluZSkge1xuICAgICAgdmFyIGYgPSBqcy5MaWIub25lcnJvcjtcbiAgICAgIGlmIChmID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiBmKG1zZywgW3VybCArIFwiOlwiICsgbGluZV0pO1xuICAgIH07XG4gIH1cbiAgY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMubWFpbigpO1xuICBkZWxldGUgQXJyYXkucHJvdG90eXBlLl9fY2xhc3NfXztcbn0oKSk7XG5cblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEh4T3ZlcnJpZGVzID0gZnVuY3Rpb24gKCkgeyB9XG4gIEh4T3ZlcnJpZGVzLl9fbmFtZV9fID0gdHJ1ZTtcbiAgSHhPdmVycmlkZXMuZGF0ZVN0ciA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIHZhciBkID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgdmFyIGggPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgdmFyIG1pID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgdmFyIHMgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICsgXCItXCIgKyAobSA8IDEwID8gXCIwXCIgKyBtIDogXCJcIiArIG0pICsgXCItXCIgKyAoZCA8IDEwID8gXCIwXCIgKyBkIDogXCJcIiArIGQpICsgXCIgXCIgKyAoaCA8IDEwID8gXCIwXCIgKyBoIDogXCJcIiArIGgpICsgXCI6XCIgKyAobWkgPCAxMCA/IFwiMFwiICsgbWkgOiBcIlwiICsgbWkpICsgXCI6XCIgKyAocyA8IDEwID8gXCIwXCIgKyBzIDogXCJcIiArIHMpO1xuICB9XG4gIEh4T3ZlcnJpZGVzLnN0ckRhdGUgPSBmdW5jdGlvbiAocykge1xuICAgIHN3aXRjaCAocy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgODpcbiAgICAgICAgdmFyIGsgPSBzLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkLnNldFRpbWUoMCk7XG4gICAgICAgIGQuc2V0VVRDSG91cnMoa1swXSk7XG4gICAgICAgIGQuc2V0VVRDTWludXRlcyhrWzFdKTtcbiAgICAgICAgZC5zZXRVVENTZWNvbmRzKGtbMl0pO1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIGNhc2UgMTA6XG4gICAgICAgIHZhciBrID0gcy5zcGxpdChcIi1cIik7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShrWzBdLCBrWzFdIC0gMSwga1syXSwgMCwgMCwgMCk7XG4gICAgICBjYXNlIDE5OlxuICAgICAgICB2YXIgayA9IHMuc3BsaXQoXCIgXCIpO1xuICAgICAgICB2YXIgeSA9IGtbMF0uc3BsaXQoXCItXCIpO1xuICAgICAgICB2YXIgdCA9IGtbMV0uc3BsaXQoXCI6XCIpO1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoeVswXSwgeVsxXSAtIDEsIHlbMl0sIHRbMF0sIHRbMV0sIHRbMl0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgXCJJbnZhbGlkIGRhdGUgZm9ybWF0IDogXCIgKyBzO1xuICAgIH1cbiAgfVxuICBIeE92ZXJyaWRlcy5jY2EgPSBmdW5jdGlvbiAocywgaW5kZXgpIHtcbiAgICB2YXIgeCA9IHMuY2hhckNvZGVBdChpbmRleCk7XG4gICAgaWYgKHggIT0geCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4geDtcbiAgfVxuICBIeE92ZXJyaWRlcy5zdWJzdHIgPSBmdW5jdGlvbiAocywgcG9zLCBsZW4pIHtcbiAgICBpZiAocG9zICE9IG51bGwgJiYgcG9zICE9IDAgJiYgbGVuICE9IG51bGwgJiYgbGVuIDwgMCkgcmV0dXJuIFwiXCI7XG4gICAgaWYgKGxlbiA9PSBudWxsKSBsZW4gPSBzLmxlbmd0aDtcbiAgICBpZiAocG9zIDwgMCkge1xuICAgICAgcG9zID0gcy5sZW5ndGggKyBwb3M7XG4gICAgICBpZiAocG9zIDwgMCkgcG9zID0gMDtcbiAgICB9IGVsc2UgaWYgKGxlbiA8IDApIGxlbiA9IHMubGVuZ3RoICsgbGVuIC0gcG9zO1xuICAgIHJldHVybiBzLnN1YnN0cihwb3MsIGxlbik7XG4gIH1cbiAgSHhPdmVycmlkZXMucmVtb3ZlID0gZnVuY3Rpb24gKGEsIG9iaikge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbCA9IGEubGVuZ3RoO1xuICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgaWYgKGFbaV0gPT0gb2JqKSB7XG4gICAgICAgIGEuc3BsaWNlKGksIDEpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIEh4T3ZlcnJpZGVzLml0ZXIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXI6IDAsIGFycjogYSwgaGFzTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXIgPCB0aGlzLmFyci5sZW5ndGg7XG4gICAgICB9LCBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyclt0aGlzLmN1cisrXTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIHZhciBJbnRJdGVyID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG4gICAgdGhpcy5taW4gPSBtaW47XG4gICAgdGhpcy5tYXggPSBtYXg7XG4gIH07XG4gIEludEl0ZXIuX19uYW1lX18gPSB0cnVlO1xuICBJbnRJdGVyLnByb3RvdHlwZSA9IHtcbiAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW4rKztcbiAgICB9XG4gICAgLCBoYXNOZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW4gPCB0aGlzLm1heDtcbiAgICB9XG4gICAgLCBfX2NsYXNzX186IEludEl0ZXJcbiAgfVxuICB2YXIgU3RkID0gZnVuY3Rpb24gKCkgeyB9XG4gIFN0ZC5fX25hbWVfXyA9IHRydWU7XG4gIFN0ZFtcImlzXCJdID0gZnVuY3Rpb24gKHYsIHQpIHtcbiAgICByZXR1cm4ganMuQm9vdC5fX2luc3RhbmNlb2YodiwgdCk7XG4gIH1cbiAgU3RkLnN0cmluZyA9IGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIGpzLkJvb3QuX19zdHJpbmdfcmVjKHMsIFwiXCIpO1xuICB9XG4gIFN0ZFtcImludFwiXSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHggfCAwO1xuICB9XG4gIFN0ZC5wYXJzZUludCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgdmFyIHYgPSBwYXJzZUludCh4LCAxMCk7XG4gICAgaWYgKHYgPT0gMCAmJiAoSHhPdmVycmlkZXMuY2NhKHgsIDEpID09IDEyMCB8fCBIeE92ZXJyaWRlcy5jY2EoeCwgMSkgPT0gODgpKSB2ID0gcGFyc2VJbnQoeCk7XG4gICAgaWYgKGlzTmFOKHYpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdjtcbiAgfVxuICBTdGQucGFyc2VGbG9hdCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoeCk7XG4gIH1cbiAgU3RkLnJhbmRvbSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHgpO1xuICB9XG4gIHZhciBjb20gPSBjb20gfHwge31cbiAgaWYgKCFjb20ud2lyaXMpIGNvbS53aXJpcyA9IHt9XG4gIGlmICghY29tLndpcmlzLmpzKSBjb20ud2lyaXMuanMgPSB7fVxuICBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRyeVJlYWR5KCk7XG4gIH07XG4gIGNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzLl9fbmFtZV9fID0gdHJ1ZTtcbiAgY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMubWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXY7XG4gICAgZXYgPSBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scy5nZXRJbnN0YW5jZSgpO1xuICAgIGhheGUuVGltZXIuZGVsYXkoJGJpbmQoZXYsIGV2LnRyeVJlYWR5KSwgMTAwKTtcbiAgfVxuICBjb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scy5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMuaW5zdGFuY2UgPT0gbnVsbCkgY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMuaW5zdGFuY2UgPSBuZXcgY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMoKTtcbiAgICByZXR1cm4gY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMuaW5zdGFuY2U7XG4gIH1cbiAgY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMuYnlwYXNzRW5jYXBzdWxhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAod2luZG93LmNvbSA9PSBudWxsKSB3aW5kb3cuY29tID0ge307XG4gICAgaWYgKHdpbmRvdy5jb20ud2lyaXMgPT0gbnVsbCkgd2luZG93LmNvbS53aXJpcyA9IHt9O1xuICAgIGlmICh3aW5kb3cuY29tLndpcmlzLmpzID09IG51bGwpIHdpbmRvdy5jb20ud2lyaXMuanMgPSB7fTtcbiAgICBpZiAod2luZG93LmNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzID09IG51bGwpIHdpbmRvdy5jb20ud2lyaXMuanMuSnNQbHVnaW5Ub29scyA9IGNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzLmdldEluc3RhbmNlKCk7XG4gIH1cbiAgY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMucHJvdG90eXBlID0ge1xuICAgIG1kNWVuY29kZTogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBoYXhlLk1kNS5lbmNvZGUoY29udGVudCk7XG4gICAgfVxuICAgICwgZG9Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgIGNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzLmluc3RhbmNlID0gdGhpcztcbiAgICAgIGNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzLmJ5cGFzc0VuY2Fwc3VsYXRpb24oKTtcbiAgICB9XG4gICAgLCB0cnlSZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgaWYgKGpzLkxpYi5kb2N1bWVudC5yZWFkeVN0YXRlKSB7XG4gICAgICAgIHRoaXMuZG9Mb2FkKCk7XG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnJlYWR5KSBoYXhlLlRpbWVyLmRlbGF5KCRiaW5kKHRoaXMsIHRoaXMudHJ5UmVhZHkpLCAxMDApO1xuICAgIH1cbiAgICAsIF9fY2xhc3NfXzogY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHNcbiAgfVxuICB2YXIgaGF4ZSA9IGhheGUgfHwge31cbiAgaGF4ZS5Mb2cgPSBmdW5jdGlvbiAoKSB7IH1cbiAgaGF4ZS5Mb2cuX19uYW1lX18gPSB0cnVlO1xuICBoYXhlLkxvZy50cmFjZSA9IGZ1bmN0aW9uICh2LCBpbmZvcykge1xuICAgIGpzLkJvb3QuX190cmFjZSh2LCBpbmZvcyk7XG4gIH1cbiAgaGF4ZS5Mb2cuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAganMuQm9vdC5fX2NsZWFyX3RyYWNlKCk7XG4gIH1cbiAgaGF4ZS5NZDUgPSBmdW5jdGlvbiAoKSB7XG4gIH07XG4gIGhheGUuTWQ1Ll9fbmFtZV9fID0gdHJ1ZTtcbiAgaGF4ZS5NZDUuZW5jb2RlID0gZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gbmV3IGhheGUuTWQ1KCkuZG9FbmNvZGUocyk7XG4gIH1cbiAgaGF4ZS5NZDUucHJvdG90eXBlID0ge1xuICAgIGRvRW5jb2RlOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICB2YXIgeCA9IHRoaXMuc3RyMmJsa3Moc3RyKTtcbiAgICAgIHZhciBhID0gMTczMjU4NDE5MztcbiAgICAgIHZhciBiID0gLTI3MTczMzg3OTtcbiAgICAgIHZhciBjID0gLTE3MzI1ODQxOTQ7XG4gICAgICB2YXIgZCA9IDI3MTczMzg3ODtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgd2hpbGUgKGkgPCB4Lmxlbmd0aCkge1xuICAgICAgICB2YXIgb2xkYSA9IGE7XG4gICAgICAgIHZhciBvbGRiID0gYjtcbiAgICAgICAgdmFyIG9sZGMgPSBjO1xuICAgICAgICB2YXIgb2xkZCA9IGQ7XG4gICAgICAgIHN0ZXAgPSAwO1xuICAgICAgICBhID0gdGhpcy5mZihhLCBiLCBjLCBkLCB4W2ldLCA3LCAtNjgwODc2OTM2KTtcbiAgICAgICAgZCA9IHRoaXMuZmYoZCwgYSwgYiwgYywgeFtpICsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcbiAgICAgICAgYyA9IHRoaXMuZmYoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE3LCA2MDYxMDU4MTkpO1xuICAgICAgICBiID0gdGhpcy5mZihiLCBjLCBkLCBhLCB4W2kgKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICAgICAgYSA9IHRoaXMuZmYoYSwgYiwgYywgZCwgeFtpICsgNF0sIDcsIC0xNzY0MTg4OTcpO1xuICAgICAgICBkID0gdGhpcy5mZihkLCBhLCBiLCBjLCB4W2kgKyA1XSwgMTIsIDEyMDAwODA0MjYpO1xuICAgICAgICBjID0gdGhpcy5mZihjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICAgICAgYiA9IHRoaXMuZmYoYiwgYywgZCwgYSwgeFtpICsgN10sIDIyLCAtNDU3MDU5ODMpO1xuICAgICAgICBhID0gdGhpcy5mZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNik7XG4gICAgICAgIGQgPSB0aGlzLmZmKGQsIGEsIGIsIGMsIHhbaSArIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgICAgICBjID0gdGhpcy5mZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgICAgICBiID0gdGhpcy5mZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgICAgIGEgPSB0aGlzLmZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNywgMTgwNDYwMzY4Mik7XG4gICAgICAgIGQgPSB0aGlzLmZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSk7XG4gICAgICAgIGMgPSB0aGlzLmZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICAgICAgYiA9IHRoaXMuZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgMTIzNjUzNTMyOSk7XG4gICAgICAgIGEgPSB0aGlzLmdnKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA1LCAtMTY1Nzk2NTEwKTtcbiAgICAgICAgZCA9IHRoaXMuZ2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKTtcbiAgICAgICAgYyA9IHRoaXMuZ2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgNjQzNzE3NzEzKTtcbiAgICAgICAgYiA9IHRoaXMuZ2coYiwgYywgZCwgYSwgeFtpXSwgMjAsIC0zNzM4OTczMDIpO1xuICAgICAgICBhID0gdGhpcy5nZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSk7XG4gICAgICAgIGQgPSB0aGlzLmdnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgOSwgMzgwMTYwODMpO1xuICAgICAgICBjID0gdGhpcy5nZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICAgICAgYiA9IHRoaXMuZ2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICAgICAgYSA9IHRoaXMuZ2coYSwgYiwgYywgZCwgeFtpICsgOV0sIDUsIDU2ODQ0NjQzOCk7XG4gICAgICAgIGQgPSB0aGlzLmdnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgOSwgLTEwMTk4MDM2OTApO1xuICAgICAgICBjID0gdGhpcy5nZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgICAgICBiID0gdGhpcy5nZyhiLCBjLCBkLCBhLCB4W2kgKyA4XSwgMjAsIDExNjM1MzE1MDEpO1xuICAgICAgICBhID0gdGhpcy5nZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICAgICAgZCA9IHRoaXMuZ2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NCk7XG4gICAgICAgIGMgPSB0aGlzLmdnKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNCwgMTczNTMyODQ3Myk7XG4gICAgICAgIGIgPSB0aGlzLmdnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcbiAgICAgICAgYSA9IHRoaXMuaGgoYSwgYiwgYywgZCwgeFtpICsgNV0sIDQsIC0zNzg1NTgpO1xuICAgICAgICBkID0gdGhpcy5oaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICAgICAgYyA9IHRoaXMuaGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2Mik7XG4gICAgICAgIGIgPSB0aGlzLmhoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgICAgIGEgPSB0aGlzLmhoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MCk7XG4gICAgICAgIGQgPSB0aGlzLmhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1Myk7XG4gICAgICAgIGMgPSB0aGlzLmhoKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgICAgIGIgPSB0aGlzLmhoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICAgICAgYSA9IHRoaXMuaGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCA0LCA2ODEyNzkxNzQpO1xuICAgICAgICBkID0gdGhpcy5oaChkLCBhLCBiLCBjLCB4W2ldLCAxMSwgLTM1ODUzNzIyMik7XG4gICAgICAgIGMgPSB0aGlzLmhoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgICAgIGIgPSB0aGlzLmhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpO1xuICAgICAgICBhID0gdGhpcy5oaChhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgICAgIGQgPSB0aGlzLmhoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgICAgICBjID0gdGhpcy5oaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApO1xuICAgICAgICBiID0gdGhpcy5oaChiLCBjLCBkLCBhLCB4W2kgKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xuICAgICAgICBhID0gdGhpcy5paShhLCBiLCBjLCBkLCB4W2ldLCA2LCAtMTk4NjMwODQ0KTtcbiAgICAgICAgZCA9IHRoaXMuaWkoZCwgYSwgYiwgYywgeFtpICsgN10sIDEwLCAxMTI2ODkxNDE1KTtcbiAgICAgICAgYyA9IHRoaXMuaWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgICAgICBiID0gdGhpcy5paShiLCBjLCBkLCBhLCB4W2kgKyA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgICAgIGEgPSB0aGlzLmlpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNiwgMTcwMDQ4NTU3MSk7XG4gICAgICAgIGQgPSB0aGlzLmlpKGQsIGEsIGIsIGMsIHhbaSArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgICAgICBjID0gdGhpcy5paShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgICAgIGIgPSB0aGlzLmlpKGIsIGMsIGQsIGEsIHhbaSArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgICAgICBhID0gdGhpcy5paShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSk7XG4gICAgICAgIGQgPSB0aGlzLmlpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgICAgIGMgPSB0aGlzLmlpKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgICAgICBiID0gdGhpcy5paShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KTtcbiAgICAgICAgYSA9IHRoaXMuaWkoYSwgYiwgYywgZCwgeFtpICsgNF0sIDYsIC0xNDU1MjMwNzApO1xuICAgICAgICBkID0gdGhpcy5paShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgICAgIGMgPSB0aGlzLmlpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KTtcbiAgICAgICAgYiA9IHRoaXMuaWkoYiwgYywgZCwgYSwgeFtpICsgOV0sIDIxLCAtMzQzNDg1NTUxKTtcbiAgICAgICAgYSA9IHRoaXMuYWRkbWUoYSwgb2xkYSk7XG4gICAgICAgIGIgPSB0aGlzLmFkZG1lKGIsIG9sZGIpO1xuICAgICAgICBjID0gdGhpcy5hZGRtZShjLCBvbGRjKTtcbiAgICAgICAgZCA9IHRoaXMuYWRkbWUoZCwgb2xkZCk7XG4gICAgICAgIGkgKz0gMTY7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yaGV4KGEpICsgdGhpcy5yaGV4KGIpICsgdGhpcy5yaGV4KGMpICsgdGhpcy5yaGV4KGQpO1xuICAgIH1cbiAgICAsIGlpOiBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgICAgcmV0dXJuIHRoaXMuY21uKHRoaXMuYml0WE9SKGMsIHRoaXMuYml0T1IoYiwgfmQpKSwgYSwgYiwgeCwgcywgdCk7XG4gICAgfVxuICAgICwgaGg6IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gICAgICByZXR1cm4gdGhpcy5jbW4odGhpcy5iaXRYT1IodGhpcy5iaXRYT1IoYiwgYyksIGQpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgLCBnZzogZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNtbih0aGlzLmJpdE9SKHRoaXMuYml0QU5EKGIsIGQpLCB0aGlzLmJpdEFORChjLCB+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgLCBmZjogZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNtbih0aGlzLmJpdE9SKHRoaXMuYml0QU5EKGIsIGMpLCB0aGlzLmJpdEFORCh+YiwgZCkpLCBhLCBiLCB4LCBzLCB0KTtcbiAgICB9XG4gICAgLCBjbW46IGZ1bmN0aW9uIChxLCBhLCBiLCB4LCBzLCB0KSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRtZSh0aGlzLnJvbCh0aGlzLmFkZG1lKHRoaXMuYWRkbWUoYSwgcSksIHRoaXMuYWRkbWUoeCwgdCkpLCBzKSwgYik7XG4gICAgfVxuICAgICwgcm9sOiBmdW5jdGlvbiAobnVtLCBjbnQpIHtcbiAgICAgIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbiAgICB9XG4gICAgLCBzdHIyYmxrczogZnVuY3Rpb24gKHN0cikge1xuICAgICAgdmFyIG5ibGsgPSAoc3RyLmxlbmd0aCArIDggPj4gNikgKyAxO1xuICAgICAgdmFyIGJsa3MgPSBuZXcgQXJyYXkoKTtcbiAgICAgIHZhciBfZzEgPSAwLCBfZyA9IG5ibGsgKiAxNjtcbiAgICAgIHdoaWxlIChfZzEgPCBfZykge1xuICAgICAgICB2YXIgaSA9IF9nMSsrO1xuICAgICAgICBibGtzW2ldID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHdoaWxlIChpIDwgc3RyLmxlbmd0aCkge1xuICAgICAgICBibGtzW2kgPj4gMl0gfD0gSHhPdmVycmlkZXMuY2NhKHN0ciwgaSkgPDwgKHN0ci5sZW5ndGggKiA4ICsgaSkgJSA0ICogODtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgICAgYmxrc1tpID4+IDJdIHw9IDEyOCA8PCAoc3RyLmxlbmd0aCAqIDggKyBpKSAlIDQgKiA4O1xuICAgICAgdmFyIGwgPSBzdHIubGVuZ3RoICogODtcbiAgICAgIHZhciBrID0gbmJsayAqIDE2IC0gMjtcbiAgICAgIGJsa3Nba10gPSBsICYgMjU1O1xuICAgICAgYmxrc1trXSB8PSAobCA+Pj4gOCAmIDI1NSkgPDwgODtcbiAgICAgIGJsa3Nba10gfD0gKGwgPj4+IDE2ICYgMjU1KSA8PCAxNjtcbiAgICAgIGJsa3Nba10gfD0gKGwgPj4+IDI0ICYgMjU1KSA8PCAyNDtcbiAgICAgIHJldHVybiBibGtzO1xuICAgIH1cbiAgICAsIHJoZXg6IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgIHZhciBzdHIgPSBcIlwiO1xuICAgICAgdmFyIGhleF9jaHIgPSBcIjAxMjM0NTY3ODlhYmNkZWZcIjtcbiAgICAgIHZhciBfZyA9IDA7XG4gICAgICB3aGlsZSAoX2cgPCA0KSB7XG4gICAgICAgIHZhciBqID0gX2crKztcbiAgICAgICAgc3RyICs9IGhleF9jaHIuY2hhckF0KG51bSA+PiBqICogOCArIDQgJiAxNSkgKyBoZXhfY2hyLmNoYXJBdChudW0gPj4gaiAqIDggJiAxNSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICAsIGFkZG1lOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgdmFyIGxzdyA9ICh4ICYgNjU1MzUpICsgKHkgJiA2NTUzNSk7XG4gICAgICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gICAgICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgNjU1MzU7XG4gICAgfVxuICAgICwgYml0QU5EOiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgdmFyIGxzYiA9IGEgJiAxICYgKGIgJiAxKTtcbiAgICAgIHZhciBtc2IzMSA9IGEgPj4+IDEgJiBiID4+PiAxO1xuICAgICAgcmV0dXJuIG1zYjMxIDw8IDEgfCBsc2I7XG4gICAgfVxuICAgICwgYml0WE9SOiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgdmFyIGxzYiA9IGEgJiAxIF4gYiAmIDE7XG4gICAgICB2YXIgbXNiMzEgPSBhID4+PiAxIF4gYiA+Pj4gMTtcbiAgICAgIHJldHVybiBtc2IzMSA8PCAxIHwgbHNiO1xuICAgIH1cbiAgICAsIGJpdE9SOiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgdmFyIGxzYiA9IGEgJiAxIHwgYiAmIDE7XG4gICAgICB2YXIgbXNiMzEgPSBhID4+PiAxIHwgYiA+Pj4gMTtcbiAgICAgIHJldHVybiBtc2IzMSA8PCAxIHwgbHNiO1xuICAgIH1cbiAgICAsIF9fY2xhc3NfXzogaGF4ZS5NZDVcbiAgfVxuICBoYXhlLlRpbWVyID0gZnVuY3Rpb24gKHRpbWVfbXMpIHtcbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgIHRoaXMuaWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgbWUucnVuKCk7XG4gICAgfSwgdGltZV9tcyk7XG4gIH07XG4gIGhheGUuVGltZXIuX19uYW1lX18gPSB0cnVlO1xuICBoYXhlLlRpbWVyLmRlbGF5ID0gZnVuY3Rpb24gKGYsIHRpbWVfbXMpIHtcbiAgICB2YXIgdCA9IG5ldyBoYXhlLlRpbWVyKHRpbWVfbXMpO1xuICAgIHQucnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgdC5zdG9wKCk7XG4gICAgICBmKCk7XG4gICAgfTtcbiAgICByZXR1cm4gdDtcbiAgfVxuICBoYXhlLlRpbWVyLm1lYXN1cmUgPSBmdW5jdGlvbiAoZiwgcG9zKSB7XG4gICAgdmFyIHQwID0gaGF4ZS5UaW1lci5zdGFtcCgpO1xuICAgIHZhciByID0gZigpO1xuICAgIGhheGUuTG9nLnRyYWNlKGhheGUuVGltZXIuc3RhbXAoKSAtIHQwICsgXCJzXCIsIHBvcyk7XG4gICAgcmV0dXJuIHI7XG4gIH1cbiAgaGF4ZS5UaW1lci5zdGFtcCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwO1xuICB9XG4gIGhheGUuVGltZXIucHJvdG90eXBlID0ge1xuICAgIHJ1bjogZnVuY3Rpb24gKCkge1xuICAgIH1cbiAgICAsIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmlkID09IG51bGwpIHJldHVybjtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaWQpO1xuICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgfVxuICAgICwgX19jbGFzc19fOiBoYXhlLlRpbWVyXG4gIH1cbiAgdmFyIGpzID0ganMgfHwge31cbiAganMuQm9vdCA9IGZ1bmN0aW9uICgpIHsgfVxuICBqcy5Cb290Ll9fbmFtZV9fID0gdHJ1ZTtcbiAganMuQm9vdC5fX3VuaHRtbCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIHMuc3BsaXQoXCImXCIpLmpvaW4oXCImYW1wO1wiKS5zcGxpdChcIjxcIikuam9pbihcIiZsdDtcIikuc3BsaXQoXCI+XCIpLmpvaW4oXCImZ3Q7XCIpO1xuICB9XG4gIGpzLkJvb3QuX190cmFjZSA9IGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgdmFyIG1zZyA9IGkgIT0gbnVsbCA/IGkuZmlsZU5hbWUgKyBcIjpcIiArIGkubGluZU51bWJlciArIFwiOiBcIiA6IFwiXCI7XG4gICAgbXNnICs9IGpzLkJvb3QuX19zdHJpbmdfcmVjKHYsIFwiXCIpO1xuICAgIHZhciBkO1xuICAgIGlmICh0eXBlb2YgKGRvY3VtZW50KSAhPSBcInVuZGVmaW5lZFwiICYmIChkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoYXhlOnRyYWNlXCIpKSAhPSBudWxsKSBkLmlubmVySFRNTCArPSBqcy5Cb290Ll9fdW5odG1sKG1zZykgKyBcIjxici8+XCI7IGVsc2UgaWYgKHR5cGVvZiAoY29uc29sZSkgIT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLmxvZyAhPSBudWxsKSBjb25zb2xlLmxvZyhtc2cpO1xuICB9XG4gIGpzLkJvb3QuX19jbGVhcl90cmFjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGF4ZTp0cmFjZVwiKTtcbiAgICBpZiAoZCAhPSBudWxsKSBkLmlubmVySFRNTCA9IFwiXCI7XG4gIH1cbiAganMuQm9vdC5pc0NsYXNzID0gZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gby5fX25hbWVfXztcbiAgfVxuICBqcy5Cb290LmlzRW51bSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIGUuX19lbmFtZV9fO1xuICB9XG4gIGpzLkJvb3QuZ2V0Q2xhc3MgPSBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiBvLl9fY2xhc3NfXztcbiAgfVxuICBqcy5Cb290Ll9fc3RyaW5nX3JlYyA9IGZ1bmN0aW9uIChvLCBzKSB7XG4gICAgaWYgKG8gPT0gbnVsbCkgcmV0dXJuIFwibnVsbFwiO1xuICAgIGlmIChzLmxlbmd0aCA+PSA1KSByZXR1cm4gXCI8Li4uPlwiO1xuICAgIHZhciB0ID0gdHlwZW9mIChvKTtcbiAgICBpZiAodCA9PSBcImZ1bmN0aW9uXCIgJiYgKG8uX19uYW1lX18gfHwgby5fX2VuYW1lX18pKSB0ID0gXCJvYmplY3RcIjtcbiAgICBzd2l0Y2ggKHQpIHtcbiAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgaWYgKG8gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGlmIChvLl9fZW51bV9fKSB7XG4gICAgICAgICAgICBpZiAoby5sZW5ndGggPT0gMikgcmV0dXJuIG9bMF07XG4gICAgICAgICAgICB2YXIgc3RyID0gb1swXSArIFwiKFwiO1xuICAgICAgICAgICAgcyArPSBcIlxcdFwiO1xuICAgICAgICAgICAgdmFyIF9nMSA9IDIsIF9nID0gby5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoX2cxIDwgX2cpIHtcbiAgICAgICAgICAgICAgdmFyIGkgPSBfZzErKztcbiAgICAgICAgICAgICAgaWYgKGkgIT0gMikgc3RyICs9IFwiLFwiICsganMuQm9vdC5fX3N0cmluZ19yZWMob1tpXSwgcyk7IGVsc2Ugc3RyICs9IGpzLkJvb3QuX19zdHJpbmdfcmVjKG9baV0sIHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0ciArIFwiKVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbCA9IG8ubGVuZ3RoO1xuICAgICAgICAgIHZhciBpO1xuICAgICAgICAgIHZhciBzdHIgPSBcIltcIjtcbiAgICAgICAgICBzICs9IFwiXFx0XCI7XG4gICAgICAgICAgdmFyIF9nID0gMDtcbiAgICAgICAgICB3aGlsZSAoX2cgPCBsKSB7XG4gICAgICAgICAgICB2YXIgaTEgPSBfZysrO1xuICAgICAgICAgICAgc3RyICs9IChpMSA+IDAgPyBcIixcIiA6IFwiXCIpICsganMuQm9vdC5fX3N0cmluZ19yZWMob1tpMV0sIHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHIgKz0gXCJdXCI7XG4gICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG9zdHI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdG9zdHIgPSBvLnRvU3RyaW5nO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIFwiPz8/XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvc3RyICE9IG51bGwgJiYgdG9zdHIgIT0gT2JqZWN0LnRvU3RyaW5nKSB7XG4gICAgICAgICAgdmFyIHMyID0gby50b1N0cmluZygpO1xuICAgICAgICAgIGlmIChzMiAhPSBcIltvYmplY3QgT2JqZWN0XVwiKSByZXR1cm4gczI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGsgPSBudWxsO1xuICAgICAgICB2YXIgc3RyID0gXCJ7XFxuXCI7XG4gICAgICAgIHMgKz0gXCJcXHRcIjtcbiAgICAgICAgdmFyIGhhc3AgPSBvLmhhc093blByb3BlcnR5ICE9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGsgaW4gbykge1xuICAgICAgICAgIDtcbiAgICAgICAgICBpZiAoaGFzcCAmJiAhby5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChrID09IFwicHJvdG90eXBlXCIgfHwgayA9PSBcIl9fY2xhc3NfX1wiIHx8IGsgPT0gXCJfX3N1cGVyX19cIiB8fCBrID09IFwiX19pbnRlcmZhY2VzX19cIiB8fCBrID09IFwiX19wcm9wZXJ0aWVzX19cIikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdHIubGVuZ3RoICE9IDIpIHN0ciArPSBcIiwgXFxuXCI7XG4gICAgICAgICAgc3RyICs9IHMgKyBrICsgXCIgOiBcIiArIGpzLkJvb3QuX19zdHJpbmdfcmVjKG9ba10sIHMpO1xuICAgICAgICB9XG4gICAgICAgIHMgPSBzLnN1YnN0cmluZygxKTtcbiAgICAgICAgc3RyICs9IFwiXFxuXCIgKyBzICsgXCJ9XCI7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgcmV0dXJuIFwiPGZ1bmN0aW9uPlwiO1xuICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICByZXR1cm4gbztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBTdHJpbmcobyk7XG4gICAgfVxuICB9XG4gIGpzLkJvb3QuX19pbnRlcmZMb29wID0gZnVuY3Rpb24gKGNjLCBjbCkge1xuICAgIGlmIChjYyA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGNjID09IGNsKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgaW50ZiA9IGNjLl9faW50ZXJmYWNlc19fO1xuICAgIGlmIChpbnRmICE9IG51bGwpIHtcbiAgICAgIHZhciBfZzEgPSAwLCBfZyA9IGludGYubGVuZ3RoO1xuICAgICAgd2hpbGUgKF9nMSA8IF9nKSB7XG4gICAgICAgIHZhciBpID0gX2cxKys7XG4gICAgICAgIHZhciBpMSA9IGludGZbaV07XG4gICAgICAgIGlmIChpMSA9PSBjbCB8fCBqcy5Cb290Ll9faW50ZXJmTG9vcChpMSwgY2wpKSByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGpzLkJvb3QuX19pbnRlcmZMb29wKGNjLl9fc3VwZXJfXywgY2wpO1xuICB9XG4gIGpzLkJvb3QuX19pbnN0YW5jZW9mID0gZnVuY3Rpb24gKG8sIGNsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChvIGluc3RhbmNlb2YgY2wpIHtcbiAgICAgICAgaWYgKGNsID09IEFycmF5KSByZXR1cm4gby5fX2VudW1fXyA9PSBudWxsO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChqcy5Cb290Ll9faW50ZXJmTG9vcChvLl9fY2xhc3NfXywgY2wpKSByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoY2wgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNsKSB7XG4gICAgICBjYXNlIEludDpcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChvICUgMjE0NzQ4MzY0OC4wKSA9PT0gbztcbiAgICAgIGNhc2UgRmxvYXQ6XG4gICAgICAgIHJldHVybiB0eXBlb2YgKG8pID09IFwibnVtYmVyXCI7XG4gICAgICBjYXNlIEJvb2w6XG4gICAgICAgIHJldHVybiBvID09PSB0cnVlIHx8IG8gPT09IGZhbHNlO1xuICAgICAgY2FzZSBTdHJpbmc6XG4gICAgICAgIHJldHVybiB0eXBlb2YgKG8pID09IFwic3RyaW5nXCI7XG4gICAgICBjYXNlIER5bmFtaWM6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKG8gPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoY2wgPT0gQ2xhc3MgJiYgby5fX25hbWVfXyAhPSBudWxsKSByZXR1cm4gdHJ1ZTsgZWxzZSBudWxsO1xuICAgICAgICBpZiAoY2wgPT0gRW51bSAmJiBvLl9fZW5hbWVfXyAhPSBudWxsKSByZXR1cm4gdHJ1ZTsgZWxzZSBudWxsO1xuICAgICAgICByZXR1cm4gby5fX2VudW1fXyA9PSBjbDtcbiAgICB9XG4gIH1cbiAganMuQm9vdC5fX2Nhc3QgPSBmdW5jdGlvbiAobywgdCkge1xuICAgIGlmIChqcy5Cb290Ll9faW5zdGFuY2VvZihvLCB0KSkgcmV0dXJuIG87IGVsc2UgdGhyb3cgXCJDYW5ub3QgY2FzdCBcIiArIFN0ZC5zdHJpbmcobykgKyBcIiB0byBcIiArIFN0ZC5zdHJpbmcodCk7XG4gIH1cbiAganMuTGliID0gZnVuY3Rpb24gKCkgeyB9XG4gIGpzLkxpYi5fX25hbWVfXyA9IHRydWU7XG4gIGpzLkxpYi5kZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgfVxuICBqcy5MaWIuYWxlcnQgPSBmdW5jdGlvbiAodikge1xuICAgIGFsZXJ0KGpzLkJvb3QuX19zdHJpbmdfcmVjKHYsIFwiXCIpKTtcbiAgfVxuICBqcy5MaWIuZXZhbCA9IGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgcmV0dXJuIGV2YWwoY29kZSk7XG4gIH1cbiAganMuTGliLnNldEVycm9ySGFuZGxlciA9IGZ1bmN0aW9uIChmKSB7XG4gICAganMuTGliLm9uZXJyb3IgPSBmO1xuICB9XG4gIHZhciAkXztcbiAgZnVuY3Rpb24gJGJpbmQobywgbSkgeyB2YXIgZiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGYubWV0aG9kLmFwcGx5KGYuc2NvcGUsIGFyZ3VtZW50cyk7IH07IGYuc2NvcGUgPSBvOyBmLm1ldGhvZCA9IG07IHJldHVybiBmOyB9O1xuICBpZiAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIEh4T3ZlcnJpZGVzLnJlbW92ZSA9IGZ1bmN0aW9uIChhLCBvKSB7XG4gICAgdmFyIGkgPSBhLmluZGV4T2Yobyk7XG4gICAgaWYgKGkgPT0gLTEpIHJldHVybiBmYWxzZTtcbiAgICBhLnNwbGljZShpLCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTsgZWxzZSBudWxsO1xuICBNYXRoLl9fbmFtZV9fID0gW1wiTWF0aFwiXTtcbiAgTWF0aC5OYU4gPSBOdW1iZXIuTmFOO1xuICBNYXRoLk5FR0FUSVZFX0lORklOSVRZID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuICBNYXRoLlBPU0lUSVZFX0lORklOSVRZID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICBNYXRoLmlzRmluaXRlID0gZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gaXNGaW5pdGUoaSk7XG4gIH07XG4gIE1hdGguaXNOYU4gPSBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBpc05hTihpKTtcbiAgfTtcbiAgU3RyaW5nLnByb3RvdHlwZS5fX2NsYXNzX18gPSBTdHJpbmc7XG4gIFN0cmluZy5fX25hbWVfXyA9IHRydWU7XG4gIEFycmF5LnByb3RvdHlwZS5fX2NsYXNzX18gPSBBcnJheTtcbiAgQXJyYXkuX19uYW1lX18gPSB0cnVlO1xuICBEYXRlLnByb3RvdHlwZS5fX2NsYXNzX18gPSBEYXRlO1xuICBEYXRlLl9fbmFtZV9fID0gW1wiRGF0ZVwiXTtcbiAgdmFyIEludCA9IHsgX19uYW1lX186IFtcIkludFwiXSB9O1xuICB2YXIgRHluYW1pYyA9IHsgX19uYW1lX186IFtcIkR5bmFtaWNcIl0gfTtcbiAgdmFyIEZsb2F0ID0gTnVtYmVyO1xuICBGbG9hdC5fX25hbWVfXyA9IFtcIkZsb2F0XCJdO1xuICB2YXIgQm9vbCA9IEJvb2xlYW47XG4gIEJvb2wuX19lbmFtZV9fID0gW1wiQm9vbFwiXTtcbiAgdmFyIENsYXNzID0geyBfX25hbWVfXzogW1wiQ2xhc3NcIl0gfTtcbiAgdmFyIEVudW0gPSB7fTtcbiAgdmFyIFZvaWQgPSB7IF9fZW5hbWVfXzogW1wiVm9pZFwiXSB9O1xuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9IFwidW5kZWZpbmVkXCIpIGpzLkxpYi5kb2N1bWVudCA9IGRvY3VtZW50O1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAganMuTGliLndpbmRvdyA9IHdpbmRvdztcbiAgICBqcy5MaWIud2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbiAobXNnLCB1cmwsIGxpbmUpIHtcbiAgICAgIHZhciBmID0ganMuTGliLm9uZXJyb3I7XG4gICAgICBpZiAoZiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gZihtc2csIFt1cmwgKyBcIjpcIiArIGxpbmVdKTtcbiAgICB9O1xuICB9XG4gIGNvbS53aXJpcy5qcy5Kc1BsdWdpblRvb2xzLm1haW4oKTtcbn0oKSk7XG5kZWxldGUgQXJyYXkucHJvdG90eXBlLl9fY2xhc3NfXztcbi8vIEBjb2RpbmdTdGFuZGFyZHNJZ25vcmVFbmRcbiIsImltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgTGF0ZXggZnJvbSAnLi9sYXRleCc7XG5pbXBvcnQgTWF0aE1MIGZyb20gJy4vbWF0aG1sJztcbmltcG9ydCBJbWFnZSBmcm9tICcuL2ltYWdlJztcbmltcG9ydCBBY2Nlc3NpYmlsaXR5IGZyb20gJy4vYWNjZXNzaWJpbGl0eSc7XG5pbXBvcnQgU2VydmljZVByb3ZpZGVyIGZyb20gJy4vc2VydmljZXByb3ZpZGVyJztcbmltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4vY29uZmlndXJhdGlvbic7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4vY29uc3RhbnRzJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IG1kNSBmcm9tICcuL21kNSc7XG5cbi8qKlxuICogQGNsYXNzZGVzY1xuICogVGhpcyBjbGFzcyByZXByZXNlbnQgYSBNYWhNTCBwYXJzZXIuIENvbnZlcnRzIE1hdGhNTCBpbnRvIGZvcm11bGFzIGRlcGVuZGluZyBvbiB0aGVcbiAqIGltYWdlIGZvcm1hdCAoU1ZHLCBQTkcsIGJhc2U2NCkgYW5kIHRoZSBzYXZlIG1vZGUgKFhNTCwgc2FmZVhNTCwgSW1hZ2UpIGNvbmZpZ3VyZWRcbiAqIGluIHRoZSBiYWNrZW5kLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJzZXIge1xuICAvKipcbiAgICogQ29udmVydHMgYSBNYXRoTUwgc3RyaW5nIHRvIGFuIGltZyBlbGVtZW50LlxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBjcmVhdG9yIC0gRG9jdW1lbnQgb2JqZWN0IHRvIGNhbGwgY3JlYXRlRWxlbWVudCBtZXRob2QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXRobWwgLSBNYXRoTUwgY29kZVxuICAgKiBAcGFyYW0ge09iamVjdFtdfSB3aXJpc1Byb3BlcnRpZXMgLSBvYmplY3QgY29udGFpbmluZyBXSVJJUyBjdXN0b20gcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge2xhbmd1YWdlfSBsYW5ndWFnZSAtIGN1c3RvbSBsYW5ndWFnZSBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICogQHJldHVybnMge0hUTUxJbWFnZUVsZW1lbnR9IHRoZSBmb3JtdWxhIGltYWdlIGNvcnJlc3BvbmRpbmcgdG8gaW5pdGlhbCBNYXRoTUwgc3RyaW5nLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgbWF0aG1sVG9JbWdPYmplY3QoY3JlYXRvciwgbWF0aG1sLCB3aXJpc1Byb3BlcnRpZXMsIGxhbmd1YWdlKSB7XG4gICAgY29uc3QgaW1nT2JqZWN0ID0gY3JlYXRvci5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWdPYmplY3QuYWxpZ24gPSAnbWlkZGxlJztcbiAgICBpbWdPYmplY3Quc3R5bGUubWF4V2lkdGggPSAnbm9uZSc7XG4gICAgbGV0IGRhdGEgPSB3aXJpc1Byb3BlcnRpZXMgfHwge307XG5cbiAgICAvLyBUYWtlIGludG8gYWNjb3VudCB0aGUgYmFja2VuZCBjb25maWdcbiAgICBjb25zdCB3aXJpc0VkaXRvclByb3BlcnRpZXMgPSBDb25maWd1cmF0aW9uLmdldChcImVkaXRvclBhcmFtZXRlcnNcIik7XG4gICAgZGF0YSA9IHsgLi4ud2lyaXNFZGl0b3JQcm9wZXJ0aWVzLCAuLi5kYXRhIH07XG5cbiAgICBkYXRhLm1tbCA9IG1hdGhtbDtcbiAgICBkYXRhLmxhbmcgPSBsYW5ndWFnZTtcbiAgICAvLyBSZXF1ZXN0IG1ldHJpY3Mgb2YgdGhlIGdlbmVyYXRlZCBpbWFnZS5cbiAgICBkYXRhLm1ldHJpY3MgPSAndHJ1ZSc7XG4gICAgZGF0YS5jZW50ZXJiYXNlbGluZSA9ICdmYWxzZSc7XG5cbiAgICAvLyBGdWxsIGJhc2U2NCBtZXRob2QgKGVkaXQgJiBzYXZlKS5cbiAgICBpZiAoQ29uZmlndXJhdGlvbi5nZXQoJ3NhdmVNb2RlJykgPT09ICdiYXNlNjQnICYmIENvbmZpZ3VyYXRpb24uZ2V0KCdiYXNlNjRzYXZlbW9kZScpID09PSAnZGVmYXVsdCcpIHtcbiAgICAgIGRhdGEuYmFzZTY0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIganMgcGFyYW1zOiBfd3JzX2ludF93aXJpc1Byb3BlcnRpZXMgY29udGFpbnMgc29tZSBqcyByZW5kZXIgcGFyYW1zLlxuICAgIC8vIFNpbmNlIE1hdGhNTCBjYW4gc3VwcG9ydCByZW5kZXIgcGFyYW1zLCBqcyBwYXJhbXMgc2hvdWxkIGJlIHNlbmQgb25seSB0byBlZGl0b3IuXG5cbiAgICBpbWdPYmplY3QuY2xhc3NOYW1lID0gQ29uZmlndXJhdGlvbi5nZXQoJ2ltYWdlQ2xhc3NOYW1lJyk7XG5cbiAgICBpZiAobWF0aG1sLmluZGV4T2YoJ2NsYXNzPVwiJykgIT09IC0xKSB7XG4gICAgICAvLyBXZSBjaGVjayBoZXJlIGlmIHRoZSBNYXRoTUwgaGFzIGJlZW4gY3JlYXRlZCBmcm9tIGEgY3VzdG9tRWRpdG9yIChzdWNoIGNoZW1pc3RyeSlcbiAgICAgIC8vIHRvIGFkZCBjdXN0b20gZWRpdG9yIG5hbWUgYXR0cmlidXRlIHRvIGltZyBvYmplY3QgKGlmIG5lY2Vzc2FyeSkuXG4gICAgICBsZXQgbWF0aG1sU3Vic3RyaW5nID0gbWF0aG1sLnN1YnN0cmluZyhtYXRobWwuaW5kZXhPZignY2xhc3M9XCInKSArICdjbGFzcz1cIicubGVuZ3RoLCBtYXRobWwubGVuZ3RoKTtcbiAgICAgIG1hdGhtbFN1YnN0cmluZyA9IG1hdGhtbFN1YnN0cmluZy5zdWJzdHJpbmcoMCwgbWF0aG1sU3Vic3RyaW5nLmluZGV4T2YoJ1wiJykpO1xuICAgICAgbWF0aG1sU3Vic3RyaW5nID0gbWF0aG1sU3Vic3RyaW5nLnN1YnN0cmluZyg0LCBtYXRobWxTdWJzdHJpbmcubGVuZ3RoKTtcbiAgICAgIGltZ09iamVjdC5zZXRBdHRyaWJ1dGUoQ29uZmlndXJhdGlvbi5nZXQoJ2ltYWdlQ3VzdG9tRWRpdG9yTmFtZScpLCBtYXRobWxTdWJzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm1hbmNlIGVuYWJsZWQuXG4gICAgaWYgKENvbmZpZ3VyYXRpb24uZ2V0KCd3aXJpc1BsdWdpblBlcmZvcm1hbmNlJykgJiYgKENvbmZpZ3VyYXRpb24uZ2V0KCdzYXZlTW9kZScpID09PSAneG1sJyB8fCBDb25maWd1cmF0aW9uLmdldCgnc2F2ZU1vZGUnKSA9PT0gJ3NhZmVYbWwnKSkge1xuICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoUGFyc2VyLmNyZWF0ZVNob3dJbWFnZVNyYyhkYXRhLCBsYW5ndWFnZSkpO1xuICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICd3YXJuaW5nJykge1xuICAgICAgICAvLyBQT1NUIGNhbGwuXG4gICAgICAgIC8vIGlmIHRoZSBtYXRobWwgaXMgbWFsZm9ybWVkLCB0aGlzIGZ1bmN0aW9uIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UoU2VydmljZVByb3ZpZGVyLmdldFNlcnZpY2UoJ3Nob3dpbWFnZScsIGRhdGEpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAoeyByZXN1bHQgfSA9IHJlc3VsdCk7XG4gICAgICBpZiAocmVzdWx0LmZvcm1hdCA9PT0gJ3BuZycpIHtcbiAgICAgICAgaW1nT2JqZWN0LnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsJHtyZXN1bHQuY29udGVudH1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1nT2JqZWN0LnNyYyA9IGBkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGY4LCR7VXRpbC51cmxFbmNvZGUocmVzdWx0LmNvbnRlbnQpfWA7XG4gICAgICB9XG4gICAgICBpbWdPYmplY3Quc2V0QXR0cmlidXRlKENvbmZpZ3VyYXRpb24uZ2V0KCdpbWFnZU1hdGhtbEF0dHJpYnV0ZScpLCBNYXRoTUwuc2FmZVhtbEVuY29kZShtYXRobWwpKTtcbiAgICAgIEltYWdlLnNldEltZ1NpemUoaW1nT2JqZWN0LCByZXN1bHQuY29udGVudCwgdHJ1ZSk7XG5cbiAgICAgIGlmIChDb25maWd1cmF0aW9uLmdldCgnZW5hYmxlQWNjZXNzaWJpbGl0eScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LmFsdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpbWdPYmplY3QuYWx0ID0gQWNjZXNzaWJpbGl0eS5tYXRoTUxUb0FjY2Vzc2libGUobWF0aG1sLCBsYW5ndWFnZSwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW1nT2JqZWN0LmFsdCA9IHJlc3VsdC5hbHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVzdWx0ID0gUGFyc2VyLmNyZWF0ZUltYWdlU3JjKG1hdGhtbCwgZGF0YSk7XG4gICAgICBpbWdPYmplY3Quc2V0QXR0cmlidXRlKENvbmZpZ3VyYXRpb24uZ2V0KCdpbWFnZU1hdGhtbEF0dHJpYnV0ZScpLCBNYXRoTUwuc2FmZVhtbEVuY29kZShtYXRobWwpKTtcbiAgICAgIGltZ09iamVjdC5zcmMgPSByZXN1bHQ7XG4gICAgICBJbWFnZS5zZXRJbWdTaXplKGltZ09iamVjdCwgcmVzdWx0LCBDb25maWd1cmF0aW9uLmdldCgnc2F2ZU1vZGUnKSA9PT0gJ2Jhc2U2NCcgJiYgQ29uZmlndXJhdGlvbi5nZXQoJ2Jhc2U2NHNhdmVtb2RlJykgPT09ICdkZWZhdWx0Jyk7XG4gICAgICBpZiAoQ29uZmlndXJhdGlvbi5nZXQoJ2VuYWJsZUFjY2Vzc2liaWxpdHknKSkge1xuICAgICAgICBpbWdPYmplY3QuYWx0ID0gQWNjZXNzaWJpbGl0eS5tYXRoTUxUb0FjY2Vzc2libGUobWF0aG1sLCBsYW5ndWFnZSwgZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBQYXJzZXIub2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBQYXJzZXIub2JzZXJ2ZXIub2JzZXJ2ZShpbWdPYmplY3QpO1xuICAgIH1cblxuICAgIC8vIFJvbGUgbWF0aCBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEvcm9sZXMjbWF0aC5cbiAgICBpbWdPYmplY3Quc2V0QXR0cmlidXRlKCdyb2xlJywgJ21hdGgnKTtcbiAgICByZXR1cm4gaW1nT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNvdXJjZSB0byBzaG93aW1hZ2Ugc2VydmljZSBieSBjYWxsaW5nIGNyZWF0ZWltYWdlIHNlcnZpY2UuIFRoZVxuICAgKiBvdXRwdXQgb2YgdGhlIGNyZWF0ZWltYWdlIHNlcnZpY2UgaXMgYSBVUkwgcGF0aCBwb2ludGluZyB0byBzaG93aW1hZ2Ugc2VydmljZS5cbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIHdoZW4gcGVyZm9ybWFuY2UgaXMgZGlzYWJsZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXRobWwgLSBNYXRoTUwgY29kZS5cbiAgICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YSAtIGRhdGEgb2JqZWN0IGNvbnRhaW5pbmcgc2VydmljZSBwYXJhbWV0ZXJzLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgc2hvd2ltYWdlIHBhdGguXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlSW1hZ2VTcmMobWF0aG1sLCBkYXRhKSB7XG4gICAgLy8gRnVsbCBiYXNlNjQgbWV0aG9kIChlZGl0ICYgc2F2ZSkuXG4gICAgaWYgKENvbmZpZ3VyYXRpb24uZ2V0KCdzYXZlTW9kZScpID09PSAnYmFzZTY0JyAmJiBDb25maWd1cmF0aW9uLmdldCgnYmFzZTY0c2F2ZW1vZGUnKSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICBkYXRhLmJhc2U2NCA9IHRydWU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IFNlcnZpY2VQcm92aWRlci5nZXRTZXJ2aWNlKCdjcmVhdGVpbWFnZScsIGRhdGEpO1xuXG4gICAgaWYgKHJlc3VsdC5pbmRleE9mKCdAQkFTRUAnKSAhPT0gLTEpIHtcbiAgICAgIC8vIFJlcGxhY2luZyAnQEJBU0VAJyB3aXRoIHRoZSBiYXNlIFVSTCBvZiBjcmVhdGVpbWFnZS5cbiAgICAgIGNvbnN0IGJhc2VQYXJ0cyA9IFNlcnZpY2VQcm92aWRlci5nZXRTZXJ2aWNlUGF0aCgnY3JlYXRlaW1hZ2UnKS5zcGxpdCgnLycpO1xuICAgICAgYmFzZVBhcnRzLnBvcCgpO1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnNwbGl0KCdAQkFTRUAnKS5qb2luKGJhc2VQYXJ0cy5qb2luKCcvJykpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIGluaXRpYWwgSFRNTCBjb2RlLiBJZiB0aGUgSFRNTCBjb250YWlucyBkYXRhIGdlbmVyYXRlZCBieSBXSVJJUyxcbiAgICogdGhpcyBkYXRhIHdvdWxkIGJlIGNvbnZlcnRlZCBhcyBmb2xsb3dpbmc6XG4gICAqIDxwcmU+XG4gICAqIE1hdGhNTCBjb2RlOiBJbWFnZSBjb250YWluaW5nIHRoZSBjb3JyZXNwb25kaW5nIE1hdGhNTCBmb3JtdWxhcy5cbiAgICogTWF0aE1MIGNvZGUgd2l0aCBMYVRlWCBhbm5vdGF0aW9uIDogTGFUZVggc3RyaW5nLlxuICAgKiA8L3ByZT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBIVE1MIGNvZGUgY29udGFpbmluZyBNYXRoTUwgZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIC0gbGFuZ3VhZ2UgdG8gY3JlYXRlIGltYWdlIGFsdCB0ZXh0LlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBIVE1MIGNvZGUgd2l0aCB0aGUgb3JpZ2luYWwgTWF0aE1MIGNvbnZlcnRlZCBpbnRvIExhVGVYIGFuZCBpbWFnZXMuXG4gICAqL1xuICBzdGF0aWMgaW5pdFBhcnNlKGNvZGUsIGxhbmd1YWdlKSB7XG4gICAgLyogTm90ZTogVGhlIGNvZGUgaW5zaWRlIHRoaXMgZnVuY3Rpb24gaGFzIGJlZW4gaW52ZXJ0ZWQuXG4gICAgSWYgeW91IGludmVydCBhZ2FpbiB0aGUgY29kZSB0aGVuIHlvdSBjYW5ub3QgdXNlIGNvcnJlY3RseSBMYVRlWFxuICAgIGluIE1vb2RsZS5cbiAgICAqL1xuICAgIGNvZGUgPSBQYXJzZXIuaW5pdFBhcnNlU2F2ZU1vZGUoY29kZSwgbGFuZ3VhZ2UpO1xuICAgIHJldHVybiBQYXJzZXIuaW5pdFBhcnNlRWRpdE1vZGUoY29kZSk7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIGluaXRpYWwgSFRNTCBjb2RlIGRlcGVuZGluZyBvbiB0aGUgc2F2ZSBtb2RlLiBUcmFuc2Zvcm1zIGFsbCBNYXRoTUxcbiAgICogb2NjdXJyZW5jZXMgZm9yIGl0J3MgY29ycmVzcG9uZGVudCBpbWFnZSBvciBMYVRlWC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBIVE1MIGNvZGUgdG8gYmUgcGFyc2VkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSAtIGxhbmd1YWdlIHRvIGNyZWF0ZSBpbWFnZSBhbHQgdGV4dC5cbiAgICogQHJldHVybnMge3N0cmluZ30gSFRNTCBjb2RlIHBhcnNlZC5cbiAgICovXG4gIHN0YXRpYyBpbml0UGFyc2VTYXZlTW9kZShjb2RlLCBsYW5ndWFnZSkge1xuICAgIGlmIChDb25maWd1cmF0aW9uLmdldCgnc2F2ZU1vZGUnKSkge1xuICAgICAgLy8gQ29udmVydGluZyBYTUwgdG8gdGFncy5cbiAgICAgIGNvZGUgPSBMYXRleC5wYXJzZU1hdGhtbFRvTGF0ZXgoY29kZSwgQ29uc3RhbnRzLnNhZmVYbWxDaGFyYWN0ZXJzKTtcbiAgICAgIGNvZGUgPSBMYXRleC5wYXJzZU1hdGhtbFRvTGF0ZXgoY29kZSwgQ29uc3RhbnRzLnhtbENoYXJhY3RlcnMpO1xuICAgICAgY29kZSA9IFBhcnNlci5wYXJzZU1hdGhtbFRvSW1nKGNvZGUsIENvbnN0YW50cy5zYWZlWG1sQ2hhcmFjdGVycywgbGFuZ3VhZ2UpO1xuICAgICAgY29kZSA9IFBhcnNlci5wYXJzZU1hdGhtbFRvSW1nKGNvZGUsIENvbnN0YW50cy54bWxDaGFyYWN0ZXJzLCBsYW5ndWFnZSk7XG4gICAgICBpZiAoQ29uZmlndXJhdGlvbi5nZXQoJ3NhdmVNb2RlJykgPT09ICdiYXNlNjQnICYmIENvbmZpZ3VyYXRpb24uZ2V0KCdiYXNlNjRzYXZlbW9kZScpID09PSAnaW1hZ2UnKSB7XG4gICAgICAgIGNvZGUgPSBQYXJzZXIuY29kZUltZ1RyYW5zZm9ybShjb2RlLCAnYmFzZTY0MnNob3dpbWFnZScpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgaW5pdGlhbCBIVE1MIGNvZGUgZGVwZW5kaW5nIG9uIHRoZSBlZGl0IG1vZGUuXG4gICAqIElmICdsYXRleCcgcGFyc2VNb2RlIGlzIGVuYWJsZWQgYWxsIE1hdGhNTCBjb250YWluaW5nIGFuIGFubm90YXRpb24gd2l0aCBlbmNvZGluZz0nTGFUZVgnIHdpbGxcbiAgICogYmUgY29udmVydGVkIGludG8gYSBMYVRlWCBzdHJpbmcgaW5zdGVhZCBvZiBhbiBpbWFnZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBIVE1MIGNvZGUgY29udGFpbmluZyBNYXRoTUwuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHBhcnNlZCBIVE1MIGNvZGUuXG4gICAqL1xuICBzdGF0aWMgaW5pdFBhcnNlRWRpdE1vZGUoY29kZSkge1xuICAgIGlmIChDb25maWd1cmF0aW9uLmdldCgncGFyc2VNb2RlcycpLmluZGV4T2YoJ2xhdGV4JykgIT09IC0xKSB7XG4gICAgICBjb25zdCBpbWdMaXN0ID0gVXRpbC5nZXRFbGVtZW50c0J5TmFtZUZyb21TdHJpbmcoY29kZSwgJ2ltZycsIHRydWUpO1xuICAgICAgY29uc3QgdG9rZW4gPSAnZW5jb2Rpbmc9XCJMYVRlWFwiPic7XG4gICAgICAvLyBXaGlsZSByZXBsYWNpbmcgaW1hZ2VzIHdpdGggbGF0ZXgsIHRoZSBpbmRleGVzIG9mIHRoZSBmb3VuZCBpbWFnZXMgY2hhbmdlc1xuICAgICAgLy8gcmVzcGVjdGluZyB0aGUgb3JpZ2luYWwgY29kZSwgc28gdGhpcyBjYXJyeSBpcyBuZWVkZWQuXG4gICAgICBsZXQgY2FycnkgPSAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZ0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaW1nQ29kZSA9IGNvZGUuc3Vic3RyaW5nKGltZ0xpc3RbaV0uc3RhcnQgKyBjYXJyeSwgaW1nTGlzdFtpXS5lbmQgKyBjYXJyeSk7XG5cbiAgICAgICAgaWYgKGltZ0NvZGUuaW5kZXhPZihgIGNsYXNzPVwiJHtDb25maWd1cmF0aW9uLmdldCgnaW1hZ2VDbGFzc05hbWUnKX1cImApICE9PSAtMSkge1xuICAgICAgICAgIGxldCBtYXRobWxTdGFydFRva2VuID0gYCAke0NvbmZpZ3VyYXRpb24uZ2V0KCdpbWFnZU1hdGhtbEF0dHJpYnV0ZScpfT1cImA7XG4gICAgICAgICAgbGV0IG1hdGhtbFN0YXJ0ID0gaW1nQ29kZS5pbmRleE9mKG1hdGhtbFN0YXJ0VG9rZW4pO1xuXG4gICAgICAgICAgaWYgKG1hdGhtbFN0YXJ0ID09PSAtMSkge1xuICAgICAgICAgICAgbWF0aG1sU3RhcnRUb2tlbiA9ICcgYWx0PVwiJztcbiAgICAgICAgICAgIG1hdGhtbFN0YXJ0ID0gaW1nQ29kZS5pbmRleE9mKG1hdGhtbFN0YXJ0VG9rZW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtYXRobWxTdGFydCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG1hdGhtbFN0YXJ0ICs9IG1hdGhtbFN0YXJ0VG9rZW4ubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgbWF0aG1sRW5kID0gaW1nQ29kZS5pbmRleE9mKCdcIicsIG1hdGhtbFN0YXJ0KTtcbiAgICAgICAgICAgIGNvbnN0IG1hdGhtbCA9IFV0aWwuaHRtbFNhbml0aXplKE1hdGhNTC5zYWZlWG1sRGVjb2RlKGltZ0NvZGUuc3Vic3RyaW5nKG1hdGhtbFN0YXJ0LCBtYXRobWxFbmQpKSk7XG4gICAgICAgICAgICBsZXQgbGF0ZXhTdGFydFBvc2l0aW9uID0gbWF0aG1sLmluZGV4T2YodG9rZW4pO1xuXG4gICAgICAgICAgICBpZiAobGF0ZXhTdGFydFBvc2l0aW9uICE9PSAtMSkge1xuICAgICAgICAgICAgICBsYXRleFN0YXJ0UG9zaXRpb24gKz0gdG9rZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICBjb25zdCBsYXRleEVuZFBvc2l0aW9uID0gbWF0aG1sLmluZGV4T2YoJzwvYW5ub3RhdGlvbj4nLCBsYXRleFN0YXJ0UG9zaXRpb24pO1xuICAgICAgICAgICAgICBjb25zdCBsYXRleCA9IG1hdGhtbC5zdWJzdHJpbmcobGF0ZXhTdGFydFBvc2l0aW9uLCBsYXRleEVuZFBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICBjb25zdCByZXBsYWNlVGV4dCA9IGAkJCR7VXRpbC5odG1sRW50aXRpZXNEZWNvZGUobGF0ZXgpfSQkYDtcbiAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBjb2RlLnN1YnN0cmluZygwLCBpbWdMaXN0W2ldLnN0YXJ0ICsgY2FycnkpO1xuICAgICAgICAgICAgICBjb25zdCBlbmQgPSBjb2RlLnN1YnN0cmluZyhpbWdMaXN0W2ldLmVuZCArIGNhcnJ5KTtcbiAgICAgICAgICAgICAgY29kZSA9IHN0YXJ0ICsgcmVwbGFjZVRleHQgKyBlbmQ7XG4gICAgICAgICAgICAgIGNhcnJ5ICs9IHJlcGxhY2VUZXh0Lmxlbmd0aCAtIChpbWdMaXN0W2ldLmVuZCAtIGltZ0xpc3RbaV0uc3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBlbmQgSFRNTCBjb2RlLiBUaGUgZW5kIEhUTUwgY29kZSBpcyBIVE1MIGNvZGUgd2l0aCBlbWJlZGRlZCBpbWFnZXNcbiAgICogb3IgTGFUZVggZm9ybXVsYXMgY3JlYXRlZCB3aXRoIE1hdGhUeXBlLiA8YnI+XG4gICAqIEJ5IGRlZmF1bHQgdGhpcyBtZXRob2QgY29udmVydHMgdGhlIGZvcm11bGEgaW1hZ2VzIGFuZCBMYVRlWCBzdHJpbmdzIGluIE1hdGhNTC4gPGJyPlxuICAgKiBJZiBpbWFnZSBtb2RlIGlzIGVuYWJsZWQgdGhlIGltYWdlcyB3aWxsIG5vdCBiZSBjb252ZXJ0ZWQgaW50byBNYXRoTUwuIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uIHNlZSB7QGxpbmsgaHR0cHM6Ly9kb2NzLndpcmlzLmNvbS9tYXRodHlwZS9lbi9tYXRodHlwZS1pbnRlZ3JhdGlvbnMvbWF0aHR5cGUtd2ViLWludGVyZmFjZS1mZWF0dXJlcy9mdWxsLW1hdGhtbC1tb2RlLS0td2lyaXNwbHVnaW5zLWpzLmh0bWx9LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIEhUTUwgdG8gYmUgcGFyc2VkXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBIVE1MIGNvZGUgcGFyc2VkLlxuICAgKi9cbiAgc3RhdGljIGVuZFBhcnNlKGNvZGUpIHtcbiAgICAvLyBUcmFuc2Zvcm0gTGFUZVggb2N1cnJlbmNlcyB0byBNYXRoTUwgZWxlbWVudHMuXG4gICAgY29uc3QgY29kZUVuZFBhcnNlZEVkaXRNb2RlID0gUGFyc2VyLmVuZFBhcnNlRWRpdE1vZGUoY29kZSk7XG4gICAgLy8gVHJhbnNmb3JtIGltZyBlbGVtZW50cyB0byBNYXRoTUwgZWxlbWVudHMuXG4gICAgY29uc3QgY29kZUVuZFBhcnNlU2F2ZU1vZGUgPSBQYXJzZXIuZW5kUGFyc2VTYXZlTW9kZShjb2RlRW5kUGFyc2VkRWRpdE1vZGUpO1xuICAgIHJldHVybiBjb2RlRW5kUGFyc2VTYXZlTW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgZW5kIEhUTUwgY29kZSBkZXBlbmRpbmcgb24gdGhlIGVkaXQgbW9kZS5cbiAgICogLSBMYVRlWCBpcyBhbiBlbmFibGVkIHBhcnNlIG1vZGUsIGFsbCBMYVRlWCBvY2N1cnJlbmNlcyB3aWxsIGJlIGNvbnZlcnRlZCBpbnRvIE1hdGhNTC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBIVE1MIGNvZGUgdG8gYmUgcGFyc2VkLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBIVE1MIGNvZGUgcGFyc2VkLlxuICAgKi9cbiAgc3RhdGljIGVuZFBhcnNlRWRpdE1vZGUoY29kZSkge1xuICAgIC8vIENvbnZlcnRpbmcgTGFUZVggdG8gaW1hZ2VzLlxuICAgIGlmIChDb25maWd1cmF0aW9uLmdldCgncGFyc2VNb2RlcycpLmluZGV4T2YoJ2xhdGV4JykgIT09IC0xKSB7XG4gICAgICBsZXQgb3V0cHV0ID0gJyc7XG4gICAgICBsZXQgZW5kUG9zaXRpb24gPSAwO1xuICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBjb2RlLmluZGV4T2YoJyQkJyk7XG4gICAgICB3aGlsZSAoc3RhcnRQb3NpdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgb3V0cHV0ICs9IGNvZGUuc3Vic3RyaW5nKGVuZFBvc2l0aW9uLCBzdGFydFBvc2l0aW9uKTtcbiAgICAgICAgZW5kUG9zaXRpb24gPSBjb2RlLmluZGV4T2YoJyQkJywgc3RhcnRQb3NpdGlvbiArIDIpO1xuXG4gICAgICAgIGlmIChlbmRQb3NpdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgICAvLyBCZWZvcmUsIGl0IHdhcyBhIGNvbmRpdGlvbiBoZXJlIHRvIGV4ZWN1dGUgdGhlIG5leHQgY29kZWxpbmVzXG4gICAgICAgICAgLy8gJ2xhdGV4LmluZGV4T2YoJzwnKSA9PSAtMScuXG4gICAgICAgICAgLy8gV2UgZG9uJ3Qga25vdyB3aHkgaXQgd2FzIHVzZWQsIGJ1dCBzZWVtcyB0byBoYXZlIGEgY29uZmxpY3Qgd2l0aFxuICAgICAgICAgIC8vIGxhdGV4IGZvcm11bGFzIHRoYXQgY29udGFpbnMgJzwnLlxuICAgICAgICAgIGNvbnN0IGxhdGV4ID0gY29kZS5zdWJzdHJpbmcoc3RhcnRQb3NpdGlvbiArIDIsIGVuZFBvc2l0aW9uKTtcbiAgICAgICAgICBjb25zdCBkZWNvZGVkTGF0ZXggPSBVdGlsLmh0bWxFbnRpdGllc0RlY29kZShsYXRleCk7XG4gICAgICAgICAgbGV0IG1hdGhtbCA9IFV0aWwuaHRtbFNhbml0aXplKExhdGV4LmdldE1hdGhNTEZyb21MYXRleChkZWNvZGVkTGF0ZXgsIHRydWUpKTtcbiAgICAgICAgICBpZiAoIUNvbmZpZ3VyYXRpb24uZ2V0KCdzYXZlSGFuZFRyYWNlcycpKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgaGFuZCB0cmFjZXMuXG4gICAgICAgICAgICBtYXRobWwgPSBNYXRoTUwucmVtb3ZlQW5ub3RhdGlvbihtYXRobWwsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG91dHB1dCArPSBtYXRobWw7XG4gICAgICAgICAgZW5kUG9zaXRpb24gKz0gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXRwdXQgKz0gJyQkJztcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24gKyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnRQb3NpdGlvbiA9IGNvZGUuaW5kZXhPZignJCQnLCBlbmRQb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIG91dHB1dCArPSBjb2RlLnN1YnN0cmluZyhlbmRQb3NpdGlvbiwgY29kZS5sZW5ndGgpO1xuICAgICAgY29kZSA9IG91dHB1dDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgZW5kIEhUTUwgY29kZSBkZXBlbmRpbmcgb24gdGhlIHNhdmUgbW9kZS4gQ29udmVydHMgYWxsXG4gICAqIGltYWdlcyBpbnRvIHRoZSBlbGVtZW50IGRldGVybWluZWQgYnkgdGhlIHNhdmUgbW9kZTpcbiAgICogLSB4bWw6IFBhcnNlcyBpbWFnZXMgZm9ybXVsYXMgaW50byBNYXRoTUwuXG4gICAqIC0gc2FmZVhtbDogUGFyc2VzIGltYWdlcyBmb3JtdWxhcyBpbnRvIHNhZmVNQXRoTUxcbiAgICogLSBiYXNlNjQ6IFBhcnNlcyBpbWFnZXMgaW50byBiYXNlNjQgaW1hZ2VzLlxuICAgKiAtIGltYWdlOiBQYXJzZSBpbWFnZXMgaW50byBpbWFnZXMgKG5vIHBhcnNpbmcpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gSFRNTCBjb2RlIHRvIGJlIHBhcnNlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBIVE1MIGNvZGUgcGFyc2VkLlxuICAgKi9cbiAgc3RhdGljIGVuZFBhcnNlU2F2ZU1vZGUoY29kZSkge1xuICAgIGlmIChDb25maWd1cmF0aW9uLmdldCgnc2F2ZU1vZGUnKSkge1xuICAgICAgaWYgKENvbmZpZ3VyYXRpb24uZ2V0KCdzYXZlTW9kZScpID09PSAnc2FmZVhtbCcpIHtcbiAgICAgICAgY29kZSA9IFBhcnNlci5jb2RlSW1nVHJhbnNmb3JtKGNvZGUsICdpbWcybWF0aG1sJyk7XG4gICAgICB9IGVsc2UgaWYgKENvbmZpZ3VyYXRpb24uZ2V0KCdzYXZlTW9kZScpID09PSAneG1sJykge1xuICAgICAgICBjb2RlID0gUGFyc2VyLmNvZGVJbWdUcmFuc2Zvcm0oY29kZSwgJ2ltZzJtYXRobWwnKTtcbiAgICAgIH0gZWxzZSBpZiAoQ29uZmlndXJhdGlvbi5nZXQoJ3NhdmVNb2RlJykgPT09ICdiYXNlNjQnICYmIENvbmZpZ3VyYXRpb24uZ2V0KCdiYXNlNjRzYXZlbW9kZScpID09PSAnaW1hZ2UnKSB7XG4gICAgICAgIGNvZGUgPSBQYXJzZXIuY29kZUltZ1RyYW5zZm9ybShjb2RlLCAnaW1nMjY0Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvZGU7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBBdXhpbGlhciBmdW5jdGlvbiB0aGF0IGJ1aWxkcyB0aGUgZGF0YSBvYmplY3QgdG8gc2VuZCB0byB0aGUgc2hvd2ltYWdlIGVuZHBvaW50XG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGEgLSBvYmplY3QgY29udGFpbmluZyBzaG93aW1hZ2Ugc2VydmljZSBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgLSBzdHJpbmcgY29udGFpbmluZyB0aGUgbGFuZ3VhZ2Ugb2YgdGhlIGZvcm11bGEuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gb2JqZWN0IHdpdGggdGhlIGRhdGEgdG8gc2VuZCB0byBzaG93aW1hZ2UuXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlU2hvd0ltYWdlU3JjRGF0YShkYXRhLCBsYW5ndWFnZSkge1xuICAgIGNvbnN0IGRhdGFNZDUgPSB7fTtcbiAgICBjb25zdCByZW5kZXJQYXJhbXMgPSBbJ21tbCcsICdjb2xvcicsICdjZW50ZXJiYXNlbGluZScsICd6b29tJywgJ2RwaScsICdmb250U2l6ZScsICdmb250RmFtaWx5JywgJ2RlZmF1bHRTdHJldGNoeScsICdiYWNrZ3JvdW5kQ29sb3InLCAnZm9ybWF0J107XG4gICAgcmVuZGVyUGFyYW1zLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGRhdGFbcGFyYW1dICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBkYXRhTWQ1W3BhcmFtXSA9IGRhdGFbcGFyYW1dO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIERhdGEgdmFyaWFibGVzIHRvIGdldC5cbiAgICBjb25zdCBkYXRhT2JqZWN0ID0ge307XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAvLyBXZSBkb24ndCBuZWVkIG1hdGhtbCBpbiB0aGlzIHJlcXVlc3Qgd2UgdHJ5IHRvIGdldCBjYWNoZWQuXG4gICAgICAvLyBPbmx5IG5lZWQgdGhlIGZvcm11bGEgbWQ1IGNhbGN1bGF0ZWQgYmVmb3JlLlxuICAgICAgaWYgKGtleSAhPT0gJ21tbCcpIHtcbiAgICAgICAgZGF0YU9iamVjdFtrZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGF0YU9iamVjdC5mb3JtdWxhID0gY29tLndpcmlzLmpzLkpzUGx1Z2luVG9vbHMubWQ1ZW5jb2RlKFV0aWwucHJvcGVydGllc1RvU3RyaW5nKGRhdGFNZDUpKTtcbiAgICBkYXRhT2JqZWN0LmxhbmcgPSAodHlwZW9mIGxhbmd1YWdlID09PSAndW5kZWZpbmVkJykgPyAnZW4nIDogbGFuZ3VhZ2U7XG4gICAgZGF0YU9iamVjdC52ZXJzaW9uID0gQ29uZmlndXJhdGlvbi5nZXQoJ3ZlcnNpb24nKTtcblxuICAgIHJldHVybiBkYXRhT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlc3VsdCB0byBjYWxsIHNob3dpbWFnZSBzZXJ2aWNlIHdpdGggdGhlIGZvcm11bGEgbWQ1IGFzIHBhcmFtZXRlci5cbiAgICogIFRoZSByZXN1bHQgY291bGQgYmU6XG4gICAqIC0geydzdGF0dXMnIDogd2FybmluZyd9IDogVGhlIGltYWdlIGFzc29jaWF0ZWQgdG8gdGhlIE1hdGhNTCBtZDUgaXMgbm90IGluIGNhY2hlLlxuICAgKiAtIHsnc3RhdHVzJyA6ICdvaycgLi4ufSA6IFRoZSBpbWFnZSBhc3NvY2lhdGVkIHRvIHRoZSBNYXRoTUwgbWQ1IGlzIGluIGNhY2hlLlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhIC0gb2JqZWN0IGNvbnRhaW5pbmcgc2hvd2ltYWdlIHNlcnZpY2UgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIC0gc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGxhbmd1YWdlIG9mIHRoZSBmb3JtdWxhLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIG9iamVjdCBjb250YWluaW5nIHNob3dpbWFnZSByZXNwb25zZS5cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVTaG93SW1hZ2VTcmMoZGF0YSwgbGFuZ3VhZ2UpIHtcbiAgICBjb25zdCBkYXRhT2JqZWN0ID0gdGhpcy5jcmVhdGVTaG93SW1hZ2VTcmNEYXRhKGRhdGEsIGxhbmd1YWdlKTtcbiAgICBjb25zdCByZXN1bHQgPSBTZXJ2aWNlUHJvdmlkZXIuZ2V0U2VydmljZSgnc2hvd2ltYWdlJywgVXRpbC5odHRwQnVpbGRRdWVyeShkYXRhT2JqZWN0KSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gaHRtbCBpbWcgdGFncyBpbnNpZGUgYSBodG1sIGNvZGUgdG8gbWF0aG1sLCBiYXNlNjQgaW1nIHRhZ3MgKGkuZSB3aXRoIGJhc2U2NCBvbiBzcmMpXG4gICAqIG9yIHNob3dpbWFnZSBpbWcgdGFncyAoaS5lIHdpdGggc2hvd2ltYWdlLnBocCBvbiBzcmMpXG4gICAqIEBwYXJhbSAge3N0cmluZ30gY29kZSAtIEhUTUwgY29kZVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IG1vZGUgLSBiYXNlNjQyc2hvd2ltYWdlIG9yIGltZzJtYXRobWwgb3IgaW1nMjY0IHRyYW5zZm9ybS5cbiAgICogQHJldHVybnMge3N0cmluZ30gaHRtbCAtIGNvZGUgdHJhbnNmb3JtZWQuXG4gICAqL1xuICBzdGF0aWMgY29kZUltZ1RyYW5zZm9ybShjb2RlLCBtb2RlKSB7XG4gICAgbGV0IG91dHB1dCA9ICcnO1xuICAgIGxldCBlbmRQb3NpdGlvbiA9IDA7XG4gICAgY29uc3QgcGF0dGVybiA9IC88aW1nL2dpO1xuICAgIGNvbnN0IHBhdHRlcm5MZW5ndGggPSBwYXR0ZXJuLnNvdXJjZS5sZW5ndGg7XG5cbiAgICB3aGlsZSAocGF0dGVybi50ZXN0KGNvZGUpKSB7XG4gICAgICBjb25zdCBzdGFydFBvc2l0aW9uID0gcGF0dGVybi5sYXN0SW5kZXggLSBwYXR0ZXJuTGVuZ3RoO1xuICAgICAgb3V0cHV0ICs9IGNvZGUuc3Vic3RyaW5nKGVuZFBvc2l0aW9uLCBzdGFydFBvc2l0aW9uKTtcblxuICAgICAgbGV0IGkgPSBzdGFydFBvc2l0aW9uICsgMTtcblxuICAgICAgd2hpbGUgKGkgPCBjb2RlLmxlbmd0aCAmJiBlbmRQb3NpdGlvbiA8PSBzdGFydFBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IGNoYXJhY3RlciA9IGNvZGUuY2hhckF0KGkpO1xuXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgPT09ICdcIicgfHwgY2hhcmFjdGVyID09PSAnXFwnJykge1xuICAgICAgICAgIGNvbnN0IGNoYXJhY3Rlck5leHRQb3NpdGlvbiA9IGNvZGUuaW5kZXhPZihjaGFyYWN0ZXIsIGkgKyAxKTtcblxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJOZXh0UG9zaXRpb24gPT09IC0xKSB7XG4gICAgICAgICAgICBpID0gY29kZS5sZW5ndGg7IC8vIEVuZCB3aGlsZS5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSA9IGNoYXJhY3Rlck5leHRQb3NpdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAnPicpIHtcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IGkgKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW5kUG9zaXRpb24gPCBzdGFydFBvc2l0aW9uKSB7IC8vIFRoZSBpbWcgdGFnIGlzIHN0cmlwcGVkLlxuICAgICAgICBvdXRwdXQgKz0gY29kZS5zdWJzdHJpbmcoc3RhcnRQb3NpdGlvbiwgY29kZS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgfVxuICAgICAgbGV0IGltZ0NvZGUgPSBjb2RlLnN1YnN0cmluZyhzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XG4gICAgICBjb25zdCBpbWdPYmplY3QgPSBVdGlsLmNyZWF0ZU9iamVjdChpbWdDb2RlKTtcbiAgICAgIGxldCB4bWxDb2RlID0gaW1nT2JqZWN0LmdldEF0dHJpYnV0ZShDb25maWd1cmF0aW9uLmdldCgnaW1hZ2VNYXRobWxBdHRyaWJ1dGUnKSk7XG4gICAgICBsZXQgY29udmVydFRvWG1sO1xuICAgICAgbGV0IGNvbnZlcnRUb1NhZmVYbWw7XG5cbiAgICAgIGlmIChtb2RlID09PSAnYmFzZTY0MnNob3dpbWFnZScpIHtcbiAgICAgICAgaWYgKHhtbENvZGUgPT0gbnVsbCkge1xuICAgICAgICAgIHhtbENvZGUgPSBpbWdPYmplY3QuZ2V0QXR0cmlidXRlKCdhbHQnKTtcbiAgICAgICAgfVxuICAgICAgICB4bWxDb2RlID0gTWF0aE1MLnNhZmVYbWxEZWNvZGUoeG1sQ29kZSk7XG4gICAgICAgIGltZ0NvZGUgPSBQYXJzZXIubWF0aG1sVG9JbWdPYmplY3QoZG9jdW1lbnQsIHhtbENvZGUsIG51bGwsIG51bGwpO1xuICAgICAgICBvdXRwdXQgKz0gVXRpbC5jcmVhdGVPYmplY3RDb2RlKGltZ0NvZGUpO1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09PSAnaW1nMm1hdGhtbCcpIHtcbiAgICAgICAgaWYgKENvbmZpZ3VyYXRpb24uZ2V0KCdzYXZlTW9kZScpKSB7XG4gICAgICAgICAgaWYgKENvbmZpZ3VyYXRpb24uZ2V0KCdzYXZlTW9kZScpID09PSAnc2FmZVhtbCcpIHtcbiAgICAgICAgICAgIGNvbnZlcnRUb1htbCA9IHRydWU7XG4gICAgICAgICAgICBjb252ZXJ0VG9TYWZlWG1sID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKENvbmZpZ3VyYXRpb24uZ2V0KCdzYXZlTW9kZScpID09PSAneG1sJykge1xuICAgICAgICAgICAgY29udmVydFRvWG1sID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnZlcnRUb1NhZmVYbWwgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0ICs9IFV0aWwuZ2V0V0lSSVNJbWFnZU91dHB1dChpbWdDb2RlLCBjb252ZXJ0VG9YbWwsIGNvbnZlcnRUb1NhZmVYbWwpO1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09PSAnaW1nMjY0Jykge1xuICAgICAgICBpZiAoeG1sQ29kZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHhtbENvZGUgPSBpbWdPYmplY3QuZ2V0QXR0cmlidXRlKCdhbHQnKTtcbiAgICAgICAgfVxuICAgICAgICB4bWxDb2RlID0gTWF0aE1MLnNhZmVYbWxEZWNvZGUoeG1sQ29kZSk7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHt9O1xuICAgICAgICBwcm9wZXJ0aWVzLmJhc2U2NCA9ICd0cnVlJztcbiAgICAgICAgaW1nQ29kZSA9IFBhcnNlci5tYXRobWxUb0ltZ09iamVjdChkb2N1bWVudCwgeG1sQ29kZSwgcHJvcGVydGllcywgbnVsbCk7XG4gICAgICAgIC8vIE1ldHJpY3MuXG4gICAgICAgIEltYWdlLnNldEltZ1NpemUoaW1nQ29kZSwgaW1nQ29kZS5zcmMsIHRydWUpO1xuICAgICAgICBvdXRwdXQgKz0gVXRpbC5jcmVhdGVPYmplY3RDb2RlKGltZ0NvZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBvdXRwdXQgKz0gY29kZS5zdWJzdHJpbmcoZW5kUG9zaXRpb24sIGNvZGUubGVuZ3RoKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFsbCBvY2N1cnJlbmNlcyBvZiBNYXRoTUwgdG8gdGhlIGNvcnJlc3BvbmRpbmcgaW1hZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0gc3RyaW5nIHdpdGggdmFsaWQgTWF0aE1MIGNvZGUuXG4gICAqIFRoZSBNYXRoTUwgY29kZSBkb2Vzbid0IGNvbnRhaW4gc2VtYW50aWNzLlxuICAgKiBAcGFyYW0ge0NvbnN0YW50c30gY2hhcmFjdGVycyAtIENvbnN0YW50IG9iamVjdCBjb250YWluaW5nIHhtbENoYXJhY3RlcnNcbiAgICogb3Igc2FmZVhtbENoYXJhY3RlcnMgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSAtIGEgdmFsaWQgbGFuZ3VhZ2UgY29kZVxuICAgKiBpbiBvcmRlciB0byBnZW5lcmF0ZSBmb3JtdWxhIGFjY2Vzc2liaWxpdHkuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBpbnB1dCBzdHJpbmcgd2l0aCBhbGwgdGhlIE1hdGhNTFxuICAgKiBvY2N1cnJlbmNlcyByZXBsYWNlZCBieSB0aGUgY29ycmVzcG9uZGluZyBpbWFnZS5cbiAgICovXG4gIHN0YXRpYyBwYXJzZU1hdGhtbFRvSW1nKGNvbnRlbnQsIGNoYXJhY3RlcnMsIGxhbmd1YWdlKSB7XG4gICAgbGV0IG91dHB1dCA9ICcnO1xuICAgIGNvbnN0IG1hdGhUYWdCZWdpbiA9IGAke2NoYXJhY3RlcnMudGFnT3BlbmVyfW1hdGhgO1xuICAgIGNvbnN0IG1hdGhUYWdFbmQgPSBgJHtjaGFyYWN0ZXJzLnRhZ09wZW5lcn0vbWF0aCR7Y2hhcmFjdGVycy50YWdDbG9zZXJ9YDtcbiAgICBsZXQgc3RhcnQgPSBjb250ZW50LmluZGV4T2YobWF0aFRhZ0JlZ2luKTtcbiAgICBsZXQgZW5kID0gMDtcblxuICAgIHdoaWxlIChzdGFydCAhPT0gLTEpIHtcbiAgICAgIG91dHB1dCArPSBjb250ZW50LnN1YnN0cmluZyhlbmQsIHN0YXJ0KTtcbiAgICAgIC8vIEF2b2lkIFdJUklTIGltYWdlcyB0byBiZSBwYXJzZWQuXG4gICAgICBjb25zdCBpbWFnZU1hdGhtbEF0cnJpYnV0ZSA9IGNvbnRlbnQuaW5kZXhPZihDb25maWd1cmF0aW9uLmdldCgnaW1hZ2VNYXRobWxBdHRyaWJ1dGUnKSk7XG4gICAgICBlbmQgPSBjb250ZW50LmluZGV4T2YobWF0aFRhZ0VuZCwgc3RhcnQpO1xuXG4gICAgICBpZiAoZW5kID09PSAtMSkge1xuICAgICAgICBlbmQgPSBjb250ZW50Lmxlbmd0aCAtIDE7XG4gICAgICB9IGVsc2UgaWYgKGltYWdlTWF0aG1sQXRycmlidXRlICE9PSAtMSkge1xuICAgICAgICAvLyBGaXJzdCBjbG9zZSB0YWcgb2YgaW1nIGF0dHJpYnV0ZVxuICAgICAgICAvLyBJZiBhIG1hdGhtbEF0dHJpYnV0ZSBleGlzdHMgc2hvdWxkIGJlIGluc2lkZSBhIGltZyB0YWcuXG4gICAgICAgIGVuZCArPSBjb250ZW50LmluZGV4T2YoJy8+Jywgc3RhcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kICs9IG1hdGhUYWdFbmQubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBpZiAoIU1hdGhNTC5pc01hdGhtbEluQXR0cmlidXRlKGNvbnRlbnQsIHN0YXJ0KSAmJiBpbWFnZU1hdGhtbEF0cnJpYnV0ZSA9PT0gLTEpIHtcbiAgICAgICAgbGV0IG1hdGhtbCA9IGNvbnRlbnQuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpO1xuICAgICAgICBtYXRobWwgPSAoY2hhcmFjdGVycy5pZCA9PT0gQ29uc3RhbnRzLnNhZmVYbWxDaGFyYWN0ZXJzLmlkKVxuICAgICAgICAgID8gTWF0aE1MLnNhZmVYbWxEZWNvZGUobWF0aG1sKVxuICAgICAgICAgIDogTWF0aE1MLm1hdGhNTEVudGl0aWVzKG1hdGhtbCk7XG4gICAgICAgIG91dHB1dCArPSBVdGlsLmNyZWF0ZU9iamVjdENvZGUoUGFyc2VyLm1hdGhtbFRvSW1nT2JqZWN0KGRvY3VtZW50LCBtYXRobWwsIG51bGwsIGxhbmd1YWdlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQgKz0gY29udGVudC5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0ID0gY29udGVudC5pbmRleE9mKG1hdGhUYWdCZWdpbiwgZW5kKTtcbiAgICB9XG5cbiAgICBvdXRwdXQgKz0gY29udGVudC5zdWJzdHJpbmcoZW5kLCBjb250ZW50Lmxlbmd0aCk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxufVxuXG4vLyBNdXRhdGlvbiBvYnNlcnZlcnMgdG8gYXZvaWQgd2lyaXMgaW1hZ2UgZm9ybXVsYXMgY2xhc3MgYmUgcmVtb3ZlZC5cbmlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcbiAgICAgIGlmIChtdXRhdGlvbi5vbGRWYWx1ZSA9PT0gQ29uZmlndXJhdGlvbi5nZXQoJ2ltYWdlQ2xhc3NOYW1lJylcbiAgICAgICAgJiYgbXV0YXRpb24uYXR0cmlidXRlTmFtZSA9PT0gJ2NsYXNzJ1xuICAgICAgICAmJiBtdXRhdGlvbi50YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoQ29uZmlndXJhdGlvbi5nZXQoJ2ltYWdlQ2xhc3NOYW1lJykpID09PSAtMSkge1xuICAgICAgICBtdXRhdGlvbi50YXJnZXQuY2xhc3NOYW1lID0gQ29uZmlndXJhdGlvbi5nZXQoJ2ltYWdlQ2xhc3NOYW1lJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIFBhcnNlci5vYnNlcnZlciA9IE9iamVjdC5jcmVhdGUobXV0YXRpb25PYnNlcnZlcik7XG4gIFBhcnNlci5vYnNlcnZlci5Db25maWcgPSB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlIH07XG4gIC8vIFdlIHVzZSBvd24gZGVmYXVsdCBjb25maWcuXG4gIFBhcnNlci5vYnNlcnZlci5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5vYnNlcnZlKHRhcmdldCwgdGhpcy5Db25maWcpO1xuICB9O1xufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcbmltcG9ydCBMaXN0ZW5lcnMgZnJvbSAnLi9saXN0ZW5lcnMnO1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi9jb25maWd1cmF0aW9uJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTZXJ2aWNlUHJvdmlkZXJQcm9wZXJ0aWVzXG4gKiBAcHJvcGVydHkge1N0cmluZ30gVVJJIC0gU2VydmljZSBVUkkuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gc2VydmVyIC0gU2VydmljZSBzZXJ2ZXIgbGFuZ3VhZ2UuXG4gKi9cblxuLyoqXG4gKiBAY2xhc3NkZXNjXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBzZXJ2aWNlUHJvdmlkZXIuIEEgc2VydmljZVByb3ZpZGVyIGlzIGEgY2xhc3MgY29udGFpbmluZ1xuICogYW4gYXJiaXRyYXJ5IG51bWJlciBvZiBzZXJ2aWNlcyB3aXRoIHRoZSBjb3JyZXNwb25kZW50IHBhdGguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZpY2VQcm92aWRlciB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIFNlcnZpY2UgUHJvdmlkZXIgbGlzdGVuZXJzLlxuICAgKiBAdHlwZSB7TGlzdGVuZXJzfVxuICAgKi9cbiAgc3RhdGljIGdldCBsaXN0ZW5lcnMoKSB7XG4gICAgcmV0dXJuIFNlcnZpY2VQcm92aWRlci5fbGlzdGVuZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB7QGxpbmsgTGlzdGVuZXJ9IGluc3RhbmNlIHRvIHtAbGluayBTZXJ2aWNlUHJvdmlkZXJ9IGNsYXNzLlxuICAgKiBAcGFyYW0ge0xpc3RlbmVyfSBsaXN0ZW5lciAtIEluc3RhbmNlIG9mIHtAbGluayBMaXN0ZW5lcn0uXG4gICAqL1xuICBzdGF0aWMgYWRkTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICBTZXJ2aWNlUHJvdmlkZXIubGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgZXZlbnRzIGluIFNlcnZpY2UgUHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgLSBFdmVudCBuYW1lLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEV2ZW50IG9iamVjdC5cbiAgICovXG4gIHN0YXRpYyBmaXJlRXZlbnQoZXZlbnROYW1lLCBldmVudCkge1xuICAgIFNlcnZpY2VQcm92aWRlci5saXN0ZW5lcnMuZmlyZShldmVudE5hbWUsIGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJ2aWNlIHBhcmFtZXRlcnMuXG4gICAqIEB0eXBlIHtTZXJ2aWNlUHJvdmlkZXJQcm9wZXJ0aWVzfVxuICAgKlxuICAgKi9cbiAgc3RhdGljIGdldCBwYXJhbWV0ZXJzKCkge1xuICAgIHJldHVybiBTZXJ2aWNlUHJvdmlkZXIuX3BhcmFtZXRlcnM7XG4gIH1cblxuICAvKipcbiAgICogU2VydmljZSBwYXJhbWV0ZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7U2VydmljZVByb3ZpZGVyUHJvcGVydGllc31cbiAgICovXG4gIHN0YXRpYyBzZXQgcGFyYW1ldGVycyhwYXJhbWV0ZXJzKSB7XG4gICAgU2VydmljZVByb3ZpZGVyLl9wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgcHJvcGVydHkuXG4gICAqIFJldHVybiBzZXJ2aWNlIHByb3ZpZGVyIHBhdGhzLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldCBzZXJ2aWNlUGF0aHMoKSB7XG4gICAgcmV0dXJuIFNlcnZpY2VQcm92aWRlci5fc2VydmljZVBhdGhzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBwcm9wZXJ0eSBzZXR0ZXIuXG4gICAqIFNldCBzZXJ2aWNlIHBhdGhzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgLSBUaGUgcHJvcGVydHkgdmFsdWUuXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIHN0YXRpYyBzZXQgc2VydmljZVBhdGhzKHZhbHVlKSB7XG4gICAgU2VydmljZVByb3ZpZGVyLl9zZXJ2aWNlUGF0aHMgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IHNlcnZpY2UgdG8gdGhlIFNlcnZpY2VQcm92aWRlci5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlcnZpY2UgLSBTZXJ2aWNlIG5hbWUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gU2VydmljZSBwYXRoLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgc2V0U2VydmljZVBhdGgoc2VydmljZSwgcGF0aCkge1xuICAgIFNlcnZpY2VQcm92aWRlci5zZXJ2aWNlUGF0aHNbc2VydmljZV0gPSBwYXRoO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNlcnZpY2UgcGF0aCBmb3IgYSBjZXJ0YWluIHNlcnZpY2UuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZXJ2aWNlTmFtZSAtIFNlcnZpY2UgbmFtZS5cbiAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHNlcnZpY2UgcGF0aC5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIGdldFNlcnZpY2VQYXRoKHNlcnZpY2VOYW1lKSB7XG4gICAgcmV0dXJuIFNlcnZpY2VQcm92aWRlci5zZXJ2aWNlUGF0aHNbc2VydmljZU5hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBwcm9wZXJ0eS5cbiAgICogU2VydmljZSBwcm92aWRlciBpbnRlZ3JhdGlvbiBwYXRoLlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldCBpbnRlZ3JhdGlvblBhdGgoKSB7XG4gICAgcmV0dXJuIFNlcnZpY2VQcm92aWRlci5faW50ZWdyYXRpb25QYXRoO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBwcm9wZXJ0eSBzZXR0ZXIuXG4gICAqIFNldCBzZXJ2aWNlIHByb3ZpZGVyIGludGVncmF0aW9uIHBhdGguXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSAtIFRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAgICogQGlnbm9yZVxuICAgKi9cbiAgc3RhdGljIHNldCBpbnRlZ3JhdGlvblBhdGgodmFsdWUpIHtcbiAgICBTZXJ2aWNlUHJvdmlkZXIuX2ludGVncmF0aW9uUGF0aCA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNlcnZlciBVUkwgaW4gdGhlIGZvcm0gcHJvdG9jb2w6Ly9zZXJ2ZXJOYW1lOnNlcnZlclBvcnQuXG4gICAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGNsaWVudCBzaWRlIHNlcnZlciBwYXRoLlxuICAgKi9cbiAgc3RhdGljIGdldFNlcnZlclVSTCgpIHtcbiAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCBhcnIgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICBjb25zdCByZXN1bHQgPSBgJHthcnJbMF19Ly8ke2FyclsyXX1gO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogSW5pdHMge0BsaW5rIHRoaXN9IGNsYXNzLiBVc2VzIHtAbGluayB0aGlzLmludGVncmF0aW9uUGF0aH0gYXNcbiAgICogYmFzZSBwYXRoIHRvIGdlbmVyYXRlIGFsbCBiYWNrZW5kIHNlcnZpY2VzIHBhdGhzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyAtIEZ1bmN0aW9uIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLmludGVncmF0aW9uUGF0aCAtIFNlcnZpY2UgcGF0aC5cbiAgICovXG4gIHN0YXRpYyBpbml0KHBhcmFtZXRlcnMpIHtcbiAgICBTZXJ2aWNlUHJvdmlkZXIucGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XG4gICAgLy8gU2VydmljZXMgcGF0aCAodGVjaCBkZXBlbmRhbnQpLlxuICAgIGxldCBjb25maWd1cmF0aW9uVVJJID0gU2VydmljZVByb3ZpZGVyLmNyZWF0ZVNlcnZpY2VVUkkoJ2NvbmZpZ3VyYXRpb25qcycpO1xuICAgIGxldCBjcmVhdGVJbWFnZVVSSSA9IFNlcnZpY2VQcm92aWRlci5jcmVhdGVTZXJ2aWNlVVJJKCdjcmVhdGVpbWFnZScpO1xuICAgIGxldCBzaG93SW1hZ2VVUkkgPSBTZXJ2aWNlUHJvdmlkZXIuY3JlYXRlU2VydmljZVVSSSgnc2hvd2ltYWdlJyk7XG4gICAgbGV0IGdldE1hdGhNTFVSSSA9IFNlcnZpY2VQcm92aWRlci5jcmVhdGVTZXJ2aWNlVVJJKCdnZXRtYXRobWwnKTtcbiAgICBsZXQgc2VydmljZVVSSSA9IFNlcnZpY2VQcm92aWRlci5jcmVhdGVTZXJ2aWNlVVJJKCdzZXJ2aWNlJyk7XG5cbiAgICAvLyBTb21lIGJhY2tlbmQgaW50ZWdyYXRpb25zIChsaWtlIEphdmEgbyBSdWJ5KSBoYXZlIGFuIGFic29sdXRlIGJhY2tlbmQgcGF0aCxcbiAgICAvLyBmb3IgZXhhbXBsZTogL2FwcC9zZXJ2aWNlLiBGb3IgdGhlbSB3ZSBjYWxjdWxhdGUgdGhlIGFic29sdXRlIFVSTCBwYXRoLCBpLmVcbiAgICAvLyBwcm90b2NvbDovL2RvbWFpbjpwb3J0L2FwcC9zZXJ2aWNlXG4gICAgaWYgKFNlcnZpY2VQcm92aWRlci5wYXJhbWV0ZXJzLlVSSS5pbmRleE9mKCcvJykgPT09IDApIHtcbiAgICAgIGNvbnN0IHNlcnZlclBhdGggPSBTZXJ2aWNlUHJvdmlkZXIuZ2V0U2VydmVyVVJMKCk7XG4gICAgICBjb25maWd1cmF0aW9uVVJJID0gc2VydmVyUGF0aCArIGNvbmZpZ3VyYXRpb25VUkk7XG4gICAgICBzaG93SW1hZ2VVUkkgPSBzZXJ2ZXJQYXRoICsgc2hvd0ltYWdlVVJJO1xuICAgICAgY3JlYXRlSW1hZ2VVUkkgPSBzZXJ2ZXJQYXRoICsgY3JlYXRlSW1hZ2VVUkk7XG4gICAgICBnZXRNYXRoTUxVUkkgPSBzZXJ2ZXJQYXRoICsgZ2V0TWF0aE1MVVJJO1xuICAgICAgc2VydmljZVVSSSA9IHNlcnZlclBhdGggKyBzZXJ2aWNlVVJJO1xuICAgIH1cblxuICAgIFNlcnZpY2VQcm92aWRlci5zZXRTZXJ2aWNlUGF0aCgnY29uZmlndXJhdGlvbmpzJywgY29uZmlndXJhdGlvblVSSSk7XG4gICAgU2VydmljZVByb3ZpZGVyLnNldFNlcnZpY2VQYXRoKCdzaG93aW1hZ2UnLCBzaG93SW1hZ2VVUkkpO1xuICAgIFNlcnZpY2VQcm92aWRlci5zZXRTZXJ2aWNlUGF0aCgnY3JlYXRlaW1hZ2UnLCBjcmVhdGVJbWFnZVVSSSk7XG4gICAgU2VydmljZVByb3ZpZGVyLnNldFNlcnZpY2VQYXRoKCdzZXJ2aWNlJywgc2VydmljZVVSSSk7XG4gICAgU2VydmljZVByb3ZpZGVyLnNldFNlcnZpY2VQYXRoKCdnZXRtYXRobWwnLCBnZXRNYXRoTUxVUkkpO1xuICAgIFNlcnZpY2VQcm92aWRlci5zZXRTZXJ2aWNlUGF0aCgnY29uZmlndXJhdGlvbmpzJywgY29uZmlndXJhdGlvblVSSSk7XG5cbiAgICBTZXJ2aWNlUHJvdmlkZXIubGlzdGVuZXJzLmZpcmUoJ29uSW5pdCcsIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjb250ZW50IGZyb20gYW4gVVJMLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGFyZ2V0IFVSTC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwb3N0VmFyaWFibGVzXSAtIE9iamVjdCBjb250YWluaW5nIHBvc3QgdmFyaWFibGVzLlxuICAgKiBudWxsIGlmIGEgR0VUIHF1ZXJ5IHNob3VsZCBiZSBkb25lLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBDb250ZW50IG9mIHRoZSB0YXJnZXQgVVJMLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgZ2V0VXJsKHVybCwgcG9zdFZhcmlhYmxlcykge1xuICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gd2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkuc3Vic3RyKDAsIHdpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICBjb25zdCBodHRwUmVxdWVzdCA9IFV0aWwuY3JlYXRlSHR0cFJlcXVlc3QoKTtcblxuICAgIGlmIChodHRwUmVxdWVzdCkge1xuICAgICAgaWYgKHR5cGVvZiBwb3N0VmFyaWFibGVzID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgcG9zdFZhcmlhYmxlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaHR0cFJlcXVlc3Qub3BlbignR0VUJywgdXJsLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKHVybC5zdWJzdHIoMCwgMSkgPT09ICcvJyB8fCB1cmwuc3Vic3RyKDAsIDcpID09PSAnaHR0cDovLycgfHwgdXJsLnN1YnN0cigwLCA4KSA9PT0gJ2h0dHBzOi8vJykge1xuICAgICAgICBodHRwUmVxdWVzdC5vcGVuKCdQT1NUJywgdXJsLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBodHRwUmVxdWVzdC5vcGVuKCdQT1NUJywgY3VycmVudFBhdGggKyB1cmwsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGhlYWRlciA9IENvbmZpZ3VyYXRpb24uZ2V0KCdjdXN0b21IZWFkZXJzJyk7XG4gICAgICBpZiAoaGVhZGVyKSB7XG4gICAgICAgIGhlYWRlciA9IGhlYWRlci50b1N0cmluZygpXG4gICAgICAgIGhlYWRlci5zcGxpdChcIixcIilcbiAgICAgICAgICAubWFwKGVsZW1lbnQgPT4gZWxlbWVudC50cmltKCkuc3BsaXQoJz0nKSlcbiAgICAgICAgICAuZm9yRWFjaCgoW2tleSwgdmFsXSkgPT4gaHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHBvc3RWYXJpYWJsZXMgIT09ICd1bmRlZmluZWQnICYmIHBvc3RWYXJpYWJsZXMpIHtcbiAgICAgICAgaHR0cFJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCcpO1xuICAgICAgICBodHRwUmVxdWVzdC5zZW5kKFV0aWwuaHR0cEJ1aWxkUXVlcnkocG9zdFZhcmlhYmxlcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaHR0cFJlcXVlc3Quc2VuZChudWxsKTtcbiAgICAgIH1cbiAgIFxuICAgICAgcmV0dXJuIGh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlc3BvbnNlIHRleHQgb2YgYSBjZXJ0YWluIHNlcnZpY2UuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZXJ2aWNlIC0gU2VydmljZSBuYW1lLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcG9zdFZhcmlhYmxlcyAtIFBvc3QgdmFyaWFibGVzLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGdldCAtIFRydWUgaWYgdGhlIHJlcXVlc3QgaXMgR0VUIGluc3RlYWQgb2YgUE9TVC4gZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBTZXJ2aWNlIHJlc3BvbnNlIHRleHQuXG4gICAqL1xuICBzdGF0aWMgZ2V0U2VydmljZShzZXJ2aWNlLCBwb3N0VmFyaWFibGVzLCBnZXQpIHtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgaWYgKGdldCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZ2V0VmFyaWFibGVzID0gcG9zdFZhcmlhYmxlcyA/IGA/JHtwb3N0VmFyaWFibGVzfWAgOiAnJztcbiAgICAgIGNvbnN0IHNlcnZpY2VVcmwgPSBgJHtTZXJ2aWNlUHJvdmlkZXIuZ2V0U2VydmljZVBhdGgoc2VydmljZSl9JHtnZXRWYXJpYWJsZXN9YDtcbiAgICAgIHJlc3BvbnNlID0gU2VydmljZVByb3ZpZGVyLmdldFVybChzZXJ2aWNlVXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VydmljZVVybCA9IFNlcnZpY2VQcm92aWRlci5nZXRTZXJ2aWNlUGF0aChzZXJ2aWNlKTtcbiAgICAgIHJlc3BvbnNlID0gU2VydmljZVByb3ZpZGVyLmdldFVybChzZXJ2aWNlVXJsLCBwb3N0VmFyaWFibGVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNlcnZlciBsYW5ndWFnZSBvZiBhIGNlcnRhaW4gc2VydmljZS4gVGhlIHBvc3NpYmxlIHZhbHVlc1xuICAgKiBhcmU6IHBocCwgYXNweCwgamF2YSBhbmQgcnVieS5cbiAgICogVGhpcyBtZXRob2QgaGFzIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgcHVycG9zZXMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZXJ2aWNlIC0gVGhlIGNvbmZpZ3VyYXRpb24gc2VydmljZS5cbiAgICogQHJldHVybnMge1N0cmluZ30gLSBUaGUgc2VydmVyIHRlY2hub2xvZ3kgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb25maWd1cmF0aW9uIHNlcnZpY2UuXG4gICAqL1xuICBzdGF0aWMgZ2V0U2VydmVyTGFuZ3VhZ2VGcm9tU2VydmljZShzZXJ2aWNlKSB7XG4gICAgaWYgKHNlcnZpY2UuaW5kZXhPZignLnBocCcpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdwaHAnO1xuICAgIH1cbiAgICBpZiAoc2VydmljZS5pbmRleE9mKCcuYXNweCcpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdhc3B4JztcbiAgICB9XG4gICAgaWYgKHNlcnZpY2UuaW5kZXhPZignd2lyaXNwbHVnaW5lbmdpbmUnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAncnVieSc7XG4gICAgfVxuICAgIHJldHVybiAnamF2YSc7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgVVJJIGFzc29jaWF0ZWQgd2l0aCBhIGNlcnRhaW4gc2VydmljZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlcnZpY2UgLSBUaGUgc2VydmljZSBuYW1lLlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBzZXJ2aWNlIHBhdGguXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlU2VydmljZVVSSShzZXJ2aWNlKSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gU2VydmljZVByb3ZpZGVyLnNlcnZlckV4dGVuc2lvbigpO1xuICAgIHJldHVybiBVdGlsLmNvbmNhdGVuYXRlVXJsKFNlcnZpY2VQcm92aWRlci5wYXJhbWV0ZXJzLlVSSSwgc2VydmljZSkgKyBleHRlbnNpb247XG4gIH1cblxuICBzdGF0aWMgc2VydmVyRXh0ZW5zaW9uKCkge1xuICAgIGlmIChTZXJ2aWNlUHJvdmlkZXIucGFyYW1ldGVycy5zZXJ2ZXIuaW5kZXhPZigncGhwJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJy5waHAnO1xuICAgIH1cbiAgICBpZiAoU2VydmljZVByb3ZpZGVyLnBhcmFtZXRlcnMuc2VydmVyLmluZGV4T2YoJ2FzcHgnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnLmFzcHgnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHJvcGVydHkge1N0cmluZ30gc2VydmljZSAtIFRoZSBzZXJ2aWNlIG5hbWUuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcGF0aCAtIFRoZSBzZXJ2aWNlIHBhdGguXG4gKiBAc3RhdGljXG4gKi9cblNlcnZpY2VQcm92aWRlci5fc2VydmljZVBhdGhzID0ge307XG5cbi8qKlxuICogVGhlIGludGVncmF0aW9uIHBhdGguIENvbnRhaW5zIHRoZSBwYXRoIG9mIHRoZSBjb25maWd1cmF0aW9uIHNlcnZpY2UuXG4gKiBVc2VkIHRvIGRlZmluZSB0aGUgcGF0aCBmb3IgYWxsIHNlcnZpY2VzLlxuICogQHR5cGUge1N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cblNlcnZpY2VQcm92aWRlci5faW50ZWdyYXRpb25QYXRoID0gJyc7XG5cbi8qKlxuICogU2VydmljZVByb3ZpZGVyIHN0YXRpYyBsaXN0ZW5lcnMuXG4gKiBAdHlwZSB7TGlzdGVuZXJzfVxuICogQHByaXZhdGVcbiAqL1xuU2VydmljZVByb3ZpZGVyLl9saXN0ZW5lcnMgPSBuZXcgTGlzdGVuZXJzKCk7XG5cbi8qKlxuICogU2VydmljZSBwcm92aWRlciBwYXJhbWV0ZXJzLlxuICogQHR5cGUge1NlcnZpY2VQcm92aWRlclBhcmFtZXRlcnN9XG4gKi9cblNlcnZpY2VQcm92aWRlci5fcGFyYW1ldGVycyA9IHt9O1xuIiwiaW1wb3J0IHRyYW5zbGF0aW9ucyBmcm9tICcuLi9sYW5nL3N0cmluZ3MuanNvbic7XG4vKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIHN0cmluZyBtYW5hZ2VyLiBJdCdzIHVzZWQgdG8gbG9hZCBsb2NhbGl6ZWQgc3RyaW5ncy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyaW5nTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU3RhdGljIGNsYXNzIFN0cmluZ01hbmFnZXIgY2FuIG5vdCBiZSBpbnN0YW50aWF0ZWQuJyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYXNzb2NpYXRlZCB2YWx1ZSBvZiBjZXJ0YWluIHN0cmluZyBrZXkuIElmIHRoZSBhc3NvY2lhdGVkIHZhbHVlXG4gICAqIGRvZXNuJ3QgZXhpdHMgcmV0dXJucyB0aGUgb3JpZ2luYWwga2V5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gc3RyaW5nIGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyAtIERFRkFVTFQgPSBudWxsLiBTcGVjaWZ5IHRoZSBsYW5ndWFnZSB0byB0cmFuc2xhdGUgdGhlIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBjb3JyZXNwb25kZW50IHZhbHVlLiBJZiBkb2Vzbid0IGV4aXN0cyBvcmlnaW5hbCBrZXkuXG4gICAqL1xuICBzdGF0aWMgZ2V0KGtleSwgbGFuZykge1xuXG4gICAgLy8gRGVmYXVsdCBsYW5ndWFnZSBkZWZpbml0aW9uXG4gICAgbGV0IHtsYW5ndWFnZX0gPSB0aGlzO1xuXG4gICAgLy8gSWYgcGFyYW1ldGVyIGxhbmd1YWdlLCB1c2UgaXRcbiAgICBpZiAobGFuZykge1xuICAgICAgbGFuZ3VhZ2UgPSBsYW5nO1xuICAgIH1cblxuICAgIC8vIEN1dCBkb3duIG9uIHN0cmluZ3MuIGUuZy4gZW5fVVMgLT4gZW5cbiAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoID4gMikge1xuICAgICAgbGFuZ3VhZ2UgPSBsYW5ndWFnZS5zbGljZSgwLCAyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB3ZSBzdXBwb3J0IHRoZSBsYW5ndWFnZVxuICAgIGlmICghdGhpcy5zdHJpbmdzLmhhc093blByb3BlcnR5KGxhbmd1YWdlKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgY29uc29sZS53YXJuKGBVbmtub3duIGxhbmd1YWdlICR7bGFuZ3VhZ2V9IHNldCBpbiBTdHJpbmdNYW5hZ2VyLmApO1xuICAgICAgbGFuZ3VhZ2UgPSAnZW4nO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHRoZSBrZXkgaXMgc3VwcG9ydGVkIGluIHRoZSBnaXZlbiBsYW5ndWFnZVxuICAgIGlmICghdGhpcy5zdHJpbmdzW2xhbmd1YWdlXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICBjb25zb2xlLndhcm4oYFVua25vd24ga2V5ICR7a2V5fSBmb3IgbGFuZ3VhZ2UgJHtsYW5ndWFnZX0gaW4gU3RyaW5nTWFuYWdlci5gKTtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3RyaW5nc1tsYW5ndWFnZV1ba2V5XTtcbiAgfVxufVxuXG4vKipcbiAqIERpY3Rpb25hcnkgb2YgZGljdGlvbmFyaWVzOlxuICogS2V5OiBsYW5ndWFnZSBjb2RlXG4gKiBWYWx1ZTogS2V5OiBpZCBvZiB0aGUgc3RyaW5nXG4gKiAgICAgICAgVmFsdWU6IHRyYW5zbGF0aW9uIG9mIHRoZSBzdHJpbmdcbiAqL1xuU3RyaW5nTWFuYWdlci5zdHJpbmdzID0gdHJhbnNsYXRpb25zO1xuXG4vKipcbiAqIExhbmd1YWdlIG9mIHRoZSB0cmFuc2xhdGlvbnM7IEVuZ2xpc2ggYnkgZGVmYXVsdFxuICovXG5TdHJpbmdNYW5hZ2VyLmxhbmd1YWdlID0gJ2VuJztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRDYWNoZSB7XG4gIC8qKlxuICAgKiBAY2xhc3NkZXNjXG4gICAqIFRoaXMgY2xhc3MgcmVwcmVzZW50IGEgY2xpZW50LXNpZGUgdGV4dCBjYWNoZSBjbGFzcy4gQ29udGFpbnMgcGFpcnMgb2ZcbiAgICogc3RyaW5ncyAoa2V5L3ZhbHVlKSB3aGljaCBjYW4gYmUgcmV0cmlldmVkIGluIGFueSBtb21lbnQuIFVzdWFsbHkgdXNlZFxuICAgKiB0byBzdG9yZSBBSkFYIHJlc3BvbnNlcyBmb3IgdGV4dCBzZXJ2aWNlcyBsaWtlIG1hdGhtbDJsYXRleFxuICAgKiAoYy5mIHtAbGluayBMYXRleH0gY2xhc3MpIG9yIG1hdGhtbDJhY2Nlc3NpYmxlIChjLmYge0BsaW5rIEFjY2Vzc2liaWxpdHl9IGNsYXNzKS5cbiAgICogQGNvbnN0cnVjdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKlxuICAgICAqIENhY2hlIGFycmF5IHByb3BlcnR5IHN0b3JpbmcgdGhlIGNhY2hlIGVudHJpZXMuXG4gICAgICogQHR5cGUge0FycmF5LjxTdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMuY2FjaGUgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBwb3B1bGF0ZXMgYSBrZXkvdmFsdWUgcGFpciBpbnRvIHRoZSB7QGxpbmsgdGhpcy5jYWNoZX0gcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSBDYWNoZSBrZXksIHVzdWFsbHkgdGhlIHNlcnZpY2Ugc3RyaW5nIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIC0gQ2FjaGUgdmFsdWUsIHVzdWFsbHkgdGhlIHNlcnZpY2UgcmVzcG9uc2UuXG4gICAqL1xuICBwb3B1bGF0ZShrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5jYWNoZVtrZXldID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2FjaGUgdmFsdWUgYXNzb2NpYXRlZCB0byBjZXJ0YWluIGNhY2hlIGtleS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIENhY2hlIGtleSwgdXN1YWxseSB0aGUgc2VydmljZSBzdHJpbmcgcGFyYW1ldGVyLlxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHZhbHVlIC0gQ2FjaGUgdmFsdWUsIGlmIGV4aXN0cy4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgZ2V0KGtleSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5jYWNoZSwga2V5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5pbXBvcnQgRE9NUHVyaWZ5IGZyb20gJ2RvbXB1cmlmeSc7XG5pbXBvcnQgTWF0aE1MIGZyb20gJy4vbWF0aG1sJztcbmltcG9ydCBDb25maWd1cmF0aW9uIGZyb20gJy4vY29uZmlndXJhdGlvbic7XG5pbXBvcnQgTGF0ZXggZnJvbSAnLi9sYXRleCc7XG5pbXBvcnQgU3RyaW5nTWFuYWdlciBmcm9tICcuL3N0cmluZ21hbmFnZXInO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhbiB1dGlsaXR5IGNsYXNzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlsIHtcbiAgLyoqXG4gICAqIEZpcmVzIGFuIGV2ZW50IGluIGEgdGFyZ2V0LlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSBldmVudFRhcmdldCAtIHRhcmdldCB3aGVyZSBldmVudCBzaG91bGQgYmUgZmlyZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgZXZlbnQgdG8gZmlyZS5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIGZpcmVFdmVudChldmVudFRhcmdldCwgZXZlbnROYW1lKSB7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICBjb25zdCBldmVudE9iamVjdCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldmVudE9iamVjdC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgIHJldHVybiAhZXZlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChldmVudE9iamVjdCk7XG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnRPYmplY3QgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIHJldHVybiBldmVudFRhcmdldC5maXJlRXZlbnQoYG9uJHtldmVudE5hbWV9YCwgZXZlbnRPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyb3NzLWJyb3dzZXIgYWRkRXZlbnRMaXN0ZW5lci9hdHRhY2hFdmVudCBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHtFdmVudFRhcmdldH0gZXZlbnRUYXJnZXQgLSB0YXJnZXQgdG8gYWRkIHRoZSBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIHNwZWNpZmllcyB0aGUgdHlwZSBvZiBldmVudC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbEJhY2tGdW5jdGlvbiAtIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgYWRkRXZlbnQoZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSwgY2FsbEJhY2tGdW5jdGlvbikge1xuICAgIGlmIChldmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICBldmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbEJhY2tGdW5jdGlvbiwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChldmVudFRhcmdldC5hdHRhY2hFdmVudCkge1xuICAgICAgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gICAgICBldmVudFRhcmdldC5hdHRhY2hFdmVudChgb24ke2V2ZW50TmFtZX1gLCBjYWxsQmFja0Z1bmN0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3Jvc3MtYnJvd3NlciByZW1vdmVFdmVudExpc3RlbmVyL2RldGFjaEV2ZW50IGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSBldmVudFRhcmdldCAtIHRhcmdldCB0byBhZGQgdGhlIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gc3BlY2lmaWVzIHRoZSB0eXBlIG9mIGV2ZW50LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsQmFja0Z1bmN0aW9uIC0gZnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50IHRhcmdldC5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIHJlbW92ZUV2ZW50KGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGNhbGxCYWNrRnVuY3Rpb24pIHtcbiAgICBpZiAoZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxCYWNrRnVuY3Rpb24sIHRydWUpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUYXJnZXQuZGV0YWNoRXZlbnQpIHtcbiAgICAgIGV2ZW50VGFyZ2V0LmRldGFjaEV2ZW50KGBvbiR7ZXZlbnROYW1lfWAsIGNhbGxCYWNrRnVuY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBhIGNhbGxiYWNrIGZ1bmN0aW9uLCBmb3IgYSBjZXJ0YWluIGV2ZW50IHRhcmdldCwgdG8gdGhlIGZvbGxvd2luZyBldmVudCB0eXBlczpcbiAgICogLSBkYmxjbGlja1xuICAgKiAtIG1vdXNlZG93blxuICAgKiAtIG1vdXNldXBcbiAgICogQHBhcmFtIHtFdmVudFRhcmdldH0gZXZlbnRUYXJnZXQgLSBldmVudCB0YXJnZXQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGRvdWJsZUNsaWNrSGFuZGxlciAtIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIG9uIGRibGNsaWNrIGV2ZW50LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb3VzZWRvd25IYW5kbGVyIC0gZnVuY3Rpb24gdG8gcnVuIHdoZW4gb24gbW91c2Vkb3duIGV2ZW50LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtb3VzZXVwSGFuZGxlciAtIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIG9uIG1vdXNldXAgZXZlbnQuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBhZGRFbGVtZW50RXZlbnRzKGV2ZW50VGFyZ2V0LCBkb3VibGVDbGlja0hhbmRsZXIsIG1vdXNlZG93bkhhbmRsZXIsIG1vdXNldXBIYW5kbGVyKSB7XG4gICAgaWYgKGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5jYWxsYmFja0RibGNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWxFdmVudCA9IChldmVudCkgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVhbEV2ZW50LnNyY0VsZW1lbnQgPyByZWFsRXZlbnQuc3JjRWxlbWVudCA6IHJlYWxFdmVudC50YXJnZXQ7XG4gICAgICAgIGRvdWJsZUNsaWNrSGFuZGxlcihlbGVtZW50LCByZWFsRXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgVXRpbC5hZGRFdmVudChldmVudFRhcmdldCwgJ2RibGNsaWNrJywgdGhpcy5jYWxsYmFja0RibGNsaWNrKTtcbiAgICB9XG5cbiAgICBpZiAobW91c2Vkb3duSGFuZGxlcikge1xuICAgICAgdGhpcy5jYWxsYmFja01vdXNlZG93biA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCByZWFsRXZlbnQgPSAoZXZlbnQpIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHJlYWxFdmVudC5zcmNFbGVtZW50ID8gcmVhbEV2ZW50LnNyY0VsZW1lbnQgOiByZWFsRXZlbnQudGFyZ2V0O1xuICAgICAgICBtb3VzZWRvd25IYW5kbGVyKGVsZW1lbnQsIHJlYWxFdmVudCk7XG4gICAgICB9O1xuXG4gICAgICBVdGlsLmFkZEV2ZW50KGV2ZW50VGFyZ2V0LCAnbW91c2Vkb3duJywgdGhpcy5jYWxsYmFja01vdXNlZG93bik7XG4gICAgfVxuXG4gICAgaWYgKG1vdXNldXBIYW5kbGVyKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrTW91c2V1cCA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCByZWFsRXZlbnQgPSAoZXZlbnQpIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHJlYWxFdmVudC5zcmNFbGVtZW50ID8gcmVhbEV2ZW50LnNyY0VsZW1lbnQgOiByZWFsRXZlbnQudGFyZ2V0O1xuICAgICAgICBtb3VzZXVwSGFuZGxlcihlbGVtZW50LCByZWFsRXZlbnQpO1xuICAgICAgfTtcbiAgICAgIC8vIENocm9tZSBkb2Vzbid0IHRyaWdnZXIgdGhpcyBldmVudCBmb3IgZXZlbnRUYXJnZXQgaWYgd2UgcmVsZWFzZSB0aGUgbW91c2UgYnV0dG9uXG4gICAgICAvLyB3aGlsZSB0aGUgbW91c2UgaXMgb3V0c2lkZSB0aGUgZWRpdG9yIHRleHQgZmllbGQuXG4gICAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZDogd2UgdHJpZ2dlciB0aGUgZXZlbnQgaW5kZXBlbmRlbnRseSBvZiB3aGVyZSB0aGUgbW91c2VcbiAgICAgIC8vIGlzIHdoZW4gd2UgcmVsZWFzZSBpdHMgYnV0dG9uLlxuICAgICAgVXRpbC5hZGRFdmVudChkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmNhbGxiYWNrTW91c2V1cCk7XG4gICAgICBVdGlsLmFkZEV2ZW50KGV2ZW50VGFyZ2V0LCAnbW91c2V1cCcsIHRoaXMuY2FsbGJhY2tNb3VzZXVwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjYWxsYmFjayBmdW5jdGlvbiwgZm9yIGEgY2VydGFpbiBldmVudCB0YXJnZXQsIHRvIHRoZSBmb2xsb3dpbmcgZXZlbnQgdHlwZXM6XG4gICAqIC0gZGJsY2xpY2tcbiAgICogLSBtb3VzZWRvd25cbiAgICogLSBtb3VzZXVwXG4gICAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IGV2ZW50VGFyZ2V0IC0gZXZlbnQgdGFyZ2V0LlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlRWxlbWVudEV2ZW50cyhldmVudFRhcmdldCkge1xuICAgIFV0aWwucmVtb3ZlRXZlbnQoZXZlbnRUYXJnZXQsICdkYmxjbGljaycsIHRoaXMuY2FsbGJhY2tEYmxjbGljayk7XG4gICAgVXRpbC5yZW1vdmVFdmVudChldmVudFRhcmdldCwgJ21vdXNlZG93bicsIHRoaXMuY2FsbGJhY2tNb3VzZWRvd24pO1xuICAgIFV0aWwucmVtb3ZlRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5jYWxsYmFja01vdXNldXApO1xuICAgIFV0aWwucmVtb3ZlRXZlbnQoZXZlbnRUYXJnZXQsICdtb3VzZXVwJywgdGhpcy5jYWxsYmFja01vdXNldXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyBuYW1lIHRvIGEgSFRNTEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSB0aGUgSFRNTCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIC0gdGhlIGNsYXNzIG5hbWUuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICBpZiAoIVV0aWwuY29udGFpbnNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSBgICR7Y2xhc3NOYW1lfWA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIEhUTUxFbGVtZW50IGNvbnRhaW5zIGEgY2VydGFpbiBjbGFzcy5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIHRoZSBIVE1MIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgLSB0aGUgY2xhc3NOYW1lLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgSFRNTEVsZW1lbnQgY29udGFpbnMgdGhlIGNsYXNzIG5hbWUuIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIGNvbnRhaW5zQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCB8fCAhKCdjbGFzc05hbWUnIGluIGVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudENsYXNzZXMgPSBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuXG4gICAgZm9yIChsZXQgaSA9IGN1cnJlbnRDbGFzc2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICBpZiAoY3VycmVudENsYXNzZXNbaV0gPT09IGNsYXNzTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgY2VydGFpbiBjbGFzcyBmb3IgYSBIVE1MRWxlbWVudC5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIHRoZSBIVE1MIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgLSB0aGUgY2xhc3MgbmFtZS5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIGxldCBuZXdDbGFzc05hbWUgPSAnJztcbiAgICBjb25zdCBjbGFzc2VzID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGNsYXNzZXNbaV0gIT09IGNsYXNzTmFtZSkge1xuICAgICAgICBuZXdDbGFzc05hbWUgKz0gYCR7Y2xhc3Nlc1tpXX0gYDtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSBuZXdDbGFzc05hbWUudHJpbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIG9sZCB4bWwgaW5pdGlhbCB0ZXh0IGF0dHJpYnV0ZSAod2l0aCDCq8K7KSB0byB0aGUgY29ycmVjdCBvbmUod2l0aCDCp2x0O8KnZ3Q7KS4gSXQnc1xuICAgKiB1c2VkIHRvIHBhcnNlIG9sZCBhcHBsZXRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHN0cmluZyBjb250YWluaW5nIHNhZmVYbWwgY2hhcmFjdGVyc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBhIHN0cmluZyB3aXRoIHNhZmVYbWwgY2hhcmFjdGVycyBwYXJzZWQuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBjb252ZXJ0T2xkWG1saW5pdGlhbHRleHRBdHRyaWJ1dGUodGV4dCkge1xuICAgIC8vIFVzZWQgdG8gZml4IGEgYnVnIHdpdGggQ2FzIGltcG9ydGVkIGZyb20gTW9vZGxlIDEuOSB0byBNb29kbGUgMi54LlxuICAgIC8vIFRoaXMgY291bGQgYmUgcmVtb3ZlZCBpbiBmdXR1cmUuXG4gICAgY29uc3QgdmFsID0gJ3ZhbHVlPSc7XG5cbiAgICBjb25zdCB4aXRwb3MgPSB0ZXh0LmluZGV4T2YoJ3htbGluaXRpYWx0ZXh0Jyk7XG4gICAgY29uc3QgdmFscG9zID0gdGV4dC5pbmRleE9mKHZhbCwgeGl0cG9zKTtcbiAgICBjb25zdCBxdW90ZSA9IHRleHQuY2hhckF0KHZhbHBvcyArIHZhbC5sZW5ndGgpO1xuICAgIGNvbnN0IHN0YXJ0cXVvdGUgPSB2YWxwb3MgKyB2YWwubGVuZ3RoICsgMTtcbiAgICBjb25zdCBlbmRxdW90ZSA9IHRleHQuaW5kZXhPZihxdW90ZSwgc3RhcnRxdW90ZSk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0cXVvdGUsIGVuZHF1b3RlKTtcblxuICAgIGxldCBuZXd2YWx1ZSA9IHZhbHVlLnNwbGl0KCfCqycpLmpvaW4oJ8KnbHQ7Jyk7XG4gICAgbmV3dmFsdWUgPSBuZXd2YWx1ZS5zcGxpdCgnwrsnKS5qb2luKCfCp2d0OycpO1xuICAgIG5ld3ZhbHVlID0gbmV3dmFsdWUuc3BsaXQoJyYnKS5qb2luKCfCpycpO1xuICAgIG5ld3ZhbHVlID0gbmV3dmFsdWUuc3BsaXQoJ8KoJykuam9pbignwqdxdW90OycpO1xuXG4gICAgdGV4dCA9IHRleHQuc3BsaXQodmFsdWUpLmpvaW4obmV3dmFsdWUpO1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyb3NzLWJyb3dzZXIgc29sdXRpb24gZm9yIGNyZWF0aW5nIG5ldyBlbGVtZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgLSB0YWcgbmFtZSBvZiB0aGUgd2lzaGVkIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzIC0gYW4gb2JqZWN0IHdoZXJlIGVhY2gga2V5IGlzIGEgd2lzaGVkXG4gICAqIGF0dHJpYnV0ZSBuYW1lIGFuZCBlYWNoIHZhbHVlIGlzIGl0cyB2YWx1ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjcmVhdG9yXSAtIGlmIHN1cHBsaWVkLCB0aGlzIGZ1bmN0aW9uIHdpbGwgdXNlXG4gICAqIHRoZSBcImNyZWF0ZUVsZW1lbnRcIiBtZXRob2QgZnJvbSB0aGlzIHBhcmFtLiBPdGhlcndpc2VcbiAgICogZG9jdW1lbnQgd2lsbCBiZSB1c2VkIGFzIGNyZWF0b3IuXG4gICAqIEByZXR1cm5zIHtFbGVtZW50fSBUaGUgRE9NIGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXMgYXNzaWduZWQuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBjcmVhdGVFbGVtZW50KHRhZ05hbWUsIGF0dHJpYnV0ZXMsIGNyZWF0b3IpIHtcbiAgICBpZiAoYXR0cmlidXRlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBhdHRyaWJ1dGVzID0ge307XG4gICAgfVxuXG4gICAgaWYgKGNyZWF0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3JlYXRvciA9IGRvY3VtZW50O1xuICAgIH1cblxuICAgIGxldCBlbGVtZW50O1xuXG4gICAgLypcbiAgICAqIEludGVybmV0IEV4cGxvcmVyIGZpeDpcbiAgICAqIElmIHlvdSBjcmVhdGUgYSBuZXcgb2JqZWN0IGR5bmFtaWNhbGx5LCB5b3UgY2FuJ3Qgc2V0IGEgbm9uLXN0YW5kYXJkIGF0dHJpYnV0ZS5cbiAgICAqIEZvciBleGFtcGxlLCB5b3UgY2FuJ3Qgc2V0IHRoZSBcInNyY1wiIGF0dHJpYnV0ZSBvbiBhbiBcImFwcGxldFwiIG9iamVjdC5cbiAgICAqIE90aGVyIGJyb3dzZXJzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGFuZCB3aWxsIHJ1biB0aGUgc3RhbmRhcmQgY29kZS5cbiAgICAqL1xuICAgIHRyeSB7XG4gICAgICBsZXQgaHRtbCA9IGA8JHt0YWdOYW1lfWA7XG5cbiAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgICAgaHRtbCArPSBgICR7YXR0cmlidXRlTmFtZX09XCIke1V0aWwuaHRtbEVudGl0aWVzKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pfVwiYDtcbiAgICAgIH0pO1xuICAgICAgaHRtbCArPSAnPic7XG4gICAgICBlbGVtZW50ID0gY3JlYXRvci5jcmVhdGVFbGVtZW50KGh0bWwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGVsZW1lbnQgPSBjcmVhdG9yLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgbmV3IEhUTUwgZnJvbSBpdCdzIEhUTUwgY29kZSBhcyBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvYmplY3RDb2RlIC0gaHRtbCBjb2RlXG4gICAqIEByZXR1cm5zIHtFbGVtZW50fSB0aGUgSFRNTCBlbGVtZW50LlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlT2JqZWN0KG9iamVjdENvZGUsIGNyZWF0b3IpIHtcbiAgICBpZiAoY3JlYXRvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjcmVhdG9yID0gZG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgY2FuJ3QgaW5jbHVkZSBcInBhcmFtXCIgdGFnIHdoZW4gaXMgc2V0dGluZyBhbiBpbm5lckhUTUwgcHJvcGVydHkuXG4gICAgb2JqZWN0Q29kZSA9IG9iamVjdENvZGUuc3BsaXQoJzxhcHBsZXQgJykuam9pbignPHNwYW4gd2lyaXNPYmplY3Q9XCJXaXJpc0FwcGxldFwiICcpLnNwbGl0KCc8QVBQTEVUICcpLmpvaW4oJzxzcGFuIHdpcmlzT2JqZWN0PVwiV2lyaXNBcHBsZXRcIiAnKTsgLy8gSXQgaXMgYSAnc3BhbicgYmVjYXVzZSAnc3Bhbicgb2JqZWN0cyBjYW4gY29udGFpbiAnYnInIG5vZGVzLlxuICAgIG9iamVjdENvZGUgPSBvYmplY3RDb2RlLnNwbGl0KCc8L2FwcGxldD4nKS5qb2luKCc8L3NwYW4+Jykuc3BsaXQoJzwvQVBQTEVUPicpLmpvaW4oJzwvc3Bhbj4nKTtcblxuICAgIG9iamVjdENvZGUgPSBvYmplY3RDb2RlLnNwbGl0KCc8cGFyYW0gJykuam9pbignPGJyIHdpcmlzT2JqZWN0PVwiV2lyaXNQYXJhbVwiICcpLnNwbGl0KCc8UEFSQU0gJykuam9pbignPGJyIHdpcmlzT2JqZWN0PVwiV2lyaXNQYXJhbVwiICcpOyAvLyBJdCBpcyBhICdicicgYmVjYXVzZSAnYnInIGNhbid0IGNvbnRhaW4gbm9kZXMuXG4gICAgb2JqZWN0Q29kZSA9IG9iamVjdENvZGUuc3BsaXQoJzwvcGFyYW0+Jykuam9pbignPC9icj4nKS5zcGxpdCgnPC9QQVJBTT4nKS5qb2luKCc8L2JyPicpO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gVXRpbC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY3JlYXRvcik7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IG9iamVjdENvZGU7XG5cbiAgICBmdW5jdGlvbiByZWN1cnNpdmVQYXJhbXNGaXgob2JqZWN0KSB7XG4gICAgICBpZiAob2JqZWN0LmdldEF0dHJpYnV0ZSAmJiBvYmplY3QuZ2V0QXR0cmlidXRlKCd3aXJpc09iamVjdCcpID09PSAnV2lyaXNQYXJhbScpIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlc1BhcnNlZCA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0LmF0dHJpYnV0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAob2JqZWN0LmF0dHJpYnV0ZXNbaV0ubm9kZVZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzUGFyc2VkW29iamVjdC5hdHRyaWJ1dGVzW2ldLm5vZGVOYW1lXSA9IG9iamVjdC5hdHRyaWJ1dGVzW2ldLm5vZGVWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJhbSA9IFV0aWwuY3JlYXRlRWxlbWVudCgncGFyYW0nLCBhdHRyaWJ1dGVzUGFyc2VkLCBjcmVhdG9yKTtcblxuICAgICAgICAvLyBJRSBmaXguXG4gICAgICAgIGlmIChwYXJhbS5OQU1FKSB7XG4gICAgICAgICAgcGFyYW0ubmFtZSA9IHBhcmFtLk5BTUU7XG4gICAgICAgICAgcGFyYW0udmFsdWUgPSBwYXJhbS5WQUxVRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtLnJlbW92ZUF0dHJpYnV0ZSgnd2lyaXNPYmplY3QnKTtcbiAgICAgICAgb2JqZWN0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHBhcmFtLCBvYmplY3QpO1xuICAgICAgfSBlbHNlIGlmIChvYmplY3QuZ2V0QXR0cmlidXRlICYmIG9iamVjdC5nZXRBdHRyaWJ1dGUoJ3dpcmlzT2JqZWN0JykgPT09ICdXaXJpc0FwcGxldCcpIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlc1BhcnNlZCA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0LmF0dHJpYnV0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAob2JqZWN0LmF0dHJpYnV0ZXNbaV0ubm9kZVZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzUGFyc2VkW29iamVjdC5hdHRyaWJ1dGVzW2ldLm5vZGVOYW1lXSA9IG9iamVjdC5hdHRyaWJ1dGVzW2ldLm5vZGVWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhcHBsZXQgPSBVdGlsLmNyZWF0ZUVsZW1lbnQoJ2FwcGxldCcsIGF0dHJpYnV0ZXNQYXJzZWQsIGNyZWF0b3IpO1xuICAgICAgICBhcHBsZXQucmVtb3ZlQXR0cmlidXRlKCd3aXJpc09iamVjdCcpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0LmNoaWxkTm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICByZWN1cnNpdmVQYXJhbXNGaXgob2JqZWN0LmNoaWxkTm9kZXNbaV0pO1xuXG4gICAgICAgICAgaWYgKG9iamVjdC5jaGlsZE5vZGVzW2ldLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwYXJhbScpIHtcbiAgICAgICAgICAgIGFwcGxldC5hcHBlbmRDaGlsZChvYmplY3QuY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgICAgICBpIC09IDE7IC8vIFdoZW4gd2UgaW5zZXJ0IHRoZSBvYmplY3QgY2hpbGQgaW50byB0aGUgYXBwbGV0LCBvYmplY3QgbG9zZXMgb25lIGNoaWxkLlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9iamVjdC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChhcHBsZXQsIG9iamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdC5jaGlsZE5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgcmVjdXJzaXZlUGFyYW1zRml4KG9iamVjdC5jaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlY3Vyc2l2ZVBhcmFtc0ZpeChjb250YWluZXIpO1xuICAgIHJldHVybiBjb250YWluZXIuZmlyc3RDaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBFbGVtZW50IHRvIGl0cyBIVE1MIGNvZGUuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIGVudHJ5IGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIEhUTUwgY29kZSBvZiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIGNyZWF0ZU9iamVjdENvZGUoZWxlbWVudCkge1xuICAgIC8vIEluIGNhc2UgdGhhdCB0aGUgaW1hZ2Ugd2FzIG5vdCBjcmVhdGVkLCB0aGUgb2JqZWN0IGNhbiBiZSBudWxsIG9yIHVuZGVmaW5lZC5cbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IGVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7IC8vIEVMRU1FTlRfTk9ERS5cbiAgICAgIGxldCBvdXRwdXQgPSBgPCR7ZWxlbWVudC50YWdOYW1lfWA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChlbGVtZW50LmF0dHJpYnV0ZXNbaV0uc3BlY2lmaWVkKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IGAgJHtlbGVtZW50LmF0dHJpYnV0ZXNbaV0ubmFtZX09XCIke1V0aWwuaHRtbEVudGl0aWVzKGVsZW1lbnQuYXR0cmlidXRlc1tpXS52YWx1ZSl9XCJgO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBvdXRwdXQgKz0gJz4nO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IFV0aWwuY3JlYXRlT2JqZWN0KGVsZW1lbnQuY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBvdXRwdXQgKz0gYDwvJHtlbGVtZW50LnRhZ05hbWV9PmA7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdESVYnIHx8IGVsZW1lbnQubm9kZU5hbWUgPT09ICdTQ1JJUFQnKSB7XG4gICAgICAgIG91dHB1dCArPSBgPjwvJHtlbGVtZW50LnRhZ05hbWV9PmA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXQgKz0gJy8+JztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gMykgeyAvLyBURVhUX05PREUuXG4gICAgICByZXR1cm4gVXRpbC5odG1sRW50aXRpZXMoZWxlbWVudC5ub2RlVmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25jYXRlbmF0ZXMgdHdvIFVSTCBwYXRocy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGgxIC0gZmlyc3QgVVJMIHBhdGhcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGgyIC0gc2Vjb25kIFVSTCBwYXRoXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IG5ldyBVUkwuXG4gICAqL1xuICBzdGF0aWMgY29uY2F0ZW5hdGVVcmwocGF0aDEsIHBhdGgyKSB7XG4gICAgbGV0IHNlcGFyYXRvciA9ICcnO1xuICAgIGlmICgocGF0aDEuaW5kZXhPZignLycpICE9PSBwYXRoMS5sZW5ndGgpICYmIChwYXRoMi5pbmRleE9mKCcvJykgIT09IDApKSB7XG4gICAgICBzZXBhcmF0b3IgPSAnLyc7XG4gICAgfVxuICAgIHJldHVybiAocGF0aDEgKyBzZXBhcmF0b3IgKyBwYXRoMikucmVwbGFjZSgvKFteOl1cXC8pXFwvKy9nLCAnJDEnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgYSB0ZXh0IGFuZCByZXBsYWNlcyBhbGwgSFRNTCBzcGVjaWFsIGNoYXJhY3RlcnMgYnkgdGhlaXIgY29ycmVzcG9uZGVudCBlbnRpdGllcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IC0gdGV4dCB0byBiZSBwYXJzZWQuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBpbnB1dCB0ZXh0IHdpdGggYWxsIHRoZWlyIHNwZWNpYWwgY2hhcmFjdGVycyByZXBsYWNlZCBieSB0aGVpciBlbnRpdGllcy5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIGh0bWxFbnRpdGllcyhpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dC5zcGxpdCgnJicpLmpvaW4oJyZhbXA7Jykuc3BsaXQoJzwnKS5qb2luKCcmbHQ7JylcbiAgICAgIC5zcGxpdCgnPicpXG4gICAgICAuam9pbignJmd0OycpXG4gICAgICAuc3BsaXQoJ1wiJylcbiAgICAgIC5qb2luKCcmcXVvdDsnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW5pdGl6ZSBIVE1MIHRvIHByZXZlbnQgWFNTIGluamVjdGlvbnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBodG1sIC0gaHRtbCB0byBiZSBzYW5pdGl6ZS5cbiAgICogQHJldHVybnMge3N0cmluZ30gaHRtbCBzYW5pdGl6ZWQuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBodG1sU2FuaXRpemUoaHRtbCkge1xuICAgIGxldCBhbm5vdGF0aW9uUmVnZXggPSAvXFw8YW5ub3RhdGlvbi4rXFw8XFwvYW5ub3RhdGlvblxcPi9cbiAgICAvLyBHZXQgYWxsIHRoZSBhbm5vdGF0aW9uIGNvbnRlbnQgaW5jbHVkaW5nIHRoZSB0YWdzLlxuICAgIGxldCBhbm5vdGF0aW9uID0gaHRtbC5tYXRjaChhbm5vdGF0aW9uUmVnZXgpO1xuICAgIC8vIFNhbml0aXplIGh0bWwgY29kZSB3aXRob3V0IHJlbW92aW5nIHRoZSA8c2VtYW50aWNzPiBhbmQgPGFubm90YXRpb24+IHRhZ3MuXG4gICAgaHRtbCA9IERPTVB1cmlmeS5zYW5pdGl6ZShodG1sLCB7IEFERF9UQUdTOiBbJ3NlbWFudGljcycsICdhbm5vdGF0aW9uJ10sIEFMTE9XRURfQVRUUjogWydsaW5lYnJlYWsnXX0pO1xuICAgIC8vIFJlYWRkIG9sZCBhbm5vdGF0aW9uIGNvbnRlbnQuXG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZShhbm5vdGF0aW9uUmVnZXgsIGFubm90YXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhIHRleHQgYW5kIHJlcGxhY2VzIGFsbCB0aGUgSFRNTCBlbnRpdGllcyBieSB0aGVpciBjaGFyYWN0ZXJzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgLSB0ZXh0IHRvIGJlIHBhcnNlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgaW5wdXQgdGV4dCB3aXRoIGFsbCB0aGVpciBlbnRpdGllcyByZXBsYWNlZCBieSBjaGFyYWN0ZXJzLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgaHRtbEVudGl0aWVzRGVjb2RlKGlucHV0KSB7XG4gICAgLy8gVGV4dGFyZWEgZWxlbWVudCBkZWNvZGVzIHdoZW4gaW5uZXIgaHRtbCBpcyBzZXQuXG4gICAgY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIHRleHRhcmVhLmlubmVySFRNTCA9IGlucHV0O1xuICAgIHJldHVybiB0ZXh0YXJlYS52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY3Jvc3MtYnJvd3NlciBodHRwIHJlcXVlc3QuXG4gICAqIEByZXR1cm4ge29iamVjdH0gaHR0cFJlcXVlc3QgcmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm5zIHtYTUxIdHRwUmVxdWVzdHxBY3RpdmVYT2JqZWN0fSB0aGUgcHJvcGVyIHJlcXVlc3Qgb2JqZWN0LlxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUh0dHBSZXF1ZXN0KCkge1xuICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gd2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkuc3Vic3RyKDAsIHdpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICBpZiAoY3VycmVudFBhdGguc3Vic3RyKDAsIDcpID09PSAnZmlsZTovLycpIHtcbiAgICAgIHRocm93IFN0cmluZ01hbmFnZXIuZ2V0KCdleGNlcHRpb25fY3Jvc3Nfc2l0ZScpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgICB9IGNhdGNoIChvYykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBoYXNoIHRvIGEgSFRUUCBxdWVyeS5cbiAgICogQHBhcmFtIHtPYmplY3RbXX0gcHJvcGVydGllcyAtIGEga2V5L3ZhbHVlIG9iamVjdC5cbiAgICogQHJldHVybnMge3N0cmluZ30gYSBIVFRQIHF1ZXJ5IGNvbnRhaW5pbmcgYWxsIHRoZSBrZXkgdmFsdWUgcGFpcnMgd2l0aFxuICAgKiBhbGwgdGhlIHNwZWNpYWwgY2hhcmFjdGVycyByZXBsYWNlZCBieSB0aGVpciBlbnRpdGllcy5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIGh0dHBCdWlsZFF1ZXJ5KHByb3BlcnRpZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5mb3JFYWNoKChpKSA9PiB7XG4gICAgICBpZiAocHJvcGVydGllc1tpXSAhPSBudWxsKSB7XG4gICAgICAgIHJlc3VsdCArPSBgJHtVdGlsLnVybEVuY29kZShpKX09JHtVdGlsLnVybEVuY29kZShwcm9wZXJ0aWVzW2ldKX0mYDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIERlbGV0aW5nIGxhc3QgJyYnIGVtcHR5IGNoYXJhY3Rlci5cbiAgICBpZiAocmVzdWx0LnN1YnN0cmluZyhyZXN1bHQubGVuZ3RoIC0gMSkgPT09ICcmJykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cmluZygwLCByZXN1bHQubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgaGFzaCB0byBzdHJpbmcgc29ydGluZyBrZXlzIHRvIGdldCBhIGRldGVybWluaXN0aWMgb3V0cHV0XG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGhhc2ggLSBhIGtleS92YWx1ZSBvYmplY3QuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGEgc3RyaW5nIHdpdGggdGhlIGZvcm0ga2V5MT12YWx1ZTEuLi5rZXluPXZhbHVlblxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgcHJvcGVydGllc1RvU3RyaW5nKGhhc2gpIHtcbiAgICAvLyAxLiBTb3J0IGtleXMuIFdlIHNvcnQgdGhlIGtleXMgYmVjYXVzZSB3ZSB3YW50IGEgZGV0ZXJtaW5pc3RpYyBvdXRwdXQuXG4gICAgY29uc3Qga2V5cyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGhhc2gpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoYXNoLCBrZXkpKSB7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbiA9IGtleXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBuOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgczEgPSBrZXlzW2ldO1xuICAgICAgICBjb25zdCBzMiA9IGtleXNbal07XG4gICAgICAgIGlmIChVdGlsLmNvbXBhcmVTdHJpbmdzKHMxLCBzMikgPiAwKSB7XG4gICAgICAgICAgLy8gU3dhcC5cbiAgICAgICAgICBrZXlzW2ldID0gczI7XG4gICAgICAgICAga2V5c1tqXSA9IHMxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gR2VuZXJhdGUgb3V0cHV0LlxuICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkgKz0gMSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIG91dHB1dCArPSBrZXk7XG4gICAgICBvdXRwdXQgKz0gJz0nO1xuICAgICAgbGV0IHZhbHVlID0gaGFzaFtrZXldO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCdcXFxcJywgJ1xcXFxcXFxcJyk7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJ1xcbicsICdcXFxcbicpO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCdcXHInLCAnXFxcXHInKTtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnXFx0JywgJ1xcXFx0Jyk7XG5cbiAgICAgIG91dHB1dCArPSB2YWx1ZTtcbiAgICAgIG91dHB1dCArPSAnXFxuJztcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlIHR3byBzdHJpbmdzIHVzaW5nIGNoYXJDb2RlQXQgbWV0aG9kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhIC0gZmlyc3Qgc3RyaW5nIHRvIGNvbXBhcmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBiIC0gc2Vjb25kIHN0cmluZyB0byBjb21wYXJlLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIGNvbXBhcmVTdHJpbmdzKGEsIGIpIHtcbiAgICBsZXQgaTtcbiAgICBjb25zdCBhbiA9IGEubGVuZ3RoO1xuICAgIGNvbnN0IGJuID0gYi5sZW5ndGg7XG4gICAgY29uc3QgbiA9IChhbiA+IGJuKSA/IGJuIDogYW47XG4gICAgZm9yIChpID0gMDsgaSA8IG47IGkgKz0gMSkge1xuICAgICAgY29uc3QgYyA9IFV0aWwuZml4ZWRDaGFyQ29kZUF0KGEsIGkpIC0gVXRpbC5maXhlZENoYXJDb2RlQXQoYiwgaSk7XG4gICAgICBpZiAoYyAhPT0gMCkge1xuICAgICAgICByZXR1cm4gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGEubGVuZ3RoIC0gYi5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogRml4IGNoYXJDb2RlQXQoKSBKYXZhU2NyaXB0IGZ1bmN0aW9uIHRvIGhhbmRsZSBub24tQmFzaWMtTXVsdGlsaW5ndWFsLVBsYW5lIGNoYXJhY3RlcnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBpbnB1dCBzdHJpbmdcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkeCAtIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDBcbiAgICogYW5kIGxlc3MgdGhhbiB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmdcbiAgICogQHJldHVybnMge251bWJlcn0gYW4gaW50ZWdlciByZXByZXNlbnRpbmcgdGhlIFVURi0xNiBjb2RlIG9mIHRoZSBzdHJpbmcgYXQgdGhlIGdpdmVuIGluZGV4LlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgZml4ZWRDaGFyQ29kZUF0KHN0cmluZywgaWR4KSB7XG4gICAgaWR4ID0gaWR4IHx8IDA7XG4gICAgY29uc3QgY29kZSA9IHN0cmluZy5jaGFyQ29kZUF0KGlkeCk7XG4gICAgbGV0IGhpO1xuICAgIGxldCBsb3c7XG5cbiAgICAvKiBIaWdoIHN1cnJvZ2F0ZSAoY291bGQgY2hhbmdlIGxhc3QgaGV4IHRvIDB4REI3RiB0byB0cmVhdCBoaWdoXG4gICAgcHJpdmF0ZSBzdXJyb2dhdGVzIGFzIHNpbmdsZSBjaGFyYWN0ZXJzKSAqL1xuXG4gICAgaWYgKGNvZGUgPj0gMHhEODAwICYmIGNvZGUgPD0gMHhEQkZGKSB7XG4gICAgICBoaSA9IGNvZGU7XG4gICAgICBsb3cgPSBzdHJpbmcuY2hhckNvZGVBdChpZHggKyAxKTtcbiAgICAgIGlmIChOdW1iZXIuaXNOYU4obG93KSkge1xuICAgICAgICB0aHJvdyBTdHJpbmdNYW5hZ2VyLmdldCgnZXhjZXB0aW9uX2hpZ2hfc3Vycm9nYXRlJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKChoaSAtIDB4RDgwMCkgKiAweDQwMCkgKyAobG93IC0gMHhEQzAwKSArIDB4MTAwMDA7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPj0gMHhEQzAwICYmIGNvZGUgPD0gMHhERkZGKSB7IC8vIExvdyBzdXJyb2dhdGUuXG4gICAgICAvKiBXZSByZXR1cm4gZmFsc2UgdG8gYWxsb3cgbG9vcHMgdG8gc2tpcCB0aGlzIGl0ZXJhdGlvbiBzaW5jZSBzaG91bGQgaGF2ZVxuICAgICAgYWxyZWFkeSBoYW5kbGVkIGhpZ2ggc3Vycm9nYXRlIGFib3ZlIGluIHRoZSBwcmV2aW91cyBpdGVyYXRpb24uICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBjb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gVVJMIHdpdGggaXQncyBxdWVyeSBwYXJhbXMgY29udmVydGVkIGludG8gYXJyYXkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBpbnB1dCBVUkwuXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgVVJMIHF1ZXJ5IHBhcmFtcy5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIHVybFRvQXNzQXJyYXkodXJsKSB7XG4gICAgbGV0IGk7XG4gICAgaSA9IHVybC5pbmRleE9mKCc/Jyk7XG4gICAgaWYgKGkgPiAwKSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHVybC5zdWJzdHJpbmcoaSArIDEpO1xuICAgICAgY29uc3Qgc3MgPSBxdWVyeS5zcGxpdCgnJicpO1xuICAgICAgY29uc3QgaCA9IHt9O1xuICAgICAgZm9yIChpID0gMDsgaSA8IHNzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHMgPSBzc1tpXTtcbiAgICAgICAgY29uc3Qga3YgPSBzLnNwbGl0KCc9Jyk7XG4gICAgICAgIGlmIChrdi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgaFtrdlswXV0gPSBkZWNvZGVVUklDb21wb25lbnQoa3ZbMV0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaDtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gZW5jb2RlZCBVUkwgYnkgcmVwbGFjaW5nIGVhY2ggaW5zdGFuY2Ugb2YgY2VydGFpbiBjaGFyYWN0ZXJzIGJ5XG4gICAqIG9uZSwgdHdvLCB0aHJlZSBvciBmb3VyIGVzY2FwZSBzZXF1ZW5jZXMgdXNpbmcgZW5jb2RlVVJJQ29tcG9uZW50IG1ldGhvZC5cbiAgICogIScoKSogLiB3aWxsIG5vdCBiZSBlbmNvZGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xlYXJTdHJpbmcgLSBVUkwgc3RyaW5nIHRvIGJlIGVuY29kZWRcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIHdpdGggaXQncyBzcGVjaWFsIGNoYXJhY3RlcnMgcmVwbGFjZWQuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyB1cmxFbmNvZGUoY2xlYXJTdHJpbmcpIHtcbiAgICBsZXQgb3V0cHV0ID0gJyc7XG4gICAgLy8gTWV0aG9kIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IGVuY29kZSAhJygpKn4gLlxuICAgIG91dHB1dCA9IGVuY29kZVVSSUNvbXBvbmVudChjbGVhclN0cmluZyk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8vIFRPRE86IFRvIHBhcnNlcj9cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBIVE1MIG9mIGEgaW1hZ2UgaW50byB0aGUgb3V0cHV0IGNvZGUgdGhhdCBXSVJJUyBtdXN0IHJldHVybi5cbiAgICogQnkgZGVmYXVsdCByZXR1cm5zIHRoZSBNYXRoTUwgc3RvcmVkIG9uIGRhdGEtbWFobWwgYXR0cmlidXRlIChpZiBpbWdDb2RlIGlzIGEgZm9ybXVsYSlcbiAgICogb3IgdGhlIFdpcmlzY2FzIGF0dHJpYnV0ZSBvZiBhIFdJUklTIGFwcGxldC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGltZ0NvZGUgLSB0aGUgaHRtbCBjb2RlIGZyb20gYSBmb3JtdWxhIG9yIGEgQ0FTIGltYWdlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbnZlcnRUb1htbCAtIHRydWUgaWYgdGhlIGltYWdlIHNob3VsZCBiZSBjb252ZXJ0ZWQgdG8gWE1MLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbnZlcnRUb1NhZmVYbWwgLSB0cnVlIGlmIHRoZSBpbWFnZSBzaG91bGQgYmUgY29udmVydGVkIHRvIHNhZmVYTUwuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBYTUwgb3Igc2FmZVhNTCBvZiBhIFdJUklTIGltYWdlLlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgZ2V0V0lSSVNJbWFnZU91dHB1dChpbWdDb2RlLCBjb252ZXJ0VG9YbWwsIGNvbnZlcnRUb1NhZmVYbWwpIHtcbiAgICBjb25zdCBpbWdPYmplY3QgPSBVdGlsLmNyZWF0ZU9iamVjdChpbWdDb2RlKTtcbiAgICBpZiAoaW1nT2JqZWN0KSB7XG4gICAgICBpZiAoaW1nT2JqZWN0LmNsYXNzTmFtZSA9PT0gQ29uZmlndXJhdGlvbi5nZXQoJ2ltYWdlQ2xhc3NOYW1lJykgfHwgaW1nT2JqZWN0LmdldEF0dHJpYnV0ZShDb25maWd1cmF0aW9uLmdldCgnaW1hZ2VNYXRobWxBdHRyaWJ1dGUnKSkpIHtcbiAgICAgICAgaWYgKCFjb252ZXJ0VG9YbWwpIHtcbiAgICAgICAgICByZXR1cm4gaW1nQ29kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGFNYXRoTUwgPSBpbWdPYmplY3QuZ2V0QXR0cmlidXRlKENvbmZpZ3VyYXRpb24uZ2V0KCdpbWFnZU1hdGhtbEF0dHJpYnV0ZScpKTtcbiAgICAgICAgLy8gVG8gaGFuZGxlIGFubm90YXRpb25zLCBmaXJzdCB3ZSBuZWVkIHRoZSBNYXRoTUwgaW4gWE1MLlxuICAgICAgICBsZXQgbWF0aE1MID0gTWF0aE1MLnNhZmVYbWxEZWNvZGUoZGF0YU1hdGhNTCk7XG5cbiAgICAgICAgaWYgKCFDb25maWd1cmF0aW9uLmdldCgnc2F2ZUhhbmRUcmFjZXMnKSkge1xuICAgICAgICAgIG1hdGhNTCA9IE1hdGhNTC5yZW1vdmVBbm5vdGF0aW9uKG1hdGhNTCwgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRoTUwgPT0gbnVsbCkge1xuICAgICAgICAgIG1hdGhNTCA9IGltZ09iamVjdC5nZXRBdHRyaWJ1dGUoJ2FsdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnZlcnRUb1NhZmVYbWwpIHtcbiAgICAgICAgICBjb25zdCBzYWZlTWF0aE1MID0gTWF0aE1MLnNhZmVYbWxFbmNvZGUobWF0aE1MKTtcbiAgICAgICAgICByZXR1cm4gc2FmZU1hdGhNTDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXRoTUw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbWdDb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG5vZGUgbGVuZ3RoIGluIGNoYXJhY3RlcnMuXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIEhUTUwgbm9kZS5cbiAgICogQHJldHVybnMge251bWJlcn0gbm9kZSBsZW5ndGguXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBnZXROb2RlTGVuZ3RoKG5vZGUpIHtcbiAgICBjb25zdCBzdGF0aWNOb2RlTGVuZ3RocyA9IHtcbiAgICAgIElNRzogMSxcbiAgICAgIEJSOiAxLFxuICAgIH07XG5cbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykgeyAvLyBURVhUX05PREUuXG4gICAgICByZXR1cm4gbm9kZS5ub2RlVmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7IC8vIEVMRU1FTlRfTk9ERS5cbiAgICAgIGxldCBsZW5ndGggPSBzdGF0aWNOb2RlTGVuZ3Roc1tub2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCldO1xuXG4gICAgICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGVuZ3RoID0gMDtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgbGVuZ3RoICs9IFV0aWwuZ2V0Tm9kZUxlbmd0aChub2RlLmNoaWxkTm9kZXNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHNlbGVjdGVkIG5vZGUgb3IgdGV4dCBmcm9tIGFuIGVkaXRhYmxlIEhUTUxFbGVtZW50LlxuICAgKiBJZiB0aGUgY2FyZXQgaXMgb24gYSB0ZXh0IG5vZGUsIGNvbmNhdGVuYXRlcyBpdCB3aXRoIGFsbCB0aGUgcHJldmlvdXMgYW5kIG5leHQgdGV4dCBub2Rlcy5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0IC0gdGhlIGVkaXRhYmxlIEhUTUxFbGVtZW50LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzSWZyYW1lICAtIHNwZWNpZmllcyBpZiB0aGUgdGFyZ2V0IGlzIGFuIGlmcmFtZSBvciBub3RcbiAgICogQHBhcmFtIHtib29sZWFufSBmb3JjZUdldFNlbGVjdGlvbiAtIGlmIHRydWUsIGlnbm9yZXMgSUUgc3lzdGVtIHRvIGdldFxuICAgKiB0aGUgY3VycmVudCBzZWxlY3Rpb24gYW5kIHVzZXMgd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IGFuIG9iamVjdCB3aXRoIHRoZSAnbm9kZScga2V5IHNldCBpZiB0aGUgaXRlbSBpcyBhblxuICAgKiBlbGVtZW50IG9yIHRoZSBrZXlzICdub2RlJyBhbmQgJ2NhcmV0UG9zaXRpb24nIGlmIHRoZSBlbGVtZW50IGlzIHRleHQuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBnZXRTZWxlY3RlZEl0ZW0odGFyZ2V0LCBpc0lmcmFtZSwgZm9yY2VHZXRTZWxlY3Rpb24pIHtcbiAgICBsZXQgd2luZG93VGFyZ2V0O1xuXG4gICAgaWYgKGlzSWZyYW1lKSB7XG4gICAgICB3aW5kb3dUYXJnZXQgPSB0YXJnZXQuY29udGVudFdpbmRvdztcbiAgICAgIHdpbmRvd1RhcmdldC5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3dUYXJnZXQgPSB3aW5kb3c7XG4gICAgICB0YXJnZXQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uICYmICFmb3JjZUdldFNlbGVjdGlvbikge1xuICAgICAgY29uc3QgcmFuZ2UgPSB3aW5kb3dUYXJnZXQuZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG5cbiAgICAgIGlmIChyYW5nZS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgIGlmIChyYW5nZS5odG1sVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKHJhbmdlLnRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbC5nZXRTZWxlY3RlZEl0ZW0odGFyZ2V0LCBpc0lmcmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3dUYXJnZXQuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0luc2VydEltYWdlJywgZmFsc2UsICcjJyk7XG4gICAgICAgIGxldCB0ZW1wb3JhbE9iamVjdCA9IHJhbmdlLnBhcmVudEVsZW1lbnQoKTtcblxuICAgICAgICBpZiAodGVtcG9yYWxPYmplY3Qubm9kZU5hbWUudG9VcHBlckNhc2UoKSAhPT0gJ0lNRycpIHtcbiAgICAgICAgICAvLyBJRTkgZml4OiBwYXJlbnRFbGVtZW50KCkgZG9lcyBub3QgcmV0dXJuIHRoZSBJTUcgbm9kZSxcbiAgICAgICAgICAvLyByZXR1cm5zIHRoZSBwYXJlbnQgRElWIG5vZGUuIEluIElFIDwgOSwgcGFzdGVIVE1MIGRvZXMgbm90IHdvcmsgd2VsbC5cbiAgICAgICAgICByYW5nZS5wYXN0ZUhUTUwoJzxzcGFuIGlkPVwid3JzX29wZW5FZGl0b3JXaW5kb3dfdGVtcG9yYWxPYmplY3RcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgdGVtcG9yYWxPYmplY3QgPSB3aW5kb3dUYXJnZXQuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dyc19vcGVuRWRpdG9yV2luZG93X3RlbXBvcmFsT2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZTtcbiAgICAgICAgbGV0IGNhcmV0UG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRlbXBvcmFsT2JqZWN0Lm5leHRTaWJsaW5nICYmIHRlbXBvcmFsT2JqZWN0Lm5leHRTaWJsaW5nLm5vZGVUeXBlID09PSAzKSB7IC8vIFRFWFRfTk9ERS5cbiAgICAgICAgICBub2RlID0gdGVtcG9yYWxPYmplY3QubmV4dFNpYmxpbmc7XG4gICAgICAgICAgY2FyZXRQb3NpdGlvbiA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGVtcG9yYWxPYmplY3QucHJldmlvdXNTaWJsaW5nXG4gICAgICAgICAgJiYgdGVtcG9yYWxPYmplY3QucHJldmlvdXNTaWJsaW5nLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgbm9kZSA9IHRlbXBvcmFsT2JqZWN0LnByZXZpb3VzU2libGluZztcbiAgICAgICAgICBjYXJldFBvc2l0aW9uID0gbm9kZS5ub2RlVmFsdWUubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGUgPSB3aW5kb3dUYXJnZXQuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgICAgIHRlbXBvcmFsT2JqZWN0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIHRlbXBvcmFsT2JqZWN0KTtcbiAgICAgICAgICBjYXJldFBvc2l0aW9uID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRlbXBvcmFsT2JqZWN0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGVtcG9yYWxPYmplY3QpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBjYXJldFBvc2l0aW9uLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAocmFuZ2UubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbm9kZTogcmFuZ2UuaXRlbSgwKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvd1RhcmdldC5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIGxldCByYW5nZTtcbiAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvd1RhcmdldC5nZXRTZWxlY3Rpb24oKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmFuZ2UgPSB3aW5kb3dUYXJnZXQuZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuXG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykgeyAvLyBURVhUX05PREUuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBjYXJldFBvc2l0aW9uOiByYW5nZS5zdGFydE9mZnNldCxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUgIT09IHJhbmdlLmVuZENvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHsgLy8gRUxFTUVOVF9OT0RFLlxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXG4gICAgICAgIGlmIChub2RlLmNoaWxkTm9kZXNbcG9zaXRpb25dKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGU6IG5vZGUuY2hpbGROb2Rlc1twb3NpdGlvbl0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgbnVsbCBpZiB0aGVyZSBpc24ndCBhbnkgaXRlbSBvciBpZiBpdCBpcyBtYWxmb3JtZWQuXG4gICAqIE90aGVyd2lzZSByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBub2RlIHdpdGggdGhlIE1hdGhNTCBpbWFnZVxuICAgKiBhbmQgdGhlIGN1cnNvciBwb3NpdGlvbiBpbnNpZGUgdGhlIHRleHRhcmVhLlxuICAgKiBAcGFyYW0ge0hUTUxUZXh0QXJlYUVsZW1lbnR9IHRleHRhcmVhIC0gdGV4dGFyZWEgZWxlbWVudC5cbiAgICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG5vZGUsIHRoZSBpbmRleCBvZiB0aGVcbiAgICogYmVnaW5uaW5nICBvZiB0aGUgc2VsZWN0ZWQgdGV4dCwgY2FyZXQgcG9zaXRpb24gYW5kIHRoZSBzdGFydCBhbmQgZW5kIHBvc2l0aW9uIG9mIHRoZVxuICAgKiB0ZXh0IG5vZGUuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBnZXRTZWxlY3RlZEl0ZW1PblRleHRhcmVhKHRleHRhcmVhKSB7XG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0YXJlYS52YWx1ZSk7XG4gICAgY29uc3QgdGV4dE5vZGVWYWx1ZXMgPSBMYXRleC5nZXRMYXRleEZyb21UZXh0Tm9kZSh0ZXh0Tm9kZSwgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQpO1xuICAgIGlmICh0ZXh0Tm9kZVZhbHVlcyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGU6IHRleHROb2RlLFxuICAgICAgY2FyZXRQb3NpdGlvbjogdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBzdGFydFBvc2l0aW9uOiB0ZXh0Tm9kZVZhbHVlcy5zdGFydFBvc2l0aW9uLFxuICAgICAgZW5kUG9zaXRpb246IHRleHROb2RlVmFsdWVzLmVuZFBvc2l0aW9uLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTG9va3MgZm9yIGVsZW1lbnRzIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIG5hbWUgaW4gYSBIVE1MIGNvZGUgc3RyaW5nLlxuICAgKiBJbXBvcnRhbnQ6IHRoaXMgZnVuY3Rpb24gaXMgdmVyeSBjb25jcmV0ZSBmb3IgV0lSSVMgY29kZS5cbiAgICogSXQgdGFrZXMgYXMgcHJlY29uZGl0aW9ucyBsb3RzIG9mIGJlaGF2aW9ycyB0aGF0IGFyZSBub3QgdGhlIGdlbmVyYWwgY2FzZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSAgSFRNTCBjb2RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIGVsZW1lbnQgbmFtZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBhdXRvQ2xvc2VkIC0gdHJ1ZSBpZiB0aGUgZWxlbWVudHMgYXJlIGF1dG9DbG9zZWQuXG4gICAqIEByZXR1cm4ge09iamVjdFtdfSBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgSFRNTCBlbGVtZW50cyBvZiBjb2RlIG1hdGNoaW5nIHRoZSBuYW1lIGFyZ3VtZW50LlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgZ2V0RWxlbWVudHNCeU5hbWVGcm9tU3RyaW5nKGNvZGUsIG5hbWUsIGF1dG9DbG9zZWQpIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IFtdO1xuICAgIGNvZGUgPSBjb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgc3RhcnQgPSBjb2RlLmluZGV4T2YoYDwke25hbWV9IGApO1xuXG4gICAgd2hpbGUgKHN0YXJ0ICE9PSAtMSkgeyAvLyBMb29rIGZvciBub2Rlcy5cbiAgICAgIGxldCBlbmRTdHJpbmc7XG5cbiAgICAgIGlmIChhdXRvQ2xvc2VkKSB7XG4gICAgICAgIGVuZFN0cmluZyA9ICc+JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVuZFN0cmluZyA9IGA8LyR7bmFtZX0+YDtcbiAgICAgIH1cblxuICAgICAgbGV0IGVuZCA9IGNvZGUuaW5kZXhPZihlbmRTdHJpbmcsIHN0YXJ0KTtcblxuICAgICAgaWYgKGVuZCAhPT0gLTEpIHtcbiAgICAgICAgZW5kICs9IGVuZFN0cmluZy5sZW5ndGg7XG4gICAgICAgIGVsZW1lbnRzLnB1c2goe1xuICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgIGVuZCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbmQgPSBzdGFydCArIDE7XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0ID0gY29kZS5pbmRleE9mKGA8JHtuYW1lfSBgLCBlbmQpO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzZTY0IGNoYXJhY3Rlci5cbiAgICogQHBhcmFtICB7c3RyaW5nfSBjaGFyYWN0ZXIgLSBiYXNlNjQgY2hhcmFjdGVyLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBiYXNlNjQgY2hhcmFjdGVyIG51bWVyaWMgdmFsdWUuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBkZWNvZGU2NChjaGFyYWN0ZXIpIHtcbiAgICBjb25zdCBQTFVTID0gJysnLmNoYXJDb2RlQXQoMCk7XG4gICAgY29uc3QgU0xBU0ggPSAnLycuY2hhckNvZGVBdCgwKTtcbiAgICBjb25zdCBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKTtcbiAgICBjb25zdCBMT1dFUiA9ICdhJy5jaGFyQ29kZUF0KDApO1xuICAgIGNvbnN0IFVQUEVSID0gJ0EnLmNoYXJDb2RlQXQoMCk7XG4gICAgY29uc3QgUExVU19VUkxfU0FGRSA9ICctJy5jaGFyQ29kZUF0KDApO1xuICAgIGNvbnN0IFNMQVNIX1VSTF9TQUZFID0gJ18nLmNoYXJDb2RlQXQoMCk7XG4gICAgY29uc3QgY29kZSA9IGNoYXJhY3Rlci5jaGFyQ29kZUF0KDApO1xuXG4gICAgaWYgKGNvZGUgPT09IFBMVVMgfHwgY29kZSA9PT0gUExVU19VUkxfU0FGRSkge1xuICAgICAgcmV0dXJuIDYyOyAvLyBDaGFyICcrJy5cbiAgICB9XG4gICAgaWYgKGNvZGUgPT09IFNMQVNIIHx8IGNvZGUgPT09IFNMQVNIX1VSTF9TQUZFKSB7XG4gICAgICByZXR1cm4gNjM7IC8vIENoYXIgJy8nLlxuICAgIH1cbiAgICBpZiAoY29kZSA8IE5VTUJFUikge1xuICAgICAgcmV0dXJuIC0xOyAvLyBObyBtYXRjaC5cbiAgICB9XG4gICAgaWYgKGNvZGUgPCBOVU1CRVIgKyAxMCkge1xuICAgICAgcmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2O1xuICAgIH1cbiAgICBpZiAoY29kZSA8IFVQUEVSICsgMjYpIHtcbiAgICAgIHJldHVybiBjb2RlIC0gVVBQRVI7XG4gICAgfVxuICAgIGlmIChjb2RlIDwgTE9XRVIgKyAyNikge1xuICAgICAgcmV0dXJuIGNvZGUgLSBMT1dFUiArIDI2O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgYmFzZTY0IHN0cmluZyB0byBhIGFycmF5IG9mIGJ5dGVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYjY0U3RyaW5nIC0gYmFzZTY0IHN0cmluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIGRpbWVuc2lvbiBvZiBieXRlIGFycmF5IChieSBkZWZhdWx0IHdob2xlIHN0cmluZykuXG4gICAqIEByZXR1cm4ge09iamVjdFtdfSB0aGUgcmVzdWx0YW50IGJ5dGUgYXJyYXkuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyBiNjRUb0J5dGVBcnJheShiNjRTdHJpbmcsIGxlbmd0aCkge1xuICAgIGxldCB0bXA7XG5cbiAgICBpZiAoYjY0U3RyaW5nLmxlbmd0aCAlIDQgPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKTsgLy8gVGlwcGVkIGJhc2U2NC4gTGVuZ3RoIGlzIGZpeGVkLlxuICAgIH1cblxuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgbGV0IGw7XG4gICAgbGV0IHBsYWNlSG9sZGVycztcbiAgICBpZiAoIWxlbmd0aCkgeyAvLyBBbGwgYjY0U3RyaW5nIHN0cmluZy5cbiAgICAgIGlmIChiNjRTdHJpbmcuY2hhckF0KGI2NFN0cmluZy5sZW5ndGggLSAyKSA9PT0gJz0nKSB7XG4gICAgICAgIHBsYWNlSG9sZGVycyA9IDI7XG4gICAgICB9IGVsc2UgaWYgKGI2NFN0cmluZy5jaGFyQXQoYjY0U3RyaW5nLmxlbmd0aCAtIDEpID09PSAnPScpIHtcbiAgICAgICAgcGxhY2VIb2xkZXJzID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBsYWNlSG9sZGVycyA9IDA7XG4gICAgICB9XG4gICAgICBsID0gcGxhY2VIb2xkZXJzID4gMCA/IGI2NFN0cmluZy5sZW5ndGggLSA0IDogYjY0U3RyaW5nLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgbCA9IGxlbmd0aDtcbiAgICB9XG5cbiAgICBsZXQgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSArPSA0KSB7XG4gICAgICAvLyBJZ25vcmluZyBjb2RlIGNoZWNrZXIgc3RhbmRhcmRzIChiaXRld2lzZSBvcGVyYXRvcnMpLlxuICAgICAgLy8gU2VlIGh0dHBzOi8vdHJhY2tlci5tb29kbGUub3JnL2Jyb3dzZS9DT05UUklCLTU4NjIgZm9yIGZ1cnRoZXIgaW5mb3JtYXRpb24uXG4gICAgICAvLyBAY29kaW5nU3RhbmRhcmRzSWdub3JlU3RhcnRcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICB0bXAgPSAoVXRpbC5kZWNvZGU2NChiNjRTdHJpbmcuY2hhckF0KGkpKSA8PCAxOCkgfCAoVXRpbC5kZWNvZGU2NChiNjRTdHJpbmcuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKFV0aWwuZGVjb2RlNjQoYjY0U3RyaW5nLmNoYXJBdChpICsgMikpIDw8IDYpIHwgVXRpbC5kZWNvZGU2NChiNjRTdHJpbmcuY2hhckF0KGkgKyAzKSk7XG5cbiAgICAgIGFyci5wdXNoKCh0bXAgPj4gMTYpICYgMHhGRik7XG4gICAgICBhcnIucHVzaCgodG1wID4+IDgpICYgMHhGRik7XG4gICAgICBhcnIucHVzaCh0bXAgJiAweEZGKTtcbiAgICAgIC8vIEBjb2RpbmdTdGFuZGFyZHNJZ25vcmVFbmRcbiAgICB9XG5cbiAgICBpZiAocGxhY2VIb2xkZXJzKSB7XG4gICAgICBpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG4gICAgICAgIC8vIElnbm9yaW5nIGNvZGUgY2hlY2tlciBzdGFuZGFyZHMgKGJpdGV3aXNlIG9wZXJhdG9ycykuXG4gICAgICAgIC8vIEBjb2RpbmdTdGFuZGFyZHNJZ25vcmVTdGFydFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICB0bXAgPSAoVXRpbC5kZWNvZGU2NChiNjRTdHJpbmcuY2hhckF0KGkpKSA8PCAyKSB8IChVdGlsLmRlY29kZTY0KGI2NFN0cmluZy5jaGFyQXQoaSArIDEpKSA+PiA0KTtcbiAgICAgICAgYXJyLnB1c2godG1wICYgMHhGRik7XG4gICAgICB9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICB0bXAgPSAoVXRpbC5kZWNvZGU2NChiNjRTdHJpbmcuY2hhckF0KGkpKSA8PCAxMCkgfCAoVXRpbC5kZWNvZGU2NChiNjRTdHJpbmcuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoVXRpbC5kZWNvZGU2NChiNjRTdHJpbmcuY2hhckF0KGkgKyAyKSkgPj4gMik7XG4gICAgICAgIGFyci5wdXNoKCh0bXAgPj4gOCkgJiAweEZGKTtcbiAgICAgICAgYXJyLnB1c2godG1wICYgMHhGRik7XG4gICAgICAgIC8vIEBjb2RpbmdTdGFuZGFyZHNJZ25vcmVFbmRcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmaXJzdCAzMi1iaXQgc2lnbmVkIGludGVnZXIgZnJvbSBhIGJ5dGUgYXJyYXkuXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGJ5dGVzIC0gYXJyYXkgb2YgYnl0ZXMuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSAzMi1iaXQgc2lnbmVkIGludGVnZXIuXG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyByZWFkSW50MzIoYnl0ZXMpIHtcbiAgICBpZiAoYnl0ZXMubGVuZ3RoIDwgNCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpbnQzMiA9IGJ5dGVzLnNwbGljZSgwLCA0KTtcbiAgICAvLyBAY29kaW5nU3RhbmRhcmRzSWdub3JlU3RhcnTCoVxuICAgIHJldHVybiAoaW50MzJbMF0gPDwgMjQgfCBpbnQzMlsxXSA8PCAxNiB8IGludDMyWzJdIDw8IDggfCBpbnQzMlszXSA8PCAwKTtcbiAgICAvLyBAY29kaW5nU3RhbmRhcmRzSWdub3JlRW5kXG4gIH1cblxuICAvKipcbiAgICogUmVhZCB0aGUgZmlyc3QgYnl0ZSBmcm9tIGEgYnl0ZSBhcnJheS5cbiAgICogQHBhcmFtIHtPYmplY3R9IGJ5dGVzIC0gaW5wdXQgYnl0ZSBhcnJheS5cbiAgICogQHJldHVybnMge251bWJlcn0gZmlyc3QgYnl0ZSBvZiB0aGUgYnl0ZSBhcnJheS5cbiAgICogQHN0YXRpY1xuICAgKi9cbiAgc3RhdGljIHJlYWRCeXRlKGJ5dGVzKSB7XG4gICAgLy8gQGNvZGluZ1N0YW5kYXJkc0lnbm9yZVN0YXJ0XG4gICAgcmV0dXJuIGJ5dGVzLnNoaWZ0KCkgPDwgMDtcbiAgICAvLyBAY29kaW5nU3RhbmRhcmRzSWdub3JlRW5kXG4gIH1cblxuICAvKipcbiAgICogUmVhZCBhbiBhcmJpdHJhcnkgbnVtYmVyIG9mIGJ5dGVzLCBmcm9tIGEgZml4ZWQgcG9zaXRpb24gb24gYSBieXRlIGFycmF5LlxuICAgKiBAcGFyYW0gIHtPYmplY3RbXX0gYnl0ZXMgLSBieXRlIGFycmF5LlxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IHBvcyAtIHN0YXJ0IHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IGxlbiAtIG51bWJlciBvZiBieXRlcyB0byByZWFkLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119IHRoZSBieXRlIGFycmF5LlxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgcmVhZEJ5dGVzKGJ5dGVzLCBwb3MsIGxlbikge1xuICAgIHJldHVybiBieXRlcy5zcGxpY2UocG9zLCBsZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydHMgb3IgbW9kaWZpZXMgZm9ybXVsYXMgb3IgQ0FTIG9uIGEgdGV4dGFyZWEuXG4gICAqIEBwYXJhbSB7SFRNTFRleHRBcmVhRWxlbWVudH0gdGV4dGFyZWEgLSB0ZXh0YXJlYSB0YXJnZXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGV4dCB0byBhZGQgaW4gdGhlIHRleHRhcmVhLiBGb3IgZXhhbXBsZSwgdG8gYWRkIHRoZSBsaW5rIHRvIHRoZSBpbWFnZSxcbiAgICogY2FsbCB0aGlzIGZ1bmN0aW9uIGFzICh0ZXh0YXJlYSwgUGFyc2VyLmNyZWF0ZUltYWdlU3JjKG1hdGhtbCkpO1xuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgdXBkYXRlVGV4dEFyZWEodGV4dGFyZWEsIHRleHQpIHtcbiAgICBpZiAodGV4dGFyZWEgJiYgdGV4dCkge1xuICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcblxuICAgICAgaWYgKHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3Rpb25FbmQgfSA9IHRleHRhcmVhO1xuICAgICAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRleHRhcmVhLnZhbHVlLnN1YnN0cmluZygwLCB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbkVuZFN1YiA9IHRleHRhcmVhLnZhbHVlLnN1YnN0cmluZyhzZWxlY3Rpb25FbmQsIHRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gc2VsZWN0aW9uU3RhcnQgKyB0ZXh0ICsgc2VsZWN0aW9uRW5kU3ViO1xuICAgICAgICB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQgKyB0ZXh0Lmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgICAgICBzZWxlY3Rpb24udGV4dCA9IHRleHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vZGlmaWVzIGV4aXN0aW5nIGZvcm11bGEgb24gYSB0ZXh0YXJlYS5cbiAgICogQHBhcmFtIHtIVE1MVGV4dEFyZWFFbGVtZW50fSB0ZXh0YXJlYSAtIHRleHQgYXJlYSB0YXJnZXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGV4dCB0byBhZGQgaW4gdGhlIHRleHRhcmVhLiBGb3IgZXhhbXBsZSwgaWYgeW91IHdhbnQgdG8gYWRkIHRoZSBsaW5rXG4gICAqIHRvIHRoZSBpbWFnZSx5b3UgY2FuIGNhbGwgdGhpcyBmdW5jdGlvbiBhc1xuICAgKiBVdGlsLnVwZGF0ZVRleHRhcmVhKHRleHRhcmVhLCBQYXJzZXIuY3JlYXRlSW1hZ2VTcmMobWF0aG1sKSk7XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCAtIGJlZ2lubmluZyBpbmRleCBmcm9tIHRleHRhcmVhIHdoZXJlIGl0IG5lZWRzIHRvIGJlIHJlcGxhY2VkIGJ5IHRleHQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgLSBlbmRpbmcgaW5kZXggZnJvbSB0ZXh0YXJlYSB3aGVyZSBpdCBuZWVkcyB0byBiZSByZXBsYWNlZCBieSB0ZXh0XG4gICAqIEBzdGF0aWNcbiAgICovXG4gIHN0YXRpYyB1cGRhdGVFeGlzdGluZ1RleHRPblRleHRhcmVhKHRleHRhcmVhLCB0ZXh0LCBzdGFydCwgZW5kKSB7XG4gICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICBjb25zdCB0ZXh0YXJlYVN0YXJ0ID0gdGV4dGFyZWEudmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0KTtcbiAgICB0ZXh0YXJlYS52YWx1ZSA9IHRleHRhcmVhU3RhcnQgKyB0ZXh0ICsgdGV4dGFyZWEudmFsdWUuc3Vic3RyaW5nKGVuZCwgdGV4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQgPSBzdGFydCArIHRleHQubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHBhcmFtZXRlciB3aXRoIGl0J3MgY29ycmVzcG9uZGVudCB2YWx1ZSB0byBhbiBVUkwgKEdFVCkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVVJMIHBhdGhcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlciAtIHBhcmFtZXRlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB2YWx1ZVxuICAgKiBAc3RhdGljXG4gICAqL1xuICBzdGF0aWMgYWRkQXJndW1lbnQocGF0aCwgcGFyYW1ldGVyLCB2YWx1ZSkge1xuICAgIGxldCBzZXA7XG4gICAgaWYgKHBhdGguaW5kZXhPZignPycpID4gMCkge1xuICAgICAgc2VwID0gJyYnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXAgPSAnPyc7XG4gICAgfVxuICAgIHJldHVybiBgJHtwYXRoICsgc2VwICsgcGFyYW1ldGVyfT0ke3ZhbHVlfWA7XG4gIH1cbn1cbiIsImltcG9ydCB7IFByb3BlcnRpZXMgfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgcmVuZGVyTGF0ZXggfSBmcm9tICcuL2xhdGV4JztcbmltcG9ydCB7IHJlbmRlck1hdGhNTCB9IGZyb20gJy4vbWF0aG1sJztcblxuLy8gVGhpcyBzaG91bGQgYmUgdGhlIG9ubHkgY29kZSBleGVjdXRlZCBvdXRzaWRlIG9mIGEgZnVuY3Rpb25cbi8vIGFuZCB0aGUgb25seSBjb2RlIGNvbnRhaW5pbmcgYnJvd3NlciBnbG9iYWxzIChlLmcuIHdpbmRvdylcbi8vIFRPRE8gdHJ5IHRvIHNldCB1cCB0aGUgbGludGVyIHRvIGNoZWNrIHRoZXNlIHR3byBjb25zdHJhaW50c1xubWFpbih3aW5kb3cpO1xuXG4vKipcbiAqIEluaXRpYWwgZnVuY3Rpb24gY2FsbGVkIHdoZW4gbG9hZGluZyB0aGUgc2NyaXB0LlxuICogQHBhcmFtIHtXaW5kb3d9IHcgLSBUaGUgd2luZG93IGluc3RhbmNlIG9mIHRoZSBicm93c2VyLlxuICovXG5hc3luYyBmdW5jdGlvbiBtYWluKHc6IFdpbmRvdyk6IFByb21pc2U8dm9pZD4ge1xuICAvLyBFeHBvc2UgdGhlIGdsb2JhbHMgdG8gdGhlIGJyb3dzZXJcbiAgKHcgYXMgYW55KS52aWV3ZXIgPSB7XG4gICAgUHJvcGVydGllcyxcbiAgfTtcblxuICBjb25zdCBkb2N1bWVudCA9IHcuZG9jdW1lbnQ7XG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSBET00gbG9va2luZyBmb3IgTGFUZVggYW5kIDxtYXRoPiBlbGVtZW50cy5cbiAgICogUmVwbGFjZXMgdGhlbSB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIHJlbmRlcmVkIGltYWdlcyB3aXRoaW4gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY3VtZW50IC0gVGhlIERPTSBkb2N1bWVudCBpbiB3aGljaCB0byBzZWFyY2ggZm9yIHRoZSByZW5kZXJpbmcgcm9vdC5cbiAgICogQHBhcmFtIHtNdXRhdGlvbk9ic2VydmVyfSBvYnNlcnZlciAtIE11dGF0aW9uIG9ic2VydmVyIHRvIGFjdGl2YXRlIG9yIHJlYWN0aXZhdGUgZXZlcnkgdGltZSB0aGUgcmVuZGVyaW5nIHJvb3QgY2hhbmdlcy5cbiAgICovXG4gIFByb3BlcnRpZXMucmVuZGVyID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihQcm9wZXJ0aWVzLmVsZW1lbnQpO1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBhd2FpdCByZW5kZXJMYXRleChlbGVtZW50KTtcbiAgICAgIGF3YWl0IHJlbmRlck1hdGhNTChlbGVtZW50KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSW5pdGlhbCBmdW5jdGlvbiB0byBjYWxsIG9uY2UgZG9jdW1lbnQgaXMgbG9hZGVkXG4gIC8vIFJlbmRlcnMgZm9ybXVsYXMgYW5kIHNldHMgb2JzZXJ2ZXJcbiAgY29uc3Qgc3RhcnQgPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gRmlyc3QgcmVuZGVyXG4gICAgUHJvcGVydGllcy5yZW5kZXIoKTtcblxuICAgIC8vIENhbGxiYWNrIGNhbGxlZCBldmVyeSB0aW1lIHRoZXJlIGlzIGEgbXV0YXRpb24gaW4gdGhlIHdhdGNoZWQgRE9NIGVsZW1lbnRcbiAgICBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyAobXV0YXRpb25MaXN0LCBvYnNlcnZlcikgPT4ge1xuICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG11dGF0aW9uLmFkZGVkTm9kZXMpIHtcbiAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBhd2FpdCBQcm9wZXJ0aWVzLnJlbmRlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLy8gV2UgbmVlZCB0byB3YXRjaCBvdmVyIHRoZSB3aG9sZSBkb2N1bWVudCwgaW4gY2FzZSB0aGUgUHJvcGVydGllcy5lbGVtZW50IGlzIGluc2VydGVkXG4gICAgLy8gZS5nLiB3ZSBzZXQgUHJvcGVydGllcy5lbGVtZW50ID0gJyNyZW5kZXJBcmVhJyBhbmQgdGhlbiB3ZSBhcHBlbmQgPGRpdiBpZD1cInJlbmRlckFyZWFcIj4kJDIrMj00JCQ8L2Rpdj4gdG8gdGhlIGRvY3VtZW50XG4gICAgLm9ic2VydmUoZG9jdW1lbnQsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsIC8vIEluIGNhc2UgYW4gYXR0cmlidXRlIGlzIGNoYW5nZWQgaW4gYSA8bWF0aD4gbm9kZSwgZm9yIGluc3RhbmNlXG4gICAgICBjaGlsZExpc3Q6IHRydWUsIC8vIEluIGNhc2UgYSBuZXcgPG1hdGg+IG9yICQkbGF0ZXgkJCBub2RlIGlzIGFkZGVkLCBmb3IgaW5zdGFuY2VcbiAgICAgIHN1YnRyZWU6IHRydWUsIC8vIEluIGNhc2UgYSA8bWF0aD4gbm9kZSBpcyBhZGRlZCBhcyBhIGRlc2NlbmRhbnQgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnQsIGZvciBpbnN0YW5jZVxuICAgIH0pO1xuICB9O1xuXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9ET01Db250ZW50TG9hZGVkX2V2ZW50I2NoZWNraW5nX3doZXRoZXJfbG9hZGluZ19pc19hbHJlYWR5X2NvbXBsZXRlXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIikge1xuICAgIC8vIExvYWRpbmcgaGFzbid0IGZpbmlzaGVkIHlldFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHN0YXJ0KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBgRE9NQ29udGVudExvYWRlZGAgaGFzIGFscmVhZHkgZmlyZWRcbiAgICBzdGFydCgpO1xuICB9XG5cbiAgLy8gRGlzcGF0Y2ggYW4gZXZlbnQgbm90aWZ5aW5nIHRoYXQgdGhlIHZpZXdlciBoYXMgYmVlbiBsb2FkZWRcbiAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3ZpZXdlckxvYWRlZCcpKTtcblxufVxuIiwiaW1wb3J0IHsgbGF0ZXhUb01hdGhtbCB9IGZyb20gJy4vc2VydmljZXMnO1xuaW1wb3J0IHsgUHJvcGVydGllcyB9IGZyb20gJy4vcHJvcGVydGllcyc7XG5cbmludGVyZmFjZSBMYXRleFBvc2l0aW9uIHtcbiAgc3RhcnQ6IG51bWJlcixcbiAgZW5kOiBudW1iZXIsXG59XG5cbi8qKlxuICogUGFyc2UgdGhlIERPTSBsb29raW5nIGZvciBMYVRlWCBub2RlcyBhbmQgcmVwbGFjZXMgdGhlbSB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIHJlbmRlcmVkIGltYWdlcy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJvb3QgLSBBbnkgRE9NIGVsZW1lbnQgdGhhdCBjYW4gY29udGFpbiBNYXRoTUwuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW5kZXJMYXRleChyb290OiBIVE1MRWxlbWVudCkge1xuXG4gIGlmIChQcm9wZXJ0aWVzLnZpZXdlciAhPT0gJ2ltYWdlJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGxhdGV4Tm9kZXMgPSBmaW5kTGF0ZXhUZXh0Tm9kZXMocm9vdCk7XG5cbiAgZm9yIChjb25zdCBsYXRleE5vZGUgb2YgbGF0ZXhOb2Rlcykge1xuICAgIGF3YWl0IHJlcGxhY2VMYXRleEluVGV4dE5vZGUobGF0ZXhOb2RlKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlcGxhY2UgTGFUZVggaW5zdGFuY2VzIHdpdGggTWF0aE1MIGluc2lkZSBhIGdpdmVuIG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUZXh0IG5vZGUgaW4gd2hpY2ggdG8gc2VhcmNoIGFuZCByZXBsYWNlIExhVGVYIGluc3RhbmNlcy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gcmVwbGFjZUxhdGV4SW5UZXh0Tm9kZShub2RlOiBOb2RlKSB7XG4gIGNvbnN0IHRleHRDb250ZW50OiBzdHJpbmcgPSBub2RlLnRleHRDb250ZW50IHx8ICcnO1xuICBsZXQgcG9zOiBudW1iZXIgPSAwO1xuXG4gIHdoaWxlIChwb3MgPCB0ZXh0Q29udGVudC5sZW5ndGgpIHtcbiAgICBjb25zdCBuZXh0TGF0ZXhQb3NpdGlvbjogTGF0ZXhQb3NpdGlvbiA9IGdldE5leHRMYXRleFBvcyhwb3MsIHRleHRDb250ZW50KTtcbiAgICBpZiAobmV4dExhdGV4UG9zaXRpb24pIHtcbiAgICAgIC8vIEdldCBsZWZ0IG5vbiBMYVRlWCB0ZXh0LlxuICAgICAgY29uc3QgbGVmdFRleHQ6IHN0cmluZyA9IHRleHRDb250ZW50LnN1YnN0cmluZyhwb3MsIG5leHRMYXRleFBvc2l0aW9uLnN0YXJ0KTtcbiAgICAgIGNvbnN0IGxlZnRUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGxlZnRUZXh0KTtcbiAgICAgIC8vIENyZWF0ZSBhIG5vZGUgd2l0aCBsZWZ0IHRleHQuXG4gICAgICBub2RlLnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZShsZWZ0VGV4dE5vZGUsIG5vZGUpO1xuICAgICAgbm9kZS5ub2RlVmFsdWUgPSBub2RlLm5vZGVWYWx1ZS5zdWJzdHJpbmcocG9zLCBuZXh0TGF0ZXhQb3NpdGlvbi5zdGFydCk7XG5cbiAgICAgIC8vIEdldCBMYVRlWCB0ZXh0LlxuICAgICAgY29uc3QgbGF0ZXggPSB0ZXh0Q29udGVudC5zdWJzdHJpbmcobmV4dExhdGV4UG9zaXRpb24uc3RhcnQgKyAnJCQnLmxlbmd0aCwgbmV4dExhdGV4UG9zaXRpb24uZW5kKTtcbiAgICAgIC8vIENvbnZlcnQgTGFUZVggdG8gbWF0aG1sLlxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsYXRleFRvTWF0aG1sKGxhdGV4LCBQcm9wZXJ0aWVzLmVkaXRvclNlcnZpY2VzUm9vdCwgUHJvcGVydGllcy5lZGl0b3JTZXJ2aWNlc0V4dGVuc2lvbik7XG4gICAgICAvLyBJbnNlcnQgbWF0aG1sIG5vZGUuXG4gICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHJlc3BvbnNlLnRleHQpO1xuXG4gICAgICBub2RlLnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZShmcmFnbWVudCwgbm9kZSk7XG4gICAgICBub2RlLm5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlLnN1YnN0cmluZyhuZXh0TGF0ZXhQb3NpdGlvbi5zdGFydCwgbmV4dExhdGV4UG9zaXRpb24uZW5kKTtcblxuICAgICAgcG9zID0gbmV4dExhdGV4UG9zaXRpb24uZW5kICsgJyQkJy5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIG1vcmUgTGFUZVggbm9kZSBmb3VuZC5cbiAgICAgIGNvbnN0IHRleHQgPSB0ZXh0Q29udGVudC5zdWJzdHJpbmcocG9zKTtcbiAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICBub2RlLnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZSh0ZXh0Tm9kZSwgbm9kZSk7XG4gICAgICBub2RlLm5vZGVWYWx1ZSA9ICcnO1xuICAgICAgcG9zID0gdGV4dENvbnRlbnQubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIC8vIERlbGV0ZSBvcmlnaW5hbCB0ZXh0IG5vZGUuXG4gIG5vZGUucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGggYWxsIEhUTUwgTGFUZVggbm9kZXMuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByb290IC0gQW55IERPTSBlbGVtZW50IHRoYXQgY2FuIGNvbnRhaW4gTGFUZVguXG4gKiBAcmV0dXJucyB7Tm9kZVtdfSBBcnJheSB3aXRoIGFsbCBIVE1MIExhVGVYIG5vZGVzIGluc2lkZSByb290LlxuICovXG5mdW5jdGlvbiBmaW5kTGF0ZXhUZXh0Tm9kZXMocm9vdDogYW55KTogTm9kZVtdIHtcbiAgY29uc3Qgbm9kZUl0ZXJhdG9yOiBOb2RlSXRlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IoXG4gICAgcm9vdCxcbiAgICBOb2RlRmlsdGVyLlNIT1dfVEVYVCxcbiAgICBub2RlID0+IC8oXFwkXFwkKSguKikoXFwkXFwkKS8udGVzdChub2RlLm5vZGVWYWx1ZSB8fCAnJykgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1RcbiAgKTtcbiAgY29uc3QgbGF0ZXhOb2RlcyA6IE5vZGVbXSA9IFtdO1xuXG4gIGxldCBjdXJyZW50Tm9kZTogTm9kZSB8IG51bGw7XG4gIHdoaWxlIChjdXJyZW50Tm9kZSA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgbGF0ZXhOb2Rlcy5wdXNoKGN1cnJlbnROb2RlKTtcbiAgfVxuXG4gIHJldHVybiBsYXRleE5vZGVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHtzdGFydCwgZW5kfSB3aXRoIHRoZSBzdGFydCBhbmQgZW5kIGxhdGV4IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyAtIEN1cnJlbnQgcG9zaXRpb24gaW5zaWRlIHRoZSB0ZXh0LlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSBUZXh0IHdoZXJlIHRoZSBuZXh0IGxhdGV4IGl0IHdpbGwgYmUgc2VhcmNoZWQuXG4gKiBAXG4gKi9cbmZ1bmN0aW9uIGdldE5leHRMYXRleFBvcyhwb3M6IG51bWJlciwgdGV4dDogc3RyaW5nKTogTGF0ZXhQb3NpdGlvbiB7XG5cdGNvbnN0IGZpcnN0TGF0ZXhUYWdzID0gdGV4dC5pbmRleE9mKCckJCcsIHBvcyk7XG5cdGNvbnN0IHNlY29uZExhdGV4VGFncyA9IGZpcnN0TGF0ZXhUYWdzID09IC0xID8gLTEgOiB0ZXh0LmluZGV4T2YoJyQkJywgZmlyc3RMYXRleFRhZ3MgKyAnJCQnLmxlbmd0aCk7XG5cdHJldHVybiBmaXJzdExhdGV4VGFncyAhPSAtMSAmJiBzZWNvbmRMYXRleFRhZ3MgIT0gLTEgPyB7J3N0YXJ0JzogZmlyc3RMYXRleFRhZ3MsICdlbmQnOiBzZWNvbmRMYXRleFRhZ3N9IDogbnVsbDtcbn1cbiIsImltcG9ydCB7IFByb3BlcnRpZXMgfSBmcm9tIFwiLi9wcm9wZXJ0aWVzXCI7XG5pbXBvcnQgeyBzaG93SW1hZ2UsIGNyZWF0ZUltYWdlLCBtYXRobWwyYWNjZXNzaWJsZSwgcHJvY2Vzc0pzb25SZXNwb25zZSB9IGZyb20gJy4vc2VydmljZXMnO1xuXG4vKipcbiAqIERhdGEgb2J0YWluZWQgd2hlbiByZW5kZXJpbmcgaW1hZ2UuIERhdGEgbmVlZGVkIHRvIHNldCB0aGUgZm9ybXVsYSBpbWFnZSBwYXJhbWV0ZXJzLlxuICovXG5pbnRlcmZhY2UgRm9ybXVsYURhdGEge1xuICBjb250ZW50OiBzdHJpbmcsXG4gIGJhc2VsaW5lOiBzdHJpbmcsXG4gIGhlaWdodDogc3RyaW5nLFxuICB3aWR0aDogc3RyaW5nLFxufVxuXG4vKipcbiAqIFBhcnNlIHRoZSBET00gbG9va2luZyBmb3IgPG1hdGg+IGVsZW1lbnRzIGFuZCByZXBsYWNlIHRoZW0gd2l0aCB0aGUgY29ycmVzcG9uZGluZyByZW5kZXJlZCBpbWFnZXMgd2l0aGluIHRoZSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcm9vdCAtIEFueSBET00gZWxlbWVudCB0aGF0IGNhbiBjb250YWluIE1hdGhNTC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbmRlck1hdGhNTChyb290OiBIVE1MRWxlbWVudCk6IFByb21pc2U8dm9pZD4ge1xuXG4gIGlmIChQcm9wZXJ0aWVzLnZpZXdlciAhPT0gJ2ltYWdlJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvcihjb25zdCBtYXRoRWxlbWVudCBvZiBbLi4ucm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbWF0aCcpXSkge1xuICAgIGNvbnN0IG1tbCA9IG1hdGhFbGVtZW50Lm91dGVySFRNTDtcblxuICAgIGxldCByZXN1bHQ7XG5cbiAgICBpZiAoUHJvcGVydGllcy53aXJpc3BsdWdpbnBlcmZvcm1hbmNlID09PSAndHJ1ZScpIHtcbiAgICAgIC8vIFRyYW5zZm9ybSBtbWwgdG8gaW1nLlxuICAgICAgcmVzdWx0ID0gYXdhaXQgc2hvd0ltYWdlKG1tbCwgUHJvcGVydGllcy5sYW5nLCBQcm9wZXJ0aWVzLmVkaXRvclNlcnZpY2VzUm9vdCwgUHJvcGVydGllcy5lZGl0b3JTZXJ2aWNlc0V4dGVuc2lvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNyZWF0ZWltYWdlIHJldHVybnMgdGhlIFVSTCB0byBzaG93aW1hZ2Ugb2YgdGhlIGNvcnJlc3BvbmRpbmcgaW1hZ2VcbiAgICAgIGxldCB1cmwgPSBhd2FpdCBjcmVhdGVJbWFnZShtbWwsIFByb3BlcnRpZXMubGFuZywgUHJvcGVydGllcy5lZGl0b3JTZXJ2aWNlc1Jvb3QsIFByb3BlcnRpZXMuZWRpdG9yU2VydmljZXNFeHRlbnNpb24pO1xuICAgICAgLy8gVGhpcyBsaW5lIGlzIG5lY2Vzc2FyeSBkdWUgdG8gYSBidWcgaW4gaG93IHRoZSBzZXJ2aWNlcyBpbnRlcm9wZXJhdGUuXG4gICAgICAvLyBUT0RPIGZpeCB0aGUgY2F1c2luZyBidWdcbiAgICAgIHVybCA9IHVybC5yZXBsYWNlKCdwbHVnaW5zYXBwJywgJ3BsdWdpbnMvYXBwJyk7XG4gICAgICByZXN1bHQgPSBhd2FpdCBwcm9jZXNzSnNvblJlc3BvbnNlKGZldGNoKHVybCkpO1xuICAgIH1cblxuICAgIC8vIFNldCBpbWcgcHJvcGVydGllcy5cbiAgICBjb25zdCBpbWcgPSBhd2FpdCBzZXRJbWFnZVByb3BlcnRpZXMocmVzdWx0LCBtbWwsIFByb3BlcnRpZXMud2lyaXNlZGl0b3JtYXRobWxhdHRyaWJ1dGUpO1xuICAgIC8vIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoZGF0YS5yZXN1bHQuY29udGVudCk7XG5cbiAgICAvLyBSZXBsYWNlIHRoZSBNYXRoTUwgZm9yIHRoZSBnZW5lcmF0ZWQgZm9ybXVsYSBpbWFnZS5cbiAgICBtYXRoRWxlbWVudC5wYXJlbnROb2RlPy5yZXBsYWNlQ2hpbGQoaW1nLCBtYXRoRWxlbWVudCk7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBpbWFnZSBmb3JtdWxhIGNvbnRhaW5pbmcgYWxsIE1hdGhUeXBlIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge0Zvcm11bGFEYXRhfSBkYXRhIC0gT2JqZWN0IGNvbnRhaW5pbmcgaW1hZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtzdHJpbmd9IG1tbCAtIFRoZSBNYXRoTUwgb2YgdGhlIGZvcm11bGEgaW1hZ2UgYmVlaW5nIGNyZWF0ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gd2lyaXNlZGl0b3JtYXRobWxhdHRyaWJ1dGUgLSBUaGUgbmFtZSBvZiB0aGUgSFRNTCBhdHRyaWJ1dGUgdG8gc3RvcmUgdGhlIE1hdGhNTCBpbi5cbiAqIEByZXR1cm5zIHtQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+fSAtIEZvcm11bGEgaW1hZ2UuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNldEltYWdlUHJvcGVydGllcyhkYXRhOiBGb3JtdWxhRGF0YSwgbW1sOiBzdHJpbmcsIHdpcmlzZWRpdG9ybWF0aG1sYXR0cmlidXRlOiBzdHJpbmcpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcblxuICAvLyBDcmVhdGUgaW1hZyBlbGVtZW50LlxuICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgLy8gU2V0IGltYWdlIHNyYy4gRW5jb2RlIHRoZSByZXN1bHQgc3ZnLlxuICBpbWcuc3JjID0gYGRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0ZjgsJHtlbmNvZGVVUklDb21wb25lbnQoZGF0YS5jb250ZW50KX1gO1xuXG4gIC8vIFNldCBvdGhlciBpbWFnZSBwcm9wZXJ0aWVzLlxuICBpbWcuc2V0QXR0cmlidXRlKHdpcmlzZWRpdG9ybWF0aG1sYXR0cmlidXRlLCBtbWwpO1xuICBpbWcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdXaXJpc2Zvcm11bGEnKTtcbiAgaW1nLnNldEF0dHJpYnV0ZSgncm9sZScsICdtYXRoJyk7XG5cbiAgLy8gSWYgdGhlIHJlbmRlciByZXR1cm5zIGRpbWVuc2lvbnMgcHJvcGVydGllcywgc2V0IHRoZW0gdG8gdGhlIGltYWdlLlxuICBpZiAoK2RhdGEuaGVpZ2h0ID4gMCkge1xuICAgIGltZy5zdHlsZS52ZXJ0aWNhbEFsaWduID0gXCItXCIgKyAoK2RhdGEuaGVpZ2h0IC0gK2RhdGEuYmFzZWxpbmUpICsgXCJweFwiO1xuICAgIGltZy5oZWlnaHQgPSArZGF0YS5oZWlnaHQ7XG4gICAgaW1nLndpZHRoID0gK2RhdGEud2lkdGg7XG4gIH1cblxuICAvLyBTZXQgdGhlIGFsdCB0ZXh0LlxuICBjb25zdCB7IHRleHQgfSA9IGF3YWl0IG1hdGhtbDJhY2Nlc3NpYmxlKG1tbCwgUHJvcGVydGllcy5sYW5nLCBQcm9wZXJ0aWVzLmVkaXRvclNlcnZpY2VzUm9vdCwgUHJvcGVydGllcy5lZGl0b3JTZXJ2aWNlc0V4dGVuc2lvbik7XG4gIGltZy5hbHQgPSB0ZXh0O1xuXG4gIHJldHVybiBpbWc7XG5cbn1cbiIsImltcG9ydCB7IGNvbmZpZ3VyYXRpb25Kc29uLCBTdGF0dXNFcnJvciB9IGZyb20gJy4vc2VydmljZXMnO1xuXG4vLyBIZWxwZXIgdHlwZXMgZm9yIENvbmZpZyBiZWxvd1xudHlwZSBWaWV3ZXIgPSAnaW1hZ2UnIHwgJ25vbmUnO1xudHlwZSBXaXJpc3BsdWdpbnBlcmZvcm1hbmNlID0gJ3RydWUnIHwgJ2ZhbHNlJztcblxuLyoqXG4gKiBUeXBlIHJlcHJlc2VudGluZyBhbGwgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSB2aWV3ZXIuXG4gKi9cbmV4cG9ydCB0eXBlIENvbmZpZyA9IHtcbiAgZWRpdG9yU2VydmljZXNSb290Pzogc3RyaW5nLFxuICBlZGl0b3JTZXJ2aWNlc0V4dGVuc2lvbj86IHN0cmluZyxcbiAgYmFja2VuZENvbmZpZz86IHtcbiAgICB3aXJpc3BsdWdpbnBlcmZvcm1hbmNlPzogV2lyaXNwbHVnaW5wZXJmb3JtYW5jZSxcbiAgICB3aXJpc2VkaXRvcm1hdGhtbGF0dHJpYnV0ZT86IHN0cmluZyxcbiAgfSxcbiAgZHBpPzogbnVtYmVyLFxuICBlbGVtZW50Pzogc3RyaW5nLFxuICBsYW5nPzogc3RyaW5nLFxuICB2aWV3ZXI/OiBWaWV3ZXIsXG4gIHpvb20/OiBudW1iZXIsXG59O1xuXG4vKipcbiAqIEZhbGxiYWNrIHZhbHVlcyBmb3IgdGhlIGNvbmZpZ3VyYXRpb25zIHRoYXQgYXJlIG5vdCBzZXQuXG4gKi9cbmNvbnN0IGRlZmF1bHRWYWx1ZXM6IENvbmZpZyA9IHtcbiAgZWRpdG9yU2VydmljZXNSb290OiAnaHR0cHM6Ly93d3cud2lyaXMubmV0L2RlbW8vcGx1Z2lucy9hcHAvJyxcbiAgZWRpdG9yU2VydmljZXNFeHRlbnNpb246ICcnLFxuICBiYWNrZW5kQ29uZmlnOiB7XG4gICAgd2lyaXNwbHVnaW5wZXJmb3JtYW5jZTogJ3RydWUnLFxuICAgIHdpcmlzZWRpdG9ybWF0aG1sYXR0cmlidXRlOiAnZGF0YS1tYXRobWwnXG4gIH0sXG4gIGRwaTogOTYsXG4gIGVsZW1lbnQ6ICdib2R5JyxcbiAgbGFuZzogJ2VuJyxcbiAgdmlld2VyOiAnbm9uZScsXG4gIHpvb206IDEsXG59XG5cbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGhhbmRsZSB0aGUgcGFyYW1ldGVycyBkZWZpbmVkIGJ5IHRoZSB1c2VyLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUHJvcGVydGllcyB7XG5cbiAgc3RhdGljIHJlbmRlcjogKCkgPT4gUHJvbWlzZTx2b2lkPiA9IGFzeW5jICgpID0+IHt9O1xuXG4gIC8vIEZsYWcgZm9yIHRoZSBzdGF0aWMgcGFyYW1ldGVycyB0aGF0IGFjY2VzcyB0aGUgYmFja2VuZC5cbiAgcHJpdmF0ZSBzdGF0aWMgYmFja2VuZE9idGFpbmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgd2FpdEZvckJhY2tlbmQoKSB7XG4gICAgd2hpbGUgKCF0aGlzLmJhY2tlbmRPYnRhaW5lZCk7XG4gIH1cblxuICAvLyBHZXQgVVJMIHByb3BlcnRpZXMgKHJldHJvY29tcGF0aWJpbGl0eSkuXG4gIHN0YXRpYyBjb25maWc6IENvbmZpZyA9IGRlZmF1bHRWYWx1ZXM7XG4gIHN0YXRpYyB7XG5cbiAgICAvLyBHZXQgVVJMIHBhcmFtZXRlcnMgZnJvbSA8c2NyaXB0PlxuICAgIGNvbnN0IHBsdWdpbk5hbWUgPSAnV0lSSVNwbHVnaW5zLmpzJztcbiAgICBjb25zdCBzY3JpcHQ6IEhUTUxTY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyYyo9XCIke3BsdWdpbk5hbWV9XCJdYCk7XG5cbiAgICBpZiAoISFzY3JpcHQpIHtcblxuICAgICAgY29uc3QgcGx1Z2luTmFtZVBvc2l0aW9uOiBudW1iZXIgPSBzY3JpcHQuc3JjLmxhc3RJbmRleE9mKHBsdWdpbk5hbWUpO1xuICAgICAgY29uc3QgcGFyYW1zOiBzdHJpbmcgPSBzY3JpcHQuc3JjLnN1YnN0cmluZyhwbHVnaW5OYW1lUG9zaXRpb24gKyBwbHVnaW5OYW1lLmxlbmd0aCk7XG4gICAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtcyk7XG5cbiAgICAgIGlmICh1cmxQYXJhbXMuZ2V0KCdkcGknKSAhPT0gbnVsbCAmJiB1cmxQYXJhbXMuZ2V0KCdkcGknKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRwaSA9ICt1cmxQYXJhbXMuZ2V0KCdkcGknKTtcbiAgICAgIH1cbiAgICAgIGlmICh1cmxQYXJhbXMuZ2V0KCdlbGVtZW50JykgIT09IG51bGwgJiYgdXJsUGFyYW1zLmdldCgnZWxlbWVudCcpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb25maWcuZWxlbWVudCA9IHVybFBhcmFtcy5nZXQoJ2VsZW1lbnQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh1cmxQYXJhbXMuZ2V0KCdsYW5nJykgIT09IG51bGwgJiYgdXJsUGFyYW1zLmdldCgnbGFuZycpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb25maWcubGFuZyA9IHVybFBhcmFtcy5nZXQoJ2xhbmcnKTtcbiAgICAgIH1cbiAgICAgIGlmICh1cmxQYXJhbXMuZ2V0KCd2aWV3ZXInKSAhPT0gbnVsbCAmJiB1cmxQYXJhbXMuZ2V0KCd2aWV3ZXInKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnZpZXdlciA9ICh1cmxQYXJhbXMuZ2V0KCd2aWV3ZXInKSBhcyBWaWV3ZXIpO1xuICAgICAgfVxuICAgICAgaWYgKHVybFBhcmFtcy5nZXQoJ3pvb20nKSAhPT0gbnVsbCAmJiB1cmxQYXJhbXMuZ2V0KCd6b29tJykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmNvbmZpZy56b29tID0gK3VybFBhcmFtcy5nZXQoJ3pvb20nKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIEdldCBiYWNrZW5kIHBhcmFtZXRlcnMgY2FsbGluZyB0aGUgY29uZmlndXJhdGlvbmpzb24gc2VydmljZVxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmNvbmZpZy5iYWNrZW5kQ29uZmlnID0gYXdhaXQgY29uZmlndXJhdGlvbkpzb24oXG4gICAgICAgICAgWyd3aXJpc3BsdWdpbnBlcmZvcm1hbmNlJywgJ3dpcmlzZWRpdG9ybWF0aG1sYXR0cmlidXRlJ10sXG4gICAgICAgICAgUHJvcGVydGllcy5lZGl0b3JTZXJ2aWNlc1Jvb3QsXG4gICAgICAgICAgUHJvcGVydGllcy5lZGl0b3JTZXJ2aWNlc0V4dGVuc2lvbixcbiAgICAgICAgKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN0YXR1c0Vycm9yKSB7XG4gICAgICAgICAgLy8gRG8gbm90aGluZzsgbGVhdmUgZGVmYXVsdCB2YWx1ZXMuXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBTdG9wIGxvb2tpbmcgZm9yIHRoZSBiYWNrZW5kIChldmVuIGlmIHRoZSByZXF1ZXN0IGZhaWxzKVxuICAgICAgICB0aGlzLmJhY2tlbmRPYnRhaW5lZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY29uZmlnIHZhbHVlcyBtYW51YWxseS5cbiAgICovXG4gIHN0YXRpYyBpbml0KGNvbmZpZzogQ29uZmlnKSB7XG4gICAgUHJvcGVydGllcy5jb25maWcgPSB7Li4uZGVmYXVsdFZhbHVlcywgLi4uY29uZmlnfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZWRpdG9yU2VydmljZXNSb290KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmVkaXRvclNlcnZpY2VzUm9vdCB8fFxuICAgICAgZGVmYXVsdFZhbHVlcy5lZGl0b3JTZXJ2aWNlc1Jvb3Q7XG4gIH1cblxuICBzdGF0aWMgc2V0IGVkaXRvclNlcnZpY2VzUm9vdChlZGl0b3JTZXJ2aWNlc1Jvb3Q6IHN0cmluZykge1xuICAgIHRoaXMuY29uZmlnLmVkaXRvclNlcnZpY2VzUm9vdCA9IGVkaXRvclNlcnZpY2VzUm9vdDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgc3RhdGljIGdldCBlZGl0b3JTZXJ2aWNlc0V4dGVuc2lvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5lZGl0b3JTZXJ2aWNlc0V4dGVuc2lvbiB8fFxuICAgICAgZGVmYXVsdFZhbHVlcy5lZGl0b3JTZXJ2aWNlc0V4dGVuc2lvbjtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgZWRpdG9yU2VydmljZXNFeHRlbnNpb24oZWRpdG9yU2VydmljZXNFeHRlbnNpb246IHN0cmluZykge1xuICAgIHRoaXMuY29uZmlnLmVkaXRvclNlcnZpY2VzRXh0ZW5zaW9uID0gZWRpdG9yU2VydmljZXNFeHRlbnNpb247XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGxhbmd1YWdlLlxuICAgKiBJbiBvcmRlciBvZiBwcmlvcml0eSwgdGhlIGZpcnN0IG9mIHRoZSBmb2xsb3dpbmcgdGhhdCBpcyBzZXQgaXMgcmV0dXJuZWQ6XG4gICAqIC0gVGhlIGxhbmcgcGFyYW1ldGVyIHNldCBpbiB0aGUgPHNjcmlwdD4gKFdJUklTcGx1Z2luLmpzP2xhbmc9Li4uKVxuICAgKiAtIFRoZSBIVE1MIGRvY3VtZW50IGxhbmd1YWdlICg8aHRtbCBsYW5nPS4uLj4pLlxuICAgKiAtIFRoZSBsYW5ndWFnZSBvZiB0aGUgYnJvd3Nlci5cbiAgICogLSBFbmdsaXNoLCBieSBkZWZhdWx0LlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBFbmNvZGVkIGxhbmd1YWdlIHN0cmluZy5cbiAgICovXG4gIHN0YXRpYyBnZXQgbGFuZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbmZpZ0xhbmcgPSAodGhpcy5jb25maWcubGFuZyA9PT0gJ2luaGVyaXQnKSA/IG51bGwgOiB0aGlzLmNvbmZpZy5sYW5nO1xuICAgIHJldHVybiBjb25maWdMYW5nIHx8XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLmxhbmcgfHxcbiAgICAgIG5hdmlnYXRvci5sYW5ndWFnZSB8fFxuICAgICAgZGVmYXVsdFZhbHVlcy5sYW5nO1xuICB9XG5cbiAgc3RhdGljIHNldCBsYW5nKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMuY29uZmlnLmxhbmcgPSBsYW5nO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSB2aWV3ZXIgbW9kZSBmb3IgdGhlIE1hdGhNTC5cbiAgICogSW4gb3JkZXIgb2YgcHJpb3JpdHksIHRoZSBmaXJzdCBvZiB0aGUgZm9sbG93aW5nIHRoYXQgaXMgc2V0IGlzIHJldHVybmVkOlxuICAgKiAtIFRoZSB2aWV3ZXIgcGFyYW1ldGVyIHNldCBpbiB0aGUgPHNjcmlwdD4gKFdJUklTcGx1Z2luLmpzP3ZpZXdlcj0uLi4pXG4gICAqIC0gbm9uZSwgYnkgZGVmYXVsdC5cbiAgICovXG4gIHN0YXRpYyBnZXQgdmlld2VyKCk6IFZpZXdlciB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnZpZXdlciB8fFxuICAgICAgZGVmYXVsdFZhbHVlcy52aWV3ZXI7XG4gIH1cblxuICBzdGF0aWMgc2V0IHZpZXdlcih2aWV3ZXI6IFZpZXdlcikge1xuICAgIHRoaXMuY29uZmlnLnZpZXdlciA9IHZpZXdlcjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZHBpIG9mIHRoZSBpbWFnZXMuXG4gICAqIEluIG9yZGVyIG9mIHByaW9yaXR5LCB0aGUgZmlyc3Qgb2YgdGhlIGZvbGxvd2luZyB0aGF0IGlzIHNldCBpcyByZXR1cm5lZDpcbiAgICogLSBUaGUgZHBpIHBhcmFtZXRlciBzZXQgaW4gdGhlIDxzY3JpcHQ+IChXSVJJU3BsdWdpbi5qcz9kcGk9Li4uKVxuICAgKiAtIDk2LCBieSBkZWZhdWx0LlxuICAgKi9cbiAgc3RhdGljIGdldCBkcGkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZHBpIHx8XG4gICAgICBkZWZhdWx0VmFsdWVzLmRwaTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgZHBpKGRwaTogbnVtYmVyKSB7XG4gICAgdGhpcy5jb25maWcuZHBpID0gZHBpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSB6b29tIG9mIHRoZSBpbWFnZXMuXG4gICAqIEluIG9yZGVyIG9mIHByaW9yaXR5LCB0aGUgZmlyc3Qgb2YgdGhlIGZvbGxvd2luZyB0aGF0IGlzIHNldCBpcyByZXR1cm5lZDpcbiAgICogLSBUaGUgem9vbSBwYXJhbWV0ZXIgc2V0IGluIHRoZSA8c2NyaXB0PiAoV0lSSVNwbHVnaW4uanM/em9vbT0uLi4pXG4gICAqIC0gMSwgYnkgZGVmYXVsdC5cbiAgICovXG4gIHN0YXRpYyBnZXQgem9vbSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy56b29tIHx8XG4gICAgICBkZWZhdWx0VmFsdWVzLnpvb207XG4gIH1cblxuICBzdGF0aWMgc2V0IHpvb20oem9vbTogbnVtYmVyKSB7XG4gICAgdGhpcy5jb25maWcuem9vbSA9IHpvb207XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGVsZW1lbnQgaW4gd2hpY2ggdG8gcmVuZGVyIGZvcm11bGFzLlxuICAgKiBJbiBvcmRlciBvZiBwcmlvcml0eSwgdGhlIGZpcnN0IG9mIHRoZSBmb2xsb3dpbmcgdGhhdCBpcyBzZXQgaXMgcmV0dXJuZWQ6XG4gICAqIC0gVGhlIHpvb20gcGFyYW1ldGVyIHNldCBpbiB0aGUgPHNjcmlwdD4gKFdJUklTcGx1Z2luLmpzP2VsZW1lbnQ9Li4uKVxuICAgKiAtICdib2R5JywgYnkgZGVmYXVsdC5cbiAgICovXG4gIHN0YXRpYyBnZXQgZWxlbWVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5lbGVtZW50IHx8XG4gICAgICBkZWZhdWx0VmFsdWVzLmVsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgc2V0IGVsZW1lbnQoZWxlbWVudDogc3RyaW5nKSB7XG4gICAgdGhpcy5jb25maWcuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIFdpcmlzIHBsdWdpbiBwZXJmb3JtYW5jZS5cbiAgICogSW4gb3JkZXIgb2YgcHJpb3JpdHksIHRoZSBmaXJzdCBvZiB0aGUgZm9sbG93aW5nIHRoYXQgaXMgc2V0IGlzIHJldHVybmVkOlxuICAgKiAtIFRoZSBiYWNrZW5kIGNvbmZpZ3VyYXRpb24gb2YgdGhlIHBhcmFtZXRlci5cbiAgICogLSB0cnVlLCBieSBkZWZhdWx0LlxuICAgKi9cbiAgc3RhdGljIGdldCB3aXJpc3BsdWdpbnBlcmZvcm1hbmNlKCk6IFdpcmlzcGx1Z2lucGVyZm9ybWFuY2Uge1xuICAgIHRoaXMud2FpdEZvckJhY2tlbmQoKTtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYmFja2VuZENvbmZpZy53aXJpc3BsdWdpbnBlcmZvcm1hbmNlIHx8XG4gICAgICBkZWZhdWx0VmFsdWVzLmJhY2tlbmRDb25maWcud2lyaXNwbHVnaW5wZXJmb3JtYW5jZTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgd2lyaXNwbHVnaW5wZXJmb3JtYW5jZSh3aXJpc3BsdWdpbnBlcmZvcm1hbmNlOiBXaXJpc3BsdWdpbnBlcmZvcm1hbmNlKSB7XG4gICAgdGhpcy5jb25maWcuYmFja2VuZENvbmZpZy53aXJpc3BsdWdpbnBlcmZvcm1hbmNlID0gd2lyaXNwbHVnaW5wZXJmb3JtYW5jZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgV2lyaXMgTWF0aE1MIGF0dHJpYnV0ZS5cbiAgICogSW4gb3JkZXIgb2YgcHJpb3JpdHksIHRoZSBmaXJzdCBvZiB0aGUgZm9sbG93aW5nIHRoYXQgaXMgc2V0IGlzIHJldHVybmVkOlxuICAgKiAtIFRoZSBiYWNrZW5kIGNvbmZpZ3VyYXRpb24gb2YgdGhlIHBhcmFtZXRlci5cbiAgICogLSBkYXRhLW1hdGhtbCwgYnkgZGVmYXVsdC5cbiAgICovXG4gIHN0YXRpYyBnZXQgd2lyaXNlZGl0b3JtYXRobWxhdHRyaWJ1dGUoKTogc3RyaW5nIHtcbiAgICB0aGlzLndhaXRGb3JCYWNrZW5kKCk7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmJhY2tlbmRDb25maWcud2lyaXNlZGl0b3JtYXRobWxhdHRyaWJ1dGUgfHxcbiAgICAgIGRlZmF1bHRWYWx1ZXMuYmFja2VuZENvbmZpZy53aXJpc2VkaXRvcm1hdGhtbGF0dHJpYnV0ZTtcbiAgfVxuXG4gIHN0YXRpYyBzZXQgd2lyaXNlZGl0b3JtYXRobWxhdHRyaWJ1dGUod2lyaXNlZGl0b3JtYXRobWxhdHRyaWJ1dGU6IHN0cmluZykge1xuICAgIHRoaXMuY29uZmlnLmJhY2tlbmRDb25maWcud2lyaXNlZGl0b3JtYXRobWxhdHRyaWJ1dGUgPSB3aXJpc2VkaXRvcm1hdGhtbGF0dHJpYnV0ZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG59XG4iLCJpbXBvcnQgUGFyc2VyIGZyb20gJ0B3aXJpcy9tYXRodHlwZS1odG1sLWludGVncmF0aW9uLWRldmtpdC9zcmMvcGFyc2VyJztcblxuZW51bSBNZXRob2RUeXBlIHtcbiAgUG9zdCA9IFwiUE9TVFwiLFxuICBHZXQgPSBcIkdFVFwiLFxufVxuXG4vKipcbiAqIFRocm93biB3aGVuIGEgc2VydmljZSByZXR1cm5zIGEgSlNPTiB3aXRoIGEgbm9uLW9rIHN0YXR1cyB2YWx1ZSBpbiBpdHMgSlNPTiBib2R5XG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0dXNFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBTdGF0dXNFcnJvci5wcm90b3R5cGUpO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHByb2Nlc3MgcmVzcG9uc2VzIGZyb20gdGhlIGVkaXRvciBzZXJ2aWNlcy5cbiAqIFRoZXNlIHVzdWFsbHkgY29tZSB3cmFwcGVkIGluIGEgSlNPTiB3aXRoIGEgc3RhdHVzIGZpZWxkIHRoYXQgY2FuIGJlIGVpdGhlciBcIm9rXCIgb3IgXCJ3YXJuaW5nXCIuXG4gKiBJZiBzdGF0dXMgaXMgXCJva1wiLCByZXR1cm4gdGhlIHJlc3VsdCB2YWx1ZSBhbG9uZyBpdC4gT3RoZXJ3aXNlLCB0aHJvdyBhIFN0YXR1c0Vycm9yLlxuICogQHBhcmFtIHtQcm9taXNlPFJlc3BvbnNlPn0gcmVzcG9uc2UgLSBUaGUgcmVzcG9uc2UgZ2l2ZW4gYnkgdGhlIHNlcnZpY2UuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBUaGUgdW53cmFwcGVkIHJlc3VsdCBvZiB0aGUgcmVzcG9uc2UsIGlmIHZhbGlkLlxuICogQHRocm93cyB7U3RhdHVzRXJyb3J9IFNlcnZpY2UgcmVzcG9uZGVkIHdpdGggYSBub24tb2sgc3RhdHVzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0pzb25SZXNwb25zZShyZXNwb25zZTogUHJvbWlzZTxSZXNwb25zZT4pOiBQcm9taXNlPGFueT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCByZXN1bHQgfSA9IGF3YWl0IChhd2FpdCByZXNwb25zZSkuanNvbigpO1xuXG4gICAgaWYgKHN0YXR1cyAhPT0gJ29rJykge1xuICAgICAgdGhyb3cgbmV3IFN0YXR1c0Vycm9yKCdTZXJ2aWNlIHJlc3BvbmRlZCB3aXRoIGEgbm9uLW9rIHN0YXR1cycpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gY2F0Y2goZSkge1xuICAgIC8vIFRPRE8gbWFuYWdlIG5ldHdvcmsgYW5kIHN0YXR1cyBub24tb2sgZXJyb3JzXG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGxzIHRoZSBlbmRwb2ludCBzZXJ2aWNlbmFtZSBhbmQgcmV0dXJucyBpdHMgcmVzcG9uc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcXVlcnkgLSBPYmplY3Qgb2YgcGFyYW1ldGVycyB0byBwYXNzIGFzIHRoZSBib2R5IHJlcXVlc3Qgb3Igc2VhcmNoIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VydmljZU5hbWUgLSBOYW1lIG9mIHRoZSBzZXJ2aWNlIHRvIGJlIGNhbGxlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZXJ2ZXJVUkwgLSBVcmwgb2YgdGhlIHNlcnZlciB3aGVyZSB3ZSB3YW50IHRvIGNhbGwgdGhlIHNlcnZpY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXh0ZW5zaW9uIC0gRXh0ZW5zaW9uIHRvIGFkZCB0byB0aGUgZW5kIG9mIHRoZSBzZXJ2aWNlTmFtZSAoaW5jbHVkaW5nIHRoZSBkb3QgaWYgbmVjZXNzYXJ5KS5cbiAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3BvbnNlPn0gVGhlIHJlcXVlc3QgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjYWxsU2VydmljZShxdWVyeTogb2JqZWN0LCBzZXJ2aWNlTmFtZTogc3RyaW5nLCBtZXRob2Q6IE1ldGhvZFR5cGUsIHNlcnZlclVSTDogc3RyaW5nLCBleHRlbnNpb246IHN0cmluZykgOiBQcm9taXNlPGFueT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoc2VydmljZU5hbWUgKyBleHRlbnNpb24sIHNlcnZlclVSTCk7XG4gICAgY29uc3QgaW5pdDogUmVxdWVzdEluaXQgPSB7XG4gICAgICBtZXRob2QsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGlmIChtZXRob2QgPT09IE1ldGhvZFR5cGUuR2V0KSB7XG4gICAgICAvLyBBZGQgdGhlIHF1ZXJ5IGFzIHNlYXJjaCBwYXJhbXNcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHF1ZXJ5KSkge1xuICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQWRkIHRoZSBxdWVyeSBhcyB0aGUgYm9keSBvZiB0aGUgcmVxdWVzdFxuICAgICAgaW5pdC5ib2R5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7Li4ucXVlcnl9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmV0Y2godXJsLnRvU3RyaW5nKCksIGluaXQpO1xuICB9IGNhdGNoKGUpIHtcbiAgICAvLyBUT0RPIG1hbmFnZSBuZXR3b3JrIGFuZCBzdGF0dXMgbm9uLW9rIGVycm9yc1xuICAgIHRocm93IGU7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhbHQgdGV4dCBvZiB0aGUgTWF0aE1MIHBhc3NlZCBhcyBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW1sIC0gTWF0aE1MIHRvIGJlIHRyYW5zZm9ybWVkIGludG8gYWx0IHRleHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZyAtIExhbmd1YWdlIG9mIHRoZSBhY2Nlc3NpYmxlIHRleHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVVJMIG9mIHRoZSBzZXJ2ZXIgd2hlcmUgd2Ugd2FudCB0byBjYWxsIHRoZSBzZXJ2aWNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGV4dGVuc2lvbiAtIEV4dGVuc2lvbiB0byBhZGQgdG8gdGhlIGVuZCBvZiB0aGUgc2VydmljZU5hbWUgKGluY2x1ZGluZyB0aGUgZG90IGlmIG5lY2Vzc2FyeSkuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59IFRoZSBtYXRobWwyYWNjZXNzaWJsZSBzZXJ2aWNlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWF0aG1sMmFjY2Vzc2libGUobW1sOiBzdHJpbmcsIGxhbmc6IHN0cmluZywgdXJsOiBzdHJpbmcsIGV4dGVuc2lvbjogc3RyaW5nKSA6IFByb21pc2U8YW55PiB7XG4gIC8vIFNldCB0aGUgbmVlZGVkIHBhcmFtcyB0byByZXRyaWV2ZSB0aGUgYWx0IHRleHQuXG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAnc2VydmljZSc6ICdtYXRobWwyYWNjZXNzaWJsZScsXG4gICAgJ21tbCc6IG1tbCxcbiAgICAnbWV0cmljcyc6ICd0cnVlJyxcbiAgICAnY2VudGVyYmFzZWxpbmUnOiAnZmFsc2UnLFxuICAgICdsYW5nJzogbGFuZyxcbiAgICAnaWdub3JlU3R5bGVzJzogJ3RydWUnLFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBjYWxsU2VydmljZShwYXJhbXMsICdzZXJ2aWNlJywgTWV0aG9kVHlwZS5Qb3N0LCB1cmwsIGV4dGVuc2lvbik7XG4gIHJldHVybiBwcm9jZXNzSnNvblJlc3BvbnNlKHJlc3BvbnNlKTtcbn1cblxuLyoqXG4gKiBDYWxscyB0aGUgc2hvd0ltYWdlIHNlcnZpY2Ugd2l0aCB0aGUgZ2l2ZW4gTWF0aE1MIGFuZCByZXR1cm5zIHRoZSByZWNlaXZlZCBSZXNwb25zZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gbW1sIC0gTWF0aE1MIHRvIHJlbmRlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIC0gTGFuZ3VhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVVJMIG9mIHRoZSBzZXJ2ZXIgd2hlcmUgd2Ugd2FudCB0byBjYWxsIHRoZSBzZXJ2aWNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGV4dGVuc2lvbiAtIEV4dGVuc2lvbiB0byBhZGQgdG8gdGhlIGVuZCBvZiB0aGUgc2VydmljZU5hbWUgKGluY2x1ZGluZyB0aGUgZG90IGlmIG5lY2Vzc2FyeSkuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59IHRoZSBSZXNwb25zZSBvYmplY3QgdG8gdGhlIHBldGl0aW9uIG1hZGUgdG8gc2hvd0ltYWdlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaG93SW1hZ2UobW1sOiBzdHJpbmcsIGxhbmc6IHN0cmluZywgdXJsOiBzdHJpbmcsIGV4dGVuc2lvbjogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgICdtbWwnOiBtbWwsXG4gICAgJ21ldHJpY3MnOiAndHJ1ZScsXG4gICAgJ2NlbnRlcmJhc2VsaW5lJzogJ2ZhbHNlJyxcbiAgICAnbGFuZyc6bGFuZyxcbiAgfVxuXG4gIC8vIFRyeSB0byBvYnRhaW4gdGhlIGltYWdlIHZpYSBHRVRcbiAgY29uc3QgZ2V0UGFyYW1zID0gUGFyc2VyLmNyZWF0ZVNob3dJbWFnZVNyY0RhdGEoeyBtbWwgfSwgbGFuZyk7XG4gIGNvbnN0IGdldFJlc3BvbnNlID0gY2FsbFNlcnZpY2UoZ2V0UGFyYW1zLCAnc2hvd2ltYWdlJywgTWV0aG9kVHlwZS5HZXQsIHVybCwgZXh0ZW5zaW9uKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgcHJvY2Vzc0pzb25SZXNwb25zZShnZXRSZXNwb25zZSk7XG4gIH0gY2F0Y2goZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgU3RhdHVzRXJyb3IpIHtcbiAgICAgIC8vIEZvcm11bGEgd2FzIG5vdCBpbiBjYWNoZTsgcHJvY2VlZCB3aXRoIGNhbGxpbmcgc2hvd2ltYWdlIHZpYSBQT1NUXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgLy8gSWYgR0VUIHJlcXVlc3QgZmFpbHMsIGl0IG1lYW5zIHRoYXQgdGhlIGZvcm11bGEgd2FzIG5vdCBpbiBjYWNoZS4gUHJvY2VlZCB3aXRoIFBPU1Q6XG4gIGNvbnN0IHJlc3BvbnNlID0gY2FsbFNlcnZpY2UocGFyYW1zLCAnc2hvd2ltYWdlJywgTWV0aG9kVHlwZS5Qb3N0LCB1cmwsIGV4dGVuc2lvbik7XG4gIHJldHVybiBwcm9jZXNzSnNvblJlc3BvbnNlKHJlc3BvbnNlKTtcblxufTtcblxuLyoqXG4gKiBDYWxscyB0aGUgY3JlYXRlSW1hZ2Ugc2VydmljZSB3aXRoIHRoZSBnaXZlbiBNYXRoTUwgYW5kIHJldHVybnMgdGhlIHJlY2VpdmVkIFJlc3BvbnNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtbWwgLSBNYXRoTUwgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZyAtIExhbmd1YWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFVSTCBvZiB0aGUgc2VydmVyIHdoZXJlIHdlIHdhbnQgdG8gY2FsbCB0aGUgc2VydmljZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleHRlbnNpb24gLSBFeHRlbnNpb24gdG8gYWRkIHRvIHRoZSBlbmQgb2YgdGhlIHNlcnZpY2VOYW1lIChpbmNsdWRpbmcgdGhlIGRvdCBpZiBuZWNlc3NhcnkpLlxuICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fSB0aGUgUmVzcG9uc2Ugb2JqZWN0IHRvIHRoZSBwZXRpdGlvbiBtYWRlIHRvIHNob3dJbWFnZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlSW1hZ2UobW1sOiBzdHJpbmcsIGxhbmc6IHN0cmluZywgdXJsOiBzdHJpbmcsIGV4dGVuc2lvbjogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgICdtbWwnOiBtbWwsXG4gICAgJ21ldHJpY3MnOiAndHJ1ZScsXG4gICAgJ2NlbnRlcmJhc2VsaW5lJzogJ2ZhbHNlJyxcbiAgICAnbGFuZyc6IGxhbmcsXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGNhbGxTZXJ2aWNlKHBhcmFtcywgJ2NyZWF0ZWltYWdlJywgTWV0aG9kVHlwZS5HZXQsIHVybCwgZXh0ZW5zaW9uKTtcbiAgcmV0dXJuIChhd2FpdCByZXNwb25zZSkudGV4dCgpO1xufTtcblxuLyoqXG4gKiBDYWxscyB0aGUgbGF0ZXgybWF0aG1sIHNlcnZpY2Ugd2l0aCB0aGUgZ2l2ZW4gTGFUZVggYW5kIHJldHVybnMgdGhlIHJlY2VpdmVkIFJlc3BvbnNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsYXRleCAtIExhVGVYIHRvIHJlbmRlclxuICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFVybCBvZiB0aGUgc2VydmVyIHdoZXJlIHdlIHdhbnQgdG8gY2FsbCB0aGUgc2VydmljZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBleHRlbnNpb24gLSBFeHRlbnNpb24gdG8gYWRkIHRvIHRoZSBlbmQgb2YgdGhlIHNlcnZpY2VOYW1lIChpbmNsdWRpbmcgdGhlIGRvdCBpZiBuZWNlc3NhcnkpLlxuICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fSB0aGUgUmVzcG9uc2Ugb2JqZWN0IHRvIHRoZSBwZXRpdGlvbiBtYWRlIHRvIHNlcnZpY2VcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxhdGV4VG9NYXRobWwobGF0ZXg6IHN0cmluZywgdXJsOiBzdHJpbmcsIGV4dGVuc2lvbjogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgICdzZXJ2aWNlJzogJ2xhdGV4Mm1hdGhtbCcsXG4gICAgJ2xhdGV4JzogbGF0ZXgsXG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGNhbGxTZXJ2aWNlKHBhcmFtcywgJ3NlcnZpY2UnLCBNZXRob2RUeXBlLlBvc3QsIHVybCwgZXh0ZW5zaW9uKTtcbiAgcmV0dXJuIHByb2Nlc3NKc29uUmVzcG9uc2UocmVzcG9uc2UpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgYmFja2VuZC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHZhcmlhYmxla2V5cyAtIExpc3Qgb2YgdGhlIGtleSBuYW1lcyBvZiB0aGUgdmFyaWFibGVzIHRvIGZldGNoLlxuICogQHBhcmFtIHtzdHJpbmd9IGV4dGVuc2lvbiAtIEV4dGVuc2lvbiB0byBhZGQgdG8gdGhlIGVuZCBvZiB0aGUgc2VydmljZU5hbWUgKGluY2x1ZGluZyB0aGUgZG90IGlmIG5lY2Vzc2FyeSkuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxSZXNwb25zZT59IFRoZSBjb25maWd1cmF0aW9uanNvbiBzZXJ2aWNlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29uZmlndXJhdGlvbkpzb24odmFyaWFibGVrZXlzOiBzdHJpbmdbXSwgdXJsOiBzdHJpbmcsIGV4dGVuc2lvbjogc3RyaW5nKSA6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAndmFyaWFibGVrZXlzJzogdmFyaWFibGVrZXlzLmpvaW4oJywnKSxcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gY2FsbFNlcnZpY2UocGFyYW1zLCAnY29uZmlndXJhdGlvbmpzb24nLCBNZXRob2RUeXBlLkdldCwgdXJsLCBleHRlbnNpb24pO1xuICByZXR1cm4gcHJvY2Vzc0pzb25SZXNwb25zZShyZXNwb25zZSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9