class Temperature {
  readonly value: number;

  constructor(value: number) {
    if (value < 0 || value > 1) {
      throw new Error('Temperature must be between 0 and 1');
    }

    this.value = value;
  }
}

export default Temperature;
