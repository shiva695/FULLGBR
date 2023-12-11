import React from "react";
import Card from "../general-components/Card";
import { useNavigate } from "react-router-dom";

const SectionCard = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-flow-row-dense grid-cols-3 max-w-5xl h-[100vh] overflow-y-scroll flex-row gap-[10px] flex-wrap bg-[#141517CC] mx-auto mt-[90px] rounded-[18px] p-[20px]">
      <div
        onClick={() => navigate("/react-drag-drop")}
        className="cursor-pointer"
      >
        <Card />
      </div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default SectionCard;
