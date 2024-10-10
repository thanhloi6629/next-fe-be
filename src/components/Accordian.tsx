/** @format */

import React from "react";
import {
  AccordionContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IProps {
  list: {
    lable: string;
    content: string;
  }[];
}

const AccordionCustom: React.FC<IProps> = ({ list }) => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {list.map((item, index) => {
          return (
            <>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>{item.lable}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            </>
          );
        })}
      </Accordion>
    </div>
  );
};

export default AccordionCustom;
