import styled from "styled-components";

type Variant = "primary" | "danger" | "success" | "warning";


type Props = {
  $variant?: Variant;
};


const Button = styled.button<Props>`
  ${({ $variant }) => {

    switch($variant){

      case "danger":
        return `
          background: #dc2626;
          color:white;
        `;

      case "success":
        return `
          background:#16a34a;
          color:white;
        `;

      case "warning":
        return `
          background:#d2c813;
          color:black;
        `;

      default:
        return `
          background:#2563eb;
          color:white;
        `;
    }

  }}
  
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 1rem;
  transition:0.2s;

  &:hover{
    opacity:0.9;
  }
`;


export default Button;