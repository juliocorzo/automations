import {
  add, subtract, multiply, divide,
} from '.';

describe('math', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(1, 1)).toBe(2);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(2, 1)).toBe(1);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(2, 2)).toBe(4);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(4, 2)).toBe(2);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => divide(4, 0)).toThrow('Cannot divide by zero');
    });
  });
});
