const path = require('path');
const expect = require('chai').expect;

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  describe('#identity', function () {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });
    it('should return the same primitive value when passed a primitive value', () => {
      const result = _.identity('x');
      expect(result).to.equal('x');
      const result2 = _.identity(23);
      expect(result2).to.equal(23);
    });
    it('should return the same non-primitive value when passed a non-primitive value', () => {
      const result = _.identity(['x']);
      expect(result).to.eql(['x']);
      const result2 = _.identity({
        '1': ['x']
      });
      expect(result2).to.eql({
        '1': ['x']
      });
    });
  });
  describe('#first', function () {
    it('should be as function', () => {
      expect(_.first).to.be.a('function');
    });
    it('should return undefined when passed an empty array', () => {
      const result = _.first([]);
      expect(result).to.equal(undefined);
    });
    it('should return the first element in an array when passed one argument', () => {
      const result = _.first([1, 2, 3, 4]);
      expect(result).to.equal(1);
    });
    it('should return the first n elements in an array if the second argument is defined', () => {
      const result = _.first([1, 2, 3, 4], 2);
      expect(result).to.eql([1, 2]);
    });
    it('should return an empty array if the second argument is defined but not an integer', () => {
      const result = _.first([
        [1, [2]], 2, 3, 4
      ], 'integer');
      expect(result).to.eql([]);
    });
    it('should return the first n elements in an array, if n is a decimal it should round down', () => {
      const result = _.first([
        [1, [2]], 2, 3, 4
      ], 3.5);
      expect(result).to.eql([
        [1, [2]], 2, 3
      ]);
    });
  });
  describe('#last', () => {
    it('should be as function', () => {
      expect(_.last).to.be.a('function');
    });
    it('should return undefined if not passed an array', () => {
      const result = _.last({
        'last': 1
      });
      expect(result).to.equal(undefined);
    });
    it('should return undefined if the array has the length of zero', () => {
      const result = _.last([]);
      expect(result).to.equal(undefined);
    });
    it('should return the last element of an array when passed one argument', () => {
      const result = _.last([1, 2, 3, 4, 5]);
      expect(result).to.equal(5);
    });
    it('should return the last n elements of an array when the second argument passed is a number', () => {
      const result = _.last([1, 2, 3, 4, 5], 2);
      expect(result).to.eql([4, 5]);
    });
    it('should return an empty array if the second argument is not a number', () => {
      const result = _.last([1, 2, 3, 4, 5], 'hello');
      expect(result).to.eql([]);
    });
    it('should round up n if given a decimal number', () => {
      const result = _.last([1, 2, 3, 4, 5], 3.5);
      expect(result).to.eql([2, 3, 4, 5]);
    });
  });
});