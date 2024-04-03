import PinValidation from "components/PinValidation/index.vue";

describe('PinValidation', () => {
  it('renders the correct number of input boxes', () => {
    const wrapper = mount(PinValidation, {
      props: {
        numBoxes: 5,
      },
    });

    const inputBoxes = wrapper.findAll('input');
    expect(inputBoxes).toHaveLength(5);
  });

  it('fills the input boxes with the default value', () => {
    const wrapper = mount(PinValidation, {
      props: {
        numBoxes: 5,
        defaultValue: '123',
      },
    });

    const inputBoxes = wrapper.findAll('input');
    expect(inputBoxes[0].element.value).toBe('1');
    expect(inputBoxes[1].element.value).toBe('2');
    expect(inputBoxes[2].element.value).toBe('3');
    expect(inputBoxes[3].element.value).toBe('');
    expect(inputBoxes[4].element.value).toBe('');
  });

  it('allows only single digits between 0 and 9', async () => {
    const wrapper = mount(PinValidation, {
      props: {
        numBoxes: 5,
      },
    });

    const inputBoxes = wrapper.findAll('input');

    await inputBoxes[0].setValue('1');
    await inputBoxes[1].setValue('a');
    await inputBoxes[2].setValue('5');
    await inputBoxes[3].setValue('12');
    await inputBoxes[4].setValue('9');

    expect(inputBoxes[0].element.value).toBe('1');
    expect(inputBoxes[1].element.value).toBe('');
    expect(inputBoxes[2].element.value).toBe('5');
    expect(inputBoxes[3].element.value).toBe('');
    expect(inputBoxes[4].element.value).toBe('9');
  });

  it('emits "filled" event when all input boxes are filled', async () => {
    const wrapper = mount(PinValidation, {
      props: {
        numBoxes: 3,
      },
    });

    const inputBoxes = wrapper.findAll('input');

    await inputBoxes[0].setValue('1');
    await inputBoxes[1].setValue('2');
    await inputBoxes[2].setValue('3');

    expect(wrapper.emitted('filled')).toBeTruthy();
  });

  it('does not emit "filled" event when input boxes are not filled', async () => {
    const wrapper = mount(PinValidation, {
      props: {
        numBoxes: 4,
      },
    });

    const inputBoxes = wrapper.findAll('input');

    await inputBoxes[0].setValue('1');
    await inputBoxes[1].setValue('2');

    expect(wrapper.emitted('filled')).toBeFalsy();
  });

  it('allows pasting only valid digits', async () => {
    const wrapper = mount(PinValidation, {
      props: {
        numBoxes: 4,
      },
    });

    const inputBoxes = wrapper.findAll('input');

    await inputBoxes[0].trigger('paste', {
      clipboardData: {
        getData: () => 'a123',
      },
    });

    expect(inputBoxes[0].element.value).toBe('');
    expect(inputBoxes[1].element.value).toBe('1');
    expect(inputBoxes[2].element.value).toBe('2');
    expect(inputBoxes[3].element.value).toBe('3');
  });

  it('clears the input value when backspace key is pressed', async () => {
    const wrapper = mount(PinValidation, {
      props: {
        numBoxes: 4,
      },
    });

    const inputBoxes = wrapper.findAll('input');

    await inputBoxes[0].setValue('1');
    await inputBoxes[0].trigger('keydown', {
      key: 'Backspace',
    });

    expect(inputBoxes[0].element.value).toBe('');
  });
});