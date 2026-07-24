import styled from "styled-components";

type Variant = 
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "gray";


type Props = {
  variant?: Variant;
};


const Badge = styled.span<Props>`
  display: inline-flex;
  align-items: center;
  padding: 2px 5px;
  border-radius: 9999px;
  font-size: 8px;
  font-weight: 500;

  ${({ variant = "gray" }) => {

    switch (variant) {

      case "primary":
        return `
          background: #dbeafe;
          color: #1d4ed8;
        `;

      case "success":
        return `
          background: #dcfce7;
          color: #15803d;
        `;

      case "danger":
        return `
          background: #fee2e2;
          color: #b91c1c;
        `;

      case "warning":
        return `
          background: #fef3c7;
          color: #b45309;
        `;

      default:
        return `
          background: #f3f4f6;
          color: #4b5563;
        `;
    }

  }}
`;


export default Badge;