/**
 * Constant for mix() function.
 */
const LSNM_MIXED = [undefined,
  `k`,
  `M`,
  `B`,
  `T`,
  `Qd`,
  `Qt`,
  `Sx`,
  `Sp`,
  `Oc`
]

/**
 * LSnum Class.
 */
class LSNM {
  constructor(num = 0) {
    if (num instanceof LSNM)
      this.l = num.l

    if (typeof num == "string") {
      var indexE = num.indexOf("e")

      if (indexE == -1)
        this.l = Math.log10(num)
      else if (indexE == 0)
        this.l = Number(num.substring(1))
      else
        this.l = Math.log10(num.substring(0, indexE)) + Number(num.substring(indexE + 1))
    }
    else if (typeof num == "number")
      this.l = Math.log10(num)
  }

  /**
   * Adds a number to X.
   * @param {number | string} x Addend.
   */
  add(x) {
    var ret = new LSNM(this)
    x = new LSNM(x)
    var expDiff = ret.l - x.l
    if (expDiff >= 15 || x.l == -Infinity)
      return ret
    if (expDiff <= -15 || ret.l == -Infinity)
      return x
    ret.l = x.l + Math.log10(1 + Math.pow(10, expDiff))
    return ret
  }

  /**
   * Subtracts a number from X.
   * @param {number | string} x Subtrahend.
   */
  sub(x) {
    var ret = new LSNM(this)
    x = new LSNM(x)
    var expDiff = ret.l - x.l
    if (expDiff < 0) {
      ret.l = -Infinity
      return ret
    }
    if (expDiff >= 15 || x.l == -Infinity)
      return ret
    ret.l = ret.l + Math.log10(1 - Math.pow(10, -expDiff))
    return ret
  }

  /**
   * Multiplies a number by X.
   * @param {number | string} x Multiplier.
   */
  mul(x) {
    var ret = new LSNM(this)
    x = new LSNM(x)
    ret.l = ret.l + x.l
    return ret
  }

  /**
   * Divides a number by X.
   * @param {number | string} x Divider.
   */
  div(x) {
    var ret = new LSNM(this)
    x = new LSNM(x)
    ret.l = ret.l - x.l
    return ret
  }

  /**
   * Raises a number to the Xth power.
   * @param {number | string} x Power.
   */
  pow(x) {
    var ret = new LSNM(this)
    x = new LSNM(x)
    ret.l = ret.l * Math.pow(10, x.l)
    return ret
  }

  /**
   * Takes the Xth root of a number.
   * @param {number | string} x Root.
   */
  root(x) {
    var ret = new LSNM(this)
    x = new LSNM(x)
    ret.l = ret.l / Math.pow(10, x.l)
    return ret
  }

  /**
   * Takes the base X logarithm of a number.
   * @param {number | string} x Base of the logarithm.
   */
  log(x) {
    var ret = new LSNM(this)
    x = new LSNM(x)
    ret.l = ret.l / x.l
    return new LSNM(Math.max(ret.l, 0))
  }

  /**
   * Rounds a number down.
   */
  floor() {
    var ret = new LSNM(this)
    if (ret.l < 15)
      ret.l = Math.log10(Math.floor(Math.pow(10, ret.l)))
    return ret
  }

  /**
   * Rounds a number up.
   */
  ceil() {
    var ret = new LSNM(this)
    if (ret.l < 15)
      ret.l = Math.log10(Math.ceil(Math.pow(10, ret.l)))
    return ret
  }

  /**
   * Removes any decimal places from a number.
   */
  trunc() {
    var ret = new LSNM(this)
    if (ret.l < 15)
      ret.l = Math.log10(Math.trunc(Math.pow(10, ret.l)))
    return ret
  }

  /**
   * Returns the number rounded to the nearest integer.
   */
  round() {
    var ret = new LSNM(this)
    if (ret.l < 15)
      ret.l = Math.log10(Math.round(Math.pow(10, ret.l)))
    return ret
  }

  /**
   * Returns the number formatted to X decimal places.
   * @param {number | string} x Amount of decimal places.
   */
  toFixed(x) {
    if (this.l < -x - 1)
      return (0).toFixed(x)
    if (this.l == Infinity)
      return "Infinity"
    if (this.l >= 1e21)
      return "e" + this.l
    if (this.l >= 21)
      return (Math.pow(10, this.l - Math.trunc(this.l)).toFixed(x) + "e" + Math.trunc(this.l))
    return Math.pow(10, this.l).toFixed(x)
  }

  /**
   * Converts a number into a regular number.
   */
  toNumber() {
    return Math.pow(10, this.l)
  }

  /**
   * Returns the smallest between a number and X.
   * @param {number | string} x Value to compare.
   */
  min(x) {
    var ret = new LSNM(this)
    x = new LSNM(x)
    ret.l = Math.min(ret.l, x.l)
    return ret
  }

  /**
   * Returns the largest between a number and X.
   * @param {number | string} x Value to compare.
   */
  max(x) {
    var ret = new LSNM(this)
    x = new LSNM(x)
    ret.l = Math.max(ret.l, x.l)
    return ret
  }

  /**
   * Compares if the number is less than X.
   * Returns a boolean.
   * @param {number | string} x Value to compare.
   * @returns boolean
   */
  lt(x) {
    x = new LSNM(x)
    return this.l * 1e-310 < x.l * 1e-310
  }

  /**
   * Compares if the number is less than or equal to X.
   * Returns a boolean.
   * @param {number | string} x Value to compare.
   * @returns boolean
   */
  lte(x) {
    x = new LSNM(x)
    return this.l * 1e-310 <= x.l * 1e-310
  }

  /**
   * Compares if the number is equal to X.
   * Returns a boolean.
   * @param {number | string} x Value to compare.
   * @returns boolean
   */
  eq(x) {
    x = new LSNM(x)
    return this.l * 1e-310 == x.l * 1e-310
  }

  /**
   * Compares if the number is greater than X.
   * Returns a boolean.
   * @param {number | string} x Value to compare.
   * @returns boolean
   */
  gt(x) {
    x = new LSNM(x)
    return this.l * 1e-310 > x.l * 1e-310
  }

  /**
   * Compares if the number is greater than or equal to X.
   * Returns a boolean.
   * @param {number | string} x Value to compare.
   * @returns boolean
   */
  gte(x) {
    x = new LSNM(x)
    return this.l * 1e-310 >= x.l * 1e-310
  }

  /**
   * Softcaps a number.
   * @param {number | string} start When to start the softcap.
   * @param {number} power How strong the softcap is, from 0 to 1.
   */
  softcap(start, power) {
    power = 1 / power
    start = new LSNM(start)
    if (this.l < start.l)
      return this
    return this.div(this.root(power)).mul(start.root(power))
  }

  /**
   * Returns the exponent of the number.
   */
  get e() {
    if (this.l == -Infinity)
      return 0
    return Math.trunc(this.l)
  }

  /**
   * Returns the mantissa of the number.
   */
  get m() {
    if (this.l == -Infinity)
      return 0
    return Math.pow(10, this.l - Math.trunc(this.l))
  }

  /**
   * Converts a number into a String.
   */
  toString() {
    return this.m + "e" + this.e
  }

  /**
   * Converts a number into JSON format.
   */
  toJSON() {
    return this.toString()
  }
}

/**
 * Formats a number into Scientific Notation.
 * @param {LSNM} x Number to be formatted.
 * @param {number} places Amount of decimal places before 1e3.
 * @param {number} placesOverE3 Amount of decimal places after 1e3.
 */
function sci(x, places = 2, placesOverE3 = 2) {
  x = new LSNM(x)
  if (x.l == Infinity) return `Infinity`
  if (isNaN(x.l)) return `NaN`

  if (x.toFixed(places) >= 1e1) places = Math.max(places - 1, 0)
  if (x.toFixed(places) >= 1e2) places = Math.max(places - 1, 0)
  if (x.toFixed(places) < 1e3) return x.toFixed(places)

  placesOverE3 = Math.max(placesOverE3, 0)

  if (x.lt(`1e100000000000`)) {
    if (x.m.toFixed(placesOverE3) == 10)
      return ((1).toFixed(placesOverE3)
        + `e` + (x.e + 1).toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
    else
      return (x.m.toFixed(placesOverE3)
        + `e` + x.e.toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
  }

  return `e` + mix(x.l, 10)
}

/**
 * Formats a number into Mixed Notation.
 * Values over 1e30 fallback to the sci() function.
 * @param {LSNM} x Number to be formatted.
 * @param {number} places Amount of decimal places before 1k.
 */
function mix(x, places = 2) {
  x = new LSNM(x)
  if (x.l == -Infinity)
    return `0`

  bkp = places
  if (x.toFixed(places) >= 1e1) places = Math.max(places - 1, 0)
  if (x.toFixed(places) >= 1e2) places = Math.max(places - 1, 0)
  if (x.toFixed(places) < 1e3) return x.toFixed(places)

  if (x.toFixed(places) < 1e30) {
    places = Math.max((-x.e % 3) + bkp, 0)
    e3 = Math.trunc(x.e / 3)
    if (x.div(`e${e3 * 3}`).toFixed(places) == `1000`) {
      return (1).toFixed(bkp) + LSNM_MIXED[e3 + 1]
    }
    return x.div(`e${e3 * 3}`).toFixed(places) + LSNM_MIXED[e3]
  }

  return sci(x, places, 2)
}

/**
 * - Using an initial value over 1.8e308 requires the input to be a string.
 * @param {number | string} value
 */
function LS(value) {
  return new LSNM(value)
}