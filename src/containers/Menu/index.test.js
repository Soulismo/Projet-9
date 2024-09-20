// Menu.test.js
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatory links and the logo are displayed", () => {
    render(<Menu />);
    expect(screen.getByText("Nos services")).toBeInTheDocument();
    expect(screen.getByText("Nos réalisations")).toBeInTheDocument();
    expect(screen.getByText("Notre équipe")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  describe("and a click is triggered on contact button", () => {
    it("document location hash changes", async () => {
      render(<Menu />);
      const contactButton = screen.getByText("Contact");
      fireEvent.click(contactButton);

      // Attendre un court instant pour que le hash soit mis à jour
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(window.document.location.hash).toEqual("#contact");
    });
  });
});
