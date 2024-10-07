import { it, expect, describe, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/vitest'
import MoleculeDataTextArea from "../src/Components/moleculeDataTextArea"
import React from 'react'

describe("initialMoleculeDataTextArea", () => {
    afterEach(() => {
        cleanup();
    });
    
    it("should render initial fields correctly", () => {
      render(<MoleculeDataTextArea moleculedata="" setmoleculeData={() => {}} />);

      const emptyAtomsField = screen.getByLabelText("Atoms")
      const emptyLatticeField = screen.getByLabelText("Comment/Lattice")
      const emptyDataField = screen.getByLabelText("Molecule Data")
      expect(emptyAtomsField).toBeInTheDocument();
      expect(emptyLatticeField).toBeInTheDocument();
      expect(emptyDataField).toBeInTheDocument();
    });

    it("should return error for wrong number of items in a line", () => {
        const data = "3\nCarbon Dioxide molecule\nC   0.000000  0.000000\nO   1.160000  0.000000  0.000000\nO  -1.160000  0.000000  0.000000";
        render(<MoleculeDataTextArea moleculedata={data} setmoleculeData={() => {}} />)

        const renderButton = screen.getByRole('button', {name: /render/i});
        fireEvent.click(renderButton);
        const alert = screen.getByRole('alert')
        expect(alert).toContainHTML("Wrong number of items on line 1")
    });

    it("should return error for invalid chemical name in a line", () => {
        const data = "3\nCarbon Dioxide molecule\nC   0.000000  0.000000  0.000000\nO%D   1.160000  0.000000  0.000000\nO  -1.160000  0.000000  0.000000";
        render(<MoleculeDataTextArea moleculedata={data} setmoleculeData={() => {}} />)

        const renderButton = screen.getByRole('button', {name: /render/i});
        fireEvent.click(renderButton);
        const alert = screen.getByRole('alert')
        expect(alert).toContainHTML("Invalid chemical on line 2")
    });

    it("should return error for invalid number in a line", () => {
        const data = "3\nCarbon Dioxide molecule\nC   0.000000  0.000000  0.000000\nO   1.160000  0.abc0000  0.000000\nO  -1.160000  0.000000  0.000000";
        render(<MoleculeDataTextArea moleculedata={data} setmoleculeData={() => {}} />)

        const renderButton = screen.getByRole('button', {name: /render/i});
        fireEvent.click(renderButton);
        const alert = screen.getByRole('alert')
        expect(alert).toContainHTML("Invalid number on line 2")
    });

    it('should display the correct number of lines', () => {
        const data = "3\nCarbon Dioxide molecule\nC   0.000000  0.000000  0.000000\nO   1.160000  0.0000  0.000000\nO  -1.160000  0.000000  0.000000";
        render(<MoleculeDataTextArea moleculedata={data} setmoleculeData={() => {}} />)

        const atomCount = screen.getByLabelText("Atoms")
        expect(atomCount).toContainHTML("3")

    })

    it('should ignore and not display errors when there are empty new lines or spaces on the end of lines', () => {
        const data = "3\nCarbon Dioxide molecule\n\nC   0.000000  0.000000  0.000000  \n\nO   1.160000  0.000000  0.000000    \nO  -1.160000  0.000000  0.000000  \n\n";
        render(<MoleculeDataTextArea moleculedata={data} setmoleculeData={() => {}} />)

        const renderButton = screen.getByRole('button', {name: /render/i});
        fireEvent.click(renderButton);
        const a = screen.queryByRole('alert')
        expect(a).not.toBeInTheDocument()
        
    })
});