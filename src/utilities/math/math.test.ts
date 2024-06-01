import {
  add, subtract, multiply, divide, findNumberDelta,
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

  describe('findNumberDelta', () => {
    it('should find the delta between the largest and smallest numbers', () => {
      expect(findNumberDelta([1, 2, 3, 4, 5])).toBe(4);
    });

    it('should find the delta between the largest and smallest numbers when the smallest is negative', () => {
      expect(findNumberDelta([-1, 2, 3, 4, 5])).toBe(6);
    });

    it('should find the delta between the largest and smallest numbers when the largest is negative', () => {
      expect(findNumberDelta([-5, -4, -3, -2, -1])).toBe(4);
    });

    it('should return 0 when there is only one number', () => {
      expect(findNumberDelta([1])).toBe(0);
    });

    it('should return 0 when all the numbers are the same', () => {
      expect(findNumberDelta([1, 1, 1, 1, 1])).toBe(0);
    });
  });
});
