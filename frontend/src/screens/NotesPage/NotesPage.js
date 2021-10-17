import React, {useEffect} from 'react';
import MainScreen from "../../components/MainScreen/MainScreen";
import {useHistory} from 'react-router-dom'
import {Link} from "react-router-dom";
import {Accordion, Badge, Button, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {deleteNote, listNotes} from "../../redux/actions/notesActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const NotesPage = ({search}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {loading, notes, error} = useSelector(state => state.notesList)
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = useSelector(state => state.noteDelete)
  const {userInfo} = useSelector(state => state.userLogin)
  const {success: successCreate} = useSelector(state => state.noteCreate)
  const {success: successUpdate} = useSelector(state => state.noteUpdate)


  const deleteHandler = (id) => {
    if (window.confirm('Вы уверены?')) {
      dispatch(deleteNote(id))
    }
  }

  useEffect(() => {
    dispatch(listNotes())
    if (!userInfo) {
      history.push('/')
    }
  }, [dispatch, successCreate, successUpdate, successDelete, userInfo, history])

  return (
    <MainScreen title={`Добро пожаловать ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{marginLeft: 10, marginBottom: 6}} size="lg">
          Создать новую задачу
        </Button>
      </Link>

      {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      {
        notes?.reverse()
          .filter(filteredNote => filteredNote.title.toLowerCase().includes(search.toLowerCase()))
            .map(note => (
          <Accordion key={note._id}>
            <Card style={{margin: 10}}>
              <Card.Header style={{display: "flex"}}>
                <span style={{
                  color: 'black',
                  textDecoration: 'none',
                  flex: 1,
                  cursor: 'pointer',
                  alignSelf: 'center',
                  fontSize: 18
                }}
                >
                  <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                    {note.title}
                  </Accordion.Toggle>
            </span>
                <div>
                  <Button href={`/note/${note._id}`}>Редактировать</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Удалить
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>

                  <h4>
                    <Badge variant="success">Категория - {note.category}</Badge>
                  </h4>

                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Создана{" "}
                      <city title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </city>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default NotesPage;
