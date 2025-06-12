import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: NextRequest) {
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
      freqAcessoGeral, // Campo simplificado
      freqLeituraTextosLongos,
      justificativaLeituraLonga,
      impactoTecnologiaComunidade,
      avaliacaoFormacao,
      experienciaAntesDepois,
    } = await req.json();

    const client = await pool.connect();
    
    // Query alinhada com a nova estrutura da tabela
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
        frequencia_acesso_geral, -- Coluna simplificada
        frequencia_leitura_textos_longos,
        justificativa_leitura_longa,
        avaliacao_impacto_tecnologia_comunidade,
        avaliacao_formacao_tecnologia,
        experiencia_antes_depois,
        data_envio
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, NOW()
      );
    `;

    const values = [
      comunidade,
      universidade,
      curso,
      Array.isArray(acessoLeitura) ? acessoLeitura.join(', ') : '',
      acessoInternet,
      anosInternet,
      Array.isArray(equipamentos) ? equipamentos.join(', ') : '',
      avaliacaoTecUni,
      freqAcessoGeral, // Valor simplificado
      freqLeituraTextosLongos,
      justificativaLeituraLonga,
      impactoTecnologiaComunidade,
      avaliacaoFormacao,
      experienciaAntesDepois,
    ];

    await client.query(query, values);
    client.release();

    return NextResponse.json({ message: 'Dados inseridos com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { message: 'Erro ao inserir dados no servidor', error: errorMessage },
      { status: 500 }
    );
  }
}
