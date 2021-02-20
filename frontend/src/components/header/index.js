import React, { useContext } from "react";
import { Emoji } from "../";
import { AuthContext } from "../../context/auth-context";
import {
  StyledHeader,
  StyledHeaderTitle,
  StyledHeaderRight,
  StyledHeaderItems,
  StyledHeaderToggle,
  StyledLogout,
  StyledSalutation,
} from "./StyledHeader";

const Header = ({ title, isDarkTheme, toggleThemeMode }) => {
  const { isLoggedIn, logout, username } = useContext(AuthContext);
  return (
    <StyledHeader>
      <StyledHeaderTitle>{title}</StyledHeaderTitle>
      <StyledHeaderRight>
        <StyledHeaderItems>
          <StyledHeaderToggle
            label="theme"
            leftLabel={<Emoji label="sun" emoji="☀️" />}
            rightLabel={<Emoji label="moon" emoji="🌙" />}
            checked={isDarkTheme}
            onChange={toggleThemeMode}
          />
          {isLoggedIn && (
            <StyledLogout onClick={logout} onKeyDown={logout} role="button" tabIndex="0">
              Logout
            </StyledLogout>
          )}
        </StyledHeaderItems>
        {isLoggedIn && (
          <StyledSalutation>{`Hello ${username}`}</StyledSalutation>
        )}
      </StyledHeaderRight>
    </StyledHeader>
  );
};

export default Header;
