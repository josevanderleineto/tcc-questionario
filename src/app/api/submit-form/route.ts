import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(req: Request) {
  const { 
    comunidade, universidade, curso, acessoLeitura,
    acessoInternet, anosInternet, equipamentos,
    avaliacaoTecUni, frequenciaAcessoLivro, frequenciaLeituraTextos,
    impactoTecnologia, avaliacaoFormacao,
    experienciaAntes, experienciaDepois,
  } = await req.json();

  try {
    const client = await pool.connect();
    const query = `
      INSERT INTO respostas (
        comunidade_natal, universidade, curso, acesso_leitura_comunidade,
        acesso_internet_comunidade, anos_internet_comunidade,
        equipamentos_utilizados, avaliacao_tecnologia_universidade,
        frequencia_acesso_livro, frequencia_leitura_textos_longos,
        avaliacao_impacto_tecnologia, avaliacao_formacao_tecnologia,
        experiencia_antes_universidade, experiencia_depois_universidade,
        data_envio
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
    `;
    const values = [
      comunidade, universidade, curso, acessoLeitura.join(', '),
      acessoInternet, anosInternet, equipamentos.join(', '),
      avaliacaoTecUni, frequenciaAcessoLivro, frequenciaLeituraTextos,
      impactoTecnologia, avaliacaoFormacao,
      experienciaAntes, experienciaDepois,
    ];
    await client.query(query, values);
    client.release();
    return NextResponse.json({ message: 'Dados inseridos com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    return NextResponse.json({ message: 'Erro ao inserir dados', error: (error as Error).message }, { status: 500 });
  }
}


