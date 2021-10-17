import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../redux/actions/userActions"
import {Button, Col, Form, Row} from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import './ProfilePage.css';

const ProfilePage = () => {

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [pic, setPic] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [picMessage, setPicMessage] = React.useState('')

  const dispatch = useDispatch()
  const history = useHistory()
  const {userInfo} = useSelector(state => state.userLogin)
  const {loading, error, success} = useSelector(state => state.userUpdate)

  useEffect(() => {
    if (!userInfo) {
      history.push("/")
    } else {
      setName(userInfo.name)
      setEmail(userInfo.email)
      setPic(userInfo.pic)
    }
  }, [history, userInfo])

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

  const submitHandler = (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      dispatch(updateProfile({name, email, password, pic}))
    }
  }

  return (
    <MainScreen title="Редактирование профиля">
      <div>
        <Row className="profileContainer" >
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading/>}
              {success && (
                <ErrorMessage variant="success">Успешно обновлено</ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Подтвердите пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}

              <Form.Group controlId="pic">
                <Form.Label>Обновите изображение профиля</Form.Label>
                <Form.File
                  type="image/png"
                  id="custom-file"
                  label="Обновите изобржение профиля"
                  onChange={(e) => postDetails(e.target.files[0])}
                  custom
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Обновить
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItem: 'center'
            }}
          >
            <img src={userInfo.pic} alt="Изображение профиля" className="profilePic"/>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfilePage;
