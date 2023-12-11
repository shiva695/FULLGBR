// @import Dependencies
import { motion } from "framer-motion";
import styled from "styled-components";

//@ Tab Component
const TabItem = styled(motion.button)`
  white-space: nowrap;
  -webkit-appearance: none;
  box-sizing: border-box;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  padding: 10px 1rem;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  text-size-adjust: none;
  text-overflow: ellipsis;
  line-height: 1.5;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(p) => (p.isActive ? "#FAFBFC" : "#7D8185")};
  margin: 0px;
  overflow: hidden;
`;

//@ Slider Component
const Slider = styled(motion.div)`
  height: 4px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  margin-left: 2px;
  margin-right: 2px;
  bottom: 0;
  position: absolute;
  bottom: -1.5px;
  background: #08e;
`;

export { Slider, TabItem };
