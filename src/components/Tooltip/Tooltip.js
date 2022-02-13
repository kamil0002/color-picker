
import styled from 'styled-components';


const Tooltip = styled.div`
  position: absolute;
  left: ${({position}) => position.x}px;
  top: ${({position}) => position.y}px;
  width: 85px;
  height: 30px;
  background-color: rgb(255 255 255 / 0.2);
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontThin};
`;
export default Tooltip;
