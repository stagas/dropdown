
/*!
 *
 * Dropdown
 *
 * MIT
 *
 */

/**
 * Module dependencies.
 */

var o = require('jquery')
var inherit = require('inherit')
var viewport = require('viewport')
var Menu = require('menu')

/**
 * Exports.
 */

module.exports = Dropdown

/**
 * Dropdown class.
 *
 * @api public
 */

function Dropdown (ref) {
  if (!(this instanceof Dropdown)) return new Dropdown(ref)
  Menu.call(this, this.dropdown)

  this.el.addClass('dropdown')
  this.ref = o(ref)
  this.bindRefEvents()
  this.reposition()
}

/**
 * Inherit from Menu.
 */

inherit(Dropdown, Menu)

/**
 * Bind reference element event handlers.
 *
 * @api private
 */

Dropdown.prototype.bindRefEvents = function () {
  var self = this

  var noShow = false

  function onfocusRef (ev) {
    ev.preventDefault()
    ev.stopPropagation()

    if (!noShow) self.show()
    noShow = false
  }

  function onclickRef (ev) {
    onfocusRef(ev)
  }

  function onblurRef (ev) {
    if (!self.isSelecting()) {
      setTimeout(function () {
        self.hide()
      }, 0)
    }
  }

  function onkeydownRef (ev) {
    switch (ev.which) {
      case 9: // tab
        self.hide()
      break

      case 39:
        ev.stopPropagation()
      break

      case 27:
        if (!self.isOpen()) this.blur()
      break

      default:
        self._isSelecting = true
        self.show()
      break
    }
  }

  function onmouseupRef (ev) {
    self.toggle()
  }

  function onkeydownEl (ev) {
    if (37 === ev.which) {
      noShow = true
    }
    self.ref[0].focus()
  }

  function onmouseupBody (ev) {
    ev.preventDefault()
    ev.stopPropagation()
  }

  this.ref.on('keydown', onkeydownRef)
  this.ref.on('mouseup', onmouseupRef)
  this.ref.on('focus', onfocusRef)
  this.ref.on('click', onclickRef)
  this.ref.on('blur', onblurRef)

  this.on('show', function () {
    this.reposition()
    this.el.on('keydown', onkeydownEl)
  })

  this.on('hide', function () {
    this.el.off('keydown', onkeydownEl)
  })

  this.unbindRefEvents = function () {
    this.ref.off('focus', onfocusRef)
    this.ref.off('click', onclickRef)
    this.ref.off('blur', onblurRef)
    this.ref.off('keydown', onkeydownRef)
    this.ref.off('mouseup', onmouseupRef)
  }.bind(this)
}

/**
 * Reposition dropdown relative to reference
 * element.
 *
 * @api private
 */

Dropdown.prototype.reposition = function () {
  var offset = this.ref[0].getBoundingClientRect()
  var x = offset.left
  var y = offset.top+offset.height+viewport.top
  var w = offset.width
  this.moveTo(x, y)
  this.el.css({
    maxWidth: w
  , minWidth: w
  , width: w
  })
}
