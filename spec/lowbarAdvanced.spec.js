const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');


const _ = require(path.join(__dirname, '..', './lowbarAdvanced.js'));

describe('_', () => {
  'use strict';

  it('is an object', () => {
    expect(_).to.be.an('object');
  });
  describe('#once', () => {
    it('should be a function', () => {
      expect(_.once).to.be.a('function');
    });
    it('should only allow the function passed to it to be called once', () => {
      const func = _.once(() => 'hello');
      const first = func();
      const second = func();
      expect(first).to.equal('hello');
      expect(second).to.equal(undefined);
    });
    it('should only call the function once', () => {
      const spy = sinon.spy();
      const result = _.once(spy);
      result();
      result();
      expect(spy.callCount).to.equal(1);
    });
  });
  describe('#memoize', () => {
    it('should be a function', () => {
      expect(_.memoize).to.be.a('function');
    });
    it('should return the same value that calling the original function returns', () => {
      const func = (num) => {
        return num * 2;
      };
      const memFunc = _.memoize(func);
      expect(memFunc(2)).to.equal(func(2));
    });
    it('should only call the function once if it has been called previously', () => {
      const func = (num) => {
        return Math.pow(num, 3);
      };
      const spy = sinon.spy(func);
      const cubed = _.memoize(spy);
      cubed(2);
      cubed(2);
      expect(spy.callCount).to.equal(1);
    });
    it('should return a function that has a cache property', () => {
      const func = (num) => {
        return Math.pow(num, 3);
      };
      const cubed = _.memoize(func);
      cubed(2);
      expect(cubed.cache).to.eql({
        '2': 8
      });
    });
  });
  describe('#shuffle', () => {
    it('should be a function', () => {
      expect(_.shuffle).to.be.a('function');
    });
    it('should return an array of the same length as the passed array', () => {
      const list = [1, 2, 3, 4, 5];
      expect(_.shuffle(list).length).to.equal(5);
    });
    it('should return an array with the same elements but in different index positions', () => {
      const list = [5, 10, 15, 20];
      const result = _.shuffle(list);
      expect(result).to.not.eql(list);
    });
    it('should work with objects', () => {
      const list = {
        '1': 1,
        '2': 2,
        '3': 3
      };
      const result = _.shuffle(list);
      expect(result).to.not.eql(list);
    });
    it('should return a empty array if passed a number', () => {
      expect(_.shuffle(3)).to.eql([]);
    });
    it('should return an array when passed a string', () => {
      const result = Array.isArray(_.shuffle('hello'));
      expect(result).to.equal(true);
    });
    it('should return an array of shuffled letters when passed a string', () => {
      const result = _.shuffle('world');
      expect(result).to.not.equal(['w', 'o', 'r', 'l', 'd']);
    });
  });
  describe('#invoke', () => {
    it('should be a function', () => {
      expect(_.invoke).to.be.a('function');
    });
    it('should call the method on item in the list', () => {
      const list = [
        [5, 1, 7],
        [3, 2, 1]
      ];
      const func = 'sort';
      expect(_.invoke(list, func)).to.eql([
        [1, 5, 7],
        [1, 2, 3]
      ]);
    });
    it('should work for objects', () => {
      const list = {
        '1': 1,
        '2': 2,
        '3': 3
      };
      const func = 'toString';
      expect(_.invoke(list, func)).to.eql(['1', '2', '3']);
    });
    it('should handle a third argument that should be passed to the method', () => {
      const list = [
        ['Barry', 'Paul'],
        ['Laurel', 'Hardy']
      ];
      const func = 'join';
      const arg = ' and ';
      expect(_.invoke(list, func, arg)).to.eql(['Barry and Paul', 'Laurel and Hardy']);
    });
    it('should return an empty array if passed a number as the first argument', () => {
      expect(_.invoke(1, 'sort')).to.eql([]);
    });
    it('should return an empty array if passed a string', () => {
      expect(_.invoke('no', 'sort')).to.eql([undefined, undefined]);
    });
    it('should return undefined if not passed the method argument', () => {
      expect(_.invoke([1, 2, 3])).to.eql([undefined, undefined, undefined]);
    });
  });
  describe('#sortBy', () => {
    it('should be a function', () => {
      expect(_.sortBy).to.be.a('function');
    });
    it('should sort the given list by the return value of the iteritee function', () => {
      const list = [1, 2, 3, 4, 5, 6];
      const func = function (num) {
        return Math.sin(num);
      };
      expect(_.sortBy(list, func)).to.eql([5, 4, 6, 3, 1, 2]);
    });
    it('should work with objects', () => {
      const list = [{
        name: 'moe',
        age: 60
      }, {
        name: 'larry',
        age: 50
      }, {
        name: 'curly',
        age: 40
      }];
      expect(_.sortBy(list, 'age')).to.eql([{
        name: 'curly',
        age: 40
      }, {
        name: 'larry',
        age: 50
      }, {
        name: 'moe',
        age: 60
      }]);
      it('should bind the iteritee function to the context object if one is passed', () => {
        const list = [1, 2, 3, 4, 5, 6];
        const func = (num) => context.math(num);
        const context = {
          'math': (num) => Math.sin(num)
        };
        expect(_.sortBy(list, func, context)).to.eql([5, 4, 6, 3, 1, 2]);
      });
    });
  });
  describe('#zip', () => {
    it('should be a function', () => {
      expect(_.zip).to.be.a('function');
    });
    it('should merge together the values of each of the arrays with the values at the corrsponding postion', () => {
      expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql([
        ['moe', 30, true],
        ['larry', 40, false],
        ['curly', 50, false]
      ]);
    });
    it('should return an undefined value if there is not a corrasponding element in a passed array', () => {
      expect(_.zip([1, 2, 3], [10, 20])).to.eql([
        [1, 10],
        [2, 20],
        [3, undefined]
      ]);
    });
    it('should retain all present elements if the first array is shorter than the others', () => {
      expect(_.zip([1, 2], [10, 20, 30])).to.eql([
        [10, 1],
        [20, 2],
        [30, undefined]
      ]);
    });
  });
  describe('#sortedIndex', () => {
    it('should be a function', () => {
      expect(_.sortedIndex).to.be.a('function');
    });
    it('should return the index that the value should be inserted in to maintain the sorted order', () => {
      const list = [1, 2, 3, 4, 5];
      const value = 3.5;
      expect(_.sortedIndex(list, value)).to.equal(3);
    });
    it('should compute the sort ranking of each element including the value passed using the iteratee if passed one', () => {
      const list = [1, 2, 3, 4, 5];
      const value = 3.5;
      const func = (num) => num += 1;
      expect(_.sortedIndex(list, value, func)).to.equal(3);
    });
    it('should bind the iteratee to the context object if one is passed', () => {
      const list = [10, 20, 30, 40, 50];
      const value = 15;
      const func = (num) => num / context.ten;
      const context = {
        'ten': 10
      };
      expect(_.sortedIndex(list, value, func, context)).to.equal(1);
    });
  });
  describe('#flatten', () => {
    it('should be a function', () => {
      expect(_.flatten).to.be.a('function');
    });
    it('should take a nested array and return a non-nested one', () => {
      const list = [1, [2, 3, [4]], 5];
      expect(_.flatten(list)).to.eql([1, 2, 3, 4, 5]);
    });
    it('should retrun an empty array if not passed an array', () => {
      expect(_.flatten(5)).to.eql([]);
    });
  });
  describe('#intersection', () => {
    it('should be a function', () => {
      expect(_.intersection).to.be.a('function');
    });
    it('should return an array of the common elements of the passed arrays', () => {
      expect(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])).to.eql([1, 2]);
    });
    it('should return an empty array of passed a primitive value', () => {
      expect(_.intersection(5)).to.eql([]);
      expect(_.intersection('hello')).to.eql([]);
      expect(_.intersection(null)).to.eql([]);
      expect(_.intersection(undefined)).to.eql([]);
      expect(_.intersection(true)).to.eql([]);
    });
    it('should return an empty array if passed an empty array', ()=> {
      expect(_.intersection([])).to.eql([]);
    });
    it('should return an empty array if passed an object', ()=> {
      expect(_.intersection({'1':'one'})).to.eql([]);
    });
  });
  describe('#difference', () => {
    it('should be a function', () => {
      expect(_.difference).to.be.a('function');
    });
    it('should return some arguments', () => {
      expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10])).to.eql([1, 3, 4]);
    });
    it('should return an empty array if passed a primitive value as the first argument', () => {
      expect(_.difference(1,[1,2,3],[4,5,6])).to.eql([]);
    });
    it('should return an array of object values if passed an object', ()=> {
      expect(_.difference({'1':'hello','2':'world'},[1,2,3],[4,5,6])).to.eql(['hello','world']);
    });
    it('should retrun the original array if passed an object as the second argument',() => {
      expect(_.difference([1,2,3],{'1':'hello','2':'world'})).to.eql([1, 2, 3]);
    });
  });
});

