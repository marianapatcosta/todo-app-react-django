import React, { useState, Fragment, useRef, useEffect } from "react";
import {
  StyledTodo,
  StyledTodoItem,
  StyledTodoTitle,
  StyledTodoDescription,
  StyledTodoPriority,
  StyledTodoActions,
  StyledTodoActionsIcon,
  StyledTodoItemCompleted,
  StyledTodoContent,
  StyledTodoItems,
} from "./StyledTodo";
import { Delete, Edit } from "../../assets/icons";
import { isEventValid } from "../../utils/utils";
import { KEYBOARD_CODES } from "../../constants";

const Todo = ({
  todo,
  isTodoBoard = false,
  isDragging,
  onEditTodo,
  onDeleteTodo,
  onDragStart,
  onBlur
}) => {
  const [showActions, setShowActions] = useState(false);
  const { title, description, priority, status, is_completed } = todo;
  const todoRef = useRef();

  const handleEditTodo = (event) => isEventValid(event) && onEditTodo();

  const handleDeleteTodo = (event) => isEventValid(event) && onDeleteTodo();

  const handleOnKeyDown = (event) => {
    if (event.which === KEYBOARD_CODES.ESCAPE_KEY) onBlur();
    if (isTodoBoard && isEventValid(event)) {
      onDragStart(event);
    }
  };

  useEffect(() => {
    isDragging && todoRef.current.focus();
  }, [isDragging]);

  return (
    <StyledTodo
      draggable={isTodoBoard}
      tabIndex={isTodoBoard ? 0 : -1}
      aria-label={
        isDragging
          ? `todo ${title} - Selected`
          : `todo ${title} - Press Space or Enter to select`
      }
      onDragStart={onDragStart}
      isTodoBoard={isTodoBoard}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onKeyDown={handleOnKeyDown}
      ref={todoRef}
      onBlur={onBlur}
    >
      <StyledTodoContent>
        {is_completed && (
          <StyledTodoItemCompleted>DONE</StyledTodoItemCompleted>
        )}
        <StyledTodoItems>
          <StyledTodoTitle>{title} </StyledTodoTitle>
          <StyledTodoDescription>{description} </StyledTodoDescription>
          <StyledTodoItem>
            priority:
            <StyledTodoPriority priority={priority}>&nbsp;</StyledTodoPriority>
          </StyledTodoItem>
          {!isTodoBoard && (
            <StyledTodoItem>{`status: ${status}`} </StyledTodoItem>
          )}

          {!isTodoBoard && (
            <StyledTodoActions showActions={showActions}>
              {showActions && (
                <Fragment>
                  <StyledTodoActionsIcon
                    aria-label="Edit todo"
                    role="button"
                    tabIndex="0"
                    src={Edit}
                    alt="Edit todo"
                    onClick={handleEditTodo}
                    onKeyDown={handleEditTodo}
                  />
                  <StyledTodoActionsIcon
                    aria-label="Delete todo"
                    role="button"
                    tabIndex="0"
                    src={Delete}
                    alt="Delete icon"
                    onClick={handleDeleteTodo}
                    onKeyDown={handleDeleteTodo}
                  />
                </Fragment>
              )}
            </StyledTodoActions>
          )}
        </StyledTodoItems>
      </StyledTodoContent>
    </StyledTodo>
  );
};

export default Todo;
