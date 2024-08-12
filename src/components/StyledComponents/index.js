import styled from 'styled-components';

// Layout view

const Layout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.h1`
  color: blue;
`;

const CustomButton = styled.button`
  width: 100%;
  margin: 15px auto;
  padding: 10px 24px;
`;

const AlertSection = styled.div`
`;

// Board view

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 10px;
  margin: 20px auto;
`;

const Cell = styled.button`
  width: 100px;
  height: 100px;
  font-size: 2rem;
  background-color: whitegray;
  border: 1px solid #whitesmoke;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export {
    Layout,
    Header,
    AlertSection,
    CustomButton,
    Board,
    Cell,
    StatusMessage,
}