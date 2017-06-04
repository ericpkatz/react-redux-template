import Fizz from './Fizz';
describe('Fizz', ()=> {
  it('exists', ()=> {
    expect(Fizz).to.be.ok;
  });
  it('returns buzz', ()=>{
    expect(Fizz()).to.equal('buzz');
  });
});
