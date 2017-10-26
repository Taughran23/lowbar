const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');


const _ = require(path.join(__dirname, '..', './lowbarAdvanced.js'));

describe.only('_', () => {
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
});

