import React, { useCallback, useEffect, useState, useRef, useContext } from "react";
import {
  AddEditTodo,
  Modal,
  Toast,
  Todo,
  TodoPlaceholder,
} from "../../components";
import {
  toastTypes,
  orderOptions,
  orderByOptions,
  fileTypes,
  priorityConverter,
  statusConverter,
} from "../../constants";
import { Delete } from "../../assets/icons";
import { isEventValid } from "../../utils/utils";
import {
  StyledTodosOverview,
  StyledTodosList,
  StyledTodosListHeader,
  StyledTodosListHeaderTop,
  StyledTodosListHeaderTitle,
  StyledTodosListHeaderBottom,
  StyledTodosListHeaderOrder,
  StyledTodosListHeaderIcon,
  StyledTodosListOrder,
  StyledTodosListDropdown,
  StyledTodosListNoTodos,
  StyledTodosListSearch,
  StyledAddTodo,
  StyledExport,
  StyledTodosListBody,
} from "./StyledTodosOverview";
import { AuthContext } from "../../context/auth-context";

const TodosOverview = () => {
  const { authToken } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [todoToEdit, setTodoToEdit] = useState();
  const [todoToDelete, setTodoToDelete] = useState();
  const [showModal, setShowModal] = useState(false);
  const [toastData, setToastData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(orderOptions.ASC);
  const [orderBy, setOrderBy] = useState(orderByOptions.TITLE);
  const [search, setSearch] = useState("");
  const todosRef = useRef();

  useEffect(() => {
    const orderBy = localStorage.getItem("orderBy");
    const order = localStorage.getItem("order");
    orderBy && setOrderBy(JSON.parse(orderBy));
    order && setOrder(order);
  }, []);

  useEffect(() => {
    localStorage.setItem("order", order);
  }, [order]);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/api/todos?search=${search}&ordering=${
          order === orderOptions.DESC ? "-" : ""
        }${orderBy.key}`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      const responseData = await response.json();
      setTodos(
        responseData.map((todo) => ({
          ...todo,
          priority: priorityConverter[todo.priority],
          status: statusConverter[todo.status],
        }))
      );
      setTodoToEdit();
    } catch (error) {
      setToastData({
        message: "It was not possible to load your ToDos.",
        type: toastTypes.ALERT,
      });
    } finally {
      setIsLoading(false);
    }
  }, [authToken, order, orderBy, search]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, order, orderBy, search]);

  const onAddEditTodo = async (todo, customizedMessage) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos/${
          todoToEdit ? `${todoToEdit.id}/` : ""
        }`,
        {
          method: `${todoToEdit ? "PATCH" : "POST"}`,
          body: JSON.stringify(todo),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }
      setToastData({
        message: `${
          todoToEdit
            ? `ToDo ${todoToEdit.title} was updated.`
            : `Successfully created.\n ${
                customizedMessage ? customizedMessage : ""
              }`
        }`,
        type: customizedMessage ? toastTypes.WARNING : toastTypes.SUCCESS,
      });

      await fetchTodos();
    } catch (error) {
      setToastData({
        message: `It was not possible to create ToDos.`,
        type: toastTypes.ALERT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onCancelAddEditTodo = () => setTodoToEdit(null);

  const onEditTodo = (todo) => setTodoToEdit(todo);

  const onDeleteTodo = (todo) => {
    !!todo && setTodoToDelete(todo);
    setShowModal(true);
  };

  const handleDeleteAllTodos = (event) =>
    isEventValid(event) && setShowModal(true);

  const deleteTodo = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos/${
          todoToDelete ? `${todoToDelete.id}/` : ""
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }
      setToastData({
        message: `${
          todoToDelete
            ? `ToDo ${todoToDelete.title} was deleted.`
            : "Your ToDos were deleted."
        }`,
        type: toastTypes.SUCCESS,
      });
      await fetchTodos();
    } catch (error) {
      setToastData({
        message: `${
          todoToDelete
            ? `It was not possible to delete ToDo ${todoToDelete.title}.`
            : "It was not possible to delete your ToDos."
        }`,
        type: toastTypes.ALERT,
      });
    } finally {
      setShowModal(false);
      setTodoToDelete(null);
    }
  };

  const toggleOrder = () =>
    setOrder((prevOrder) =>
      prevOrder === orderOptions.ASC ? orderOptions.DESC : orderOptions.ASC
    );

  const updateOrderBy = (clickedItem) => {
    setOrderBy(clickedItem);
    localStorage.setItem("orderBy", JSON.stringify(clickedItem));
  };

  const onUploadError = (message) => {
    setToastData({
      message,
      type: toastTypes.ALERT,
    });
  };

  const onExportError = (message) => {
    setToastData({
      message,
      type: toastTypes.ALERT,
    });
  };

  const renderTodos = () => {
    if (isLoading) {
      return new Array(5)
        .fill()
        .map((item, index) => (
          <TodoPlaceholder key={`todo-placeholder-${index + Math.random()}`} />
        ));
    }
    return !!todos.length ? (
      todos.map((todo, index) => (
        <Todo
          key={`todo-${index + Math.random()}`}
          todo={todo}
          onEditTodo={() => onEditTodo(todo)}
          onDeleteTodo={() => onDeleteTodo(todo)}
        />
      ))
    ) : (
      <StyledTodosListNoTodos>No ToDos to display.</StyledTodosListNoTodos>
    );
  };

  return (
    <StyledTodosOverview>
      <StyledAddTodo>
        <AddEditTodo
          todoToEdit={todoToEdit}
          onAddEditTodo={onAddEditTodo}
          onCancel={onCancelAddEditTodo}
          onUploadError={onUploadError}
        />
      </StyledAddTodo>
      <StyledTodosList>
        <StyledTodosListHeader>
          <StyledTodosListHeaderTop>
            <StyledTodosListHeaderTitle>
              ToDos
              <StyledTodosListHeaderIcon
                aria-label="Delete all todos"
                role="button"
                tabIndex="0"
                src={Delete}
                alt="Delete icon"
                onClick={handleDeleteAllTodos}
                onKeyDown={handleDeleteAllTodos}
              />
            </StyledTodosListHeaderTitle>
            <StyledExport
              label="Export"
              exportOptions={`${fileTypes.CSV}, ${fileTypes.PDF}, ${fileTypes.JPEG}`}
              elementRef={todosRef}
              csvData={todos}
              fileName={"my-todos"}
              onError={onExportError}
            />
          </StyledTodosListHeaderTop>
          <StyledTodosListHeaderBottom>
            <StyledTodosListSearch
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onClear={() => setSearch("")}
            ></StyledTodosListSearch>
            <StyledTodosListHeaderOrder>
              <StyledTodosListDropdown
                options={Object.values(orderByOptions)}
                selectedOption={orderBy}
                optionKey={"label"}
                label={"Order by"}
                onChooseOption={(clickedItem) => updateOrderBy(clickedItem)}
              ></StyledTodosListDropdown>
              <StyledTodosListOrder
                role="button"
                tabIndex="0"
                onClick={toggleOrder}
              >
                {order === orderOptions.ASC
                  ? orderOptions.DESC
                  : orderOptions.ASC}
              </StyledTodosListOrder>
            </StyledTodosListHeaderOrder>
          </StyledTodosListHeaderBottom>
        </StyledTodosListHeader>
        <StyledTodosListBody ref={todosRef}>
          {renderTodos()}
          {toastData.message && <Toast {...toastData} onClean={setToastData} />}
        </StyledTodosListBody>
      </StyledTodosList>
      {showModal && (
        <Modal
          confirmationModal={true}
          buttonLabel={"Cancel"}
          confirmationLabel={"OK"}
          message={`${
            todoToDelete
              ? `Do you want to delete ToDo ${todoToDelete.title}?`
              : "Do you want to delete all ToDos?"
          }`}
          onClose={() => setShowModal(false)}
          onConfirmation={deleteTodo}
        />
      )}
    </StyledTodosOverview>
  );
};

export default TodosOverview;
