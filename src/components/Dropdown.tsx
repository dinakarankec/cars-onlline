import React, {
  createRef,
  MouseEvent,
  RefObject,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { Option } from "./../typings";
import { Button, colors } from "./styled";

export const Container = styled.div`
  width: 240px;
  ${Button} {
    font-size: 16px;
    padding: 0px;
    border-radius: 3px;
    position: relative;
    width: 100%;
    &.active {
      i {
        transform: rotate(180deg);
      }
    }
  }
`;

export const Control = styled.div`
  color: ${colors.dark};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  padding: 8px 12px;
`;

export const Icon = styled.i`
  color: ${colors.light};
  font-size: 14px;
  transition: 0.3s ease;
`;
export const Options = styled.ul`
  z-index: 3;
  background-color: ${colors.white};
  position: absolute;
  top: 34px;
  right: 0px;
  min-width: 240px;
  border: 1px solid ${colors.light};

  .item {
    font-size: 16px;
    border-top: 1px solid ${colors.light};
    padding: 8px 12px;
    color: ${colors.dark};
    cursor: pointer;
    text-align: left;

    &:first-child {
      border-top: 0px;
    }

    &.active {
      background-color: ${colors.primary};
      color: ${colors.white};
      &:hover {
        background-color: ${colors.accent};
      }
    }

    &:hover {
      background-color: ${colors.light};
    }
  }
`;

interface IDropdownProps {
  className?: string;
  options: Option[];
  value: string;
  onChange(item: Option): void;
}

const Dropdown: React.FC<IDropdownProps> = ({
  options,
  className = "",
  value,
  onChange,
}) => {
  const [isOpen, toggle] = useState(false);

  const ref: RefObject<HTMLButtonElement> = createRef();

  const handleControlClick = (event: MouseEvent<HTMLButtonElement>) => {
    const documentClickHandler = () => {
      toggle(false);
      document.removeEventListener("click", documentClickHandler);
    };
    toggle(!isOpen);
    if (!isOpen) {
      setTimeout(() =>
        document.addEventListener("click", documentClickHandler)
      );
    } else {
      document.removeEventListener("click", documentClickHandler);
    }
  };

  const selectedOption = useMemo(() => {
    return (
      options.find((option: Option) => option.value === value) || {
        value: "",
        label: "None",
      }
    );
  }, [options, value]);

  return (
    <Container className={className}>
      <Button
        onClick={handleControlClick}
        ref={ref}
        className={`white ${className} ${isOpen ? "active" : ""}`}
      >
        <Control>
          <span>{selectedOption.label}</span>
          <Icon className="icon-arrow-down" />
        </Control>
        {isOpen && (
          <Options>
            {options.map((option: Option) => (
              <li
                className={
                  option.value === selectedOption.value ? "active item" : "item"
                }
                key={option.value}
                onClick={() => {
                  onChange(option);
                }}
              >
                {option.label}
              </li>
            ))}
          </Options>
        )}
      </Button>
    </Container>
  );
};
export default Dropdown;
