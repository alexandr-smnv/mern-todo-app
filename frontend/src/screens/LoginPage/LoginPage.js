import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, Row} from "react-bootstrap";

import MainScreen from "../../components/MainScreen/MainScreen";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import {login} from "../../redux/actions/userActions";

import './LoginPage.css'

const LoginPage = () => {
  const history = useHistory()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch = useDispatch()
  const {loading, error, userInfo} = useSelector(state => state.userLogin)

  // редирект на заметки если userInfo не пустой
  useEffect(() => {
    if (userInfo) {
      history.push('/notes')
    }
  }, [userInfo, history])

  // обработка submit
  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <MainScreen title="Авторизация">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="email"
              placeholder="Введите email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              value={password}
              type="password"
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Войти
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Новый пользователь? <Link to="/register">Зарегистрируйтесь!</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
