import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Todo, TodoPlaceholder } from "../../components";
import {
  statuses,
  toastTypes,
  fileTypes,
  documentOrientation,
  documentFormat,
  priorityConverter,
  statusConverter,
  KEYBOARD_CODES,
} from "../../constants";
import { AuthContext } from "../../context/auth-context";
import {
  StyledTodosBoardWrapper,
  StyledTodosBoard,
  StyledTodosBoardItem,
  StyledTodosBoardItemTitle,
  StyledTodosBoardItemContent,
  StyledTodosBoardNoItems,
  StyledTodosBoardToast,
  StyledExport,
} from "./StyledTodosBoard";
const {
  SPACE_KEY,
  ENTER_KEY,
  DOWN_ARROW_KEY,
  UP_ARROW_KEY,
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY,
  ESCAPE_KEY,
} = KEYBOARD_CODES;
const TodosBoard = () => {
  const { authToken } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [draggedTodo, setDraggedTodo] = useState();
  const [toastData, setToastData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const todosBoardRef = useRef();


  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
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
    } catch (error) {
      setToastData({
        message: "It was not possible to load your ToDos.",
        type: toastTypes.ALERT,
      });
    } finally {
      setIsLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onEditTodo = async (
    newTodoStatus,
    onFinishEditingTodo = () => null
  ) => {
    if (!newTodoStatus || newTodoStatus === draggedTodo.status) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos/${draggedTodo.id}/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...draggedTodo,
            status: newTodoStatus,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        setToastData({
          message: `It was not possible to update ToDo ${draggedTodo.title}.`,
          type: toastTypes.ALERT,
        });
        throw new Error();
      }
      setToastData({
        message: `ToDo ${draggedTodo.title} was updated.`,
        type: toastTypes.SUCCESS,
      });
      await fetchTodos();
    } catch (error) {
      setToastData({
        message: `It was not possible to update ToDo ${draggedTodo.title}.`,
        type: toastTypes.ALERT,
      });
    } finally {
      onFinishEditingTodo();
    }
  };

  const getTodosPerStatus = (filter) =>
    todos.filter(({ status }) => status === filter);

  const onDragOver = (event) => event.preventDefault();

  const onDrop = (event) => {
    event.preventDefault();
    const targetStatusId = getTargetStatusId(event.target);
    const newTodoStatus = targetStatusId && targetStatusId.split("-").join(" ");
    onEditTodo(newTodoStatus, () => setDraggedTodo());
  };

  const onDragStart = (event, todo) => setDraggedTodo(todo);

  const getTargetStatusId = (element) => {
    const statusIds = Object.values(statuses).map(
      (status) => `#${status.split(" ").join("-")}`
    );

    // polyfill for browsers that do not support Element.matches() or Element.matchesSelector() but support document.querySelectorAll()
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          const matches = (
            this.document || this.ownerDocument
          ).querySelectorAll(s);
          let i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // in for loop: 1st, no need to set a variable; 2nd, check if element exists and is not document element;
    // 3rd, each loop element is assigned to current element's parent, climbing up the DOM
    for (; element && element !== document; element = element.parentNode) {
      if (element.matches(statusIds.join())) return element.id;
    }
    return null;
  };

  const onKeyDown = (event) => {
    event.stopPropagation();
    if (!draggedTodo) return;
    const statusOptions = Object.values(statuses);
    const currentStatusIndex = statusOptions.findIndex(
      (status) => status === draggedTodo.status
    );
    let newStatusIndex;
    switch (event.which) {
      case DOWN_ARROW_KEY:
        newStatusIndex =
          currentStatusIndex === statusOptions.length - 1
            ? 0
            : currentStatusIndex + 1;
        return onEditTodo(statusOptions[newStatusIndex]);
      case UP_ARROW_KEY:
        newStatusIndex =
          currentStatusIndex === 0
            ? statusOptions.length - 1
            : currentStatusIndex - 1;
        return onEditTodo(statusOptions[newStatusIndex]);
      case RIGHT_ARROW_KEY:
        newStatusIndex =
          currentStatusIndex === statusOptions.length - 1
            ? 0
            : currentStatusIndex + 1;
        return onEditTodo(statusOptions[newStatusIndex]);
      case LEFT_ARROW_KEY:
        newStatusIndex =
          currentStatusIndex === 0
            ? statusOptions.length - 1
            : currentStatusIndex - 1;
        return onEditTodo(statusOptions[newStatusIndex]);
      case SPACE_KEY:
        return setDraggedTodo();
      case ENTER_KEY:
        return setDraggedTodo();
      case ESCAPE_KEY:
        return setDraggedTodo();
      default:
        return;
    }
  };

  useEffect(() => {
    !!draggedTodo &&
      // updates draggingTodo so if using clipboard the state is updated and and fluently be moved across the body
      setDraggedTodo(todos.find((todo) => todo.id === draggedTodo.id));
  }, [todos, draggedTodo]);

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
          <TodoPlaceholder key={`todo-placeholder${index + Math.random()}`} />
        ));
    }
    return !!todos.length ? (
      Object.values(statuses).map((status, statusIndex) => (
        <StyledTodosBoardItem
          id={status.split(" ").join("-")}
          key={`status-${statusIndex + Math.random()}`}
        >
          <StyledTodosBoardItemTitle>
            {`${status[0].toUpperCase()}${status.substring(1)}`}
          </StyledTodosBoardItemTitle>
          <StyledTodosBoardItemContent
            onDragOver={onDragOver}
            onDrop={onDrop}
            onKeyDown={onKeyDown}
            aria-label={`droppable are for status ${status}`}
          >
            {!!getTodosPerStatus(status).length ? (
              getTodosPerStatus(status).map((todo, todoIndex) => (
                <Todo
                  key={`todo-${todoIndex + Math.random()}`}
                  todo={todo}
                  isTodoBoard={true}
                  isDragging={
                    !!draggedTodo ? todo.id === draggedTodo.id : false
                  }
                  onDragStart={(event) => onDragStart(event, todo)}
                  onBlur={() => setDraggedTodo()}
                />
              ))
            ) : (
              <StyledTodosBoardNoItems>{`No ToDos to display.`}</StyledTodosBoardNoItems>
            )}
          </StyledTodosBoardItemContent>
        </StyledTodosBoardItem>
      ))
    ) : (
      <StyledTodosBoardNoItems>{`No ToDos to display.`}</StyledTodosBoardNoItems>
    );
  };

  return (
    <StyledTodosBoardWrapper>
      <StyledExport
        label="Export"
        exportOptions={`${fileTypes.CSV}, ${fileTypes.PDF}, ${fileTypes.JPEG}`}
        elementRef={todosBoardRef}
        csvData={todos}
        fileName={"my-todos"}
        pdfOrientation={documentOrientation.LANDSCAPE}
        pdfFormat={documentFormat.A3}
        onError={onExportError}
      />
      <StyledTodosBoard ref={todosBoardRef}>
        {renderTodos()}
        {toastData.message && (
          <StyledTodosBoardToast {...toastData} onClean={setToastData} />
        )}
      </StyledTodosBoard>
    </StyledTodosBoardWrapper>
  );
};

export default TodosBoard;
