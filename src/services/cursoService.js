import { supabase } from './supabase';

export const getCursos = async () => {
  const { data, error } = await supabase.from('cursos').select('*');
  if (error) throw error;
  return data;
};

export const getCursosById = async (id) => {
  const { data, error } = await supabase
    .from('cursos')
    .select('*')
    .eq('id', id)
    .single(); // garante que retorna só um objeto

  if (error) throw error;
  return data;
};

export const addCursos = async (curso) => {
  const formattedCursos = {
    ...cursos,
    cargaHoraria: cursos.cargaHoraria.replace(/\D/g, '') // remove tudo que não é número
  };
  const { data, error } = await supabase.from('cursos').insert([formattedCursos]).select('*'); //.select para retornar dado inserido

  if (error) throw error;
  return data[0];
};

export const deleteCursos = async (id) => {
  const { error } = await supabase.from('cursos').delete().eq('id', id);
  if (error) throw error;
};

export const updateCursos = async (id, cursos) => {
  const cursosToUpdate = {
    ...cursos,
     cargaHoraria: cursos.cargaHoraria.replace(/\D/g, '')
  };

  // Adicione .select('*') para retornar os dados atualizados
  const { data, error } = await supabase
    .from('cursos')
    .update(cursosToUpdate)
    .eq('id', id)
    .select('*'); // ESSENCIAL para Cypress interceptar o PUT

  if (error) throw error;
  return data[0]; // retorna o contato atualizado
};
