import { fireEvent, render, screen } from '@testing-library/react';
import ContactForm from '../components/ContactForm';

test('renderiza inputs de Nome do Curso e Carga Horária do Curso', () => {
  render(<ContactForm />);

  expect(screen.getByLabelText(/Nome do Curso/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Carga Horária do Curso/i)).toBeInTheDocument();
});

test('chama onSubmit com dados corretos', () => {
  const handleSubmit = jest.fn();
  render(<ContactForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/Nome do Curso/i), { target: { value: 'Java' } });
  fireEvent.change(screen.getByLabelText(/Carga Horária do Curso/i), { target: { value: '1300' } });

  fireEvent.submit(screen.getByTestId('contact-form'));

  expect(handleSubmit).toHaveBeenCalledWith({
    nomeCurso: 'Java',
    cargaHoraria: 1300,
  });
});

test('atualiza curso existente', () => {
  const handleSubmit = jest.fn();
  const contatoExistente = {
    nomeCurso: 'Java',
    cargaHoraria: 1300,
  };

  render(<ContactForm contact={contatoExistente} onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/Nome do Curso/i), { target: { value: 'Técnico em Informática' } });
  fireEvent.submit(screen.getByTestId('contact-form'));

  expect(handleSubmit).toHaveBeenCalledWith({
    nomeCurso: 'Técnico em Informática',
    cargaHoraria: 1300, // mantém o valor original se não mudar
  });
});

test('valida que os campos obrigatórios foram preenchidos', () => {
  const handleSubmit = jest.fn();
  render(<ContactForm onSubmit={handleSubmit} />);

  fireEvent.submit(screen.getByTestId('contact-form'));

  expect(screen.getByText(/Nome do Curso é obrigatório/i)).toBeInTheDocument();
  expect(screen.getByText(/Carga Horária do Curso é obrigatório/i)).toBeInTheDocument();

  expect(handleSubmit).not.toHaveBeenCalled();
});
