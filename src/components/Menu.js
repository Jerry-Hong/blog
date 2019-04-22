import styled from 'styled-components';
import { Link } from 'gatsby';

export const Menu = styled.nav`
  display: flex;
`; 

export const MenuLink = styled(Link).attrs({
  activeClassName: 'active',
  partiallyActive: true,
})`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text);
  font-weight: 500;

  &.active {
    color: var(--active);
  }
`;
