import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {logout} from "../../redux/actions/userActions";

const Header = ({setSearch}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const {userInfo} = useSelector(state => state.userLogin)

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            Приложение заметок
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placehalder="Search"
                className="mr-sm-2"
                onChange={e => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo && <Nav>
            <Nav.Link>
              <Link to="/notes">Мои задачи</Link>
            </Nav.Link>
            <NavDropdown title="Профиль" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/profile">Настройки</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item onClick={logoutHandler}>Выйти</NavDropdown.Item>
            </NavDropdown>
          </Nav>}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
