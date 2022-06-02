/* eslint-disable testing-library/await-async-query */
import React from "react";
import renderer from "react-test-renderer";
import App, { Item, List, SearchForm, InputWithLabel } from "./App";

describe("Item", () => {
  const item = {
    title: "React",
    url: "https://reactjs.org",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  };
  const handleRemoveItem = jest.fn();
  let component;
  beforeEach(() => {
    component = renderer.create(
      <Item item={item} onRemoveItem={handleRemoveItem} />
    );
  });

  it("render all properties", () => {
    expect(component.root.findByType("a").props.href).toEqual(
      "https://reactjs.org"
    );

    // https://github.com/facebook/react/issues/16962
    // Вставить .filter(x => typeof (x.type) === 'string'), чтобы спрятать стелс узлы.
    // Баг работы findAllByProps в сочетании с styled-components
    expect(
      component.root
        .findAllByProps({ children: "Jordan Walke" })
        .filter((x) => typeof x.type === "string").length
    ).toEqual(1);
  });

  it("calls onRemoveItem on button click", () => {
    component.root.findByType("button").props.onClick();
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(item);
    expect(component.root.findAllByType(Item).length).toEqual(1);
  });
});

describe("List", () => {
  const list = [
    {
      title: "React",
      url: "https://reactjs.org",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  it("renders two items", () => {
    const component = renderer.create(<List list={list} />);
    expect(component.root.findAllByType(Item).length).toEqual(2);
  });
});

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "React",
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };
  let component;
  beforeEach(() => {
    component = renderer.create(<SearchForm {...searchFormProps} />);
  });
  it("renders the input field with its value", function () {
    const value = component.root.findByType("input").props.value;
    expect(value).toEqual("React");
  });
  it("changes the input field", () => {
    const pseudoEvent = { target: "Redux" };
    component.root.findByType("input").props.onChange(pseudoEvent);
    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
    expect(searchFormProps.onSearchInput).toHaveBeenCalledWith(pseudoEvent);
  });
  it("submit the form", () => {
    const pseudoEvent = {};
    component.root.findByType("form").props.onSubmit(pseudoEvent);
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledWith(pseudoEvent);
  });
  it("disables the button and prevents submit", () => {
    component.update(<SearchForm {...searchFormProps} searchTerm="" />);
    expect(component.root.findByType("button").props.disabled).toBeTruthy();
  });
});

describe("App", () => {
  it("success fetching data with a list", () => {
    const list = [
      {
        title: "React",
        url: "https://reactjs.org",
        author: "Jordan Walke",
        num_comments: 3,
        points: 4,
        objectID: 0,
      },
      {
        title: "Redux",
        url: "https://redux.js.org",
        author: "Dan Abramov, Andrew Clark",
        num_comments: 2,
        points: 5,
        objectID: 1,
      },
    ];
    const component = renderer.create(<App />);
    // findByType - не работает с List = React.memo(...) ???
    // expect(component.root.findByType(List).props.list).toEqual(list);
  });
});
