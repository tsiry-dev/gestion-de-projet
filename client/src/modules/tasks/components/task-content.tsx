import styled from "styled-components";

type TaskContentProps = {
  $isDragging: boolean;
};

const TaskContent = styled.div<TaskContentProps>`
  height: 48rem !important;

  overflow-y: ${({ $isDragging }) =>
    $isDragging ? "visible" : "auto"
  };

  padding-right: 0.25rem;

  /* Firefox */
  scrollbar-width: auto;

  /* Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Enlève le style du curseur */
  &::-webkit-scrollbar-thumb {
    background: #929090;
    border-radius: 5rem;
  }

  /* Garde le fond normal */
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export default TaskContent;