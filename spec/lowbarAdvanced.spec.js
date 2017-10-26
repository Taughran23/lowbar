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
});

