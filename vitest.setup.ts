const DataTestIdPlugin = (wrapper) => {
  function findByTestId(selector: string) {
    const dataSelector = `[data-testid='${selector}']`;
    const element = wrapper.element.querySelector(dataSelector);
    return new DOMWrapper(element);
  }

  return {
    findByTestId,
  };
};

config.plugins.VueWrapper.install(DataTestIdPlugin);
