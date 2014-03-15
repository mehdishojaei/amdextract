var amdextract = require('..');
var should = require('should');
var fs = require('fs');

function read(testName) {
  return fs.readFileSync('fixtures/' + testName + '.js').toString();
};

function parse(testName) {
  return amdextract.parse(read(testName));
};

describe('amdextract', function() {
  describe('#parse()', function() {
    var output = parse('sample');

    describe('unnamed module', function() {
      describe('without paths', function() {
        var result = output.results[0];
        it('.moduleId', function() { should(result.moduleId).equal(undefined); });
        it('.paths', function() { result.paths.should.be.empty; });
        it('.dependencies', function() { result.dependencies.should.be.empty; });
      });

      describe('with paths', function() {
        var result = output.results[1];
        it('.moduleId', function() { should(result.moduleId).equal(undefined); });
        it('.paths', function() { result.paths.should.be.eql(['path']); });
        it('.dependencies', function() { result.dependencies.should.be.eql(['a']); });
        it('.unusedPaths', function() { result.unusedPaths.should.be.eql(['path']); });
        it('.unusedDependencies', function() { result.unusedDependencies.should.be.eql(['a']); });
      });
    });

    describe('named module', function() {
      describe('test1', function() {
        var result = output.results[2];
        it('.moduleId', function() { should(result.moduleId).equal('test1'); });
        it('.paths', function() { result.paths.should.be.eql(['a-path', 'b-path']); });
        it('.dependencies', function() { result.dependencies.should.be.eql(['a', 'b']); });
        it('.unusedPaths', function() { result.unusedPaths.should.be.eql(['a-path', 'b-path']); });
        it('.unusedDependencies', function() { result.unusedDependencies.should.be.eql(['a', 'b']); });
      });

      describe('test2', function() {
        var result = output.results[3];
        it('.moduleId', function() { should(result.moduleId).equal('test2'); });
        it('.paths', function() { result.paths.should.be.eql(['a-path', 'b-path']); });
        it('.dependencies', function() { result.dependencies.should.be.eql(['a', 'b']); });
        it('.unusedPaths', function() { result.unusedPaths.should.be.eql(['a-path']); });
        it('.unusedDependencies', function() { result.unusedDependencies.should.be.eql(['a']); });
      });

      describe('test3', function() {
        var result = output.results[4];
        it('.moduleId', function() { should(result.moduleId).equal('test3'); });
        it('.paths', function() { result.paths.should.be.eql(['a-path', 'b-path']); });
        it('.dependencies', function() { result.dependencies.should.be.eql(['a', 'b']); });
        it('.unusedPaths', function() { result.unusedPaths.should.be.eql(['a-path']); });
        it('.unusedDependencies', function() { result.unusedDependencies.should.be.eql(['a']); });
      });

      describe('test4', function() {
        var result = output.results[5];
        it('.moduleId', function() { should(result.moduleId).equal('test4'); });
        it('.paths', function() { result.paths.should.be.eql(['a-path', 'b-path']); });
        it('.dependencies', function() { result.dependencies.should.be.eql(['a', 'b']); });
        it('.unusedPaths', function() { result.unusedPaths.should.be.eql([]); });
        it('.unusedDependencies', function() { result.unusedDependencies.should.be.eql([]); });
      });

      describe('test5', function() {
        var result = output.results[6];
        it('.moduleId', function() { should(result.moduleId).equal('test5'); });
        it('.paths', function() { result.paths.should.be.eql(['a-path', 'b-path']); });
        it('.dependencies', function() { result.dependencies.should.be.eql(['a']); });
        it('.unusedPaths', function() { result.unusedPaths.should.be.eql(['b-path']); });
        it('.unusedDependencies', function() { result.unusedDependencies.should.be.eql([]); });
      });
    });
  });
});
