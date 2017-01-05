'use strict';

const proxyquire = require('proxyquire');
const tasks = require('../../../bin/tasks');

describe('./bin', () => {

  let execStub;
  let bin;

  describe('without errors', () => {

    before(() => {
      execStub = sinon.stub().yields();

      bin = proxyquire('../../../bin/index.js', {
        'child_process': {
          exec: execStub
        }
      });
    });

    it('executes the make-folders task', () => {
      sinon.assert.calledWith(execStub, sinon.match(tasks['make-folders']));
    });

    it('executes the compile-css task', () => {
      sinon.assert.calledWith(execStub, sinon.match(tasks['compile-css']));
    });

    it('executes the bundle-js task', () => {
      sinon.assert.calledWith(execStub, sinon.match(tasks['bundle-js']));
    });

    it('executes the copy-images task', () => {
      sinon.assert.calledWith(execStub, sinon.match(tasks['copy-images']));
    });

  });

  describe('when make-folders task has an error', () => {

    before(() => {
      execStub = sinon.stub().withArgs(tasks['make-folders']).yields([new Error()]);

      bin = proxyquire('../../../bin/index.js', {
        'child_process': {
          exec: execStub
        }
      });
    });

    it('cancels all subsequent task executions', () => {
      sinon.assert.calledWith(execStub, sinon.match(tasks['make-folders']));
      sinon.assert.neverCalledWith(execStub, sinon.match(tasks['compile-css']));
      sinon.assert.neverCalledWith(execStub, sinon.match(tasks['bundle-js']));
      sinon.assert.neverCalledWith(execStub, sinon.match(tasks['copy-images']));
    });

  });

  describe('when other tasks have errors', () => {

    before(() => {
      execStub = sinon.stub();
      sinon.stub().yields([new Error()]);
      execStub.withArgs(tasks['make-folders']).yields();

      bin = proxyquire('../../../bin/index.js', {
        'child_process': {
          exec: execStub
        }
      });
    });

    it('sibling tasks are still attempted', () => {
      sinon.assert.calledWith(execStub, sinon.match(tasks['make-folders']));
      sinon.assert.calledWith(execStub, sinon.match(tasks['compile-css']));
      sinon.assert.calledWith(execStub, sinon.match(tasks['bundle-js']));
      sinon.assert.calledWith(execStub, sinon.match(tasks['copy-images']));
    });

  });

});
