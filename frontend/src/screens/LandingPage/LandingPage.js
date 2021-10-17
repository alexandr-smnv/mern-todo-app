import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {Container, Row, Button} from "react-bootstrap";
import './LandingPage.css';

const LandingPage = () => {
  const history = useHistory()

  // если localStorage есть данные о пользователе - редирект на заметки
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')

    if (userInfo) {
      history.push("/notes")
    }
  }, [history])

  return (
    <div className='main'>
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Добро пожаловать в Note App</h1>
              <p className="subtitle">Лучшее приложение для твоих задач.</p>
            </div>
            <div className="button__container">
              <Link to="/login">
                <Button size="lg" className="landing__button">Войти</Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="landing__button" variant="outline-primary">Регистрация</Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
