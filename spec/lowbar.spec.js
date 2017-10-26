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
  describe('#indexOf', () => {
    it('should be a function', () => {
      expect(_.indexOf).to.be.a('function');
    });
    it('should return the index position of the given value in the given array', () => {
      const arr = [1, 2, 3, 4, 5];
      const value = 3;
      expect(_.indexOf(arr, value)).to.equal(2);
    });
    it('should return -1 if the value is not found in the array', () => {
      const arr = [1, 2, 3, 4, 5];
      const value = 6;
      expect(_.indexOf(arr, value)).to.equal(-1);
    });
    it('should utilise binary search methods methods if a is sorted argument is passed', () => {
      const arr = [1, 2, 3, 4, 5];
      const value = 3;
      expect(_.indexOf(arr, value, true)).to.equal(2);
    });
  });
  describe('#filter', () => {
    it('should be a function', () => {
      expect(_.filter).to.be.a('function');
    });
    it('should return an array of elements that resolved true when passed to the predicate function', () => {
      const list = [1, 2, 3, 4, 5];
      const func = (num) => {
        return num % 2 === 0;
      };
      expect(_.filter(list, func)).to.eql([2, 4]);
    });
    it('should handle objects as well as arrays', () => {
      const list = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5
      };
      const func = (num) => {
        return num % 2 === 0;
      };
      expect(_.filter(list, func)).to.eql([2, 4]);
    });
    it('should return an empty array when passed an empty array', () => {
      const arr = [];
      const func = (num) => {
        return num % 2 === 0;
      };
      expect(_.filter(arr, func)).to.eql([]);
    });
    it('should bind the predicate to the context object when one is passed', () => {
      const list = [1, 2, 3, 4, 5];
      const func = (num) => {
        return num % 2 === 0 && num % context.four !== 0;
      };
      const context = {
        'four': 4
      };
      const result = _.filter(list, func, context);
      expect(result).to.eql([2]);
    });
  });
  describe('#reject', () => {
    it('should be a function', () => {
      expect(_.reject).to.be.a('function');
    });
    it('should return an array of elements that resolved false when passed to the predicate function', () => {
      const list = [1, 2, 3, 4, 5];
      const func = (num) => {
        return num % 3 === 0;
      };
      expect(_.reject(list, func)).to.eql([1, 2, 4, 5]);
    });
    it('should work with objects', () => {
      const list = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5
      };
      const func = (num) => {
        return num % 3 === 0;
      };
      expect(_.reject(list, func)).to.eql([1, 2, 4, 5]);
    });
    it('should bind the predicate to the context object if one is passed', () => {
      const list = [1, 2, 3, 4, 5];
      const func = (num) => {
        return num % context.three === 0;
      };
      const context = {
        'three': 3
      };
      const result = _.reject(list, func, context);
      expect(result).to.eql([1, 2, 4, 5]);
    });
  });
  describe('#uniq', () => {
    it('should be a function', () => {
      expect(_.uniq).to.be.a('function');
    });
    it('should return an empty array if passed an empty array', () => {
      expect(_.uniq([])).to.eql([]);
    });
    it('should retrun an empty array if not passed an array', () => {
      expect(_.uniq(123)).to.eql([]);
    });
    it('should return an array without any duplicated elements', () => {
      const arr = [1, 1, 1, 2, 3, 4, 5, 5];
      expect(_.uniq(arr)).to.eql([1, 2, 3, 4, 5]);
    });
  });
  describe('#map', () => {
    it('should be a function', () => {
      expect(_.map).to.be.a('function');
    });
    it('should return a new array of elements modified by the iteritee function when passed an array', () => {
      const list = [1, 2, 3, 4, 5];
      const func = (num) => {
        return num * 2;
      };
      expect(_.map(list, func)).to.eql([2, 4, 6, 8, 10]);
    });
    it('should return a new array of elements modified by the iteritee function when passed an object', () => {
      const list = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5
      };
      const func = (num) => {
        return Math.pow(num, 2);
      };
      expect(_.map(list, func)).to.eql([1, 4, 9, 16, 25]);
    });
    it('should bind the iteritee function to the context object if one is passed', () => {
      const list = [3, 6, 9, 12, 15];
      const func = (num) => {
        return num / context.three;
      };
      const context = {
        'three': 3
      };
      const result = _.map(list, func, context);
      expect(result).to.eql([1, 2, 3, 4, 5]);
    });
    it('should return and array filled by undefineds if the second argumnet is not a function', () => {
      expect(_.map([1, 2, 3], 2)).to.eql([undefined, undefined, undefined]);
    });
  });
  describe('#contains', () => {
    it('should be a function', () => {
      expect(_.contains).to.be.a('function');
    });
    it('should return true if the given value can be found in the given list', () => {
      expect(_.contains([1, 2, 3, 4, 5], 1)).to.equal(true);
    });
    it('should return false if the given value can not be found in the given list', () => {
      expect(_.contains([1, 2, 3, 4, 5], 6)).to.equal(false);
    });
    it('should work for objects as well as arrays', () => {
      const list = {
        '1': 10,
        '2': 20,
        '3': 30
      };
      expect(_.contains(list, 10)).to.equal(true);
    });
    it('should start the search from a specified index if one is passed', () => {
      const list = [1, 2, 3];
      const value = 1;
      const fromIndex = 1;
      expect(_.contains(list, value, fromIndex)).to.equal(false);
    });
  });
  describe('#pluck', () => {
    it('should be a function', () => {
      expect(_.pluck).to.be.a('function');
    });
    it('should return an array of the requested properties', () => {
      const list = [{
        'fName': 'Dave',
        'lName': 'Benson-Phillips'
      },
      {
        'fName': 'Pat',
        'lName': 'Sharp'
      }
      ];
      const propertyName = 'lName';
      expect(_.pluck(list, propertyName)).to.eql(['Benson-Phillips', 'Sharp']);
    });
    it('should return an empty array when passed an empty array as the fist argument', () => {
      expect(_.pluck([], 'hello')).to.eql([]);
    });
    it('should return undefined if not passed a correct property name as the second argument', () => {
      const list = [{
        'fName': 'Dave',
        'lName': 'Benson-Phillips'
      },
      {
        'fName': 'Pat',
        'lName': 'Sharp'
      }
      ];
      expect(_.pluck(list, 'name')).to.eql([undefined,undefined]);
    });
  });
  describe('#reduce', () => {
    it('should be a function', () => {
      expect(_.reduce).to.be.a('function');
    });
    it('should boil down a list of values into a single value',() => {
      const list = [1,2,3,4,5];
      const memo = 0;
      const func = (memo,num) => {
        return memo += num;
      };
      expect(_.reduce(list, func, memo)).to.equal(15);
    });
    it('should work for objects',() => {
      const list = {'1':1,'2':2,'3':3};
      const memo = 0;
      const func = (memo,num) => {
        return memo += num;
      };
      expect(_.reduce(list, func, memo)).to.equal(6);
    });
    it('should bind the context object to the itritee function if one is passed',() => {
      const list = {'1':1,'2':2,'3':3};
      const memo = 0;
      const func = (memo) => {
        return memo += context.num;
      };
      const context = {'num': 5};
      const result = _.reduce(list, func, memo, context);
      expect(result).to.equal(15);
    });
    it('should default to the first element if a memo is not passed',()=> {
      const list = [10,20,30,40];
      const func = (memo, num) => {
        return memo += num;
      };
      expect(_.reduce(list, func)).to.equal(100);
    });
    it('should return 0 when passed an empty array', ()=> {
      const list = [];
      const func = (memo, num) => {
        return memo += num;
      };
      expect(_.reduce(list, func)).to.equal(0);
    });
    it('should return 0 when passed an empty object', ()=> {
      const list = {};
      const func = (memo, num) => {
        return memo += num;
      };
      expect(_.reduce(list, func)).to.equal(0);
    });
  });
  describe('#every',() => {
    it('should be a function',()=> {
      expect(_.every).to.be.a('function');
    });
    it('should return true if all the elements in the list pass the predicate truth test',() => {
      const list = [2,4,6,8,10];
      const func = (num) => {
        return num % 2 === 0;
      };
      expect(_.every(list, func)).to.equal(true);
    });
    it('should work with objects', () => {
      const list = {'10':10,'12':12,'14':14,'16':16};
      const func = (num) => {
        return num % 2 === 0;
      };
      expect(_.every(list, func)).to.equal(true);
    });
    it('should return false if one element does not pass the truth test', () => {
      const list = {'10':10,'13':13,'14':14,'16':16};
      const func = (num) => {
        return num % 2 === 0;
      };
      expect(_.every(list, func)).to.equal(false);
    });
    it('should bind the context object to the predicate if one is passed', ()=> {
      const list = [2,4,6,8,10];
      const func = (num) => {
        return num % context.two === 0;
      };
      const context = {'two': 2};
      expect(_.every(list, func, context)).to.equal(true);
    });
  });
  describe('#some',() => {
    it('should be a function', () => {
      expect(_.some).to.be.a('function');
    });
    it('should return true if any of the values in the list pass the truth test',()=> {
      const list = [1,2,3,4,5];
      const func = (num) => {
        return num % 3 === 0;
      };
      expect(_.some(list,func)).to.equal(true);
    });
    it('should work with objects', () => {
      const list = {'1':1,'2':2,'3':3};
      const func = (num) => {
        return num % 3 === 0;
      };
      expect(_.some(list,func)).to.equal(true);
    });
    it('should return false if none of the values pass the truth test', () => {
      const list = [1,2,3,4,5];
      const func = (num) => {
        return num % 6 === 0;
      };
      expect(_.some(list,func)).to.equal(false);
    });
    it('should bind the context object to teh predicate if one is passed',() => {
      const list = {'1':1,'2':2,'3':3};
      const func = (num) => {
        return num % context.two === 0;
      };
      const context = {'two':2};
      expect(_.some(list, func, context)).to.equal(true);
    });
  });
  describe('#extends',() => {
    it('should be a function',() => {
      expect(_.extends).to.be.a('function');
    });
    it('should shallow copy all the properties in the source objects to the destination object and return it',() => {
      const obj1 = {'name': 'Lez'};
      const obj2 = {'age': 52};
      expect(_.extends(obj1, obj2)).to.eql({'name': 'Lez','age': 52});
    });
    it('should return the destination object if no source is passed',()=> {
      expect(_.extends({'name': 'Lez'})).to.eql({'name': 'Lez'});
    });
    it('should update the destination object if the source object has the same key',()=> {
      const obj1 = {'name': 'Lez','age':12};
      const obj2 = {'age': 52};
      expect(_.extends(obj1, obj2)).to.eql({'name': 'Lez','age':52});
    });
  });
  describe('#defaults',()=> {
    it('should be a function',()=> {
      expect(_.defaults).to.be.a('function');
    });
    it('should fill in any undefined properties in a target object with the first value present in the following list of default object',()=> {
      const iceCream1 = {'flavor': 'chocolate'};
      const iceCream2 = {'flavor': 'vanilla', 'sprinkles': 'lots'};
      expect(_.defaults(iceCream1,iceCream2)).to.eql({'flavor': 'chocolate', 'sprinkles': 'lots'});
    });
    it('should return the target object when not passed the defaults argument', () => {
      expect(_.defaults({'flavor': 'chocolate'})).to.eql({'flavor': 'chocolate'});
    });
    it('should not replace existing keys',()=> {
      const league1 = {'team': 'Boston Celtics'};
      const league2 = {'team': 'L.A Lakers'};
      expect(_.defaults(league1,league2)).to.eql(league1);
    });
  });
});