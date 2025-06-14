// src/app/api/submit-form/route.ts
import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  try {
    const {
      comunidade,
      universidade,
      curso,
      acessoLeitura,
      acessoInternet,
      anosInternet,
      equipamentos,
      avaliacaoTecUni,
      freqAcessoGeral,
      freqLeituraTextosLongos,
      justificativaLeituraLonga,
      impactoTecnologiaComunidade,
      avaliacaoFormacao,
      experienciaAntesDepois,
      email,
    } = await req.json();

    const client = await pool.connect();

    const query = `
      INSERT INTO respostas_questionario_quilombola (
        comunidade_natal,
        universidade,
        curso,
        acesso_leitura_comunidade,
        acesso_internet_comunidade,
        anos_internet_comunidade,
        equipamentos_utilizados,
        avaliacao_tecnologia_universidade,
        frequencia_acesso_geral,
        frequencia_leitura_textos_longos,
        justificativa_leitura_longa,
        impacto_tecnologia_comunidade,
        avaliacao_formacao_tecnologia,
        experiencia_antes_depois,
        email
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15
      );
    `;

    const values = [
      comunidade,
      universidade,
      curso,
      acessoLeitura.join(', '),
      acessoInternet,
      anosInternet,
      equipamentos.join(', '),
      avaliacaoTecUni,
      freqAcessoGeral,
      freqLeituraTextosLongos,
      justificativaLeituraLonga,
      impactoTecnologiaComunidade,
      avaliacaoFormacao,
      experienciaAntesDepois,
      email,
    ];

    await client.query(query, values);
    client.release();
    return NextResponse.json({ message: 'Dados inseridos com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao inserir dados:', error);

    // Helper para obter a mensagem de erro de forma segura
    let errorMessage = 'Erro desconhecido';
    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = (error as { message: string }).message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    // AJUSTE FINAL AQUI: Verificamos e extraímos o código sem usar 'as any'
    let errorCode: string | undefined;
    if (error && typeof error === 'object' && 'code' in error) {
        errorCode = (error as { code?: string }).code; // Acessa 'code' de forma segura
    }

    // Usamos 'errorCode' na condição
    if (errorCode === '23505') { // Código de erro de chave duplicada do PostgreSQL
        return NextResponse.json(
            { message: 'Erro: Este e-mail já foi utilizado para enviar uma resposta. Por favor, utilize outro e-mail.', error: errorMessage },
            { status: 409 }
        );
    }
    
    // Retorna a mensagem de erro geral
    return NextResponse.json(
      { message: 'Erro ao inserir dados', error: errorMessage, dbError: error },
      { status: 500 }
    );
  }
}