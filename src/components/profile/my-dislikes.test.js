import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyDislikes from "./my-dislikes";

/**
 * implement the test of my-dislike component's screen
 */
test("renders learn react link", async () => {
  render(<MyDislikes />);
  const linkElement = screen.getByText(/Mock/i);
  expect(linkElement).toBeInTheDocument();
});
