const chai = require('chai');
const dirtyChai = require('dirty-chai');

jest.setTimeout(30000);

chai.use(dirtyChai);

global.jestExpect = global.expect;
global.expect = chai.expect;
