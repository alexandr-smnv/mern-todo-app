import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, Row} from "react-bootstrap";

import MainScreen from "../../components/MainScreen/MainScreen";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";

import {register} from "../../redux/actions/userActions";

import './Register.css';



const RegisterPage = () => {
  const history = useHistory()
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [pic, setPic] = React.useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  )
  const [password, setPassword] = React.useState("")
  const [confirmpassword, setConfirmPassword] = React.useState("")
  const [message, setMessage] = React.useState(null)
  const [picMessage, setPicMessage] = React.useState(null)

  const dispatch = useDispatch()
  const {error, loading, userInfo} = useSelector(state => state.userRegister)

  // редирект на заметки если userInfo не пустой
  useEffect(() => {
    if (userInfo) {
      history.push('/notes')
    }
  }, [userInfo, history])

  // обработка submit
  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmpassword) {
      setMessage('Пароли не совпадают')
    } else {
      dispatch(register(name, email, password, pic))
    }
  }

  // загрузка избражения на cloudinary для генерации ссылки
  const postDetails = (pics) => {
    if (pics === undefined) {
      return setPicMessage("Пожалуйста выберите изображение")
    }
    setPicMessage(null)

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'noteApp')
      data.append('cloud_name', 'dbpanugh0')
      fetch("https://api.cloudinary.com/v1_1/dbpanugh0/image/upload", {
        method: 'post',
        body: data
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPic(data.url.toString())
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      return setPicMessage("Пожалуйста выберите изображение")
    }
  }

  return (
    <MainScreen title="РЕГИСТРАЦИЯ">
      <div className="registerContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading/>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Введите имя"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Введите email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Подтверждение пароля</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Введите пароль"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Изображение</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Загрузите изображение"
              custom
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Регистрация
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            У Вас есть аккаунт? <Link to="/login">Войти</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
