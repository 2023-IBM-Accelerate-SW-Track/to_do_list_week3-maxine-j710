import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("MM/DD/YYYY");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "5/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
});


test('test that new-item-button is a button', () => {
  render(<App/>, container);
  const element = screen.getByTestId('new-item-button');
  console.log(element.outerHTML.toLowerCase());
  expect(element.outerHTML.toLowerCase().includes("button")).toBe(true)
});


test('test that new-item-input is an input ', () => {
  render(<App/>, container);
  const element = screen.getByTestId('new-item-input');
  expect(element.innerHTML.toLowerCase().includes("input")).toBe(true)
});


test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("MM/DD/YYYY");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDateOne = "6/30/2023";
  const dueDateTwo = "7/5/2023";
  fireEvent.change(inputTask, { target: { value: "Homework"}});
  fireEvent.change(inputDate, { target: { value: dueDateOne}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Homework"}});
  fireEvent.change(inputDate, { target: { value: dueDateTwo}});
  fireEvent.click(element);
  const checkDupe = screen.getByText(/Homework/i);
  expect(checkDupe).toBeInTheDocument();
 });

