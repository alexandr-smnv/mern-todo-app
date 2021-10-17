import React from 'react';
import ReactMarkdown from "react-markdown";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'
import {Button, Card, Form} from "react-bootstrap";
import {createNote} from "../../redux/actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";


const CreateNote = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState('');

  const dispatch = useDispatch()
  const history = useHistory()
  const {loading, error} = useSelector(state => state.noteCreate)

  const resetHandler = () => {
    setTitle('')
    setContent('')
    setCategory('')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!title || !content || !category) return;

    dispatch(createNote(title, content, category))

    resetHandler()
    history.push('/notes')
  }

  return (
    <MainScreen title="Создайте новую задачу">
      <Card>
        <Card.Header>Создайте новую заметку</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Введите название"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type="content"
                value={content}
                placeholder="Введите описание"
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {content && (
              <Card>
                <Card.Header>Предварительный просмотр</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Категория</Form.Label>
              <Form.Control
                type="category"
                value={category}
                placeholder="Введите категорию"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}

            <Button type="submit" variant="primary">Создать заметку</Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">Очистить</Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Создано - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
