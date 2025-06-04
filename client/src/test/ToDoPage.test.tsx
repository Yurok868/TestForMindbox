import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoPage } from '../pages/ToDoPage';
import '@testing-library/jest-dom';

describe('ToDoPage', () => {
  test('смена статуса задачи при клике', () => {
    render(<ToDoPage />);
    const taskText = screen.getByText('Тестовое задание');
    const taskContainer = taskText.closest('div');
    if (taskContainer) {
      fireEvent.click(taskContainer);
    }
    const updatedTask = screen.getByText('Тестовое задание');
    expect(updatedTask.tagName).toBe('DEL');
  });

  test('не добавляет задачу, если она уже существует', () => {
    render(<ToDoPage />);
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const button = screen.getByText(/add/i);
    fireEvent.change(input, { target: { value: 'Тестовое задание' } });
    fireEvent.click(button);
    const tasks = screen.getAllByText('Тестовое задание');
    expect(tasks.length).toBe(1);
  });

  test('удаляет только выполненные задачи при очистке', () => {
    render(<ToDoPage />);
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
    const clearButton = screen.getByText(/clear completed/i);
    fireEvent.click(clearButton);
    expect(screen.queryByText('Прекрасный код')).not.toBeInTheDocument();
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
  });
});
