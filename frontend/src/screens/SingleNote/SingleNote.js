import React, {useEffect} from 'react';
import MainScreen from "../../components/MainScreen/MainScreen";
import {Button, Card, Form} from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import ReactMarkdown from "react-markdown";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {deleteNote, updateNote} from "../../redux/actions/notesActions";

const SingleNote = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {id} = useParams()
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [date, setDate] = React.useState('');

  const {loading, error} = useSelector(state => state.noteUpdate)
  const {loading: loadingDelete, error: errorDelete} = useSelector(state => state.noteDelete)


  useEffect(() => {
    const fetching = async () => {
      const {data} = await axios.get(`/api/notes/${id}`)
      setTitle(data.title)
      setContent(data.content)
      setCategory(data.category)
      setDate(data.updatedAt)
    }
    fetching()
  }, [id, date])


  const resetHandler = () => {
    setTitle('')
    setContent('')
    setCategory('')
  }

  const updateHandler = (e) => {
    e.preventDefault()
    if (!title || !content || !category) return;
    dispatch(updateNote(id, title, content, category))

    resetHandler()
    history.push('/notes')
  }

  const deleteHandler = (id) => {
    if (window.confirm('Вы уверены?')) {
      dispatch(deleteNote(id))
    }
    history.push('/notes')
  }

  return (
    <MainScreen title="Редактирование заметки">
      <Card>
        <Card.Header>Измените свою заметку</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading size={50}/>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
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
            {loading && <Loading size={50}/>}
            <Button type="submit" variant="primary">Обновить</Button>
            <Button className="mx-2" onClick={() => deleteHandler(id)} variant="danger">Удалить заметку</Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Обновлено - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
