const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

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
  describe('#each', () => {
    it('should be a function', () => {
      expect(_.each).to.be.a('function');
    });
    it('should pass each element in an array to an iteratee function', () => {
      const result = [];
      const arr = [1, 2, 3, 4, 5];
      const func = (num) => {
        result.push(num);
      };
      _.each(arr, func);
      expect(result).to.eql(arr);
    });
    it('should pass each element in an object to an iteratee function', () => {
      const result = [];
      const obj = {
        'one': 1,
        'two': 2,
        'three': 3
      };
      const func = (num) => {
        result.push(num);
      };
      _.each(obj, func);
      expect(result.length).to.equal(3);
    });
    it('should bind the context to the iteritee function if one is passed', () => {
      const result = [];
      const list = [1, 2, 3];
      const func = () => {
        result.push(context.name);
      };
      const context = {
        'name': 'Dave Benson-Philips'
      };
      _.each(list, func, context);
      expect(result).to.eql(['Dave Benson-Philips', 'Dave Benson-Philips', 'Dave Benson-Philips']);
    });
    it('should call the function with the array element and index', () => {
      const result = [];
      const list = [1, 2, 3];
      const func = (element, index) => {
        result.push(element, index);
      };
      _.each(list, func);
      expect(result).to.eql([1, 0, 2, 1, 3, 2]);
    });
    it('should call the function with the object value and key', () => {
      const result = [];
      const list = {
        'one': 1,
        'two': 2,
        'three': 3
      };
      const func = (value, key) => {
        result.push(value, key);
      };
      _.each(list, func);
      expect(result).to.eql([1, 'one', 2, 'two', 3, 'three']);
    });
    it('should pass all elements to the iteritee function', () => {
      const spy = sinon.spy();
      const list = [1, 2, 3];
      _.each(list, spy);
      expect(spy.callCount).to.eql(3);
    });
  });
});