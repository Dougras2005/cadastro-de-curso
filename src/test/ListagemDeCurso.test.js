import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import * as service from '../services/cursoService';
import ListagemDeCurso from '../components/ListagemDeCurso';
import ContactForm from '../components/CadastroDeCurso';
import { MemoryRouter } from 'react-router-dom';
service.

jest.mock('../services/cursoService');

// Função auxiliar para renderizar com router
const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

// Ignorar warnings do React Router
beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

test('exibe mensagem quando não há cursos cadastrados', async () => {
    service.getContacts.mockResolvedValue([]);

    renderWithRouter(<ListagemDeCurso />);

    // Usar findByText para esperar a mensagem
    const messageElement = await screen.findByText(/nenhum contato cadastrado/i);
    expect(messageElement).toBeInTheDocument();
});

test('exibe lista de contatos', async () => {
    service.getContacts.mockResolvedValue([
        { id: '1', nome: 'Java', cargaHoraria: '1300' },
        { id: '2', nome: 'Técnico em Informática', cargaHoraria: '1300'},
    ]);

    renderWithRouter(<ListagemDeCurso />);

    // Verificar se a lista foi carregada procurando por elementos únicos
    await waitFor(() => {
        // Verificar se a tabela ou cards estão presentes
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('Lista de Cursos')).toBeInTheDocument();
    });

    // Verificar se os nomes estão presentes (usando getAllByText já que há múltiplas ocorrências)
    const anaElements = screen.getAllByText('Java');
    const joaoElements = screen.getAllByText('Técnico em Informática');

    expect(anaElements.length).toBeGreaterThan(0);
    expect(joaoElements.length).toBeGreaterThan(0);

    // Verificar se pelo menos um elemento de cada está visível
    expect(anaElements[0]).toBeInTheDocument();
    expect(joaoElements[0]).toBeInTheDocument();
});

test('deleta um contato ao clicar em "Remover"', async () => {
    const deleteContactMock = jest.fn();
    service.getContacts.mockResolvedValue([
        { id: '1', nome: 'Java', cargaHoraria: '1300' },
    ]);
    service.deleteContact = deleteContactMock.mockResolvedValue({});

    renderWithRouter(<ListagemDeCurso />);

    // Esperar a lista carregar
    await screen.findByText('Lista de Cursos');

    // Verificar que o contato aparece pelo menos uma vez
    const anaElementsBefore = screen.getAllByText('Java');
    expect(anaElementsBefore.length).toBeGreaterThan(0);

    // Clicar no botão "Remover"
    const removeButton = screen.getAllByTitle(/remover/i)[0];
    fireEvent.click(removeButton);

    // Confirmar exclusão no modal (seleciona o botão)
    const confirmButton = await screen.findByRole('button', { name: /excluir/i });
    fireEvent.click(confirmButton);

    // Verificar se deleteContact foi chamado
    await waitFor(() => {
        expect(deleteContactMock).toHaveBeenCalledWith('1');
    });

    // Verificar se contato foi removido
    await waitFor(() => {
        const anaElementsAfter = screen.queryAllByText('Java');
        expect(anaElementsAfter.length).toBe(0);
    });
});

test('atualiza cursos existente', () => {
    const handleSubmit = jest.fn();
    const cursoExistente = {
        nome: 'Java',
        cargaHoraria: '1300'
    };

    render(<ContactForm contact={cursoExistente} onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Phyton' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(handleSubmit).toHaveBeenCalledWith({
       nome: 'Phyton',
        cargaHoraria: '1200'
    });
});

// Limpar mocks após os testes
afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.restoreAllMocks();
});