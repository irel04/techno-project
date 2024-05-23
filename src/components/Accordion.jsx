import { useState } from "react";

function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded">
      <div
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold">{question}</h2>
        <span className="text-xl font-bold text-primary">
          {isOpen ? "-" : "+"}
        </span>
      </div>
      {isOpen && <div className="p-4 border-t border-gray-300">{answer}</div>}
    </div>
  );
}

export default Accordion;
